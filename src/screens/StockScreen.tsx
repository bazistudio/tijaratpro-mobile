import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, ScrollView
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';

const STOCK_ITEMS = [
  { id: '1', name: 'Rice (50kg)',       sku: 'RICE-50',  qty: 120, min: 20,  location: 'Shelf A1' },
  { id: '2', name: 'Sugar (1kg)',        sku: 'SUG-1',    qty: 8,   min: 20,  location: 'Shelf B3' },
  { id: '3', name: 'Cooking Oil (5L)',   sku: 'OIL-5',    qty: 45,  min: 10,  location: 'Shelf C2' },
  { id: '4', name: 'Flour (10kg)',       sku: 'FLOUR-10', qty: 0,   min: 15,  location: 'Shelf A2' },
  { id: '5', name: 'Tea (500g)',         sku: 'TEA-500',  qty: 32,  min: 10,  location: 'Shelf D1' },
];

type Filter = 'all' | 'low' | 'out';

export default function StockScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = STOCK_ITEMS.filter(item => {
    if (filter === 'low') return item.qty > 0 && item.qty < item.min;
    if (filter === 'out') return item.qty === 0;
    return true;
  });

  const getStatus = (qty: number, min: number) => {
    if (qty === 0) return { label: 'Out of Stock', color: Colors.danger };
    if (qty < min) return { label: 'Low Stock', color: Colors.warning };
    return { label: 'In Stock', color: Colors.success };
  };

  return (
    <View style={styles.container}>
      {/* Summary bar */}
      <View style={styles.summaryRow}>
        {[
          { label: 'Total Items', value: STOCK_ITEMS.length, color: Colors.primary },
          { label: 'Low Stock',   value: STOCK_ITEMS.filter(i => i.qty > 0 && i.qty < i.min).length, color: Colors.warning },
          { label: 'Out of Stock',value: STOCK_ITEMS.filter(i => i.qty === 0).length, color: Colors.danger },
        ].map(s => (
          <View key={s.label} style={[styles.summaryCard, { borderTopColor: s.color }]}>
            <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.summaryLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Filter chips */}
      <View style={styles.chips}>
        {(['all', 'low', 'out'] as Filter[]).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.activeChip]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.activeChipText]}>
              {f === 'all' ? 'All' : f === 'low' ? '⚠️ Low' : '🔴 Out'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stock list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: Spacing.xxl }}
        renderItem={({ item }) => {
          const status = getStatus(item.qty, item.min);
          return (
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.rowTop}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: status.color + '22' }]}>
                  <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                </View>
              </View>
              <View style={styles.rowBottom}>
                <Text style={styles.meta}>SKU: {item.sku}</Text>
                <Text style={styles.meta}>📍 {item.location}</Text>
              </View>
              {/* Progress bar */}
              <View style={styles.progressBg}>
                <View style={[
                  styles.progressFill,
                  {
                    width: `${Math.min((item.qty / Math.max(item.min * 2, 1)) * 100, 100)}%`,
                    backgroundColor: status.color,
                  }
                ]} />
              </View>
              <Text style={styles.qty}>
                <Text style={{ color: status.color, fontWeight: '700' }}>{item.qty}</Text>
                <Text style={{ color: Colors.textMuted }}> / min {item.min} units</Text>
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.md },
  summaryRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  summaryCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.sm, borderTopWidth: 3, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center',
  },
  summaryValue: { fontSize: FontSize.xl, fontWeight: '800' },
  summaryLabel: { color: Colors.textMuted, fontSize: FontSize.xs, textAlign: 'center', marginTop: 2 },
  chips: { flexDirection: 'row', gap: Spacing.sm, marginVertical: Spacing.md },
  chip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    borderRadius: Radius.full, backgroundColor: Colors.surfaceAlt,
    borderWidth: 1, borderColor: Colors.border,
  },
  activeChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  activeChipText: { color: Colors.white, fontWeight: '600' },
  row: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1, borderColor: Colors.border,
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  name: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '600', flex: 1, marginRight: Spacing.sm },
  badge: { borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  badgeText: { fontSize: FontSize.xs, fontWeight: '700' },
  rowBottom: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  meta: { color: Colors.textMuted, fontSize: FontSize.xs },
  progressBg: { height: 4, backgroundColor: Colors.border, borderRadius: 2, marginBottom: 4 },
  progressFill: { height: 4, borderRadius: 2 },
  qty: { fontSize: FontSize.sm },
});
