/**
 * HIVE Platform Integration Layer
 * 
 * Manages cross-slice data flow and integration patterns
 * Connects Feed, Spaces, Tools, Profile, and real-time features
 */


// ===== CORE INTEGRATION TYPES =====

export interface PlatformIntegrationConfig {
  enableRealtime: boolean;
  enableCrossSliceNotifications: boolean;
  enableUnifiedSearch: boolean;
  enableActivityStreaming: boolean;
  cacheStrategy: 'memory' | 'localStorage' | 'hybrid';
}

export interface CrossSliceData {
  feedItems: FeedItem[];
  spaceActivities: SpaceActivity[];
  toolInteractions: ToolInteraction[];
  profileUpdates: ProfileUpdate[];
  notifications: PlatformNotification[];
}

export interface FeedItem {
  id: string;
  type: 'post' | 'tool_created' | 'space_joined' | 'event_created' | 'achievement';
  sourceSlice: 'feed' | 'spaces' | 'tools' | 'profile';
  sourceId: string;
  userId: string;
  spaceId?: string;
  toolId?: string;
  content: any;
  metadata: {
    visibility: 'public' | 'space' | 'private';
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    timestamp: string;
  };
}

export interface SpaceActivity {
  id: string;
  spaceId: string;
  userId: string;
  type: 'post_created' | 'member_joined' | 'tool_shared' | 'event_created';
  data: any;
  timestamp: string;
}

export interface ToolInteraction {
  id: string;
  toolId: string;
  userId: string;
  spaceId?: string;
  type: 'created' | 'deployed' | 'shared' | 'used';
  metadata: {
    deploymentId?: string;
    interactionCount: number;
    lastUsed: string;
  };
}

export interface ProfileUpdate {
  id: string;
  userId: string;
  type: 'space_joined' | 'tool_created' | 'achievement_earned' | 'bio_updated';
  data: any;
  timestamp: string;
}

export interface PlatformNotification {
  id: string;
  userId: string;
  type: 'space_invite' | 'tool_shared' | 'event_reminder' | 'achievement' | 'system';
  title: string;
  message: string;
  actionUrl?: string;
  metadata: {
    sourceSlice: string;
    sourceId: string;
    priority: 'low' | 'medium' | 'high';
    read: boolean;
    timestamp: string;
  };
}

// ===== PLATFORM INTEGRATION CLASS =====

export class PlatformIntegration {
  private config: PlatformIntegrationConfig;
  private cache: Map<string, any> = new Map();
  private subscriptions: Map<string, Set<Function>> = new Map();
  private websocket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(config: PlatformIntegrationConfig) {
    this.config = config;
    
    if (config.enableRealtime) {
      this.initializeWebSocket();
    }
  }

  // ===== CROSS-SLICE DATA FLOW =====

  /**
   * Get unified feed data combining all slices
   */
  async getUnifiedFeedData(userId: string, options: {
    limit?: number;
    sources?: string[];
    timeRange?: string;
  } = {}): Promise<FeedItem[]> {
    const { limit = 20, sources = ['feed', 'spaces', 'tools', 'profile'], timeRange = '24h' } = options;
    
    const cacheKey = `unified_feed_${userId}_${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const feedData: FeedItem[] = [];

      // Get data from each slice
      if (sources.includes('feed')) {
        const feedItems = await this.getFeedSliceData(userId, { limit: Math.ceil(limit * 0.4), timeRange });
        feedData.push(...feedItems);
      }

      if (sources.includes('spaces')) {
        const spaceItems = await this.getSpaceSliceData(userId, { limit: Math.ceil(limit * 0.3), timeRange });
        feedData.push(...spaceItems);
      }

      if (sources.includes('tools')) {
        const toolItems = await this.getToolSliceData(userId, { limit: Math.ceil(limit * 0.2), timeRange });
        feedData.push(...toolItems);
      }

      if (sources.includes('profile')) {
        const profileItems = await this.getProfileSliceData(userId, { limit: Math.ceil(limit * 0.1), timeRange });
        feedData.push(...profileItems);
      }

      // Sort by relevance and timestamp
      const sortedFeed = this.rankFeedItems(feedData, userId);
      const finalFeed = sortedFeed.slice(0, limit);

      // Cache the result
      this.cacheData(cacheKey, finalFeed, 5 * 60 * 1000); // 5 minutes

      return finalFeed;
    } catch (error) {
      return [];
    }
  }

  /**
   * Get feed slice specific data
   */
  private async getFeedSliceData(userId: string, options: { limit: number; timeRange: string }): Promise<FeedItem[]> {
    try {
      const { secureApiFetch } = await import('./secure-auth-utils');
      const response = await secureApiFetch('/api/feed/algorithm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: options.limit,
          timeRange: options.timeRange,
          feedType: 'personal'
        })
      });

      if (!response.ok) throw new Error('Failed to fetch feed data');

      const data = await response.json();
      return data.items.map((item: any) => ({
        id: item.id,
        type: 'post',
        sourceSlice: 'feed',
        sourceId: item.id,
        userId: item.authorId,
        spaceId: item.spaceId,
        content: item.content,
        metadata: {
          visibility: 'public',
          priority: item.relevanceScore > 80 ? 'high' : item.relevanceScore > 50 ? 'medium' : 'low',
          tags: item.content.tags || [],
          timestamp: item.timestamp
        }
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Get space slice specific data
   */
  private async getSpaceSliceData(userId: string, options: { limit: number; timeRange: string }): Promise<FeedItem[]> {
    try {
      // Get user's spaces first
      const { secureApiFetch } = await import('./secure-auth-utils');
      const spacesResponse = await secureApiFetch(`/api/profile/spaces/actions`);

      if (!spacesResponse.ok) throw new Error('Failed to fetch user spaces');

      const spacesData = await spacesResponse.json();
      const userSpaces = spacesData.spaces || [];

      const feedItems: FeedItem[] = [];

      // Get recent activities from each space
      for (const space of userSpaces.slice(0, 5)) { // Limit to top 5 spaces
        try {
          const postsResponse = await secureApiFetch(`/api/spaces/${space.id}/posts?limit=5`);

          if (postsResponse.ok) {
            const postsData = await postsResponse.json();
            for (const post of postsData.posts || []) {
              feedItems.push({
                id: `space_${post.id}`,
                type: 'post',
                sourceSlice: 'spaces',
                sourceId: post.id,
                userId: post.authorId,
                spaceId: space.id,
                content: post,
                metadata: {
                  visibility: 'space',
                  priority: post.isPinned ? 'high' : 'medium',
                  tags: post.tags || [],
                  timestamp: post.createdAt
                }
              });
            }
          }
        } catch (error) {
        }
      }

      return feedItems.slice(0, options.limit);
    } catch (error) {
      return [];
    }
  }

  /**
   * Get tool slice specific data
   */
  private async getToolSliceData(userId: string, options: { limit: number; timeRange: string }): Promise<FeedItem[]> {
    try {
      const { secureApiFetch } = await import('./secure-auth-utils');
      const response = await secureApiFetch(`/api/tools/personal`);

      if (!response.ok) throw new Error('Failed to fetch tool data');

      const data = await response.json();
      const tools = data.tools || [];

      return tools.slice(0, options.limit).map((tool: any) => ({
        id: `tool_${tool.id}`,
        type: 'tool_created',
        sourceSlice: 'tools',
        sourceId: tool.id,
        userId: tool.creatorId,
        toolId: tool.id,
        content: tool,
        metadata: {
          visibility: tool.isPublic ? 'public' : 'private',
          priority: tool.deploymentCount > 10 ? 'high' : 'medium',
          tags: tool.tags || [],
          timestamp: tool.createdAt
        }
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Get profile slice specific data
   */
  private async getProfileSliceData(userId: string, options: { limit: number; timeRange: string }): Promise<FeedItem[]> {
    try {
      const { secureApiFetch } = await import('./secure-auth-utils');
      const response = await secureApiFetch(`/api/profile/dashboard`);

      if (!response.ok) throw new Error('Failed to fetch profile data');

      const data = await response.json();
      const activities = data.recentActivities || [];

      return activities.slice(0, options.limit).map((activity: any) => ({
        id: `profile_${activity.id}`,
        type: activity.type,
        sourceSlice: 'profile',
        sourceId: activity.id,
        userId: userId,
        content: activity,
        metadata: {
          visibility: 'private',
          priority: 'low',
          tags: [],
          timestamp: activity.timestamp
        }
      }));
    } catch (error) {
      return [];
    }
  }

  // ===== REAL-TIME INTEGRATION =====

  /**
   * Initialize WebSocket connection for real-time features
   */
  private initializeWebSocket(): void {
    if (typeof window === 'undefined') return; // Server-side check

    try {
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://api.hive.com/ws' 
        : 'ws://localhost:3001/ws';
      
      this.websocket = new WebSocket(wsUrl);

      this.websocket.onopen = () => {
        this.reconnectAttempts = 0;
        
        // Subscribe to user-specific updates
        this.sendWebSocketMessage({
          type: 'subscribe',
          channels: ['platform_updates', 'notifications', 'realtime_feed']
        });
      };

      this.websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
        }
      };

      this.websocket.onclose = () => {
        this.handleWebSocketReconnect();
      };

      this.websocket.onerror = (error) => {
      };
    } catch (error) {
    }
  }

  /**
   * Handle WebSocket messages
   */
  private handleWebSocketMessage(message: any): void {
    switch (message.type) {
      case 'platform_update':
        this.handlePlatformUpdate(message.data);
        break;
      case 'notification':
        this.handleRealTimeNotification(message.data);
        break;
      case 'feed_update':
        this.handleFeedUpdate(message.data);
        break;
      case 'space_activity':
        this.handleSpaceActivity(message.data);
        break;
      case 'tool_interaction':
        this.handleToolInteraction(message.data);
        break;
      default:
    }
  }

  /**
   * Handle platform-wide updates
   */
  private handlePlatformUpdate(data: any): void {
    // Invalidate relevant caches
    this.invalidateCache(`unified_feed_${data.userId}`);
    
    // Notify subscribers
    this.notifySubscribers('platform_update', data);
  }

  /**
   * Handle real-time notifications
   */
  private handleRealTimeNotification(notification: PlatformNotification): void {
    // Add to notification cache
    const cacheKey = `notifications_${notification.userId}`;
    const existingNotifications = this.cache.get(cacheKey) || [];
    this.cache.set(cacheKey, [notification, ...existingNotifications.slice(0, 49)]);
    
    // Notify subscribers
    this.notifySubscribers('notification', notification);
  }

  /**
   * Handle feed updates
   */
  private handleFeedUpdate(data: any): void {
    // Invalidate feed cache
    this.invalidateCache(`unified_feed_${data.userId}`);
    
    // Notify subscribers
    this.notifySubscribers('feed_update', data);
  }

  /**
   * Handle space activity updates
   */
  private handleSpaceActivity(activity: SpaceActivity): void {
    // Update space activity cache
    const cacheKey = `space_activities_${activity.spaceId}`;
    const existingActivities = this.cache.get(cacheKey) || [];
    this.cache.set(cacheKey, [activity, ...existingActivities.slice(0, 19)]);
    
    // Notify subscribers
    this.notifySubscribers('space_activity', activity);
  }

  /**
   * Handle tool interaction updates
   */
  private handleToolInteraction(interaction: ToolInteraction): void {
    // Update tool interaction cache
    const cacheKey = `tool_interactions_${interaction.toolId}`;
    const existingInteractions = this.cache.get(cacheKey) || [];
    this.cache.set(cacheKey, [interaction, ...existingInteractions.slice(0, 19)]);
    
    // Notify subscribers
    this.notifySubscribers('tool_interaction', interaction);
  }

  // ===== SUBSCRIPTION MANAGEMENT =====

  /**
   * Subscribe to platform events
   */
  subscribe(eventType: string, callback: Function): () => void {
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, new Set());
    }
    
    this.subscriptions.get(eventType)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscriptions.get(eventType)?.delete(callback);
    };
  }

  /**
   * Notify all subscribers of an event
   */
  private notifySubscribers(eventType: string, data: any): void {
    const subscribers = this.subscriptions.get(eventType);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
        }
      });
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Rank feed items by relevance
   */
  private rankFeedItems(items: FeedItem[], _userId: string): FeedItem[] {
    return items.sort((a, b) => {
      // Priority weighting
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityWeight[a.metadata.priority];
      const bPriority = priorityWeight[b.metadata.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Timestamp weighting (more recent = higher)
      const aTime = new Date(a.metadata.timestamp).getTime();
      const bTime = new Date(b.metadata.timestamp).getTime();
      
      return bTime - aTime;
    });
  }

  /**
   * Cache data with TTL
   */
  private cacheData(key: string, data: any, ttl: number): void {
    if (this.config.cacheStrategy === 'memory' || this.config.cacheStrategy === 'hybrid') {
      this.cache.set(key, data);
      
      // Set TTL
      setTimeout(() => {
        this.cache.delete(key);
      }, ttl);
    }
    
    if (this.config.cacheStrategy === 'localStorage' || this.config.cacheStrategy === 'hybrid') {
      try {
        localStorage.setItem(key, JSON.stringify({
          data,
          expires: Date.now() + ttl
        }));
      } catch (error) {
      }
    }
  }

  /**
   * Invalidate cache entries
   */
  private invalidateCache(pattern: string): void {
    // Memory cache
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
    
    // localStorage cache
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.includes(pattern)) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
      }
    }
  }

  /**
   * Get authentication token
   */
  private async getAuthToken(): Promise<string> {
    if (typeof window === 'undefined') return '';
    
    try {
      const sessionJson = localStorage.getItem('hive_session');
      if (sessionJson) {
        const session = JSON.parse(sessionJson);
        return process.env.NODE_ENV === 'development' 
          ? `dev_token_${session.uid}` 
          : session.token;
      }
    } catch (error) {
    }
    
    return '';
  }

  /**
   * Send WebSocket message
   */
  private sendWebSocketMessage(message: any): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    }
  }

  /**
   * Handle WebSocket reconnection
   */
  private handleWebSocketReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
      
      
      setTimeout(() => {
        this.initializeWebSocket();
      }, delay);
    } else {
    }
  }

  /**
   * Cleanup and close connections
   */
  destroy(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    
    this.cache.clear();
    this.subscriptions.clear();
  }
}

// ===== SINGLETON INSTANCE =====

let platformIntegrationInstance: PlatformIntegration | null = null;

export function getPlatformIntegration(config?: PlatformIntegrationConfig): PlatformIntegration {
  if (!platformIntegrationInstance) {
    const defaultConfig: PlatformIntegrationConfig = {
      enableRealtime: true,
      enableCrossSliceNotifications: true,
      enableUnifiedSearch: true,
      enableActivityStreaming: true,
      cacheStrategy: 'hybrid'
    };
    
    platformIntegrationInstance = new PlatformIntegration(config || defaultConfig);
  }
  
  return platformIntegrationInstance;
}

// ===== HOOK FOR REACT COMPONENTS =====

export function usePlatformIntegration() {
  const integration = getPlatformIntegration();
  
  return {
    getUnifiedFeed: (userId: string, options?: any) => integration.getUnifiedFeedData(userId, options),
    subscribe: (eventType: string, callback: Function) => integration.subscribe(eventType, callback),
    invalidateCache: (pattern: string) => (integration as any).invalidateCache(pattern)
  };
}
