import { apiClient } from '@/services/apiClient';

import {
  type ApiProduct,
  mapApiProductToProduct,
  type Product,
} from '../types/product';


export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const rawData = await apiClient.get<ApiProduct[]>('/products', { signal });
  return rawData.map(mapApiProductToProduct);
}

export async function fetchProductById(
  id: string,
  signal?: AbortSignal
): Promise<Product> {
  const rawData = await apiClient.get<ApiProduct>(`/products/${id}`, { signal });
  return mapApiProductToProduct(rawData);
}
