// Bounded Context Owner: Engagement Guild
import { FeedApplicationService, type FeedItem } from "@core";
import type { SpaceRepository } from "@core";
import type { SpacePostRepository } from "@core";
import { InMemorySpaceRepository } from "../spaces/in-memory-space.repository";
import { FirestoreSpaceRepository } from "../spaces/firestore-space.repository";
import { FirestoreSpacePostRepository } from "../spaces/firestore-space-post.repository";
import {
  SpacePostAggregate,
  type SpacePostSnapshot,
  type SpacePostAudience,
  type SpacePostKind,
  type SpacePostOrigin,
  type SpacePostModerationStatus,
  type SpacePostAttachmentType,
  type SpacePostEngagementSummary
} from "@core";
import { seedSpaceSnapshots } from "../spaces/fixtures";
import { seedSpacePostSnapshots } from "../spaces/post-fixtures";

const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";
const preferFirestore = process.env.USE_FIRESTORE_SPACES !== "false";

const spaceRepository: SpaceRepository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreSpaceRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreSpaceRepository for feed and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for spaces data."
        );
      }
      console.warn("Falling back to in-memory SpaceRepository for feed", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory space repository requested for feed but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemorySpaceRepository(seedSpaceSnapshots);
})();

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
    this.store.set(post.getSpaceId(), [post, ...posts.filter((existing) => existing.getId() !== post.getId())]);
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

const postRepository: SpacePostRepository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreSpacePostRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreSpacePostRepository for feed and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for space posts."
        );
      }
      console.warn("Falling back to in-memory SpacePostRepository for feed", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory space post repository requested for feed but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemorySpacePostRepository(seedSpacePostSnapshots);
})();

export const feedService = new FeedApplicationService({
  spaceRepository,
  postRepository
});

export interface FeedPostViewItem {
  readonly kind: "post";
  readonly id: string;
  readonly spaceId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: string;
  readonly reactions: number;
  readonly commentCount: number;
  readonly tags: readonly string[];
  readonly postKind: SpacePostKind;
  readonly audience: SpacePostAudience;
  readonly origin: SpacePostOrigin;
  readonly shareToCampus: boolean;
  readonly qualityScore: number | null;
  readonly moderationStatus: SpacePostModerationStatus;
  readonly pinnedAt: string | null;
  readonly pinExpiresAt: string | null;
  readonly attachments: readonly {
    readonly type: SpacePostAttachmentType;
    readonly url: string;
    readonly title: string | null;
    readonly description: string | null;
  }[];
  readonly toolContext: {
    readonly toolId: string;
    readonly toolSlug: string | null;
    readonly placementId: string | null;
    readonly variant: string | null;
  } | null;
  readonly engagementSummary: SpacePostEngagementSummary | null;
}

export type FeedViewItem = FeedPostViewItem;

export function serializeFeedItem(item: FeedItem): FeedViewItem {
  if (item.type === "space_post") {
    const p = item.post;
    return {
      kind: "post",
      id: p.id,
      spaceId: p.spaceId,
      authorHandle: p.authorHandle,
      content: p.content,
      createdAt: p.createdAt.toISOString(),
      reactions: p.reactions,
      commentCount: p.commentCount,
      tags: p.tags,
      postKind: p.kind,
      audience: p.audience,
      origin: p.origin,
      shareToCampus: p.shareToCampus,
      qualityScore: p.qualityScore,
      moderationStatus: p.moderationStatus,
      pinnedAt: p.pinnedAt ? p.pinnedAt.toISOString() : null,
      pinExpiresAt: p.pinExpiresAt ? p.pinExpiresAt.toISOString() : null,
      attachments: p.attachments.map((attachment) => ({
        type: attachment.type,
        url: attachment.url,
        title: attachment.title ?? null,
        description: attachment.description ?? null
      })),
      toolContext: p.toolContext
        ? {
            toolId: p.toolContext.toolId,
            toolSlug: p.toolContext.toolSlug ?? null,
            placementId: p.toolContext.placementId ?? null,
            variant: p.toolContext.variant ?? null
          }
        : null,
      engagementSummary: p.engagementSummary ?? null
    };
  }

  throw new Error("Unhandled feed item type");
}

export async function getFeedForProfile(input: { campusId: string; profileId: string; limit?: number; cursor?: string | Date }) {
  const before = input.cursor
    ? typeof input.cursor === "string"
      ? new Date(input.cursor)
      : input.cursor
    : undefined;
  const items = await feedService.listForProfile({ campusId: input.campusId, profileId: input.profileId, limit: input.limit, before });
  return items.map(serializeFeedItem);
}
