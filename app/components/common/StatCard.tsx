'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  subtitle,
}) => {
  const colorClasses = {
    blue: 'stat-card-blue',
    green: 'stat-card-green',
    purple: 'stat-card-purple',
    orange: 'stat-card-orange',
  };

  const iconBgColors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className={`stat-card ${colorClasses[color]} fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-green-100' : 'text-red-100'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs opacity-80 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-14 h-14 rounded-full ${
            color === 'blue' || color === 'green' || color === 'purple' || color === 'orange'
              ? 'bg-white bg-opacity-20'
              : iconBgColors[color]
          } flex items-center justify-center`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

