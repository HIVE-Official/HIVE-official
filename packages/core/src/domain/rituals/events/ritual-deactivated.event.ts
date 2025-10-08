import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class RitualDeactivatedEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'RitualDeactivated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt
    };
  }
}
