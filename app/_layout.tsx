import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../src/store/AuthContext';
import { Colors } from '../src/utils/theme';

// ─── Set to false when backend is ready and auth is finalized ────────────────
const DEV_BYPASS_AUTH = true;

// ─── Route guard ─────────────────────────────────────────────────────────────
function RouteGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (DEV_BYPASS_AUTH) {
      // Skip auth during development — go straight to app
      if (segments[0] === '(auth)') router.replace('/');
      return;
    }

    if (isLoading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) router.replace('/login');
    else if (isLoggedIn && inAuthGroup) router.replace('/');
  }, [isLoggedIn, isLoading, segments]);

  return null;
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export const unstable_settings = { initialRouteName: '(auth)' };

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={DarkTheme}>
        <RouteGuard />
        <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.background } }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)"  options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider>
  );
}
