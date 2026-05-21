import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/utils/theme';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Rice (50kg)', sku: 'RICE-50', stock: 120, price: 'Rs 5,500', category: 'Grains' },
  { id: '2', name: 'Sugar (1kg)', sku: 'SUG-1',  stock: 8,   price: 'Rs 160',   category: 'Essentials' },
  { id: '3', name: 'Cooking Oil (5L)', sku: 'OIL-5', stock: 45, price: 'Rs 1,850', category: 'Oils' },
  { id: '4', name: 'Flour (10kg)', sku: 'FLOUR-10', stock: 0,  price: 'Rs 1,200', category: 'Grains' },
  { id: '5', name: 'Tea (500g)', sku: 'TEA-500', stock: 32, price: 'Rs 650', category: 'Beverages' },
  { id: '6', name: 'Salt (1kg)', sku: 'SALT-1', stock: 200, price: 'Rs 50', category: 'Essentials' },
];

export default function ProductsScreen() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const getStockColor = (stock: number) => {
    if (stock === 0) return Colors.danger;
    if (stock < 10) return Colors.warning;
    return Colors.success;
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Search products or SKU..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Product count */}
      <Text style={styles.countText}>{filtered.length} products</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: Spacing.xxl }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>📦</Text>
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.sku} · {item.category}</Text>
              </View>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.price}>{item.price}</Text>
              <View style={[styles.stockBadge, { backgroundColor: getStockColor(item.stock) + '22' }]}>
                <Text style={[styles.stockText, { color: getStockColor(item.stock) }]}>
                  {item.stock === 0 ? 'Out' : `${item.stock} left`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.md },
  searchRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md, marginBottom: Spacing.sm },
  search: {
    flex: 1, backgroundColor: Colors.surfaceAlt, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    color: Colors.textPrimary, fontSize: FontSize.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  addBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    width: 46, alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: Colors.white, fontSize: 22, fontWeight: '300' },
  countText: { color: Colors.textMuted, fontSize: FontSize.sm, marginBottom: Spacing.sm },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, marginBottom: Spacing.xs,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  iconBox: {
    width: 40, height: 40, borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceAlt, alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  name: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '600' },
  meta: { color: Colors.textMuted, fontSize: FontSize.xs, marginTop: 2 },
  rowRight: { alignItems: 'flex-end', gap: 4 },
  price: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: '700' },
  stockBadge: { borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  stockText: { fontSize: FontSize.xs, fontWeight: '600' },
  separator: { height: Spacing.xs },
});
