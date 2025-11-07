import type { ApplicationServiceContext } from "../base.service";
import { BaseApplicationService } from "../base.service";
import { Result } from "../../domain/shared/base/Result";
import { EventBus } from "../../domain/shared/domain-event";
import {
  RitualCreatedEvent,
  RitualDeletedEvent,
  RitualPhaseChangedEvent,
} from "../../domain/rituals/events";
import {
  RitualArchetype,
  RitualPhase,
  RitualUnion,
  RitualUnionDto,
  RitualUnionSchema,
  parseRitualUnion,
} from "../../domain/rituals/archetypes";
import { getRitualConfigRepository } from "../../infrastructure/repositories/factory";
import type { IRitualConfigRepository } from "../../infrastructure/repositories/interfaces";

export interface UpsertRitualInput
  extends Omit<RitualUnion, "id" | "createdAt" | "updatedAt"> {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransitionOptions {
  reason?: "manual" | "scheduled" | "auto";
  notes?: string;
}

const DEFAULT_VISIBILITY: RitualUnion["visibility"] = "public";

export class RitualEngineService extends BaseApplicationService {
  constructor(
    private readonly repository: IRitualConfigRepository = getRitualConfigRepository(),
    context?: Partial<ApplicationServiceContext>,
    private readonly eventBus: EventBus = new EventBus(),
  ) {
    super(context);
  }

  async getRitual(id: string): Promise<Result<RitualUnion>> {
    return this.repository.findById(id);
  }

  async getRitualBySlug(
    slug: string,
    campusId: string,
  ): Promise<Result<RitualUnion>> {
    return this.repository.findBySlug(slug, campusId);
  }

  async listRituals(
    campusId: string,
    phases?: RitualPhase[],
  ): Promise<Result<RitualUnion[]>> {
    return this.repository.findByCampus(campusId, {
      phases,
    });
  }

  async listActiveRituals(
    campusId: string,
    referenceDate: Date = new Date(),
  ): Promise<Result<RitualUnion[]>> {
    return this.repository.findActive(campusId, referenceDate);
  }

  async listRitualsByArchetype(
    campusId: string,
    archetype: RitualArchetype,
  ): Promise<Result<RitualUnion[]>> {
    return this.repository.findByArchetype(archetype, campusId);
  }

  async listActiveRitualsByArchetype(
    campusId: string,
    archetype: RitualArchetype,
    referenceDate: Date = new Date(),
  ): Promise<Result<RitualUnion[]>> {
    return this.repository.findActiveByArchetype(archetype, campusId, referenceDate);
  }

  async createRitual(input: UpsertRitualInput): Promise<Result<RitualUnion>> {
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
        return Result.fail<RitualUnion>(validated.error as string);
      }

      const ritual = validated.getValue();
      const saveResult = await this.repository.save(ritual);
      if (saveResult.isFailure) {
        return Result.fail<RitualUnion>(saveResult.error as string);
      }

      await this.eventBus.publish(new RitualCreatedEvent(ritual));

      return Result.ok<RitualUnion>(ritual);
    }, "CreateRitual");
  }

  async updateRitual(
    id: string,
    input: Partial<UpsertRitualInput>,
  ): Promise<Result<RitualUnion>> {
    return this.execute(async () => {
      const existingResult = await this.repository.findById(id);
      if (existingResult.isFailure) {
        return Result.fail<RitualUnion>(existingResult.error as string);
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
        return Result.fail<RitualUnion>(validated.error as string);
      }

      const ritual = validated.getValue();
      const saveResult = await this.repository.save(ritual);
      if (saveResult.isFailure) {
        return Result.fail<RitualUnion>(saveResult.error as string);
      }

      return Result.ok<RitualUnion>(ritual);
    }, "UpdateRitual");
  }

  async deleteRitual(id: string): Promise<Result<void>> {
    return this.execute(async () => {
      const existing = await this.repository.findById(id);
      if (existing.isFailure) {
        return Result.fail<void>(existing.error as string);
      }

      const deleteResult = await this.repository.delete(id);
      if (deleteResult.isFailure) {
        return deleteResult;
      }

      await this.eventBus.publish(
        new RitualDeletedEvent({
          ritualId: id,
          campusId: existing.getValue().campusId,
          archetype: existing.getValue().archetype,
        }),
      );

      return deleteResult;
    }, "DeleteRitual");
  }

  async transitionPhase(
    id: string,
    targetPhase: RitualPhase,
    options: TransitionOptions = {},
  ): Promise<Result<RitualUnion>> {
    return this.execute(async () => {
      const currentResult = await this.repository.findById(id);
      if (currentResult.isFailure) {
        return Result.fail<RitualUnion>(currentResult.error as string);
      }

      const ritual = currentResult.getValue();
      if (ritual.phase === targetPhase) {
        return Result.ok<RitualUnion>(ritual);
      }

      const canTransition = this.canTransitionPhase(ritual.phase, targetPhase);
      if (!canTransition) {
        return Result.fail<RitualUnion>(
          `Cannot transition from ${ritual.phase} to ${targetPhase}`,
        );
      }

      const updated = this.normalizeInput({
        ...ritual,
        phase: targetPhase,
        updatedAt: new Date().toISOString(),
      });

      const validated = this.validatePayload(updated);
      if (validated.isFailure) {
        return Result.fail<RitualUnion>(validated.error as string);
      }

      const nextState = validated.getValue();
      const saveResult = await this.repository.save(nextState);
      if (saveResult.isFailure) {
        return Result.fail<RitualUnion>(saveResult.error as string);
      }

      await this.eventBus.publish(
        new RitualPhaseChangedEvent({
          ritualId: id,
          campusId: ritual.campusId,
          fromPhase: ritual.phase,
          toPhase: targetPhase,
          reason: options.reason,
          archetype: ritual.archetype,
        }),
      );

      return Result.ok<RitualUnion>(nextState);
    }, "TransitionRitualPhase");
  }

  async evaluateScheduledTransitions(
    campusId: string,
    referenceDate: Date = new Date(),
  ): Promise<Result<RitualUnion[]>> {
    return this.execute(async () => {
      const activeResult = await this.repository.findActive(
        campusId,
        referenceDate,
      );
      if (activeResult.isFailure) {
        return activeResult;
      }

      const transitions: RitualUnion[] = [];
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

        if (
          (ritual.phase === "active" || ritual.phase === "cooldown") &&
          now >= endsAt
        ) {
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

  private normalizeInput(input: UpsertRitualInput): RitualUnionDto {
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
    } as RitualUnionDto;
  }

  private validatePayload(
    payload: RitualUnionDto,
  ): Result<RitualUnion> {
    const parsed = parseRitualUnion(payload);
    if (!parsed.success) {
      return Result.fail<RitualUnion>(parsed.error.message);
    }
    return Result.ok(parsed.data as unknown as RitualUnion);
  }

  private canTransitionPhase(
    current: RitualPhase,
    target: RitualPhase,
  ): boolean {
    const allowedTransitions: Record<RitualPhase, RitualPhase[]> = {
      draft: ["announced", "active"],
      announced: ["active", "cooldown", "ended"],
      active: ["cooldown", "ended"],
      cooldown: ["ended"],
      ended: [],
    };

    return allowedTransitions[current]?.includes(target) ?? false;
  }

  private generateId(): string {
    return `rit_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
