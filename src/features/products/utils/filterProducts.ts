import type { Product } from '../types/product';
import type { ProductFilterState } from '../types/filter';

/**
 * Pure, deterministic utility to filter and sort products based on user criteria.
 *
 * Optimization & Best Practices:
 * 1. Category check runs first: A string equality check O(1) short-circuits immediately,
 *    avoiding more expensive lowercase substring searches on title and description.
 * 2. Immutable sorting: Creates a shallow copy ([...filtered]) before sorting to ensure
 *    the raw catalog cache is never mutated in memory.
 * 3. Null sorting: When sortBy is null, the natural API catalog order is preserved.
 */
export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilterState
): Product[] {
  const { searchQuery, category, sortBy } = filters;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // 1. Combined Filtering (Category + Search Query)
  const filtered = products.filter((item) => {
    // Check Category Match (O(1) short-circuit)
    const matchesCategory =
      category === 'All' ||
      item.category.toLowerCase() === category.toLowerCase();

    if (!matchesCategory) return false;

    // Check Search Query Match (matches title OR description)
    if (!normalizedQuery) return true;

    const matchesTitle = item.title.toLowerCase().includes(normalizedQuery);
    const matchesDescription = item.description
      ? item.description.toLowerCase().includes(normalizedQuery)
      : false;

    return matchesTitle || matchesDescription;
  });

  // 2. Sorting (Only sort if a sort option is actively selected)
  if (!sortBy) {
    return filtered;
  }

  // Use a shallow copy to prevent mutating the source array
  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}

