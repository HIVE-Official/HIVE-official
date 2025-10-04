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
}
exports.PostCreatedEvent = PostCreatedEvent;
//# sourceMappingURL=post-created.event.js.map