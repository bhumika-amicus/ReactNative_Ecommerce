import { StyleSheet, Text, View } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  const { cartCount } = useCart();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.cartContainer}>
        <ShoppingBag size={22} color={Colors.light.text} />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartCount > 99 ? '99+' : cartCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: Colors.light.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: '700',
    color: Colors.light.text,
  },
  cartContainer: {
    position: 'relative',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.danger,
    borderRadius: Radius.pill,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.light.surface,
    fontSize: 10,
    fontWeight: '700',
  },
});
