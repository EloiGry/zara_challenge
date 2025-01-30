import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getProductById } from '@/api/products';
import Page from './page';
import { useCart } from '@/context/cart/cart';

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
    })
  }));

const mockProduct = {
  id: '123',
  name: 'Product 1',
  description: 'This is a test product.',
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
  basePrice: 100,
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
      imageUrl: '/assets/similar1.png',
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
    console.log( (getProductById as jest.Mock).mockResolvedValueOnce(mockProduct));
    const mockParams = { params: { id: '123' }};

    const ui = await Page(mockParams);
    render(ui);

        // Vérification de l'affichage du nom du produit
        expect(screen.getByText('Product 1')).toBeInTheDocument();

  });
});