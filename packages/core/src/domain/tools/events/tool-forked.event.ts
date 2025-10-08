/**
 * ToolForkedEvent
 * Fired when a tool is forked by another user
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolForkedEvent extends DomainEvent {
  constructor(
    aggregateId: string,           // Original tool ID
    public readonly forkedToolId: string,
    public readonly forkedBy: string,
    public readonly totalForks: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolForked';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      forkedToolId: this.forkedToolId,
      forkedBy: this.forkedBy,
      totalForks: this.totalForks
    };
  }
}
