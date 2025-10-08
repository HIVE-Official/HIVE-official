import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class MemberJoinedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly profileId: string,
    public readonly role: 'admin' | 'moderator' | 'member',
    public readonly memberCount: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'MemberJoined';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      profileId: this.profileId,
      role: this.role,
      memberCount: this.memberCount
    };
  }
}
