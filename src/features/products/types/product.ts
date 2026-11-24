/**
 * Raw data contracts from FakeStore API (https://fakestoreapi.com/products)
 */
export type ApiRating = {
  rate: number;
  count: number;
};

export type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ApiRating;
};

/**
 * Clean domain model consumed by our React Native UI components
 */
export type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description?: string;
};

/**
 * Adapter / Mapper: Transforms external API products into clean, safe UI models.
 * Ensures defensive fallbacks for missing ratings, converts IDs to strings,
 * and decouples UI screens from third-party API changes.
 */
export function mapApiProductToProduct(apiItem: ApiProduct): Product {
  return {
    id: String(apiItem.id),
    title: apiItem.title ?? 'Untitled Product',
    price: typeof apiItem.price === 'number' ? apiItem.price : 0,
    rating: apiItem.rating?.rate ?? 0,
    reviewsCount: apiItem.rating?.count ?? 0,
    image: apiItem.image ?? '',
    category: apiItem.category ?? 'General',
    description: apiItem.description ?? '',
  };
}
