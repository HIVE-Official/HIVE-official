import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class PostCreatedEvent extends DomainEvent {
    readonly postId: string;
    readonly authorId: string;
    readonly postCount: number;
    constructor(aggregateId: string, postId: string, authorId: string, postCount: number);
    getEventName(): string;
}
//# sourceMappingURL=post-created.event.d.ts.map