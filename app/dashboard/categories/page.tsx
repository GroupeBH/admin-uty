'use client';

import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Tag,
  message,
} from 'antd';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '@/lib/services/api';
import type { Category, DynamicField } from '@/lib/types';
import { FieldType } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react';

const { Option } = Select;

type CategoryAttributeFormValues = {
  name: string;
  type: FieldType;
  required?: boolean;
  options?: string;
};

type CategoryFormValues = {
  name: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
  icon?: string;
  dynamicFields?: CategoryAttributeFormValues[];
};

const isIconUrl = (value?: string): boolean => {
  if (!value) {
    return false;
  }

  return /^(https?:\/\/|\/)/i.test(value.trim());
};

const parseOptions = (value?: string): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

export default function CategoriesPage() {
  const [form] = Form.useForm<CategoryFormValues>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [parentFilter, setParentFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const categoriesById = useMemo(() => {
    return categories.reduce<Record<string, Category>>((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {});
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        category.name.toLowerCase().includes(normalizedSearch) ||
        (category.description || '').toLowerCase().includes(normalizedSearch) ||
        category.slug.toLowerCase().includes(normalizedSearch);

      const matchesParent =
        parentFilter.length === 0
          ? true
          : parentFilter === 'ROOT'
          ? !category.parentId
          : category.parentId === parentFilter;

      return matchesSearch && matchesParent;
    });
  }, [categories, search, parentFilter]);

  const rootCount = categories.filter((category) => !category.parentId).length;
  const activeCount = categories.filter((category) => category.isActive).length;

  const openCreateModal = () => {
    setEditingCategory(null);
    form.setFieldsValue({
      name: '',
      description: '',
      parentId: undefined,
      isActive: true,
      icon: '',
      dynamicFields: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    const sortedFields = [...category.dynamicFields].sort((a, b) => a.order - b.order);

    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      isActive: category.isActive,
      icon: category.icon,
      dynamicFields: sortedFields.map((field) => ({
        name: field.name,
        type: field.type,
        required: field.required,
        options: (field.options || []).join(', '),
      })),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    const dynamicFields: DynamicField[] = (values.dynamicFields || []).map((field, index) => ({
      id:
        editingCategory?.dynamicFields[index]?.id ||
        `${editingCategory?.id || 'new'}-field-${index + 1}`,
      name: field.name.trim(),
      type: field.type,
      required: Boolean(field.required),
      options:
        field.type === FieldType.LIST || field.type === FieldType.TAGS
          ? parseOptions(field.options)
          : [],
      order: index + 1,
    }));

    const payload: Partial<Category> = {
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      parentId: values.parentId || undefined,
      isActive: values.isActive ?? true,
      icon: values.icon?.trim() || undefined,
      dynamicFields,
    };

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, data: payload }).unwrap();
        message.success('Categorie mise a jour avec succes');
      } else {
        await createCategory(payload).unwrap();
        message.success('Categorie creee avec succes');
      }

      closeModal();
    } catch (error: any) {
      message.error(error?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      message.success('Categorie supprimee avec succes');
    } catch (error: any) {
      message.error(error?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const columns: ColumnsType<Category> = [
    {
      title: 'Icone',
      dataIndex: 'icon',
      key: 'icon',
      width: 80,
      render: (icon?: string) => {
        if (!icon?.trim()) {
          return <span className="text-gray-400">-</span>;
        }

        if (isIconUrl(icon)) {
          return (
            <Image
              src={icon}
              alt="category icon"
              width={28}
              height={28}
              preview={false}
              style={{ borderRadius: 6, objectFit: 'cover' }}
            />
          );
        }

        return <span className="text-lg leading-none">{icon}</span>;
      },
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div>
          <p className="font-medium text-gray-800">{record.name}</p>
          <p className="text-xs text-gray-500">{record.slug}</p>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value?: string) => (
        <span className="text-sm text-gray-600">{value?.trim() ? value : '-'}</span>
      ),
    },
    {
      title: 'Parente',
      key: 'parent',
      render: (_, record) => {
        const parent = record.parentId ? categoriesById[record.parentId] : undefined;
        return parent ? <Tag color="purple">{parent.name}</Tag> : <Tag>Racine</Tag>;
      },
    },
    {
      title: 'Attributs',
      key: 'fields',
      render: (_, record) => (
        <Tag color="blue">{record.dynamicFields.length} attribut(s)</Tag>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) =>
        isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Supprimer cette categorie ?"
            description="Cette action est irreversible."
            okText="Supprimer"
            cancelText="Annuler"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<Trash2 className="w-4 h-4" />}
              loading={isDeleting}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
            <p className="text-gray-600 mt-1">
              Creez, modifiez et visualisez les categories de la plateforme.
            </p>
          </div>
          <Button type="primary" icon={<Plus className="w-4 h-4" />} onClick={openCreateModal}>
            Nouvelle categorie
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{categories.length}</p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Actives</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{activeCount}</p>
          </div>
          <div className="stat-card bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Racines</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">{rootCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher une categorie..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Select
              placeholder="Filtrer par categorie parente"
              allowClear
              value={parentFilter || undefined}
              onChange={(value) => setParentFilter(value || '')}
            >
              <Option value="ROOT">Racines uniquement</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            <Button
              icon={<Filter className="w-4 h-4" />}
              onClick={() => {
                setSearch('');
                setParentFilter('');
                setPage(1);
              }}
            >
              Reinitialiser
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCategories}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: filteredCategories.length,
            onChange: (newPage) => setPage(newPage),
          }}
        />

        <Modal
          title={editingCategory ? 'Modifier la categorie' : 'Nouvelle categorie'}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={900}
        >
          <Form<CategoryFormValues>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ isActive: true, dynamicFields: [] }}
            className="mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label="Nom de la categorie"
                rules={[{ required: true, message: 'Le nom est requis' }]}
              >
                <Input placeholder="Ex: Electronique" />
              </Form.Item>

              <Form.Item name="icon" label="Icone (URL ou emoji)">
                <Input placeholder="Ex: https://.../icon.png ou icone texte" />
              </Form.Item>
            </div>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Description de la categorie" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="parentId" label="Categorie parente">
                <Select placeholder="Aucune (categorie racine)" allowClear>
                  {categories
                    .filter((category) => category.id !== editingCategory?.id)
                    .map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item name="isActive" label="Active" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Attributs dynamiques</h3>

              <Form.List name="dynamicFields">
                {(fields, { add, remove }) => (
                  <div className="space-y-3">
                    {fields.map((field) => {
                      const fieldType = form.getFieldValue([
                        'dynamicFields',
                        field.name,
                        'type',
                      ]) as FieldType | undefined;
                      const showOptions =
                        fieldType === FieldType.LIST || fieldType === FieldType.TAGS;

                      return (
                        <div key={field.key} className="rounded-lg border border-gray-200 p-3">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <Form.Item
                              {...field}
                              name={[field.name, 'name']}
                              className="md:col-span-4 mb-0"
                              rules={[{ required: true, message: 'Nom requis' }]}
                            >
                              <Input placeholder="Nom attribut" />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              name={[field.name, 'type']}
                              className="md:col-span-3 mb-0"
                              rules={[{ required: true, message: 'Type requis' }]}
                            >
                              <Select placeholder="Type">
                                <Option value={FieldType.TEXT}>Text</Option>
                                <Option value={FieldType.NUMBER}>Number</Option>
                                <Option value={FieldType.BOOLEAN}>Boolean</Option>
                                <Option value={FieldType.LIST}>List</Option>
                                <Option value={FieldType.TAGS}>Tags</Option>
                              </Select>
                            </Form.Item>

                            {showOptions && (
                              <Form.Item
                                {...field}
                                name={[field.name, 'options']}
                                className="md:col-span-3 mb-0"
                              >
                                <Input placeholder="Options: a, b, c" />
                              </Form.Item>
                            )}

                            <Form.Item
                              {...field}
                              name={[field.name, 'required']}
                              valuePropName="checked"
                              className={`${showOptions ? 'md:col-span-1' : 'md:col-span-3'} mb-0`}
                            >
                              <Switch checkedChildren="Req" unCheckedChildren="Opt" />
                            </Form.Item>

                            <div className="md:col-span-1 flex items-center justify-end">
                              <Button
                                type="text"
                                danger
                                icon={<Trash2 className="w-4 h-4" />}
                                onClick={() => remove(field.name)}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      type="dashed"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={() =>
                        add({
                          name: '',
                          type: FieldType.TEXT,
                          required: false,
                          options: '',
                        })
                      }
                      block
                    >
                      Ajouter un attribut
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={closeModal}>Annuler</Button>
              <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
                {editingCategory ? 'Mettre a jour' : 'Creer'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}