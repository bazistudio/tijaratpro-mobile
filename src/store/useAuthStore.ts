/**
 * useAuthStore.ts — Lightweight auth state store using React state + AsyncStorage.
 * No external state lib needed yet. Swap with Zustand/Redux if needed later.
 */
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'CASHIER';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopId: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
  setAuth: (user: AuthUser, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
}

export function useAuthStore(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setAuth = useCallback(async (u: AuthUser, t: string) => {
    setUser(u);
    setToken(t);
    await AsyncStorage.setItem('tp_token', t);
    await AsyncStorage.setItem('tp_user', JSON.stringify(u));
  }, []);

  const clearAuth = useCallback(async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('tp_token');
    await AsyncStorage.removeItem('tp_user');
  }, []);

  return { user, token, isLoggedIn: !!token, setAuth, clearAuth };
}
