// Bounded Context Owner: Community Guild
import { describe, expect, it, beforeEach } from "vitest";
import { SpacePostAggregate } from "../../domain/spaces/aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import { SpacePostApplicationService } from "./space-post.application.service";
import { assertOk, assertErr } from "../../shared/testing/assertions";

class InMemoryPostRepository implements SpacePostRepository {
  private readonly store = new Map<string, SpacePostAggregate[]>();

  async listBySpace(spaceId: string, limit?: number): Promise<SpacePostAggregate[]> {
    const posts = this.store.get(spaceId) ?? [];
    return typeof limit === "number" ? posts.slice(0, limit) : [...posts];
  }

  async findById(spaceId: string, postId: string): Promise<SpacePostAggregate | null> {
    const posts = this.store.get(spaceId) ?? [];
    return posts.find((post) => post.getId() === postId) ?? null;
  }

  async save(post: SpacePostAggregate): Promise<void> {
    const posts = this.store.get(post.getSpaceId()) ?? [];
    this.store.set(post.getSpaceId(), [post, ...posts.filter((existing) => existing.getId() !== post.getId())]);
  }

  async listPinsExpiringBefore(referenceTime: Date, limit = 100): Promise<SpacePostAggregate[]> {
    const all = Array.from(this.store.values()).flat();
    const expired = all
      .filter((post) => {
        const snapshot = post.toSnapshot();
        return Boolean(snapshot.pinnedAt && snapshot.pinExpiresAt && snapshot.pinExpiresAt <= referenceTime);
      })
      .sort(
        (left, right) =>
          (left.toSnapshot().pinExpiresAt?.getTime() ?? 0) -
          (right.toSnapshot().pinExpiresAt?.getTime() ?? 0)
      );
    return expired.slice(0, limit);
  }

  clear() {
    this.store.clear();
  }
}

describe("SpacePostApplicationService", () => {
  const repository = new InMemoryPostRepository();
  const service = new SpacePostApplicationService({ repository, clock: () => new Date("2025-01-01T00:00:00.000Z") });

  beforeEach(() => {
    repository.clear();
  });

  it("creates a post with sanitized content", async () => {
    const result = await service.create({
      postId: "post-1",
      spaceId: "space-1",
      authorId: "author-1",
      authorHandle: "@ava",
      content: "  Need help with CS201 problem set 3  ",
      tags: ["cs201"]
    });

    assertOk(result);
    expect(result.value.content).toBe("Need help with CS201 problem set 3");
    expect(result.value.kind).toBe("standard");
    expect(result.value.audience).toBe("members");
    expect(result.value.origin).toBe("member");
    expect(result.value.shareToCampus).toBe(false);
    expect(result.value.moderationStatus).toBe("active");
    expect(result.value.moderationUpdatedBy).toBe("author-1");
    expect(result.value.moderationReason).toBeNull();
    expect(result.value.moderationEscalatedBy).toBeNull();
    expect(result.value.pinnedAt).toBeNull();
    expect(result.value.pinExpiresAt).toBeNull();
    expect(result.value.toolContext).toBeNull();
    expect(result.value.attachments).toHaveLength(0);
    expect(result.value.engagementSummary).toBeNull();

    const posts = await service.list("space-1");
    expect(posts).toHaveLength(1);
    expect(posts[0]?.authorHandle).toBe("@ava");
  });

  it("creates a tool-powered post with extended metadata", async () => {
    const result = await service.create({
      postId: "post-3",
      spaceId: "space-1",
      authorId: "author-2",
      authorHandle: "@rio",
      content: "Event RSVP now open",
      kind: "event",
      audience: "campus",
      origin: "tool_automation",
      shareToCampus: true,
      qualityScore: 82,
      pinnedAt: new Date("2025-01-01T05:00:00.000Z"),
      pinExpiresAt: new Date("2025-01-03T05:00:00.000Z"),
      event: {
        title: "RSVP Launch",
        description: null,
        location: "Union Hall",
        startAt: new Date("2025-01-02T12:00:00.000Z"),
        endAt: new Date("2025-01-02T13:00:00.000Z"),
        maxAttendees: null,
        enableWaitlist: false,
        goingCount: 12,
        maybeCount: 4,
        waitlistCount: 0,
        checkInEnabled: false,
        checkedInCount: 0,
        checkInWindowBefore: null,
        checkInWindowAfter: null,
        qrCodeEnabled: false,
        coHostIds: [],
        coHostNames: [],
        isRssImported: false,
        userRsvp: null,
        userCheckedIn: false,
        coverImageUrl: null,
        coverImageAlt: null
      },
      toolContext: {
        toolId: "tool-event-planner",
        toolSlug: "event-planner",
        placementId: "composer:event"
      },
      engagementSummary: {
        rsvpYes: 12,
        rsvpMaybe: 4
      },
      attachments: [
        {
          type: "link",
          url: "https://events.hive.edu/rsvp"
        }
      ]
    });

    assertOk(result);

    expect(result.value.kind).toBe("event");
    expect(result.value.audience).toBe("campus");
    expect(result.value.origin).toBe("tool_automation");
    expect(result.value.shareToCampus).toBe(true);
    expect(result.value.qualityScore).toBe(82);
    expect(result.value.pinnedAt?.toISOString()).toBe("2025-01-01T05:00:00.000Z");
    expect(result.value.pinExpiresAt?.toISOString()).toBe("2025-01-03T05:00:00.000Z");
    expect(result.value.toolContext?.toolId).toBe("tool-event-planner");
    expect(result.value.engagementSummary?.rsvpYes).toBe(12);
    expect(result.value.attachments).toHaveLength(1);
    expect(result.value.moderationUpdatedBy).toBe("author-2");
  });

  it("rejects empty content", async () => {
    const result = await service.create({
      postId: "post-2",
      spaceId: "space-1",
      authorId: "author-1",
      authorHandle: "@ava",
      content: "   ",
      tags: []
    });

    assertErr(result);
  });

  it("preserves repository ordering in list() without resorting", async () => {
    // Create three posts with out-of-order createdAt times to simulate repository-controlled ordering
    const p1 = await service.create({
      postId: "p-1",
      spaceId: "space-2",
      authorId: "a-1",
      authorHandle: "@a1",
      content: "first"
    });
    assertOk(p1);
    const p2 = await service.create({
      postId: "p-2",
      spaceId: "space-2",
      authorId: "a-2",
      authorHandle: "@a2",
      content: "second"
    });
    assertOk(p2);
    const p3 = await service.create({
      postId: "p-3",
      spaceId: "space-2",
      authorId: "a-3",
      authorHandle: "@a3",
      content: "third"
    });
    assertOk(p3);

    // Repository returns insertion order (newest first) — our service should not re-sort
    const repoPosts = await repository.listBySpace("space-2");
    const repoIds = repoPosts.map((p) => p.toSnapshot().id);
    const svcPosts = await service.list("space-2");
    const svcIds = svcPosts.map((p) => p.id);
    expect(svcIds).toEqual(repoIds);
  });
});
