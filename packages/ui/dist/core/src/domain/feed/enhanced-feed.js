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