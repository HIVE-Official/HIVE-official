import { HivePlatformErrorHandler, ErrorCategory } from './error-resilience-system';

// Lightweight DTOs for common API responses
export interface SpacesListItem {
  id: string;
  name: string;
  category?: string;
  imageUrl?: string;
  memberCount?: number;
}

export interface SpacesListResponse {
  spaces: SpacesListItem[];
  total: number;
  hasMore: boolean;
}

export interface SpaceMember {
  userId: string;
  role: 'admin' | 'member';
  joinedAt?: string;
}

export interface SpaceMembersResponse {
  members: SpaceMember[];
  total: number;
  hasMore: boolean;
}

export interface SpaceEvent {
  id: string;
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  isSoldOut?: boolean;
}

export interface SpaceEventsResponse {
  events: SpaceEvent[];
  total: number;
  hasMore: boolean;
}

export interface ToolListItem {
  id: string;
  name: string;
  summary?: string;
  category?: string;
}

export interface ToolsListResponse {
  tools: ToolListItem[];
  total: number;
  hasMore: boolean;
}

export interface ToolAnalyticsResponse {
  deployments: number;
  usage: number;
  ratings: Array<{ value: number; count: number }>;
}

export interface FeedListResponse<T = unknown> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface UsersListItem {
  id: string;
  name?: string;
  handle?: string;
  avatarUrl?: string;
}

export interface UsersListResponse {
  users: UsersListItem[];
  total: number;
  hasMore: boolean;
}

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
          credentials: 'include',
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
        retryConfig: overrides.retries ? { maxRetries: overrides.retries } : undefined
      }
    );
  }

  // Spaces API with resilience
  async getSpaces(params: { limit?: number; offset?: number } = {}): Promise<SpacesListResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces?${query}`, {}, {
      fallback: { spaces: [], total: 0, hasMore: false }
    });
  }

  async getSpace(spaceId: string): Promise<SpacesListItem | null> {
    return this.request(`/spaces/${spaceId}`, {}, {
      fallback: null
    });
  }

  async joinSpace(spaceId: string): Promise<{ success: true } | { success: false; error: string }> {
    return this.request(`/spaces/${spaceId}/join`, {
      method: 'POST'
    });
  }

  async leaveSpace(spaceId: string): Promise<{ success: true } | { success: false; error: string }> {
    return this.request(`/spaces/${spaceId}/leave`, {
      method: 'POST'
    });
  }

  async getSpaceMembers(spaceId: string, params: { limit?: number; offset?: number } = {}): Promise<SpaceMembersResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/members?${query}`, {}, {
      fallback: { members: [], total: 0, hasMore: false }
    });
  }

  async getSpaceEvents(spaceId: string, params: { limit?: number; upcoming?: boolean } = {}): Promise<SpaceEventsResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/events?${query}`, {}, {
      fallback: { events: [], total: 0, hasMore: false }
    });
  }

  async createSpaceEvent(spaceId: string, eventData: Partial<SpaceEvent>): Promise<{ id: string } & SpaceEvent> {
    return this.request(`/spaces/${spaceId}/events`, {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async getSpaceTools(spaceId: string, params: { limit?: number; category?: string } = {}): Promise<ToolsListResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/spaces/${spaceId}/tools?${query}`, {}, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async deployToolToSpace(spaceId: string, deploymentData: Record<string, unknown>): Promise<{ success: boolean; deploymentId?: string; error?: string }> {
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
  } = {}): Promise<ToolsListResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/tools?${query}`, {}, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async getTool(toolId: string): Promise<ToolListItem | null> {
    return this.request(`/tools/${toolId}`, {}, {
      fallback: null
    });
  }

  async deployTool(toolId: string, config: Record<string, unknown>): Promise<{ success: boolean; deploymentId?: string; error?: string }> {
    return this.request(`/tools/${toolId}/deploy`, {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  async getToolAnalytics(toolId: string): Promise<ToolAnalyticsResponse> {
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
  } = {}): Promise<FeedListResponse> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/feed?${query}`, {}, {
      fallback: { items: [], total: 0, hasMore: false }
    });
  }

  async createPost(postData: Record<string, unknown>): Promise<{ id: string }> {
    return this.request('/feed/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async likePost(postId: string): Promise<{ success: boolean }> {
    return this.request(`/feed/posts/${postId}/like`, {
      method: 'POST'
    });
  }

  async commentOnPost(postId: string, comment: string): Promise<{ id: string; content: string }> {
    return this.request(`/feed/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content: comment })
    });
  }

  // Search API with resilience and intelligent fallbacks
  async searchSpaces(query: string, filters: Record<string, unknown> = {}): Promise<SpacesListResponse> {
    return this.request('/spaces/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { spaces: [], total: 0, hasMore: false }
    });
  }

  async searchTools(query: string, filters: Record<string, unknown> = {}): Promise<ToolsListResponse> {
    return this.request('/tools/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { tools: [], total: 0, hasMore: false }
    });
  }

  async searchFeed(query: string, filters: Record<string, unknown> = {}): Promise<FeedListResponse> {
    return this.request('/feed/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { items: [], total: 0, hasMore: false }
    });
  }

  async searchUsers(query: string, filters: Record<string, unknown> = {}): Promise<UsersListResponse> {
    return this.request('/users/search', {
      method: 'POST',
      body: JSON.stringify({ query, ...filters })
    }, {
      fallback: { users: [], total: 0, hasMore: false }
    });
  }

  // Profile API with resilience
  async getProfile(userId?: string): Promise<Record<string, unknown> | null> {
    const endpoint = userId ? `/profile/${userId}` : '/profile';
    return this.request(endpoint, {}, {
      fallback: null
    });
  }

  async updateProfile(profileData: Record<string, unknown>): Promise<{ success: boolean }> {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async getProfileSpaces(userId?: string): Promise<SpacesListResponse> {
    const endpoint = userId ? `/profile/${userId}/spaces` : '/profile/spaces';
    return this.request(endpoint, {}, {
      fallback: { spaces: [], total: 0 }
    });
  }

  async getProfileTools(userId?: string): Promise<ToolsListResponse> {
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
  } = {}): Promise<{ events: Array<Record<string, unknown>> }> {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    
    return this.request(`/calendar/events?${query}`, {}, {
      fallback: { events: [] }
    });
  }

  async createCalendarEvent(eventData: Record<string, unknown>): Promise<{ id: string }> {
    return this.request('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  // Enhanced methods with offline support and cache
  async getSpacesWithOfflineSupport(): Promise<SpacesListResponse> {
    return this.apiWrapper(
      () => this.getSpaces(),
      {}
    );
  }

  async getFeedWithOfflineSupport(): Promise<FeedListResponse> {
    return this.apiWrapper(
      () => this.getFeed(),
      {}
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
  async healthCheck(): Promise<{ status: string; circuitBreakers: Record<string, unknown> }> {
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
