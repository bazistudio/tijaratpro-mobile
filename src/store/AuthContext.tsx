/**
 * AuthContext.tsx — Global auth state provider.
 * Handles token storage, auto-login check, and user state throughout the app.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  shopId: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;   // true while checking stored token on app start
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // starts true for auto-login check

  // ─── Auto-login check on app start ──────────────────────────────────────────
  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('tp_token');
        const storedUser = await AsyncStorage.getItem('tp_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.warn('[AuthContext] Failed to restore session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredToken();
  }, []);

  // ─── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    const data = await authService.login(email, password);
    const { token: newToken, user: newUser } = data;

    await AsyncStorage.setItem('tp_token', newToken);
    await AsyncStorage.setItem('tp_user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  }, []);

  // ─── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await authService.logout();
    await AsyncStorage.removeItem('tp_token');
    await AsyncStorage.removeItem('tp_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
