import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

interface PromoItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  category?: string;
  badge: string;
  bgTint: string;
  accentColor: string;
}

const PROMOS: PromoItem[] = [
  {
    id: 'new',
    title: 'New Arrivals',
    description: 'Fresh drops just landed this week.',
    buttonText: 'Shop New',
    category: 'Audio',
    badge: 'FRESH',
    bgTint: Colors.light.promos.blue.bg,
    accentColor: Colors.light.promos.blue.accent,
  },
  {
    id: 'bestsellers',
    title: 'Best Sellers',
    description: 'Most loved & highest rated gear.',
    buttonText: 'Shop Top',
    category: 'Wearables',
    badge: 'POPULAR',
    bgTint: Colors.light.promos.amber.bg,
    accentColor: Colors.light.promos.amber.accent,
  },
  {
    id: 'sale',
    title: 'Sale Items',
    description: 'Limited-time special price drops.',
    buttonText: 'View Deals',
    badge: 'UP TO 40%',
    bgTint: Colors.light.promos.rose.bg,
    accentColor: Colors.light.promos.rose.accent,
  },
  {
    id: 'giftcards',
    title: 'Gift Cards',
    description: 'The easiest choice for any occasion.',
    buttonText: 'Buy Gift',
    badge: 'INSTANT',
    bgTint: Colors.light.promos.purple.bg,
    accentColor: Colors.light.promos.purple.accent,
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
          <Pressable
            key={promo.id}
            onPress={() => handlePress(promo.category)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: promo.bgTint },
              pressed && styles.cardPressed,
            ]}
            accessibilityRole="button"
          >
            <View style={styles.badgeWrapper}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: promo.accentColor + '18' },
                ]}
              >
                <Text
                  style={[styles.badgeText, { color: promo.accentColor }]}
                >
                  {promo.badge}
                </Text>
              </View>
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.title}>{promo.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {promo.description}
              </Text>
            </View>

            <View style={styles.actionRow}>
              <Text
                style={[styles.buttonLabel, { color: promo.accentColor }]}
              >
                {promo.buttonText}
              </Text>
              <ArrowRight size={13} color={promo.accentColor} />
            </View>
          </Pressable>
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
  card: {
    width: '48.5%',
    minHeight: 140,
    borderRadius: Radius.card,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  badgeWrapper: {
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  textWrapper: {
    marginVertical: Spacing.one,
  },
  title: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    lineHeight: 15,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.one,
  },
  buttonLabel: {
    fontSize: Typography.small - 1,
    fontWeight: '700',
  },
});
