// Bounded Context Owner: Rituals Guild
import type { RitualAggregate } from "./aggregates/ritual.aggregate";

export interface RitualRepository {
  findById(id: string): Promise<RitualAggregate | null>;
  listByProfile(profileId: string): Promise<readonly RitualAggregate[]>;
  save(ritual: RitualAggregate): Promise<void>;
}

