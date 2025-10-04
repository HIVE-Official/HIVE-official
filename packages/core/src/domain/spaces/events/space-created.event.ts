import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class SpaceCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly name: string,
    public readonly category: string,
    public readonly createdBy: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'SpaceCreated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      name: this.name,
      category: this.category,
      createdBy: this.createdBy
    };
  }
}
