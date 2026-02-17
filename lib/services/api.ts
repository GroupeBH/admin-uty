import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import { logout, setTokens } from '../features/auth/authSlice';
import type { RootState } from '../store';
import type {
  AuthTokens,
  Auction,
  Category,
  Currency,
  DashboardStats,
  Delivery,
  Listing,
  ModerationFlag,
  Order,
  Shop,
  User,
} from '../types';
import {
  FieldType,
  ListingStatus,
  ListingType,
  OrderStatus,
  UserRole,
  UserStatus,
} from '../types';

const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'refresh_token';
const DEFAULT_DATE_ISO = '1970-01-01T00:00:00.000Z';

type ApiAuthTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  accessToken?: string;
  refreshToken?: string;
};

type ApiUserPayload = {
  _id?: string;
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  verified_phone?: string;
  roles?: string[];
  role?: string;
  isAdmin?: boolean;
  image?: string;
  kycStatus?: string;
  createdAt?: string;
};

type ApiCategoryAttribute = {
  name?: string;
  type?: string;
  options?: string[];
  required?: boolean;
};

type ApiCategoryPayload = {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  parentId?: string | { _id?: string; id?: string } | null;
  isActive?: boolean;
  attributes?: ApiCategoryAttribute[];
  createdAt?: string;
  updatedAt?: string;
};

type ApiAnnouncementPayload = {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  price?: number | string;
  images?: string[];
  category?: ApiCategoryPayload | string | null;
  user?: ApiUserPayload | string | null;
  isSold?: boolean;
  views?: number;
  likes?: unknown[];
  createdAt?: string;
  updatedAt?: string;
};

type ApiOrderItemPayload = {
  _id?: string;
  id?: string;
  productId?: ApiAnnouncementPayload | string;
  quantity?: number | string;
  price?: number | string;
};

type ApiOrderPayload = {
  _id?: string;
  id?: string;
  userId?: ApiUserPayload | string;
  sellerId?: ApiUserPayload | string;
  deliveryPersonId?: ApiUserPayload | string | null;
  items?: ApiOrderItemPayload[];
  totalAmount?: number | string;
  status?: string;
  deliveryAddress?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ApiCurrencyPayload = {
  _id?: string;
  id?: string;
  code?: string;
  name?: string;
  symbol?: string;
  isActive?: boolean;
  exchangeRate?: number;
  createdAt?: string;
  updatedAt?: string;
};

type ApiShopPayload = {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  ownerIdCard?: string;
  isActive?: boolean;
  user?: ApiUserPayload | string;
  createdAt?: string;
  updatedAt?: string;
};

const getCookie = (key: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return Cookies.get(key) ?? null;
};

const getEntityId = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  const record = value as { _id?: string; id?: string };
  return record._id ?? record.id ?? '';
};

const normalizeText = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
};

const parseNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toSlug = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const mapApiRoleToUserRole = (
  roles: string[] = [],
  role?: string,
  isAdmin = false
): UserRole => {
  const normalizedRoles = roles.map((entry) => entry.toLowerCase());
  const normalizedRole = (role || '').toLowerCase();

  if (
    isAdmin ||
    normalizedRoles.includes('admin') ||
    normalizedRole === 'admin'
  ) {
    return UserRole.ADMIN;
  }
  if (
    normalizedRoles.includes('delivery_person') ||
    normalizedRole === 'delivery_person'
  ) {
    return UserRole.DELIVERY;
  }
  if (
    normalizedRoles.includes('moderator') ||
    normalizedRole === 'moderator'
  ) {
    return UserRole.MODERATOR;
  }
  return UserRole.CLIENT;
};

const mapApiKycStatus = (value?: string): User['kycStatus'] => {
  const status = normalizeText(value).toLowerCase();
  if (status === 'approved') {
    return 'APPROVED';
  }
  if (status === 'rejected') {
    return 'REJECTED';
  }
  if (status === 'pending') {
    return 'PENDING';
  }
  return undefined;
};

const mapApiUserToUser = (value: unknown): User => {
  if (typeof value === 'string') {
    return {
      id: value,
      email: `${value}@uty.local`,
      firstName: 'Utilisateur',
      lastName: '',
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      createdAt: DEFAULT_DATE_ISO,
    };
  }

  const raw = (value ?? {}) as ApiUserPayload;
  const id = getEntityId(raw) || 'unknown-user';
  const firstName =
    normalizeText(raw.firstName) || normalizeText(raw.username) || 'Utilisateur';
  const lastName = normalizeText(raw.lastName);
  const phone = normalizeText(raw.verified_phone) || normalizeText(raw.phone);
  const email = normalizeText(raw.email) || `${phone || id}@uty.local`;

  return {
    id,
    email,
    firstName,
    lastName,
    role: mapApiRoleToUserRole(raw.roles, raw.role, Boolean(raw.isAdmin)),
    status: UserStatus.ACTIVE,
    avatar: normalizeText(raw.image) || undefined,
    phone: phone || undefined,
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    kycStatus: mapApiKycStatus(raw.kycStatus),
  };
};

const mapAttributeType = (value?: string): FieldType => {
  const type = normalizeText(value).toLowerCase();
  if (type === 'number') {
    return FieldType.NUMBER;
  }
  if (type === 'boolean') {
    return FieldType.BOOLEAN;
  }
  if (type === 'list' || type === 'select') {
    return FieldType.LIST;
  }
  if (type === 'tags') {
    return FieldType.TAGS;
  }
  return FieldType.TEXT;
};

const makeFallbackCategory = (id: string): Category => ({
  id: id || 'unknown-category',
  name: 'Catégorie',
  slug: 'categorie',
  order: 1,
  dynamicFields: [],
  isActive: true,
  createdAt: DEFAULT_DATE_ISO,
  updatedAt: DEFAULT_DATE_ISO,
});

const mapApiCategoryToCategory = (
  value: unknown,
  index = 0
): Category => {
  const raw = (value ?? {}) as ApiCategoryPayload;
  const id = getEntityId(raw) || `category-${index + 1}`;
  const name = normalizeText(raw.name) || `Catégorie ${index + 1}`;
  const parentValue = raw.parentId;
  const parentId =
    typeof parentValue === 'string'
      ? parentValue
      : parentValue
      ? getEntityId(parentValue)
      : undefined;

  const dynamicFields = Array.isArray(raw.attributes)
    ? raw.attributes.map((attribute, attrIndex) => ({
        id: `${id}-attr-${attrIndex + 1}`,
        name: normalizeText(attribute.name) || `Champ ${attrIndex + 1}`,
        type: mapAttributeType(attribute.type),
        required: Boolean(attribute.required),
        options: Array.isArray(attribute.options) ? attribute.options : [],
        order: attrIndex + 1,
      }))
    : [];

  return {
    id,
    name,
    slug: toSlug(name) || `category-${index + 1}`,
    icon: normalizeText(raw.icon) || undefined,
    description: normalizeText(raw.description) || undefined,
    parentId: parentId || undefined,
    order: index + 1,
    dynamicFields,
    isActive: raw.isActive ?? true,
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    updatedAt: normalizeText(raw.updatedAt) || DEFAULT_DATE_ISO,
  };
};

const mapApiAnnouncementToListing = (
  value: unknown,
  index = 0
): Listing => {
  const raw = (value ?? {}) as ApiAnnouncementPayload;
  const id = getEntityId(raw) || `listing-${index + 1}`;
  const category =
    typeof raw.category === 'string'
      ? makeFallbackCategory(raw.category)
      : raw.category
      ? mapApiCategoryToCategory(raw.category)
      : makeFallbackCategory('');
  const vendor = mapApiUserToUser(raw.user);

  return {
    id,
    title: normalizeText(raw.name) || `Annonce ${index + 1}`,
    description: normalizeText(raw.description),
    price: parseNumber(raw.price),
    images: Array.isArray(raw.images) ? raw.images : [],
    categoryId: category.id,
    category,
    vendorId: vendor.id,
    vendor,
    status: raw.isSold ? ListingStatus.SOLD : ListingStatus.APPROVED,
    type: ListingType.SALE,
    dynamicData: {},
    views: parseNumber(raw.views),
    likes: Array.isArray(raw.likes) ? raw.likes.length : 0,
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    updatedAt: normalizeText(raw.updatedAt) || DEFAULT_DATE_ISO,
  };
};

const mapApiOrderStatus = (value?: string): OrderStatus => {
  const status = normalizeText(value).toLowerCase();
  if (status === 'confirmed') {
    return OrderStatus.CONFIRMED;
  }
  if (status === 'shipped') {
    return OrderStatus.IN_TRANSIT;
  }
  if (status === 'delivered') {
    return OrderStatus.DELIVERED;
  }
  if (status === 'cancelled') {
    return OrderStatus.CANCELLED;
  }
  return OrderStatus.PENDING;
};

const toApiOrderStatus = (value: string): string => {
  const status = normalizeText(value).toUpperCase();
  if (status === OrderStatus.CONFIRMED) {
    return 'confirmed';
  }
  if (status === OrderStatus.IN_TRANSIT) {
    return 'shipped';
  }
  if (status === OrderStatus.DELIVERED) {
    return 'delivered';
  }
  if (status === OrderStatus.CANCELLED) {
    return 'cancelled';
  }
  return 'pending';
};

const toShippingAddress = (value?: string): Order['shippingAddress'] => {
  const rawAddress = normalizeText(value);
  if (!rawAddress) {
    return {
      street: '-',
      city: '-',
      state: '-',
      zipCode: '-',
      country: '-',
    };
  }

  const parts = rawAddress
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  return {
    street: parts[0] ?? rawAddress,
    city: parts[1] ?? '-',
    state: parts[2] ?? '-',
    zipCode: parts[3] ?? '-',
    country: parts[4] ?? '-',
  };
};

const mapApiOrderToOrder = (value: unknown, index = 0): Order => {
  const raw = (value ?? {}) as ApiOrderPayload;
  const id = getEntityId(raw) || `order-${index + 1}`;
  const client = mapApiUserToUser(raw.userId);
  const vendor = mapApiUserToUser(raw.sellerId);
  const delivery =
    raw.deliveryPersonId && typeof raw.deliveryPersonId !== 'string'
      ? mapApiUserToUser(raw.deliveryPersonId)
      : undefined;

  const items = Array.isArray(raw.items)
    ? raw.items.map((item, itemIndex) => ({
        id: getEntityId(item) || `${id}-item-${itemIndex + 1}`,
        listingId:
          typeof item.productId === 'string'
            ? item.productId
            : getEntityId(item.productId) || `${id}-product-${itemIndex + 1}`,
        listing:
          typeof item.productId === 'string'
            ? mapApiAnnouncementToListing({ _id: item.productId }, itemIndex)
            : mapApiAnnouncementToListing(item.productId, itemIndex),
        quantity: parseNumber(item.quantity) || 1,
        price: parseNumber(item.price),
      }))
    : [];

  return {
    id,
    orderNumber: `ORD-${id.slice(-6).toUpperCase()}`,
    clientId: client.id,
    client,
    vendorId: vendor.id,
    vendor,
    deliveryId:
      typeof raw.deliveryPersonId === 'string'
        ? raw.deliveryPersonId
        : raw.deliveryPersonId
        ? getEntityId(raw.deliveryPersonId)
        : undefined,
    delivery,
    items,
    totalAmount: parseNumber(raw.totalAmount),
    status: mapApiOrderStatus(raw.status),
    shippingAddress: toShippingAddress(raw.deliveryAddress),
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    updatedAt: normalizeText(raw.updatedAt) || DEFAULT_DATE_ISO,
  };
};

const mapApiCurrencyToCurrency = (
  value: unknown,
  index = 0
): Currency => {
  const raw = (value ?? {}) as ApiCurrencyPayload;
  const id = getEntityId(raw) || `currency-${index + 1}`;
  return {
    id,
    code: normalizeText(raw.code).toUpperCase() || 'UNK',
    name: normalizeText(raw.name) || 'Unknown',
    symbol: normalizeText(raw.symbol) || '-',
    isActive: raw.isActive ?? true,
    exchangeRate: parseNumber(raw.exchangeRate) || 1,
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    updatedAt: normalizeText(raw.updatedAt) || DEFAULT_DATE_ISO,
  };
};

const mapApiShopToShop = (value: unknown, index = 0): Shop => {
  const raw = (value ?? {}) as ApiShopPayload;
  const id = getEntityId(raw) || `shop-${index + 1}`;
  return {
    id,
    name: normalizeText(raw.name) || `Boutique ${index + 1}`,
    description: normalizeText(raw.description) || undefined,
    logo: normalizeText(raw.logo) || undefined,
    ownerIdCard: normalizeText(raw.ownerIdCard) || undefined,
    isActive: raw.isActive ?? true,
    user: mapApiUserToUser(raw.user),
    createdAt: normalizeText(raw.createdAt) || DEFAULT_DATE_ISO,
    updatedAt: normalizeText(raw.updatedAt) || DEFAULT_DATE_ISO,
  };
};

const toCategoryPayload = (value: Partial<Category>) => ({
  name: value.name,
  description: value.description,
  icon: value.icon,
  parentId: value.parentId || undefined,
  isActive: value.isActive,
  attributes: (value.dynamicFields || []).map((field) => ({
    name: field.name,
    type: field.type.toLowerCase(),
    options: field.options || [],
    required: field.required,
  })),
});

const mapAuthTokens = (value: ApiAuthTokenResponse): AuthTokens => {
  const accessToken = value.access_token ?? value.accessToken;
  const refreshToken = value.refresh_token ?? value.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new Error("Réponse d'authentification invalide.");
  }

  return { accessToken, refreshToken };
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  prepareHeaders: (headers, { getState }) => {
    const tokenFromState = (getState() as RootState).auth.accessToken;
    const token = tokenFromState ?? getCookie(ACCESS_TOKEN_COOKIE_KEY);

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const requestUrl = typeof args === 'string' ? args : args.url;
  const isAuthRequest =
    requestUrl.includes('/auth/login') ||
    requestUrl.includes('/auth/refresh/accessToken');

  if (result.error?.status === 401 && !isAuthRequest) {
    const refreshToken =
      (api.getState() as RootState).auth.refreshToken ??
      getCookie(REFRESH_TOKEN_COOKIE_KEY);

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh/accessToken',
        method: 'POST',
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      try {
        const tokens = mapAuthTokens(refreshResult.data as ApiAuthTokenResponse);
        api.dispatch(setTokens(tokens));
        result = await rawBaseQuery(args, api, extraOptions);
      } catch {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Category',
    'Listing',
    'Order',
    'Delivery',
    'Auction',
    'Stats',
    'Moderation',
    'Currency',
    'Shop',
  ],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthTokens, { phone: string; pin: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiAuthTokenResponse) =>
        mapAuthTokens(response),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/profile',
      transformResponse: (response: ApiUserPayload) => mapApiUserToUser(response),
      providesTags: ['User'],
    }),

    // Dashboard endpoints (kept for compatibility)
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Stats'],
    }),
    getRevenueChart: builder.query<any[], { period: string }>({
      query: ({ period }) => `/dashboard/revenue-chart?period=${period}`,
      providesTags: ['Stats'],
    }),

    // Users endpoints
    getUsers: builder.query<
      { users: User[]; total: number },
      { page?: number; limit?: number; role?: string; status?: string; search?: string }
    >({
      query: () => ({
        url: '/users',
      }),
      transformResponse: (
        response: ApiUserPayload[],
        _meta,
        args
      ) => {
        let users = (Array.isArray(response) ? response : []).map((user) =>
          mapApiUserToUser(user)
        );

        if (args?.role) {
          users = users.filter((user) => user.role === args.role);
        }

        if (args?.status) {
          users = users.filter((user) => user.status === args.status);
        }

        if (args?.search) {
          const search = args.search.toLowerCase();
          users = users.filter(
            (user) =>
              `${user.firstName} ${user.lastName}`.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search) ||
              (user.phone || '').toLowerCase().includes(search)
          );
        }

        const total = users.length;
        const page = args?.page ?? 1;
        const limit = args?.limit ?? (total > 0 ? total : 10);
        const start = (page - 1) * limit;

        return {
          users: users.slice(start, start + limit),
          total,
        };
      },
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiUserPayload) => mapApiUserToUser(response),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUserStatus: builder.mutation<User, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['User'],
    }),

    // Categories endpoints
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: ApiCategoryPayload[]) =>
        (Array.isArray(response) ? response : []).map((category, index) =>
          mapApiCategoryToCategory(category, index)
        ),
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      transformResponse: (response: ApiCategoryPayload) =>
        mapApiCategoryToCategory(response),
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: toCategoryPayload(data),
      }),
      transformResponse: (response: ApiCategoryPayload) =>
        mapApiCategoryToCategory(response),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<
      Category,
      { id: string; data: Partial<Category> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: toCategoryPayload(data),
      }),
      transformResponse: (response: ApiCategoryPayload) =>
        mapApiCategoryToCategory(response),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    reorderCategories: builder.mutation<void, { ids: string[] }>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: ['Category'],
    }),

    // Announcements/Listings endpoints
    getListings: builder.query<
      { listings: Listing[]; total: number },
      {
        page?: number;
        limit?: number;
        status?: string;
        categoryId?: string;
        search?: string;
      }
    >({
      query: () => '/announcements',
      transformResponse: (
        response: ApiAnnouncementPayload[],
        _meta,
        args
      ) => {
        let listings = (Array.isArray(response) ? response : []).map(
          (listing, index) => mapApiAnnouncementToListing(listing, index)
        );

        if (args?.status) {
          listings = listings.filter((listing) => listing.status === args.status);
        }

        if (args?.categoryId) {
          listings = listings.filter(
            (listing) => listing.categoryId === args.categoryId
          );
        }

        if (args?.search) {
          const search = args.search.toLowerCase();
          listings = listings.filter(
            (listing) =>
              listing.title.toLowerCase().includes(search) ||
              listing.description.toLowerCase().includes(search) ||
              `${listing.vendor.firstName} ${listing.vendor.lastName}`
                .toLowerCase()
                .includes(search)
          );
        }

        const total = listings.length;
        const page = args?.page ?? 1;
        const limit = args?.limit ?? (total > 0 ? total : 10);
        const start = (page - 1) * limit;

        return {
          listings: listings.slice(start, start + limit),
          total,
        };
      },
      providesTags: ['Listing'],
    }),
    getListingById: builder.query<Listing, string>({
      query: (id) => `/announcements/${id}`,
      transformResponse: (response: ApiAnnouncementPayload) =>
        mapApiAnnouncementToListing(response),
      providesTags: ['Listing'],
    }),
    updateListingStatus: builder.mutation<
      Listing,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/announcements/${id}`,
        method: 'PATCH',
        body: {
          isSold: status === ListingStatus.SOLD,
        },
      }),
      transformResponse: (response: ApiAnnouncementPayload) =>
        mapApiAnnouncementToListing(response),
      invalidatesTags: ['Listing', 'Stats'],
    }),
    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listing', 'Stats'],
    }),

    // Orders endpoints
    getOrders: builder.query<
      { orders: Order[]; total: number },
      { page?: number; limit?: number; status?: string; search?: string }
    >({
      query: () => '/orders/my-orders',
      transformResponse: (response: ApiOrderPayload[], _meta, args) => {
        let orders = (Array.isArray(response) ? response : []).map(
          (order, index) => mapApiOrderToOrder(order, index)
        );

        if (args?.status) {
          orders = orders.filter((order) => order.status === args.status);
        }

        if (args?.search) {
          const search = args.search.toLowerCase();
          orders = orders.filter(
            (order) =>
              order.orderNumber.toLowerCase().includes(search) ||
              `${order.client.firstName} ${order.client.lastName}`
                .toLowerCase()
                .includes(search) ||
              `${order.vendor.firstName} ${order.vendor.lastName}`
                .toLowerCase()
                .includes(search)
          );
        }

        const total = orders.length;
        const page = args?.page ?? 1;
        const limit = args?.limit ?? (total > 0 ? total : 10);
        const start = (page - 1) * limit;

        return {
          orders: orders.slice(start, start + limit),
          total,
        };
      },
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: ApiOrderPayload) => mapApiOrderToOrder(response),
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status: toApiOrderStatus(status) },
      }),
      transformResponse: (response: ApiOrderPayload) => mapApiOrderToOrder(response),
      invalidatesTags: ['Order', 'Stats'],
    }),

    // Deliveries endpoints (kept for compatibility)
    getDeliveries: builder.query<
      { deliveries: Delivery[]; total: number },
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: '/deliveries',
        params,
      }),
      providesTags: ['Delivery'],
    }),
    assignDelivery: builder.mutation<
      Delivery,
      { orderId: string; deliveryPersonId: string }
    >({
      query: (data) => ({
        url: '/deliveries/assign',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Delivery', 'Order'],
    }),

    // Auctions endpoints (kept for compatibility)
    getAuctions: builder.query<
      { auctions: Auction[]; total: number },
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: '/auctions',
        params,
      }),
      providesTags: ['Auction'],
    }),
    getAuctionById: builder.query<Auction, string>({
      query: (id) => `/auctions/${id}`,
      providesTags: ['Auction'],
    }),
    closeAuction: builder.mutation<Auction, string>({
      query: (id) => ({
        url: `/auctions/${id}/close`,
        method: 'POST',
      }),
      invalidatesTags: ['Auction'],
    }),

    // Moderation endpoints (kept for compatibility)
    getModerationFlags: builder.query<
      { flags: ModerationFlag[]; total: number },
      { page?: number; limit?: number; resolved?: boolean }
    >({
      query: (params) => ({
        url: '/moderation/flags',
        params,
      }),
      providesTags: ['Moderation'],
    }),
    resolveModerationFlag: builder.mutation<
      ModerationFlag,
      { id: string; action: 'APPROVE' | 'REJECT' }
    >({
      query: ({ id, action }) => ({
        url: `/moderation/flags/${id}/resolve`,
        method: 'POST',
        body: { action },
      }),
      invalidatesTags: ['Moderation', 'Listing'],
    }),
    triggerAIModeration: builder.mutation<void, string>({
      query: (listingId) => ({
        url: `/moderation/ai-scan/${listingId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Moderation'],
    }),

    // Currencies
    getCurrencies: builder.query<
      { currencies: Currency[]; total: number },
      { page?: number; limit?: number; search?: string; isActive?: boolean } | void
    >({
      query: () => '/currencies',
      transformResponse: (response: ApiCurrencyPayload[], _meta, args) => {
        let currencies = (Array.isArray(response) ? response : []).map(
          (currency, index) => mapApiCurrencyToCurrency(currency, index)
        );

        if (args?.search) {
          const search = args.search.toLowerCase();
          currencies = currencies.filter(
            (currency) =>
              currency.code.toLowerCase().includes(search) ||
              currency.name.toLowerCase().includes(search)
          );
        }

        if (typeof args?.isActive === 'boolean') {
          currencies = currencies.filter(
            (currency) => currency.isActive === args.isActive
          );
        }

        const total = currencies.length;
        const page = args?.page ?? 1;
        const limit = args?.limit ?? (total > 0 ? total : 10);
        const start = (page - 1) * limit;

        return {
          currencies: currencies.slice(start, start + limit),
          total,
        };
      },
      providesTags: ['Currency'],
    }),

    // Shops
    getShops: builder.query<
      { shops: Shop[]; total: number },
      { page?: number; limit?: number; search?: string; isActive?: boolean } | void
    >({
      query: () => '/shops',
      transformResponse: (response: ApiShopPayload[], _meta, args) => {
        let shops = (Array.isArray(response) ? response : []).map((shop, index) =>
          mapApiShopToShop(shop, index)
        );

        if (args?.search) {
          const search = args.search.toLowerCase();
          shops = shops.filter(
            (shop) =>
              shop.name.toLowerCase().includes(search) ||
              (shop.user.email || '').toLowerCase().includes(search)
          );
        }

        if (typeof args?.isActive === 'boolean') {
          shops = shops.filter((shop) => shop.isActive === args.isActive);
        }

        const total = shops.length;
        const page = args?.page ?? 1;
        const limit = args?.limit ?? (total > 0 ? total : 10);
        const start = (page - 1) * limit;

        return {
          shops: shops.slice(start, start + limit),
          total,
        };
      },
      providesTags: ['Shop'],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  // Dashboard
  useGetDashboardStatsQuery,
  useGetRevenueChartQuery,
  // Users
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  // Categories
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoriesMutation,
  // Listings
  useGetListingsQuery,
  useGetListingByIdQuery,
  useUpdateListingStatusMutation,
  useDeleteListingMutation,
  // Orders
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  // Deliveries
  useGetDeliveriesQuery,
  useAssignDeliveryMutation,
  // Auctions
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useCloseAuctionMutation,
  // Moderation
  useGetModerationFlagsQuery,
  useResolveModerationFlagMutation,
  useTriggerAIModerationMutation,
  // Currencies
  useGetCurrenciesQuery,
  // Shops
  useGetShopsQuery,
} = api;
