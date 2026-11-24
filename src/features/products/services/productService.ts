import { apiClient } from '@/services/apiClient';

import {
  type ApiProduct,
  mapApiProductToProduct,
  type Product,
} from '../types/product';

/**
 * Fetches all products from FakeStore API and maps them to our clean Product model.
 *
 * @param signal - AbortSignal from useEffect AbortController for cleanup on unmount
 */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const rawData = await apiClient.get<ApiProduct[]>('/products', { signal });
  return rawData.map(mapApiProductToProduct);
}

/**
 * Fetches an individual product by ID from FakeStore API.
 *
 * @param id - Product string ID
 * @param signal - AbortSignal for request cancellation on unmount
 */
export async function fetchProductById(
  id: string,
  signal?: AbortSignal
): Promise<Product> {
  const rawData = await apiClient.get<ApiProduct>(`/products/${id}`, { signal });
  return mapApiProductToProduct(rawData);
}
