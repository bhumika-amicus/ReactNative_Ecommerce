import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: ReactNode;
};

export function Button({
  title,
  onPress,
  disabled = false,
  icon,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {icon}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  pressed: {
    backgroundColor: Colors.light.primaryPressed,
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.light.surface,
    fontSize: Typography.small,
    fontWeight: '600',
  },
});
