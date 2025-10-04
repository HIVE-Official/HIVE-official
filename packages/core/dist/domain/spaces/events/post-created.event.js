"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class PostCreatedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.PostCreatedEvent = PostCreatedEvent;
//# sourceMappingURL=post-created.event.js.map