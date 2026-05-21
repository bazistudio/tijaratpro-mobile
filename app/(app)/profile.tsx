import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';
import { useAuth } from '../../src/store/AuthContext';

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: '#E55353',
  ADMIN: '#5B4FE8',
  MANAGER: '#F4A261',
  CASHIER: '#2DC57E',
};

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const roleColor = ROLE_COLORS[user?.role ?? ''] ?? Colors.primary;
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: roleColor + '33' }]}>
          <Text style={[styles.avatarText, { color: roleColor }]}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <View style={[styles.roleBadge, { backgroundColor: roleColor + '22' }]}>
          <Text style={[styles.roleText, { color: roleColor }]}>
            {user?.role?.replace('_', ' ') ?? 'ADMIN'}
          </Text>
        </View>
      </View>

      {/* Info rows */}
      <View style={styles.infoCard}>
        {[
          { label: 'Shop ID', value: user?.shopId ?? 'N/A' },
          { label: 'Role',    value: user?.role?.replace('_', ' ') ?? 'ADMIN' },
          { label: 'Status',  value: 'Active' },
        ].map(row => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>🚪  Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  avatarSection: { alignItems: 'center', marginBottom: Spacing.xl },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  avatarText: { fontSize: FontSize.xxxl, fontWeight: '800' },
  name: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: '700' },
  email: { color: Colors.textSecondary, fontSize: FontSize.sm, marginTop: 4 },
  roleBadge: {
    marginTop: Spacing.sm, borderRadius: Radius.full,
    paddingHorizontal: Spacing.md, paddingVertical: 4,
  },
  roleText: { fontSize: FontSize.sm, fontWeight: '700' },
  infoCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.lg, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  infoLabel: { color: Colors.textSecondary, fontSize: FontSize.md },
  infoValue: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '600' },
  logoutBtn: {
    backgroundColor: Colors.danger + '22', borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.danger + '44',
  },
  logoutText: { color: Colors.danger, fontSize: FontSize.md, fontWeight: '700' },
});
