/**
 * Firebase Feed Repository Implementation
 * Handles feed persistence and retrieval
 */
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit as firestoreLimit, Timestamp, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@hive/firebase';
import { Result } from '../../../domain/shared/base/Result';
import { EnhancedFeed } from '../../../domain/feed/enhanced-feed';
export class FirebaseFeedRepository {
    constructor() {
        this.collectionName = 'feeds';
        this.feedItemsCollection = 'feed_items';
    }
    async findById(id) {
        try {
            const feedId = typeof id === 'string' ? id : id.id;
            const docRef = doc(db, this.collectionName, feedId);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                return Result.fail('Feed not found');
            }
            const data = docSnap.data();
            return this.toDomain(feedId, data);
        }
        catch (error) {
            return Result.fail(`Failed to find feed: ${error}`);
        }
    }
    async findByUserId(userId) {
        try {
            const profileId = typeof userId === 'string' ? userId : userId.id;
            // Try to find existing feed
            const q = query(collection(db, this.collectionName), where('userId', '==', profileId), firestoreLimit(1));
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
        }
        catch (error) {
            return Result.fail(`Failed to find user feed: ${error}`);
        }
    }
    async findByCampus(campusId) {
        try {
            const q = query(collection(db, this.collectionName), where('campusId', '==', campusId), orderBy('updatedAt', 'desc'), firestoreLimit(100));
            const snapshot = await getDocs(q);
            const feeds = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    feeds.push(result.getValue());
                }
            }
            return Result.ok(feeds);
        }
        catch (error) {
            return Result.fail(`Failed to find campus feeds: ${error}`);
        }
    }
    async addFeedItem(feedId, item) {
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
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to add feed item: ${error}`);
        }
    }
    async removeFeedItem(feedId, itemId) {
        try {
            // Delete from feed_items collection
            const q = query(collection(db, this.feedItemsCollection), where('feedId', '==', feedId), where('__name__', '==', itemId), firestoreLimit(1));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                await deleteDoc(snapshot.docs[0].ref);
            }
            // Update feed timestamp
            const feedRef = doc(db, this.collectionName, feedId);
            await updateDoc(feedRef, {
                updatedAt: Timestamp.now()
            });
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to remove feed item: ${error}`);
        }
    }
    async save(feed) {
        try {
            const data = this.toPersistence(feed);
            const docRef = doc(db, this.collectionName, feed.feedId.value);
            if (feed.lastUpdated && feed.lastUpdated.getTime() > 0) {
                // Update existing
                await updateDoc(docRef, {
                    ...data,
                    updatedAt: Timestamp.now()
                });
            }
            else {
                // Create new
                await setDoc(docRef, {
                    ...data,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                });
            }
            // Save feed items separately
            await this.saveFeedItems(feed);
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to save feed: ${error}`);
        }
    }
    async delete(id) {
        try {
            const feedId = typeof id === 'string' ? id : id.id;
            // Delete feed items first
            const itemsQuery = query(collection(db, this.feedItemsCollection), where('feedId', '==', feedId));
            const itemsSnapshot = await getDocs(itemsQuery);
            const deletePromises = itemsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            // Delete feed document
            const docRef = doc(db, this.collectionName, feedId);
            await deleteDoc(docRef);
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to delete feed: ${error}`);
        }
    }
    // Helper methods
    async createFeedForUser(userId) {
        try {
            // Get user's campus from profile
            const profileDoc = await getDoc(doc(db, 'users', userId));
            if (!profileDoc.exists()) {
                return Result.fail('User profile not found');
            }
            const userData = profileDoc.data();
            const campusId = userData.campusId || 'ub-buffalo';
            // Create new feed
            const feedResult = EnhancedFeed.createWithCampus({ id: userId, equals: () => false }, campusId);
            if (feedResult.isFailure) {
                return Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            // Save to database
            await this.save(feed);
            return Result.ok(feed);
        }
        catch (error) {
            return Result.fail(`Failed to create feed: ${error}`);
        }
    }
    async loadFeedItems(feed) {
        try {
            // Load recent feed items
            const q = query(collection(db, this.feedItemsCollection), where('feedId', '==', feed.feedId.value), orderBy('createdAt', 'desc'), firestoreLimit(100));
            const snapshot = await getDocs(q);
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                // Add items to feed (would need to implement addItem method on EnhancedFeed)
                // For now, items are loaded separately
            });
        }
        catch (error) {
            console.error('Failed to load feed items:', error);
        }
    }
    async saveFeedItems(feed) {
        try {
            // This would save individual feed items
            // Implementation depends on how items are stored in the EnhancedFeed aggregate
            // For now, items are managed separately through addFeedItem/removeFeedItem
        }
        catch (error) {
            console.error('Failed to save feed items:', error);
        }
    }
    async toDomain(id, data) {
        try {
            // Create feed
            const feedResult = EnhancedFeed.createWithCampus({ id: data.userId, equals: () => false }, data.campusId || 'ub-buffalo');
            if (feedResult.isFailure) {
                return Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            // Note: EnhancedFeed doesn't have direct setters for these properties
            // They are managed internally through the props
            // The feed's lastUpdated property is set during creation and updates
            // Apply filter if exists
            if (data.currentFilter) {
                feed.applyFilter({
                    type: data.currentFilter
                });
            }
            return Result.ok(feed);
        }
        catch (error) {
            return Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(feed) {
        return {
            userId: feed.userId.value,
            campusId: feed.campusId.value,
            itemCount: feed.itemCount,
            lastUpdated: Timestamp.fromDate(feed.lastUpdated)
        };
    }
    // Additional methods required by interface
    async saveFeed(feed) {
        // Delegate to existing save method
        return this.save(feed);
    }
    async getFeedContent(userId, userSpaces, userConnections, limitCount = 50) {
        try {
            // Get posts from user's spaces
            const spaceIds = userSpaces.map(s => typeof s === 'object' ? s.id : s);
            const connectionIds = userConnections.map(c => typeof c === 'object' ? c.id : c);
            const allPostIds = new Set();
            const feedItems = [];
            // Get posts from spaces
            if (spaceIds.length > 0) {
                const spacePosts = query(collection(db, 'posts'), where('spaceId', 'in', spaceIds.slice(0, 10)), // Firestore limit
                orderBy('createdAt', 'desc'), firestoreLimit(limitCount));
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
                const connectionPosts = query(collection(db, 'posts'), where('authorId', 'in', connectionIds.slice(0, 10)), orderBy('createdAt', 'desc'), firestoreLimit(limitCount));
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
            return Result.ok(feedItems.slice(0, limitCount));
        }
        catch (error) {
            return Result.fail(`Failed to get feed content: ${error}`);
        }
    }
    async getTrendingContent(campusId, limitCount = 20) {
        try {
            const q = query(collection(db, 'posts'), where('campusId', '==', campusId), where('trendingScore', '>', 0), orderBy('trendingScore', 'desc'), orderBy('createdAt', 'desc'), firestoreLimit(limitCount));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'trending'
            }));
            return Result.ok(items);
        }
        catch (error) {
            return Result.fail(`Failed to get trending content: ${error}`);
        }
    }
    async getEventContent(campusId, limitCount = 20) {
        try {
            const now = Timestamp.now();
            const q = query(collection(db, 'events'), where('campusId', '==', campusId), where('startTime', '>=', now), orderBy('startTime', 'asc'), firestoreLimit(limitCount));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'event'
            }));
            return Result.ok(items);
        }
        catch (error) {
            return Result.fail(`Failed to get event content: ${error}`);
        }
    }
    async getRitualContent(campusId, limitCount = 20) {
        try {
            const q = query(collection(db, 'rituals'), where('campusId', '==', campusId), where('isActive', '==', true), orderBy('nextOccurrence', 'asc'), firestoreLimit(limitCount));
            const snapshot = await getDocs(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'ritual'
            }));
            return Result.ok(items);
        }
        catch (error) {
            return Result.fail(`Failed to get ritual content: ${error}`);
        }
    }
    async recordInteraction(userId, itemId, interactionType, metadata) {
        try {
            const interactionData = {
                userId,
                itemId,
                type: interactionType,
                metadata: metadata || {},
                createdAt: Timestamp.now()
            };
            await addDoc(collection(db, 'interactions'), interactionData);
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to record interaction: ${error}`);
        }
    }
    subscribeToFeed(userId, callback) {
        // Real-time subscription to feed updates
        const q = query(collection(db, this.feedItemsCollection), where('userId', '==', userId), orderBy('createdAt', 'desc'), firestoreLimit(100));
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
//# sourceMappingURL=feed.repository.js.map