"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { logger } from '@hive/core/utils/logger';

import { useUnifiedAuth } from '@hive/ui';
import { feedService, FeedPost, FeedQueryOptions } from '@/lib/firebase/feed-service';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export interface UseFirebaseFeedOptions extends FeedQueryOptions {
  realtime?: boolean;
  autoLoad?: boolean;
}

export interface FirebaseFeedState {
  posts: FeedPost[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useFirebaseFeed(options: UseFirebaseFeedOptions = {}) {
  const { user } = useUnifiedAuth();
  const [state, setState] = useState<FirebaseFeedState>({
    posts: [],
    isLoading: true,
    isLoadingMore: false,
    hasMore: true,
    error: null,
    lastUpdated: null
  });

  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Load posts from Firestore
  const loadPosts = useCallback(async (reset = false) => {
    if (!user?.id) return;

    setState(prev => ({
      ...prev,
      isLoading: reset || prev.posts.length === 0,
      isLoadingMore: !reset && prev.posts.length > 0,
      error: null
    }));

    try {
      const queryOptions: FeedQueryOptions = {
        ...options,
        startAfterDoc: reset ? undefined : lastDocRef.current || undefined
      };

      const { posts, lastDoc } = await feedService.getFeedPosts(
        user.id,
        queryOptions
      );

      lastDocRef.current = lastDoc;

      setState(prev => ({
        ...prev,
        posts: reset ? posts : [...prev.posts, ...posts],
        isLoading: false,
        isLoadingMore: false,
        hasMore: posts.length === (options.pageSize || 20),
        lastUpdated: new Date()
      }));
    } catch (error) {
      logger.error('Error loading posts:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isLoadingMore: false,
        error: error instanceof Error ? error.message : 'Failed to load posts'
      }));
    }
  }, [user?.id, options]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user?.id || !options.realtime) return;

    // Clean up previous subscription
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    // Subscribe to real-time updates
    unsubscribeRef.current = feedService.subscribeFeedUpdates(
      user.id,
      options,
      (posts: any) => {
        setState(prev => ({
          ...prev,
          posts: posts,
          lastUpdated: new Date()
        }));
      }
    );

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user?.id, options.realtime, options.spaceId]);

  // Initial load
  useEffect(() => {
    if (user?.id && options.autoLoad !== false) {
      loadPosts(true);
    }
  }, [user?.id, options.feedType, options.spaceId]);

  // Create a new post
  const createPost = useCallback(async (postData: Partial<FeedPost>) => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      const postId = await feedService.createPost(user.id, {
        ...postData,
        authorName: user.fullName || 'Anonymous',
        authorHandle: user.handle || user.email?.split('@')[0] || 'user',
        authorAvatar: user.avatarUrl || undefined
      });

      // Reload feed to include new post
      await loadPosts(true);
      return postId;
    } catch (error) {
      logger.error('Error creating post:', error);
      throw error;
    }
  }, [user, loadPosts]);

  // Like/unlike a post
  const toggleLike = useCallback(async (postId: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      await feedService.toggleLike(postId, user.id);
      
      // Optimistically update UI
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => {
          if (post.id !== postId) return post;
          
          const likedBy = post.engagement.likedBy || [];
          const isLiked = likedBy.includes(user.id);
          
          return {
            ...post,
            engagement: {
              ...post.engagement,
              likes: isLiked 
                ? Math.max(0, post.engagement.likes - 1)
                : post.engagement.likes + 1,
              likedBy: isLiked
                ? likedBy.filter(id => id !== user.id)
                : [...likedBy, user.id]
            }
          };
        })
      }));
    } catch (error) {
      logger.error('Error toggling like:', error);
      // Reload on error to sync state
      await loadPosts(true);
      throw error;
    }
  }, [user?.id, loadPosts]);

  // Bookmark/unbookmark a post
  const toggleBookmark = useCallback(async (postId: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      await feedService.toggleBookmark(postId, user.id);
      
      // Optimistically update UI
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => {
          if (post.id !== postId) return post;
          
          const bookmarkedBy = post.engagement.bookmarkedBy || [];
          const isBookmarked = bookmarkedBy.includes(user.id);
          
          return {
            ...post,
            engagement: {
              ...post.engagement,
              bookmarkedBy: isBookmarked
                ? bookmarkedBy.filter(id => id !== user.id)
                : [...bookmarkedBy, user.id]
            }
          };
        })
      }));
    } catch (error) {
      logger.error('Error toggling bookmark:', error);
      throw error;
    }
  }, [user?.id]);

  // Add a comment
  const addComment = useCallback(async (postId: string, content: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      await feedService.addComment(postId, user.id, content);
      
      // Optimistically update comment count
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => {
          if (post.id !== postId) return post;
          
          return {
            ...post,
            engagement: {
              ...post.engagement,
              comments: post.engagement.comments + 1
            }
          };
        })
      }));
    } catch (error) {
      logger.error('Error adding comment:', error);
      throw error;
    }
  }, [user?.id]);

  // Share a post
  const sharePost = useCallback(async (postId: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      await feedService.sharePost(postId, user.id);
      
      // Optimistically update share count
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(post => {
          if (post.id !== postId) return post;
          
          return {
            ...post,
            engagement: {
              ...post.engagement,
              shares: post.engagement.shares + 1
            }
          };
        })
      }));

      // Copy link to clipboard
      const shareUrl = `${window.location.origin}/feed/post/${postId}`;
      await navigator.clipboard?.writeText(shareUrl);
    } catch (error) {
      logger.error('Error sharing post:', error);
      throw error;
    }
  }, [user?.id]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (!state.isLoadingMore && state.hasMore) {
      loadPosts(false);
    }
  }, [state.isLoadingMore, state.hasMore, loadPosts]);

  // Refresh feed
  const refresh = useCallback(() => {
    lastDocRef.current = null;
    loadPosts(true);
  }, [loadPosts]);

  // Check if user has liked a post
  const hasLiked = useCallback((postId: string): boolean => {
    if (!user?.id) return false;
    const post = state.posts.find(p => p.id === postId);
    return post?.engagement.likedBy?.includes(user.id) || false;
  }, [user?.id, state.posts]);

  // Check if user has bookmarked a post
  const hasBookmarked = useCallback((postId: string): boolean => {
    if (!user?.id) return false;
    const post = state.posts.find(p => p.id === postId);
    return post?.engagement.bookmarkedBy?.includes(user.id) || false;
  }, [user?.id, state.posts]);

  return {
    // State
    posts: state.posts,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    hasMore: state.hasMore,
    error: state.error,
    lastUpdated: state.lastUpdated,
    
    // Actions
    createPost,
    toggleLike,
    toggleBookmark,
    addComment,
    sharePost,
    loadMore,
    refresh,
    
    // Utilities
    hasLiked,
    hasBookmarked
  };
}