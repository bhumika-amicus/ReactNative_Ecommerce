import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { products } from '@/features/products/data/products';
import type { Product } from '@/features/products/types/product';

const CATEGORIES = ['All', 'Audio', 'Wearables', 'Footwear', 'Accessories'];

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    Alert.alert(
      'Added to Cart',
      `${product.title} has been added to your cart.`,
    );
  };

  // Derived state: filtered by both Search Text and Category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <AppHeader title="Our Products" cartCount={cartCount} />

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by product name..."
        />

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

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No products found matching "{searchQuery}"
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </Text>
          </View>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        )}
      </View>

      <AppFooter
        selectedCategory={selectedCategory}
        productCount={filteredProducts.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.primary,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  categoriesWrapper: {
    marginBottom: Spacing.two,
  },
  categoriesList: {
    paddingVertical: Spacing.half,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
  },
  emptyText: {
    fontSize: Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});
