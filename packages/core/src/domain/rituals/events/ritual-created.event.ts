import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class RitualCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly name: string,
    public readonly type: string,
    public readonly createdBy: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'RitualCreated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      name: this.name,
      type: this.type,
      createdBy: this.createdBy
    };
  }
}
