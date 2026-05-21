// app/(auth)/_layout.tsx
// Simple stack for auth screens — no header, no tab bar
import { Stack } from 'expo-router';
import { Colors } from '../../src/utils/theme';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
