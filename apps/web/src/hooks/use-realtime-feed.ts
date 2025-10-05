"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@hive/auth-logic';
import { getRealtimeFeedManager, RealtimeFeedItem, cleanupRealtimeFeedManager } from '@/lib/real-time-feed-listeners';

export interface FeedOptions {
  limit?: number;
  spaceId?: string;
  userId?: string;
  sortBy?: 'recent' | 'popular' | 'relevance';
  types?: string[];
  enableRealtime?: boolean; // New option to control real-time mode
}

export interface Post {
  id: string;
  type: string;
  title: string;
  content?: string;
  description?: string;
  authorId?: string;
  authorName?: string;
  createdAt: Date;
  updatedAt?: Date;
  spaceId?: string;
  reactions?: Record<string, number>;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  isImported?: boolean;
  source?: string;
  startTime?: Date;
  endTime?: Date;
  location?: string;
}

interface RealtimeFeedState {
  posts: Post[];
  realtimeItems: RealtimeFeedItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  lastUpdated: Date | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  liveUpdatesCount: number;
}

/**
 * Enhanced feed hook with real-time Firebase listeners
 * Combines traditional pagination with instant live updates
 */
export function useRealtimeFeed(options: FeedOptions = {}) {
  const { user, getAuthToken } = useAuth();
  const [feedState, setFeedState] = useState<RealtimeFeedState>({
    posts: [],
    realtimeItems: [],
    isLoading: false,
    isLoadingMore: false,
    error: null,
    hasMore: true,
    lastUpdated: null,
    connectionStatus: 'disconnected',
    liveUpdatesCount: 0
  });

  const feedManagerRef = useRef<ReturnType<typeof getRealtimeFeedManager> | null>(null);
  const userSpaceIdsRef = useRef<string[]>([]);
  const enableRealtime = options.enableRealtime !== false; // Default to true

  // Get user's space memberships for real-time listeners
  const fetchUserSpaces = useCallback(async (): Promise<string[]> => {
    if (!user || !getAuthToken) return [];

    try {
      const authToken = await getAuthToken();
      const response = await fetch('/api/user/spaces', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.spaces?.map((s: any) => s.id) || [];
    } catch (error) {
      return [];
    }
  }, [user, getAuthToken]);

  // Load initial feed data (traditional API call)
  const loadInitialFeed = useCallback(async (reset = false) => {
    if (!user) return;

    const isInitialLoad = reset || feedState.posts.length === 0;
    setFeedState(prev => ({
      ...prev,
      isLoading: isInitialLoad,
      isLoadingMore: !isInitialLoad,
      error: null,
      connectionStatus: 'connecting'
    }));

    try {
      const params = new URLSearchParams({
        limit: String(options.limit || 20),
        ...(options.spaceId && { spaceId: options.spaceId }),
        ...(options.userId && { userId: options.userId }),
        ...(options.sortBy && { sortBy: options.sortBy }),
        ...(options.types && { types: options.types.join(',') }),
        ...(!reset && { offset: String(feedState.posts.length) }),
      });

      const authToken = getAuthToken ? await getAuthToken() : '';
      const response = await fetch(`/api/feed?${params}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Feed load failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to load feed');
      }

      const posts = Array.isArray(data.posts) ? data.posts : [];

      // Transform posts to match interface
      const transformedPosts: Post[] = posts.map((post: any) => ({
        id: post.content?.id || post.id,
        type: post.content?.type || post.contentType || 'post',
        title: post.content?.title || 'Untitled',
        content: post.content?.content,
        description: post.content?.description,
        authorId: post.content?.authorId,
        authorName: post.content?.authorName,
        createdAt: new Date(post.content?.createdAt || post.timestamp),
        updatedAt: post.content?.updatedAt ? new Date(post.content.updatedAt) : undefined,
        spaceId: post.spaceId,
        reactions: post.content?.reactions || {},
        engagement: {
          likes: post.engagement?.likes || 0,
          comments: post.engagement?.comments || 0,
          shares: post.engagement?.shares || 0,
          views: post.engagement?.views || 0,
          hasLiked: post.userInteractions?.hasLiked || false,
          hasBookmarked: post.userInteractions?.hasBookmarked || false,
        },
        isImported: post.content?.isImported || false,
        source: post.content?.source || post.source,
        // Event-specific fields
        startTime: post.content?.startTime ? new Date(post.content.startTime) : undefined,
        endTime: post.content?.endTime ? new Date(post.content.endTime) : undefined,
        location: post.content?.location
      }));

      setFeedState(prev => ({
        ...prev,
        posts: reset ? transformedPosts : [...prev.posts, ...transformedPosts],
        isLoading: false,
        isLoadingMore: false,
        hasMore: transformedPosts.length === (options.limit || 20),
        lastUpdated: new Date(),
        connectionStatus: 'connected'
      }));

      // Start real-time listeners after initial load
      if (enableRealtime && !feedManagerRef.current) {
        await startRealtimeListeners();
      }

    } catch (error) {
      setFeedState(prev => ({
        ...prev,
        isLoading: false,
        isLoadingMore: false,
        error: error instanceof Error ? error.message : String(error),
        connectionStatus: 'disconnected'
      }));
    }
  }, [user, getAuthToken, options, feedState.posts.length, enableRealtime]);

  // Start real-time listeners
  const startRealtimeListeners = useCallback(async () => {
    if (!user || !enableRealtime) return;

    try {
      // Get user's spaces for targeted listening
      const spaceIds = await fetchUserSpaces();
      userSpaceIdsRef.current = spaceIds;

      // Initialize real-time manager
      feedManagerRef.current = getRealtimeFeedManager(user.id);

      // Real-time callback to handle new items
      const handleRealtimeUpdate = (items: RealtimeFeedItem[], updateType: 'added' | 'modified' | 'removed') => {
        if (updateType === 'added' && items.length > 0) {
          setFeedState(prev => ({
            ...prev,
            realtimeItems: [...items, ...prev.realtimeItems.slice(0, 19)], // Keep last 20
            liveUpdatesCount: prev.liveUpdatesCount + items.length,
            connectionStatus: 'connected',
            lastUpdated: new Date()
          }));

          // Show a subtle notification for new content
        }
      };

      // Start listening
      await feedManagerRef.current.startFeedListeners(spaceIds, handleRealtimeUpdate);

      setFeedState(prev => ({
        ...prev,
        connectionStatus: 'connected'
      }));

    } catch (error) {
      setFeedState(prev => ({
        ...prev,
        connectionStatus: 'disconnected'
      }));
    }
  }, [user, enableRealtime, fetchUserSpaces]);

  // Merge real-time items into main feed
  const mergeRealtimeItems = useCallback(() => {
    setFeedState(prev => {
      if (prev.realtimeItems.length === 0) return prev;

      // Convert real-time items to Post format
      const newPosts: Post[] = prev.realtimeItems.map(item => ({
        id: item.id,
        type: item.type,
        title: item.content.title,
        content: item.content.description,
        description: item.content.description,
        authorId: item.content.authorId,
        authorName: item.content.authorName,
        createdAt: item.content.createdAt,
        updatedAt: item.content.createdAt,
        spaceId: item.spaceId,
        reactions: item.content.reactions || {},
        engagement: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
          hasLiked: false,
          hasBookmarked: false,
        },
        isImported: item.content.isImported,
        source: item.content.source,
        // Event fields
        startTime: item.content.startTime,
        endTime: item.content.endTime,
        location: item.content.location
      }));

      // Deduplicate and sort by timestamp
      const allPosts = [...newPosts, ...prev.posts];
      const uniquePosts = allPosts.filter((post, index, self) =>
        index === self.findIndex(p => p.id === post.id)
      );

      uniquePosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return {
        ...prev,
        posts: uniquePosts,
        realtimeItems: [], // Clear merged items
        liveUpdatesCount: 0
      };
    });
  }, []);

  // Initialize feed on mount
  useEffect(() => {
    if (user) {
      loadInitialFeed(true);
    } else {
      setFeedState({
        posts: [],
        realtimeItems: [],
        isLoading: false,
        isLoadingMore: false,
        error: null,
        hasMore: true,
        lastUpdated: null,
        connectionStatus: 'disconnected',
        liveUpdatesCount: 0
      });
    }
  }, [user, loadInitialFeed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (feedManagerRef.current && user) {
        cleanupRealtimeFeedManager(user.id);
        feedManagerRef.current = null;
      }
    };
  }, [user]);

  // Load more posts (traditional pagination)
  const loadMore = useCallback(() => {
    if (!feedState.isLoadingMore && feedState.hasMore) {
      loadInitialFeed(false);
    }
  }, [loadInitialFeed, feedState.isLoadingMore, feedState.hasMore]);

  // Refresh feed
  const refresh = useCallback(() => {
    loadInitialFeed(true);
  }, [loadInitialFeed]);

  // Create a post
  const createPost = useCallback(async (postData: {
    content: string;
    spaceId?: string;
    type?: string;
  }) => {
    if (!user || !getAuthToken) return false;

    try {
      const authToken = await getAuthToken();
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // The real-time listener will automatically pick up the new post
      return true;
    } catch (error) {
      return false;
    }
  }, [user, getAuthToken]);

  return {
    // State
    posts: feedState.posts,
    realtimeItems: feedState.realtimeItems,
    isLoading: feedState.isLoading,
    isLoadingMore: feedState.isLoadingMore,
    error: feedState.error,
    hasMore: feedState.hasMore,
    lastUpdated: feedState.lastUpdated,

    // Real-time specific
    connectionStatus: feedState.connectionStatus,
    hasLiveUpdates: feedState.liveUpdatesCount > 0,
    liveUpdatesCount: feedState.liveUpdatesCount,
    isRealtime: enableRealtime && feedManagerRef.current !== null,

    // Actions
    loadMore,
    refresh,
    createPost,
    mergeRealtimeItems,

    // Computed
    allItems: [...feedState.realtimeItems, ...feedState.posts],
    isEmpty: feedState.posts.length === 0 && feedState.realtimeItems.length === 0,
    isConnected: feedState.connectionStatus === 'connected'
  };
}