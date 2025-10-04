/**
 * ToolCreatedEvent
 * Fired when a new tool is created in HiveLab
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly toolName: string,
    public readonly creatorId: string,
    public readonly spaceId?: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolCreated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      toolName: this.toolName,
      creatorId: this.creatorId,
      spaceId: this.spaceId
    };
  }
}
