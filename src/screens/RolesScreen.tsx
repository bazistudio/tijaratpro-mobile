import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';

const USERS = [
  { id: '1', name: 'Naveed Gul',    email: 'gulnaveed12@ymail.com', role: 'SUPER_ADMIN', active: true },
  { id: '2', name: 'Imran Khan',    email: 'imran@shop.com',        role: 'ADMIN',       active: true },
  { id: '3', name: 'Fatima Butt',   email: 'fatima@shop.com',       role: 'MANAGER',     active: true },
  { id: '4', name: 'Ali Ahmed',     email: 'ali@shop.com',          role: 'CASHIER',     active: false },
  { id: '5', name: 'Sara Qureshi',  email: 'sara@shop.com',         role: 'CASHIER',     active: true },
];

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: '#E55353',
  ADMIN:       '#5B4FE8',
  MANAGER:     '#F4A261',
  CASHIER:     '#2DC57E',
};

export default function RolesScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Role legend */}
      <View style={styles.legend}>
        {Object.entries(ROLE_COLORS).map(([role, color]) => (
          <View key={role} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{role.replace('_', ' ')}</Text>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{USERS.length}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Colors.success }]}>
            {USERS.filter(u => u.active).length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: Colors.danger }]}>
            {USERS.filter(u => !u.active).length}
          </Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
      </View>

      {/* Add user btn */}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>＋  Add User</Text>
      </TouchableOpacity>

      {/* User list */}
      <FlatList
        data={USERS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: Spacing.xxl }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.row, selected === item.id && styles.rowSelected]}
            onPress={() => setSelected(selected === item.id ? null : item.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.avatar, { backgroundColor: ROLE_COLORS[item.role] + '33' }]}>
              <Text style={[styles.avatarText, { color: ROLE_COLORS[item.role] }]}>
                {item.name[0]}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                {!item.active && (
                  <View style={styles.inactiveBadge}>
                    <Text style={styles.inactiveTxt}>Inactive</Text>
                  </View>
                )}
              </View>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={[styles.roleBadge, { backgroundColor: ROLE_COLORS[item.role] + '22' }]}>
              <Text style={[styles.roleText, { color: ROLE_COLORS[item.role] }]}>
                {item.role.replace('_', '\n')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.md },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: Colors.textMuted, fontSize: FontSize.xs },
  statsRow: {
    flexDirection: 'row', gap: Spacing.sm, marginVertical: Spacing.md,
  },
  statBox: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.sm, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  statValue: { color: Colors.textPrimary, fontSize: FontSize.xl, fontWeight: '800' },
  statLabel: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: 2 },
  addBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', marginBottom: Spacing.md,
  },
  addBtnText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  rowSelected: { borderColor: Colors.primary },
  avatar: {
    width: 44, height: 44, borderRadius: Radius.full,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: FontSize.lg, fontWeight: '700' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  name: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '600' },
  email: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: 2 },
  inactiveBadge: { backgroundColor: Colors.danger + '22', borderRadius: Radius.full, paddingHorizontal: 6 },
  inactiveTxt: { color: Colors.danger, fontSize: FontSize.xs },
  roleBadge: { borderRadius: Radius.sm, padding: Spacing.xs, alignItems: 'center' },
  roleText: { fontSize: FontSize.xs, fontWeight: '700', textAlign: 'center' },
});
