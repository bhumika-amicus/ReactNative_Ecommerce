import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonIconProps = {
  color: string;
  size: number;
};

export type ButtonProps = {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode | ((props: ButtonIconProps) => ReactNode);
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const textColor = getTextColor(variant, isDisabled);
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      return icon({ color: textColor, size: iconSize });
    }
    return icon;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        pressed && !isDisabled && pressedVariantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <>
            {renderIcon()}
            {title ? (
              <Text
                style={[
                  styles.baseText,
                  textSizeStyles[size],
                  { color: textColor },
                ]}
              >
                {title}
              </Text>
            ) : (
              children
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}

export default Button;

function getTextColor(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return Colors.light.textSecondary;

  switch (variant) {
    case 'primary':
    case 'danger':
      return Colors.light.surface;
    case 'outline':
      return Colors.light.primary;
    case 'secondary':
    case 'ghost':
    default:
      return Colors.light.text;
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one + 2,
  },
  baseText: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.two,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: Spacing.three,
  },
  lg: {
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.four,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: Typography.caption,
  },
  md: {
    fontSize: Typography.small,
  },
  lg: {
    fontSize: Typography.body,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: Colors.light.backgroundElement,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
  },
  danger: {
    backgroundColor: Colors.light.danger,
    borderWidth: 0,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

const pressedVariantStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primaryPressed,
  },
  secondary: {
    backgroundColor: Colors.light.backgroundSelected,
  },
  outline: {
    backgroundColor: 'rgba(8, 102, 233, 0.08)',
  },
  danger: {
    backgroundColor: '#B91C1C',
  },
  ghost: {
    backgroundColor: Colors.light.backgroundElement,
  },
});
