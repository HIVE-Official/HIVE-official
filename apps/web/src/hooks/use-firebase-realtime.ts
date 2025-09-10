import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  doc,
  QueryConstraint,
  DocumentData,
  FirestoreError,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { logger } from '@/lib/logger';

interface UseFirebaseRealtimeOptions {
  enabled?: boolean;
  dependencies?: any[];
}

interface UseFirebaseRealtimeReturn<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFirebaseRealtime<T extends DocumentData>(
  collectionPath: string,
  constraints: QueryConstraint[] = [],
  options: UseFirebaseRealtimeOptions = {}
): UseFirebaseRealtimeReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { enabled = true, dependencies = [] } = options;

  const setupListener = useCallback(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionPath);
      const q = query(collectionRef, ...constraints);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: T[] = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              ...doc.data()
            } as T);
          });
          
          setData(items);
          setLoading(false);
          setError(null);
          
          logger.info(`Realtime update: ${collectionPath}`, { count: items.length });
        },
        (err: FirestoreError) => {
          logger.error(`Realtime error: ${collectionPath}`, { error: err });
          setError(new Error(err.message));
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err) {
      logger.error(`Setup error: ${collectionPath}`, { error: err });
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionPath, enabled, ...constraints, ...dependencies]);

  useEffect(() => {
    const unsubscribe = setupListener();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setupListener]);

  const refetch = useCallback(() => {
    setupListener();
  }, [setupListener]);

  return { data, loading, error, refetch };
}

// Specialized hooks for common collections

export function useRealtimePosts(spaceId: string, maxPosts: number = 20) {
  return useFirebaseRealtime<any>(
    `spaces/${spaceId}/posts`,
    [
      orderBy('createdAt', 'desc'),
      limit(maxPosts)
    ],
    { enabled: !!spaceId }
  );
}

export function useRealtimeMembers(spaceId: string) {
  return useFirebaseRealtime<any>(
    `spaces/${spaceId}/members`,
    [
      orderBy('joinedAt', 'desc')
    ],
    { enabled: !!spaceId }
  );
}

export function useRealtimeEvents(spaceId: string) {
  return useFirebaseRealtime<any>(
    `spaces/${spaceId}/events`,
    [
      where('endTime', '>=', new Date()),
      orderBy('endTime', 'asc'),
      limit(10)
    ],
    { enabled: !!spaceId }
  );
}

export function useRealtimeComments(spaceId: string, postId: string) {
  return useFirebaseRealtime<any>(
    `spaces/${spaceId}/posts/${postId}/comments`,
    [
      orderBy('createdAt', 'asc')
    ],
    { enabled: !!spaceId && !!postId }
  );
}

export function useRealtimeFeed(userId: string) {
  return useFirebaseRealtime<any>(
    'feed',
    [
      where('targetUsers', 'array-contains', userId),
      orderBy('timestamp', 'desc'),
      limit(50)
    ],
    { enabled: !!userId }
  );
}

export function useRealtimeNotifications(userId: string) {
  return useFirebaseRealtime<any>(
    `users/${userId}/notifications`,
    [
      where('read', '==', false),
      orderBy('createdAt', 'desc'),
      limit(20)
    ],
    { enabled: !!userId }
  );
}

// Hook for single document real-time updates
export function useFirebaseDocRealtime<T extends DocumentData>(
  documentPath: string,
  options: UseFirebaseRealtimeOptions = {}
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { enabled = true, dependencies = [] } = options;

  useEffect(() => {
    if (!enabled || !documentPath) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const docRef = doc(db, documentPath);
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({
            id: snapshot.id,
            ...snapshot.data()
          } as T);
        } else {
          setData(null);
        }
        setLoading(false);
        setError(null);
      },
      (err: FirestoreError) => {
        logger.error(`Doc realtime error: ${documentPath}`, { error: err });
        setError(new Error(err.message));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [documentPath, enabled, ...dependencies]);

  return { data, loading, error };
}

// Hook for presence/online status
export function usePresence(userId: string) {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  useEffect(() => {
    if (!userId) return;

    const presenceRef = doc(db, `presence/${userId}`);
    
    const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsOnline(data.status === 'online');
        setLastSeen(data.lastSeen?.toDate() || null);
      } else {
        setIsOnline(false);
        setLastSeen(null);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return { isOnline, lastSeen };
}