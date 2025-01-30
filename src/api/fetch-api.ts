import qs from 'qs';

const fetchApi = async (
  endpoint: string,
  params: Record<string, string | number | boolean | null> = {}
) => {
  const API_BASE_URL = process.env.API_BASE_URL;
  const API_KEY = process.env.API_KEY;

  if (!API_BASE_URL || !API_KEY) {
    throw new Error("API_BASE_URL ou API_KEY non définis dans l'environnement");
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);

  const queryString = qs.stringify(params, { skipNulls: true });
  if (queryString) {
    url.search = `?${queryString}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

export default fetchApi;
