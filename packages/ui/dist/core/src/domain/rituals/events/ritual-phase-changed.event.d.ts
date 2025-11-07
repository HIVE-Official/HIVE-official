import { DomainEvent } from '../../shared/domain-event';
import type { RitualPhase } from '../archetypes';
export interface RitualPhaseChangedPayload {
    ritualId: string;
    campusId: string;
    fromPhase: RitualPhase;
    toPhase: RitualPhase;
    archetype: string;
    reason?: string;
}
export declare class RitualPhaseChangedEvent extends DomainEvent {
    readonly payload: RitualPhaseChangedPayload;
    constructor(payload: RitualPhaseChangedPayload);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    get data(): RitualPhaseChangedPayload;
    protected getPayload(): Record<string, unknown>;
}
//# sourceMappingURL=ritual-phase-changed.event.d.ts.map