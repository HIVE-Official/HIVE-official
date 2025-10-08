/**
 * EnhancedFeed Aggregate
 * Represents a personalized feed for a user
 */
import { AggregateRoot } from '../shared/base/AggregateRoot.base';
import { Result } from '../shared/base/Result';
import { FeedId } from './value-objects/feed-id.value';
import { CampusId } from '../profile/value-objects/campus-id.value';
export class EnhancedFeed extends AggregateRoot {
    get feedId() {
        return this.props.feedId;
    }
    get userId() {
        return this.props.userId;
    }
    get campusId() {
        return this.props.campusId;
    }
    get items() {
        return this.props.items;
    }
    get itemCount() {
        return this.props.items.length;
    }
    get lastUpdated() {
        return this.props.lastUpdated;
    }
    constructor(props, id) {
        super(props, id || `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(userId, campusId, id) {
        const feedIdResult = FeedId.createForUser(userId.value, campusId.value);
        if (feedIdResult.isFailure) {
            return Result.fail(feedIdResult.error || 'Failed to create feed ID');
        }
        const feedProps = {
            feedId: feedIdResult.getValue(),
            userId,
            campusId,
            items: [],
            filters: [{ type: 'all' }],
            lastUpdated: new Date(),
            lastRefresh: new Date(),
            isActive: true
        };
        return Result.ok(new EnhancedFeed(feedProps, id));
    }
    static createWithCampus(userId, campusId) {
        const campusIdResult = CampusId.create(campusId);
        if (campusIdResult.isFailure) {
            return Result.fail(campusIdResult.error || 'Invalid campus ID');
        }
        return EnhancedFeed.create(userId, campusIdResult.getValue());
    }
    addItem(item) {
        // Check if item already exists
        if (this.props.items.some(i => i.itemId.value === item.itemId.value)) {
            return Result.fail('Item already exists in feed');
        }
        // Remove oldest items if at max capacity
        if (this.props.items.length >= EnhancedFeed.MAX_ITEMS) {
            this.removeOldestItems(1);
        }
        this.props.items.push(item);
        this.sortItems();
        this.props.lastUpdated = new Date();
        return Result.ok();
    }
    addItems(items) {
        // Filter out duplicates
        const newItems = items.filter(item => !this.props.items.some(i => i.itemId.value === item.itemId.value));
        if (newItems.length === 0) {
            return Result.ok();
        }
        // Remove old items if necessary
        const totalItems = this.props.items.length + newItems.length;
        if (totalItems > EnhancedFeed.MAX_ITEMS) {
            const toRemove = totalItems - EnhancedFeed.MAX_ITEMS;
            this.removeOldestItems(toRemove);
        }
        this.props.items.push(...newItems);
        this.sortItems();
        this.props.lastUpdated = new Date();
        return Result.ok();
    }
    removeItem(itemId) {
        const index = this.props.items.findIndex(i => i.itemId.value === itemId);
        if (index === -1) {
            return Result.fail('Item not found in feed');
        }
        this.props.items.splice(index, 1);
        this.props.lastUpdated = new Date();
        return Result.ok();
    }
    applyFilter(filter) {
        this.props.filters = [filter];
        this.props.lastUpdated = new Date();
    }
    addFilter(filter) {
        if (!this.props.filters.some(f => f.type === filter.type)) {
            this.props.filters.push(filter);
            this.props.lastUpdated = new Date();
        }
    }
    clearFilters() {
        this.props.filters = [{ type: 'all' }];
        this.props.lastUpdated = new Date();
    }
    getFilteredItems() {
        if (this.props.filters.length === 0 ||
            (this.props.filters.length === 1 && this.props.filters[0].type === 'all')) {
            return this.props.items;
        }
        return this.props.items.filter(item => {
            return this.props.filters.some(filter => {
                switch (filter.type) {
                    case 'spaces':
                        return item.source.type === 'space';
                    case 'rituals':
                        return item.source.type === 'ritual';
                    case 'events':
                        return item.source.type === 'event';
                    case 'trending':
                        return item.isTrending;
                    default:
                        return true;
                }
            });
        });
    }
    getCampusItems() {
        // All items are already campus-filtered
        return this.getFilteredItems();
    }
    needsRefresh() {
        const now = Date.now();
        const lastRefresh = this.props.lastRefresh.getTime();
        return (now - lastRefresh) > EnhancedFeed.REFRESH_INTERVAL_MS;
    }
    markRefreshed() {
        this.props.lastRefresh = new Date();
    }
    deactivate() {
        this.props.isActive = false;
    }
    activate() {
        this.props.isActive = true;
    }
    removeOldestItems(count) {
        // Sort by relevance and creation date
        const sorted = [...this.props.items].sort((a, b) => {
            // Keep pinned items
            if (a.props.isPinned && !b.props.isPinned)
                return -1;
            if (!a.props.isPinned && b.props.isPinned)
                return 1;
            // Then by relevance
            if (a.relevanceScore !== b.relevanceScore) {
                return a.relevanceScore - b.relevanceScore;
            }
            // Then by age
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
        const toRemove = sorted.slice(0, count);
        this.props.items = this.props.items.filter(item => !toRemove.some(r => r.itemId.value === item.itemId.value));
    }
    sortItems() {
        this.props.items.sort((a, b) => {
            // Pinned items first
            if (a.props.isPinned && !b.props.isPinned)
                return -1;
            if (!a.props.isPinned && b.props.isPinned)
                return 1;
            // Then by relevance score
            if (a.relevanceScore !== b.relevanceScore) {
                return b.relevanceScore - a.relevanceScore;
            }
            // Then by creation date (newest first)
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
    updatePreferences(preferences) {
        // Update feed preferences (algorithm weights, content types, etc.)
        this.props.lastUpdated = new Date();
    }
    adjustAlgorithmWeights(adjustments) {
        // Adjust algorithm weights based on user engagement
        this.props.lastUpdated = new Date();
    }
    /**
     * Business Logic: Apply content filtering based on user options
     * Moved from FeedGenerationService
     */
    applyContentFilters(items, options) {
        return items.filter(item => {
            const itemData = item.toData ? item.toData() : item;
            if (options.includeSpacePosts === false && itemData.type === 'space_post') {
                return false;
            }
            if (options.includeRSSPosts === false && itemData.type === 'rss_post') {
                return false;
            }
            if (options.includeConnectionActivity === false && itemData.type === 'connection_activity') {
                return false;
            }
            if (options.includeEvents === false && itemData.type === 'event') {
                return false;
            }
            if (options.includeRituals === false && itemData.type === 'ritual') {
                return false;
            }
            return true;
        });
    }
    /**
     * Business Logic: Generate feed insights from current items
     * Moved from FeedGenerationService
     */
    generateInsights(items) {
        if (items.length === 0) {
            return {
                primaryContentType: 'none',
                engagementRate: 0,
                averageScore: 0,
                topSpaces: [],
                suggestedAdjustments: ['Follow more spaces to see content']
            };
        }
        // Analyze content types
        const typeCounts = new Map();
        let totalEngagement = 0;
        let totalScore = 0;
        const spaceCounts = new Map();
        items.forEach(item => {
            const data = item.toData ? item.toData() : item;
            typeCounts.set(data.type, (typeCounts.get(data.type) || 0) + 1);
            totalEngagement += data.engagementCount;
            totalScore += data.score;
            if (data.spaceId) {
                spaceCounts.set(data.spaceId.id, (spaceCounts.get(data.spaceId.id) || 0) + 1);
            }
        });
        // Find primary content type
        const primaryContentType = Array.from(typeCounts.entries())
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'mixed';
        // Calculate engagement rate
        const engagementRate = items.length > 0
            ? totalEngagement / items.length
            : 0;
        // Calculate average score
        const averageScore = items.length > 0
            ? totalScore / items.length
            : 0;
        // Get top spaces
        const topSpaces = Array.from(spaceCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([spaceId]) => spaceId);
        // Generate suggestions based on analysis
        const suggestedAdjustments = this.getSuggestedAdjustments(primaryContentType, engagementRate, averageScore);
        return {
            primaryContentType,
            engagementRate,
            averageScore,
            topSpaces,
            suggestedAdjustments
        };
    }
    /**
     * Business Logic: Generate algorithm adjustment suggestions
     * Moved from FeedGenerationService
     */
    getSuggestedAdjustments(primaryContentType, engagementRate, averageScore) {
        const suggestions = [];
        const feedData = this.toData();
        // Low engagement suggestions
        if (engagementRate < 1) {
            suggestions.push('Your feed has low engagement. Try following more active spaces.');
        }
        // Content diversity suggestions
        if (primaryContentType === 'space_post' && feedData.algorithm?.spaceRelevance > 0.5) {
            suggestions.push('Your feed is heavily focused on space posts. Consider adjusting to see more diverse content.');
        }
        // Score optimization suggestions
        if (averageScore < 0.5) {
            suggestions.push('Feed content scores are low. The algorithm is learning your preferences.');
        }
        // Algorithm weight suggestions
        if (feedData.algorithm?.recency > 0.5) {
            suggestions.push('Your feed prioritizes recent content. Consider balancing with engagement metrics.');
        }
        if (suggestions.length === 0) {
            suggestions.push('Your feed is well-balanced!');
        }
        return suggestions;
    }
    /**
     * Business Logic: Adjust algorithm weights based on user feedback
     * Moved from FeedGenerationService
     */
    adjustWeightsFromFeedback(feedback, itemType) {
        // Adjust algorithm weights based on feedback
        // This is a simplified version - production would use ML
        const adjustment = feedback === 'positive' ? 0.01 : -0.01;
        this.adjustAlgorithmWeights({
            recency: adjustment * 0.5,
            engagement: adjustment * 1.5,
            socialProximity: adjustment * 1.0,
            spaceRelevance: adjustment * 0.8,
            trendingBoost: adjustment * 0.3
        });
    }
    toData() {
        return {
            id: this.id,
            feedId: this.props.feedId.value,
            userId: this.props.userId.value,
            campusId: this.props.campusId.value,
            items: this.props.items.map(item => item.toData()),
            itemCount: this.itemCount,
            filters: this.props.filters,
            lastUpdated: this.props.lastUpdated,
            lastRefresh: this.props.lastRefresh,
            isActive: this.props.isActive
        };
    }
}
EnhancedFeed.MAX_ITEMS = 100;
EnhancedFeed.REFRESH_INTERVAL_MS = 30000; // 30 seconds
//# sourceMappingURL=enhanced-feed.js.map