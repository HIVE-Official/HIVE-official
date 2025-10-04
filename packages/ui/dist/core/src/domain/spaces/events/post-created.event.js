import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class PostCreatedEvent extends DomainEvent {
    constructor(aggregateId, postId, authorId, postCount) {
        super(aggregateId);
        this.postId = postId;
        this.authorId = authorId;
        this.postCount = postCount;
    }
    getEventName() {
        return 'PostCreated';
    }
    toData() {
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
//# sourceMappingURL=post-created.event.js.map