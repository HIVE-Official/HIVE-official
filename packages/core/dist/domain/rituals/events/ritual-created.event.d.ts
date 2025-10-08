import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class RitualCreatedEvent extends DomainEvent {
    readonly name: string;
    readonly type: string;
    readonly createdBy: string;
    constructor(aggregateId: string, name: string, type: string, createdBy: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=ritual-created.event.d.ts.map