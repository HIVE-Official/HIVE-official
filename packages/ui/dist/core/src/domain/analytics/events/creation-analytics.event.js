/**
 * Creation Analytics Event
 * Domain event for creation-related analytics
 */
export class CreationAnalyticsEventEntity {
    constructor(data) {
        this.eventId = data.eventId || crypto.randomUUID();
        this.eventType = data.eventType;
        this.userId = data.userId;
        this.userIdHash = data.userIdHash;
        this.sessionId = data.sessionId;
        this.timestamp = data.timestamp || new Date();
        this.toolId = data.toolId;
        this.elementId = data.elementId;
        this.spaceId = data.spaceId;
        this.anonymized = data.anonymized;
        this.metadata = data.metadata;
    }
    static create(eventType, context) {
        return new CreationAnalyticsEventEntity({
            eventId: crypto.randomUUID(),
            eventType,
            timestamp: new Date(),
            sessionId: context.sessionId || crypto.randomUUID(),
            ...context,
        });
    }
    isBuilderEvent() {
        return this.eventType.includes('builder_') ||
            this.eventType.includes('element_') ||
            this.eventType.includes('canvas_');
    }
    isToolLifecycleEvent() {
        return this.eventType.includes('tool_');
    }
    anonymize() {
        return new CreationAnalyticsEventEntity({
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
        return new CreationAnalyticsEventEntity({
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
            toolId: this.toolId,
            elementId: this.elementId,
            spaceId: this.spaceId,
            anonymized: this.anonymized,
            metadata: this.metadata,
        };
    }
}
//# sourceMappingURL=creation-analytics.event.js.map