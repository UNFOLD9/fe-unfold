export const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/$/, '');

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function fetchWithConfig(endpoint: string, options: RequestInit = {}) {
  if (!BASE_URL) {
    throw new Error('Konfigurasi API belum tersedia.');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  try {
    return await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return null;
  }
}

export const apiGet = (endpoint: string) => fetchWithConfig(endpoint, { method: 'GET' });

export const apiPost = (endpoint: string, body: unknown) =>
  fetchWithConfig(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const apiDelete = (endpoint: string) => fetchWithConfig(endpoint, { method: 'DELETE' });
