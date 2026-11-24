import { useCallback, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import {
  FeaturedProductsSection,
  FooterSection,
  HeroBanner,
  PromoBannerGrid,
  ServiceHighlights,
  ShopByCategorySection,
} from '@/components/home';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
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

      {/* 2. Top Search Trigger Bar (Tapping navigates directly to /products with autoFocus) */}
      <View style={styles.searchContainer}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/products',
              params: { autoFocus: 'true' },
            })
          }
          style={({ pressed }) => [
            styles.searchTrigger,
            pressed && styles.searchTriggerPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Search products, electronics, fashion"
        >
          <Search
            size={18}
            color={Colors.light.textSecondary}
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>
            Search products, electronics, fashion...
          </Text>
        </Pressable>
      </View>

      {/* 3. Responsive Scrollable Home Feed with Pull-to-Refresh */}
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
  searchContainer: {
    backgroundColor: Colors.light.surface,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  searchTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Radius.button,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: Spacing.three,
    height: 44,
  },
  searchTriggerPressed: {
    opacity: 0.8,
  },
  searchIcon: {
    marginRight: Spacing.two,
  },
  searchPlaceholder: {
    fontSize: Typography.body,
    color: Colors.light.textSecondary,
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
