import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { fetchProducts } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types/product';
import { getFriendlyErrorMessage } from '@/services/apiClient';

export default function ProductsScreen() {
  const params = useLocalSearchParams<{ category?: string }>();

  // 1. Core Async States (Assignment 7: loading, error, success, refresh)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [userCategory, setUserCategory] = useState<string | null>(null);

  /**
   * 2. Initial Mount Lifecycle (Assignment 7: useEffect + AbortController cleanup)
   * Automatically aborts in-flight fetch when navigating away from the screen.
   */
  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const data = await fetchProducts(controller.signal);
        setProducts(data);
        setError(null);
      } catch (err: unknown) {
        // Native AbortError: User navigated away; ignore silently without error flash
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(getFriendlyErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, []);

  /**
   * 3. User-Triggered Reload Handler (Assignment 7: Refresh & Retry functionality)
   *
   * Mobile UX Best Practice (Day 6 Topic #6):
   * When pulling down to refresh an existing catalog, if the network drops,
   * we must NOT wipe existing products off screen. We keep them and alert the user.
   */
  const handleReload = useCallback(async (isPullToRefresh = false) => {
    try {
      if (!isPullToRefresh) setError(null);

      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;

      const message = getFriendlyErrorMessage(err);
      if (isPullToRefresh && products.length > 0) {
        Alert.alert('Refresh Failed', message);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [products.length]);

  /**
   * 4. Pull-to-Refresh Trigger (Assignment 7: RefreshControl)
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleReload(true);
  }, [handleReload]);

  // 5. Dynamically derived categories from live API products
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique];
  }, [products]);

  // 6. Selected category calculation
  const validParamCategory =
    params.category && categories.includes(params.category)
      ? params.category
      : null;

  const selectedCategory = userCategory ?? validParamCategory ?? 'All';

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // ─── STATE A: Initial Loading State ──────────────────────────────
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="All Products" showBack />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── STATE B: Full-Page Error State with Retry (Only if initial load fails and 0 products exist) ───
  if (error && !loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="All Products" showBack />
        <View style={styles.centeredContainer}>
          <View style={styles.errorIconCircle}>
            <AlertCircle size={36} color={Colors.light.danger} />
          </View>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button
            title="Try Again"
            variant="primary"
            size="md"
            onPress={() => {
              setLoading(true);
              handleReload(false);
            }}
            style={styles.retryButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ─── STATE C: Success State with Products Grid ───────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* 1. Header with Back Button */}
      <AppHeader title="All Products" showBack />

      <View style={styles.content}>
        {/* 2. Category Filters (Horizontal Scroll) */}
        {categories.length > 1 && (
          <View style={styles.categoriesWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  name={category}
                  isSelected={selectedCategory === category}
                  onSelect={setUserCategory}
                />
              ))}
            </ScrollView>
          </View>
        )}

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

        {/* 4. Reusable FlatList Product Grid with Pull-to-Refresh */}
        <ProductGrid
          products={filteredProducts}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
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
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  loadingText: {
    marginTop: Spacing.gap,
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  errorIconCircle: {
    width: 68,
    height: 68,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.gap,
  },
  errorTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  errorMessage: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.three,
  },
  retryButton: {
    paddingHorizontal: Spacing.four,
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
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.pill,
  },
  activePillText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});

