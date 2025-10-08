"use strict";
/**
 * Firebase Feed Repository Implementation
 * Handles feed persistence and retrieval
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseFeedRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const enhanced_feed_1 = require("../../../domain/feed/enhanced-feed");
class FirebaseFeedRepository {
    constructor() {
        this.collectionName = 'feeds';
        this.feedItemsCollection = 'feed_items';
    }
    async findById(id) {
        try {
            const feedId = typeof id === 'string' ? id : id.id;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, feedId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Feed not found');
            }
            const data = docSnap.data();
            return this.toDomain(feedId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find feed: ${error}`);
        }
    }
    async findByUserId(userId) {
        try {
            const profileId = typeof userId === 'string' ? userId : userId.id;
            // Try to find existing feed
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('userId', '==', profileId), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
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
            return Result_1.Result.fail(`Failed to find user feed: ${error}`);
        }
    }
    async findByCampus(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(100));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const feeds = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    feeds.push(result.getValue());
                }
            }
            return Result_1.Result.ok(feeds);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find campus feeds: ${error}`);
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
                createdAt: firestore_1.Timestamp.now(),
                updatedAt: firestore_1.Timestamp.now()
            };
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), itemData);
            // Update feed's lastUpdated timestamp
            const feedRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, feedId);
            await (0, firestore_1.updateDoc)(feedRef, {
                lastRefreshed: firestore_1.Timestamp.now(),
                updatedAt: firestore_1.Timestamp.now()
            });
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to add feed item: ${error}`);
        }
    }
    async removeFeedItem(feedId, itemId) {
        try {
            // Delete from feed_items collection
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('feedId', '==', feedId), (0, firestore_1.where)('__name__', '==', itemId), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (!snapshot.empty) {
                await (0, firestore_1.deleteDoc)(snapshot.docs[0].ref);
            }
            // Update feed timestamp
            const feedRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, feedId);
            await (0, firestore_1.updateDoc)(feedRef, {
                updatedAt: firestore_1.Timestamp.now()
            });
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to remove feed item: ${error}`);
        }
    }
    async save(feed) {
        try {
            const data = this.toPersistence(feed);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, feed.feedId.value);
            if (feed.lastUpdated && feed.lastUpdated.getTime() > 0) {
                // Update existing
                await (0, firestore_1.updateDoc)(docRef, {
                    ...data,
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            else {
                // Create new
                await (0, firestore_1.setDoc)(docRef, {
                    ...data,
                    createdAt: firestore_1.Timestamp.now(),
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            // Save feed items separately
            await this.saveFeedItems(feed);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to save feed: ${error}`);
        }
    }
    async delete(id) {
        try {
            const feedId = typeof id === 'string' ? id : id.id;
            // Delete feed items first
            const itemsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('feedId', '==', feedId));
            const itemsSnapshot = await (0, firestore_1.getDocs)(itemsQuery);
            const deletePromises = itemsSnapshot.docs.map(doc => (0, firestore_1.deleteDoc)(doc.ref));
            await Promise.all(deletePromises);
            // Delete feed document
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, feedId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete feed: ${error}`);
        }
    }
    // Helper methods
    async createFeedForUser(userId) {
        try {
            // Get user's campus from profile
            const profileDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, 'users', userId));
            if (!profileDoc.exists()) {
                return Result_1.Result.fail('User profile not found');
            }
            const userData = profileDoc.data();
            const campusId = userData.campusId || 'ub-buffalo';
            // Create new feed
            const feedResult = enhanced_feed_1.EnhancedFeed.createWithCampus({ id: userId, equals: () => false }, campusId);
            if (feedResult.isFailure) {
                return Result_1.Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            // Save to database
            await this.save(feed);
            return Result_1.Result.ok(feed);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to create feed: ${error}`);
        }
    }
    async loadFeedItems(feed) {
        try {
            // Load recent feed items
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('feedId', '==', feed.feedId.value), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(100));
            const snapshot = await (0, firestore_1.getDocs)(q);
            snapshot.docs.forEach(() => {
                // Add items to feed (would need to implement addItem method on EnhancedFeed)
                // For now, items are loaded separately
            });
        }
        catch (error) {
            console.error('Failed to load feed items:', error);
        }
    }
    async saveFeedItems(_feed) {
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
            const feedResult = enhanced_feed_1.EnhancedFeed.createWithCampus({ id: data.userId, equals: () => false }, data.campusId || 'ub-buffalo');
            if (feedResult.isFailure) {
                return Result_1.Result.fail(feedResult.error);
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
            return Result_1.Result.ok(feed);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(feed) {
        return {
            userId: feed.userId.value,
            campusId: feed.campusId.value,
            itemCount: feed.itemCount,
            lastUpdated: firestore_1.Timestamp.fromDate(feed.lastUpdated)
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
                const spacePosts = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_1.where)('spaceId', 'in', spaceIds.slice(0, 10)), // Firestore limit
                (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
                const spaceSnapshot = await (0, firestore_1.getDocs)(spacePosts);
                spaceSnapshot.docs.forEach(doc => {
                    if (!allPostIds.has(doc.id)) {
                        allPostIds.add(doc.id);
                        feedItems.push({ id: doc.id, ...doc.data(), source: 'space' });
                    }
                });
            }
            // Get posts from connections
            if (connectionIds.length > 0) {
                const connectionPosts = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_1.where)('authorId', 'in', connectionIds.slice(0, 10)), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
                const connectionSnapshot = await (0, firestore_1.getDocs)(connectionPosts);
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
            return Result_1.Result.ok(feedItems.slice(0, limitCount));
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to get feed content: ${error}`);
        }
    }
    async getTrendingContent(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'posts'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('trendingScore', '>', 0), (0, firestore_1.orderBy)('trendingScore', 'desc'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'trending'
            }));
            return Result_1.Result.ok(items);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to get trending content: ${error}`);
        }
    }
    async getEventContent(campusId, limitCount = 20) {
        try {
            const now = firestore_1.Timestamp.now();
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'events'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('startTime', '>=', now), (0, firestore_1.orderBy)('startTime', 'asc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'event'
            }));
            return Result_1.Result.ok(items);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to get event content: ${error}`);
        }
    }
    async getRitualContent(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'rituals'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('nextOccurrence', 'asc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: 'ritual'
            }));
            return Result_1.Result.ok(items);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to get ritual content: ${error}`);
        }
    }
    async recordInteraction(userId, itemId, interactionType, metadata) {
        try {
            const interactionData = {
                userId,
                itemId,
                type: interactionType,
                metadata: metadata || {},
                createdAt: firestore_1.Timestamp.now()
            };
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, 'interactions'), interactionData);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to record interaction: ${error}`);
        }
    }
    subscribeToFeed(userId, callback) {
        // Real-time subscription to feed updates
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('userId', '==', userId), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(100));
        const unsubscribe = (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(items);
        });
        return unsubscribe;
    }
}
exports.FirebaseFeedRepository = FirebaseFeedRepository;
//# sourceMappingURL=feed.repository.js.map