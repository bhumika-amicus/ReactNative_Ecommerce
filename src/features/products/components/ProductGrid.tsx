import { FlatList, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { Product } from '@/features/products/types/product';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
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
