import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class RitualActivatedEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'RitualActivated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt
    };
  }
}
