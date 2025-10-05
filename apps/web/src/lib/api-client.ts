/**
 * Authenticated API Client
 * Handles all API calls with proper authentication tokens
 */

import { auth } from './firebase';

// RequestInit is a standard Web API type
type RequestInitType = globalThis.RequestInit;

interface ApiOptions extends RequestInitType {
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl = '';

  /**
   * Get the current user's auth token
   * Returns dev token in development mode when using test session
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      // Check for dev mode first
      if (typeof window !== 'undefined') {
        const devAuthMode = window.localStorage.getItem('dev_auth_mode');
        const devUser = window.localStorage.getItem('dev_user');

        if (devAuthMode === 'true' && devUser) {
          try {
            const userData = JSON.parse(devUser);
            // Return dev token format that backend expects
            return `dev_token_${userData.id || userData.id || 'debug-user'}`;
          } catch (e) {
            console.error('Failed to parse dev user data:', e);
          }
        }

        // Check for test session (from debug-auth page)
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          try {
            const session = JSON.parse(sessionJson);
            if (session.userId) {
              return `dev_token_${session.userId}`;
            }
          } catch (e) {
            console.error('Failed to parse session data:', e);
          }
        }
      }

      // Try to get real Firebase token
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken();
      }

      return null;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * Make an authenticated API request
   */
  async fetch(url: string, options: ApiOptions = {}): Promise<Response> {
    const { skipAuth = false, headers = {}, ...restOptions } = options;

    // Build headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    };

    // Add auth token unless explicitly skipped
    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('No auth token available for API request:', url);
      }
    }

    // Make the request
    return fetch(url, {
      ...restOptions,
      headers: requestHeaders,
    });
  }

  /**
   * GET request
   */
  async get(url: string, options?: ApiOptions): Promise<Response> {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post(url: string, body?: any, options?: ApiOptions): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put(url: string, body?: any, options?: ApiOptions): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch(url: string, body?: any, options?: ApiOptions): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete(url: string, options?: ApiOptions): Promise<Response> {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience methods for common operations
export const api = {
  spaces: {
    list: (params?: URLSearchParams) =>
      apiClient.get(`/api/spaces${params ? `?${params}` : ''}`),

    create: (data: any) =>
      apiClient.post('/api/spaces', data),

    get: (id: string) =>
      apiClient.get(`/api/spaces/${id}`),

    join: (spaceId: string) =>
      apiClient.post('/api/spaces/join', { spaceId }),

    leave: (spaceId: string) =>
      apiClient.post('/api/spaces/leave', { spaceId }),

    posts: {
      list: (spaceId: string) =>
        apiClient.get(`/api/spaces/${spaceId}/posts`),

      create: (spaceId: string, content: string, parentId?: string) =>
        apiClient.post(`/api/spaces/${spaceId}/posts`, { content, parentId }),
    },

    members: {
      list: (spaceId: string) =>
        apiClient.get(`/api/spaces/${spaceId}/members`),

      remove: (spaceId: string, memberId: string) =>
        apiClient.delete(`/api/spaces/${spaceId}/members/${memberId}`),

      updateRole: (spaceId: string, memberId: string, role: string) =>
        apiClient.patch(`/api/spaces/${spaceId}/members/${memberId}`, { role }),
    },

    membership: {
      get: (spaceId: string) =>
        apiClient.get(`/api/spaces/${spaceId}/membership?limit=1`),
    },

    tools: {
      list: (spaceId: string) =>
        apiClient.get(`/api/spaces/${spaceId}/tools`),
      install: (spaceId: string, toolData: any) =>
        apiClient.post(`/api/spaces/${spaceId}/tools`, toolData),
      configure: (spaceId: string, toolId: string, config: any) =>
        apiClient.put(`/api/spaces/${spaceId}/tools/${toolId}`, config),
      remove: (spaceId: string, toolId: string) =>
        apiClient.delete(`/api/spaces/${spaceId}/tools/${toolId}`),
    }
  },

  profile: {
    get: () => apiClient.get('/api/profile'),
    update: (data: any) => apiClient.put('/api/profile', data),
  },

  feed: {
    get: () => apiClient.get('/api/feed'),
  }
};