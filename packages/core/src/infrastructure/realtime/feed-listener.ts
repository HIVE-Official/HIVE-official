/**
 * Real-time Feed Listener
 * Subscribes to feed updates using Firestore listeners
 */

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  DocumentData,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@hive/firebase';

export interface FeedUpdate {
  id: string;
  type: 'post' | 'event' | 'ritual_update' | 'requote';
  content: {
    text: string;
    mediaUrls: string[];
    authorId: string;
    authorName: string;
    authorHandle: string;
    authorAvatar?: string;
  };
  spaceId?: string;
  spaceName?: string;
  engagement: {
    reactions: number;
    comments: number;
    reposts: number;
    requotes: number;
  };
  isPromoted: boolean;
  createdAt: Date;
  relevanceScore: number;
}

export interface FeedListenerOptions {
  campusId: string;
  userId?: string;
  filter?: 'all' | 'my_spaces' | 'trending' | 'events' | 'rituals';
  limitCount?: number;
  onUpdate: (updates: FeedUpdate[]) => void;
  onError?: (error: Error) => void;
}

export class FeedListener {
  private listeners: Map<string, Unsubscribe> = new Map();
  private feedCache: Map<string, FeedUpdate[]> = new Map();

  /**
   * Subscribe to real-time feed updates
   */
  subscribe(options: FeedListenerOptions): string {
    const listenerId = `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Build query based on filters
    const feedQuery = this.buildFeedQuery(options);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      feedQuery,
      (snapshot) => {
        const updates: FeedUpdate[] = [];

        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          const feedItem = this.mapToFeedUpdate(change.doc.id, data);

          if (change.type === 'added' || change.type === 'modified') {
            updates.push(feedItem);
          }
        });

        // Update cache
        if (updates.length > 0) {
          this.updateCache(listenerId, updates);
          options.onUpdate(this.getCachedFeed(listenerId));
        }
      },
      (error) => {
        console.error('Feed listener error:', error);
        options.onError?.(error);
      }
    );

    this.listeners.set(listenerId, unsubscribe);
    return listenerId;
  }

  /**
   * Subscribe to space-specific feed
   */
  subscribeToSpace(spaceId: string, options: Omit<FeedListenerOptions, 'filter'>): string {
    const listenerId = `space_${spaceId}_${Date.now()}`;

    const spaceQuery = query(
      collection(db, 'spaces', spaceId, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(options.limitCount || 50)
    );

    const unsubscribe = onSnapshot(
      spaceQuery,
      (snapshot) => {
        const updates: FeedUpdate[] = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          updates.push(this.mapToFeedUpdate(doc.id, data, spaceId));
        });

        this.feedCache.set(listenerId, updates);
        options.onUpdate(updates);
      },
      (error) => {
        console.error('Space feed listener error:', error);
        options.onError?.(error);
      }
    );

    this.listeners.set(listenerId, unsubscribe);
    return listenerId;
  }

  /**
   * Subscribe to promoted posts (campus-wide)
   */
  subscribeToPromoted(campusId: string, options: Omit<FeedListenerOptions, 'filter'>): string {
    const listenerId = `promoted_${campusId}_${Date.now()}`;

    const promotedQuery = query(
      collection(db, 'promoted_posts'),
      where('campusId', '==', campusId),
      where('expiresAt', '>', Timestamp.now()),
      orderBy('expiresAt', 'desc'),
      orderBy('promotedAt', 'desc'),
      limit(options.limitCount || 20)
    );

    const unsubscribe = onSnapshot(
      promotedQuery,
      async (snapshot) => {
        const updates: FeedUpdate[] = [];

        for (const doc of snapshot.docs) {
          const data = doc.data();
          const feedItem = await this.fetchAndMapPromotedPost(data);
          if (feedItem) {
            updates.push(feedItem);
          }
        }

        this.feedCache.set(listenerId, updates);
        options.onUpdate(updates);
      },
      (error) => {
        console.error('Promoted feed listener error:', error);
        options.onError?.(error);
      }
    );

    this.listeners.set(listenerId, unsubscribe);
    return listenerId;
  }

  /**
   * Subscribe to user's personal feed (based on followed spaces)
   */
  subscribeToUserFeed(userId: string, campusId: string, options: Omit<FeedListenerOptions, 'userId'>): string {
    const listenerId = `user_${userId}_${Date.now()}`;

    // This would ideally query a pre-computed feed collection
    // For MVP, we'll query recent posts from joined spaces
    const feedQuery = query(
      collection(db, 'feed_items'),
      where('campusId', '==', campusId),
      where('visibility', '==', 'public'),
      orderBy('createdAt', 'desc'),
      limit(options.limitCount || 100)
    );

    const unsubscribe = onSnapshot(
      feedQuery,
      (snapshot) => {
        const updates: FeedUpdate[] = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          updates.push(this.mapToFeedUpdate(doc.id, data));
        });

        // Sort by relevance score client-side
        updates.sort((a, b) => b.relevanceScore - a.relevanceScore);

        this.feedCache.set(listenerId, updates);
        options.onUpdate(updates);
      },
      (error) => {
        console.error('User feed listener error:', error);
        options.onError?.(error);
      }
    );

    this.listeners.set(listenerId, unsubscribe);
    return listenerId;
  }

  /**
   * Unsubscribe from feed updates
   */
  unsubscribe(listenerId: string): void {
    const unsubscribe = this.listeners.get(listenerId);
    if (unsubscribe) {
      unsubscribe();
      this.listeners.delete(listenerId);
      this.feedCache.delete(listenerId);
    }
  }

  /**
   * Unsubscribe from all feed listeners
   */
  unsubscribeAll(): void {
    this.listeners.forEach((unsubscribe) => unsubscribe());
    this.listeners.clear();
    this.feedCache.clear();
  }

  /**
   * Get cached feed for a listener
   */
  getCachedFeed(listenerId: string): FeedUpdate[] {
    return this.feedCache.get(listenerId) || [];
  }

  // Private helper methods

  private buildFeedQuery(options: FeedListenerOptions) {
    const baseCollection = collection(db, 'feed_items');
    const constraints: any[] = [
      where('campusId', '==', options.campusId),
      orderBy('createdAt', 'desc')
    ];

    // Add filter-specific constraints
    switch (options.filter) {
      case 'trending':
        constraints.push(where('isTrending', '==', true));
        break;
      case 'events':
        constraints.push(where('type', '==', 'event'));
        break;
      case 'rituals':
        constraints.push(where('type', '==', 'ritual_update'));
        break;
      case 'my_spaces':
        if (options.userId) {
          // This would need a different approach - query user's spaces first
          constraints.push(where('visibility', '==', 'public'));
        }
        break;
      default:
        constraints.push(where('visibility', '==', 'public'));
    }

    constraints.push(limit(options.limitCount || 50));

    return query(baseCollection, ...constraints);
  }

  private mapToFeedUpdate(id: string, data: DocumentData, spaceId?: string): FeedUpdate {
    return {
      id,
      type: data.type || 'post',
      content: {
        text: data.content?.text || data.text || '',
        mediaUrls: data.content?.mediaUrls || data.mediaUrls || [],
        authorId: data.authorId || data.userId || '',
        authorName: data.authorName || 'Unknown User',
        authorHandle: data.authorHandle || 'unknown',
        authorAvatar: data.authorAvatar
      },
      spaceId: spaceId || data.spaceId,
      spaceName: data.spaceName,
      engagement: {
        reactions: data.reactions || 0,
        comments: data.commentCount || 0,
        reposts: data.reposts || 0,
        requotes: data.requotes || 0
      },
      isPromoted: data.isPromoted || false,
      createdAt: data.createdAt?.toDate() || new Date(),
      relevanceScore: data.relevanceScore || 0
    };
  }

  private async fetchAndMapPromotedPost(promotedData: DocumentData): Promise<FeedUpdate | null> {
    try {
      // Fetch the actual post data from the space
      const postRef = collection(db, 'spaces', promotedData.spaceId, 'posts');
      // Implementation would fetch the actual post
      // For now, return mapped promoted data
      return this.mapToFeedUpdate(promotedData.postId, promotedData);
    } catch (error) {
      console.error('Error fetching promoted post:', error);
      return null;
    }
  }

  private updateCache(listenerId: string, updates: FeedUpdate[]): void {
    const existing = this.feedCache.get(listenerId) || [];

    // Merge updates with existing, avoiding duplicates
    const merged = [...existing];

    updates.forEach((update) => {
      const index = merged.findIndex((item) => item.id === update.id);
      if (index >= 0) {
        merged[index] = update; // Update existing
      } else {
        merged.unshift(update); // Add new at beginning
      }
    });

    // Keep only the most recent items (limit to 200)
    const trimmed = merged.slice(0, 200);

    this.feedCache.set(listenerId, trimmed);
  }
}

// Singleton instance for app-wide feed listening
export const feedListener = new FeedListener();