"use strict";
/**
 * Feed Domain Value Objects
 * Based on SPEC.md feed requirements - read-only discovery layer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedInteraction = exports.TimeWindow = exports.RelevanceScore = exports.FeedFilter = exports.ContentSource = exports.FeedItemId = exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error('Cannot get value from failed result');
        }
        return this._value;
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
}
exports.Result = Result;
/**
 * Feed Item ID
 */
class FeedItemId {
    constructor(value) {
        this.value = value;
    }
    static create(id) {
        if (!id || id.trim().length === 0) {
            return Result.fail('Feed item ID cannot be empty');
        }
        return Result.ok(new FeedItemId(id));
    }
    static generate() {
        const id = `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return new FeedItemId(id);
    }
    get id() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.FeedItemId = FeedItemId;
class ContentSource {
    constructor(sourceType, sourceId, spaceName) {
        this.sourceType = sourceType;
        this.sourceId = sourceId;
        this.spaceName = spaceName;
    }
    static create(sourceType, sourceId, spaceName) {
        if (!sourceId || sourceId.trim().length === 0) {
            return Result.fail('Source ID cannot be empty');
        }
        return Result.ok(new ContentSource(sourceType, sourceId, spaceName));
    }
    get type() {
        return this.sourceType;
    }
    get id() {
        return this.sourceId;
    }
    get spaceId() {
        return this.sourceId; // For space posts, sourceId is the spaceId
    }
    get name() {
        return this.spaceName;
    }
    isFromSpace() {
        return this.sourceType === 'space_post';
    }
    isEvent() {
        return this.sourceType === 'event';
    }
}
exports.ContentSource = ContentSource;
class FeedFilter {
    constructor(filterType) {
        this.filterType = filterType;
    }
    static create(filterType) {
        const validFilters = ['all', 'my_spaces', 'trending', 'events', 'rituals'];
        if (!validFilters.includes(filterType)) {
            return Result.fail('Invalid feed filter type');
        }
        return Result.ok(new FeedFilter(filterType));
    }
    static all() {
        return new FeedFilter('all');
    }
    static mySpaces() {
        return new FeedFilter('my_spaces');
    }
    static trending() {
        return new FeedFilter('trending');
    }
    static events() {
        return new FeedFilter('events');
    }
    static rituals() {
        return new FeedFilter('rituals');
    }
    get type() {
        return this.filterType;
    }
    equals(other) {
        return this.filterType === other.filterType;
    }
}
exports.FeedFilter = FeedFilter;
/**
 * Relevance Score for feed algorithm
 * SPEC: Based on recency, engagement, social proximity, etc.
 */
class RelevanceScore {
    constructor(value) {
        this.value = value;
    }
    static create(score) {
        if (score < 0) {
            return Result.fail('Relevance score cannot be negative');
        }
        if (score > 1) {
            return Result.fail('Relevance score cannot exceed 1.0');
        }
        return Result.ok(new RelevanceScore(score));
    }
    static zero() {
        return new RelevanceScore(0);
    }
    static max() {
        return new RelevanceScore(1);
    }
    get score() {
        return this.value;
    }
    isHighlyRelevant() {
        return this.value >= 0.7;
    }
    isRelevant() {
        return this.value >= 0.3;
    }
    compareTo(other) {
        return this.value - other.value;
    }
}
exports.RelevanceScore = RelevanceScore;
/**
 * Time Window for filtering content
 */
class TimeWindow {
    constructor(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
    static create(startTime, endTime) {
        if (startTime >= endTime) {
            return Result.fail('Start time must be before end time');
        }
        return Result.ok(new TimeWindow(startTime, endTime));
    }
    static last24Hours() {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return new TimeWindow(yesterday, now);
    }
    static lastWeek() {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return new TimeWindow(weekAgo, now);
    }
    static today() {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return new TimeWindow(startOfDay, now);
    }
    get start() {
        return this.startTime;
    }
    get end() {
        return this.endTime;
    }
    contains(date) {
        return date >= this.startTime && date <= this.endTime;
    }
    getDurationHours() {
        return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    }
}
exports.TimeWindow = TimeWindow;
class FeedInteraction {
    constructor(interactionType, userId, _timestamp, metadata) {
        this.interactionType = interactionType;
        this.userId = userId;
        this._timestamp = _timestamp;
        this.metadata = metadata;
    }
    static create(interactionType, userId, metadata) {
        const validInteractions = ['view', 'react', 'repost', 'requote', 'hide'];
        if (!validInteractions.includes(interactionType)) {
            return Result.fail('Invalid interaction type');
        }
        if (!userId || userId.trim().length === 0) {
            return Result.fail('User ID cannot be empty');
        }
        return Result.ok(new FeedInteraction(interactionType, userId, new Date(), metadata));
    }
    get type() {
        return this.interactionType;
    }
    get user() {
        return this.userId;
    }
    get timestamp() {
        return this._timestamp;
    }
    get data() {
        return this.metadata;
    }
    isEngagement() {
        return ['react', 'repost', 'requote'].includes(this.interactionType);
    }
    isNegative() {
        return this.interactionType === 'hide';
    }
}
exports.FeedInteraction = FeedInteraction;
//# sourceMappingURL=value-objects.js.map