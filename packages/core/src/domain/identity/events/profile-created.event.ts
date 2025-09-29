import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ProfileCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email: string,
    public readonly handle: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ProfileCreated';
  }
}