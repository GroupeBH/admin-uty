'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartData {
  name: string;
  thisWeek?: number;
  lastWeek?: number;
  revenue?: number;
  orders?: number;
}

interface RevenueChartProps {
  data: ChartData[];
  type?: 'line' | 'area';
  title?: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  type = 'area',
  title = 'Revenue Overview',
}) => {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">This Week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Last Week</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <defs>
            <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            stroke="#888"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#888" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          {type === 'area' ? (
            <>
              <Area
                type="monotone"
                dataKey="thisWeek"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorThisWeek)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="lastWeek"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorLastWeek)"
                strokeWidth={2}
              />
            </>
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="thisWeek"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="lastWeek"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

