/**
 * apiClient.ts — Axios API bridge layer
 * Central HTTP client for all backend calls.
 * Handles base URL, auth token injection, and error interception.
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send cookies cross-domain
});

// ─── Request interceptor: inject JWT token ────────────────────────────────────
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('tp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: handle 401 and other errors ───────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired — clear storage and trigger re-login
      await AsyncStorage.removeItem('tp_token');
      await AsyncStorage.removeItem('tp_user');
      // TODO: trigger navigation to /login via event or context
      console.warn('[apiClient] 401 — token expired, cleared auth');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
