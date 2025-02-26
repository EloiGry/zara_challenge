import { CartItem } from "@/types/cart";

const STORAGE_KEY = "cart";

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const storedCart = localStorage.getItem(STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
};
