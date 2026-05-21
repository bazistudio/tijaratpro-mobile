import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';
import { useAuth } from '../../src/store/AuthContext';

// ─── Focused MVP dashboard: 3 things only ────────────────────────────────────
// 1. Stock summary
// 2. Today's sales
// 3. Quick actions

const QUICK_ACTIONS = [
  { label: 'Add Product', icon: '➕', route: '/(tabs)/products' as const, color: Colors.primary },
  { label: 'View Stock',  icon: '📦', route: '/(tabs)/stock'    as const, color: Colors.warning },
];

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'A';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good day 👋</Text>
          <Text style={styles.name}>{user?.name || 'Admin'}</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={logout}>
          <Text style={styles.avatarText}>{initials}</Text>
        </TouchableOpacity>
      </View>

      {/* 1. Stock Summary */}
      <Text style={styles.sectionTitle}>📦 Stock Summary</Text>
      <View style={styles.stockRow}>
        {[
          { label: 'Total Items',  value: '142', color: Colors.primary },
          { label: 'Low Stock',    value: '8',   color: Colors.warning },
          { label: 'Out of Stock', value: '3',   color: Colors.danger  },
        ].map(item => (
          <View key={item.label} style={[styles.stockCard, { borderTopColor: item.color }]}>
            <Text style={[styles.stockValue, { color: item.color }]}>{item.value}</Text>
            <Text style={styles.stockLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* 2. Today's Sales */}
      <Text style={styles.sectionTitle}>💰 Today's Sales</Text>
      <View style={styles.salesCard}>
        <View style={styles.salesMain}>
          <Text style={styles.salesAmount}>Rs 24,500</Text>
          <View style={styles.growthBadge}>
            <Text style={styles.growthText}>↑ 12% vs yesterday</Text>
          </View>
        </View>
        <View style={styles.salesRow}>
          <View style={styles.salesStat}>
            <Text style={styles.salesStatValue}>37</Text>
            <Text style={styles.salesStatLabel}>Orders</Text>
          </View>
          <View style={styles.salesDivider} />
          <View style={styles.salesStat}>
            <Text style={styles.salesStatValue}>Rs 662</Text>
            <Text style={styles.salesStatLabel}>Avg. order</Text>
          </View>
          <View style={styles.salesDivider} />
          <View style={styles.salesStat}>
            <Text style={styles.salesStatValue}>94%</Text>
            <Text style={styles.salesStatLabel}>Fulfilled</Text>
          </View>
        </View>
      </View>

      {/* 3. Quick Actions */}
      <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
      <View style={styles.actionsRow}>
        {QUICK_ACTIONS.map(action => (
          <TouchableOpacity
            key={action.label}
            style={[styles.actionCard, { borderColor: action.color }]}
            onPress={() => router.push(action.route)}
            activeOpacity={0.75}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl },
  greeting: { color: Colors.textSecondary, fontSize: FontSize.sm },
  name: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: '700' },
  avatar: {
    width: 44, height: 44, borderRadius: Radius.full,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: FontSize.lg, fontWeight: '700' },

  sectionTitle: { color: Colors.textSecondary, fontSize: FontSize.sm, fontWeight: '700', marginBottom: Spacing.sm },

  stockRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  stockCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, borderTopWidth: 3, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center',
  },
  stockValue: { fontSize: FontSize.xxl, fontWeight: '800' },
  stockLabel: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: 2, textAlign: 'center' },

  salesCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  salesMain: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  salesAmount: { color: Colors.textPrimary, fontSize: FontSize.xxxl, fontWeight: '800' },
  growthBadge: { backgroundColor: Colors.success + '22', borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  growthText: { color: Colors.success, fontSize: FontSize.xs, fontWeight: '600' },
  salesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  salesStat: { alignItems: 'center' },
  salesStatValue: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: '700' },
  salesStatLabel: { color: Colors.textMuted, fontSize: FontSize.xs },
  salesDivider: { width: 1, backgroundColor: Colors.border },

  actionsRow: { flexDirection: 'row', gap: Spacing.md },
  actionCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.lg, borderWidth: 2, alignItems: 'center', gap: Spacing.sm,
  },
  actionIcon: { fontSize: 32 },
  actionLabel: { fontSize: FontSize.md, fontWeight: '700' },
});
