// Bounded Context Owner: Engagement Guild
import type { SpaceRepository } from "../../domain/spaces/space.repository";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import type { FeedItem, SpacePostFeedItem } from "./feed.types";

export interface FeedApplicationServiceDependencies {
  readonly spaceRepository: SpaceRepository;
  readonly postRepository: SpacePostRepository;
}

export class FeedApplicationService {
  private readonly spaces: SpaceRepository;
  private readonly posts: SpacePostRepository;

  constructor(deps: FeedApplicationServiceDependencies) {
    this.spaces = deps.spaceRepository;
    this.posts = deps.postRepository;
  }

  async listForProfile(input: { campusId: string; profileId: string; limit?: number; before?: Date }): Promise<readonly FeedItem[]> {
    const limit = input.limit && input.limit > 0 ? input.limit : 20;
    const allSpaces = await this.spaces.listByCampus(input.campusId);
    const joined = allSpaces.filter((space) => space.hasMember(input.profileId));

    const postSnapshots: SpacePostFeedItem[] = [];
    // Pull a bounded number of recent posts from each joined space
    for (const space of joined) {
      const aggregates = await this.posts.listBySpace(space.getId(), Math.min(limit, 20));
      for (const agg of aggregates) {
        const snap = agg.toSnapshot();
        postSnapshots.push({ id: `post:${snap.id}`, type: "space_post", createdAt: snap.createdAt, post: snap });
      }
      // Soft cap aggregation so we don't over-fetch when a user is in many spaces
      if (postSnapshots.length >= limit * 3) {
        break;
      }
    }

    const filtered = input.before
      ? postSnapshots.filter((p) => p.createdAt.getTime() < input.before!.getTime())
      : postSnapshots;
    const sorted = filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return sorted.slice(0, limit);
  }
}
