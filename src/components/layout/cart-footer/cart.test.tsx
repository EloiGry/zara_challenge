import { render, screen } from '@testing-library/react';

import { useCart } from '@/context/cart/cart';

import { CartFooter } from './cart-footer';

jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

describe('CartFooter', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      totalPrice: '0',
      getItemCount: jest.fn().mockReturnValue(0),
    });
  });

  it('renders EmptyCartFooter when the cart is empty', () => {
    render(<CartFooter />);

    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
    expect(screen.queryByText('Pay')).not.toBeInTheDocument();
  });

  it('renders CartFooter with total price and buttons when the cart has items', () => {
    (useCart as jest.Mock).mockReturnValue({
      totalPrice: '50',
      getItemCount: jest.fn().mockReturnValue(2),
    });

    render(<CartFooter />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('50 EUR')).toBeInTheDocument();
    expect(screen.getByText('Pay')).toBeInTheDocument();
  });

  it('renders a link to continue shopping', () => {
    render(<CartFooter />);

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('Continue Shopping');
  });
});
