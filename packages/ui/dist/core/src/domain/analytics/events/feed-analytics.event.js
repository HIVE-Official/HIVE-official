/**
 * Feed Analytics Event
 * Domain event for feed-related analytics
 */
export class FeedAnalyticsEventEntity {
    constructor(data) {
        this.eventId = data.eventId || crypto.randomUUID();
        this.eventType = data.eventType;
        this.userId = data.userId;
        this.userIdHash = data.userIdHash;
        this.sessionId = data.sessionId;
        this.timestamp = data.timestamp || new Date();
        this.postId = data.postId;
        this.spaceId = data.spaceId;
        this.anonymized = data.anonymized;
        this.metadata = data.metadata;
    }
    static create(eventType, context) {
        return new FeedAnalyticsEventEntity({
            eventId: crypto.randomUUID(),
            eventType,
            timestamp: new Date(),
            sessionId: context.sessionId || crypto.randomUUID(),
            spaceId: context.spaceId,
            userId: context.userId,
            userIdHash: context.userIdHash,
            postId: context.postId,
            anonymized: context.anonymized,
            metadata: context.metadata,
        });
    }
    isPostEvent() {
        return this.eventType.startsWith('post_');
    }
    isSpaceEvent() {
        return this.eventType.startsWith('space_');
    }
    isBuilderEvent() {
        return this.eventType === 'builder_action';
    }
    anonymize() {
        return new FeedAnalyticsEventEntity({
            ...this,
            userId: undefined,
            userIdHash: undefined,
            anonymized: true,
            metadata: {
                ...this.metadata,
                userId: undefined,
                userIdHash: undefined,
            },
        });
    }
    withMetadata(metadata) {
        return new FeedAnalyticsEventEntity({
            ...this,
            metadata: { ...this.metadata, ...metadata },
        });
    }
    toJSON() {
        return {
            eventId: this.eventId,
            eventType: this.eventType,
            userId: this.userId,
            userIdHash: this.userIdHash,
            sessionId: this.sessionId,
            timestamp: this.timestamp,
            postId: this.postId,
            spaceId: this.spaceId,
            anonymized: this.anonymized,
            metadata: this.metadata,
        };
    }
}
//# sourceMappingURL=feed-analytics.event.js.map