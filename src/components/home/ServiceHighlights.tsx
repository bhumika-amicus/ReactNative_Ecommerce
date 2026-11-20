import { StyleSheet, Text, View } from 'react-native';
import { CreditCard, Headphones, Truck } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export function ServiceHighlights() {
  return (
    <View style={styles.container}>
      {/* 1. Secure Pay */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <CreditCard size={18} color={Colors.light.info} />
        </View>
        <Text style={styles.title}>Secure Pay</Text>
        <Text style={styles.subtitle}>100% Safe</Text>
      </View>

      <View style={styles.divider} />

      {/* 2. 24/7 Support */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <Headphones size={18} color={Colors.light.warning} />
        </View>
        <Text style={styles.title}>24/7 Help</Text>
        <Text style={styles.subtitle}>Live Care</Text>
      </View>

      <View style={styles.divider} />

      {/* 3. Fast Shipping */}
      <View style={styles.column}>
        <View style={styles.iconBadge}>
          <Truck size={18} color={Colors.light.accentGreen} />
        </View>
        <Text style={styles.title}>Fast Ship</Text>
        <Text style={styles.subtitle}>Tracked</Text>
      </View>
    </View>
  );
}

export default ServiceHighlights;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceDark,
    borderRadius: Radius.card + 4,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    marginBottom: Spacing.four,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.light.textInverse,
    textAlign: 'center',
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.light.textInverseMuted,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 38,
    backgroundColor: Colors.light.borderInverse,
  },
});
