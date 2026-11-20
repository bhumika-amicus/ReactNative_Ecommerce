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
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    alignItems: 'center',
  },
  brandName: {
    fontSize: Typography.subtitle,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    color: Colors.light.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: Typography.caption,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  copyright: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
});
