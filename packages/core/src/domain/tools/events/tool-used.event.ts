/**
 * ToolUsedEvent
 * Fired when a tool is used by a student
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolUsedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly toolName: string,
    public readonly userId: string,
    public readonly totalUses: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolUsed';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      toolName: this.toolName,
      userId: this.userId,
      totalUses: this.totalUses
    };
  }
}
