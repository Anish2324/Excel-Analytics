import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create(
  persist(
    (set) => ({
      authAdmin: null,
      username: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: false,
      isSubmitting: false,

      // Signup
      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post('/admin/signup', data);
          const user = res.data.admin;
          set({ authAdmin: user });
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Signup failed');
          throw error;
        } finally {
          set({ isSigningUp: false });
        }
      },

      // Login
      login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post('/admin/login', data);
    console.log('Login response:', res); // <-- Add this
    const user = res.data.user;
    const fullName = user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    if (user?.email && fullName) {
      set({
        authAdmin: user,
        username: fullName,
        isverified: true,
      });
      toast.success(`👋 Welcome back, ${fullName}`);
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Login failed');
    throw error;
  } finally {
    set({ isLoggingIn: false });
  }
},

      // Logout
      logout: async () => {
        try {
          await axiosInstance.post('/admin/logout');
          set({ authAdmin: null, username: null, isverified: false });
          toast.success('Logged out successfully');
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Logout failed');
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);