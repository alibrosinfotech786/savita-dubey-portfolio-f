import { create } from 'zustand';
import api from '@/lib/api';

export interface UserPackage {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  pivot: {
    payment_id: number | null;
    status: string;
    starts_at: string;
    expires_at: string | null;
  };
}

export interface PaymentRecord {
  id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  package: { id: number; name: string; price: number };
  user?: { id: number; name: string; email: string };
}

export interface ReportSummary {
  total_revenue: number;
  total_count: number;
  success_count: number;
  pending_count: number;
  failed_count: number;
}

export interface ReportFilters {
  from?: string;
  to?: string;
  status?: string;
  package_id?: string;
}

interface UserState {
  plans: UserPackage[];
  payments: PaymentRecord[];
  users: any[];
  usersTotal: number;
  usersLastPage: number;
  usersCurrentPage: number;
  loading: boolean;
  error: string | null;
  reportData: PaymentRecord[];
  reportSummary: ReportSummary | null;
  reportLoading: boolean;

  fetchUserPlans: () => Promise<void>;
  fetchPaymentHistory: () => Promise<void>;
  fetchUsers: (page?: number, perPage?: number) => Promise<void>;
  banUser: (id: number) => Promise<{ success: boolean; message: string }>;
  unbanUser: (id: number) => Promise<{ success: boolean; message: string }>;
  deleteUser: (id: number) => Promise<{ success: boolean; message: string }>;
  fetchReport: (filters: ReportFilters) => Promise<void>;
  updatePassword: (current_password: string, password: string, password_confirmation: string) => Promise<{ success: boolean; message: string }>;
}

export const useUserStore = create<UserState>((set) => ({
  plans: [],
  payments: [],
  users: [],
  usersTotal: 0,
  usersLastPage: 1,
  usersCurrentPage: 1,
  loading: false,
  error: null,
  reportData: [],
  reportSummary: null,
  reportLoading: false,

  fetchUserPlans: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/user');
      set({ plans: response.data.packages ?? [], loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch plans', loading: false });
    }
  },

  fetchPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      set({ payments: response.data.data ?? [] });
    } catch {
      set({ payments: [] });
    }
  },

  fetchUsers: async (page = 1, perPage = 15) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/users?page=${page}&per_page=${perPage}`);
      const data = response.data;
      set({
        users: data.data ?? [],
        usersTotal: data.total ?? 0,
        usersLastPage: data.last_page ?? 1,
        usersCurrentPage: data.current_page ?? 1,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch users', loading: false, users: [] });
    }
  },

  banUser: async (id) => {
    try {
      await api.post(`/users/${id}/ban`);
      set((s) => ({ users: s.users.map((u) => u.id === id ? { ...u, is_banned: true } : u) }));
      return { success: true, message: 'User banned successfully.' };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Failed to ban user.' };
    }
  },

  unbanUser: async (id) => {
    try {
      await api.post(`/users/${id}/unban`);
      set((s) => ({ users: s.users.map((u) => u.id === id ? { ...u, is_banned: false } : u) }));
      return { success: true, message: 'User unbanned successfully.' };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Failed to unban user.' };
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      set((s) => ({ users: s.users.filter((u) => u.id !== id), usersTotal: s.usersTotal - 1 }));
      return { success: true, message: 'User deleted successfully.' };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete user.' };
    }
  },

  fetchReport: async (filters) => {
    set({ reportLoading: true });
    try {
      const params = new URLSearchParams();
      if (filters.from) params.set('from', filters.from);
      if (filters.to) params.set('to', filters.to);
      if (filters.status) params.set('status', filters.status);
      if (filters.package_id) params.set('package_id', filters.package_id);
      const res = await api.get(`/reports/subscriptions?${params.toString()}`);
      set({ reportData: res.data.data, reportSummary: res.data.summary, reportLoading: false });
    } catch {
      set({ reportLoading: false });
    }
  },

  updatePassword: async (current_password, password, password_confirmation) => {
    try {
      await api.put('/user/password', { current_password, password, password_confirmation });
      return { success: true, message: 'Password updated successfully' };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Failed to update password' };
    }
  },
}));
