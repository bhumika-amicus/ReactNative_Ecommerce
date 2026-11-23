import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

type CategoryCardProps = {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
};

export function CategoryCard({
  name,
  isSelected,
  onSelect,
}: CategoryCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSelected ? styles.selectedCard : styles.unselectedCard,
        pressed && styles.pressed,
      ]}
      onPress={() => onSelect(name)}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
    marginRight: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selectedCard: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  unselectedCard: {
    backgroundColor: Colors.light.surface,
    borderColor: Colors.light.border,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: Typography.small,
    fontWeight: '600',
  },
  selectedText: {
    color: Colors.light.surface,
  },
  unselectedText: {
    color: Colors.light.textSecondary,
  },
});

