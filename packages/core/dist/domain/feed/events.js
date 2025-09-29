"use strict";
/**
 * Feed Domain Events
 * Events that occur within the Feed aggregate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedEngagementThresholdReached = exports.FeedFilterChanged = exports.FeedRefreshed = exports.FeedItemBecameTrending = exports.FeedItemInteracted = exports.FeedItemViewed = void 0;
const domain_event_1 = require("../shared/domain-event");
// Feed item viewed by user
class FeedItemViewed extends domain_event_1.DomainEvent {
    constructor(feedId, itemId, userId, viewDurationMs, metadata) {
        super({ ...metadata, userId });
        this.feedId = feedId;
        this.itemId = itemId;
        this.userId = userId;
        this.viewDurationMs = viewDurationMs;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedItemViewed';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            itemId: this.itemId.toString(),
            userId: this.userId,
            viewDurationMs: this.viewDurationMs
        };
    }
}
exports.FeedItemViewed = FeedItemViewed;
// Feed item interacted with (liked, shared, hidden, etc.)
class FeedItemInteracted extends domain_event_1.DomainEvent {
    constructor(feedId, itemId, userId, interactionType, interactionMetadata, metadata) {
        super({ ...metadata, userId });
        this.feedId = feedId;
        this.itemId = itemId;
        this.userId = userId;
        this.interactionType = interactionType;
        this.interactionMetadata = interactionMetadata;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedItemInteracted';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            itemId: this.itemId.toString(),
            userId: this.userId,
            interactionType: this.interactionType,
            interactionMetadata: this.interactionMetadata
        };
    }
}
exports.FeedItemInteracted = FeedItemInteracted;
// Feed item became trending
class FeedItemBecameTrending extends domain_event_1.DomainEvent {
    constructor(feedId, itemId, trendingScore, reason, metadata) {
        super(metadata);
        this.feedId = feedId;
        this.itemId = itemId;
        this.trendingScore = trendingScore;
        this.reason = reason;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedItemBecameTrending';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            itemId: this.itemId.toString(),
            trendingScore: this.trendingScore,
            reason: this.reason
        };
    }
}
exports.FeedItemBecameTrending = FeedItemBecameTrending;
// Feed refreshed with new content
class FeedRefreshed extends domain_event_1.DomainEvent {
    constructor(feedId, userId, itemCount, filterType, metadata) {
        super({ ...metadata, userId });
        this.feedId = feedId;
        this.userId = userId;
        this.itemCount = itemCount;
        this.filterType = filterType;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedRefreshed';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            userId: this.userId,
            itemCount: this.itemCount,
            filterType: this.filterType
        };
    }
}
exports.FeedRefreshed = FeedRefreshed;
// Feed filter changed
class FeedFilterChanged extends domain_event_1.DomainEvent {
    constructor(feedId, userId, oldFilter, newFilter, metadata) {
        super({ ...metadata, userId });
        this.feedId = feedId;
        this.userId = userId;
        this.oldFilter = oldFilter;
        this.newFilter = newFilter;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedFilterChanged';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            userId: this.userId,
            oldFilter: this.oldFilter,
            newFilter: this.newFilter
        };
    }
}
exports.FeedFilterChanged = FeedFilterChanged;
// Feed engagement threshold reached (for analytics)
class FeedEngagementThresholdReached extends domain_event_1.DomainEvent {
    constructor(feedId, userId, engagementRate, threshold, thresholdType, metadata) {
        super({ ...metadata, userId });
        this.feedId = feedId;
        this.userId = userId;
        this.engagementRate = engagementRate;
        this.threshold = threshold;
        this.thresholdType = thresholdType;
    }
    get aggregateId() {
        return this.feedId;
    }
    get eventName() {
        return 'FeedEngagementThresholdReached';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            feedId: this.feedId,
            userId: this.userId,
            engagementRate: this.engagementRate,
            threshold: this.threshold,
            thresholdType: this.thresholdType
        };
    }
}
exports.FeedEngagementThresholdReached = FeedEngagementThresholdReached;
//# sourceMappingURL=events.js.map