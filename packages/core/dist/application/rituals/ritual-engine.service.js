"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualEngineService = void 0;
const base_service_1 = require("../base.service");
const Result_1 = require("../../domain/shared/base/Result");
const domain_event_1 = require("../../domain/shared/domain-event");
const events_1 = require("../../domain/rituals/events");
const archetypes_1 = require("../../domain/rituals/archetypes");
const factory_1 = require("../../infrastructure/repositories/factory");
const DEFAULT_VISIBILITY = "public";
class RitualEngineService extends base_service_1.BaseApplicationService {
    constructor(repository = (0, factory_1.getRitualConfigRepository)(), context, eventBus = new domain_event_1.EventBus()) {
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
                return Result_1.Result.fail(validated.error);
            }
            const ritual = validated.getValue();
            const saveResult = await this.repository.save(ritual);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            await this.eventBus.publish(new events_1.RitualCreatedEvent(ritual));
            return Result_1.Result.ok(ritual);
        }, "CreateRitual");
    }
    async updateRitual(id, input) {
        return this.execute(async () => {
            const existingResult = await this.repository.findById(id);
            if (existingResult.isFailure) {
                return Result_1.Result.fail(existingResult.error);
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
                return Result_1.Result.fail(validated.error);
            }
            const ritual = validated.getValue();
            const saveResult = await this.repository.save(ritual);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            return Result_1.Result.ok(ritual);
        }, "UpdateRitual");
    }
    async deleteRitual(id) {
        return this.execute(async () => {
            const existing = await this.repository.findById(id);
            if (existing.isFailure) {
                return Result_1.Result.fail(existing.error);
            }
            const deleteResult = await this.repository.delete(id);
            if (deleteResult.isFailure) {
                return deleteResult;
            }
            await this.eventBus.publish(new events_1.RitualDeletedEvent({
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
                return Result_1.Result.fail(currentResult.error);
            }
            const ritual = currentResult.getValue();
            if (ritual.phase === targetPhase) {
                return Result_1.Result.ok(ritual);
            }
            const canTransition = this.canTransitionPhase(ritual.phase, targetPhase);
            if (!canTransition) {
                return Result_1.Result.fail(`Cannot transition from ${ritual.phase} to ${targetPhase}`);
            }
            const updated = this.normalizeInput({
                ...ritual,
                phase: targetPhase,
                updatedAt: new Date().toISOString(),
            });
            const validated = this.validatePayload(updated);
            if (validated.isFailure) {
                return Result_1.Result.fail(validated.error);
            }
            const nextState = validated.getValue();
            const saveResult = await this.repository.save(nextState);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            await this.eventBus.publish(new events_1.RitualPhaseChangedEvent({
                ritualId: id,
                campusId: ritual.campusId,
                fromPhase: ritual.phase,
                toPhase: targetPhase,
                reason: options.reason,
                archetype: ritual.archetype,
            }));
            return Result_1.Result.ok(nextState);
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
            return Result_1.Result.ok(transitions);
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
        const parsed = (0, archetypes_1.parseRitualUnion)(payload);
        if (!parsed.success) {
            return Result_1.Result.fail(parsed.error.message);
        }
        return Result_1.Result.ok(parsed.data);
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
exports.RitualEngineService = RitualEngineService;
//# sourceMappingURL=ritual-engine.service.js.map