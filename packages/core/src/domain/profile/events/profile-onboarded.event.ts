import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ProfileOnboardedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly campusId: string,
    public readonly interests: string[]
  ) {
    super(aggregateId);
  }

  get eventType(): string {
    return this.getEventName();
  }

  getEventName(): string {
    return 'ProfileOnboarded';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      campusId: this.campusId,
      interests: this.interests
    };
  }
}