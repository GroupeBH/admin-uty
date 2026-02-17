// User Types
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  SUPPORT = 'SUPPORT',
  VENDOR = 'VENDOR',
  CLIENT = 'CLIENT',
  DELIVERY = 'DELIVERY',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  BANNED = 'BANNED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
  kycStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Category Types
export enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  LIST = 'LIST',
  BOOLEAN = 'BOOLEAN',
  TAGS = 'TAGS',
}

export interface DynamicField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  parentId?: string;
  order: number;
  dynamicFields: DynamicField[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Listing/Annonce Types
export enum ListingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD',
  EXPIRED = 'EXPIRED',
}

export enum ListingType {
  SALE = 'SALE',
  AUCTION = 'AUCTION',
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  category: Category;
  vendorId: string;
  vendor: User;
  status: ListingStatus;
  type: ListingType;
  dynamicData: Record<string, any>;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  moderationFlags?: ModerationFlag[];
}

// Moderation Types
export interface ModerationFlag {
  id: string;
  listingId: string;
  reason: string;
  type: 'AUTOMATIC' | 'MANUAL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  aiConfidence?: number;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

// Order Types
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  client: User;
  vendorId: string;
  vendor: User;
  deliveryId?: string;
  delivery?: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  listingId: string;
  listing: Listing;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Delivery Types
export enum DeliveryStatus {
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

export interface Delivery {
  id: string;
  orderId: string;
  order: Order;
  deliveryPersonId: string;
  deliveryPerson: User;
  status: DeliveryStatus;
  pickupTime?: string;
  deliveryTime?: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Auction Types
export enum AuctionStatus {
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED',
}

export interface Auction {
  id: string;
  listingId: string;
  listing: Listing;
  startPrice: number;
  currentPrice: number;
  startDate: string;
  endDate: string;
  status: AuctionStatus;
  bids: Bid[];
  winnerId?: string;
  winner?: User;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  user: User;
  amount: number;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalListings: number;
  totalOrders: number;
  totalRevenue: number;
  activeAuctions: number;
  pendingModerations: number;
  activeDeliveries: number;
  userGrowth: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

// Permissions
export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// Currency Types
export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
  exchangeRate: number;
  createdAt: string;
  updatedAt: string;
}

// Shop Types
export interface Shop {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  ownerIdCard?: string;
  isActive: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
}

// Auth/API DTO Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

