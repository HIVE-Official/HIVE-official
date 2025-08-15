/**
 * HIVE Platform Integration React Hook
 * 
 * Connects React components to the platform integration systems
 * Provides unified access to real-time data, search, and notifications
 */

import { useEffect, useState, useCallback, useMemo as _useMemo } from 'react';
import { useUnifiedStore, useFeedState, useSpacesState, useToolsState, useNotificationsState, useRealtimeState } from '@/lib/unified-state-management';
import { getPlatformIntegration, type FeedItem } from '@/lib/platform-integration';
import { getSearchEngine, type SearchResult, type SearchQuery, searchPlatform } from '@/lib/platform-wide-search';
import { getNotificationManager, type NotificationType } from '@/lib/cross-platform-notifications';

// ===== MAIN PLATFORM INTEGRATION HOOK =====

export function usePlatformIntegration() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [integrationError, setIntegrationError] = useState<string | null>(null);

  const user = useUnifiedStore(state => state.user);
  const isAuthenticated = useUnifiedStore(state => state.isAuthenticated);
  
  // Initialize platform integration when user authenticates
  useEffect(() => {
    if (isAuthenticated && user && !isInitialized) {
      try {
        const integration = getPlatformIntegration();
        const searchEngine = getSearchEngine();
        const notificationManager = getNotificationManager();

        // Set search context
        searchEngine.setContext({
          userId: user.uid,
          currentSlice: 'feed',
          recentSearches: [],
          preferences: {
            defaultSlices: ['spaces', 'tools', 'feed', 'profile'],
            preferredResultTypes: ['space', 'tool', 'post', 'user'],
            maxResults: 20,
            enableAutoComplete: true,
            enableRecentSearches: true,
            saveSearchHistory: true
          }
        });

        setIsInitialized(true);
        setIntegrationError(null);
      } catch (error) {
        console.error('Failed to initialize platform integration:', error);
        setIntegrationError(error instanceof Error ? error.message : 'Initialization failed');
      }
    }
  }, [isAuthenticated, user, isInitialized]);

  return {
    isInitialized,
    error: integrationError,
    user,
    isAuthenticated
  };
}

// ===== UNIFIED FEED HOOK =====

export function useUnifiedFeed(options: {
  limit?: number;
  sources?: string[];
  autoRefresh?: boolean;
  refreshInterval?: number;
} = {}) {
  const { limit = 20, sources = ['feed', 'spaces', 'tools', 'profile'], autoRefresh = true, refreshInterval = 60000 } = options;
  
  const { feedItems, loading, error, refresh } = useFeedState();
  const { isOnline, syncWithServer } = useRealtimeState();
  const user = useUnifiedStore(state => state.user);

  // Auto-refresh feed data
  useEffect(() => {
    if (autoRefresh && user) {
      const interval = setInterval(() => {
        if (isOnline) {
          refresh({ force: false });
        }
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, user, refresh, isOnline, refreshInterval]);

  const refreshFeed = useCallback(async (force = false) => {
    if (user) {
      await refresh({ force });
    }
  }, [user, refresh]);

  const getFeedData = useCallback(async (customOptions?: any) => {
    if (!user) return [];

    try {
      const integration = getPlatformIntegration();
      return await integration.getUnifiedFeedData(user.uid, {
        limit,
        sources,
        ...customOptions
      });
    } catch (error) {
      console.error('Error getting feed data:', error);
      return [];
    }
  }, [user, limit, sources]);

  return {
    feedItems: feedItems.slice(0, limit),
    loading,
    error,
    refresh: refreshFeed,
    getFeedData,
    isOnline
  };
}

// ===== SPACE INTEGRATION HOOK =====

export function useSpaceIntegration(spaceId: string | null) {
  const { spaces, loading, error, refresh, setActiveSpace } = useSpacesState();
  const [spaceData, setSpaceData] = useState<any>(null);
  const [spacePosts, setSpacePosts] = useState<any[]>([]);
  const [spaceMembers, setSpaceMembers] = useState<any[]>([]);
  
  const user = useUnifiedStore(state => state.user);

  // Set active space
  useEffect(() => {
    if (spaceId) {
      setActiveSpace(spaceId);
    }
  }, [spaceId, setActiveSpace]);

  // Load space data
  useEffect(() => {
    if (spaceId && user) {
      loadSpaceData(spaceId);
    }
  }, [spaceId, user]);

  const loadSpaceData = useCallback(async (id: string) => {
    try {
      // Load space details
      const space = spaces.find(s => s.id === id);
      if (space) {
        setSpaceData(space);
      }

      // Load space posts
      const postsResponse = await fetch(`/api/spaces/${id}/posts?limit=20`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });

      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setSpacePosts(postsData.posts || []);
      }

      // Load space members
      const membersResponse = await fetch(`/api/spaces/${id}/members?limit=50`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });

      if (membersResponse.ok) {
        const membersData = await membersResponse.json();
        setSpaceMembers(membersData.members || []);
      }
    } catch (error) {
      console.error('Error loading space data:', error);
    }
  }, [spaces]);

  const createPost = useCallback(async (postData: any) => {
    if (!spaceId || !user) return null;

    try {
      const response = await fetch(`/api/spaces/${spaceId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const newPost = await response.json();
        setSpacePosts(prev => [newPost.post, ...prev]);
        return newPost.post;
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
    return null;
  }, [spaceId, user]);

  const joinSpace = useCallback(async (id: string) => {
    if (!user) return false;

    try {
      const response = await fetch(`/api/spaces/${id}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });

      if (response.ok) {
        await refresh();
        return true;
      }
    } catch (error) {
      console.error('Error joining space:', error);
    }
    return false;
  }, [user, refresh]);

  return {
    spaceData,
    spacePosts,
    spaceMembers,
    loading,
    error,
    refresh: () => refresh(),
    createPost,
    joinSpace,
    reloadSpace: () => spaceId && loadSpaceData(spaceId)
  };
}

// ===== TOOL INTEGRATION HOOK =====

export function useToolIntegration(toolId: string | null) {
  const { tools, loading, error, refresh, setActiveTool } = useToolsState();
  const [toolData, setToolData] = useState<any>(null);
  const [toolDeployments, setToolDeployments] = useState<any[]>([]);
  
  const user = useUnifiedStore(state => state.user);

  useEffect(() => {
    if (toolId) {
      setActiveTool(toolId);
      loadToolData(toolId);
    }
  }, [toolId, setActiveTool]);

  const loadToolData = useCallback(async (id: string) => {
    try {
      const tool = tools.find(t => t.id === id);
      if (tool) {
        setToolData(tool);
      }

      // Load tool deployments
      const deploymentsResponse = await fetch(`/api/tools/${id}/deployments`, {
        headers: {
          'Authorization': `Bearer ${await getAuthToken()}`
        }
      });

      if (deploymentsResponse.ok) {
        const deploymentsData = await deploymentsResponse.json();
        setToolDeployments(deploymentsData.deployments || []);
      }
    } catch (error) {
      console.error('Error loading tool data:', error);
    }
  }, [tools]);

  const deployTool = useCallback(async (deploymentData: any) => {
    if (!toolId || !user) return null;

    try {
      const response = await fetch(`/api/tools/${toolId}/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify(deploymentData)
      });

      if (response.ok) {
        const deployment = await response.json();
        setToolDeployments(prev => [deployment.deployment, ...prev]);
        return deployment.deployment;
      }
    } catch (error) {
      console.error('Error deploying tool:', error);
    }
    return null;
  }, [toolId, user]);

  const shareTool = useCallback(async (shareData: any) => {
    if (!toolId || !user) return false;

    try {
      const response = await fetch(`/api/tools/${toolId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify(shareData)
      });

      return response.ok;
    } catch (error) {
      console.error('Error sharing tool:', error);
      return false;
    }
  }, [toolId, user]);

  return {
    toolData,
    toolDeployments,
    loading,
    error,
    refresh: () => refresh(),
    deployTool,
    shareTool,
    reloadTool: () => toolId && loadToolData(toolId)
  };
}

// ===== SEARCH INTEGRATION HOOK =====

export function useSearchIntegration() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const search = useCallback(async (query: string, options?: any) => {
    if (!query.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchPlatform(query, options?.options, options?.filters);
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getSuggestions = useCallback(async (partial: string) => {
    if (partial.length < 2) {
      setSuggestions([]);
      return [];
    }

    try {
      const engine = getSearchEngine();
      const results = await engine.getSuggestions(partial);
      setSuggestions(results);
      return results;
    } catch (error) {
      console.error('Suggestions error:', error);
      return [];
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSuggestions([]);
    setSearchError(null);
  }, []);

  return {
    searchResults,
    suggestions,
    isSearching,
    error: searchError,
    search,
    getSuggestions,
    clearSearch
  };
}

// ===== NOTIFICATION INTEGRATION HOOK =====

export function useNotificationIntegration() {
  const { notifications, unreadCount, addNotification, markAsRead, removeNotification } = useNotificationsState();
  const user = useUnifiedStore(state => state.user);

  const sendNotification = useCallback(async (type: NotificationType, targetUserId: string, data: any) => {
    if (!user) return;

    try {
      const manager = getNotificationManager();
      await manager.createNotification(type, targetUserId, data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, [user]);

  const updatePreferences = useCallback(async (preferences: any) => {
    if (!user) return;

    try {
      const manager = getNotificationManager();
      await manager.updateUserPreferences(user.uid, preferences);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    removeNotification,
    sendNotification,
    updatePreferences
  };
}

// ===== REAL-TIME INTEGRATION HOOK =====

export function useRealtimeIntegration() {
  const { isOnline, websocketConnected, lastSyncTime, syncInProgress, syncWithServer, handleRealtimeUpdate } = useRealtimeState();

  const subscribeToUpdates = useCallback(() => {
    const integration = getPlatformIntegration();
    
    const unsubscribers = [
      integration.subscribe('platform_update', handleRealtimeUpdate),
      integration.subscribe('feed_update', handleRealtimeUpdate),
      integration.subscribe('space_activity', handleRealtimeUpdate),
      integration.subscribe('tool_interaction', handleRealtimeUpdate),
      integration.subscribe('notification', handleRealtimeUpdate)
    ];

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [handleRealtimeUpdate]);

  const forceSync = useCallback(async (slices?: string[]) => {
    await syncWithServer(slices);
  }, [syncWithServer]);

  return {
    isOnline,
    websocketConnected,
    lastSyncTime,
    syncInProgress,
    subscribeToUpdates,
    forceSync
  };
}

// ===== UTILITY FUNCTIONS =====

async function getAuthToken(): Promise<string> {
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
    console.error('Error getting auth token:', error);
  }
  
  return '';
}

// ===== COMBINED HOOK FOR SURFACE COMPONENTS =====

export function useSurfaceIntegration(surfaceType: 'posts' | 'members' | 'events' | 'tools' | 'chat' | 'pinned', spaceId?: string) {
  const platformIntegration = usePlatformIntegration();
  const feedIntegration = useUnifiedFeed();
  const spaceIntegration = useSpaceIntegration(spaceId || null);
  const realtimeIntegration = useRealtimeIntegration();

  const [surfaceData, setSurfaceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSurfaceData = useCallback(async () => {
    if (!spaceId || !platformIntegration.isInitialized) return;

    setLoading(true);
    setError(null);

    try {
      let data = [];

      switch (surfaceType) {
        case 'posts':
          data = spaceIntegration.spacePosts;
          break;
        case 'members':
          data = spaceIntegration.spaceMembers;
          break;
        case 'events': {
          // Load events data
          const eventsResponse = await fetch(`/api/spaces/${spaceId}/events`, {
            headers: { 'Authorization': `Bearer ${await getAuthToken()}` }
          });
          if (eventsResponse.ok) {
            const eventsData = await eventsResponse.json();
            data = eventsData.events || [];
          }
          break;
        }
        case 'tools': {
          // Load space tools
          const toolsResponse = await fetch(`/api/spaces/${spaceId}/tools`, {
            headers: { 'Authorization': `Bearer ${await getAuthToken()}` }
          });
          if (toolsResponse.ok) {
            const toolsData = await toolsResponse.json();
            data = toolsData.tools || [];
          }
          break;
        }
        // Add more surface types as needed
      }

      setSurfaceData(data);
    } catch (err) {
      console.error(`Error loading ${surfaceType} data:`, err);
      setError(err instanceof Error ? err.message : `Failed to load ${surfaceType}`);
    } finally {
      setLoading(false);
    }
  }, [surfaceType, spaceId, platformIntegration.isInitialized, spaceIntegration.spacePosts, spaceIntegration.spaceMembers]);

  useEffect(() => {
    loadSurfaceData();
  }, [loadSurfaceData]);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = realtimeIntegration.subscribeToUpdates();
    return unsubscribe;
  }, [realtimeIntegration]);

  return {
    data: surfaceData,
    loading,
    error,
    refresh: loadSurfaceData,
    ...spaceIntegration,
    ...realtimeIntegration
  };
}