import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class MilestoneCompletedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly milestoneId: string,
    public readonly milestoneName: string,
    public readonly rewards: Array<{ type: string; value: string | number; description: string }>
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'MilestoneCompleted';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      milestoneId: this.milestoneId,
      milestoneName: this.milestoneName,
      rewards: this.rewards
    };
  }
}
