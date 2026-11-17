import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type AppFooterProps = {
  selectedCategory: string;
  productCount: number;
};

export function AppFooter({
  selectedCategory,
  productCount,
}: AppFooterProps) {
  const categoryLabel = selectedCategory === 'All' ? 'All Categories' : selectedCategory;

  return (
    <View style={styles.footer}>
      <View style={styles.row}>
        <Text style={styles.countText}>
          Showing <Text style={styles.highlight}>{productCount}</Text> {productCount === 1 ? 'product' : 'products'}
        </Text>
        <Text style={styles.categoryBadge}>{categoryLabel}</Text>
      </View>
    </View>
  );
}

export default AppFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  countText: {
    fontSize: Typography.small,
    color: Colors.light.text,
    fontWeight: '500',
  },
  highlight: {
    fontWeight: '700',
    color: Colors.light.primary,
  },
  categoryBadge: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
    backgroundColor: Colors.light.backgroundElement,
    paddingVertical: 2,
    paddingHorizontal: Spacing.one + 2,
    borderRadius: 6,
    fontWeight: '600',
  },
});

