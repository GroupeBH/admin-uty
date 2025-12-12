'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Modal, Select, Input, message } from 'antd';
import { useGetUsersQuery, useUpdateUserStatusMutation } from '@/lib/services/api';
import { User, UserRole, UserStatus } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Search, UserPlus, Filter } from 'lucide-react';

const { Option } = Select;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: '',
  });

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit: 10,
    role: filters.role,
    status: filters.status,
  });

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusChange = async (userId: string, status: string) => {
    try {
      await updateUserStatus({ id: userId, status }).unwrap();
      message.success('Statut mis à jour avec succès');
    } catch (error) {
      message.error('Erreur lors de la mise à jour du statut');
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Utilisateur',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {record.firstName[0]}
            {record.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {record.firstName} {record.lastName}
            </p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => {
        const colors: Record<string, string> = {
          SUPER_ADMIN: 'red',
          ADMIN: 'orange',
          MODERATOR: 'blue',
          SUPPORT: 'cyan',
          VENDOR: 'green',
          CLIENT: 'default',
          DELIVERY: 'purple',
        };
        return <Tag color={colors[role]}>{role}</Tag>;
      },
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Option value="ACTIVE">
            <Tag color="green">Active</Tag>
          </Option>
          <Option value="SUSPENDED">
            <Tag color="orange">Suspendu</Tag>
          </Option>
          <Option value="BANNED">
            <Tag color="red">Banni</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || '-',
    },
    {
      title: 'Date d\'inscription',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'KYC',
      dataIndex: 'kycStatus',
      key: 'kycStatus',
      render: (status) => {
        const colors: Record<string, string> = {
          PENDING: 'orange',
          APPROVED: 'green',
          REJECTED: 'red',
        };
        return status ? (
          <Tag color={colors[status]}>{status}</Tag>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            Voir
          </Button>
          <Button type="link" size="small" danger>
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
            <h1 className="text-3xl font-bold text-gray-800">Utilisateurs</h1>
            <p className="text-gray-600 mt-1">
              Gérez tous les utilisateurs de la plateforme
            </p>
          </div>
          <Button type="primary" icon={<UserPlus className="w-4 h-4" />}>
            Ajouter un utilisateur
          </Button>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Rechercher un utilisateur..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <Select
              placeholder="Filtrer par rôle"
              allowClear
              value={filters.role || undefined}
              onChange={(value) => setFilters({ ...filters, role: value || '' })}
              style={{ width: '100%' }}
            >
              <Option value="VENDOR">Vendeur</Option>
              <Option value="CLIENT">Client</Option>
              <Option value="DELIVERY">Livreur</Option>
              <Option value="ADMIN">Admin</Option>
            </Select>
            <Select
              placeholder="Filtrer par statut"
              allowClear
              value={filters.status || undefined}
              onChange={(value) =>
                setFilters({ ...filters, status: value || '' })
              }
              style={{ width: '100%' }}
            >
              <Option value="ACTIVE">Actif</Option>
              <Option value="SUSPENDED">Suspendu</Option>
              <Option value="BANNED">Banni</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.users || []}
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

