// Bounded Context Owner: Engagement Guild
import { describe, it, expect } from "vitest";
import { FeedApplicationService } from "@core";
import type { SpaceRepository } from "@core";
import type { SpacePostRepository } from "@core";
import { InMemorySpaceRepository } from "../spaces/in-memory-space.repository";
import { seedSpaceSnapshots } from "../spaces/fixtures";
import { SpacePostAggregate, type SpacePostSnapshot } from "@core";
import { seedSpacePostSnapshots } from "../spaces/post-fixtures";

class InMemorySpacePostRepository implements SpacePostRepository {
  private readonly store = new Map<string, SpacePostAggregate[]>();
  constructor(seed: readonly SpacePostSnapshot[] = []) {
    seed.forEach((snapshot) => {
      const aggregate = SpacePostAggregate.rehydrate(snapshot);
      const posts = this.store.get(snapshot.spaceId) ?? [];
      this.store.set(snapshot.spaceId, [aggregate, ...posts]);
    });
  }
  async listBySpace(spaceId: string, limit?: number) {
    const posts = this.store.get(spaceId) ?? [];
    const sorted = [...posts].sort(
      (a, b) => b.toSnapshot().createdAt.getTime() - a.toSnapshot().createdAt.getTime()
    );
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }

  async findById(spaceId: string, postId: string) {
    const posts = this.store.get(spaceId) ?? [];
    return posts.find((post) => post.getId() === postId) ?? null;
  }
  async save(post: SpacePostAggregate) {
    const posts = this.store.get(post.getSpaceId()) ?? [];
    this.store.set(post.getSpaceId(), [post, ...posts.filter((p) => p.getId() !== post.getId())]);
  }

  async listPinsExpiringBefore(referenceTime: Date, limit = 100) {
    const all = Array.from(this.store.values()).flat();
    const expired = all
      .filter((post) => {
        const snapshot = post.toSnapshot();
        return Boolean(snapshot.pinnedAt && snapshot.pinExpiresAt && snapshot.pinExpiresAt <= referenceTime);
      })
      .sort(
        (a, b) =>
          (a.toSnapshot().pinExpiresAt?.getTime() ?? 0) -
          (b.toSnapshot().pinExpiresAt?.getTime() ?? 0)
      );
    return expired.slice(0, limit);
  }
}

describe("FeedApplicationService", () => {
  it("returns posts only from spaces the viewer joined", async () => {
    const spaceRepository: SpaceRepository = new InMemorySpaceRepository(seedSpaceSnapshots);
    const postRepository: SpacePostRepository = new InMemorySpacePostRepository(seedSpacePostSnapshots);
    const service = new FeedApplicationService({ spaceRepository, postRepository });

    const items = await service.listForProfile({ campusId: "ub-buffalo", profileId: "profile-jwrhineh", limit: 50 });

    expect(items.length).toBeGreaterThan(0);
    // Check that every item references a space the viewer is a member of
    const joined = new Set(
      (await spaceRepository.listByCampus("ub-buffalo")).filter((s) => s.hasMember("profile-jwrhineh")).map((s) => s.getId())
    );
    items.forEach((item) => {
      if (item.type === "space_post") {
        expect(joined.has(item.post.spaceId)).toBe(true);
      }
    });
  });
});
