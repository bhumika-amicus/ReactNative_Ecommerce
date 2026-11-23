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
          uri: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80',
        }}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={250}
      />

      {/* Clean gradient scrim for guaranteed text legibility */}
      <View style={styles.scrim} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.tagBadge}>
          <Sparkles size={11} color={Colors.light.warning} />
          <Text style={styles.tagText}>NEW DROP • 2026</Text>
        </View>

        <Text style={styles.title}>
          Sound & Style, Curated.
        </Text>

        <Text style={styles.subtitle} numberOfLines={1}>
          Discover top-rated wireless audio & wearables.
        </Text>

        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>Explore Collection</Text>
          <ArrowRight size={14} color={Colors.light.textInverse} />
        </View>
      </View>
    </Pressable>
  );
}

export default HeroBanner;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 225,
    borderRadius: Radius.large,
    overflow: 'hidden',
    marginBottom: Spacing.four,
    backgroundColor: Colors.light.surfaceDark,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  containerPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.995 }],
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.48)',
  },
  content: {
    flex: 1,
    padding: Spacing.gutter,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.light.overlayGlass,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.compact,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.borderGlass,
  },
  tagText: {
    fontSize: Typography.badge,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.light.textInverse,
  },
  title: {
    fontSize: Typography.heading,
    fontWeight: '800',
    color: Colors.light.textInverse,
    lineHeight: 28,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sub,
    color: Colors.light.backgroundElement,
    lineHeight: 18,
    marginBottom: Spacing.gap,
    maxWidth: 280,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.pill,
  },
  ctaText: {
    fontSize: Typography.sub,
    fontWeight: '700',
    color: Colors.light.textInverse,
  },
});
