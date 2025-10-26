// Bounded Context Owner: Rituals Guild
import type { RitualRepository } from "../../domain/rituals/ritual.repository";
import { RitualAggregate } from "../../domain/rituals/aggregates/ritual.aggregate";
import type { RitualSnapshot } from "../../domain/rituals/ritual.types";

export class InMemoryRitualRepository implements RitualRepository {
  private readonly store = new Map<string, RitualAggregate>();

  constructor(seed: readonly RitualSnapshot[] = []) {
    for (const snapshot of seed) {
      this.store.set(snapshot.id, RitualAggregate.rehydrate(snapshot));
    }
  }

  async findById(id: string): Promise<RitualAggregate | null> {
    return this.store.get(id) ?? null;
  }

  async listByProfile(profileId: string): Promise<readonly RitualAggregate[]> {
    return [...this.store.values()].filter((agg) => agg.listParticipants().some((p) => p.profileId === profileId));
  }

  async save(ritual: RitualAggregate): Promise<void> {
    this.store.set(ritual.getId(), ritual);
  }
}

