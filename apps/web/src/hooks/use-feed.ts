'use client';

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

interface FeedPost {
  id: string;
  content: string;
  authorId: string;
  authorName?: string;
  spaceName?: string;
  spaceId?: string;
  type?: string;
  createdAt: Date;
  updatedAt?: Date;
  reactions?: {
    heart?: number;
    fire?: number;
    thumbsUp?: number;
  };
  commentCount?: number;
  isPinned?: boolean;
  images?: string[];
  _metadata?: {
    spaceId: string;
    spaceName: string;
    relevanceScore: number;
    contentType: string;
    validationConfidence: number;
  };
}

interface FeedResponse {
  success: boolean;
  posts: FeedPost[];
  nextCursor: string | null;
  feedType: 'personal' | 'campus' | 'trending';
  analytics?: {
    totalMemberships: number;
    rawFeedItems: number;
    validFeedItems: number;
    filterRate: number;
    averageRelevance: number;
    averageConfidence: number;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch feed');
  }
  
  return res.json();
};

export function useFeed(feedType: 'personal' | 'campus' | 'trending' = 'personal') {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Initial feed load
  const { data, error, isLoading, mutate } = useSWR<FeedResponse>(
    `/api/feed?feedType=${feedType}&limit=20`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  // Update posts when data changes
  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    }
  }, [data]);

  // Load more posts
  const loadMore = useCallback(async () => {
    if (!cursor || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const response = await fetch(
        `/api/feed?feedType=${feedType}&limit=20&cursor=${cursor}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const moreData: FeedResponse = await response.json();
        setPosts(prev => [...prev, ...moreData.posts]);
        setCursor(moreData.nextCursor);
        setHasMore(!!moreData.nextCursor);
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [cursor, isLoadingMore, hasMore, feedType]);

  // Refresh feed
  const refresh = useCallback(() => {
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    mutate();
  }, [mutate]);

  // Create a new post (optimistic update)
  const createPost = useCallback(async (spaceId: string, content: string) => {
    // Optimistic update
    const optimisticPost: FeedPost = {
      id: `temp-${Date.now()}`,
      content,
      authorId: 'current-user',
      authorName: 'You',
      spaceId,
      spaceName: 'Your Space',
      type: 'discussion',
      createdAt: new Date(),
      reactions: { heart: 0 },
      commentCount: 0,
    };

    setPosts(prev => [optimisticPost, ...prev]);

    try {
      const response = await fetch(`/api/spaces/${spaceId}/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        // Refresh to get real data
        refresh();
      } else {
        // Remove optimistic post on failure
        setPosts(prev => prev.filter(p => p.id !== optimisticPost.id));
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      setPosts(prev => prev.filter(p => p.id !== optimisticPost.id));
    }
  }, [refresh]);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    isLoadingMore,
    loadMore,
    refresh,
    createPost,
    analytics: data?.analytics,
    feedType: data?.feedType || feedType,
  };
}

// Hook for coordination-specific posts (study sessions, food runs, etc)
export function useCoordinationFeed() {
  const { posts, ...rest } = useFeed('personal');
  
  // Filter for coordination posts
  const coordinationPosts = posts.filter(post => 
    post.type === 'coordination' || 
    post.content?.toLowerCase().includes('study') ||
    post.content?.toLowerCase().includes('food') ||
    post.content?.toLowerCase().includes('ride') ||
    post.content?.toLowerCase().includes('carpool')
  );

  return {
    posts: coordinationPosts,
    ...rest
  };
}

// Hook for trending posts
export function useTrendingFeed() {
  return useFeed('trending');
}

// Hook for campus-wide feed
export function useCampusFeed() {
  return useFeed('campus');
}