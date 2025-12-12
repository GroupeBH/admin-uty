'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { DataTable } from '@/app/components/common/DataTable';
import { Button, Tag, Space, Select, Input, Modal, Alert, message, Image } from 'antd';
import {
  useGetModerationFlagsQuery,
  useResolveModerationFlagMutation,
  useTriggerAIModerationMutation,
} from '@/lib/services/api';
import { ModerationFlag } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Bot,
} from 'lucide-react';

const { Option } = Select;

export default function ModerationPage() {
  const [page, setPage] = useState(1);
  const [selectedFlag, setSelectedFlag] = useState<ModerationFlag | null>(null);
  const [filters, setFilters] = useState({
    resolved: false,
    search: '',
  });

  const { data, isLoading } = useGetModerationFlagsQuery({
    page,
    limit: 10,
    resolved: filters.resolved,
  });

  const [resolveFlag] = useResolveModerationFlagMutation();
  const [triggerAIScan] = useTriggerAIModerationMutation();

  const handleResolve = async (
    flagId: string,
    action: 'APPROVE' | 'REJECT'
  ) => {
    try {
      await resolveFlag({ id: flagId, action }).unwrap();
      message.success(
        action === 'APPROVE'
          ? 'Annonce approuvée avec succès'
          : 'Annonce rejetée avec succès'
      );
      setSelectedFlag(null);
    } catch (error) {
      message.error('Erreur lors de la modération');
    }
  };

  const handleAIScan = async (listingId: string) => {
    try {
      await triggerAIScan(listingId).unwrap();
      message.success('Analyse IA lancée avec succès');
    } catch (error) {
      message.error('Erreur lors du lancement de l\'analyse IA');
    }
  };

  const columns: ColumnsType<ModerationFlag> = [
    {
      title: 'Annonce',
      key: 'listing',
      width: 250,
      render: (_, record) => (
        <div>
          <p className="font-medium text-gray-800 line-clamp-1">
            Annonce #{record.listingId.slice(0, 8)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(record.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'AUTOMATIC' ? 'blue' : 'orange'}>
          {type === 'AUTOMATIC' ? (
            <span className="flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Automatique
            </span>
          ) : (
            'Manuel'
          )}
        </Tag>
      ),
    },
    {
      title: 'Sévérité',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => {
        const colors: Record<string, string> = {
          LOW: 'green',
          MEDIUM: 'orange',
          HIGH: 'red',
        };
        const icons: Record<string, any> = {
          LOW: <AlertTriangle className="w-3 h-3" />,
          MEDIUM: <AlertTriangle className="w-3 h-3" />,
          HIGH: <AlertTriangle className="w-3 h-3" />,
        };
        return (
          <Tag color={colors[severity]}>
            <span className="flex items-center gap-1">
              {icons[severity]}
              {severity}
            </span>
          </Tag>
        );
      },
    },
    {
      title: 'Raison',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => (
        <p className="text-sm text-gray-700 line-clamp-2">{reason}</p>
      ),
    },
    {
      title: 'Confiance IA',
      dataIndex: 'aiConfidence',
      key: 'aiConfidence',
      render: (confidence) =>
        confidence ? (
          <div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    confidence > 80
                      ? 'bg-red-500'
                      : confidence > 50
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-gray-600">
                {confidence}%
              </span>
            </div>
          </div>
        ) : (
          <span className="text-xs text-gray-400">-</span>
        ),
    },
    {
      title: 'Statut',
      key: 'resolved',
      render: (_, record) =>
        record.resolvedAt ? (
          <Tag color="green">
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Résolu
          </Tag>
        ) : (
          <Tag color="orange">En attente</Tag>
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
            onClick={() => setSelectedFlag(record)}
          >
            Examiner
          </Button>
          {!record.resolvedAt && (
            <>
              <Button
                type="link"
                size="small"
                onClick={() => handleResolve(record.id, 'APPROVE')}
                className="text-green-600"
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
              <Button
                type="link"
                size="small"
                danger
                onClick={() => handleResolve(record.id, 'REJECT')}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
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
            <h1 className="text-3xl font-bold text-gray-800">
              Modération IA
            </h1>
            <p className="text-gray-600 mt-1">
              Gérez les contenus signalés par l'IA et les utilisateurs
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-10 h-10 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600 font-medium">
                  En attente
                </p>
                <p className="text-3xl font-bold text-orange-700">
                  {data?.flags.filter((f) => !f.resolvedAt).length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-red-50 border border-red-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-10 h-10 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">
                  Haute sévérité
                </p>
                <p className="text-3xl font-bold text-red-700">
                  {data?.flags.filter((f) => f.severity === 'HIGH').length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3">
              <Bot className="w-10 h-10 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  IA Automatique
                </p>
                <p className="text-3xl font-bold text-blue-700">
                  {data?.flags.filter((f) => f.type === 'AUTOMATIC').length ||
                    0}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-10 h-10 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Résolus</p>
                <p className="text-3xl font-bold text-green-700">
                  {data?.flags.filter((f) => f.resolvedAt).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <Alert
          message="Modération IA avec AWS Rekognition"
          description="Les annonces sont automatiquement analysées par AWS Rekognition pour détecter les contenus inappropriés, les textes sensibles et les objets interdits."
          type="info"
          showIcon
          icon={<Bot className="w-5 h-5" />}
        />

        {/* Filters */}
        <div className="stat-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <Select
              placeholder="Filtrer par statut"
              value={filters.resolved}
              onChange={(value) => setFilters({ ...filters, resolved: value })}
              style={{ width: '100%' }}
            >
              <Option value={false}>En attente</Option>
              <Option value={true}>Résolus</Option>
            </Select>
            <Button icon={<Filter className="w-4 h-4" />}>Réinitialiser</Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.flags || []}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.total || 0,
            onChange: (newPage) => setPage(newPage),
          }}
        />

        {/* Flag Details Modal */}
        <Modal
          title="Détails du signalement"
          open={!!selectedFlag}
          onCancel={() => setSelectedFlag(null)}
          footer={
            selectedFlag && !selectedFlag.resolvedAt ? (
              <div className="flex justify-end gap-2">
                <Button onClick={() => setSelectedFlag(null)}>Fermer</Button>
                <Button
                  type="primary"
                  icon={<CheckCircle className="w-4 h-4" />}
                  onClick={() =>
                    selectedFlag && handleResolve(selectedFlag.id, 'APPROVE')
                  }
                >
                  Approuver
                </Button>
                <Button
                  danger
                  icon={<XCircle className="w-4 h-4" />}
                  onClick={() =>
                    selectedFlag && handleResolve(selectedFlag.id, 'REJECT')
                  }
                >
                  Rejeter
                </Button>
              </div>
            ) : null
          }
          width={700}
        >
          {selectedFlag && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <Tag color={selectedFlag.type === 'AUTOMATIC' ? 'blue' : 'orange'}>
                    {selectedFlag.type}
                  </Tag>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Sévérité</p>
                  <Tag
                    color={
                      selectedFlag.severity === 'HIGH'
                        ? 'red'
                        : selectedFlag.severity === 'MEDIUM'
                        ? 'orange'
                        : 'green'
                    }
                  >
                    {selectedFlag.severity}
                  </Tag>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Raison du signalement</p>
                <p className="text-gray-800">{selectedFlag.reason}</p>
              </div>

              {selectedFlag.aiConfidence && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 mb-2">
                    Confiance de l'IA: {selectedFlag.aiConfidence}%
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedFlag.aiConfidence}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Date du signalement</p>
                <p className="text-gray-800">
                  {new Date(selectedFlag.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>

              {selectedFlag.resolvedAt && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 mb-2">Résolu le</p>
                  <p className="text-gray-800">
                    {new Date(selectedFlag.resolvedAt).toLocaleString('fr-FR')}
                  </p>
                  {selectedFlag.resolvedBy && (
                    <p className="text-sm text-gray-600 mt-1">
                      Par: {selectedFlag.resolvedBy}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

