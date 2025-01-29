import { render, screen } from '@testing-library/react';

import { CardProps as CardType } from '@/types/card';

import { Card } from './card';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

describe('Card Component', () => {
  const mockCard: CardType = {
    id: '1',
    name: 'Sample Product',
    brand: 'Brand A',
    price: 100,
    image: '/assets/test-image.png',
  };

  it('should render the card with correct product information', () => {
    render(<Card {...mockCard} />);

    expect(screen.getByAltText('Sample Product')).toHaveAttribute(
      'src',
      '/assets/test-image.png'
    );
    expect(screen.getByText('Brand A')).toBeInTheDocument();
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('100 EUR')).toBeInTheDocument();
  });

  it('should render with the correct link to the product page', () => {
    render(<Card {...mockCard} />);
    const link = screen.getByRole('link', { name: /sample product/i });
    expect(link).toHaveAttribute('href', '/1');
  });
});
