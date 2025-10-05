/**
 * Real-time Feed Hook V2
 * Uses the new feed listener infrastructure with CQRS pattern
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { feedListener, FeedUpdate, FeedListenerOptions } from '@hive/core';
import { GetFeedQuery, GetFeedQueryHandler } from '@hive/core';
import { FirebaseUnitOfWork } from '@hive/core';
import { useAuth } from '@hive/auth-logic';
import { useToast } from './use-toast';

interface UseRealtimeFeedOptions {
  filter?: 'all' | 'my_spaces' | 'trending' | 'events' | 'rituals';
  spaceId?: string;
  limitCount?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseRealtimeFeedReturn {
  feed: FeedUpdate[];
  loading: boolean;
  error: any | null;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isRealtime: boolean;
}

export function useRealtimeFeed(options: UseRealtimeFeedOptions = {}): UseRealtimeFeedReturn {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feed, setFeed] = useState<FeedUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isRealtime, setIsRealtime] = useState(false);
  const [offset, setOffset] = useState(0);

  const listenerIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  // Get campus ID from user profile or default to UB
  const campusId = user?.campusId || 'ub-buffalo';
  const userId = user?.id;

  // Initial load using CQRS query
  const loadInitialFeed = useCallback(async () => {
    if (!userId || !campusId) return;

    setLoading(true);
    setError(null);

    try {
      // Use CQRS to get initial feed
      const query = new GetFeedQuery(
        options.filter || 'all',
        options.limitCount || 50,
        0,
        userId,
        campusId
      );

      const unitOfWork = new FirebaseUnitOfWork();
      const queryHandler = new GetFeedQueryHandler(
        unitOfWork.feeds,
        unitOfWork.spaces,
        unitOfWork.profiles
      );

      const result = await queryHandler.execute(query);

      if (result.isFailure) {
        throw new Error(result.error);
      }

      const feedData = result.getValue();

      if (mountedRef.current) {
        // Convert CQRS result to FeedUpdate format
        const feedUpdates: FeedUpdate[] = feedData.items.map(item => ({
          id: item.id,
          type: item.type,
          content: {
            text: item.content.text,
            mediaUrls: item.content.mediaUrls,
            authorId: item.content.author.id,
            authorName: item.content.author.name,
            authorHandle: item.content.author.handle,
            authorAvatar: item.content.author.avatar
          },
          spaceId: item.source.type === 'space' ? item.source.id : undefined,
          spaceName: item.source.name,
          engagement: item.engagement,
          isPromoted: item.isPromoted,
          createdAt: item.createdAt,
          relevanceScore: item.relevanceScore
        }));

        setFeed(feedUpdates);
        setHasMore(feedData.hasMore);
        setOffset(feedData.nextOffset);
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
      if (mountedRef.current) {
        setError(err as Error);
        toast({
          title: "Failed to load feed",
          description: "Please try again later",
          variant: "destructive"
        });
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [userId, campusId, options.filter, options.limitCount, toast]);

  // Set up real-time listener
  const setupRealtimeListener = useCallback(() => {
    if (!userId || !campusId) return;

    // Clean up existing listener
    if (listenerIdRef.current) {
      feedListener.unsubscribe(listenerIdRef.current);
    }

    const listenerOptions: FeedListenerOptions = {
      campusId,
      userId,
      filter: options.filter,
      limitCount: options.limitCount,
      onUpdate: (updates) => {
        if (mountedRef.current) {
          // Merge real-time updates with existing feed
          setFeed(prevFeed => {
            const merged = [...updates];

            // Add existing items that aren't in updates
            prevFeed.forEach(item => {
              if (!updates.find(u => u.id === item.id)) {
                merged.push(item);
              }
            });

            // Sort by creation date
            merged.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            return merged.slice(0, options.limitCount || 50);
          });

          setIsRealtime(true);

          // Show toast for new items if not initial load
          if (updates.length > 0 && !loading) {
            toast({
              title: "New posts available",
              description: `${updates.length} new ${updates.length === 1 ? 'post' : 'posts'}`,
              duration: 3000
            });
          }
        }
      },
      onError: (err) => {
        console.error('Real-time feed error:', err);
        setIsRealtime(false);
        if (mountedRef.current) {
          toast({
            title: "Real-time updates paused",
            description: "Connection issue detected",
            variant: "destructive"
          });
        }
      }
    };

    // Choose appropriate listener based on context
    let listenerId: string;

    if (options.spaceId) {
      listenerId = feedListener.subscribeToSpace(options.spaceId, listenerOptions);
    } else if (options.filter === 'trending') {
      listenerId = feedListener.subscribeToPromoted(campusId, listenerOptions);
    } else {
      listenerId = feedListener.subscribeToUserFeed(userId, campusId, listenerOptions);
    }

    listenerIdRef.current = listenerId;
  }, [userId, campusId, options.filter, options.spaceId, options.limitCount, loading, toast]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !userId || !campusId) return;

    setLoading(true);

    try {
      const query = new GetFeedQuery(
        options.filter || 'all',
        options.limitCount || 50,
        offset,
        userId,
        campusId
      );

      const unitOfWork = new FirebaseUnitOfWork();
      const queryHandler = new GetFeedQueryHandler(
        unitOfWork.feeds,
        unitOfWork.spaces,
        unitOfWork.profiles
      );

      const result = await queryHandler.execute(query);

      if (result.isSuccess) {
        const feedData = result.getValue();
        const newItems: FeedUpdate[] = feedData.items.map(item => ({
          id: item.id,
          type: item.type,
          content: {
            text: item.content.text,
            mediaUrls: item.content.mediaUrls,
            authorId: item.content.author.id,
            authorName: item.content.author.name,
            authorHandle: item.content.author.handle,
            authorAvatar: item.content.author.avatar
          },
          spaceId: item.source.type === 'space' ? item.source.id : undefined,
          spaceName: item.source.name,
          engagement: item.engagement,
          isPromoted: item.isPromoted,
          createdAt: item.createdAt,
          relevanceScore: item.relevanceScore
        }));

        setFeed(prev => [...prev, ...newItems]);
        setHasMore(feedData.hasMore);
        setOffset(feedData.nextOffset);
      }
    } catch (err) {
      console.error('Failed to load more:', err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, offset, userId, campusId, options.filter, options.limitCount]);

  // Refresh feed
  const refresh = useCallback(async () => {
    setOffset(0);
    setHasMore(true);
    await loadInitialFeed();
  }, [loadInitialFeed]);

  // Effect: Initial load and setup
  useEffect(() => {
    mountedRef.current = true;

    if (userId && campusId) {
      loadInitialFeed().then(() => {
        // Set up real-time listener after initial load
        setupRealtimeListener();
      });
    }

    return () => {
      mountedRef.current = false;
      if (listenerIdRef.current) {
        feedListener.unsubscribe(listenerIdRef.current);
      }
    };
  }, [userId, campusId, options.filter, options.spaceId]);

  // Effect: Auto-refresh
  useEffect(() => {
    if (!options.autoRefresh || !options.refreshInterval) return;

    const interval = setInterval(() => {
      if (!loading && mountedRef.current) {
        refresh();
      }
    }, options.refreshInterval);

    return () => clearInterval(interval);
  }, [options.autoRefresh, options.refreshInterval, refresh, loading]);

  return {
    feed,
    loading,
    error,
    refresh,
    loadMore,
    hasMore,
    isRealtime
  };
}