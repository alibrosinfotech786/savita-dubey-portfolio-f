import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to attach the token if available
api.interceptors.request.use((config) => {
  // If we're on the client side, try to get the token from localStorage
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch {
        // Silently ignore malformed storage
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 && error.response?.data?.is_expired) {
      if (typeof window !== 'undefined') {
        // Don't redirect if we are already on the login page or expired page
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        if (currentPath === "/login" || currentPath === "/subscription-expired") {
          return Promise.reject(error);
        }

        const authStorage = localStorage.getItem('auth-storage');
        let isSuperAdmin = false;
        if (authStorage) {
          try {
            const { state } = JSON.parse(authStorage);
            isSuperAdmin = state?.user?.role === 'superadmin';
          } catch {}
        }
        if (!isSuperAdmin) {
          window.location.href = '/subscription-expired';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;