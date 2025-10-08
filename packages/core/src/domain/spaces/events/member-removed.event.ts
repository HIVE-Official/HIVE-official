import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class MemberRemovedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly profileId: string,
    public readonly memberCount: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'MemberRemoved';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      profileId: this.profileId,
      memberCount: this.memberCount
    };
  }
}
