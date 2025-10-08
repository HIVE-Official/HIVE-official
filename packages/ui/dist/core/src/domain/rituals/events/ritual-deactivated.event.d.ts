import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class RitualDeactivatedEvent extends DomainEvent {
    constructor(aggregateId: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=ritual-deactivated.event.d.ts.map