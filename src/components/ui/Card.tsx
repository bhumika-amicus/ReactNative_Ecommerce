import type { PropsWithChildren } from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export type CardVariant = 'elevated' | 'bordered' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export type CardProps = PropsWithChildren<{
  variant?: CardVariant;
  padding?: CardPadding;
  style?: StyleProp<ViewStyle>;
}>;

export function Card({
  children,
  variant = 'bordered',
  padding = 'md',
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variantStyles[variant],
        paddingStyles[padding],
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.card,
  },
});

const paddingStyles = StyleSheet.create({
  none: {
    padding: Spacing.none,
  },
  sm: {
    padding: Spacing.two, // 8
  },
  md: {
    padding: Spacing.gap, // 12
  },
  lg: {
    padding: Spacing.three, // 16
  },
});

const variantStyles = StyleSheet.create({
  elevated: {
    backgroundColor: Colors.light.surface,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {
        // web fallback
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
    }),
  },
  bordered: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  flat: {
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 0,
    overflow: 'hidden',
  },
});
