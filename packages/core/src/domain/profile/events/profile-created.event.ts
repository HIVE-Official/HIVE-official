import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ProfileCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly handle: string,
    public readonly email: string,
    public readonly campusId: string
  ) {
    super(aggregateId);
  }

  get eventType(): string {
    return this.getEventName();
  }

  getEventName(): string {
    return 'ProfileCreated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      handle: this.handle,
      email: this.email,
      campusId: this.campusId
    };
  }
}