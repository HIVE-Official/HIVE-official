import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QuerySnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client/firebase-client';
import { logger } from '@/lib/utils/structured-logger';

export interface RealtimeListener {
  unsubscribe: Unsubscribe;
  id: string;
  type: string;
}

class RealtimeListenerManager {
  private listeners: Map<string, RealtimeListener> = new Map();

  /**
   * Subscribe to real-time post updates in a space
   */
  subscribeToSpacePosts(
    spaceId: string,
    onUpdate: (posts: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `space-posts-${spaceId}`;
    
    // Unsubscribe existing listener if any
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'spaces', spaceId, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        }));
        
        logger.info('Real-time posts update', { 
          spaceId, 
          count: posts.length,
          changes: snapshot.docChanges().length 
        });
        
        onUpdate(posts);
      },
      (error) => {
        logger.error('Real-time posts listener error', { spaceId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'space-posts'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time comment updates for a post
   */
  subscribeToPostComments(
    spaceId: string,
    postId: string,
    onUpdate: (comments: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `post-comments-${spaceId}-${postId}`;
    
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'spaces', spaceId, 'posts', postId, 'comments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        
        onUpdate(comments);
      },
      (error) => {
        logger.error('Real-time comments listener error', { spaceId, postId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'post-comments'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time space member updates
   */
  subscribeToSpaceMembers(
    spaceId: string,
    onUpdate: (members: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `space-members-${spaceId}`;
    
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'spaces', spaceId, 'members'),
      orderBy('joinedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const members = snapshot.docs.map(doc => ({
          id: doc.id,
          userId: doc.id,
          ...doc.data(),
          joinedAt: doc.data().joinedAt?.toDate() || new Date()
        }));
        
        logger.info('Real-time members update', { 
          spaceId, 
          count: members.length,
          changes: snapshot.docChanges().map(change => ({
            type: change.type,
            userId: change.doc.id
          }))
        });
        
        onUpdate(members);
      },
      (error) => {
        logger.error('Real-time members listener error', { spaceId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'space-members'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time event updates in a space
   */
  subscribeToSpaceEvents(
    spaceId: string,
    onUpdate: (events: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `space-events-${spaceId}`;
    
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'spaces', spaceId, 'events'),
      where('startDate', '>', new Date()),
      orderBy('startDate', 'asc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate() || new Date(),
          endDate: doc.data().endDate?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        
        logger.info('Real-time events update', { 
          spaceId, 
          count: events.length 
        });
        
        onUpdate(events);
      },
      (error) => {
        logger.error('Real-time events listener error', { spaceId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'space-events'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time notification updates for a user
   */
  subscribeToUserNotifications(
    userId: string,
    onUpdate: (notifications: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `user-notifications-${userId}`;
    
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'users', userId, 'notifications'),
      where('read', '==', false),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const notifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        
        onUpdate(notifications);
      },
      (error) => {
        logger.error('Real-time notifications listener error', { userId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'user-notifications'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time feed updates
   */
  subscribeToUserFeed(
    userId: string,
    onUpdate: (feedItems: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `user-feed-${userId}`;
    
    this.unsubscribe(listenerId);

    const q = query(
      collection(db, 'feed', userId, 'items'),
      orderBy('aggregatedAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const feedItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
          aggregatedAt: doc.data().aggregatedAt?.toDate() || new Date()
        }));
        
        logger.info('Real-time feed update', { 
          userId, 
          count: feedItems.length,
          hasChanges: snapshot.docChanges().length > 0
        });
        
        onUpdate(feedItems);
      },
      (error) => {
        logger.error('Real-time feed listener error', { userId, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'user-feed'
    });

    return listenerId;
  }

  /**
   * Subscribe to real-time ritual updates
   */
  subscribeToRituals(
    spaceIds: string[],
    onUpdate: (rituals: DocumentData[]) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `rituals-${spaceIds.join('-')}`;
    
    this.unsubscribe(listenerId);

    // Firestore 'in' query limited to 10 items
    const limitedSpaceIds = spaceIds.slice(0, 10);

    const q = query(
      collection(db, 'rituals'),
      where('spaceIds', 'array-contains-any', limitedSpaceIds),
      where('isActive', '==', true),
      orderBy('nextOccurrence', 'asc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const rituals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          nextOccurrence: doc.data().nextOccurrence?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        
        onUpdate(rituals);
      },
      (error) => {
        logger.error('Real-time rituals listener error', { spaceIds, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'rituals'
    });

    return listenerId;
  }

  /**
   * Subscribe to a single document updates
   */
  subscribeToDocument(
    path: string[],
    onUpdate: (data: DocumentData | null) => void,
    onError?: (error: Error) => void
  ): string {
    const listenerId = `doc-${path.join('-')}`;
    
    this.unsubscribe(listenerId);

    const docRef = doc(db, ...path);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = {
            id: snapshot.id,
            ...snapshot.data()
          };
          onUpdate(data);
        } else {
          onUpdate(null);
        }
      },
      (error) => {
        logger.error('Real-time document listener error', { path, error });
        onError?.(error);
      }
    );

    this.listeners.set(listenerId, {
      unsubscribe,
      id: listenerId,
      type: 'document'
    });

    return listenerId;
  }

  /**
   * Unsubscribe from a specific listener
   */
  unsubscribe(listenerId: string): void {
    const listener = this.listeners.get(listenerId);
    if (listener) {
      listener.unsubscribe();
      this.listeners.delete(listenerId);
      logger.info('Unsubscribed from real-time listener', { listenerId });
    }
  }

  /**
   * Unsubscribe from all listeners
   */
  unsubscribeAll(): void {
    this.listeners.forEach(listener => {
      listener.unsubscribe();
    });
    this.listeners.clear();
    logger.info('Unsubscribed from all real-time listeners');
  }

  /**
   * Get active listener count
   */
  getActiveListenerCount(): number {
    return this.listeners.size;
  }

  /**
   * Get active listener IDs
   */
  getActiveListenerIds(): string[] {
    return Array.from(this.listeners.keys());
  }
}

// Export singleton instance
export const realtimeManager = new RealtimeListenerManager();

// Export convenience hooks for React components
export function useRealtimeSpacePosts(
  spaceId: string | null,
  onUpdate: (posts: DocumentData[]) => void
) {
  if (!spaceId) return null;
  return realtimeManager.subscribeToSpacePosts(spaceId, onUpdate);
}

export function useRealtimeSpaceMembers(
  spaceId: string | null,
  onUpdate: (members: DocumentData[]) => void
) {
  if (!spaceId) return null;
  return realtimeManager.subscribeToSpaceMembers(spaceId, onUpdate);
}

export function useRealtimeSpaceEvents(
  spaceId: string | null,
  onUpdate: (events: DocumentData[]) => void
) {
  if (!spaceId) return null;
  return realtimeManager.subscribeToSpaceEvents(spaceId, onUpdate);
}

export function useRealtimeNotifications(
  userId: string | null,
  onUpdate: (notifications: DocumentData[]) => void
) {
  if (!userId) return null;
  return realtimeManager.subscribeToUserNotifications(userId, onUpdate);
}

export function useRealtimeFeed(
  userId: string | null,
  onUpdate: (feedItems: DocumentData[]) => void
) {
  if (!userId) return null;
  return realtimeManager.subscribeToUserFeed(userId, onUpdate);
}