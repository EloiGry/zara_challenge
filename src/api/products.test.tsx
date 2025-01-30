import fetchApi from './fetch-api';
import { getProductById, getProducts } from './products';

jest.mock('./fetch-api');

describe('API Calls', () => {
  it('devrait appeler fetchApi avec les bons paramètres pour getProducts', async () => {
    const mockResponse = { data: [] };
    (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

    const search = 'product';
    const limit = 10;
    const offset = 0;

    const result = await getProducts(search, limit, offset);

    expect(fetchApi).toHaveBeenCalledWith('/products', {
      search,
      limit,
      offset,
    });
    expect(result).toEqual(mockResponse);
  });

  it('devrait appeler fetchApi avec le bon id pour getProductById', async () => {
    const mockResponse = { data: { id: '1', name: 'Product 1' } };
    (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

    const productId = '1';

    const result = await getProductById(productId);

    expect(fetchApi).toHaveBeenCalledWith(`/products/${productId}`);
    expect(result).toEqual(mockResponse);
  });
});
