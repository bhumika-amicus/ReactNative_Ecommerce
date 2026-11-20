import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag, Star } from 'lucide-react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import { Button, QuantitySelector } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { products } from '@/features/products/data/products';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <AppHeader title="Not Found" showBack />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart',
      `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${product.title}" to your cart.\n\nTotal: ₹${totalPrice.toLocaleString('en-IN')}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* 1. Header with Back Button */}
      <AppHeader title={product.title} showBack />

      {/* 2. Scrollable Product Details */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Product Image */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: product.image }}
            style={styles.heroImage}
            resizeMode="cover"
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
              ₹{product.price.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.taxInclusive}>Inclusive of all taxes</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionHeading}>About this product</Text>
            <Text style={styles.description}>
              Crafted for premium performance and modern living. Features high-grade durable materials, sleek ergonomics, and dependable everyday quality.
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
            title={`Add • ₹${totalPrice.toLocaleString('en-IN')}`}
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
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.pill,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.light.primary,
    textTransform: 'uppercase',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    fontSize: 11,
    color: Colors.light.textSecondary,
    marginTop: 2,
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
    gap: 6,
  },
  stepperLabel: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  ctaButtonWrapper: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: Typography.body,
    color: Colors.light.textSecondary,
  },
});

