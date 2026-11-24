import { StyleSheet, Text, View } from 'react-native';
import { SearchX } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable empty state view for zero-result scenarios (catalog search, empty cart, etc.).
 * Designed to render inside FlatList.ListEmptyComponent while preserving top search controls.
 */
export function EmptyState({
  title = 'No products found',
  message = 'Try searching with different keywords or clearing your active filters.',
  actionLabel = 'Reset All Filters',
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {/* 1. Muted icon circle */}
      <View style={styles.iconCircle}>
        <SearchX size={36} color={Colors.light.textSecondary} />
      </View>

      {/* 2. Clear title & supportive message */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {/* 3. Action button */}
      {onAction && (
        <Button
          title={actionLabel}
          variant="secondary"
          size="md"
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.backgroundElement,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  message: {
    fontSize: Typography.small,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.four,
    maxWidth: 280,
  },
  actionButton: {
    paddingHorizontal: Spacing.four,
  },
});

