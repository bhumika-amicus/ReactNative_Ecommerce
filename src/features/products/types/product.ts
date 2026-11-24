
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


export function mapApiProductToProduct(apiItem: ApiProduct): Product {
  return {
    id: String(apiItem.id),
    title: apiItem.title ?? 'Untitled Product',
    price: apiItem.price ?? 0,
    rating: apiItem.rating?.rate ?? 0,
    reviewsCount: apiItem.rating?.count ?? 0,
    image: apiItem.image ?? '',
    category: apiItem.category ?? 'General',
    description: apiItem.description ?? '',
  };
}
