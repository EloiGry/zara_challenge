import { act, render, screen } from '@testing-library/react';

import { CartItem } from '@/types/cart';

import { CartProvider, useCart } from './cart';

// Mock Item Data
const mockItem: CartItem = {
  id: '1',
  name: 'Item 1',
  colorOptions: {
    name: 'Red',
    hexCode: '#ff0000',
    imageUrl: '/images/red.png',
  },
  storageOptions: {
    capacity: '64GB',
    price: 10,
  },
  quantity: 1,
};

// Mock localStorage to simulate saved cart
const mockCart = [mockItem];

const TestComponent = () => {
  const { addItem, removeItem, totalPrice, getItemCount } = useCart();

  return (
    <div>
      <button onClick={() => addItem(mockItem)}>Add Item</button>
      <button onClick={() => removeItem('1')}>Remove Item</button>
      <div data-testid="cart-count">{getItemCount()}</div>
      <div data-testid="cart-total">{totalPrice}</div>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.setItem('cart', JSON.stringify(mockCart));
  });

  it('should start with the cart pre-populated from localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('10');
  });

  it('should add an item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-total').textContent).toBe('20');
  });

  it('should remove an item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Remove Item').click();
    });

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });
});
