import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

export function FooterSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>Trendify</Text>
      <Text style={styles.tagline}>Curated essentials, designed for everyday living.</Text>
      <Text style={styles.copyright}>© 2026 Trendify. All rights reserved.</Text>
    </View>
  );
}

export default FooterSection;

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    alignItems: 'center',
  },
  brandName: {
    fontSize: Typography.body,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    color: Colors.light.text,
    marginBottom: Spacing.xxs,
  },
  tagline: {
    fontSize: Typography.micro,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  copyright: {
    fontSize: Typography.badge,
    color: Colors.light.textSecondary,
  },
});
