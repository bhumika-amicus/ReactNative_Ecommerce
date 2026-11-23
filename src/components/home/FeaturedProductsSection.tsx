import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import { products } from '@/features/products/data/products';

export function FeaturedProductsSection() {
  const router = useRouter();

  // Filter top rated products (rating >= 4.6)
  const featured = products.filter((p) => p.rating >= 4.6);

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Featured Products</Text>
          <Text style={styles.subtitle}>Top rated picks customers love</Text>
        </View>

        <Pressable
          onPress={() => router.push('/products')}
          hitSlop={8}
          style={styles.seeAllBtn}
          accessibilityRole="button"
        >
          <Text style={styles.seeAllText}>See All</Text>
          <ArrowRight size={14} color={Colors.light.primary} />
        </Pressable>
      </View>

      {/* Horizontal Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            style={styles.productCard}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default FeaturedProductsSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.gap,
  },
  title: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xxs,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  seeAllText: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  scrollContent: {
    paddingRight: Spacing.two,
    paddingVertical: Spacing.one,
    gap: Spacing.two,
  },
  productCard: {
    width: 190,
    maxWidth: 190,
  },
});

