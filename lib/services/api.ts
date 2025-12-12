import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  User,
  Category,
  Listing,
  Order,
  Delivery,
  Auction,
  DashboardStats,
  ModerationFlag,
} from '../types';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'User',
    'Category',
    'Listing',
    'Order',
    'Delivery',
    'Auction',
    'Stats',
    'Moderation',
  ],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      { user: User; accessToken: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Dashboard endpoints
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
      { page?: number; limit?: number; role?: string; status?: string }
    >({
      query: (params) => ({
        url: '/users',
        params,
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
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
    updateUserStatus: builder.mutation<
      User,
      { id: string; status: string }
    >({
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
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<
      Category,
      { id: string; data: Partial<Category> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
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
      query: (data) => ({
        url: '/categories/reorder',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    // Listings endpoints
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
      query: (params) => ({
        url: '/listings',
        params,
      }),
      providesTags: ['Listing'],
    }),
    getListingById: builder.query<Listing, string>({
      query: (id) => `/listings/${id}`,
      providesTags: ['Listing'],
    }),
    updateListingStatus: builder.mutation<
      Listing,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/listings/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Listing', 'Stats'],
    }),
    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/listings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listing', 'Stats'],
    }),

    // Orders endpoints
    getOrders: builder.query<
      { orders: Order[]; total: number },
      { page?: number; limit?: number; status?: string }
    >({
      query: (params) => ({
        url: '/orders',
        params,
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<
      Order,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order', 'Stats'],
    }),

    // Deliveries endpoints
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

    // Auctions endpoints
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

    // Moderation endpoints
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
  }),
});

export const {
  // Auth
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
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
} = api;

