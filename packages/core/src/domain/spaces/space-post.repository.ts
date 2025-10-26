// Bounded Context Owner: Community Guild
import type { SpacePostAggregate } from "./aggregates/space-post.aggregate";

export interface SpacePostRepository {
  listBySpace(_spaceId: string, _limit?: number): Promise<SpacePostAggregate[]>;
  findById(_spaceId: string, _postId: string): Promise<SpacePostAggregate | null>;
  save(_post: SpacePostAggregate): Promise<void>;
  listPinsExpiringBefore(_referenceTime: Date, _limit?: number): Promise<SpacePostAggregate[]>;
}
