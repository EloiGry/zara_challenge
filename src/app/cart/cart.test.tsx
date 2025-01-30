import { fireEvent, render, screen } from '@testing-library/react';

import { useCart } from '@/context/cart/cart';

import Cart from './page';

jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

describe('Cart Page', () => {
  it('displays "Cart (0)" when the cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      removeItem: jest.fn(),
      getItemCount: jest.fn().mockReturnValue(0),
    });

    render(<Cart />);

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
    expect(screen.queryByText('Pay')).not.toBeInTheDocument();
  });

  it('displays the cart items when the cart is not empty', () => {
    const mockCartItems = [
      {
        id: '1',
        name: 'Item 1',
        colorOptions: {
          name: 'Red',
          hexCode: '#FF0000',
          imageUrl: '/assets/test-image.png',
        },
        storageOptions: { capacity: '64GB', price: 199 },
        quantity: 1,
      },
      {
        id: '2',
        name: 'Item 2',
        colorOptions: {
          name: 'Blue',
          hexCode: '#0000FF',
          imageUrl: '/assets/test-image.png',
        },
        storageOptions: { capacity: '128GB', price: 299 },
        quantity: 2,
      },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: mockCartItems,
      removeItem: jest.fn(),
      getItemCount: jest.fn().mockReturnValue(mockCartItems.length),
    });

    render(<Cart />);

    expect(screen.getByText('Cart (2)')).toBeInTheDocument();

    mockCartItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByAltText(item.name)).toBeInTheDocument();
    });
  });

  it('removes an item from the cart when the removeItem function is called', () => {
    const mockRemoveItem = jest.fn();
    const mockCartItems = [
      {
        id: '1',
        name: 'Item 1',
        colorOptions: {
          name: 'Red',
          hexCode: '#FF0000',
          imageUrl: '/assets/test-image.png',
        },
        storageOptions: { capacity: '64GB', price: 199 },
        quantity: 1,
      },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: mockCartItems,
      removeItem: mockRemoveItem,
      getItemCount: jest.fn().mockReturnValue(mockCartItems.length),
    });

    render(<Cart />);

    fireEvent.click(screen.getByText('Eliminar'));

    expect(mockRemoveItem).toHaveBeenCalledWith('1');
  });
});
