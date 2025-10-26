// Bounded Context Owner: Community Guild
import { describe, it, expect, beforeEach } from "vitest";
import { SpacePostAggregate } from "../../domain/spaces/aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import { SpacePostApplicationService } from "./space-post.application.service";
import { assertErr, assertOk } from "../../shared/testing/assertions";

class InMemoryRepo implements SpacePostRepository {
  private store = new Map<string, SpacePostAggregate[]>();
  async listBySpace(spaceId: string): Promise<SpacePostAggregate[]> {
    return [...(this.store.get(spaceId) ?? [])];
  }
  async findById(spaceId: string, postId: string): Promise<SpacePostAggregate | null> {
    return (this.store.get(spaceId) ?? []).find((p) => p.getId() === postId) ?? null;
  }
  async save(post: SpacePostAggregate): Promise<void> {
    const list = this.store.get(post.getSpaceId()) ?? [];
    this.store.set(post.getSpaceId(), [post, ...list.filter((p) => p.getId() !== post.getId())]);
  }
  async listPinsExpiringBefore(): Promise<SpacePostAggregate[]> {
    return [];
  }
  seed(posts: readonly ReturnType<typeof SpacePostAggregate.rehydrate>[]) {
    const bySpace = new Map<string, SpacePostAggregate[]>();
    for (const p of posts) {
      const list = bySpace.get(p.getSpaceId()) ?? [];
      list.push(p);
      bySpace.set(p.getSpaceId(), list);
    }
    this.store = bySpace;
  }
  clear() {
    this.store.clear();
  }
}

describe("Check-in window + pin limit enforcement", () => {
  const repo = new InMemoryRepo();
  const service = new SpacePostApplicationService({ repository: repo, clock: () => new Date("2025-01-01T12:00:00.000Z") });

  beforeEach(() => repo.clear());

  it("rejects check-in outside the allowed window", async () => {
    // Event from 14:00 to 15:00, windowBefore=15, windowAfter=15; now=12:00 → outside
    const creation = SpacePostAggregate.create({
      id: "event-1",
      spaceId: "space-1",
      authorId: "author-1",
      authorHandle: "@hana",
      content: "Future event",
      createdAt: new Date("2025-01-01T11:59:00.000Z"),
      kind: "event",
      event: {
        title: "Future Event",
        description: null,
        location: "Hall A",
        startAt: new Date("2025-01-01T14:00:00.000Z"),
        endAt: new Date("2025-01-01T15:00:00.000Z"),
        maxAttendees: null,
        enableWaitlist: false,
        goingCount: 0,
        maybeCount: 0,
        waitlistCount: 0,
        checkInEnabled: true,
        checkedInCount: 0,
        checkInWindowBefore: 15,
        checkInWindowAfter: 15,
        qrCodeEnabled: false,
        coHostIds: [],
        coHostNames: [],
        isRssImported: false,
        userRsvp: null,
        userCheckedIn: false,
        coverImageUrl: null,
        coverImageAlt: null
      }
    });
    assertOk(creation);
    await repo.save(creation.value);

    const res = await service.setEventCheckIn({ spaceId: "space-1", postId: "event-1", checkedIn: true });
    assertErr(res);
    expect(res.error).toBe("CHECKIN_WINDOW_CLOSED");
  });

  it("allows check-in within the allowed window", async () => {
    // now=12:00, event start 12:05, windowBefore=10 → within
    const creation = SpacePostAggregate.create({
      id: "event-2",
      spaceId: "space-1",
      authorId: "author-1",
      authorHandle: "@hana",
      content: "Soon event",
      createdAt: new Date("2025-01-01T11:59:00.000Z"),
      kind: "event",
      event: {
        title: "Soon Event",
        description: null,
        location: "Hall B",
        startAt: new Date("2025-01-01T12:05:00.000Z"),
        endAt: new Date("2025-01-01T13:00:00.000Z"),
        maxAttendees: null,
        enableWaitlist: false,
        goingCount: 0,
        maybeCount: 0,
        waitlistCount: 0,
        checkInEnabled: true,
        checkedInCount: 0,
        checkInWindowBefore: 10,
        checkInWindowAfter: 0,
        qrCodeEnabled: false,
        coHostIds: [],
        coHostNames: [],
        isRssImported: false,
        userRsvp: null,
        userCheckedIn: false,
        coverImageUrl: null,
        coverImageAlt: null
      }
    });
    assertOk(creation);
    await repo.save(creation.value);

    const res = await service.setEventCheckIn({ spaceId: "space-1", postId: "event-2", checkedIn: true });
    assertOk(res);
    expect(res.value.event?.userCheckedIn).toBe(true);
    expect(res.value.event?.checkedInCount).toBe(1);
  });

  it("enforces max two pins per space when pinning", async () => {
    const mk = (id: string, pinned: boolean) => {
      const base = SpacePostAggregate.create({
        id,
        spaceId: "space-1",
        authorId: "author-1",
        authorHandle: "@hana",
        content: id,
        createdAt: new Date("2025-01-01T11:30:00.000Z")
      });
      if (!base.ok) throw new Error(base.error);
      if (pinned) {
        const pin = base.value.pin({ actorId: "author-1", at: new Date("2025-01-01T11:35:00.000Z"), expiresAt: new Date("2025-01-02T11:35:00.000Z") });
        if (!pin.ok) throw new Error(pin.error);
      }
      return base.value;
    };
    await repo.save(mk("post-1", true));
    await repo.save(mk("post-2", true));
    await repo.save(mk("post-3", false));

    const res = await service.setPinStatus({ spaceId: "space-1", postId: "post-3", actorId: "leader-1", action: "pin", expiresAt: new Date("2025-01-02T12:00:00.000Z") });
    assertErr(res);
    expect(res.error).toBe("PIN_LIMIT_REACHED");
  });
});

