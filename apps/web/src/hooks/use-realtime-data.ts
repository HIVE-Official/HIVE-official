import { useEffect, useState, useCallback } from 'react';
import { realtimeManager } from '@/lib/realtime-listeners';
import { DocumentData } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { logger } from '@/lib/structured-logger';

/**
 * Hook for real-time space posts
 */
export function useRealtimeSpacePosts(spaceId: string | null) {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spaceId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToSpacePosts(
      spaceId,
      (updatedPosts) => {
        setPosts(updatedPosts);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [spaceId]);

  return { posts, loading, error };
}

/**
 * Hook for real-time space members
 */
export function useRealtimeSpaceMembers(spaceId: string | null) {
  const [members, setMembers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spaceId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToSpaceMembers(
      spaceId,
      (updatedMembers) => {
        setMembers(updatedMembers);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [spaceId]);

  return { members, loading, error };
}

/**
 * Hook for real-time space events
 */
export function useRealtimeSpaceEvents(spaceId: string | null) {
  const [events, setEvents] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spaceId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToSpaceEvents(
      spaceId,
      (updatedEvents) => {
        setEvents(updatedEvents);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [spaceId]);

  return { events, loading, error };
}

/**
 * Hook for real-time user notifications
 */
export function useRealtimeNotifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<DocumentData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToUserNotifications(
      session.user.id,
      (updatedNotifications) => {
        setNotifications(updatedNotifications);
        setUnreadCount(updatedNotifications.filter(n => !n.read).length);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [session?.user?.id]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      // Update local state optimistically
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      logger.error('Failed to mark notification as read', { notificationId, error: err });
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
      
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      logger.error('Failed to mark all notifications as read', { error: err });
    }
  }, []);

  return { 
    notifications, 
    unreadCount, 
    loading, 
    error,
    markAsRead,
    markAllAsRead
  };
}

/**
 * Hook for real-time user feed
 */
export function useRealtimeFeed() {
  const { data: session } = useSession();
  const [feedItems, setFeedItems] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setFeedItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToUserFeed(
      session.user.id,
      (updatedFeed) => {
        setFeedItems(updatedFeed);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [session?.user?.id]);

  return { feedItems, loading, error };
}

/**
 * Hook for real-time post comments
 */
export function useRealtimePostComments(spaceId: string | null, postId: string | null) {
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spaceId || !postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToPostComments(
      spaceId,
      postId,
      (updatedComments) => {
        setComments(updatedComments);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [spaceId, postId]);

  return { comments, loading, error };
}

/**
 * Hook for real-time rituals
 */
export function useRealtimeRituals(spaceIds: string[]) {
  const [rituals, setRituals] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!spaceIds || spaceIds.length === 0) {
      setRituals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToRituals(
      spaceIds,
      (updatedRituals) => {
        setRituals(updatedRituals);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [JSON.stringify(spaceIds)]); // Use stringified array as dependency

  return { rituals, loading, error };
}

/**
 * Hook for real-time document
 */
export function useRealtimeDocument(path: string[] | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path || path.length === 0) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const listenerId = realtimeManager.subscribeToDocument(
      path,
      (docData) => {
        setData(docData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      realtimeManager.unsubscribe(listenerId);
    };
  }, [JSON.stringify(path)]); // Use stringified path as dependency

  return { data, loading, error };
}