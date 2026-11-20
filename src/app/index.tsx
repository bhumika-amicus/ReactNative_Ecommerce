import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { Colors, Spacing } from '@/constants/theme';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { products } from '@/features/products/data/products';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader title="Our Products" />

      <View style={styles.content}>
        <ProductGrid products={products} />
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
    paddingTop: Spacing.three,
  },
});
