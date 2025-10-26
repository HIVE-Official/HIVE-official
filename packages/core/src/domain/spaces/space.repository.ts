// Bounded Context Owner: Community Guild
import type { SpaceAggregate } from "./aggregates/space.aggregate";

export interface SpaceRepository {
  findById(_spaceId: string): Promise<SpaceAggregate | null>;
  listByCampus(_campusId: string): Promise<SpaceAggregate[]>;
  save(_space: SpaceAggregate): Promise<void>;
}
