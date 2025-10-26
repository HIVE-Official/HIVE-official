// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import {
  SpacePostAggregate,
  type SpacePostRepository,
  type SpacePostTelemetryPort,
  type SpacePostDomainEventPublisherPort,
  type SpacePostDomainEvent
} from "@core";
import { SpacePostPinExpiryJob } from "./pin-expiry.job";

class InMemoryRepository implements SpacePostRepository {
  private readonly store = new Map<string, SpacePostAggregate[]>();

  async listBySpace(spaceId: string): Promise<SpacePostAggregate[]> {
    return this.store.get(spaceId) ?? [];
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
        (a, b) =>
          (a.toSnapshot().pinExpiresAt?.getTime() ?? 0) -
          (b.toSnapshot().pinExpiresAt?.getTime() ?? 0)
      );
    return expired.slice(0, limit);
  }

  seed(snapshot: ReturnType<SpacePostAggregate["toSnapshot"]>) {
    const aggregate = SpacePostAggregate.rehydrate(snapshot);
    const posts = this.store.get(snapshot.spaceId) ?? [];
    this.store.set(snapshot.spaceId, [aggregate, ...posts]);
  }
}

class RecordingTelemetry implements SpacePostTelemetryPort {
  readonly expired: Parameters<SpacePostTelemetryPort["recordPinExpired"]>[0][] = [];

  async recordPostCreateSuccess(): Promise<void> {
    // no-op for this job
  }

  async recordPostListFetched(): Promise<void> {
    // no-op for this job
  }

  async recordPinnedCount(): Promise<void> {
    // no-op for this job
  }

  async recordModerationAutoHidden(): Promise<void> {
    // no-op for this job
  }

  async recordPinExpired(metric: Parameters<SpacePostTelemetryPort["recordPinExpired"]>[0]): Promise<void> {
    this.expired.push(metric);
  }
}

class RecordingEventPublisher implements SpacePostDomainEventPublisherPort {
  readonly events: SpacePostDomainEvent[] = [];

  async publish(events: readonly SpacePostDomainEvent[], _occurredAt: Date): Promise<void> {
    this.events.push(...events);
  }
}

const buildSnapshot = (seed: Parameters<typeof SpacePostAggregate.create>[0]) => {
  const creation = SpacePostAggregate.create(seed);
  if (!creation.ok) {
    throw new Error(creation.error);
  }
  const aggregate = creation.value;
  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

describe("Scenario: UB Robotics pins expire on schedule so the board stays relevant", () => {
  it("unpinned expired Robotics announcements and emits telemetry for ops dashboards", async () => {
    const repository = new InMemoryRepository();
    const telemetry = new RecordingTelemetry();
    const events = new RecordingEventPublisher();

    repository.seed(
      buildSnapshot({
        id: "post-robotics-expired-pin",
        spaceId: "space-robotics",
        authorId: "leader-ava",
        authorHandle: "@ava",
        content: "Competition plan stayed top-of-board until kickoff.",
        createdAt: new Date("2025-02-01T18:00:00.000Z"),
        pinnedAt: new Date("2025-02-02T18:05:00.000Z"),
        pinExpiresAt: new Date("2025-02-07T18:05:00.000Z")
      })
    );

    repository.seed(
      buildSnapshot({
        id: "post-robotics-future-pin",
        spaceId: "space-robotics",
        authorId: "leader-ava",
        authorHandle: "@ava",
        content: "Keep Friday open for scouting.",
        createdAt: new Date("2025-02-05T10:00:00.000Z"),
        pinnedAt: new Date("2025-02-06T10:00:00.000Z"),
        pinExpiresAt: new Date("2025-02-09T10:00:00.000Z")
      })
    );

    const job = new SpacePostPinExpiryJob({
      repository,
      telemetry,
      clock: () => new Date("2025-02-08T00:00:00.000Z"),
      batchSize: 25,
      events
    });

    const result = await job.run();

    expect(result.processedCount).toBe(1);
    expect(result.unpinnedPostIds).toContain("post-robotics-expired-pin");
    expect(telemetry.expired).toHaveLength(1);
    expect(telemetry.expired[0]?.spaceId).toBe("space-robotics");
    expect(telemetry.expired[0]?.postId).toBe("post-robotics-expired-pin");

    const updatedPosts = await repository.listBySpace("space-robotics");
    const expiredSnapshot = updatedPosts
      .map((aggregate) => aggregate.toSnapshot())
      .find((snapshot) => snapshot.id === "post-robotics-expired-pin");
    expect(expiredSnapshot?.pinnedAt).toBeNull();
    expect(expiredSnapshot?.pinExpiresAt).toBeNull();

    const futureSnapshot = updatedPosts
      .map((aggregate) => aggregate.toSnapshot())
      .find((snapshot) => snapshot.id === "post-robotics-future-pin");
    expect(futureSnapshot?.pinnedAt).not.toBeNull();

    const recordedPinEvents = events.events.filter(
      (event) => event.type === "SpacePostPinStatusChanged"
    );
    expect(recordedPinEvents).toHaveLength(1);
    expect(recordedPinEvents[0]?.payload.postId).toBe("post-robotics-expired-pin");
  });
});
