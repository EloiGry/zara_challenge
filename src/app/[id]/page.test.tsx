import { render, screen } from '@testing-library/react';

import { getProductById } from '@/api/products';
import { useCart } from '@/context/cart/cart';

import { ProductContent } from './page';

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue([
    { current: null },
    {
      canScrollNext: jest.fn().mockReturnValue(true),
      canScrollPrev: jest.fn().mockReturnValue(true),
      containerNode: jest.fn(),
      internalEngine: jest.fn(),
      destroy: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
      emit: jest.fn(),
      plugins: jest.fn(),
      previousScrollSnap: jest.fn(),
      reInit: jest.fn(),
      rootNode: jest.fn(),
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      scrollProgress: jest.fn(),
      scrollSnapList: jest.fn(),
      scrollTo: jest.fn(),
      selectedScrollSnap: jest.fn(),
      slideNodes: jest.fn(),
      slidesInView: jest.fn(),
      slidesNotInView: jest.fn(),
    },
  ]),
}));

jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/api/products', () => ({
  getProductById: jest.fn() as jest.MockedFunction<typeof getProductById>, // Mock de getProductById
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
  }),
}));

async function generateParams(value: { id: string }) {
  return value;
}

const mockProduct = {
  id: '123',
  name: 'Product 1',
  description: 'This is a test product.',
  basePrice: 100,
  rating: 0,
  specs: {
    screen: '6.1',
    resolution: '1080p',
    processor: 'Processor X',
    mainCamera: '12 MP',
    selfieCamera: 'test',
    battery: 'test',
    os: 'test',
    screenRefreshRate: 'test',
  },
  colorOptions: [
    {
      name: '#5252a3',
      hexCode: '#5252a3',
      imageUrl: '/assets/test-image.png',
    },
  ],
  storageOptions: [
    {
      capacity: '200GB',
      price: 200,
    },
  ],
  similarProducts: [
    {
      id: '2',
      name: 'Similar Product 1',
      imageUrl: '/assets/test-image.png',
      brand: 'test',
      basePrice: 200,
    },
  ],
};

describe('ProductPage', () => {
  it('displays details product', async () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addItem: jest.fn(),
      getItemCount: jest.fn().mockReturnValue(0),
    });

    (getProductById as jest.Mock).mockResolvedValueOnce(mockProduct);

    const ui = await ProductContent({ id: '123' });
    render(ui);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
