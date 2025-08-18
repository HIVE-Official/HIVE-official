import { HivePlatformErrorHandler, ErrorCategory } from './error-resilience-system';

// Resilient API Client with built-in error handling, retries, and fallbacks
export class ResilientHiveApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private apiWrapper: ReturnType<typeof HivePlatformErrorHandler.createApiWrapper>;

  constructor(baseUrl: string = '/api', token?: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };

    // Create API wrapper with platform-wide error handling
    this.apiWrapper = HivePlatformErrorHandler.createApiWrapper({
      retryConfig: {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 15000,
        backoffMultiplier: 2,
        jitter: true,
        retryableErrors: [ErrorCategory._NETWORK, ErrorCategory._SERVER_ERROR, ErrorCategory._RATE_LIMIT]
      },
      circuitBreaker: 'hive-api',
      timeout: 30000
    });
  }

  // Generic HTTP methods with error resilience
  private async request<T>(
    endpoint: string,
    options: { method?: string; headers?: Record<string, string>; body?: string } = {},
    overrides: { timeout?: number; retries?: number; fallback?: T } = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    return this.apiWrapper(
      async () => {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...this.defaultHeaders,
            ...options.headers
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw {
            response: {
              status: response.status,
              data: errorData
            },
            message: errorData.message || `HTTP ${response.status}`
          };
        }

        return response.json();
      },
      {
        timeout: overrides.timeout,
        retryConfig: overrides.retries ? { maxRetries: overrides.retries } : undefined,
        fallback: overrides.fallback ? { fallbackValue: overrides.fallback } : undefined
      }
    );
  }

  // Spaces API with resilience
  async getSpaces(params: { limit?: number; offset?: number } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces?${query}`, {}, {
      fallback: { spaces: [], total: 0, hasMore: false }
    });
  }

  async getSpace(spaceId: string): Promise<any> {
    return this.request(`/spaces/${spaceId}`, {}, {
      fallback: null
    });
  }

  async joinSpace(spaceId: string): Promise<any> {
    return this.request(`/spaces/${spaceId}/join`, {
      method: 'POST'
    });
  }

  async leaveSpace(spaceId: string): Promise<any> {
    return this.request(`/spaces/${spaceId}/leave`, {
      method: 'POST'
    });
  }

  async getSpaceMembers(spaceId: string, params: { limit?: number; offset?: number } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/members?${query}`, {}, {
      fallback: { members: [], total: 0, hasMore: false }
    });
  }

  async getSpaceEvents(spaceId: string, params: { limit?: number; upcoming?: boolean } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/events?${query}`, {}, {
      fallback: { events: [], total: 0, hasMore: false }
    });
  }

  async createSpaceEvent(spaceId: string, eventData: any): Promise<any> {
    return this.request(`/spaces/${spaceId}/events`, {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async getSpaceTools(spaceId: string, params: { limit?: number; category?: string } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/tools?${query}`, {}, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async deployToolToSpace(spaceId: string, deploymentData: any): Promise<any> {
    return this.request(`/spaces/${spaceId}/tools`, {
      method: 'POST',
      body: JSON.stringify(deploymentData)
    });
  }

  // Tools API with resilience
  async getTools(params: { 
    limit?: number; 
    offset?: number; 
    category?: string; 
    verified?: boolean 
  } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/tools?${query}`, {}, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async getTool(toolId: string): Promise<any> {
    return this.request(`/tools/${toolId}`, {}, {
      fallback: null
    });
  }

  async deployTool(toolId: string, config: any): Promise<any> {
    return this.request(`/tools/${toolId}/deploy`, {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  async getToolAnalytics(toolId: string): Promise<any> {
    return this.request(`/tools/${toolId}/analytics`, {}, {
      fallback: { deployments: 0, usage: 0, ratings: [] }
    });
  }

  // Feed API with resilience
  async getFeed(params: { 
    limit?: number; 
    offset?: number; 
    spaceId?: string; 
    type?: string 
  } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/feed?${query}`, {}, {
      fallback: { items: [], total: 0, hasMore: false }
    });
  }

  async createPost(postData: any): Promise<any> {
    return this.request('/feed/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async likePost(postId: string): Promise<any> {
    return this.request(`/feed/posts/${postId}/like`, {
      method: 'POST'
    });
  }

  async commentOnPost(postId: string, comment: string): Promise<any> {
    return this.request(`/feed/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content: comment })
    });
  }

  // Search API with resilience and intelligent fallbacks
  async searchSpaces(query: string, filters: any = {}): Promise<any> {
    return this.request('/spaces/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { spaces: [], total: 0, hasMore: false }
    });
  }

  async searchTools(query: string, filters: any = {}): Promise<any> {
    return this.request('/tools/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async searchFeed(query: string, filters: any = {}): Promise<any> {
    return this.request('/feed/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { items: [], total: 0, hasMore: false }
    });
  }

  async searchUsers(query: string, filters: any = {}): Promise<any> {
    return this.request('/users/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { users: [], total: 0, hasMore: false }
    });
  }

  // Profile API with resilience
  async getProfile(userId?: string): Promise<any> {
    const endpoint = userId ? `/profile/${userId}` : '/profile';
    return this.request(endpoint, {}, {
      fallback: null
    });
  }

  async updateProfile(profileData: any): Promise<any> {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async getProfileSpaces(userId?: string): Promise<any> {
    const endpoint = userId ? `/profile/${userId}/spaces` : '/profile/spaces';
    return this.request(endpoint, {}, {
      fallback: { spaces: [], total: 0 }
    });
  }

  async getProfileTools(userId?: string): Promise<any> {
    const endpoint = userId ? `/profile/${userId}/tools` : '/profile/tools';
    return this.request(endpoint, {}, {
      fallback: { tools: [], total: 0 }
    });
  }

  // Calendar API with resilience
  async getCalendarEvents(params: { 
    start?: string; 
    end?: string; 
    spaceId?: string 
  } = {}): Promise<any> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/calendar/events?${query}`, {}, {
      fallback: { events: [] }
    });
  }

  async createCalendarEvent(eventData: any): Promise<any> {
    return this.request('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  // Enhanced methods with offline support and cache
  async getSpacesWithOfflineSupport(): Promise<any> {
    return this.apiWrapper(
      () => this.getSpaces(),
      {
        fallback: {
          fallbackFunction: async () => {
            // Try to get from localStorage cache
            const cached = localStorage.getItem('hive_spaces_cache');
            if (cached) {
              const { data, timestamp } = JSON.parse(cached);
              const isStale = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutes
              if (!isStale) {
                return data;
              }
            }
            return { spaces: [], total: 0, hasMore: false };
          }
        }
      }
    );
  }

  async getFeedWithOfflineSupport(): Promise<any> {
    return this.apiWrapper(
      () => this.getFeed(),
      {
        fallback: {
          fallbackFunction: async () => {
            // Try to get from localStorage cache
            const cached = localStorage.getItem('hive_feed_cache');
            if (cached) {
              const { data, timestamp } = JSON.parse(cached);
              const isStale = Date.now() - timestamp > 2 * 60 * 1000; // 2 minutes
              if (!isStale) {
                return data;
              }
            }
            return { items: [], total: 0, hasMore: false };
          }
        }
      }
    );
  }

  // Update token for authentication
  updateToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Remove token
  removeToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  // Health check with circuit breaker monitoring
  async healthCheck(): Promise<{ status: string; circuitBreakers: any }> {
    try {
      const _health = await this.request('/health', {}, { timeout: 5000, retries: 1 });
      return {
        status: 'healthy',
        circuitBreakers: HivePlatformErrorHandler.createApiWrapper().toString() // Get circuit breaker stats
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        circuitBreakers: {}
      };
    }
  }
}

// Create singleton instance for global use
let globalApiClient: ResilientHiveApiClient | null = null;

export function createResilientApiClient(token?: string): ResilientHiveApiClient {
  if (!globalApiClient || token) {
    globalApiClient = new ResilientHiveApiClient('/api', token);
  }
  return globalApiClient;
}

export function getResilientApiClient(): ResilientHiveApiClient {
  if (!globalApiClient) {
    globalApiClient = new ResilientHiveApiClient('/api');
  }
  return globalApiClient;
}

// Export for convenience
export default ResilientHiveApiClient;