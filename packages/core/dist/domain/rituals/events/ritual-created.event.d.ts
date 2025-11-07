import { DomainEvent } from '../../shared/domain-event';
import type { RitualUnion } from '../archetypes';
export declare class RitualCreatedEvent extends DomainEvent {
    readonly payload: RitualUnion;
    constructor(ritual: RitualUnion);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
//# sourceMappingURL=ritual-created.event.d.ts.map