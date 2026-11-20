import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ShoppingBag, Star } from 'lucide-react-native';

import { Button, Card, QuantitySelector } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/features/products/types/product';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  // Derived state: Dynamic total price
  const totalPrice = product.price * quantity;

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(10, prev + 1));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCartPress = () => {
    // 1. Add to global cart context
    addToCart(product, quantity);

    // 2. User feedback Alert
    Alert.alert(
      'Added to Cart',
      `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${product.title}" to your cart.\n\nTotal: ₹${totalPrice.toLocaleString('en-IN')}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Card variant="elevated" padding="md" style={styles.card}>
      {/* 1. Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
      </View>

      {/* 2. Content & Actions */}
      <View style={styles.details}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        {/* Price & Rating Row */}
        <View style={styles.priceRatingRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPrice}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
            {quantity > 1 && (
              <Text style={styles.unitPrice}>
                (₹{product.price.toLocaleString('en-IN')} ea)
              </Text>
            )}
          </View>

          <View style={styles.ratingBadge}>
            <Star
              size={12}
              color={Colors.light.star}
              fill={Colors.light.star}
            />
            <Text style={styles.ratingScore}>{product.rating}</Text>
          </View>
        </View>

        {/* Quantity Stepper */}
        <View style={styles.quantitySection}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
            max={10}
          />
        </View>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Cart"
            variant="primary"
            size="sm"
            icon={({ color, size }) => (
              <ShoppingBag size={size} color={color} />
            )}
            onPress={handleAddToCartPress}
          />
        </View>
      </View>
    </Card>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    maxWidth: '49%',
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    marginTop: Spacing.two,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.half,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  priceContainer: {
    flex: 1,
    marginRight: Spacing.one,
  },
  totalPrice: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.light.text,
  },
  unitPrice: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: Radius.pill,
  },
  ratingScore: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.text,
  },
  quantitySection: {
    marginBottom: Spacing.two,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
