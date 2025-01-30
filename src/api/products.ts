import fetchApi from './fetch-api';

export const getProducts = async (
  search: string = '',
  limit?: number,
  offset: number = 0
) => {
  const params: { search?: string; limit?: number; offset?: number } = { search, limit, offset };

  if (search) params.search = search;
  if (limit) params.limit = limit;
  if (offset) params.offset = offset;

  return fetchApi('/products', params);
};

export const getProductById = async (id: string) => {
  return fetchApi(`/products/${id}`);
};
