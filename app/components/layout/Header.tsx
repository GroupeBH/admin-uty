'use client';

import React from 'react';
import { Bell, Search, Mail, Moon, Sun } from 'lucide-react';
import { Badge } from 'antd';
import { useAppSelector } from '@/lib/hooks';

export const Header: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des utilisateurs, annonces, commandes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Messages */}
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          title="Messages"
        >
          <Badge count={5} size="small">
            <Mail className="w-5 h-5 text-gray-600" />
          </Badge>
        </button>

        {/* Notifications */}
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          title="Notifications"
        >
          <Badge count={12} size="small">
            <Bell className="w-5 h-5 text-gray-600" />
          </Badge>
        </button>

        {/* User Avatar */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

