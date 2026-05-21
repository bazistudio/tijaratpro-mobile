import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../utils/theme';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color?: string;
}

export const StatCard = ({ label, value, icon, color = Colors.primary }: StatCardProps) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: Colors.border,
    margin: Spacing.xs,
    minWidth: '45%',
  },
  icon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
