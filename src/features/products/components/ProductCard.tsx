import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';

import type { Product } from '@/features/products/types/product';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Typography } from '@/constants/theme';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
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
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 120,
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
    marginTop: Spacing.three,
  },
});
