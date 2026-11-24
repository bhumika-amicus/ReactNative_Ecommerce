import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { Product } from '@/features/products/types/product';

type ProductGridProps = {
  products: Product[];
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function ProductGrid({
  products,
  refreshing = false,
  onRefresh,
}: ProductGridProps) {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
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
});
