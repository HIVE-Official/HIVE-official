import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class RitualActivatedEvent extends DomainEvent {
    constructor(aggregateId: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=ritual-activated.event.d.ts.map