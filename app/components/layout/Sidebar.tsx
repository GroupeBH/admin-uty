'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Truck,
  Gavel,
  AlertCircle,
  FolderTree,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/authSlice';
import { UserRole } from '@/lib/types';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ElementType;
  path: string;
  roles?: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    key: 'categories',
    label: 'Categories',
    icon: FolderTree,
    path: '/dashboard/categories',
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  },
  {
    key: 'listings',
    label: 'Annonces',
    icon: Package,
    path: '/dashboard/listings',
  },
  {
    key: 'users',
    label: 'Utilisateurs',
    icon: Users,
    path: '/dashboard/users',
  },
  {
    key: 'orders',
    label: 'Commandes',
    icon: ShoppingCart,
    path: '/dashboard/orders',
  },
  {
    key: 'deliveries',
    label: 'Livraisons',
    icon: Truck,
    path: '/dashboard/deliveries',
  },
  {
    key: 'auctions',
    label: 'Enchères',
    icon: Gavel,
    path: '/dashboard/auctions',
  },
  {
    key: 'moderation',
    label: 'Modération',
    icon: AlertCircle,
    path: '/dashboard/moderation',
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MODERATOR],
  },
  {
    key: 'settings',
    label: 'Paramètres',
    icon: Settings,
    path: '/dashboard/settings',
    roles: [UserRole.SUPER_ADMIN],
  },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-gray-900 min-h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-50`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        {collapsed ? (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">U</span>
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-white">UTY Admin</h1>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.key}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-gray-800 p-4">
        {!collapsed && user && (
          <div className="mb-3 px-2">
            <p className="text-white text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
            <p className="text-gray-400 text-xs truncate">{user.email}</p>
            <span className="text-xs text-blue-400 mt-1 inline-block">{user.role}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

