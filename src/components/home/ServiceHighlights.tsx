import { StyleSheet, Text, View } from 'react-native';
import { CreditCard, Headphones, Truck } from 'lucide-react-native';

import { Card } from '@/components/ui';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export function ServiceHighlights() {
  return (
    <Card variant="bordered" padding="none" style={styles.card}>
      {/* 1. Secure Pay */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <CreditCard size={16} color={Colors.light.primary} />
        </View>
        <Text style={styles.title}>Secure Pay</Text>
        <Text style={styles.subtitle}>100% Safe</Text>
      </View>

      <View style={styles.divider} />

      {/* 2. 24/7 Support */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <Headphones size={16} color={Colors.light.primary} />
        </View>
        <Text style={styles.title}>24/7 Help</Text>
        <Text style={styles.subtitle}>Live Care</Text>
      </View>

      <View style={styles.divider} />

      {/* 3. Fast Shipping */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <Truck size={16} color={Colors.light.primary} />
        </View>
        <Text style={styles.title}>Fast Ship</Text>
        <Text style={styles.subtitle}>Tracked</Text>
      </View>
    </Card>
  );
}

export default ServiceHighlights;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.inner,
    paddingHorizontal: Spacing.two,
    marginBottom: Spacing.four,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.promos.blue.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Spacing.xxs,
  },
  subtitle: {
    fontSize: Typography.badge,
    fontWeight: '500',
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.light.border,
  },
});
