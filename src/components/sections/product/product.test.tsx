import { useRouter } from 'next/navigation';

import { fireEvent, render, screen } from '@testing-library/react';

import { useCartActions } from '@/hooks/use-cart-actions/use-cart-actions';
import { Product } from '@/types/product';

import { ProductSection } from './product';

jest.mock('@/hooks/use-cart-actions/use-cart-actions'); // Mock du hook useCartActions
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockHandleAddToCart = jest.fn();

const product: Product = {
  id: '1',
  brand: 'BrandName',
  name: 'Test Product',
  description: 'This is a test product description.',
  basePrice: 100,
  rating: 4.5,
  specs: {
    screen: '6.1 inches',
    resolution: '1170 x 2532 pixels',
    processor: 'A15 Bionic',
    mainCamera: '12 MP',
    selfieCamera: '12 MP',
    battery: '3095 mAh',
    os: 'iOS 15',
    screenRefreshRate: '60 Hz',
  },
  colorOptions: [
    { name: 'Red', hexCode: '#ff0000', imageUrl: '/assets/test-image.png' },
    { name: 'Green', hexCode: '#00ff00', imageUrl: '/assets/test-image.png' },
  ],
  storageOptions: [
    { capacity: '64GB', price: 100 },
    { capacity: '128GB', price: 150 },
  ],
  similarProducts: [],
};

describe('ProductSection', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCartActions as jest.Mock).mockReturnValue({
      handleAddToCart: mockHandleAddToCart,
    });
  });

  test('renders product name, price, and description', () => {
    render(<ProductSection product={product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.basePrice} EUR`)).toBeInTheDocument();
  });

  test('renders correct image based on selected color', () => {
    render(<ProductSection product={product} />);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toContain('test-image.png');

    const greenButton = screen.getByRole('button', { name: /Green/i });
    fireEvent.click(greenButton);

    expect(image.src).toContain('test-image.png');
  });

  test('enables "Add to Cart" button when both color and storage are selected', () => {
    render(<ProductSection product={product} />);

    expect(screen.getByText('Añadir')).toBeDisabled();

    const greenButton = screen.getByRole('button', { name: /Green/i });
    fireEvent.click(greenButton);

    const storageButton = screen.getByRole('button', { name: /128GB/i });
    fireEvent.click(storageButton);

    expect(screen.getByText('Añadir')).toBeEnabled();
  });

  test('calls handleAddToCart with correct parameters and redirects to /cart', () => {
    render(<ProductSection product={product} />);

    const greenButton = screen.getByRole('button', { name: /Green/i });
    fireEvent.click(greenButton);

    const storageButton = screen.getByRole('button', { name: /128GB/i });
    fireEvent.click(storageButton);

    const addButton = screen.getByText('Añadir');
    fireEvent.click(addButton);

    expect(mockHandleAddToCart).toHaveBeenCalledWith(
      product,
      product.colorOptions[1],
      product.storageOptions[1]
    );
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  test('disables "Add to Cart" button if no color or storage is selected', () => {
    render(<ProductSection product={product} />);
    expect(screen.getByText('Añadir')).toBeDisabled();
  });
});
