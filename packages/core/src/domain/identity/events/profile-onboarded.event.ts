import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ProfileOnboardedEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ProfileOnboarded';
  }
}