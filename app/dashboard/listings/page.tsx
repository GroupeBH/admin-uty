'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Image, message } from 'antd';
import {
  useDeleteListingMutation,
  useGetCategoriesQuery,
  useGetListingsQuery,
  useUpdateListingStatusMutation,
} from '@/lib/services/api';
import { Listing, ListingStatus, ListingType } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Search, Filter, Eye } from 'lucide-react';

const { Option } = Select;

export default function ListingsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    categoryId: '',
    search: '',
  });

  const { data, isLoading } = useGetListingsQuery({
    page,
    limit: 10,
    status: filters.status,
    categoryId: filters.categoryId,
    search: filters.search,
  });
  const { data: categories = [] } = useGetCategoriesQuery();

  const [updateListingStatus] = useUpdateListingStatusMutation();
  const [deleteListing] = useDeleteListingMutation();

  const handleStatusChange = async (listingId: string, status: string) => {
    try {
      await updateListingStatus({ id: listingId, status }).unwrap();
      message.success('Statut mis a jour avec succes');
    } catch {
      message.error('Erreur lors de la mise a jour');
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      await deleteListing(listingId).unwrap();
      message.success('Annonce supprimee avec succes');
    } catch {
      message.error('Erreur lors de la suppression');
    }
  };

  const columns: ColumnsType<Listing> = [
    {
      title: 'Annonce',
      key: 'listing',
      width: 350,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.images && record.images.length > 0 && (
            <Image
              src={record.images[0]}
              alt={record.title}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
          )}
          <div>
            <p className="font-medium text-gray-800 line-clamp-1">{record.title}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{record.description}</p>
            <p className="text-xs text-gray-400 mt-1">{record.category.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: ListingType) => (
        <Tag color={type === ListingType.AUCTION ? 'purple' : 'blue'}>
          {type === ListingType.AUCTION ? 'Enchere' : 'Vente'}
        </Tag>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="font-semibold text-gray-800">${price.toLocaleString()}</span>
      ),
    },
    {
      title: 'Vendeur',
      key: 'vendor',
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {record.vendor.firstName} {record.vendor.lastName}
          </p>
          <p className="text-xs text-gray-500">{record.vendor.email}</p>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: ListingStatus, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 130 }}
        >
          <Option value={ListingStatus.APPROVED}>
            <Tag color="green">Approuve</Tag>
          </Option>
          <Option value={ListingStatus.SOLD}>
            <Tag color="purple">Vendu</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: 'Vues',
      dataIndex: 'views',
      key: 'views',
      render: (views: number) => (
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{views}</span>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            Voir
          </Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Annonces</h1>
            <p className="text-gray-600 mt-1">Gerez toutes les annonces de la plateforme</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{data?.total || 0}</p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Approuvees</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {data?.listings.filter((l) => l.status === ListingStatus.APPROVED).length || 0}
            </p>
          </div>
          <div className="stat-card bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Vendues</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {data?.listings.filter((l) => l.status === ListingStatus.SOLD).length || 0}
            </p>
          </div>
          <div className="stat-card bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600 font-medium">Categories filtrees</p>
            <p className="text-2xl font-bold text-gray-700 mt-1">{categories.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher une annonce..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <Select
              placeholder="Filtrer par statut"
              allowClear
              value={filters.status || undefined}
              onChange={(value) => setFilters({ ...filters, status: value || '' })}
              style={{ width: '100%' }}
            >
              <Option value={ListingStatus.APPROVED}>Approuve</Option>
              <Option value={ListingStatus.SOLD}>Vendu</Option>
            </Select>
            <Select
              placeholder="Filtrer par categorie"
              allowClear
              value={filters.categoryId || undefined}
              onChange={(value) => setFilters({ ...filters, categoryId: value || '' })}
              style={{ width: '100%' }}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Button
              icon={<Filter className="w-4 h-4" />}
              onClick={() =>
                setFilters({
                  status: '',
                  categoryId: '',
                  search: '',
                })
              }
            >
              Reinitialiser
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data?.listings || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.total || 0,
            onChange: (newPage) => setPage(newPage),
          }}
        />
      </div>
    </DashboardLayout>
  );
}

