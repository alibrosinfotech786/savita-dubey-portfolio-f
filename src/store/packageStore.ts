import { create } from 'zustand';
import api from '@/lib/api';

interface Package {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface PackageFormData {
  name: string;
  price: number;
  duration_days: number;
  description: string;
}

interface PackageState {
  packages: Package[];
  loading: boolean;
  error: string | null;
  hasSubscription: boolean;

  fetchPackages: () => Promise<void>;
  checkSubscription: () => Promise<void>;
  createPackage: (data: PackageFormData) => Promise<boolean>;
  updatePackage: (id: number, data: PackageFormData) => Promise<boolean>;
  deletePackage: (id: number) => Promise<boolean>;
}

export const usePackageStore = create<PackageState>((set) => ({
  packages: [],
  loading: false,
  error: null,
  hasSubscription: false,

  fetchPackages: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/packages');
      set({ packages: Array.isArray(response.data) ? response.data : [], loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch packages', loading: false });
    }
  },

  checkSubscription: async () => {
    try {
      const response = await api.get('/user');
      const now = new Date();
      const active = response.data.packages?.some((p: any) => {
        const isStatusActive = p.pivot?.status === 'active';
        const expiryDate = p.pivot?.expires_at ? new Date(p.pivot.expires_at) : null;
        return isStatusActive && (!expiryDate || expiryDate > now);
      });
      set({ hasSubscription: !!active });
    } catch {
      set({ hasSubscription: false });
    }
  },

  createPackage: async (data) => {
    try {
      const response = await api.post('/packages', data);
      return response.status === 200 || response.status === 201;
    } catch {
      return false;
    }
  },

  updatePackage: async (id, data) => {
    try {
      const response = await api.put(`/packages/${id}`, data);
      return response.status === 200;
    } catch {
      return false;
    }
  },

  deletePackage: async (id) => {
    try {
      const response = await api.delete(`/packages/${id}`);
      return response.status === 200 || response.status === 204;
    } catch {
      return false;
    }
  },
}));
