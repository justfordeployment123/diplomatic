import { create } from 'zustand';
import type { SafeUser } from '@/types/auth.types';

interface AuthStore {
  user: SafeUser | null;
  token: string | null;   // memory only — NOT localStorage
  isAuthenticated: boolean;
  setAuth: (user: SafeUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
}));
