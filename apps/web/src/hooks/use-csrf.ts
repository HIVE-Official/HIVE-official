/**
 * CSRF Protection Hook
 * Provides CSRF token management for admin API calls
 */

import { useEffect, useState } from 'react';

interface CSRFContext {
  token: string | null;
  getHeaders: () => Record<string, string>;
}

export function useCSRF(): CSRFContext {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extract CSRF token from meta tag or header
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
      setToken(metaToken);
    } else {
      // Try to get from response header (set by middleware)
      fetch('/api/auth/csrf', { credentials: 'include' })
        .then(res => {
          const headerToken = res.headers.get('X-CSRF-Token');
          if (headerToken) {
            setToken(headerToken);
          }
        })
        .catch(console.error);
    }
  }, []);

  const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['X-CSRF-Token'] = token;
    }

    return headers;
  };

  return { token, getHeaders };
}

/**
 * Protected fetch wrapper with CSRF token
 */
export async function protectedFetch(
  url: string,
  options?: globalThis.RequestInit & { headers?: Record<string, string> },
  csrfToken?: string | null
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge existing headers if they exist
  if (options?.headers) {
    const existingHeaders = options.headers as Record<string, string>;
    Object.assign(headers, existingHeaders);
  }

  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Always include cookies
  });
}