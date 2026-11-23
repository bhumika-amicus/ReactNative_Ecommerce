import { Minus, Plus } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 100,
  disabled = false,
}: QuantitySelectorProps) {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        disabled={disabled || isMin}
        hitSlop={6}
        style={({ pressed }) => [
          styles.stepButton,
          pressed && !isMin && !disabled && styles.pressedButton,
          (disabled || isMin) && styles.disabledButton,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
      >
        <Minus
          size={14}
          color={disabled || isMin ? Colors.light.textSecondary : Colors.light.text}
        />
      </Pressable>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>

      <Pressable
        onPress={onIncrease}
        disabled={disabled || isMax}
        hitSlop={6}
        style={({ pressed }) => [
          styles.stepButton,
          pressed && !isMax && !disabled && styles.pressedButton,
          (disabled || isMax) && styles.disabledButton,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
      >
        <Plus
          size={14}
          color={disabled || isMax ? Colors.light.textSecondary : Colors.light.text}
        />
      </Pressable>
    </View>
  );
}

export default QuantitySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xxs,
    paddingVertical: Spacing.xxs,
    alignSelf: 'center',
  },
  stepButton: {
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.surface,
  },
  pressedButton: {
    backgroundColor: Colors.light.backgroundSelected,
  },
  disabledButton: {
    opacity: 0.35,
  },
  quantityContainer: {
    minWidth: 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.half,
  },
  quantityText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.text,
  },
});

