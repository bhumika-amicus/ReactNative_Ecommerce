import { Alert, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ShoppingBag, Star } from 'lucide-react-native';

import { Button, Card } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/features/products/types/product';

type ProductCardProps = {
  product: Product;
  style?: StyleProp<ViewStyle>;
};

export function ProductCard({ product, style }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCardPress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  };

  const handleQuickAdd = () => {
    addToCart(product, 1);
    Alert.alert(
      'Added to Cart',
      `Added 1x "${product.title}" to your cart.\n\nTotal: ₹${product.price.toLocaleString('en-IN')}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Card variant="elevated" padding="none" style={[styles.card, style]}>
      {/* Tappable Area to navigate to Product Details Screen */}
      <Pressable onPress={handleCardPress} style={styles.cardInteractive}>
        {/* 1. Edge-to-Edge Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        </View>

        {/* 2. Content with Dedicated Padding */}
        <View style={styles.details}>
          <View style={styles.infoWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {product.title}
            </Text>

            {/* Price & Rating Row */}
            <View style={styles.priceRatingRow}>
              <Text style={styles.totalPrice}>
                ₹{product.price.toLocaleString('en-IN')}
              </Text>

              <View style={styles.ratingBadge}>
                <Star
                  size={11}
                  color={Colors.light.star}
                  fill={Colors.light.star}
                />
                <Text style={styles.ratingScore}>{product.rating}</Text>
              </View>
            </View>
          </View>

          {/* Quick Add Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Add to Cart"
              variant="primary"
              size="sm"
              icon={({ color, size }) => (
                <ShoppingBag size={size} color={color} />
              )}
              onPress={handleQuickAdd}
            />
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    maxWidth: '48.5%',
    flex: 1,
    overflow: 'hidden',
  },
  cardInteractive: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: Spacing.two + 2, // 10px inner padding
    flex: 1,
    justifyContent: 'space-between',
  },
  infoWrapper: {
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.half,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.light.text,
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
  buttonContainer: {
    marginTop: 'auto',
  },
});
