'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Image, message } from 'antd';
import {
  useGetListingsQuery,
  useUpdateListingStatusMutation,
  useDeleteListingMutation,
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

  const [updateListingStatus] = useUpdateListingStatusMutation();
  const [deleteListing] = useDeleteListingMutation();

  const handleStatusChange = async (listingId: string, status: string) => {
    try {
      await updateListingStatus({ id: listingId, status }).unwrap();
      message.success('Statut mis à jour avec succès');
    } catch (error) {
      message.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (listingId: string) => {
    try {
      await deleteListing(listingId).unwrap();
      message.success('Annonce supprimée avec succès');
    } catch (error) {
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
            <p className="font-medium text-gray-800 line-clamp-1">
              {record.title}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {record.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {record.category.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: ListingType) => (
        <Tag color={type === 'AUCTION' ? 'purple' : 'blue'}>
          {type === 'AUCTION' ? 'Enchère' : 'Vente'}
        </Tag>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <span className="font-semibold text-gray-800">
          ${price.toLocaleString()}
        </span>
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
      render: (status: ListingStatus, record) => {
        const colors: Record<string, string> = {
          PENDING: 'orange',
          APPROVED: 'green',
          REJECTED: 'red',
          SOLD: 'purple',
          EXPIRED: 'default',
        };
        return (
          <Select
            value={status}
            onChange={(value) => handleStatusChange(record.id, value)}
            style={{ width: 130 }}
          >
            <Option value="PENDING">
              <Tag color="orange">En attente</Tag>
            </Option>
            <Option value="APPROVED">
              <Tag color="green">Approuvé</Tag>
            </Option>
            <Option value="REJECTED">
              <Tag color="red">Rejeté</Tag>
            </Option>
          </Select>
        );
      },
    },
    {
      title: 'Vues',
      dataIndex: 'views',
      key: 'views',
      render: (views) => (
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
      render: (date) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            Voir
          </Button>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Annonces</h1>
            <p className="text-gray-600 mt-1">
              Gérez toutes les annonces de la plateforme
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">En attente</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {data?.listings.filter((l) => l.status === 'PENDING').length || 0}
            </p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Approuvées</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {data?.listings.filter((l) => l.status === 'APPROVED').length || 0}
            </p>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">Rejetées</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {data?.listings.filter((l) => l.status === 'REJECTED').length || 0}
            </p>
          </div>
          <div className="stat-card bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Vendues</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {data?.listings.filter((l) => l.status === 'SOLD').length || 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher une annonce..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <Select
              placeholder="Filtrer par statut"
              allowClear
              value={filters.status || undefined}
              onChange={(value) =>
                setFilters({ ...filters, status: value || '' })
              }
              style={{ width: '100%' }}
            >
              <Option value="PENDING">En attente</Option>
              <Option value="APPROVED">Approuvé</Option>
              <Option value="REJECTED">Rejeté</Option>
              <Option value="SOLD">Vendu</Option>
            </Select>
            <Select
              placeholder="Filtrer par catégorie"
              allowClear
              value={filters.categoryId || undefined}
              onChange={(value) =>
                setFilters({ ...filters, categoryId: value || '' })
              }
              style={{ width: '100%' }}
            >
              {/* Add categories here */}
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
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

