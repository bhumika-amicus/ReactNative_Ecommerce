import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Check, X } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import type { ProductSortOption } from '../types/filter';

export interface SortModalProps {
  visible: boolean;
  activeSort: ProductSortOption | null;
  onSelectSort: (sort: ProductSortOption | null) => void;
  onClose: () => void;
}

const MODAL_SORT_OPTIONS: { label: string; value: ProductSortOption | null }[] = [
  { label: 'Recommended', value: null },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating-desc' },
];

/**
 * Bottom-sheet style modal for selecting sort order.
 * Matches the 'sorted by Most Relevant ⌵' e-commerce pattern.
 */
export function SortModal({
  visible,
  activeSort,
  onSelectSort,
  onClose,
}: SortModalProps) {
  const handleSelect = (value: ProductSortOption | null) => {
    onSelectSort(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sort By</Text>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Close sort modal"
            >
              <X size={18} color={Colors.light.textSecondary} />
            </Pressable>
          </View>

          {/* Options List */}
          <View style={styles.optionsList}>
            {MODAL_SORT_OPTIONS.map((option) => {
              const isSelected = activeSort === option.value;

              return (
                <Pressable
                  key={option.label}
                  onPress={() => handleSelect(option.value)}
                  style={({ pressed }) => [
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                    pressed && styles.optionRowPressed,
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${option.label}${isSelected ? ', selected' : ''}`}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Check size={18} color={Colors.light.primary} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.light.overlayDark,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsList: {
    paddingTop: Spacing.two,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.button,
  },
  optionRowSelected: {
    backgroundColor: Colors.light.promos.blue.bg,
  },
  optionRowPressed: {
    opacity: 0.7,
  },
  optionText: {
    fontSize: Typography.body,
    fontWeight: '500',
    color: Colors.light.text,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: Colors.light.primary,
  },
});

