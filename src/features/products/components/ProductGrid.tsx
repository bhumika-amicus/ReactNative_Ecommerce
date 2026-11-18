import { FlatList, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import type { Product } from '@/features/products/types/product';

type ProductGridProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onAddToCart={onAddToCart}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      
    />
  );
}

export default ProductGrid;

const styles = StyleSheet.create({
  row: {
    gap: Spacing.three,
  },
  content: {
    gap: Spacing.three,
    paddingBottom: Spacing.five,
  },
});
