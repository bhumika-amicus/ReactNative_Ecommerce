import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { AlertCircle, ShoppingBag, Star } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button, QuantitySelector } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { fetchProductById } from '@/features/products/services/productService';
import type { Product } from '@/features/products/types/product';
import { getFriendlyErrorMessage } from '@/services/apiClient';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  // 1. Core State Machine for Async Data Fetching
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  /**
   * Extracted loadProduct callback enables both initial load and user-triggered "Try Again"
   */
  const loadProduct = useCallback(
    async (signal?: AbortSignal) => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id, signal);
        setProduct(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(getFriendlyErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadProduct(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadProduct]);

  // ─── STATE A: Initial Loading ────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="Product Details" showBack />
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={styles.loadingText}>Fetching product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── STATE B: Error State with Retry Button ──────────────────────
  if (error || !product) {
    const isNotFound =
      error?.toLowerCase().includes('not find') || error?.includes('404');

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="Product Details" showBack />
        <View style={styles.centeredContainer}>
          <View style={styles.errorIconCircle}>
            <AlertCircle size={36} color={Colors.light.danger} />
          </View>
          <Text style={styles.errorTitle}>
            {isNotFound ? 'Product Not Found' : 'Something went wrong'}
          </Text>
          <Text style={styles.errorMessage}>
            {error ?? "We couldn't load the product you're looking for."}
          </Text>
          <Button
            title="Try Again"
            variant="primary"
            size="md"
            onPress={() => loadProduct()}
            style={styles.retryButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart',
      `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${product.title}" to your cart.\n\nTotal: $${totalPrice.toFixed(2)}`,
      [{ text: 'OK' }]
    );
  };

  // ─── STATE C: Success State with Full Details ────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* 1. Header with Back Button (Clean, stable title across states) */}
      <AppHeader title="Product Details" showBack />

      {/* 2. Scrollable Product Details */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Product Image with Shared Hardware-Accelerated Cache */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: product.image }}
            style={styles.heroImage}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
          />
        </View>

        {/* Product Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.metaRow}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Star
                size={14}
                color={Colors.light.star}
                fill={Colors.light.star}
              />
              <Text style={styles.ratingScore}>{product.rating}</Text>
              <Text style={styles.reviewsCount}>({product.reviewsCount} reviews)</Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${product.price.toFixed(2)}
            </Text>
            <Text style={styles.taxInclusive}>Inclusive of all taxes</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionHeading}>About this product</Text>
            <Text style={styles.description}>
              {product.description ||
                'Crafted for premium performance and modern living. Features high-grade durable materials, sleek ergonomics, and dependable everyday quality.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 3. Sticky Bottom Action Bar with Stepper & Add to Cart */}
      <View style={styles.bottomBar}>
        <View style={styles.stepperWrapper}>
          <Text style={styles.stepperLabel}>Qty:</Text>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            min={1}
            max={10}
          />
        </View>

        <View style={styles.ctaButtonWrapper}>
          <Button
            title={`Add • $${totalPrice.toFixed(2)}`}
            variant="primary"
            size="md"
            icon={({ color, size }) => (
              <ShoppingBag size={size} color={color} />
            )}
            onPress={handleAddToCart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingBottom: Spacing.four,
  },
  imageCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.card,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: Spacing.two,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    marginTop: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.card,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  categoryPill: {
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
  },
  categoryText: {
    fontSize: Typography.badge,
    fontWeight: '700',
    color: Colors.light.primary,
    textTransform: 'uppercase',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingScore: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
  },
  reviewsCount: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
  },
  title: {
    fontSize: Typography.heading,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.two,
  },
  priceContainer: {
    marginBottom: Spacing.three,
  },
  price: {
    fontSize: Typography.heading,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  taxInclusive: {
    fontSize: Typography.micro,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xxs,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: Spacing.three,
  },
  sectionHeading: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.one,
  },
  description: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    lineHeight: 22,
  },
  bottomBar: {
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  stepperWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stepperLabel: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  ctaButtonWrapper: {
    flex: 1,
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
  },
  retryButton: {
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
