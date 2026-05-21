import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { useAuth } from '../../src/store/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      // RouteGuard in _layout.tsx will redirect to / automatically
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed. Check credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={styles.appName}>TijaratPro</Text>
          <Text style={styles.tagline}>Your Business, Powered.</Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.sub}>Sign in to continue</Text>

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

          <Input
            label="Email or Phone"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <Button title="Sign In" onPress={handleLogin} loading={loading} />
        </View>

        <Text style={styles.footer}>TijaratPro © 2026</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: Spacing.lg },
  brand: { alignItems: 'center', marginBottom: Spacing.xl },
  logoBox: {
    width: 72, height: 72, borderRadius: Radius.lg,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoText: { color: Colors.white, fontSize: FontSize.xxxl, fontWeight: '800' },
  appName: { color: Colors.textPrimary, fontSize: FontSize.xxl, fontWeight: '700' },
  tagline: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: 4 },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
  },
  heading: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: '700', marginBottom: 4 },
  sub: { color: Colors.textSecondary, fontSize: FontSize.sm, marginBottom: Spacing.lg },
  errorBanner: {
    backgroundColor: Colors.danger + '22', color: Colors.danger,
    fontSize: FontSize.sm, borderRadius: Radius.sm,
    padding: Spacing.sm, marginBottom: Spacing.md, textAlign: 'center',
  },
  footer: { textAlign: 'center', color: Colors.textMuted, fontSize: FontSize.xs, marginTop: Spacing.lg },
});
