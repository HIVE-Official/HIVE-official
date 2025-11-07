import { BaseApplicationService } from "../base.service";
import { Result } from "../../domain/shared/base/Result";
import { EventBus } from "../../domain/shared/domain-event";
import { RitualCreatedEvent, RitualDeletedEvent, RitualPhaseChangedEvent, } from "../../domain/rituals/events";
import { parseRitualUnion, } from "../../domain/rituals/archetypes";
import { getRitualConfigRepository } from "../../infrastructure/repositories/factory";
const DEFAULT_VISIBILITY = "public";
export class RitualEngineService extends BaseApplicationService {
    constructor(repository = getRitualConfigRepository(), context, eventBus = new EventBus()) {
        super(context);
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async getRitual(id) {
        return this.repository.findById(id);
    }
    async getRitualBySlug(slug, campusId) {
        return this.repository.findBySlug(slug, campusId);
    }
    async listRituals(campusId, phases) {
        return this.repository.findByCampus(campusId, {
            phases,
        });
    }
    async listActiveRituals(campusId, referenceDate = new Date()) {
        return this.repository.findActive(campusId, referenceDate);
    }
    async listRitualsByArchetype(campusId, archetype) {
        return this.repository.findByArchetype(archetype, campusId);
    }
    async listActiveRitualsByArchetype(campusId, archetype, referenceDate = new Date()) {
        return this.repository.findActiveByArchetype(archetype, campusId, referenceDate);
    }
    async createRitual(input) {
        return this.execute(async () => {
            const nowIso = new Date().toISOString();
            const payload = this.normalizeInput({
                ...input,
                id: input.id ?? this.generateId(),
                createdAt: nowIso,
                updatedAt: nowIso,
            });
            const validated = this.validatePayload(payload);
            if (validated.isFailure) {
                return Result.fail(validated.error);
            }
            const ritual = validated.getValue();
            const saveResult = await this.repository.save(ritual);
            if (saveResult.isFailure) {
                return Result.fail(saveResult.error);
            }
            await this.eventBus.publish(new RitualCreatedEvent(ritual));
            return Result.ok(ritual);
        }, "CreateRitual");
    }
    async updateRitual(id, input) {
        return this.execute(async () => {
            const existingResult = await this.repository.findById(id);
            if (existingResult.isFailure) {
                return Result.fail(existingResult.error);
            }
            const existing = existingResult.getValue();
            const payload = this.normalizeInput({
                ...existing,
                ...input,
                id: existing.id,
                createdAt: existing.createdAt,
                updatedAt: new Date().toISOString(),
            });
            const validated = this.validatePayload(payload);
            if (validated.isFailure) {
                return Result.fail(validated.error);
            }
            const ritual = validated.getValue();
            const saveResult = await this.repository.save(ritual);
            if (saveResult.isFailure) {
                return Result.fail(saveResult.error);
            }
            return Result.ok(ritual);
        }, "UpdateRitual");
    }
    async deleteRitual(id) {
        return this.execute(async () => {
            const existing = await this.repository.findById(id);
            if (existing.isFailure) {
                return Result.fail(existing.error);
            }
            const deleteResult = await this.repository.delete(id);
            if (deleteResult.isFailure) {
                return deleteResult;
            }
            await this.eventBus.publish(new RitualDeletedEvent({
                ritualId: id,
                campusId: existing.getValue().campusId,
                archetype: existing.getValue().archetype,
            }));
            return deleteResult;
        }, "DeleteRitual");
    }
    async transitionPhase(id, targetPhase, options = {}) {
        return this.execute(async () => {
            const currentResult = await this.repository.findById(id);
            if (currentResult.isFailure) {
                return Result.fail(currentResult.error);
            }
            const ritual = currentResult.getValue();
            if (ritual.phase === targetPhase) {
                return Result.ok(ritual);
            }
            const canTransition = this.canTransitionPhase(ritual.phase, targetPhase);
            if (!canTransition) {
                return Result.fail(`Cannot transition from ${ritual.phase} to ${targetPhase}`);
            }
            const updated = this.normalizeInput({
                ...ritual,
                phase: targetPhase,
                updatedAt: new Date().toISOString(),
            });
            const validated = this.validatePayload(updated);
            if (validated.isFailure) {
                return Result.fail(validated.error);
            }
            const nextState = validated.getValue();
            const saveResult = await this.repository.save(nextState);
            if (saveResult.isFailure) {
                return Result.fail(saveResult.error);
            }
            await this.eventBus.publish(new RitualPhaseChangedEvent({
                ritualId: id,
                campusId: ritual.campusId,
                fromPhase: ritual.phase,
                toPhase: targetPhase,
                reason: options.reason,
                archetype: ritual.archetype,
            }));
            return Result.ok(nextState);
        }, "TransitionRitualPhase");
    }
    async evaluateScheduledTransitions(campusId, referenceDate = new Date()) {
        return this.execute(async () => {
            const activeResult = await this.repository.findActive(campusId, referenceDate);
            if (activeResult.isFailure) {
                return activeResult;
            }
            const transitions = [];
            const now = referenceDate.getTime();
            for (const ritual of activeResult.getValue()) {
                const startsAt = new Date(ritual.startsAt).getTime();
                const endsAt = new Date(ritual.endsAt).getTime();
                if (ritual.phase === "draft" && startsAt <= now) {
                    const result = await this.transitionPhase(ritual.id, "announced", {
                        reason: "scheduled",
                    });
                    if (result.isSuccess) {
                        transitions.push(result.getValue());
                    }
                    continue;
                }
                if (ritual.phase === "announced" && now >= startsAt) {
                    const result = await this.transitionPhase(ritual.id, "active", {
                        reason: "scheduled",
                    });
                    if (result.isSuccess) {
                        transitions.push(result.getValue());
                    }
                    continue;
                }
                if ((ritual.phase === "active" || ritual.phase === "cooldown") &&
                    now >= endsAt) {
                    const result = await this.transitionPhase(ritual.id, "ended", {
                        reason: "scheduled",
                    });
                    if (result.isSuccess) {
                        transitions.push(result.getValue());
                    }
                }
            }
            return Result.ok(transitions);
        }, "EvaluateScheduledRitualTransitions");
    }
    // Helpers
    normalizeInput(input) {
        return {
            id: input.id ?? this.generateId(),
            campusId: input.campusId ?? this.context.campusId,
            title: input.title,
            subtitle: input.subtitle,
            description: input.description,
            archetype: input.archetype,
            phase: input.phase ?? "draft",
            startsAt: input.startsAt,
            endsAt: input.endsAt,
            createdAt: input.createdAt ?? new Date().toISOString(),
            updatedAt: input.updatedAt ?? new Date().toISOString(),
            visibility: input.visibility ?? DEFAULT_VISIBILITY,
            slug: input.slug,
            presentation: input.presentation,
            metrics: input.metrics,
            config: input.config,
        };
    }
    validatePayload(payload) {
        const parsed = parseRitualUnion(payload);
        if (!parsed.success) {
            return Result.fail(parsed.error.message);
        }
        return Result.ok(parsed.data);
    }
    canTransitionPhase(current, target) {
        const allowedTransitions = {
            draft: ["announced", "active"],
            announced: ["active", "cooldown", "ended"],
            active: ["cooldown", "ended"],
            cooldown: ["ended"],
            ended: [],
        };
        return allowedTransitions[current]?.includes(target) ?? false;
    }
    generateId() {
        return `rit_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    }
}
//# sourceMappingURL=ritual-engine.service.js.map