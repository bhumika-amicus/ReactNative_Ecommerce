import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  title: {
    fontSize: Typography.subtitle,
    fontWeight: '700',
    color: Colors.light.surface,
  },
});
