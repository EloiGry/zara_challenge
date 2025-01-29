import { render, screen } from '@testing-library/react';

import { useCart } from '@/context/cart/cart';

import { LogoCart } from './logo-cart';

// Mock the useCart hook with the proper type
jest.mock('@/context/cart/cart', () => ({
  useCart: jest.fn(),
}));

describe('LogoCart Component', () => {
  it('should display the outline cart icon when the cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({ getItemCount: () => 0 });

    render(<LogoCart />);

    expect(screen.getByAltText('logo_cart')).toHaveAttribute(
      'src',
      '/assets/cart_outline.svg'
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display the solid cart icon when there are items in the cart', () => {
    (useCart as jest.Mock).mockReturnValue({ getItemCount: () => 5 });

    render(<LogoCart />);

    expect(screen.getByAltText('logo_cart')).toHaveAttribute(
      'src',
      '/assets/cart_solid.svg'
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
