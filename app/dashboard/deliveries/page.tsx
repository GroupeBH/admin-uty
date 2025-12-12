'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Modal, message } from 'antd';
import { useGetDeliveriesQuery, useAssignDeliveryMutation } from '@/lib/services/api';
import { Delivery, DeliveryStatus } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Search, Filter, MapPin, Truck, Navigation } from 'lucide-react';

const { Option } = Select;

export default function DeliveriesPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  const { data, isLoading } = useGetDeliveriesQuery({
    page,
    limit: 10,
    status: filters.status,
  });

  const [assignDelivery] = useAssignDeliveryMutation();

  const columns: ColumnsType<Delivery> = [
    {
      title: 'ID Livraison',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span className="font-mono text-sm font-semibold text-gray-800">
          #{id.slice(0, 8)}
        </span>
      ),
    },
    {
      title: 'Commande',
      key: 'order',
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {record.order.orderNumber}
          </p>
          <p className="text-xs text-gray-500">
            Client: {record.order.client.firstName}{' '}
            {record.order.client.lastName}
          </p>
        </div>
      ),
    },
    {
      title: 'Livreur',
      key: 'deliveryPerson',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            {record.deliveryPerson.firstName[0]}
            {record.deliveryPerson.lastName[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {record.deliveryPerson.firstName}{' '}
              {record.deliveryPerson.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {record.deliveryPerson.phone}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: DeliveryStatus) => {
        const colors: Record<string, string> = {
          ASSIGNED: 'blue',
          PICKED_UP: 'purple',
          IN_TRANSIT: 'orange',
          DELIVERED: 'green',
          FAILED: 'red',
        };
        const labels: Record<string, string> = {
          ASSIGNED: 'Assignée',
          PICKED_UP: 'Récupérée',
          IN_TRANSIT: 'En transit',
          DELIVERED: 'Livrée',
          FAILED: 'Échouée',
        };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: 'Adresse',
      key: 'address',
      render: (_, record) => (
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-800">
              {record.order.shippingAddress.street}
            </p>
            <p className="text-xs text-gray-500">
              {record.order.shippingAddress.city},{' '}
              {record.order.shippingAddress.state}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Heure de collecte',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
      render: (time) =>
        time ? new Date(time).toLocaleString('fr-FR') : '-',
    },
    {
      title: 'Heure de livraison',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
      render: (time) =>
        time ? new Date(time).toLocaleString('fr-FR') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.currentLocation && (
            <Button
              type="link"
              size="small"
              icon={<Navigation className="w-4 h-4" />}
            >
              Tracker
            </Button>
          )}
          <Button type="link" size="small">
            Détails
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
            <h1 className="text-3xl font-bold text-gray-800">Livraisons</h1>
            <p className="text-gray-600 mt-1">
              Suivez toutes les livraisons en temps réel
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="stat-card bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Assignées</p>
                <p className="text-2xl font-bold text-blue-700">
                  {data?.deliveries.filter((d) => d.status === 'ASSIGNED')
                    .length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Récupérées
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {data?.deliveries.filter((d) => d.status === 'PICKED_UP')
                    .length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600 font-medium">
                  En transit
                </p>
                <p className="text-2xl font-bold text-orange-700">
                  {data?.deliveries.filter((d) => d.status === 'IN_TRANSIT')
                    .length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Livrées</p>
                <p className="text-2xl font-bold text-green-700">
                  {data?.deliveries.filter((d) => d.status === 'DELIVERED')
                    .length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">Échouées</p>
                <p className="text-2xl font-bold text-red-700">
                  {data?.deliveries.filter((d) => d.status === 'FAILED')
                    .length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher par ID, livreur..."
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
              <Option value="ASSIGNED">Assignée</Option>
              <Option value="PICKED_UP">Récupérée</Option>
              <Option value="IN_TRANSIT">En transit</Option>
              <Option value="DELIVERED">Livrée</Option>
              <Option value="FAILED">Échouée</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.deliveries || []}
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

