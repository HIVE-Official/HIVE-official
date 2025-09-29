"use strict";
/**
 * Real-time Feed Listener
 * Subscribes to feed updates using Firestore listeners
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedListener = exports.FeedListener = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
class FeedListener {
    constructor() {
        this.listeners = new Map();
        this.feedCache = new Map();
    }
    /**
     * Subscribe to real-time feed updates
     */
    subscribe(options) {
        const listenerId = `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        // Build query based on filters
        const feedQuery = this.buildFeedQuery(options);
        // Set up real-time listener
        const unsubscribe = (0, firestore_1.onSnapshot)(feedQuery, (snapshot) => {
            const updates = [];
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
        }, (error) => {
            console.error('Feed listener error:', error);
            options.onError?.(error);
        });
        this.listeners.set(listenerId, unsubscribe);
        return listenerId;
    }
    /**
     * Subscribe to space-specific feed
     */
    subscribeToSpace(spaceId, options) {
        const listenerId = `space_${spaceId}_${Date.now()}`;
        const spaceQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'spaces', spaceId, 'posts'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(options.limitCount || 50));
        const unsubscribe = (0, firestore_1.onSnapshot)(spaceQuery, (snapshot) => {
            const updates = [];
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                updates.push(this.mapToFeedUpdate(doc.id, data, spaceId));
            });
            this.feedCache.set(listenerId, updates);
            options.onUpdate(updates);
        }, (error) => {
            console.error('Space feed listener error:', error);
            options.onError?.(error);
        });
        this.listeners.set(listenerId, unsubscribe);
        return listenerId;
    }
    /**
     * Subscribe to promoted posts (campus-wide)
     */
    subscribeToPromoted(campusId, options) {
        const listenerId = `promoted_${campusId}_${Date.now()}`;
        const promotedQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'promoted_posts'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('expiresAt', '>', firestore_1.Timestamp.now()), (0, firestore_1.orderBy)('expiresAt', 'desc'), (0, firestore_1.orderBy)('promotedAt', 'desc'), (0, firestore_1.limit)(options.limitCount || 20));
        const unsubscribe = (0, firestore_1.onSnapshot)(promotedQuery, async (snapshot) => {
            const updates = [];
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const feedItem = await this.fetchAndMapPromotedPost(data);
                if (feedItem) {
                    updates.push(feedItem);
                }
            }
            this.feedCache.set(listenerId, updates);
            options.onUpdate(updates);
        }, (error) => {
            console.error('Promoted feed listener error:', error);
            options.onError?.(error);
        });
        this.listeners.set(listenerId, unsubscribe);
        return listenerId;
    }
    /**
     * Subscribe to user's personal feed (based on followed spaces)
     */
    subscribeToUserFeed(userId, campusId, options) {
        const listenerId = `user_${userId}_${Date.now()}`;
        // This would ideally query a pre-computed feed collection
        // For MVP, we'll query recent posts from joined spaces
        const feedQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'feed_items'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('visibility', '==', 'public'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(options.limitCount || 100));
        const unsubscribe = (0, firestore_1.onSnapshot)(feedQuery, (snapshot) => {
            const updates = [];
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                updates.push(this.mapToFeedUpdate(doc.id, data));
            });
            // Sort by relevance score client-side
            updates.sort((a, b) => b.relevanceScore - a.relevanceScore);
            this.feedCache.set(listenerId, updates);
            options.onUpdate(updates);
        }, (error) => {
            console.error('User feed listener error:', error);
            options.onError?.(error);
        });
        this.listeners.set(listenerId, unsubscribe);
        return listenerId;
    }
    /**
     * Unsubscribe from feed updates
     */
    unsubscribe(listenerId) {
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
    unsubscribeAll() {
        this.listeners.forEach((unsubscribe) => unsubscribe());
        this.listeners.clear();
        this.feedCache.clear();
    }
    /**
     * Get cached feed for a listener
     */
    getCachedFeed(listenerId) {
        return this.feedCache.get(listenerId) || [];
    }
    // Private helper methods
    buildFeedQuery(options) {
        const baseCollection = (0, firestore_1.collection)(firebase_1.db, 'feed_items');
        const constraints = [
            (0, firestore_1.where)('campusId', '==', options.campusId),
            (0, firestore_1.orderBy)('createdAt', 'desc')
        ];
        // Add filter-specific constraints
        switch (options.filter) {
            case 'trending':
                constraints.push((0, firestore_1.where)('isTrending', '==', true));
                break;
            case 'events':
                constraints.push((0, firestore_1.where)('type', '==', 'event'));
                break;
            case 'rituals':
                constraints.push((0, firestore_1.where)('type', '==', 'ritual_update'));
                break;
            case 'my_spaces':
                if (options.userId) {
                    // This would need a different approach - query user's spaces first
                    constraints.push((0, firestore_1.where)('visibility', '==', 'public'));
                }
                break;
            default:
                constraints.push((0, firestore_1.where)('visibility', '==', 'public'));
        }
        constraints.push((0, firestore_1.limit)(options.limitCount || 50));
        return (0, firestore_1.query)(baseCollection, ...constraints);
    }
    mapToFeedUpdate(id, data, spaceId) {
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
    async fetchAndMapPromotedPost(promotedData) {
        try {
            // Fetch the actual post data from the space
            const postRef = (0, firestore_1.collection)(firebase_1.db, 'spaces', promotedData.spaceId, 'posts');
            // Implementation would fetch the actual post
            // For now, return mapped promoted data
            return this.mapToFeedUpdate(promotedData.postId, promotedData);
        }
        catch (error) {
            console.error('Error fetching promoted post:', error);
            return null;
        }
    }
    updateCache(listenerId, updates) {
        const existing = this.feedCache.get(listenerId) || [];
        // Merge updates with existing, avoiding duplicates
        const merged = [...existing];
        updates.forEach((update) => {
            const index = merged.findIndex((item) => item.id === update.id);
            if (index >= 0) {
                merged[index] = update; // Update existing
            }
            else {
                merged.unshift(update); // Add new at beginning
            }
        });
        // Keep only the most recent items (limit to 200)
        const trimmed = merged.slice(0, 200);
        this.feedCache.set(listenerId, trimmed);
    }
}
exports.FeedListener = FeedListener;
// Singleton instance for app-wide feed listening
exports.feedListener = new FeedListener();
//# sourceMappingURL=feed-listener.js.map