import { render, screen } from '@testing-library/react';

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

describe('Header', () => {
  it('renders the header with the logo inside a Link and the LogoCart', () => {
    render(<Header />);

    // Vérifie que le logo est présent
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // Vérifie que le logo est encapsulé dans un Link
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toContainElement(logo);

    // Vérifie que le composant LogoCart est affiché
    const logoCart = screen.getByTestId('logo-cart');
    expect(logoCart).toBeInTheDocument();
  });
});
