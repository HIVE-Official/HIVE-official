/**
 * HIVE Unified State Management System
 * 
 * Centralizes state across all platform slices with real-time synchronization
 * Manages Feed, Spaces, Tools, Profile data with optimistic updates
 */

import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { type User, type Space, type Post, type Tool } from '@hive/core';
import { getPlatformIntegration, type FeedItem, type PlatformNotification } from './platform-integration';

// ===== STATE INTERFACES =====

export interface UnifiedAppState {
  // User & Authentication
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  // Cross-Slice Data
  feedItems: FeedItem[];
  userSpaces: Space[];
  userTools: Tool[];
  notifications: PlatformNotification[];

  // UI State
  currentSlice: 'feed' | 'spaces' | 'tools' | 'profile' | 'dashboard';
  activeSpaceId: string | null;
  activeToolId: string | null;
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;

  // Real-time State
  isOnline: boolean;
  websocketConnected: boolean;
  lastSyncTime: string | null;
  syncInProgress: boolean;

  // Cache & Performance
  cache: Map<string, any>;
  cacheTimestamps: Map<string, number>;
  optimisticUpdates: Map<string, any>;

  // Loading States
  feedLoading: boolean;
  spacesLoading: boolean;
  toolsLoading: boolean;
  profileLoading: boolean;

  // Error States
  errors: {
    feed: string | null;
    spaces: string | null;
    tools: string | null;
    profile: string | null;
    network: string | null;
  };
}

export interface UnifiedAppActions {
  // Authentication Actions
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;

  // Data Actions
  setFeedItems: (items: FeedItem[]) => void;
  addFeedItem: (item: FeedItem) => void;
  updateFeedItem: (id: string, updates: Partial<FeedItem>) => void;
  removeFeedItem: (id: string) => void;

  setUserSpaces: (spaces: Space[]) => void;
  addUserSpace: (space: Space) => void;
  updateUserSpace: (id: string, updates: Partial<Space>) => void;
  removeUserSpace: (id: string) => void;

  setUserTools: (tools: Tool[]) => void;
  addUserTool: (tool: Tool) => void;
  updateUserTool: (id: string, updates: Partial<Tool>) => void;
  removeUserTool: (id: string) => void;

  setNotifications: (notifications: PlatformNotification[]) => void;
  addNotification: (notification: PlatformNotification) => void;
  markNotificationRead: (id: string) => void;
  removeNotification: (id: string) => void;

  // UI Actions
  setCurrentSlice: (slice: UnifiedAppState['currentSlice']) => void;
  setActiveSpaceId: (id: string | null) => void;
  setActiveToolId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;

  // Real-time Actions
  setOnlineStatus: (online: boolean) => void;
  setWebsocketStatus: (connected: boolean) => void;
  updateLastSyncTime: () => void;
  setSyncInProgress: (inProgress: boolean) => void;

  // Loading Actions
  setFeedLoading: (loading: boolean) => void;
  setSpacesLoading: (loading: boolean) => void;
  setToolsLoading: (loading: boolean) => void;
  setProfileLoading: (loading: boolean) => void;

  // Error Actions
  setError: (slice: keyof UnifiedAppState['errors'], error: string | null) => void;
  clearErrors: () => void;

  // Cache Actions
  setCacheItem: (key: string, value: any, ttl?: number) => void;
  getCacheItem: (key: string) => any;
  invalidateCache: (pattern?: string) => void;

  // Optimistic Updates
  addOptimisticUpdate: (key: string, update: any) => void;
  resolveOptimisticUpdate: (key: string, success: boolean, actualData?: any) => void;
  clearOptimisticUpdates: () => void;

  // Data Fetching Actions
  refreshFeed: (options?: { force?: boolean }) => Promise<void>;
  refreshSpaces: (options?: { force?: boolean }) => Promise<void>;
  refreshTools: (options?: { force?: boolean }) => Promise<void>;
  refreshProfile: (options?: { force?: boolean }) => Promise<void>;
  refreshAll: (options?: { force?: boolean }) => Promise<void>;

  // Cross-Slice Actions
  performOptimisticAction: (action: OptimisticAction) => Promise<void>;
  syncWithServer: (slices?: string[]) => Promise<void>;
  handleRealtimeUpdate: (update: RealtimeUpdate) => void;
}

export interface OptimisticAction {
  id: string;
  type: 'create_post' | 'join_space' | 'create_tool' | 'like_post' | 'share_tool';
  slice: string;
  data: any;
  apiCall: () => Promise<any>;
  rollback?: () => void;
}

export interface RealtimeUpdate {
  type: string;
  slice: string;
  data: any;
  timestamp: string;
}

// ===== ZUSTAND STORE =====

export const useUnifiedStore = create<UnifiedAppState & UnifiedAppActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        authLoading: false,
        feedItems: [],
        userSpaces: [],
        userTools: [],
        notifications: [],
        currentSlice: 'feed',
        activeSpaceId: null,
        activeToolId: null,
        sidebarOpen: true,
        commandPaletteOpen: false,
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        websocketConnected: false,
        lastSyncTime: null,
        syncInProgress: false,
        cache: new Map(),
        cacheTimestamps: new Map(),
        optimisticUpdates: new Map(),
        feedLoading: false,
        spacesLoading: false,
        toolsLoading: false,
        profileLoading: false,
        errors: {
          feed: null,
          spaces: null,
          tools: null,
          profile: null,
          network: null,
        },

        // Authentication Actions
        setUser: (user) => set((state) => {
          state.user = user;
          state.isAuthenticated = !!user;
        }),

        setAuthLoading: (loading) => set((state) => {
          state.authLoading = loading;
        }),

        logout: () => set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.feedItems = [];
          state.userSpaces = [];
          state.userTools = [];
          state.notifications = [];
          state.cache.clear();
          state.cacheTimestamps.clear();
          state.optimisticUpdates.clear();
        }),

        // Feed Actions
        setFeedItems: (items) => set((state) => {
          state.feedItems = items;
        }),

        addFeedItem: (item) => set((state) => {
          state.feedItems.unshift(item);
        }),

        updateFeedItem: (id, updates) => set((state) => {
          const index = state.feedItems.findIndex(item => item.id === id);
          if (index !== -1) {
            Object.assign(state.feedItems[index], updates);
          }
        }),

        removeFeedItem: (id) => set((state) => {
          state.feedItems = state.feedItems.filter(item => item.id !== id);
        }),

        // Spaces Actions
        setUserSpaces: (spaces) => set((state) => {
          state.userSpaces = spaces;
        }),

        addUserSpace: (space) => set((state) => {
          state.userSpaces.push(space);
        }),

        updateUserSpace: (id, updates) => set((state) => {
          const index = state.userSpaces.findIndex(space => space.id === id);
          if (index !== -1) {
            Object.assign(state.userSpaces[index], updates);
          }
        }),

        removeUserSpace: (id) => set((state) => {
          state.userSpaces = state.userSpaces.filter(space => space.id !== id);
        }),

        // Tools Actions
        setUserTools: (tools) => set((state) => {
          state.userTools = tools;
        }),

        addUserTool: (tool) => set((state) => {
          state.userTools.push(tool);
        }),

        updateUserTool: (id, updates) => set((state) => {
          const index = state.userTools.findIndex(tool => tool.id === id);
          if (index !== -1) {
            Object.assign(state.userTools[index], updates);
          }
        }),

        removeUserTool: (id) => set((state) => {
          state.userTools = state.userTools.filter(tool => tool.id !== id);
        }),

        // Notifications Actions
        setNotifications: (notifications) => set((state) => {
          state.notifications = notifications;
        }),

        addNotification: (notification) => set((state) => {
          state.notifications.unshift(notification);
        }),

        markNotificationRead: (id) => set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (notification) {
            notification.metadata.read = true;
          }
        }),

        removeNotification: (id) => set((state) => {
          state.notifications = state.notifications.filter(n => n.id !== id);
        }),

        // UI Actions
        setCurrentSlice: (slice) => set((state) => {
          state.currentSlice = slice;
        }),

        setActiveSpaceId: (id) => set((state) => {
          state.activeSpaceId = id;
          if (id) {
            state.currentSlice = 'spaces';
          }
        }),

        setActiveToolId: (id) => set((state) => {
          state.activeToolId = id;
          if (id) {
            state.currentSlice = 'tools';
          }
        }),

        setSidebarOpen: (open) => set((state) => {
          state.sidebarOpen = open;
        }),

        setCommandPaletteOpen: (open) => set((state) => {
          state.commandPaletteOpen = open;
        }),

        // Real-time Actions
        setOnlineStatus: (online) => set((state) => {
          state.isOnline = online;
          if (!online) {
            state.websocketConnected = false;
          }
        }),

        setWebsocketStatus: (connected) => set((state) => {
          state.websocketConnected = connected;
        }),

        updateLastSyncTime: () => set((state) => {
          state.lastSyncTime = new Date().toISOString();
        }),

        setSyncInProgress: (inProgress) => set((state) => {
          state.syncInProgress = inProgress;
        }),

        // Loading Actions
        setFeedLoading: (loading) => set((state) => {
          state.feedLoading = loading;
        }),

        setSpacesLoading: (loading) => set((state) => {
          state.spacesLoading = loading;
        }),

        setToolsLoading: (loading) => set((state) => {
          state.toolsLoading = loading;
        }),

        setProfileLoading: (loading) => set((state) => {
          state.profileLoading = loading;
        }),

        // Error Actions
        setError: (slice, error) => set((state) => {
          state.errors[slice] = error;
        }),

        clearErrors: () => set((state) => {
          Object.keys(state.errors).forEach(key => {
            state.errors[key as keyof typeof state.errors] = null;
          });
        }),

        // Cache Actions
        setCacheItem: (key, value, ttl = 300000) => set((state) => { // 5 minutes default TTL
          state.cache.set(key, value);
          state.cacheTimestamps.set(key, Date.now() + ttl);
        }),

        getCacheItem: (key) => {
          const state = get();
          const timestamp = state.cacheTimestamps.get(key);
          if (timestamp && Date.now() < timestamp) {
            return state.cache.get(key);
          }
          // Cache expired
          state.cache.delete(key);
          state.cacheTimestamps.delete(key);
          return null;
        },

        invalidateCache: (pattern) => set((state) => {
          if (pattern) {
            for (const key of state.cache.keys()) {
              if (key.includes(pattern)) {
                state.cache.delete(key);
                state.cacheTimestamps.delete(key);
              }
            }
          } else {
            state.cache.clear();
            state.cacheTimestamps.clear();
          }
        }),

        // Optimistic Updates
        addOptimisticUpdate: (key, update) => set((state) => {
          state.optimisticUpdates.set(key, update);
        }),

        resolveOptimisticUpdate: (key, success, actualData) => set((state) => {
          const update = state.optimisticUpdates.get(key);
          if (update) {
            if (success && actualData) {
              // Apply actual data
              switch (update.type) {
                case 'create_post': {
                  const feedIndex = state.feedItems.findIndex(item => item.id === update.tempId);
                  if (feedIndex !== -1) {
                    state.feedItems[feedIndex] = actualData;
                  }
                  break;
                }
                case 'join_space': {
                  const spaceIndex = state.userSpaces.findIndex(space => space.id === update.tempId);
                  if (spaceIndex !== -1) {
                    state.userSpaces[spaceIndex] = actualData;
                  }
                  break;
                }
                // Add more cases as needed
              }
            } else if (!success && update.rollback) {
              // Rollback optimistic update
              update.rollback();
            }
            state.optimisticUpdates.delete(key);
          }
        }),

        clearOptimisticUpdates: () => set((state) => {
          state.optimisticUpdates.clear();
        }),

        // Data Fetching Actions
        refreshFeed: async (options = {}) => {
          const { force = false } = options;
          const state = get();
          
          if (!state.user) return;

          // Check cache first
          const cacheKey = `feed_${state.user.uid}`;
          if (!force) {
            const cachedData = state.getCacheItem(cacheKey);
            if (cachedData) {
              state.setFeedItems(cachedData);
              return;
            }
          }

          try {
            state.setFeedLoading(true);
            state.setError('feed', null);

            const integration = getPlatformIntegration();
            const feedData = await integration.getUnifiedFeed(state.user.uid, {
              limit: 20,
              sources: ['feed', 'spaces', 'tools', 'profile']
            });

            state.setFeedItems(feedData);
            state.setCacheItem(cacheKey, feedData);
            state.updateLastSyncTime();
          } catch (error) {
            console.error('Error refreshing feed:', error);
            state.setError('feed', error instanceof Error ? error.message : 'Failed to refresh feed');
          } finally {
            state.setFeedLoading(false);
          }
        },

        refreshSpaces: async (options = {}) => {
          const { force = false } = options;
          const state = get();
          
          if (!state.user) return;

          const cacheKey = `spaces_${state.user.uid}`;
          if (!force) {
            const cachedData = state.getCacheItem(cacheKey);
            if (cachedData) {
              state.setUserSpaces(cachedData);
              return;
            }
          }

          try {
            state.setSpacesLoading(true);
            state.setError('spaces', null);

            const response = await fetch('/api/profile/spaces/actions', {
              headers: {
                'Authorization': `Bearer ${await getAuthToken()}`
              }
            });

            if (!response.ok) {
              throw new Error('Failed to fetch spaces');
            }

            const data = await response.json();
            const spaces = data.spaces || [];

            state.setUserSpaces(spaces);
            state.setCacheItem(cacheKey, spaces);
            state.updateLastSyncTime();
          } catch (error) {
            console.error('Error refreshing spaces:', error);
            state.setError('spaces', error instanceof Error ? error.message : 'Failed to refresh spaces');
          } finally {
            state.setSpacesLoading(false);
          }
        },

        refreshTools: async (options = {}) => {
          const { force = false } = options;
          const state = get();
          
          if (!state.user) return;

          const cacheKey = `tools_${state.user.uid}`;
          if (!force) {
            const cachedData = state.getCacheItem(cacheKey);
            if (cachedData) {
              state.setUserTools(cachedData);
              return;
            }
          }

          try {
            state.setToolsLoading(true);
            state.setError('tools', null);

            const response = await fetch('/api/tools/personal', {
              headers: {
                'Authorization': `Bearer ${await getAuthToken()}`
              }
            });

            if (!response.ok) {
              throw new Error('Failed to fetch tools');
            }

            const data = await response.json();
            const tools = data.tools || [];

            state.setUserTools(tools);
            state.setCacheItem(cacheKey, tools);
            state.updateLastSyncTime();
          } catch (error) {
            console.error('Error refreshing tools:', error);
            state.setError('tools', error instanceof Error ? error.message : 'Failed to refresh tools');
          } finally {
            state.setToolsLoading(false);
          }
        },

        refreshProfile: async (options = {}) => {
          const { force = false } = options;
          const state = get();
          
          if (!state.user) return;

          try {
            state.setProfileLoading(true);
            state.setError('profile', null);

            const response = await fetch('/api/profile/dashboard', {
              headers: {
                'Authorization': `Bearer ${await getAuthToken()}`
              }
            });

            if (!response.ok) {
              throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            
            // Update user data if needed
            if (data.user) {
              state.setUser({ ...state.user, ...data.user });
            }

            state.updateLastSyncTime();
          } catch (error) {
            console.error('Error refreshing profile:', error);
            state.setError('profile', error instanceof Error ? error.message : 'Failed to refresh profile');
          } finally {
            state.setProfileLoading(false);
          }
        },

        refreshAll: async (options = {}) => {
          const state = get();
          state.setSyncInProgress(true);
          
          try {
            await Promise.all([
              state.refreshFeed(options),
              state.refreshSpaces(options),
              state.refreshTools(options),
              state.refreshProfile(options)
            ]);
          } catch (error) {
            console.error('Error refreshing all data:', error);
          } finally {
            state.setSyncInProgress(false);
          }
        },

        // Cross-Slice Actions
        performOptimisticAction: async (action) => {
          const state = get();
          
          try {
            // Add optimistic update
            state.addOptimisticUpdate(action.id, action);

            // Perform optimistic UI update
            switch (action.type) {
              case 'create_post': {
                const tempPost: FeedItem = {
                  id: `temp_${action.id}`,
                  type: 'post',
                  sourceSlice: 'feed',
                  sourceId: `temp_${action.id}`,
                  userId: state.user?.uid || '',
                  content: action.data,
                  metadata: {
                    visibility: 'public',
                    priority: 'medium',
                    tags: [],
                    timestamp: new Date().toISOString()
                  }
                };
                state.addFeedItem(tempPost);
                break;
              }
              case 'join_space': {
                const tempSpace: Space = {
                  id: `temp_${action.id}`,
                  ...action.data,
                  memberCount: (action.data.memberCount || 0) + 1
                };
                state.addUserSpace(tempSpace);
                break;
              }

              // Add more optimistic updates as needed
            }

            // Perform actual API call
            const result = await action.apiCall();
            
            // Resolve optimistic update with success
            state.resolveOptimisticUpdate(action.id, true, result);
            
          } catch (error) {
            console.error('Optimistic action failed:', error);
            
            // Resolve optimistic update with failure
            state.resolveOptimisticUpdate(action.id, false);
            
            // Show error
            state.setError('network', error instanceof Error ? error.message : 'Action failed');
          }
        },

        syncWithServer: async (slices = ['feed', 'spaces', 'tools', 'profile']) => {
          const state = get();
          
          if (!state.isOnline) {
            
            return;
          }

          state.setSyncInProgress(true);
          
          try {
            const syncPromises = slices.map(slice => {
              switch (slice) {
                case 'feed': return state.refreshFeed({ force: true });
                case 'spaces': return state.refreshSpaces({ force: true });
                case 'tools': return state.refreshTools({ force: true });
                case 'profile': return state.refreshProfile({ force: true });
                default: return Promise.resolve();
              }
            });

            await Promise.all(syncPromises);
            
          } catch (error) {
            console.error('Sync failed:', error);
            state.setError('network', 'Sync failed');
          } finally {
            state.setSyncInProgress(false);
          }
        },

        handleRealtimeUpdate: (update) => {
          const state = get();
          
          
          
          switch (update.type) {
            case 'feed_update':
              if (update.data.type === 'new_post') {
                state.addFeedItem(update.data.post);
              } else if (update.data.type === 'post_updated') {
                state.updateFeedItem(update.data.postId, update.data.updates);
              }
              break;

            case 'space_activity':
              if (update.data.type === 'member_joined') {
                const space = state.userSpaces.find(s => s.id === update.data.spaceId);
                if (space) {
                  state.updateUserSpace(space.id, {
                    memberCount: (space.memberCount || 0) + 1
                  });
                }
              }
              break;

            case 'tool_interaction':
              if (update.data.type === 'tool_deployed') {
                const tool = state.userTools.find(t => t.id === update.data.toolId);
                if (tool) {
                  state.updateUserTool(tool.id, {
                    deploymentCount: (tool.deploymentCount || 0) + 1
                  });
                }
              }
              break;

            case 'notification':
              state.addNotification(update.data);
              break;

            default:
              
          }
          
          // Invalidate relevant cache entries
          state.invalidateCache(update.slice);
        }
      }))
    ),
    { name: 'hive-unified-store' }
  )
);

// ===== HELPER FUNCTIONS =====

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

// ===== HOOKS FOR SPECIFIC SLICES =====

export const useFeedState = () => {
  const feedItems = useUnifiedStore(state => state.feedItems);
  const feedLoading = useUnifiedStore(state => state.feedLoading);
  const feedError = useUnifiedStore(state => state.errors.feed);
  const refreshFeed = useUnifiedStore(state => state.refreshFeed);
  const addFeedItem = useUnifiedStore(state => state.addFeedItem);
  const updateFeedItem = useUnifiedStore(state => state.updateFeedItem);

  return {
    feedItems,
    loading: feedLoading,
    error: feedError,
    refresh: refreshFeed,
    addItem: addFeedItem,
    updateItem: updateFeedItem
  };
};

export const useSpacesState = () => {
  const userSpaces = useUnifiedStore(state => state.userSpaces);
  const spacesLoading = useUnifiedStore(state => state.spacesLoading);
  const spacesError = useUnifiedStore(state => state.errors.spaces);
  const activeSpaceId = useUnifiedStore(state => state.activeSpaceId);
  const refreshSpaces = useUnifiedStore(state => state.refreshSpaces);
  const setActiveSpaceId = useUnifiedStore(state => state.setActiveSpaceId);

  return {
    spaces: userSpaces,
    loading: spacesLoading,
    error: spacesError,
    activeSpaceId,
    refresh: refreshSpaces,
    setActiveSpace: setActiveSpaceId
  };
};

export const useToolsState = () => {
  const userTools = useUnifiedStore(state => state.userTools);
  const toolsLoading = useUnifiedStore(state => state.toolsLoading);
  const toolsError = useUnifiedStore(state => state.errors.tools);
  const activeToolId = useUnifiedStore(state => state.activeToolId);
  const refreshTools = useUnifiedStore(state => state.refreshTools);
  const setActiveToolId = useUnifiedStore(state => state.setActiveToolId);

  return {
    tools: userTools,
    loading: toolsLoading,
    error: toolsError,
    activeToolId,
    refresh: refreshTools,
    setActiveTool: setActiveToolId
  };
};

export const useNotificationsState = () => {
  const notifications = useUnifiedStore(state => state.notifications);
  const addNotification = useUnifiedStore(state => state.addNotification);
  const markNotificationRead = useUnifiedStore(state => state.markNotificationRead);
  const removeNotification = useUnifiedStore(state => state.removeNotification);

  const unreadCount = notifications.filter(n => !n.metadata.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead: markNotificationRead,
    removeNotification
  };
};

export const useRealtimeState = () => {
  const isOnline = useUnifiedStore(state => state.isOnline);
  const websocketConnected = useUnifiedStore(state => state.websocketConnected);
  const lastSyncTime = useUnifiedStore(state => state.lastSyncTime);
  const syncInProgress = useUnifiedStore(state => state.syncInProgress);
  const syncWithServer = useUnifiedStore(state => state.syncWithServer);
  const handleRealtimeUpdate = useUnifiedStore(state => state.handleRealtimeUpdate);

  return {
    isOnline,
    websocketConnected,
    lastSyncTime,
    syncInProgress,
    syncWithServer,
    handleRealtimeUpdate
  };
};

// ===== INITIALIZATION HELPER =====

export function initializeUnifiedState(user: User | null) {
  const store = useUnifiedStore.getState();
  
  if (user) {
    store.setUser(user);
    
    // Initialize data loading
    Promise.all([
      store.refreshFeed(),
      store.refreshSpaces(),
      store.refreshTools(),
      store.refreshProfile()
    ]).catch(error => {
      console.error('Error initializing unified state:', error);
    });

    // Set up real-time integration
    const integration = getPlatformIntegration();
    
    // Subscribe to real-time updates
    const unsubscribePlatform = integration.subscribe('platform_update', (data: any) => {
      store.handleRealtimeUpdate({
        type: 'platform_update',
        slice: 'all',
        data,
        timestamp: new Date().toISOString()
      });
    });

    const unsubscribeFeed = integration.subscribe('feed_update', (data) => {
      store.handleRealtimeUpdate({
        type: 'feed_update',
        slice: 'feed',
        data,
        timestamp: new Date().toISOString()
      });
    });

    const unsubscribeNotifications = integration.subscribe('notification', (data) => {
      store.handleRealtimeUpdate({
        type: 'notification',
        slice: 'notifications',
        data,
        timestamp: new Date().toISOString()
      });
    });

    // Set up online/offline detection
    const handleOnline = () => store.setOnlineStatus(true);
    const handleOffline = () => store.setOnlineStatus(false);
    
    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    // Set up periodic sync
    const syncInterval = setInterval(() => {
      if (store.isOnline && !store.syncInProgress) {
        store.syncWithServer();
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    // Return cleanup function
    return () => {
      unsubscribePlatform();
      unsubscribeFeed();
      unsubscribeNotifications();
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
      
      clearInterval(syncInterval);
    };
  }

  return () => {};
}