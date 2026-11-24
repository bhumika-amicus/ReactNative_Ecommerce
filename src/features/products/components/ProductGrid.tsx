import { useCallback } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { Product } from '@/features/products/types/product';

type ProductGridProps = {
  products: Product[];
  refreshing?: boolean;
  onRefresh?: () => void;
  ListEmptyComponent?: FlatListProps<Product>['ListEmptyComponent'];
};

export function ProductGrid({
  products,
  refreshing = false,
  onRefresh,
  ListEmptyComponent,
}: ProductGridProps) {
  /**
   * Day 6 Optimization: Memoize renderItem to prevent re-allocating a new anonymous
   * function on every parent render or scroll tick, allowing FlatList to recycle cells smoothly.
   */
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => <ProductCard product={item} />,
    []
  );

  /**
   * KeyExtractor guarantees a stable, unique string ID for FlatList virtualization.
   */
  const keyExtractor = useCallback((item: Product) => item.id, []);

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      columnWrapperStyle={products.length > 0 ? styles.row : undefined}
      contentContainerStyle={[
        styles.content,
        products.length === 0 && styles.emptyContent,
      ]}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      windowSize={5}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            colors={[Colors.light.primary]}
            progressBackgroundColor={Colors.light.surface}
          />
        ) : undefined
      }
    />
  );
}

export default ProductGrid;

const styles = StyleSheet.create({
  row: {
    gap: Spacing.gap,
  },
  content: {
    gap: Spacing.gap,
    paddingBottom: Spacing.five,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
