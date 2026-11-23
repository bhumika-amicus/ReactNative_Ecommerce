import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

import { Card } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

interface PromoItem {
  id: string;
  title: string;
  description: string;
  category?: string;
}

const PROMOS: PromoItem[] = [
  {
    id: 'new',
    title: 'New Arrivals',
    description: 'Fresh drops just landed this week.',
    category: 'Audio',
  },
  {
    id: 'bestsellers',
    title: 'Best Sellers',
    description: 'Customer top picks and favorites.',
    category: 'Wearables',
  },
  {
    id: 'sale',
    title: 'Sale Items',
    description: 'Special limited-time price drops.',
  },
  {
    id: 'giftcards',
    title: 'Gift Cards',
    description: 'Delivered instantly to your inbox.',
  },
];

export function PromoBannerGrid() {
  const router = useRouter();

  const handlePress = (category?: string) => {
    if (category) {
      router.push({
        pathname: '/products',
        params: { category },
      });
    } else {
      router.push('/products');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {PROMOS.map((promo) => (
          <Card
            key={promo.id}
            variant="bordered"
            padding="none"
            style={styles.cardWrapper}
          >
            <Pressable
              onPress={() => handlePress(promo.category)}
              style={({ pressed }) => [
                styles.cardContent,
                pressed && styles.cardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={promo.title}
            >
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {promo.title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {promo.description}
                </Text>
              </View>

              {/* Minimal Bottom-Right Directional Affordance */}
              <View style={styles.footerRow}>
                <View style={styles.arrowCircle}>
                  <ArrowRight size={13} color={Colors.light.primary} />
                </View>
              </View>
            </Pressable>
          </Card>
        ))}
      </View>
    </View>
  );
}

export default PromoBannerGrid;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.four,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48.5%',
    minHeight: 110,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.85,
    backgroundColor: Colors.light.backgroundElement,
  },
  title: {
    fontSize: Typography.regular,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xxs,
  },
  description: {
    fontSize: Typography.micro,
    color: Colors.light.textSecondary,
    lineHeight: 15,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.two,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.promos.blue.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
