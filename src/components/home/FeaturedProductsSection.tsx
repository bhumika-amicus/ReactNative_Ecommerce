import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle, ArrowRight, RotateCcw } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { ProductCard } from '@/features/products/components/ProductCard';
import { fetchProducts } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types/product';

type FeaturedProductsSectionProps = {
  refreshTrigger?: number;
};

export function FeaturedProductsSection({
  refreshTrigger,
}: FeaturedProductsSectionProps) {
  const router = useRouter();

  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeatured = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(signal);
      // Top rated picks (rating >= 4.0, max 6 items)
      const topRated = data.filter((p) => p.rating >= 4.0).slice(0, 6);
      setFeatured(topRated.length > 0 ? topRated : data.slice(0, 6));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError('Unable to load featured products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadFeatured(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadFeatured, refreshTrigger]);

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

      {/* State A: Loading Indicator */}
      {loading && featured.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.light.primary} />
        </View>
      ) : error && featured.length === 0 ? (
        /* State B: Graceful Inline Retry (Never leave an awkward blank void on Home) */
        <View style={styles.errorContainer}>
          <AlertCircle size={18} color={Colors.light.danger} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            onPress={() => loadFeatured()}
            style={styles.inlineRetryBtn}
            accessibilityRole="button"
          >
            <RotateCcw size={13} color={Colors.light.primary} />
            <Text style={styles.inlineRetryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        /* State C: Horizontal Carousel */
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
  errorContainer: {
    height: 100,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    padding: Spacing.two,
  },
  errorText: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
  },
  inlineRetryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: 5,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.pill,
    marginTop: 2,
  },
  inlineRetryText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
