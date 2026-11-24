import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import { fetchProducts } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types/product';

export function FeaturedProductsSection() {
  const router = useRouter();

  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((data) => {
        // Top rated picks (rating >= 4.0, max 6 items)
        const topRated = data.filter((p) => p.rating >= 4.0).slice(0, 6);
        setFeatured(topRated.length > 0 ? topRated : data.slice(0, 6));
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

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
      {loading && featured.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.light.primary} />
        </View>
      ) : (
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
      )}
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
  loadingContainer: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

