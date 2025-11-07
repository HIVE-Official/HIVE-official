import type { ApplicationServiceContext } from "../base.service";
import { BaseApplicationService } from "../base.service";
import { Result } from "../../domain/shared/base/Result";
import { EventBus } from "../../domain/shared/domain-event";
import { RitualArchetype, RitualPhase, RitualUnion } from "../../domain/rituals/archetypes";
import type { IRitualConfigRepository } from "../../infrastructure/repositories/interfaces";
export interface UpsertRitualInput extends Omit<RitualUnion, "id" | "createdAt" | "updatedAt"> {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface TransitionOptions {
    reason?: "manual" | "scheduled" | "auto";
    notes?: string;
}
export declare class RitualEngineService extends BaseApplicationService {
    private readonly repository;
    private readonly eventBus;
    constructor(repository?: IRitualConfigRepository, context?: Partial<ApplicationServiceContext>, eventBus?: EventBus);
    getRitual(id: string): Promise<Result<RitualUnion>>;
    getRitualBySlug(slug: string, campusId: string): Promise<Result<RitualUnion>>;
    listRituals(campusId: string, phases?: RitualPhase[]): Promise<Result<RitualUnion[]>>;
    listActiveRituals(campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
    listRitualsByArchetype(campusId: string, archetype: RitualArchetype): Promise<Result<RitualUnion[]>>;
    listActiveRitualsByArchetype(campusId: string, archetype: RitualArchetype, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
    createRitual(input: UpsertRitualInput): Promise<Result<RitualUnion>>;
    updateRitual(id: string, input: Partial<UpsertRitualInput>): Promise<Result<RitualUnion>>;
    deleteRitual(id: string): Promise<Result<void>>;
    transitionPhase(id: string, targetPhase: RitualPhase, options?: TransitionOptions): Promise<Result<RitualUnion>>;
    evaluateScheduledTransitions(campusId: string, referenceDate?: Date): Promise<Result<RitualUnion[]>>;
    private normalizeInput;
    private validatePayload;
    private canTransitionPhase;
    private generateId;
}
//# sourceMappingURL=ritual-engine.service.d.ts.map