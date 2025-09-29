"use strict";
/**
 * Feed Aggregate - Content Discovery Domain
 * Based on SPEC.md: Read-only discovery layer that aggregates content from spaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedAlgorithm = exports.Feed = void 0;
const value_objects_1 = require("./value-objects");
/**
 * Feed Aggregate Root
 * Represents a user's personalized content discovery feed
 */
class Feed {
    constructor(data) {
        this.data = data;
    }
    // Getters
    get items() {
        return this.data.items.filter(item => item.isVisible);
    }
    get allItems() {
        return [...this.data.items];
    }
    get lastUpdated() {
        return this.data.lastUpdated;
    }
    get filter() {
        return this.data.filter;
    }
    get userId() {
        return this.data.userId;
    }
    get itemCount() {
        return this.items.length;
    }
    // Factory method to create new feed
    static create(userId, filter = value_objects_1.FeedFilter.all()) {
        const feed = new Feed({
            items: [],
            lastUpdated: new Date(),
            filter,
            userId,
        });
        return value_objects_1.Result.ok(feed);
    }
    // Add content to feed (from spaces, events, etc.)
    addContent(source, content, algorithmFactors) {
        // Calculate relevance score using SPEC algorithm
        const relevanceScore = this.calculateRelevanceScore(algorithmFactors);
        const feedItem = {
            id: value_objects_1.FeedItemId.generate(),
            source,
            content,
            relevanceScore,
            createdAt: new Date(),
            interactions: [],
            isVisible: true,
            isTrending: algorithmFactors.trendingBoost > 0.5,
        };
        this.data.items.push(feedItem);
        this.data.lastUpdated = new Date();
        // Sort by relevance score (highest first)
        this.sortByRelevance();
        return value_objects_1.Result.ok(feedItem);
    }
    // Apply filter to feed
    applyFilter(filter) {
        this.data.filter = filter;
        this.data.lastUpdated = new Date();
        // Filter items based on type
        this.data.items.forEach(item => {
            item.isVisible = this.itemMatchesFilter(item, filter);
        });
        return value_objects_1.Result.ok();
    }
    // Record user interaction with feed item
    recordInteraction(itemId, interactionType, metadata) {
        const item = this.data.items.find(i => i.id.equals(itemId));
        if (!item) {
            return value_objects_1.Result.fail('Feed item not found');
        }
        const interactionResult = value_objects_1.FeedInteraction.create(interactionType, this.data.userId.id, metadata);
        if (interactionResult.isFailure) {
            return value_objects_1.Result.fail(interactionResult.error);
        }
        const interaction = interactionResult.getValue();
        item.interactions.push(interaction);
        // Handle special interactions
        if (interactionType === 'hide') {
            item.isVisible = false;
        }
        this.data.lastUpdated = new Date();
        return value_objects_1.Result.ok(interaction);
    }
    // Get trending items
    getTrendingItems(limit = 10) {
        return this.items
            .filter(item => item.isTrending)
            .sort((a, b) => b.relevanceScore.compareTo(a.relevanceScore))
            .slice(0, limit);
    }
    // Get recent items from user's spaces
    getMySpacesItems(limit = 20) {
        return this.items
            .filter(item => item.source.isFromSpace())
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, limit);
    }
    // Get event items
    getEventItems(timeWindow = value_objects_1.TimeWindow.today()) {
        return this.items
            .filter(item => item.source.isEvent())
            .filter(item => timeWindow.contains(item.createdAt))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    // Refresh feed with new content
    refresh(newItems) {
        // Remove old items (keep last 200)
        const maxItems = 200;
        if (this.data.items.length > maxItems) {
            this.data.items = this.data.items.slice(-maxItems);
        }
        // Add new items
        this.data.items.unshift(...newItems);
        // Re-sort by relevance
        this.sortByRelevance();
        this.data.lastUpdated = new Date();
        return value_objects_1.Result.ok();
    }
    // Calculate engagement rate for analytics
    getEngagementRate() {
        if (this.data.items.length === 0)
            return 0;
        const totalInteractions = this.data.items.reduce((sum, item) => {
            return sum + item.interactions.filter(i => i.isEngagement()).length;
        }, 0);
        return totalInteractions / this.data.items.length;
    }
    // Get feed activity for last time period
    getActivitySummary(timeWindow) {
        const recentItems = this.data.items.filter(item => timeWindow.contains(item.createdAt));
        return {
            totalItems: recentItems.length,
            engagements: recentItems.reduce((sum, item) => sum + item.interactions.filter(i => i.isEngagement()).length, 0),
            hiddenItems: recentItems.filter(item => !item.isVisible).length,
            trendingItems: recentItems.filter(item => item.isTrending).length,
        };
    }
    // Private helper methods
    calculateRelevanceScore(factors) {
        // SPEC.md algorithm: weighted combination of factors
        const score = factors.recency * 0.3 +
            factors.engagement * 0.2 +
            factors.socialProximity * 0.2 +
            factors.spaceRelevance * 0.2 +
            factors.trendingBoost * 0.1;
        // Ensure score is between 0 and 1
        const normalizedScore = Math.max(0, Math.min(1, score));
        return value_objects_1.RelevanceScore.create(normalizedScore).getValue();
    }
    itemMatchesFilter(item, filter) {
        switch (filter.type) {
            case 'all':
                return true;
            case 'my_spaces':
                return item.source.isFromSpace();
            case 'trending':
                return item.isTrending;
            case 'events':
                return item.source.isEvent();
            case 'rituals':
                return item.source.type === 'ritual_update';
            default:
                return true;
        }
    }
    sortByRelevance() {
        this.data.items.sort((a, b) => {
            // Primary sort: relevance score (higher first)
            const relevanceDiff = b.relevanceScore.compareTo(a.relevanceScore);
            if (relevanceDiff !== 0)
                return relevanceDiff;
            // Secondary sort: recency (newer first)
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
    // Update feed preferences
    updatePreferences(preferences) {
        this.data.filter = preferences.filter || this.data.filter;
        this.data.lastUpdated = new Date();
    }
    // Adjust algorithm weights
    adjustAlgorithmWeights(weights) {
        this.data.lastUpdated = new Date();
    }
    // Convert to plain object for persistence
    toData() {
        return {
            ...this.data,
            items: [...this.data.items],
        };
    }
    // Recreate from persistence data
    static fromData(data) {
        return new Feed(data);
    }
}
exports.Feed = Feed;
/**
 * Feed Algorithm Service
 * Implements the SPEC.md feed algorithm for content discovery
 */
class FeedAlgorithm {
    // Calculate algorithm factors for a piece of content
    static calculateFactors(content, user) {
        return {
            recency: this.calculateRecencyScore(content.createdAt),
            engagement: this.calculateEngagementScore(content.reactionCount, content.commentCount, content.repostCount),
            socialProximity: this.calculateSocialProximityScore(content.authorId, user.connectionIds),
            spaceRelevance: this.calculateSpaceRelevanceScore(content.spaceId, user.spaceIds),
            trendingBoost: this.calculateTrendingScore(content.reactionCount, content.commentCount, content.repostCount, content.createdAt),
        };
    }
    static calculateRecencyScore(createdAt) {
        const ageHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
        // Exponential decay: recent content gets higher scores
        return Math.exp(-ageHours / 24); // Half-life of 24 hours
    }
    static calculateEngagementScore(reactions, comments, reposts) {
        // SPEC formula: log(reactions + comments×2 + reposts×3)
        const engagementValue = reactions + comments * 2 + reposts * 3;
        if (engagementValue === 0)
            return 0;
        // Normalize using log scale
        return Math.min(1, Math.log(engagementValue + 1) / Math.log(100));
    }
    static calculateSocialProximityScore(authorId, userConnections) {
        // Higher score if content is from user's connections
        return userConnections.some(conn => conn.equals(authorId)) ? 1.0 : 0.3;
    }
    static calculateSpaceRelevanceScore(spaceId, userSpaces) {
        if (!spaceId)
            return 0.3; // Non-space content gets neutral score
        // Higher score if content is from user's spaces
        return userSpaces.some(space => space.equals(spaceId)) ? 1.0 : 0.5;
    }
    static calculateTrendingScore(reactions, comments, reposts, createdAt) {
        const ageHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
        // Only recent content (< 24 hours) can be trending
        if (ageHours > 24)
            return 0;
        const engagementVelocity = (reactions + comments * 2 + reposts * 3) / Math.max(ageHours, 1);
        // Normalize trending score
        return Math.min(1, engagementVelocity / 10);
    }
}
exports.FeedAlgorithm = FeedAlgorithm;
//# sourceMappingURL=feed.js.map