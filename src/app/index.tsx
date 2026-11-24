import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/layout/AppHeader';
import {
  FeaturedProductsSection,
  FooterSection,
  HeroBanner,
  PromoBannerGrid,
  ServiceHighlights,
  ShopByCategorySection,
} from '@/components/home';
import { Colors, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**
   * Home Screen Pull-to-Refresh:
   * Increments refreshTrigger to notify child widgets (like FeaturedProductsSection)
   * to reload fresh data from the API cleanly.
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
    // Smoothly dismiss the pull-to-refresh spinner
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* 1. Modern White Brand Header with Cart Counter */}
      <AppHeader title="Trendify" />

      {/* 2. Responsive Scrollable Home Feed with Pull-to-Refresh */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            colors={[Colors.light.primary]}
            progressBackgroundColor={Colors.light.surface}
          />
        }
      >
        {/* Section 1: Hero Banner */}
        <HeroBanner />

        {/* Section 2: Promo Quick Cards (New Arrivals, Best Sellers, Gift Cards, Sale) */}
        <PromoBannerGrid />

        {/* Section 3: Featured Products (Live API items with inline retry) */}
        <FeaturedProductsSection refreshTrigger={refreshTrigger} />

        {/* Section 4: Shop by Category */}
        <ShopByCategorySection />

        {/* Section 5: Trust & Service Highlights */}
        <ServiceHighlights />

        {/* Section 6: Footer Navigation & Brand Details */}
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
});
