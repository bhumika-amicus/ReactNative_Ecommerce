import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import { Card } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export type CategoryItem = {
  id: string | number;
  name: string;
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Audio' },
  { id: '2', name: 'Wearables' },
  { id: '3', name: 'Footwear' },
  { id: '4', name: 'Accessories' },
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

      {/* Clean, API-ready 2-column Category Cards */}
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
            accessibilityLabel={`Category ${cat.name}`}
          >
            <Card variant="bordered" padding="none" style={styles.card}>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <ChevronRight size={16} color={Colors.light.textSecondary} />
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
    marginBottom: Spacing.four + 4,
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
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.card,
    backgroundColor: Colors.light.surface,
  },
  categoryName: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
  },
});
