import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

type AppHeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onCartPress?: () => void;
  showSearch?: boolean;
  onSearchPress?: () => void;
};

export function AppHeader({
  title,
  showBack = false,
  onBack,
  onCartPress,
  showSearch = false,
  onSearchPress,
}: AppHeaderProps) {
  const router = useRouter();
  const { cartCount } = useCart();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleSearch = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      router.push({
        pathname: '/products',
        params: { autoFocus: 'true' },
      });
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <Pressable
            onPress={handleBack}
            hitSlop={8}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={22} color={Colors.light.text} />
          </Pressable>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {showSearch && (
          <Pressable
            onPress={handleSearch}
            hitSlop={8}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Search catalog"
          >
            <Search size={22} color={Colors.light.text} />
          </Pressable>
        )}

        <Pressable
          onPress={onCartPress}
          disabled={!onCartPress}
          hitSlop={8}
          style={styles.cartContainer}
          accessibilityRole="button"
          accessibilityLabel={`Shopping cart, ${cartCount} items`}
        >
          <ShoppingBag size={22} color={Colors.light.text} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </Pressable>
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
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
    marginRight: Spacing.two, // Prevents long titles from colliding with cart button
  },
  backButton: {
    padding: Spacing.xs,
    borderRadius: Radius.pill,
  },
  backButtonPressed: {
    backgroundColor: Colors.light.backgroundElement,
  },
  title: {
    fontSize: Typography.subtitle, // 18px clean mobile app-bar size
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1, // Allows text to properly shrink and ellipsize (...) without pushing into the cart icon
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    padding: Spacing.sm,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    backgroundColor: Colors.light.backgroundElement,
  },
  cartContainer: {
    position: 'relative',
    padding: Spacing.sm,
    borderRadius: Radius.pill,
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
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    color: Colors.light.surface,
    fontSize: Typography.badge,
    fontWeight: '700',
  },
});
