import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class FeedItemsAddedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly campusId: string,
    public readonly itemIds: string[]
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'FeedItemsAdded';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      campusId: this.campusId,
      itemIds: this.itemIds
    };
  }
}
