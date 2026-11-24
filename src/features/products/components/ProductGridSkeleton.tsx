import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 6 }: ProductGridSkeletonProps) {
  // Generate paired rows for the 2-column layout
  const rows = Array.from({ length: Math.ceil(count / 2) }, (_, i) => i);

  return (
    <View style={styles.container}>
      {rows.map((rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.gap,
    paddingBottom: Spacing.five,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.gap,
  },
});

