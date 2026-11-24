/**
 * Custom API Error class adhering to industry standards (similar to AxiosError).
 * Preserves native V8 call stacks and enables type-safe `instanceof` narrowing in UI components.
 */
export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const BASE_URL = 'https://fakestoreapi.com';

type RequestOptions = RequestInit;

/**
 * Generic API Client wrapper around native fetch.
 * Centralizes BASE_URL, standard headers, response.ok verification, and error normalization.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
    //if fetch fail we grab the error text and throw it using our class error
    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        errorBody
      );
    }
    //parses the raw Json response and casts it as <T> 
    return (await response.json()) as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }

    // Preserve native AbortError without re-wrapping so caller can detect cancel
    if (err instanceof Error && err.name === 'AbortError') {
      throw err;
    }

    // Normalize network drops / offline errors
    const message =
      err instanceof Error
        ? err.message
        : 'Network connection error. Please check your internet connection.';
    throw new ApiError(message);
  }
}

//Exports a clean helper object apiClient.get(...) that sets method: 'GET' automatically.
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
};


export function getFriendlyErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 404) {
      return "We couldn't find what you were looking for. It may have been removed.";
    }
    if (err.status && err.status >= 500) {
      return 'Our store servers are currently experiencing issues. Please try again shortly.';
    }
    if (err.status && err.status >= 400) {
      return 'Unable to load products at this time. Please try again.';
    }
  }

  if (err instanceof Error && err.name === 'AbortError') {
    return '';
  }

  return 'Unable to connect to the store. Please check your internet connection.';
}

