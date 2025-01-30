import { render, screen } from '@testing-library/react';

import { getProducts } from '@/api/products';

import Home from './page';

jest.mock('@/api/products', () => ({
  getProducts: jest.fn() as jest.MockedFunction<typeof getProducts>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
  }),
  useSearchParams: jest
    .fn()
    .mockReturnValue(new URLSearchParams('?query=product')),
  usePathname: jest.fn().mockReturnValue('/'),
}));

describe('Server Side Rendering', () => {
  it('should render correct data', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', imageUrl: '/assets/test-image.png' },
      { id: 2, name: 'Product 2', imageUrl: '/assets/test-image.png'  },
      { id: 3, name: 'Hello world', imageUrl: '/assets/test-image.png'  },
    ];

    (getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const searchParams = Promise.resolve({ query: 'product' });

    const ui = await Home({ searchParams });
    render(ui);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should render no results if no products found', async () => {
    (getProducts as jest.Mock).mockResolvedValue([]);

    const searchParams = Promise.resolve({ query: 'nonexistent' });

    const ui = await Home({ searchParams });
    render(ui);

    expect(screen.getByText(/0 results/)).toBeInTheDocument();
    expect(screen.queryByText('Hello world')).not.toBeInTheDocument();
  });
});
