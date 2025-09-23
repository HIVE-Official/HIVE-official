import { useEffect, useState, useCallback } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { api } from '@/lib/api-client';
import type { User } from '@hive/core';

interface Post {
  id: string;
  content: string;
  authorId: string;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  author?: User;
  reactions?: {
    [key: string]: string[];
  };
  replyCount?: number;
}

interface UseRealtimePostsOptions {
  spaceId: string;
  enabled?: boolean;
  limitCount?: number;
}

export function useRealtimePosts({ spaceId, enabled = true, limitCount = 50 }: UseRealtimePostsOptions) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial posts with auth (for member validation)
  const fetchInitialPosts = useCallback(async () => {
    if (!spaceId || !enabled) return;

    try {
      const response = await api.spaces.posts.list(spaceId);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();

      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [spaceId, enabled]);

  // Set up real-time listener for updates
  useEffect(() => {
    if (!spaceId || !enabled) {
      setLoading(false);
      return;
    }

    // Fetch initial posts first
    fetchInitialPosts();

    // Then set up real-time listener for new posts
    const postsRef = collection(db, 'spaces', spaceId, 'posts');
    const q = query(
      postsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        // Process changes (new posts, updates, deletions)
        const changes = snapshot.docChanges();

        if (changes.length === 0) return;

        // Get author data for new posts
        const newPosts: Post[] = [];

        for (const change of changes) {
          if (change.type === 'added' || change.type === 'modified') {
            const postData = change.doc.data();

            // Skip if we already have this post (from initial fetch)
            const existingPost = posts.find(p => p.id === change.doc.id);
            if (existingPost && change.type === 'added') continue;

            // Fetch author data if not present
            let author = null;
            if (postData.authorId) {
              try {
                const authorResponse = await fetch(`/api/users/${postData.authorId}`);
                if (authorResponse.ok) {
                  const authorData = await authorResponse.json();
                  author = authorData.data;
                }
              } catch (err) {
                console.error('Failed to fetch author:', err);
              }
            }

            const post: Post = {
              id: change.doc.id,
              content: postData.content || '',
              authorId: postData.authorId || '',
              spaceId: postData.spaceId || spaceId,
              createdAt: postData.createdAt?.toDate() || new Date(),
              updatedAt: postData.updatedAt?.toDate() || new Date(),
              isPinned: postData.isPinned || false,
              author,
              reactions: postData.reactions || {},
              replyCount: postData.replyCount || 0
            };

            newPosts.push(post);
          }
        }

        // Update state with new posts
        if (newPosts.length > 0) {
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];

            // Add or update posts
            newPosts.forEach((newPost) => {
              const index = updatedPosts.findIndex(p => p.id === newPost.id);
              if (index >= 0) {
                updatedPosts[index] = newPost;
              } else {
                updatedPosts.unshift(newPost);
              }
            });

            // Sort by creation date
            updatedPosts.sort((a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            // Keep only the limit
            return updatedPosts.slice(0, limitCount);
          });
        }

        // Handle deletions
        const deletedIds = changes
          .filter(change => change.type === 'removed')
          .map(change => change.doc.id);

        if (deletedIds.length > 0) {
          setPosts(prev => prev.filter(post => !deletedIds.includes(post.id)));
        }
      },
      (error) => {
        console.error('Firestore listener error:', error);
        setError(error as Error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [spaceId, enabled, limitCount, fetchInitialPosts]);

  // Create a new post
  const createPost = useCallback(async (content: string, parentId?: string) => {
    if (!spaceId) return null;

    try {
      const response = await api.spaces.posts.create(spaceId, content, parentId);

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      return data.post;
    } catch (err) {
      console.error('Failed to create post:', err);
      throw err;
    }
  }, [spaceId]);

  // React to a post
  const reactToPost = useCallback(async (postId: string, emoji: string) => {
    if (!spaceId) return;

    try {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji })
      });

      if (!response.ok) {
        throw new Error('Failed to react to post');
      }
    } catch (err) {
      console.error('Failed to react to post:', err);
      throw err;
    }
  }, [spaceId]);

  return {
    posts,
    loading,
    error,
    createPost,
    reactToPost,
    refetch: fetchInitialPosts
  };
}