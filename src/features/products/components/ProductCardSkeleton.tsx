import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export function ProductCardSkeleton() {
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      {/* 1. Image Ghost */}
      <Animated.View style={[styles.imagePlaceholder, { opacity }]} />

      {/* 2. Text Ghost Lines */}
      <View style={styles.infoWrapper}>
        <Animated.View style={[styles.titleLine1, { opacity }]} />
        <Animated.View style={[styles.titleLine2, { opacity }]} />
      </View>

      {/* 3. Bottom Row Ghost (Price + Button) */}
      <View style={styles.bottomRow}>
        <Animated.View style={[styles.pricePlaceholder, { opacity }]} />
        <Animated.View style={[styles.btnPlaceholder, { opacity }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: '48.5%',
    flex: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.light.backgroundElement,
  },
  infoWrapper: {
    paddingHorizontal: Spacing.compact,
    paddingTop: Spacing.two,
  },
  titleLine1: {
    height: 12,
    width: '85%',
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.small,
    marginBottom: Spacing.xs,
  },
  titleLine2: {
    height: 12,
    width: '55%',
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.small,
    marginBottom: Spacing.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.compact,
    paddingBottom: Spacing.compact,
    paddingTop: Spacing.one,
  },
  pricePlaceholder: {
    height: 16,
    width: 48,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.small,
  },
  btnPlaceholder: {
    height: 28,
    width: 52,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.button,
  },
});

