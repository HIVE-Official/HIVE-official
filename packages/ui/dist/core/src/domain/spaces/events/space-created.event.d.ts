import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class SpaceCreatedEvent extends DomainEvent {
    readonly name: string;
    readonly category: string;
    readonly createdBy: string;
    constructor(aggregateId: string, name: string, category: string, createdBy: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=space-created.event.d.ts.map