import { DomainEvent } from '../../shared/domain-event';
export interface RitualDeletedPayload {
    ritualId: string;
    campusId: string;
    archetype?: string;
}
export declare class RitualDeletedEvent extends DomainEvent {
    readonly payload: RitualDeletedPayload;
    constructor(payload: RitualDeletedPayload);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    get data(): RitualDeletedPayload;
    protected getPayload(): Record<string, unknown>;
}
//# sourceMappingURL=ritual-deleted.event.d.ts.map