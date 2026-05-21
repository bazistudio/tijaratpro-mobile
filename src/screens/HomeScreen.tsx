import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';

const QUICK_ACTIONS = [
  { label: 'New Sale',    icon: '🧾', route: '/(tabs)/products' as const, color: Colors.success },
  { label: 'Add Product', icon: '➕', route: '/(tabs)/products' as const, color: Colors.primary },
  { label: 'Stock Check', icon: '📦', route: '/(tabs)/stock' as const,    color: Colors.warning },
  { label: 'Team',        icon: '👥', route: '/(tabs)/roles' as const,    color: Colors.secondary },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>T</Text>
        </View>
        <View>
          <Text style={styles.welcome}>Welcome back 👋</Text>
          <Text style={styles.shopName}>TijaratPro</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[styles.actionCard, { borderTopColor: action.color }]}
            onPress={() => router.push(action.route)}
            activeOpacity={0.75}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Status */}
      <Text style={styles.sectionTitle}>System Status</Text>
      <View style={styles.statusCard}>
        {[
          { label: 'Backend API',    status: 'Connected',   ok: true },
          { label: 'Database',       status: 'Atlas ✓',     ok: true },
          { label: 'Redis Cache',    status: 'Disabled',    ok: false },
          { label: 'Socket.IO',      status: 'Running',     ok: true },
        ].map(item => (
          <View key={item.label} style={styles.statusRow}>
            <Text style={styles.statusLabel}>{item.label}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.ok ? Colors.success + '22' : Colors.warning + '22' }]}>
              <Text style={[styles.statusValue, { color: item.ok ? Colors.success : Colors.warning }]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  hero: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    marginBottom: Spacing.xl, marginTop: Spacing.sm,
  },
  logoBox: {
    width: 52, height: 52, borderRadius: Radius.md,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  logoText: { color: Colors.white, fontSize: FontSize.xl, fontWeight: '800' },
  welcome: { color: Colors.textSecondary, fontSize: FontSize.sm },
  shopName: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: '700' },
  sectionTitle: {
    color: Colors.textMuted, fontSize: FontSize.xs, fontWeight: '600',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.sm,
  },
  actionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg,
  },
  actionCard: {
    width: '47%', backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, borderTopWidth: 3, borderWidth: 1, borderColor: Colors.border,
  },
  actionIcon: { fontSize: 28, marginBottom: Spacing.xs },
  actionLabel: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '600' },
  statusCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, overflow: 'hidden',
  },
  statusRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  statusLabel: { color: Colors.textSecondary, fontSize: FontSize.sm },
  statusBadge: { borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  statusValue: { fontSize: FontSize.xs, fontWeight: '700' },
});
