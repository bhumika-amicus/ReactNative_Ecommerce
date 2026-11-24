/**
 * Sorting keys supported by our client-side catalog.
 * Null represents the natural, unsorted API order.
 */
export type ProductSortOption = 'price-asc' | 'price-desc' | 'rating-desc';

/**
 * Predefined list of actionable sort choices shown to the user.
 * Using 'as const' lets TypeScript automatically infer exact literal types without extra interfaces.
 */
export const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating-desc' },
] as const;

/**
 * Encapsulates the entire combined filter state for the catalog.
 */
export interface ProductFilterState {
  searchQuery: string;
  category: string;
  sortBy: ProductSortOption | null;
}

