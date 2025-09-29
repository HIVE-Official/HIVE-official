"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@hive/auth-logic';

export interface Post {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'event' | 'tool' | 'announcement';
  authorId: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    isVerified?: boolean;
    badges?: string[];
  };
  createdAt: string;
  updatedAt?: string;
  visibility: 'public' | 'space' | 'private';
  spaceId?: string;
  spaceName?: string;
  attachments?: any[];
  mentions?: string[];
  tags?: string[];
  poll?: any;
  event?: any;
  location?: any;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  reactions?: any;
  comments?: any[];
  isPinned?: boolean;
  isEdited?: boolean;
}

export interface FeedState {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface FeedOptions {
  spaceId?: string;
  userId?: string;
  limit?: number;
  sortBy?: 'recent' | 'popular' | 'trending';
  types?: string[];
  enableRealtime?: boolean; // Use Firebase real-time listeners instead of polling
}

export interface PostInteraction {
  postId: string;
  action: 'like' | 'unlike' | 'comment' | 'share' | 'bookmark' | 'unbookmark';
  content?: string;
  metadata?: Record<string, any>;
}

export function useFeed(options: FeedOptions = {}) {
  // Always call hooks at the top level
  const { user } = useAuth();
  const getAuthToken = user?.getIdToken;
  const [feedState, setFeedState] = useState<FeedState>({
    posts: [],
    isLoading: true,
    isLoadingMore: false,
    hasMore: true,
    error: null,
    lastUpdated: null,
  });

  // Load feed posts
  const loadPosts = useCallback(async (reset = false) => {
    if (!user) return;

    const isInitialLoad = reset || feedState.posts.length === 0;
    setFeedState(prev => ({
      ...prev,
      isLoading: isInitialLoad,
      isLoadingMore: !isInitialLoad,
      error: null,
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

      // Safely handle the posts array
      const posts = Array.isArray(data.posts) ? data.posts : [];

      // Transform the posts to match our interface
      const transformedPosts: Post[] = posts.map((post: any) => ({
        ...post,
        engagement: {
          likes: post.engagement?.likes || 0,
          comments: post.engagement?.comments || 0,
          shares: post.engagement?.shares || 0,
          views: post.engagement?.views || 0,
          hasLiked: post.userInteractions?.hasLiked || false,
          hasBookmarked: post.userInteractions?.hasBookmarked || false,
        },
      }));

      setFeedState(prev => ({
        ...prev,
        posts: reset ? transformedPosts : [...prev.posts, ...transformedPosts],
        isLoading: false,
        isLoadingMore: false,
        hasMore: transformedPosts.length === (options.limit || 20),
        lastUpdated: new Date(),
      }));
    } catch (error) {
      console.error('Feed load error:', error);
      setFeedState(prev => ({
        ...prev,
        isLoading: false,
        isLoadingMore: false,
        error: error instanceof Error ? error.message : 'Failed to load feed',
      }));
    }
  }, [user, getAuthToken, options.limit, options.spaceId, options.userId, options.sortBy, options.types]);

  // Create a new post
  const createPost = useCallback(async (postData: {
    content: string;
    type: string;
    visibility: string;
    spaceId?: string;
    attachments?: any[];
    tags?: string[];
    mentions?: string[];
    poll?: any;
    event?: any;
    location?: any;
  }) => {
    if (!user) throw new Error('Authentication required');

    const response = await fetch('/api/social/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken ? await getAuthToken() : ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Post creation failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create post');
    }

    // Add the new post to the beginning of the feed
    const newPost: Post = {
      ...data.post,
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        hasLiked: false,
        hasBookmarked: false,
      },
    };

    setFeedState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts],
      lastUpdated: new Date(),
    }));

    return data.post;
  }, [user]);

  // Handle post interactions
  const interactWithPost = useCallback(async (interaction: PostInteraction) => {
    if (!user) throw new Error('Authentication required');

    // Optimistically update the UI
    setFeedState(prev => ({
      ...prev,
      posts: prev.posts.map(post => {
        if (post.id !== interaction.postId) return post;

        const newEngagement = { ...post.engagement };
        
        switch (interaction.action) {
          case 'like':
            newEngagement.likes += 1;
            newEngagement.hasLiked = true;
            break;
          case 'unlike':
            newEngagement.likes = Math.max(0, newEngagement.likes - 1);
            newEngagement.hasLiked = false;
            break;
          case 'bookmark':
            newEngagement.hasBookmarked = true;
            break;
          case 'unbookmark':
            newEngagement.hasBookmarked = false;
            break;
          case 'comment':
            newEngagement.comments += 1;
            break;
          case 'share':
            newEngagement.shares += 1;
            break;
        }

        return {
          ...post,
          engagement: newEngagement,
        };
      }),
    }));

    try {
      const response = await fetch('/api/social/interactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken ? await getAuthToken() : ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interaction),
      });

      if (!response.ok) {
        throw new Error(`Interaction failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process interaction');
      }

      // Update with real engagement data from server
      setFeedState(prev => ({
        ...prev,
        posts: prev.posts.map(post => {
          if (post.id !== interaction.postId) return post;
          
          return {
            ...post,
            engagement: {
              likes: data.engagement?.likes || post.engagement.likes,
              comments: data.engagement?.comments || post.engagement.comments,
              shares: data.engagement?.shares || post.engagement.shares,
              views: data.engagement?.views || post.engagement.views,
              hasLiked: data.reactions?.heart > 0 || false,
              hasBookmarked: data.reactions?.bookmarks > 0 || false,
            },
            reactions: data.reactions,
          };
        }),
      }));

    } catch (error) {
      console.error('Interaction error:', error);
      // Revert optimistic update on error
      loadPosts(true);
      throw error;
    }
  }, [user, loadPosts]);

  // Convenient interaction methods
  const likePost = useCallback(async (postId: string) => {
    const post = feedState.posts.find(p => p.id === postId);
    if (!post) return;
    
    await interactWithPost({
      postId,
      action: post.engagement.hasLiked ? 'unlike' : 'like',
    });
  }, [feedState.posts, interactWithPost]);

  const bookmarkPost = useCallback(async (postId: string) => {
    const post = feedState.posts.find(p => p.id === postId);
    if (!post) return;
    
    await interactWithPost({
      postId,
      action: post.engagement.hasBookmarked ? 'unbookmark' : 'bookmark',
    });
  }, [feedState.posts, interactWithPost]);

  const sharePost = useCallback(async (postId: string) => {
    await interactWithPost({
      postId,
      action: 'share',
    });
  }, [interactWithPost]);

  const commentOnPost = useCallback(async (postId: string, content: string) => {
    await interactWithPost({
      postId,
      action: 'comment',
      content,
    });
  }, [interactWithPost]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (!feedState.isLoadingMore && feedState.hasMore) {
      loadPosts(false);
    }
  }, [feedState.isLoadingMore, feedState.hasMore, loadPosts]);

  // Refresh feed
  const refresh = useCallback(() => {
    loadPosts(true);
  }, [loadPosts]);

  // Stabilize options object to prevent unnecessary re-renders
  const stableOptions = useCallback(() => options, [
    options.limit,
    options.spaceId,
    options.userId,
    options.sortBy,
    options.types?.join(',')
  ]);

  // Initial load
  useEffect(() => {
    if (user) {
      loadPosts(true);
    }
  }, [user, loadPosts, stableOptions]);

  // Try to use real-time feed if enabled
  let realtimeFeedResult: any = null;
  try {
    if (options.enableRealtime) {
      const { useRealtimeFeed } = require('./use-realtime-feed');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      realtimeFeedResult = useRealtimeFeed(options);
    }
  } catch (e) {
    // Real-time feed not available
  }

  // If real-time is enabled and available, return the real-time feed
  if (options.enableRealtime && realtimeFeedResult) {
    return realtimeFeedResult;
  }

  return {
    // State
    posts: feedState.posts,
    isLoading: feedState.isLoading,
    isLoadingMore: feedState.isLoadingMore,
    hasMore: feedState.hasMore,
    error: feedState.error,
    lastUpdated: feedState.lastUpdated,

    // Actions
    createPost,
    likePost,
    bookmarkPost,
    sharePost,
    commentOnPost,
    loadMore,
    refresh,

    // Raw interaction method
    interactWithPost,
  };
}
