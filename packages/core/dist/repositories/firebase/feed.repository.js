"use strict";
/**
 * Firebase Feed Repository
 * Firestore implementation for Feed domain with real-time updates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseFeedRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const domain_1 = require("../../domain");
class FirebaseFeedRepository {
    constructor() {
        this.feedsCollection = 'feeds';
        this.feedItemsCollection = 'feed_items';
        this.interactionsCollection = 'feed_interactions';
    }
    async saveFeed(feed) {
        try {
            const feedData = this.feedToFirestore(feed);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.feedsCollection, feed.userId.id);
            await (0, firestore_1.setDoc)(docRef, feedData, { merge: true });
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to save feed: ${error}`);
        }
    }
    async findByUserId(userId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.feedsCollection, userId.id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                // Create default feed for new user
                const defaultFeedResult = domain_1.Feed.create(userId);
                if (defaultFeedResult.isFailure) {
                    return domain_1.Result.fail(defaultFeedResult.error);
                }
                const defaultFeed = defaultFeedResult.getValue();
                await this.saveFeed(defaultFeed);
                return domain_1.Result.ok(defaultFeed);
            }
            const firestoreData = docSnap.data();
            const feed = this.firestoreToFeed(firestoreData);
            return domain_1.Result.ok(feed);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find feed by user ID: ${error}`);
        }
    }
    async getFeedContent(userId, userSpaces, userConnections, limitCount = 20) {
        try {
            // Get user's feed configuration
            const feedResult = await this.findByUserId(userId);
            if (feedResult.isFailure) {
                return domain_1.Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            const spaceIds = userSpaces.map(s => s.id);
            const connectionIds = userConnections.map(c => c.id);
            // Build compound query for feed items
            // In production, this would use composite indexes for better performance
            const feedItemsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('score', 'desc'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount * 2) // Get more to filter
            );
            const snapshot = await (0, firestore_1.getDocs)(feedItemsQuery);
            const allItems = [];
            for (const doc of snapshot.docs) {
                const data = doc.data();
                // Apply feed filtering
                // TODO: Implement preference-based filtering when preferences are added to domain
                // Apply user context filtering (spaces and connections)
                if (!this.isRelevantToUser(data, spaceIds, connectionIds)) {
                    continue;
                }
                const feedItem = this.firestoreToFeedItem(data);
                allItems.push(feedItem);
            }
            // Sort by relevance scores and limit
            const sortedItems = allItems
                .sort((a, b) => b.relevanceScore.score - a.relevanceScore.score)
                .slice(0, limitCount);
            return domain_1.Result.ok(sortedItems);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get feed content: ${error}`);
        }
    }
    async getTrendingContent(campusId, limitCount = 20) {
        try {
            // Get items with high trending boost scores
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('algorithmFactors.trendingBoost', '>', 0.5), (0, firestore_1.orderBy)('algorithmFactors.trendingBoost', 'desc'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => {
                const data = doc.data();
                return this.firestoreToFeedItem(data);
            });
            return domain_1.Result.ok(items);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get trending content: ${error}`);
        }
    }
    async getEventContent(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('type', '==', 'event'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => {
                const data = doc.data();
                return this.firestoreToFeedItem(data);
            });
            return domain_1.Result.ok(items);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get event content: ${error}`);
        }
    }
    async getRitualContent(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('type', '==', 'ritual'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('score', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const items = snapshot.docs.map(doc => {
                const data = doc.data();
                return this.firestoreToFeedItem(data);
            });
            return domain_1.Result.ok(items);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get ritual content: ${error}`);
        }
    }
    async recordInteraction(userId, itemId, interactionType, metadata) {
        try {
            const interactionData = {
                userId: userId.id,
                itemId,
                interactionType,
                metadata: metadata || {},
                timestamp: firestore_1.Timestamp.now(),
                campusId: 'ub-buffalo'
            };
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.interactionsCollection, `${userId.id}_${itemId}_${Date.now()}`);
            await (0, firestore_1.setDoc)(docRef, interactionData);
            // Update engagement count on the feed item
            await this.updateEngagementCount(itemId, interactionType);
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to record interaction: ${error}`);
        }
    }
    subscribeToFeed(userId, callback) {
        // Subscribe to feed items that are relevant to this user
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.feedItemsCollection), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(50));
        return (0, firestore_1.onSnapshot)(q, async (snapshot) => {
            try {
                // Get user's feed preferences and connections
                const feedResult = await this.findByUserId(userId);
                if (feedResult.isFailure) {
                    callback([]);
                    return;
                }
                const feed = feedResult.getValue();
                const items = [];
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    // Apply basic filtering
                    if (this.shouldIncludeItem(data, null)) {
                        const feedItem = this.firestoreToFeedItem(data);
                        const scoredItem = feedItem; // TODO: Implement scoring when methods are added to domain
                        items.push(scoredItem);
                    }
                });
                // Sort by score and return
                const sortedItems = items
                    .sort((a, b) => b.toData().score - a.toData().score)
                    .slice(0, 20);
                callback(sortedItems);
            }
            catch (error) {
                console.error('Error in feed subscription:', error);
                callback([]);
            }
        });
    }
    // Helper methods
    async updateEngagementCount(itemId, interactionType) {
        try {
            const itemRef = (0, firestore_1.doc)(firebase_1.db, this.feedItemsCollection, itemId);
            const itemSnap = await (0, firestore_1.getDoc)(itemRef);
            if (itemSnap.exists()) {
                const data = itemSnap.data();
                const updates = {
                    updatedAt: firestore_1.Timestamp.now()
                };
                switch (interactionType) {
                    case 'view':
                        updates.viewCount = (data.viewCount || 0) + 1;
                        break;
                    case 'like':
                    case 'comment':
                    case 'react':
                        updates.engagementCount = (data.engagementCount || 0) + 1;
                        break;
                    case 'share':
                        updates.shareCount = (data.shareCount || 0) + 1;
                        break;
                }
                await (0, firestore_1.setDoc)(itemRef, updates, { merge: true });
            }
        }
        catch (error) {
            console.error('Failed to update engagement count:', error);
        }
    }
    shouldIncludeItem(item, preferences) {
        switch (item.type) {
            case 'space_post':
                return preferences.showSpacePosts;
            case 'rss_post':
                return preferences.showRSSPosts;
            case 'connection_activity':
                return preferences.showConnectionActivity;
            case 'event':
                return preferences.showEventPosts;
            case 'ritual':
                return preferences.showRitualPosts;
            default:
                return true;
        }
    }
    isRelevantToUser(item, userSpaceIds, userConnectionIds) {
        // Check if item is from user's spaces
        if (item.spaceId && userSpaceIds.includes(item.spaceId)) {
            return true;
        }
        // Check if item is from user's connections
        if (item.authorId && userConnectionIds.includes(item.authorId)) {
            return true;
        }
        // Check if item is public/trending content
        if (item.algorithmFactors.trendingBoost > 0.7) {
            return true;
        }
        return false;
    }
    feedToFirestore(feed) {
        const data = feed.toData();
        return {
            userId: data.userId.id,
            algorithm: {
                recency: data.algorithm.recency,
                engagement: data.algorithm.engagement,
                socialProximity: data.algorithm.socialProximity,
                spaceRelevance: data.algorithm.spaceRelevance,
                trendingBoost: data.algorithm.trendingBoost,
            },
            preferences: {
                showSpacePosts: true,
                showRSSPosts: true,
                showConnectionActivity: true,
                showEventPosts: true,
                showRitualPosts: true,
            },
            lastUpdated: firestore_1.Timestamp.fromDate(data.lastUpdated),
            campusId: 'ub-buffalo'
        };
    }
    firestoreToFeed(data) {
        const feedData = {
            userId: domain_1.ProfileId.create(data.userId).getValue(),
            algorithm: {
                recency: data.algorithm.recency,
                engagement: data.algorithm.engagement,
                socialProximity: data.algorithm.socialProximity,
                spaceRelevance: data.algorithm.spaceRelevance,
                trendingBoost: data.algorithm.trendingBoost,
            },
            lastUpdated: data.lastUpdated.toDate(),
        };
        return domain_1.Feed.fromData(feedData);
    }
    firestoreToFeedItem(data) {
        // Import necessary value objects inline to avoid circular deps
        const FeedItemId = require('../../domain/feed/value-objects').FeedItemId;
        const ContentSource = require('../../domain/feed/value-objects').ContentSource;
        const RelevanceScore = require('../../domain/feed/value-objects').RelevanceScore;
        const feedItem = {
            id: FeedItemId.create(data.id).getValue(),
            source: ContentSource.create(data.type === 'space_post' ? 'space' :
                data.type === 'rss_post' ? 'rss' :
                    data.type === 'event' ? 'event' : 'ritual').getValue(),
            content: {
                title: data.title,
                text: data.content?.text || '',
                mediaUrls: [data.imageUrl].filter(Boolean),
                authorId: domain_1.ProfileId.create(data.authorId || 'unknown').getValue(),
                authorName: data.content?.authorName || 'Unknown',
                authorPhoto: data.content?.authorPhoto
            },
            relevanceScore: RelevanceScore.create(Math.min(1, data.score || 0.5)).getValue(),
            createdAt: data.createdAt.toDate(),
            interactions: [], // TODO: Map reactions to interactions
            isVisible: true,
            isTrending: data.algorithmFactors?.trendingBoost > 0.5,
        };
        return feedItem;
    }
}
exports.FirebaseFeedRepository = FirebaseFeedRepository;
//# sourceMappingURL=feed.repository.js.map