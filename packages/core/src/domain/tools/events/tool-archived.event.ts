/**
 * ToolArchivedEvent
 * Fired when a tool is archived and removed from active use
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolArchivedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly toolName: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolArchived';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      toolName: this.toolName
    };
  }
}
