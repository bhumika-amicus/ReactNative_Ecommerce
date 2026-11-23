import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
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
  };

  return (
    <Card variant="elevated" padding="none" style={[styles.card, style]}>
      {/* Zone 1: Navigation Touch Target (Image + Title + Rating) */}
      <Pressable
        onPress={handleCardPress}
        style={({ pressed }) => [
          styles.navZone,
          pressed && styles.navZonePressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${product.title}`}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
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
      </Pressable>

      {/* Zone 2: Independent Action Row (Price + Add Button - Completely decoupled) */}
      <View style={styles.bottomRow}>
        <Text style={styles.totalPrice}>
          ₹{product.price.toLocaleString('en-IN')}
        </Text>

        <Button
          title="Add"
          variant="primary"
          size="sm"
          icon={({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          )}
          onPress={handleQuickAdd}
          style={styles.addBtn}
        />
      </View>
    </Card>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    maxWidth: '48.5%',
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  navZone: {
    flex: 1,
  },
  navZonePressed: {
    opacity: 0.9,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoWrapper: {
    paddingHorizontal: Spacing.compact,
    paddingTop: Spacing.two,
  },
  title: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
  },
  ratingScore: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.text,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.compact,
    paddingBottom: Spacing.compact,
    paddingTop: Spacing.one,
  },
  totalPrice: {
    fontSize: Typography.body,
    fontWeight: '800',
    color: Colors.light.text,
  },
  addBtn: {
    borderRadius: Radius.button,
    paddingHorizontal: Spacing.gap,
  },
});
