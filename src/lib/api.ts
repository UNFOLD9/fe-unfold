export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function fetchWithConfig(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return null;
  }
}

export const apiGet = (endpoint: string) => fetchWithConfig(endpoint, { method: 'GET' });

export const apiPost = (endpoint: string, body: any) => 
  fetchWithConfig(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const apiDelete = (endpoint: string) => fetchWithConfig(endpoint, { method: 'DELETE' });
