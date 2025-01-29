import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { useCart } from '@/context/cart/cart';

import { Header } from './header';

jest.mock('@/components/ui/logo-cart/logo-cart', () => ({
  LogoCart: () => <div data-testid="logo-cart">Cart</div>,
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useCart as jest.Mock).mockReturnValue({
      getItemCount: jest.fn().mockReturnValue(0),
    });
  });

  it('renders the header with the logo inside a Link and the LogoCart', () => {
    render(<Header />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toContainElement(logo);

    const logoCart = screen.getByTestId('logo-cart');
    expect(logoCart).toBeInTheDocument();
  });

  it('applies a bottom border when on /cart and there are items in the cart', () => {
    (usePathname as jest.Mock).mockReturnValue('/cart');
    (useCart as jest.Mock).mockReturnValue({
      getItemCount: jest.fn().mockReturnValue(1),
    });

    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('border-bottom: 1px solid black');
  });

  it('does not apply a bottom border when not on /cart', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveStyle('border-bottom: 1px solid black');
  });
});
