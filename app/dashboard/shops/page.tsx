'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Image, Input, Select, Space, Tag } from 'antd';
import { Filter, Search, Store } from 'lucide-react';
import { useGetShopsQuery } from '@/lib/services/api';
import type { Shop } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

export default function ShopsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    isActive: '',
  });

  const { data, isLoading } = useGetShopsQuery({
    page,
    limit: 10,
    search: filters.search,
    isActive:
      filters.isActive === ''
        ? undefined
        : filters.isActive === 'true',
  });

  const shops = data?.shops || [];

  const columns: ColumnsType<Shop> = [
    {
      title: 'Shop',
      key: 'shop',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.logo ? (
            <Image
              src={record.logo}
              alt={record.name}
              width={50}
              height={50}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <Store className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">{record.name}</p>
            <p className="text-xs text-gray-500 line-clamp-1">{record.description || '-'}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Proprietaire',
      key: 'owner',
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {record.user.firstName} {record.user.lastName}
          </p>
          <p className="text-xs text-gray-500">{record.user.email}</p>
        </div>
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
      title: 'Date creation',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">
            Voir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shops</h1>
          <p className="text-gray-600 mt-1">Liste des boutiques recuperees depuis uty-api</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{data?.total || 0}</p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Actives</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {shops.filter((shop) => shop.isActive).length}
            </p>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">Inactives</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {shops.filter((shop) => !shop.isActive).length}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher une boutique..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <Select
              placeholder="Filtrer par statut"
              allowClear
              value={filters.isActive || undefined}
              onChange={(value) => setFilters({ ...filters, isActive: value || '' })}
            >
              <Option value="true">Actives</Option>
              <Option value="false">Inactives</Option>
            </Select>
            <Button
              icon={<Filter className="w-4 h-4" />}
              onClick={() => setFilters({ search: '', isActive: '' })}
            >
              Reinitialiser
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={shops}
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

