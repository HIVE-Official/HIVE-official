// Bounded Context Owner: Rituals Guild
import { err, ok, type Result } from "../../shared/result";
import { RitualAggregate, type RitualCreationInput } from "../../domain/rituals/aggregates/ritual.aggregate";
import type { RitualSnapshot } from "../../domain/rituals/ritual.types";
import type { RitualRepository } from "../../domain/rituals/ritual.repository";

export interface RitualApplicationServiceDependencies {
  readonly repository: RitualRepository;
  readonly clock?: () => Date;
}

export class RitualApplicationService {
  private readonly repository: RitualRepository;
  private readonly clock: () => Date;

  constructor(deps: RitualApplicationServiceDependencies) {
    this.repository = deps.repository;
    this.clock = deps.clock ?? (() => new Date());
  }

  async listForProfile(profileId: string): Promise<readonly RitualSnapshot[]> {
    const rituals = await this.repository.listByProfile(profileId);
    return rituals.map((r) => r.toSnapshot()).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async create(input: RitualCreationInput): Promise<Result<RitualSnapshot>> {
    const exists = await this.repository.findById(input.id);
    if (exists) return err("Ritual identifier already exists");

    const creation = RitualAggregate.create({ ...input, createdAt: this.clock() });
    if (!creation.ok) return creation;

    const aggregate = creation.value;
    await this.repository.save(aggregate);
    return ok(aggregate.toSnapshot());
  }

  async join(ritualId: string, profileId: string): Promise<Result<RitualSnapshot>> {
    const ritual = await this.repository.findById(ritualId);
    if (!ritual) return err("Ritual not found");

    const result = ritual.join(profileId, this.clock());
    if (!result.ok) return result;

    await this.repository.save(ritual);
    return ok(ritual.toSnapshot());
  }
}

