'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { Button, Modal, Form, Input, Select, Switch, message, Tag, Space } from 'antd';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/lib/services/api';
import { Category, DynamicField, FieldType } from '@/lib/types';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const { Option } = Select;

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateOrUpdate = async (values: any) => {
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, data: values }).unwrap();
        message.success('Catégorie mise à jour avec succès');
      } else {
        await createCategory(values).unwrap();
        message.success('Catégorie créée avec succès');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      form.resetFields();
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      content: 'Cette action est irréversible',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: async () => {
        try {
          await deleteCategory(id).unwrap();
          message.success('Catégorie supprimée avec succès');
        } catch (error) {
          message.error('Erreur lors de la suppression');
        }
      },
    });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // Implement reordering logic here
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Catégories</h1>
            <p className="text-gray-600 mt-1">
              Gérez les catégories et sous-catégories de produits
            </p>
          </div>
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              setEditingCategory(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Nouvelle Catégorie
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="stat-card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FolderTree className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                </div>
                <Switch checked={category.isActive} size="small" />
              </div>

              {category.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Tag color="blue">{category.dynamicFields.length} champs</Tag>
                  {category.parentId && <Tag color="purple">Sous-catégorie</Tag>}
                </div>
                <Space>
                  <Button
                    type="text"
                    icon={<Edit className="w-4 h-4" />}
                    size="small"
                    onClick={() => handleEdit(category)}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<Trash2 className="w-4 h-4" />}
                    size="small"
                    onClick={() => handleDelete(category.id)}
                  />
                </Space>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        <Modal
          title={editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
            form.resetFields();
          }}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateOrUpdate}
            className="mt-4"
          >
            <Form.Item
              name="name"
              label="Nom de la catégorie"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Input placeholder="Ex: Électronique" />
            </Form.Item>

            <Form.Item
              name="slug"
              label="Slug"
              rules={[{ required: true, message: 'Requis' }]}
            >
              <Input placeholder="electronique" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Description de la catégorie" />
            </Form.Item>

            <Form.Item name="parentId" label="Catégorie parente">
              <Select placeholder="Aucune (catégorie principale)" allowClear>
                {categories?.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="isActive" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                  form.resetFields();
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit">
                {editingCategory ? 'Mettre à jour' : 'Créer'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

