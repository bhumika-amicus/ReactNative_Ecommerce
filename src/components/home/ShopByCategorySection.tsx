import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Card } from '@/components/ui';
import { Colors, Spacing, Typography } from '@/constants/theme';

export type CategoryItem = {
  id: string | number;
  name: string;
  label?: string;
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'electronics', label: 'Electronics' },
  { id: '2', name: 'jewelery', label: 'Jewelry' },
  { id: '3', name: "men's clothing", label: "Men's Fashion" },
  { id: '4', name: "women's clothing", label: "Women's Fashion" },
];

type ShopByCategorySectionProps = {
  categories?: CategoryItem[];
};

export function ShopByCategorySection({
  categories = DEFAULT_CATEGORIES,
}: ShopByCategorySectionProps) {
  const router = useRouter();

  const handleSelect = (categoryName: string) => {
    router.push({
      pathname: '/products',
      params: { category: categoryName },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Shop by Category</Text>

      {/* Modern, clean centered category tiles */}
      <View style={styles.grid}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => handleSelect(cat.name)}
            style={({ pressed }) => [
              styles.cardWrapper,
              pressed && styles.cardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Category ${cat.label ?? cat.name}`}
          >
            <Card variant="bordered" padding="none" style={styles.card}>
              <Text style={styles.categoryName} numberOfLines={1}>
                {cat.label ?? cat.name}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default ShopByCategorySection;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.section,
  },
  sectionTitle: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.three,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48.5%',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  card: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  categoryName: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
    letterSpacing: 0.2,
  },
});
