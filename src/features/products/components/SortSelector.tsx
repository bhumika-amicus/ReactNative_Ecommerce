import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowUpDown } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { SORT_OPTIONS, type ProductSortOption } from '../types/filter';

export interface SortSelectorProps {
  activeSort: ProductSortOption | null;
  onToggleSort: (sort: ProductSortOption) => void;
}

/**
 * Mobile-first horizontal chip selector for sorting options.
 *
 * UX Highlights:
 * 1. 1-tap direct selection without modal or dropdown popovers.
 * 2. Tapping an already selected chip toggles it back to natural order (null).
 * 3. Highlights active sort with high-contrast primary token.
 */
export function SortSelector({ activeSort, onToggleSort }: SortSelectorProps) {
  return (
    <View style={styles.container}>
      {/* 1. Leading icon & label */}
      <View style={styles.labelRow}>
        <ArrowUpDown size={14} color={Colors.light.textSecondary} />
        <Text style={styles.labelText}>Sort by:</Text>
      </View>

      {/* 2. Horizontal scrollable sort chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SORT_OPTIONS.map((option) => {
          const isSelected = activeSort === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onToggleSort(option.value)}
              hitSlop={4}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Sort by ${option.label}${isSelected ? ', selected. Tap to deselect.' : ''}`}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginRight: Spacing.two,
  },
  labelText: {
    fontSize: Typography.caption,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  scrollContent: {
    gap: Spacing.xs,
    paddingRight: Spacing.three,
  },
  chip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  chipActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  chipPressed: {
    opacity: 0.8,
  },
  chipText: {
    fontSize: Typography.caption,
    fontWeight: '500',
    color: Colors.light.textSecondary,
  },
  chipTextActive: {
    color: Colors.light.textInverse,
    fontWeight: '700',
  },
});

