import {
  ElementRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { AlertCircle, ChevronDown, X } from 'lucide-react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button, CategoryCard, EmptyState, SearchBar } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { ProductGridSkeleton } from '@/features/products/components/ProductGridSkeleton';
import { SortModal } from '@/features/products/components/SortModal';
import { useProductFilters } from '@/features/products/hooks/useProductFilters';
import { fetchProducts } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types/product';
import { getFriendlyErrorMessage } from '@/services/apiClient';

export default function ProductsScreen() {
  const params = useLocalSearchParams<{
    category?: string;
    search?: string;
    autoFocus?: string;
  }>();

  // 1. Core Async States (loading, error, success, refresh)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [sortModalOpen, setSortModalOpen] = useState<boolean>(false);

  // 2. Combined Filter State (search, category, sort, reset, active check)
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    resetFilters,
    isFiltered,
    filteredProducts,
  } = useProductFilters(products);

  // 3. Category Horizontal Auto-Scroll (Centers selected category on mount or tap)
  const categoryScrollRef = useRef<ElementRef<typeof ScrollView>>(null);
  const categoryOffsets = useRef<Record<string, number>>({});

  const scrollToCategory = useCallback((cat: string) => {
    const x = categoryOffsets.current[cat.toLowerCase()];
    if (x !== undefined && categoryScrollRef.current) {
      categoryScrollRef.current.scrollTo({
        x: Math.max(0, x - 16),
        animated: true,
      });
    }
  }, []);

  const handleResetFilters = useCallback(() => {
    resetFilters();
    categoryScrollRef.current?.scrollTo({ x: 0, animated: true });
  }, [resetFilters]);

  /**
   * 3. Initial Mount Lifecycle (useEffect + AbortController cleanup)
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
   * 4. User-Triggered Reload Handler (Refresh & Retry functionality)
   * Keeps existing catalog visible if pull-to-refresh encounters network issues.
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
   * 5. Pull-to-Refresh Trigger (RefreshControl)
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleReload(true);
  }, [handleReload]);

  // 6. Dynamically derived categories from live API products
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique];
  }, [products]);

  // 7. Human-friendly sort label matching modern e-commerce standards
  const activeSortLabel = useMemo(() => {
    switch (sortBy) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'rating-desc':
        return 'Top Rated';
      default:
        return 'Most Relevant';
    }
  }, [sortBy]);

  // ─── STATE A: Initial Loading State (Pulsing Skeleton Grid) ─────
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="All Products" showBack />
        <View style={styles.content}>
          <SearchBar
            value=""
            onChangeText={() => { }}
            placeholder="Search products..."
            style={styles.searchBar}
          />
          <ProductGridSkeleton count={6} />
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
        {/* 2. Elevated Real-time Search Input */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          autoFocus={params.autoFocus === 'true'}
          style={styles.searchBar}
        />

        {/* 3. Horizontally Scrollable Category & Filter Chips */}
        {categories.length > 1 && (
          <View style={styles.categoriesWrapper}>
            <ScrollView
              ref={categoryScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            >
              {/* Leading Clear All Pill (appears dynamically when filters are active) */}
              {isFiltered && (
                <Pressable
                  onPress={handleResetFilters}
                  style={({ pressed }) => [
                    styles.clearAllPill,
                    pressed && styles.clearAllPillPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Clear all filters"
                >
                  <X size={13} color={Colors.light.textSecondary} />
                  <Text style={styles.clearAllText}>Clear All</Text>
                </Pressable>
              )}

              {/* Category Pills with Active Highlighting */}
              {categories.map((category) => (
                <View
                  key={category}
                  onLayout={(e) => {
                    const x = e.nativeEvent.layout.x;
                    categoryOffsets.current[category.toLowerCase()] = x;

                    // When the initially selected category is measured, bring it into view immediately!
                    if (
                      selectedCategory.toLowerCase() ===
                      category.toLowerCase() &&
                      x > 0
                    ) {
                      categoryScrollRef.current?.scrollTo({
                        x: Math.max(0, x - 16),
                        animated: true,
                      });
                    }
                  }}
                >
                  <CategoryCard
                    name={category}
                    isSelected={
                      selectedCategory.toLowerCase() === category.toLowerCase()
                    }
                    onSelect={(cat) => {
                      setSelectedCategory(cat);
                      scrollToCategory(cat);
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 4. Streamlined Results & Interactive Sort Row (e-commerce pattern) */}
        <View style={styles.metaRow}>
          <Text style={styles.resultsCount}>
            <Text style={styles.resultsCountBold}>{filteredProducts.length}</Text>{' '}
            {filteredProducts.length === 1 ? 'result' : 'results'} sorted by{' '}
          </Text>

          <Pressable
            onPress={() => setSortModalOpen(true)}
            hitSlop={8}
            style={styles.sortTrigger}
            accessibilityRole="button"
            accessibilityLabel={`Sorted by ${activeSortLabel}. Tap to change.`}
          >
            <Text style={styles.sortHighlight}>{activeSortLabel}</Text>
            <ChevronDown size={14} color={Colors.light.primary} />
          </Pressable>
        </View>

        {/* 5. Reusable FlatList Product Grid with Empty State & Pull-to-Refresh */}
        <ProductGrid
          products={filteredProducts}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <EmptyState
              title="No products found"
              message={
                searchQuery.trim()
                  ? `No products matching "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''
                  }.`
                  : `No products available in ${selectedCategory}.`
              }
              onAction={handleResetFilters}
            />
          }
        />
      </View>

      {/* 6. Sort Modal Action Sheet */}
      <SortModal
        visible={sortModalOpen}
        activeSort={sortBy}
        onSelectSort={setSortBy}
        onClose={() => setSortModalOpen(false)}
      />
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
  searchBar: {
    marginBottom: Spacing.two,
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
  clearAllPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    marginRight: Spacing.two,
  },
  clearAllPillPressed: {
    opacity: 0.7,
  },
  clearAllText: {
    color: Colors.light.text,
    fontSize: Typography.caption,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
    paddingVertical: Spacing.xs,
  },
  resultsCount: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  resultsCountBold: {
    fontWeight: '700',
    color: Colors.light.text,
  },
  sortTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sortHighlight: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
