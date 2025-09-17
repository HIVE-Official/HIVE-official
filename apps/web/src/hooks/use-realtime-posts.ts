"use client";

import { useEffect, useState, useCallback } from 'react';
import { logger } from '@/lib/logger';

import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  where,
  Timestamp,
  DocumentData,
  QueryConstraint,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface RealtimePost {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  spaceId: string;
  type: 'general' | 'study_session' | 'food_run' | 'ride_share' | 'party' | 'emergency';
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: number;
  isLiked?: boolean;
  tags?: string[];
  location?: string;
  metadata?: Record<string, any>;
}

interface UseRealtimePostsOptions {
  spaceId?: string;
  userId?: string;
  limit?: number;
  type?: RealtimePost['type'];
  enabled?: boolean;
}

interface UseRealtimePostsReturn {
  posts: RealtimePost[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  subscribed: boolean;
}

export function useRealtimePosts({
  spaceId,
  userId,
  limit: queryLimit = 20,
  type,
  enabled = true
}: UseRealtimePostsOptions = {}): UseRealtimePostsReturn {
  const [posts, setPosts] = useState<RealtimePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

  // Convert Firestore document to RealtimePost
  const docToPost = (doc: DocumentData): RealtimePost => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content || '',
      authorId: data.authorId || '',
      authorName: data.authorName || 'Anonymous',
      authorAvatar: data.authorAvatar,
      spaceId: data.spaceId || '',
      type: data.type || 'general',
      images: data.images || [],
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      likes: data.likes || 0,
      comments: data.comments || 0,
      isLiked: data.likedBy?.includes(userId) || false,
      tags: data.tags || [],
      location: data.location,
      metadata: data.metadata || {}
    };
  };

  // Subscribe to real-time updates
  const subscribe = useCallback(() => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      // Build query constraints
      const constraints: QueryConstraint[] = [
        orderBy('createdAt', 'desc'),
        limit(queryLimit)
      ];

      if (spaceId) {
        constraints.unshift(where('spaceId', '==', spaceId));
      }

      if (type) {
        constraints.unshift(where('type', '==', type));
      }

      // Create query
      const q = query(collection(db, 'posts'), ...constraints);

      // Subscribe to real-time updates
      const unsub = onSnapshot(
        q,
        (snapshot: any) => {
          const newPosts: RealtimePost[] = [];
          
          snapshot.forEach((doc) => {
            newPosts.push(docToPost(doc));
          });

          setPosts(newPosts);
          setHasMore(newPosts.length === queryLimit);
          setLoading(false);
          setSubscribed(true);

          // Log for debugging
        },
        (err: any) => {
          logger.error('[Realtime] Error subscribing to posts:', { error: String(err) });
          setError(err as Error);
          setLoading(false);
          setSubscribed(false);
        }
      );

      setUnsubscribe(() => unsub);
    } catch (err) {
      logger.error('[Realtime] Error setting up subscription:', { error: String(err) });
      setError(err as Error);
      setLoading(false);
    }
  }, [enabled, spaceId, userId, queryLimit, type]);

  // Unsubscribe from real-time updates
  const cleanup = useCallback(() => {
    if (unsubscribe) {
      unsubscribe();
      setUnsubscribe(null);
      setSubscribed(false);
    }
  }, [unsubscribe]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (!enabled || !postId) return;

    const q = query(
      collection(db, `posts/${postId}/comments`),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const newComments: any[] = [];
        snapshot.forEach((doc) => {
          newComments.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          });
        });
        setComments(newComments);
        setLoading(false);
      },
      (err: any) => {
        logger.error('[Realtime] Error subscribing to comments:', { error: String(err) });
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId, enabled]);

  return { comments, loading, error };
}

// Hook for real-time space members
export function useRealtimeMembers(spaceId: string, enabled = true) {
  const [members, setMembers] = useState<any[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled || !spaceId) return;

    const q = query(
      collection(db, `spaces/${spaceId}/members`),
      orderBy('joinedAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const newMembers: any[] = [];
        let online = 0;

        snapshot.forEach((doc) => {
          const member = {
            id: doc.id,
            ...doc.data()
          };
          newMembers.push(member);
          
          // Check if online (active in last 5 minutes)
          const lastActive = member.lastActive?.toDate();
          if (lastActive && Date.now() - lastActive.getTime() < 5 * 60 * 1000) {
            online++;
          }
        });

        setMembers(newMembers);
        setOnlineCount(online);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [spaceId, enabled]);

  return { members, onlineCount, loading };
}

// Hook for real-time notifications
export function useRealtimeNotifications(userId: string, enabled = true) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!enabled || !userId) return;

    const q = query(
      collection(db, `users/${userId}/notifications`),
      where('read', '==', false),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const newNotifications: any[] = [];
        
        snapshot.forEach((doc) => {
          newNotifications.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          });
        });

        setNotifications(newNotifications);
        setUnreadCount(newNotifications.length);
      }
    );

    return () => unsubscribe();
  }, [userId, enabled]);

  return { notifications, unreadCount };
}