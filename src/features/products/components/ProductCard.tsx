import { Image } from 'expo-image';
import { ShoppingBag, Star } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { Product } from '@/features/products/types/product';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card variant="elevated" padding="md" style={styles.card}>
      <View style={styles.imageContainer}>
        {product.category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{product.category}</Text>
          </View>
        ) : null}

        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.infoGroup}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>

          <Text style={styles.price}>
            ₹{product.price.toLocaleString('en-IN')}
          </Text>

          <View style={styles.ratingRow}>
            <Star
              size={13}
              color={Colors.light.star}
              fill={Colors.light.star}
            />
            <Text style={styles.ratingScore}>{product.rating}</Text>
            <Text style={styles.reviewsCount}>({product.reviewsCount})</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Add to Cart"
            variant="outline"
            size="sm"
            icon={({ color, size }) => (
              <ShoppingBag size={size} color={color} />
            )}
            onPress={() => onAddToCart(product)}
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
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  categoryBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: Radius.small,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    textTransform: 'uppercase',
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
  infoGroup: {
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
  },
  price: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },
  reviewsCount: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  buttonContainer: {
    marginTop: Spacing.two,
  },
});
