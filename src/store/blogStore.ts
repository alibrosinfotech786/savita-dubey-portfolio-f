import { create } from 'zustand';
import api from '@/lib/api';

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string;
  is_premium: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  lastPage: number;
  total: number;

  fetchPosts: (page?: number, perPage?: number) => Promise<void>;
  fetchPostById: (id: string) => Promise<{ success: boolean; status?: number; message?: string }>;
  createPost: (formData: FormData) => Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }>;
  updatePost: (id: string, formData: FormData) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
  clearCurrentPost: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  lastPage: 1,
  total: 0,

  fetchPosts: async (page = 1, perPage = 9) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/posts?per_page=${perPage}&page=${page}`);
      const data = response.data;
      
      if (data.data) {
        set({ 
          posts: data.data, 
          lastPage: data.last_page || 1, 
          total: data.total || 0,
          loading: false 
        });
      } else {
        set({ 
          posts: Array.isArray(data) ? data : [], 
          loading: false 
        });
      }
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch posts', loading: false });
    }
  },

  fetchPostById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/posts/${id}`);
      set({ currentPost: response.data, loading: false });
      return { success: true };
    } catch (err: any) {
      if (err.response?.status === 403) {
        set({ currentPost: err.response.data.post || null, loading: false });
        return { success: false, status: 403, message: err.response.data.message };
      }
      set({ error: err.response?.data?.message || 'Post not found', loading: false });
      return { success: false, status: err.response?.status };
    }
  },

  createPost: async (formData) => {
    try {
      const response = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { success: response.status === 200 || response.status === 201 };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message,
        errors: err.response?.data?.errors
      };
    }
  },

  updatePost: async (id, formData) => {
    try {
      const response = await api.post(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.status === 200 || response.status === 204;
    } catch {
      return false;
    }
  },

  clearCurrentPost: () => set({ currentPost: null, error: null }),
}));
