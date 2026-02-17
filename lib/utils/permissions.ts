import { UserRole, RolePermissions, Permission } from '../types';

// Define permissions for each role
export const rolePermissions: RolePermissions[] = [
  {
    role: UserRole.SUPER_ADMIN,
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'categories', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'listings', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'orders', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'shops', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'currencies', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'deliveries', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'auctions', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'moderation', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'permissions', actions: ['create', 'read', 'update', 'delete'] },
    ],
  },
  {
    role: UserRole.ADMIN,
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'categories', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'listings', actions: ['read', 'update', 'delete'] },
      { resource: 'orders', actions: ['read', 'update'] },
      { resource: 'shops', actions: ['read', 'update'] },
      { resource: 'currencies', actions: ['read', 'update'] },
      { resource: 'deliveries', actions: ['read', 'update'] },
      { resource: 'auctions', actions: ['read', 'update'] },
      { resource: 'moderation', actions: ['read', 'update'] },
      { resource: 'settings', actions: ['read'] },
    ],
  },
  {
    role: UserRole.MODERATOR,
    permissions: [
      { resource: 'listings', actions: ['read', 'update'] },
      { resource: 'moderation', actions: ['read', 'update'] },
      { resource: 'users', actions: ['read'] },
    ],
  },
  {
    role: UserRole.SUPPORT,
    permissions: [
      { resource: 'orders', actions: ['read', 'update'] },
      { resource: 'users', actions: ['read'] },
      { resource: 'listings', actions: ['read'] },
    ],
  },
  {
    role: UserRole.CLIENT,
    permissions: [
      { resource: 'categories', actions: ['read'] },
      { resource: 'listings', actions: ['read'] },
      { resource: 'orders', actions: ['read'] },
      { resource: 'shops', actions: ['read'] },
      { resource: 'currencies', actions: ['read'] },
    ],
  },
];

export const hasPermission = (
  userRole: UserRole,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): boolean => {
  const rolePerms = rolePermissions.find((rp) => rp.role === userRole);
  if (!rolePerms) return false;

  const resourcePerm = rolePerms.permissions.find((p) => p.resource === resource);
  if (!resourcePerm) return false;

  return resourcePerm.actions.includes(action);
};

export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  const routePermissions: Record<string, { resource: string; action: 'read' }> = {
    '/dashboard': { resource: 'dashboard', action: 'read' },
    '/dashboard/users': { resource: 'users', action: 'read' },
    '/dashboard/categories': { resource: 'categories', action: 'read' },
    '/dashboard/listings': { resource: 'listings', action: 'read' },
    '/dashboard/orders': { resource: 'orders', action: 'read' },
    '/dashboard/shops': { resource: 'shops', action: 'read' },
    '/dashboard/currencies': { resource: 'currencies', action: 'read' },
    '/dashboard/deliveries': { resource: 'deliveries', action: 'read' },
    '/dashboard/auctions': { resource: 'auctions', action: 'read' },
    '/dashboard/moderation': { resource: 'moderation', action: 'read' },
    '/dashboard/settings': { resource: 'settings', action: 'read' },
  };

  const permission = routePermissions[route];
  if (!permission) return true; // Allow access to routes without specific permissions

  return hasPermission(userRole, permission.resource, permission.action);
};

