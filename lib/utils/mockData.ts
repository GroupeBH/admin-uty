// Mock data for development and testing

import {
  User,
  UserRole,
  UserStatus,
  Category,
  Listing,
  ListingStatus,
  ListingType,
  Order,
  OrderStatus,
  Delivery,
  DeliveryStatus,
  Auction,
  AuctionStatus,
  ModerationFlag,
  DashboardStats,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@uty.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
    phone: '+33612345678',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2025-12-12T09:30:00Z',
    kycStatus: 'APPROVED',
  },
  {
    id: '2',
    email: 'moderator@uty.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.MODERATOR,
    status: UserStatus.ACTIVE,
    phone: '+33623456789',
    createdAt: '2024-02-20T11:00:00Z',
    lastLogin: '2025-12-11T15:20:00Z',
    kycStatus: 'APPROVED',
  },
  {
    id: '3',
    email: 'vendor@uty.com',
    firstName: 'Marc',
    lastName: 'Dupont',
    role: UserRole.VENDOR,
    status: UserStatus.ACTIVE,
    phone: '+33634567890',
    createdAt: '2024-03-10T14:00:00Z',
    kycStatus: 'PENDING',
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Électronique',
    slug: 'electronique',
    description: 'Tous les produits électroniques',
    order: 1,
    dynamicFields: [
      {
        id: 'f1',
        name: 'Marque',
        type: 'LIST',
        required: true,
        options: ['Apple', 'Samsung', 'Sony', 'LG'],
        order: 1,
      },
      {
        id: 'f2',
        name: 'État',
        type: 'LIST',
        required: true,
        options: ['Neuf', 'Très bon état', 'Bon état', 'Correct'],
        order: 2,
      },
    ],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mode',
    slug: 'mode',
    description: 'Vêtements et accessoires',
    order: 2,
    dynamicFields: [
      {
        id: 'f3',
        name: 'Taille',
        type: 'LIST',
        required: true,
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        order: 1,
      },
      {
        id: 'f4',
        name: 'Couleur',
        type: 'TEXT',
        required: true,
        order: 2,
      },
    ],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 36159,
  totalVendors: 3240,
  totalListings: 8542,
  totalOrders: 15683,
  totalRevenue: 290643,
  activeAuctions: 28,
  pendingModerations: 15,
  activeDeliveries: 142,
  userGrowth: 12.5,
  revenueGrowth: 22.1,
  ordersGrowth: 15.3,
};

// Helper function to generate mock data
export const generateMockListings = (count: number = 20): Listing[] => {
  const listings: Listing[] = [];
  const titles = [
    'iPhone 14 Pro Max',
    'MacBook Pro M2',
    'Samsung Galaxy S23',
    'Sony PlayStation 5',
    'iPad Air',
    'Dell XPS 15',
    'Canon EOS R6',
    'Nintendo Switch',
    'AirPods Pro',
    'Apple Watch Series 8',
  ];

  for (let i = 0; i < count; i++) {
    listings.push({
      id: `listing-${i + 1}`,
      title: titles[i % titles.length] + ` #${i + 1}`,
      description: 'Produit en excellent état, peu utilisé, avec tous les accessoires d\'origine.',
      price: Math.floor(Math.random() * 1000) + 100,
      images: ['https://via.placeholder.com/300'],
      categoryId: mockCategories[0].id,
      category: mockCategories[0],
      vendorId: mockUsers[2].id,
      vendor: mockUsers[2],
      status: [
        ListingStatus.PENDING,
        ListingStatus.APPROVED,
        ListingStatus.REJECTED,
        ListingStatus.SOLD,
      ][i % 4],
      type: i % 3 === 0 ? ListingType.AUCTION : ListingType.SALE,
      dynamicData: {
        brand: 'Apple',
        condition: 'Excellent',
      },
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return listings;
};

export const generateMockOrders = (count: number = 15): Order[] => {
  const orders: Order[] = [];

  for (let i = 0; i < count; i++) {
    orders.push({
      id: `order-${i + 1}`,
      orderNumber: `ORD-${String(i + 1).padStart(6, '0')}`,
      clientId: mockUsers[0].id,
      client: mockUsers[0],
      vendorId: mockUsers[2].id,
      vendor: mockUsers[2],
      items: [
        {
          id: `item-${i + 1}`,
          listingId: `listing-${i + 1}`,
          listing: generateMockListings(1)[0],
          quantity: 1,
          price: Math.floor(Math.random() * 500) + 50,
        },
      ],
      totalAmount: Math.floor(Math.random() * 500) + 50,
      status: [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.IN_TRANSIT,
        OrderStatus.DELIVERED,
        OrderStatus.DISPUTED,
      ][i % 5],
      shippingAddress: {
        street: '123 Rue de la Paix',
        city: 'Paris',
        state: 'Île-de-France',
        zipCode: '75001',
        country: 'France',
      },
      createdAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return orders;
};

export const generateMockDeliveries = (count: number = 10): Delivery[] => {
  const deliveries: Delivery[] = [];
  const orders = generateMockOrders(count);

  for (let i = 0; i < count; i++) {
    deliveries.push({
      id: `delivery-${i + 1}`,
      orderId: orders[i].id,
      order: orders[i],
      deliveryPersonId: mockUsers[1].id,
      deliveryPerson: { ...mockUsers[1], role: UserRole.DELIVERY },
      status: [
        DeliveryStatus.ASSIGNED,
        DeliveryStatus.PICKED_UP,
        DeliveryStatus.IN_TRANSIT,
        DeliveryStatus.DELIVERED,
      ][i % 4],
      pickupTime: i > 0 ? new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString() : undefined,
      deliveryTime: i > 2 ? new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString() : undefined,
      currentLocation: {
        lat: 48.8566 + (Math.random() - 0.5) * 0.1,
        lng: 2.3522 + (Math.random() - 0.5) * 0.1,
      },
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return deliveries;
};

export const generateMockAuctions = (count: number = 8): Auction[] => {
  const auctions: Auction[] = [];
  const listings = generateMockListings(count);

  for (let i = 0; i < count; i++) {
    const startDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + (3 + Math.random() * 4) * 24 * 60 * 60 * 1000);
    const startPrice = Math.floor(Math.random() * 500) + 100;
    
    auctions.push({
      id: `auction-${i + 1}`,
      listingId: listings[i].id,
      listing: listings[i],
      startPrice,
      currentPrice: startPrice + Math.floor(Math.random() * 200),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: endDate < new Date() ? AuctionStatus.ENDED : AuctionStatus.ACTIVE,
      bids: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => ({
        id: `bid-${i}-${j}`,
        auctionId: `auction-${i + 1}`,
        userId: mockUsers[0].id,
        user: mockUsers[0],
        amount: startPrice + (j + 1) * 10,
        createdAt: new Date(startDate.getTime() + j * 60 * 60 * 1000).toISOString(),
      })),
    });
  }

  return auctions;
};

export const generateMockModerationFlags = (count: number = 12): ModerationFlag[] => {
  const flags: ModerationFlag[] = [];
  const reasons = [
    'Contenu inapproprié détecté',
    'Texte offensant dans l\'image',
    'Produit contrefait suspecté',
    'Image de mauvaise qualité',
    'Description trompeuse',
    'Prix suspect',
  ];

  for (let i = 0; i < count; i++) {
    flags.push({
      id: `flag-${i + 1}`,
      listingId: `listing-${i + 1}`,
      reason: reasons[i % reasons.length],
      type: i % 2 === 0 ? 'AUTOMATIC' : 'MANUAL',
      severity: ['LOW', 'MEDIUM', 'HIGH'][i % 3] as 'LOW' | 'MEDIUM' | 'HIGH',
      aiConfidence: i % 2 === 0 ? Math.floor(Math.random() * 30) + 70 : undefined,
      createdAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
      resolvedAt: i % 3 === 0 ? new Date().toISOString() : undefined,
      resolvedBy: i % 3 === 0 ? 'admin@uty.com' : undefined,
    });
  }

  return flags;
};

