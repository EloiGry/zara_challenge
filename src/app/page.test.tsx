import { render, screen } from '@testing-library/react';

import { getProducts } from '@/api/products';

import {ProductsList} from './page';

async function generateSearchParams(value: { [key: string]: string }) {
  return value;
}

jest.mock('@/api/products', () => ({
  getProducts: jest.fn() as jest.MockedFunction<typeof getProducts>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
  }),
  useSearchParams: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/'),
}));

describe('Should render correct products list', () => {
  it('should render correct data', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        brand: 'test',
        imageUrl: '/assets/test-image.png',
      },
      {
        id: 2,
        name: 'Product 2',
        brand: 'test',
        imageUrl: '/assets/test-image.png',
      },
      {
        id: 3,
        name: 'Hello world',
        brand: 'test',
        imageUrl: '/assets/test-image.png',
      },
    ];

    const params = {
      query: 'product',
    };
    (getProducts as jest.Mock).mockResolvedValue(
      mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(params.query) ||
          p.brand.toLowerCase().includes(params.query)
      )
    );
    const ui = await ProductsList({ searchParams: generateSearchParams(params) });
    render(ui);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Hello world')).toBeNull();
    expect(screen.getByText(/2 results/)).toBeInTheDocument();
  });

  it('should render 1 result / Brand test', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        brand: 'test',
        imageUrl: '/assets/test-image.png',
      },
      {
        id: 2,
        name: 'Product 2',
        brand: 'test',
        imageUrl: '/assets/test-image.png',
      },
      {
        id: 3,
        name: 'Hello world',
        brand: 'rever',
        imageUrl: '/assets/test-image.png',
      },
    ];

    const params = {
      query: 'rever',
    };
    (getProducts as jest.Mock).mockResolvedValue(
      mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(params.query) ||
          p.brand.toLowerCase().includes(params.query)
      )
    );
    const ui = await ProductsList({ searchParams: generateSearchParams(params) });
    render(ui);

    expect(screen.getByText(/1 result/)).toBeInTheDocument();
  });
});