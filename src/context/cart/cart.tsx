'use client';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { CartItem } from '@/types/cart';

export type CartContextType = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  totalPrice: number;
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart =
      typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addItem = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (product) =>
          product.id === item.id &&
          product.colorOptions.hexCode === item.colorOptions.hexCode &&
          product.storageOptions.capacity === item.storageOptions.capacity
      );

      if (existingItem) {
        return prevCart.map((product) =>
          product.id === item.id &&
          product.colorOptions.hexCode === item.colorOptions.hexCode &&
          product.storageOptions.capacity === item.storageOptions.capacity
            ? { ...product, quantity: product.quantity + item.quantity }
            : product
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity }];
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const getItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.storageOptions.price * item.quantity,
      0
    );
  }, [cart]);

  const contextValue = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      totalPrice,
      getItemCount,
    }),
    [cart, addItem, removeItem, totalPrice, getItemCount]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
