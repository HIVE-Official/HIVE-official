/**
 * Creation Analytics Event
 * Domain event for creation-related analytics
 */

import { CreationAnalyticsEvent, CreationEventType } from '../types';

export class CreationAnalyticsEventEntity implements CreationAnalyticsEvent {
  public readonly eventId: string;
  public readonly eventType: CreationEventType;
  public readonly userId?: string;
  public readonly userIdHash?: string;
  public readonly sessionId: string;
  public readonly timestamp: Date;
  public readonly toolId?: string;
  public readonly elementId?: string;
  public readonly spaceId?: string;
  public readonly anonymized?: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(data: CreationAnalyticsEvent) {
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

  public static create(
    eventType: CreationEventType,
    context: Partial<CreationAnalyticsEvent>
  ): CreationAnalyticsEventEntity {
    return new CreationAnalyticsEventEntity({
      eventId: crypto.randomUUID(),
      eventType,
      timestamp: new Date(),
      sessionId: context.sessionId || crypto.randomUUID(),
      ...context,
    });
  }

  public isBuilderEvent(): boolean {
    return this.eventType.includes('builder_') ||
           this.eventType.includes('element_') ||
           this.eventType.includes('canvas_');
  }

  public isToolLifecycleEvent(): boolean {
    return this.eventType.includes('tool_');
  }

  public anonymize(): CreationAnalyticsEventEntity {
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

  public withMetadata(metadata: Record<string, unknown>): CreationAnalyticsEventEntity {
    return new CreationAnalyticsEventEntity({
      ...this,
      metadata: { ...this.metadata, ...metadata },
    });
  }

  public toJSON(): CreationAnalyticsEvent {
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