import { useCallback, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import type { Product } from '../types/product';
import type { ProductSortOption } from '../types/filter';
import { filterAndSortProducts } from '../utils/filterProducts';

/**
 * Custom hook managing combined search, category, and sorting filters.
 *
 * Responsibilities:
 * 1. Seeds initial filter state from navigation route parameters (e.g. from Home screen).
 * 2. React 19 pattern: Adjusts state during render when route parameters change,
 *    avoiding cascading render warnings from useEffect.
 * 3. Provides simple updater actions (search text, category selection, sort toggle, reset).
 * 4. Runs memoized real-time filtering without mutating the source catalog.
 */
export function useProductFilters(products: Product[]) {
  const params = useLocalSearchParams<{ category?: string; search?: string }>();

  // 1. Filter States (initialized from route params if user navigated with them)
  const [searchQuery, setSearchQuery] = useState<string>(params.search ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    params.category ?? 'All'
  );
  const [sortBy, setSortBy] = useState<ProductSortOption | null>(null);

  // 2. React 19 Best Practice: Synchronize when navigation params change during render
  // (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const [prevParams, setPrevParams] = useState({
    category: params.category,
    search: params.search,
  });

  if (
    params.category !== prevParams.category ||
    params.search !== prevParams.search
  ) {
    setPrevParams({ category: params.category, search: params.search });
    if (params.category !== undefined) {
      setSelectedCategory(params.category);
    }
    if (params.search !== undefined) {
      setSearchQuery(params.search);
    }
  }

  // 3. Toggles a sort option on tap (tapping an active sort deselects it back to natural order)
  const toggleSort = useCallback((option: ProductSortOption) => {
    setSortBy((prev) => (prev === option ? null : option));
  }, []);

  // 4. Resets all filters back to the default catalog view
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy(null);
  }, []);

  // 5. Flag indicating whether any non-default filter is currently active
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    sortBy !== null;

  // 6. Memoized filter and sort execution (re-calculates only when dependencies change)
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      searchQuery,
      category: selectedCategory,
      sortBy,
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    toggleSort,
    resetFilters,
    isFiltered,
    filteredProducts,
  };
}

