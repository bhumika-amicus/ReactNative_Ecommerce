import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowRight, Sparkles } from 'lucide-react-native';

import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export function HeroBanner() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/products')}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Explore Catalog"
    >
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
        }}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={250}
      />

      {/* Layered translucent shade for optimal text contrast without a muddy dark box */}
      <View style={styles.scrimTop} />
      <View style={styles.scrimBottom} />

      {/* Content anchored naturally for mobile ergonomics */}
      <View style={styles.content}>
        {/* Modern Frosted Badge */}
        <View style={styles.tagBadge}>
          <Sparkles size={12} color={Colors.light.warning} />
          <Text style={styles.tagText}>NEW DROP • 2026</Text>
        </View>

        {/* Natural Headline */}
        <Text style={styles.title}>
          Sound & Style,{'\n'}Curated for You.
        </Text>

        <Text style={styles.subtitle} numberOfLines={2}>
          Discover top-rated wireless audio, wearables and gear at fair prices.
        </Text>

        {/* Pill Action Button */}
        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>Explore Collection</Text>
          <ArrowRight size={16} color={Colors.light.textInverse} />
        </View>
      </View>
    </Pressable>
  );
}

export default HeroBanner;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 300,
    borderRadius: Radius.large,
    overflow: 'hidden',
    marginBottom: Spacing.four,
    backgroundColor: Colors.light.surfaceDark,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  containerPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrimTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.light.overlaySubtle,
  },
  scrimBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: Colors.light.overlayDark,
  },
  content: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.light.overlayGlass,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: Colors.light.borderGlass,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Colors.light.textInverse,
  },
  title: {
    fontSize: Typography.heading + 2,
    fontWeight: '800',
    color: Colors.light.textInverse,
    lineHeight: 32,
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: Typography.small,
    color: Colors.light.backgroundElement,
    lineHeight: 20,
    marginBottom: Spacing.three,
    maxWidth: 290,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
  },
  ctaText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.light.textInverse,
  },
});
