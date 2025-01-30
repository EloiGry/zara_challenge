import { FunctionComponent } from 'react';

import { act, render } from '@testing-library/react';

import { useCart } from '@/context/cart/cart';
import { ColorOption, Product, StorageOption } from '@/types/product';

import { useCartActions } from './use-cart-actions';

// Mock the useCart context
jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

// Test component to trigger the hook
const TestComponent: FunctionComponent<{
  product: Product;
  selectedColor: ColorOption | null;
  selectedStorage: StorageOption | null;
}> = ({ product, selectedColor, selectedStorage }) => {
  const { handleAddToCart } = useCartActions();

  // Trigger the hook's action
  handleAddToCart(product, selectedColor, selectedStorage);

  return null;
};

describe('useCartActions', () => {
  let addItemMock: jest.Mock;

  beforeEach(() => {
    addItemMock = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      addItem: addItemMock,
    });
  });

  it('should add a product to the cart with the correct options', async () => {
    const product: Product = {
      id: '1',
      brand: 'Test Brand',
      name: 'Test Product',
      description: 'A great product',
      basePrice: 100,
      rating: 4.5,
      specs: {
        screen: '6.1 inch',
        resolution: '1080x2340',
        processor: 'A14 Bionic',
        mainCamera: '12MP',
        selfieCamera: '12MP',
        battery: '2815mAh',
        os: 'iOS',
        screenRefreshRate: '60Hz',
      },
      colorOptions: [
        { name: 'Red', hexCode: '#FF0000', imageUrl: 'red.png' },
        { name: 'Blue', hexCode: '#0000FF', imageUrl: 'blue.png' },
      ],
      storageOptions: [
        { capacity: '64GB', price: 799 },
        { capacity: '128GB', price: 899 },
      ],
      similarProducts: [],
    };

    const selectedColor: ColorOption = {
      name: 'Red',
      hexCode: '#FF0000',
      imageUrl: 'red.png',
    };
    const selectedStorage: StorageOption = { capacity: '64GB', price: 799 };

    // Await act to ensure async operations are handled
    await act(async () => {
      render(
        <TestComponent
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      );
    });

    expect(addItemMock).toHaveBeenCalledWith({
      id: product.id,
      name: product.name,
      colorOptions: selectedColor,
      storageOptions: selectedStorage,
      quantity: 1,
    });
  });

  it('should not call addItem if an option is not selected', async () => {
    const product: Product = {
      id: '1',
      brand: 'Test Brand',
      name: 'Test Product',
      description: 'A great product',
      basePrice: 100,
      rating: 4.5,
      specs: {
        screen: '6.1 inch',
        resolution: '1080x2340',
        processor: 'A14 Bionic',
        mainCamera: '12MP',
        selfieCamera: '12MP',
        battery: '2815mAh',
        os: 'iOS',
        screenRefreshRate: '60Hz',
      },
      colorOptions: [
        { name: 'Red', hexCode: '#FF0000', imageUrl: 'red.png' },
        { name: 'Blue', hexCode: '#0000FF', imageUrl: 'blue.png' },
      ],
      storageOptions: [
        { capacity: '64GB', price: 799 },
        { capacity: '128GB', price: 899 },
      ],
      similarProducts: [],
    };

    const selectedColor: ColorOption | null = null;
    const selectedStorage: StorageOption = { capacity: '64GB', price: 799 };

    // Await act to ensure async operations are handled
    await act(async () => {
      render(
        <TestComponent
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
        />
      );
    });

    expect(addItemMock).not.toHaveBeenCalled();
  });
});
