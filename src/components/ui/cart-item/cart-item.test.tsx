import { fireEvent, render, screen } from '@testing-library/react';

import CartItem from '@/components/ui/cart-item/cart-item';
import { CartItem as CartType } from '@/types/cart';

jest.mock('next/image', () => {
  const MockImage = ({
    alt,
    src,
    ...props
  }: {
    alt?: string;
    src: string;
    priority?: boolean;
  } & React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={alt ?? 'test image'} src={src} />
  );

  MockImage.displayName = 'MockImage';

  return MockImage;
});

describe('CartItem', () => {
  it('renders cart item details correctly', () => {
    const mockCart: CartType = {
      id: '1',
      name: 'Item 1',
      colorOptions: {
        name: 'Red',
        hexCode: '#FF0000',
        imageUrl: '/assets/test-image.png',
      },
      storageOptions: { capacity: '64GB', price: 199 },
      quantity: 1,
    };
    const mockRemoveItem = jest.fn();

    render(<CartItem cart={mockCart} removeItem={mockRemoveItem} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('64GB | Red')).toBeInTheDocument();
    expect(screen.getByText('199 EUR')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/assets/test-image.png');
    expect(image).toHaveAttribute('alt', 'Item 1'); // Checking the alt attribute for the image
  });

  it('calls removeItem when the remove button is clicked', () => {
    const mockCart: CartType = {
      id: '1',
      name: 'Item 1',
      colorOptions: {
        name: 'Red',
        hexCode: '#FF0000',
        imageUrl: '/assets/test-image.png',
      },
      storageOptions: { capacity: '64GB', price: 199 },
      quantity: 1,
    };
    const mockRemoveItem = jest.fn();

    render(<CartItem cart={mockCart} removeItem={mockRemoveItem} />);

    fireEvent.click(screen.getByText('Eliminar'));

    expect(mockRemoveItem).toHaveBeenCalledWith('1');
  });
});
