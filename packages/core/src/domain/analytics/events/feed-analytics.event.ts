/**
 * Feed Analytics Event
 * Domain event for feed-related analytics
 */

import { FeedAnalyticsEvent, FeedEventType } from '../types';

export class FeedAnalyticsEventEntity implements FeedAnalyticsEvent {
  public readonly eventId: string;
  public readonly eventType: FeedEventType;
  public readonly userId?: string;
  public readonly userIdHash?: string;
  public readonly sessionId: string;
  public readonly timestamp: Date;
  public readonly postId?: string;
  public readonly spaceId: string;
  public readonly anonymized?: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(data: FeedAnalyticsEvent) {
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

  public static create(
    eventType: FeedEventType,
    context: Partial<FeedAnalyticsEvent> & { spaceId: string }
  ): FeedAnalyticsEventEntity {
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

  public isPostEvent(): boolean {
    return this.eventType.startsWith('post_');
  }

  public isSpaceEvent(): boolean {
    return this.eventType.startsWith('space_');
  }

  public isBuilderEvent(): boolean {
    return this.eventType === 'builder_action';
  }

  public anonymize(): FeedAnalyticsEventEntity {
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

  public withMetadata(metadata: Record<string, unknown>): FeedAnalyticsEventEntity {
    return new FeedAnalyticsEventEntity({
      ...this,
      metadata: { ...this.metadata, ...metadata },
    });
  }

  public toJSON(): FeedAnalyticsEvent {
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