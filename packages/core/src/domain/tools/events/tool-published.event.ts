/**
 * ToolPublishedEvent
 * Fired when a tool is published and made available to others
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolPublishedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly toolName: string,
    public readonly visibility: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolPublished';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      toolName: this.toolName,
      visibility: this.visibility
    };
  }
}
