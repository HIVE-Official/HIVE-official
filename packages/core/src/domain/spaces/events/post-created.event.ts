import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class PostCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly postId: string,
    public readonly authorId: string,
    public readonly postCount: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'PostCreated';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      postId: this.postId,
      authorId: this.authorId,
      postCount: this.postCount
    };
  }
}
