/**
 * Firebase Feed Repository Implementation
 * Handles feed persistence and retrieval
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  addDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { IFeedRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedFeed } from '../../../domain/feed/enhanced-feed';
import { FeedId } from '../../../domain/feed/value-objects';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';

export class FirebaseFeedRepository implements IFeedRepository {
  private readonly collectionName = 'feeds';
  private readonly feedItemsCollection = 'feed_items';

  async findById(id: FeedId | any): Promise<Result<EnhancedFeed>> {
    try {
      const feedId = typeof id === 'string' ? id : id.id;
      const docRef = doc(db, this.collectionName, feedId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<EnhancedFeed>('Feed not found');
      }

      const data = docSnap.data();
      return this.toDomain(feedId, data);
    } catch (error) {
      return Result.fail<EnhancedFeed>(`Failed to find feed: ${error}`);
    }
  }

  async findByUserId(userId: ProfileId | any): Promise<Result<EnhancedFeed>> {
    try {
      const profileId = typeof userId === 'string' ? userId : userId.id;

      // Try to find existing feed
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', profileId),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Create new feed if doesn't exist
        const newFeedResult = await this.createFeedForUser(profileId);
        return newFeedResult;
      }

      const doc = snapshot.docs[0];
      const feedResult = await this.toDomain(doc.id, doc.data());

      if (feedResult.isSuccess) {
        // Load feed items
        await this.loadFeedItems(feedResult.getValue());
      }

      return feedResult;
    } catch (error) {
      return Result.fail<EnhancedFeed>(`Failed to find user feed: ${error}`);
    }
  }

  async findByCampus(campusId: string): Promise<Result<EnhancedFeed[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        orderBy('updatedAt', 'desc'),
        firestoreLimit(100)
      );
      const snapshot = await getDocs(q);

      const feeds: EnhancedFeed[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          feeds.push(result.getValue());
        }
      }

      return Result.ok<EnhancedFeed[]>(feeds);
    } catch (error) {
      return Result.fail<EnhancedFeed[]>(`Failed to find campus feeds: ${error}`);
    }
  }

  async addFeedItem(feedId: string, item: any): Promise<Result<void>> {
    try {
      // Add item to feed_items collection
      const itemData = {
        feedId,
        type: item.type || 'post',
        contentType: item.contentType || 'post',
        content: {
          text: item.content?.text || '',
          mediaUrls: item.content?.mediaUrls || [],
          authorId: item.content?.authorId || item.authorId,
          authorName: item.content?.authorName,
          authorHandle: item.content?.authorHandle
        },
        source: {
          type: item.source?.type || 'space',
          spaceId: item.source?.spaceId || item.spaceId,
          eventId: item.source?.eventId,
          ritualId: item.source?.ritualId
        },
        campusId: item.campusId,
        visibility: item.visibility || 'public',
        isPromoted: item.isPromoted || false,
        promotionData: item.promotionData,
        relevanceScore: item.relevanceScore || 0,
        interactions: item.interactions || [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, this.feedItemsCollection), itemData);

      // Update feed's lastUpdated timestamp
      const feedRef = doc(db, this.collectionName, feedId);
      await updateDoc(feedRef, {
        lastRefreshed: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to add feed item: ${error}`);
    }
  }

  async removeFeedItem(feedId: string, itemId: string): Promise<Result<void>> {
    try {
      // Delete from feed_items collection
      const q = query(
        collection(db, this.feedItemsCollection),
        where('feedId', '==', feedId),
        where('__name__', '==', itemId),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        await deleteDoc(snapshot.docs[0].ref);
      }

      // Update feed timestamp
      const feedRef = doc(db, this.collectionName, feedId);
      await updateDoc(feedRef, {
        updatedAt: Timestamp.now()
      });

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to remove feed item: ${error}`);
    }
  }

  async save(feed: EnhancedFeed): Promise<Result<void>> {
    try {
      const data = this.toPersistence(feed);
      const docRef = doc(db, this.collectionName, feed.feedId.value);

      if (feed.lastUpdated && feed.lastUpdated.getTime() > 0) {
        // Update existing
        await updateDoc(docRef, {
          ...data,
          updatedAt: Timestamp.now()
        });
      } else {
        // Create new
        await setDoc(docRef, {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }

      // Save feed items separately
      await this.saveFeedItems(feed);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to save feed: ${error}`);
    }
  }

  async delete(id: FeedId | any): Promise<Result<void>> {
    try {
      const feedId = typeof id === 'string' ? id : id.id;

      // Delete feed items first
      const itemsQuery = query(
        collection(db, this.feedItemsCollection),
        where('feedId', '==', feedId)
      );
      const itemsSnapshot = await getDocs(itemsQuery);

      const deletePromises = itemsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Delete feed document
      const docRef = doc(db, this.collectionName, feedId);
      await deleteDoc(docRef);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete feed: ${error}`);
    }
  }

  // Helper methods
  private async createFeedForUser(userId: string): Promise<Result<EnhancedFeed>> {
    try {
      // Get user's campus from profile
      const profileDoc = await getDoc(doc(db, 'users', userId));
      if (!profileDoc.exists()) {
        return Result.fail<EnhancedFeed>('User profile not found');
      }

      const userData = profileDoc.data();
      const campusId = userData.campusId || 'ub-buffalo';

      // Create new feed
      const feedResult = EnhancedFeed.createWithCampus(
        { id: userId, equals: () => false } as any,
        campusId
      );

      if (feedResult.isFailure) {
        return Result.fail<EnhancedFeed>(feedResult.error!);
      }

      const feed = feedResult.getValue();

      // Save to database
      await this.save(feed);

      return Result.ok<EnhancedFeed>(feed);
    } catch (error) {
      return Result.fail<EnhancedFeed>(`Failed to create feed: ${error}`);
    }
  }

  private async loadFeedItems(feed: EnhancedFeed): Promise<void> {
    try {
      // Load recent feed items
      const q = query(
        collection(db, this.feedItemsCollection),
        where('feedId', '==', feed.feedId.value),
        orderBy('createdAt', 'desc'),
        firestoreLimit(100)
      );
      const snapshot = await getDocs(q);

      snapshot.docs.forEach(() => {
        // Add items to feed (would need to implement addItem method on EnhancedFeed)
        // For now, items are loaded separately
      });
    } catch (error) {
      console.error('Failed to load feed items:', error);
    }
  }

  private async saveFeedItems(feed: EnhancedFeed): Promise<void> {
    try {
      const items = feed.items;

      if (items.length === 0) {
        return;
      }

      const batch = writeBatch(db);

      items.forEach(item => {
        const itemRef = doc(
          db,
          this.feedItemsCollection,
          `${feed.feedId.value}_${item.itemId.value}`
        );

        batch.set(itemRef, {
          feedId: feed.feedId.value,
          itemId: item.itemId.value,
          content: item.content,
          source: item.source,
          relevanceScore: item.relevanceScore,
          interactions: item.interactions.map(interaction => ({
            type: interaction.type,
            userId: interaction.userId.value,
            timestamp: Timestamp.fromDate(interaction.timestamp)
          })),
          engagementCount: item.interactions.length,
          createdAt: Timestamp.fromDate(item.createdAt),
          isVisible: item.isVisible,
          isTrending: item.isTrending,
          isPinned: item.isPinned,
          expiresAt: item.expiresAt
            ? Timestamp.fromDate(item.expiresAt)
            : undefined,
          updatedAt: Timestamp.now()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Failed to save feed items:', error);
    }
  }

  private async toDomain(id: string, data: any): Promise<Result<EnhancedFeed>> {
    try {
      // Create feed
      const feedResult = EnhancedFeed.createWithCampus(
        { id: data.userId, equals: () => false } as any,
        data.campusId || 'ub-buffalo'
      );

      if (feedResult.isFailure) {
        return Result.fail<EnhancedFeed>(feedResult.error!);
      }

      const feed = feedResult.getValue();

      // Note: EnhancedFeed doesn't have direct setters for these properties
      // They are managed internally through the props
      // The feed's lastUpdated property is set during creation and updates

      // Apply filter if exists
      if (data.currentFilter) {
        feed.applyFilter({
          type: data.currentFilter as any
        });
      }

      return Result.ok<EnhancedFeed>(feed);
    } catch (error) {
      return Result.fail<EnhancedFeed>(`Failed to map to domain: ${error}`);
    }
  }

  private toPersistence(feed: EnhancedFeed): any {
    return {
      userId: feed.userId.value,
      campusId: feed.campusId.value,
      itemCount: feed.itemCount,
      lastUpdated: Timestamp.fromDate(feed.lastUpdated)
    };
  }

  // Additional methods required by interface
  async saveFeed(feed: EnhancedFeed): Promise<Result<void>> {
    // Delegate to existing save method
    return this.save(feed);
  }

  async getFeedContent(
    userId: string,
    userSpaces: any[],
    userConnections: any[],
    limitCount: number = 50
  ): Promise<Result<any[]>> {
    try {
      // Get posts from user's spaces
      const spaceIds = userSpaces.map(s => typeof s === 'object' ? s.id : s);
      const connectionIds = userConnections.map(c => typeof c === 'object' ? c.id : c);

      const allPostIds = new Set<string>();
      const feedItems: any[] = [];

      // Get posts from spaces
      if (spaceIds.length > 0) {
        const spacePosts = query(
          collection(db, 'posts'),
          where('spaceId', 'in', spaceIds.slice(0, 10)), // Firestore limit
          orderBy('createdAt', 'desc'),
          firestoreLimit(limitCount)
        );
        const spaceSnapshot = await getDocs(spacePosts);
        spaceSnapshot.docs.forEach(doc => {
          if (!allPostIds.has(doc.id)) {
            allPostIds.add(doc.id);
            feedItems.push({ id: doc.id, ...doc.data(), source: 'space' });
          }
        });
      }

      // Get posts from connections
      if (connectionIds.length > 0) {
        const connectionPosts = query(
          collection(db, 'posts'),
          where('authorId', 'in', connectionIds.slice(0, 10)),
          orderBy('createdAt', 'desc'),
          firestoreLimit(limitCount)
        );
        const connectionSnapshot = await getDocs(connectionPosts);
        connectionSnapshot.docs.forEach(doc => {
          if (!allPostIds.has(doc.id)) {
            allPostIds.add(doc.id);
            feedItems.push({ id: doc.id, ...doc.data(), source: 'connection' });
          }
        });
      }

      // Sort by timestamp
      feedItems.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });

      return Result.ok<any[]>(feedItems.slice(0, limitCount));
    } catch (error) {
      return Result.fail<any[]>(`Failed to get feed content: ${error}`);
    }
  }

  async getTrendingContent(campusId: string, limitCount: number = 20): Promise<Result<any[]>> {
    try {
      const q = query(
        collection(db, 'posts'),
        where('campusId', '==', campusId),
        where('trendingScore', '>', 0),
        orderBy('trendingScore', 'desc'),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'trending'
      }));

      return Result.ok<any[]>(items);
    } catch (error) {
      return Result.fail<any[]>(`Failed to get trending content: ${error}`);
    }
  }

  async getEventContent(campusId: string, limitCount: number = 20): Promise<Result<any[]>> {
    try {
      const now = Timestamp.now();
      const q = query(
        collection(db, 'events'),
        where('campusId', '==', campusId),
        where('startTime', '>=', now),
        orderBy('startTime', 'asc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'event'
      }));

      return Result.ok<any[]>(items);
    } catch (error) {
      return Result.fail<any[]>(`Failed to get event content: ${error}`);
    }
  }

  async getRitualContent(campusId: string, limitCount: number = 20): Promise<Result<any[]>> {
    try {
      const q = query(
        collection(db, 'rituals'),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('nextOccurrence', 'asc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'ritual'
      }));

      return Result.ok<any[]>(items);
    } catch (error) {
      return Result.fail<any[]>(`Failed to get ritual content: ${error}`);
    }
  }

  async recordInteraction(
    userId: string,
    itemId: string,
    interactionType: string,
    metadata?: Record<string, unknown>
  ): Promise<Result<void>> {
    try {
      const interactionData = {
        userId,
        itemId,
        type: interactionType,
        metadata: metadata || {},
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'interactions'), interactionData);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to record interaction: ${error}`);
    }
  }

  subscribeToFeed(userId: string, callback: (items: any[]) => void): () => void {
    // Real-time subscription to feed updates
    const q = query(
      collection(db, this.feedItemsCollection),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(items);
    });

    return unsubscribe;
  }
}
