import { render, screen } from '@testing-library/react';

import { CardProps, CardsProps } from '@/types/card';

import CardsList from './cards-list';

jest.mock('@/components/ui/card/card', () => ({
  Card: ({ id, name, brand, price, image }: CardProps) => (
    <div data-testid={`card-${id}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span>{price}</span>
      <span>{brand}</span>
    </div>
  ),
}));

describe('CardsList', () => {
  it('renders a list of cards', () => {
    const mockCards: CardsProps[] = [
      {
        id: '1',
        name: 'Product 1',
        basePrice: 100,
        brand: 'Brand A',
        imageUrl: '/assets/test-image.png',
      },
      {
        id: '2',
        name: 'Product 2',
        basePrice: 200,
        brand: 'Brand B',
        imageUrl: '/assets/test-image.png',
      },
    ];

    render(<CardsList cards={mockCards} />);

    mockCards.forEach((product) => {
      expect(screen.getByTestId(`card-${product.id}`)).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.basePrice}`)).toBeInTheDocument();
      expect(screen.getByText(product.brand)).toBeInTheDocument();

      const image = screen.getByAltText(product.name);
      expect(image).toHaveAttribute('src', product.imageUrl);
    });
  });
});
