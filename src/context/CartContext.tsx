import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Product } from '@/features/products/types/product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Derived state: total count of all units in cart
  const cartCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // Derived state: grand total price of all items in cart
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  // Immutability Pattern: Add or increment quantity
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity }];
    });
  }, []);

  // Immutability Pattern: Remove item by ID
  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  // Immutability Pattern: Update specific item quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      cartCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, cartCount, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

