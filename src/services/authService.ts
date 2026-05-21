/**
 * authService.ts — Auth API calls via apiClient bridge.
 * Connects to backend /api/auth endpoints.
 */
import apiClient from './apiClient';

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    return data; // { token, user }
  },

  logout: async () => {
    await apiClient.post('/auth/logout').catch(() => null);
  },

  getMe: async () => {
    const { data } = await apiClient.get('/auth/me');
    return data; // { user }
  },
};

