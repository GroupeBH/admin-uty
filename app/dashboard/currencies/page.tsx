'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Input, Select, Tag } from 'antd';
import { Filter, Search } from 'lucide-react';
import { useGetCurrenciesQuery } from '@/lib/services/api';
import type { Currency } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

export default function CurrenciesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    isActive: '',
  });

  const { data, isLoading } = useGetCurrenciesQuery({
    page,
    limit: 10,
    search: filters.search,
    isActive:
      filters.isActive === ''
        ? undefined
        : filters.isActive === 'true',
  });

  const currencies = data?.currencies || [];

  const columns: ColumnsType<Currency> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (code: string) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbole',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol: string) => <span className="font-semibold">{symbol}</span>,
    },
    {
      title: 'Taux',
      dataIndex: 'exchangeRate',
      key: 'exchangeRate',
      render: (rate: number) => rate.toFixed(4),
    },
    {
      title: 'Statut',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) =>
        isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Currencies</h1>
          <p className="text-gray-600 mt-1">Liste des devises configurees dans uty-api</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{data?.total || 0}</p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Actives</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {currencies.filter((currency) => currency.isActive).length}
            </p>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">Inactives</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {currencies.filter((currency) => !currency.isActive).length}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher une devise..."
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
          data={currencies}
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

