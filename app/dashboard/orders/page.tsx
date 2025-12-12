'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Modal, message } from 'antd';
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from '@/lib/services/api';
import { Order, OrderStatus } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Search, Filter, Eye, MapPin } from 'lucide-react';

const { Option } = Select;

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  const { data, isLoading } = useGetOrdersQuery({
    page,
    limit: 10,
    status: filters.status,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ id: orderId, status }).unwrap();
      message.success('Statut mis à jour avec succès');
    } catch (error) {
      message.error('Erreur lors de la mise à jour');
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'N° Commande',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber) => (
        <span className="font-mono text-sm font-semibold text-gray-800">
          {orderNumber}
        </span>
      ),
    },
    {
      title: 'Client',
      key: 'client',
      render: (_, record) => (
        <div>
          <p className="text-sm font-medium text-gray-800">
            {record.client.firstName} {record.client.lastName}
          </p>
          <p className="text-xs text-gray-500">{record.client.email}</p>
        </div>
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
      title: 'Articles',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <span className="text-sm text-gray-600">{items.length} article(s)</span>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => (
        <span className="font-semibold text-gray-800">
          ${amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus, record) => {
        const colors: Record<string, string> = {
          PENDING: 'orange',
          CONFIRMED: 'blue',
          IN_TRANSIT: 'purple',
          DELIVERED: 'green',
          CANCELLED: 'red',
          DISPUTED: 'volcano',
        };
        return (
          <Select
            value={status}
            onChange={(value) => handleStatusChange(record.id, value)}
            style={{ width: 140 }}
          >
            <Option value="PENDING">
              <Tag color="orange">En attente</Tag>
            </Option>
            <Option value="CONFIRMED">
              <Tag color="blue">Confirmée</Tag>
            </Option>
            <Option value="IN_TRANSIT">
              <Tag color="purple">En transit</Tag>
            </Option>
            <Option value="DELIVERED">
              <Tag color="green">Livrée</Tag>
            </Option>
            <Option value="CANCELLED">
              <Tag color="red">Annulée</Tag>
            </Option>
          </Select>
        );
      },
    },
    {
      title: 'Livreur',
      key: 'delivery',
      render: (_, record) =>
        record.delivery ? (
          <div>
            <p className="text-sm font-medium text-gray-800">
              {record.delivery.firstName} {record.delivery.lastName}
            </p>
          </div>
        ) : (
          <Tag color="default">Non assigné</Tag>
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
          <Button
            type="link"
            size="small"
            icon={<Eye className="w-4 h-4" />}
            onClick={() => setSelectedOrder(record)}
          >
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
            <h1 className="text-3xl font-bold text-gray-800">Commandes</h1>
            <p className="text-gray-600 mt-1">
              Gérez toutes les commandes de la plateforme
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="stat-card bg-orange-50 border border-orange-200">
            <p className="text-sm text-orange-600 font-medium">En attente</p>
            <p className="text-2xl font-bold text-orange-700 mt-1">
              {data?.orders.filter((o) => o.status === 'PENDING').length || 0}
            </p>
          </div>
          <div className="stat-card bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Confirmées</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {data?.orders.filter((o) => o.status === 'CONFIRMED').length || 0}
            </p>
          </div>
          <div className="stat-card bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">En transit</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {data?.orders.filter((o) => o.status === 'IN_TRANSIT').length || 0}
            </p>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <p className="text-sm text-green-600 font-medium">Livrées</p>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {data?.orders.filter((o) => o.status === 'DELIVERED').length || 0}
            </p>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">Litiges</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {data?.orders.filter((o) => o.status === 'DISPUTED').length || 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher par N° de commande, client..."
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
              <Option value="CONFIRMED">Confirmée</Option>
              <Option value="IN_TRANSIT">En transit</Option>
              <Option value="DELIVERED">Livrée</Option>
              <Option value="DISPUTED">Litige</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.orders || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.total || 0,
            onChange: (newPage) => setPage(newPage),
          }}
        />

        {/* Order Details Modal */}
        <Modal
          title={`Commande ${selectedOrder?.orderNumber}`}
          open={!!selectedOrder}
          onCancel={() => setSelectedOrder(null)}
          footer={null}
          width={800}
        >
          {selectedOrder && (
            <div className="space-y-6">
              {/* Client & Vendor Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Client</h4>
                  <p className="text-sm">
                    {selectedOrder.client.firstName}{' '}
                    {selectedOrder.client.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedOrder.client.email}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Vendeur</h4>
                  <p className="text-sm">
                    {selectedOrder.vendor.firstName}{' '}
                    {selectedOrder.vendor.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedOrder.vendor.email}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Adresse de livraison
                </h4>
                <p className="text-sm">
                  {selectedOrder.shippingAddress.street}
                  <br />
                  {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.state}{' '}
                  {selectedOrder.shippingAddress.zipCode}
                  <br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Articles</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.listing.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-800">
                    ${selectedOrder.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

