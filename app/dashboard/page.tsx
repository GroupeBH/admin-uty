'use client';

import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/common/StatCard';
import { RevenueChart } from '../components/common/RevenueChart';
import { DonutChart } from '../components/common/DonutChart';
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
  Gavel,
} from 'lucide-react';
import { useGetDashboardStatsQuery } from '@/lib/services/api';

// Mock data for charts
const revenueData = [
  { name: 'Jan', thisWeek: 4000, lastWeek: 2400 },
  { name: 'Feb', thisWeek: 3000, lastWeek: 1398 },
  { name: 'Mar', thisWeek: 2000, lastWeek: 9800 },
  { name: 'Apr', thisWeek: 2780, lastWeek: 3908 },
  { name: 'May', thisWeek: 1890, lastWeek: 4800 },
  { name: 'Jun', thisWeek: 2390, lastWeek: 3800 },
  { name: 'Jul', thisWeek: 3490, lastWeek: 4300 },
];

const productSalesData = [
  { name: 'Vecteur', value: 45, color: '#3b82f6' },
  { name: 'Template', value: 30, color: '#8b5cf6' },
  { name: 'Presentation', value: 25, color: '#f59e0b' },
];

const trafficSourceData = [
  { source: 'example.com', percentage: 60, color: '#3b82f6' },
  { source: 'example2.com', percentage: 35, color: '#8b5cf6' },
  { source: 'example3.com', percentage: 40, color: '#f59e0b' },
];

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de votre plateforme UTY
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Utilisateurs"
            value={stats?.totalUsers || 36159}
            icon={Users}
            color="blue"
            trend={{ value: 12.5, isPositive: true }}
            subtitle="Active ce mois"
          />
          <StatCard
            title="Total Annonces"
            value={stats?.totalListings || 3159}
            icon={Package}
            color="green"
            trend={{ value: 8.2, isPositive: true }}
            subtitle="Approuvées"
          />
          <StatCard
            title="Commandes"
            value={stats?.totalOrders || 56159}
            icon={ShoppingCart}
            color="purple"
            trend={{ value: 15.3, isPositive: true }}
            subtitle="Ce mois"
          />
          <StatCard
            title="Revenu Total"
            value={`$${stats?.totalRevenue || 290643}`}
            icon={TrendingUp}
            color="orange"
            trend={{ value: 22.1, isPositive: true }}
            subtitle="Ce mois"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} type="area" title="Revenue" />
          </div>
          <div>
            <DonutChart
              data={productSalesData}
              title="Top Product Sale"
              centerText="Total"
              centerValue="95K"
            />
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Livraisons Actives
              </h3>
              <Truck className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {stats?.activeDeliveries || 142}
            </p>
            <p className="text-sm text-gray-500 mt-2">En cours de livraison</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Enchères Actives
              </h3>
              <Gavel className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {stats?.activeAuctions || 28}
            </p>
            <p className="text-sm text-gray-500 mt-2">En cours</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Modérations en attente
              </h3>
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {stats?.pendingModerations || 15}
            </p>
            <p className="text-sm text-gray-500 mt-2">À traiter</p>
          </div>
        </div>

        {/* Traffic Source */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Traffic Source
          </h3>
          <div className="space-y-4">
            {trafficSourceData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.source}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

