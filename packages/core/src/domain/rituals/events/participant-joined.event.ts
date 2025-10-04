import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ParticipantJoinedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly profileId: string,
    public readonly participantCount: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ParticipantJoined';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      profileId: this.profileId,
      participantCount: this.participantCount
    };
  }
}
