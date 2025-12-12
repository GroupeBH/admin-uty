'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Modal, Progress, message } from 'antd';
import {
  useGetAuctionsQuery,
  useCloseAuctionMutation,
} from '@/lib/services/api';
import { Auction, AuctionStatus } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { Search, Filter, Gavel, Clock, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const { Option } = Select;

export default function AuctionsPage() {
  const [page, setPage] = useState(1);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  const { data, isLoading } = useGetAuctionsQuery({
    page,
    limit: 10,
    status: filters.status,
  });

  const [closeAuction] = useCloseAuctionMutation();

  const handleCloseAuction = async (auctionId: string) => {
    Modal.confirm({
      title: 'Fermer l\'enchère manuellement ?',
      content: 'Cette action attribuera l\'article au plus offrant actuel.',
      okText: 'Fermer',
      cancelText: 'Annuler',
      onOk: async () => {
        try {
          await closeAuction(auctionId).unwrap();
          message.success('Enchère fermée avec succès');
        } catch (error) {
          message.error('Erreur lors de la fermeture');
        }
      },
    });
  };

  const getTimeProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const columns: ColumnsType<Auction> = [
    {
      title: 'Enchère',
      key: 'listing',
      width: 300,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.listing.images && record.listing.images[0] && (
            <img
              src={record.listing.images[0]}
              alt={record.listing.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
          <div>
            <p className="font-medium text-gray-800 line-clamp-1">
              {record.listing.title}
            </p>
            <p className="text-xs text-gray-500">
              {record.listing.category.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Prix de départ',
      dataIndex: 'startPrice',
      key: 'startPrice',
      render: (price) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            {price.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      title: 'Prix actuel',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (price) => (
        <span className="text-lg font-bold text-green-600">
          ${price.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Enchères',
      dataIndex: 'bids',
      key: 'bids',
      render: (bids) => (
        <div className="flex items-center gap-1">
          <Gavel className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold text-gray-800">
            {bids.length} enchère(s)
          </span>
        </div>
      ),
    },
    {
      title: 'Temps restant',
      key: 'timeRemaining',
      render: (_, record) => {
        const endDate = new Date(record.endDate);
        const now = new Date();
        const isEnded = endDate < now;

        if (isEnded) {
          return <Tag color="red">Terminée</Tag>;
        }

        const progress = getTimeProgress(record.startDate, record.endDate);
        const timeLeft = formatDistanceToNow(endDate, {
          locale: fr,
          addSuffix: true,
        });

        return (
          <div className="w-32">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">{timeLeft}</span>
            </div>
            <Progress
              percent={progress}
              size="small"
              strokeColor={{
                '0%': '#10b981',
                '50%': '#f59e0b',
                '100%': '#ef4444',
              }}
              showInfo={false}
            />
          </div>
        );
      },
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: AuctionStatus) => {
        const colors: Record<string, string> = {
          ACTIVE: 'green',
          ENDED: 'default',
          CANCELLED: 'red',
        };
        const labels: Record<string, string> = {
          ACTIVE: 'Active',
          ENDED: 'Terminée',
          CANCELLED: 'Annulée',
        };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: 'Gagnant',
      key: 'winner',
      render: (_, record) =>
        record.winner ? (
          <div>
            <p className="text-sm font-medium text-gray-800">
              {record.winner.firstName} {record.winner.lastName}
            </p>
            <p className="text-xs text-gray-500">{record.winner.email}</p>
          </div>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => setSelectedAuction(record)}
          >
            Détails
          </Button>
          {record.status === 'ACTIVE' && (
            <Button
              type="link"
              size="small"
              danger
              onClick={() => handleCloseAuction(record.id)}
            >
              Fermer
            </Button>
          )}
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
            <h1 className="text-3xl font-bold text-gray-800">Enchères</h1>
            <p className="text-gray-600 mt-1">
              Gérez toutes les enchères en temps réel
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card bg-green-50 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Enchères Actives
                </p>
                <p className="text-3xl font-bold text-green-700 mt-1">
                  {data?.auctions.filter((a) => a.status === 'ACTIVE').length ||
                    0}
                </p>
              </div>
              <Gavel className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="stat-card bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Terminées
                </p>
                <p className="text-3xl font-bold text-gray-700 mt-1">
                  {data?.auctions.filter((a) => a.status === 'ENDED').length ||
                    0}
                </p>
              </div>
              <Gavel className="w-12 h-12 text-gray-600" />
            </div>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Annulées</p>
                <p className="text-3xl font-bold text-red-700 mt-1">
                  {data?.auctions.filter((a) => a.status === 'CANCELLED')
                    .length || 0}
                </p>
              </div>
              <Gavel className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher une enchère..."
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
              <Option value="ACTIVE">Active</Option>
              <Option value="ENDED">Terminée</Option>
              <Option value="CANCELLED">Annulée</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.auctions || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.total || 0,
            onChange: (newPage) => setPage(newPage),
          }}
        />

        {/* Auction Details Modal */}
        <Modal
          title="Détails de l'enchère"
          open={!!selectedAuction}
          onCancel={() => setSelectedAuction(null)}
          footer={null}
          width={700}
        >
          {selectedAuction && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                {selectedAuction.listing.images &&
                  selectedAuction.listing.images[0] && (
                    <img
                      src={selectedAuction.listing.images[0]}
                      alt={selectedAuction.listing.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedAuction.listing.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedAuction.listing.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Prix de départ</p>
                  <p className="text-xl font-bold text-gray-800">
                    ${selectedAuction.startPrice.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Prix actuel</p>
                  <p className="text-xl font-bold text-green-700">
                    ${selectedAuction.currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Historique des enchères ({selectedAuction.bids.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedAuction.bids
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {bid.user.firstName} {bid.user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(bid.createdAt).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                          ${bid.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

