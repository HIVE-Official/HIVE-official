import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class MemberRoleUpdatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly profileId: string,
    public readonly oldRole: 'admin' | 'moderator' | 'member',
    public readonly newRole: 'admin' | 'moderator' | 'member'
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'MemberRoleUpdated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      profileId: this.profileId,
      oldRole: this.oldRole,
      newRole: this.newRole
    };
  }
}
