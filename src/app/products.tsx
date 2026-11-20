import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { AppHeader } from '@/components/layout/AppHeader';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { products } from '@/features/products/data/products';

const CATEGORIES = ['All', 'Audio', 'Wearables', 'Footwear', 'Accessories'];

export default function ProductsScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (params.category && CATEGORIES.includes(params.category)) {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  // Derived state: filtered products computed synchronously during render
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* 1. Header with Back Button */}
      <AppHeader title="All Products" showBack />

      <View style={styles.content}>
        {/* 2. Category Filters (Horizontal Scroll) */}
        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category}
                name={category}
                isSelected={selectedCategory === category}
                onSelect={setSelectedCategory}
              />
            ))}
          </ScrollView>
        </View>

        {/* 3. Live Product Count Update Bar */}
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Showing <Text style={styles.countBold}>{filteredProducts.length}</Text>{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </Text>

          {selectedCategory !== 'All' && (
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>{selectedCategory}</Text>
            </View>
          )}
        </View>

        {/* 4. Reusable FlatList Product Grid */}
        <ProductGrid products={filteredProducts} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  categoriesWrapper: {
    marginBottom: Spacing.two,
  },
  categoriesList: {
    paddingVertical: Spacing.half,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  countText: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  countBold: {
    fontWeight: '700',
    color: Colors.light.text,
  },
  activePill: {
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: 2,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.pill,
  },
  activePillText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});

