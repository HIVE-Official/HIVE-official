// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import { SpacePostApplicationService, SpacePostAggregate, type SpacePostRepository, type SpacePostTelemetryPort } from "@core";

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
}

class RecordingTelemetry implements SpacePostTelemetryPort {
  readonly created: Parameters<SpacePostTelemetryPort["recordPostCreateSuccess"]>[0][] = [];
  readonly failures: Parameters<NonNullable<SpacePostTelemetryPort["recordPostCreateFailure"]>>[0][] =
    [];
  readonly listed: Parameters<SpacePostTelemetryPort["recordPostListFetched"]>[0][] = [];
  readonly pinned: Parameters<SpacePostTelemetryPort["recordPinnedCount"]>[0][] = [];
  readonly autoHidden: Parameters<SpacePostTelemetryPort["recordModerationAutoHidden"]>[0][] = [];
  readonly expired: Parameters<SpacePostTelemetryPort["recordPinExpired"]>[0][] = [];

  async recordPostCreateSuccess(metric: Parameters<SpacePostTelemetryPort["recordPostCreateSuccess"]>[0]) {
    this.created.push(metric);
  }

  async recordPostListFetched(metric: Parameters<SpacePostTelemetryPort["recordPostListFetched"]>[0]) {
    this.listed.push(metric);
  }

  async recordPinnedCount(metric: Parameters<SpacePostTelemetryPort["recordPinnedCount"]>[0]) {
    this.pinned.push(metric);
  }

  async recordModerationAutoHidden(metric: Parameters<SpacePostTelemetryPort["recordModerationAutoHidden"]>[0]) {
    this.autoHidden.push(metric);
  }

  async recordPinExpired(metric: Parameters<SpacePostTelemetryPort["recordPinExpired"]>[0]) {
    this.expired.push(metric);
  }

  async recordPostCreateFailure(
    metric: Parameters<NonNullable<SpacePostTelemetryPort["recordPostCreateFailure"]>>[0]
  ) {
    this.failures.push(metric);
  }
}

describe("Spaces post monitoring scenarios", () => {
  it("records throughput when the UB Robotics lead posts an update so ops can watch for spikes", async () => {
    const repository = new InMemoryRepository();
    const telemetry = new RecordingTelemetry();
    const service = new SpacePostApplicationService({
      repository,
      clock: () => new Date("2025-01-01T10:00:00.000Z"),
      telemetry
    });

    const result = await service.create({
      postId: "post-robotics-1",
      spaceId: "space-robotics",
      authorId: "leader-ava",
      authorHandle: "@ava",
      content: "Robotics kickoff tonight in NSC 225!"
    });

    expect(result.ok).toBe(true);
    expect(telemetry.created).toHaveLength(1);
    expect(telemetry.created[0]?.spaceId).toBe("space-robotics");
  });

  it("records create failures when a UB member attempts to post invalid content so safety dashboards can flag spikes", async () => {
    const repository = new InMemoryRepository();
    const telemetry = new RecordingTelemetry();
    const service = new SpacePostApplicationService({
      repository,
      telemetry,
      clock: () => new Date("2025-01-01T10:00:00.000Z")
    });

    const result = await service.create({
      postId: "post-invalid",
      spaceId: "space-robotics",
      authorId: "member-bree",
      authorHandle: "@bree",
      content: "" // invalid because aggregate requires content
    });

    expect(result.ok).toBe(false);
    expect(telemetry.failures).toHaveLength(1);
    expect(telemetry.failures[0]?.spaceId).toBe("space-robotics");
    expect(telemetry.failures[0]?.postId).toBe("post-invalid");
  });

  it("records list latency when a UB student loads the Robotics board to ensure paging remains healthy", async () => {
    const repository = new InMemoryRepository();
    const telemetry = new RecordingTelemetry();
    const service = new SpacePostApplicationService({
      repository,
      clock: () => new Date("2025-01-01T12:00:00.000Z"),
      telemetry
    });

    const pinnedPost = SpacePostAggregate.create({
      id: "post-robotics-pinned",
      spaceId: "space-robotics",
      authorId: "leader-ava",
      authorHandle: "@ava",
      content: "Keep this toolkit handy before competition day.",
      createdAt: new Date("2025-01-01T09:00:00.000Z"),
      pinnedAt: new Date("2025-01-01T09:00:00.000Z"),
      pinExpiresAt: new Date("2025-01-02T09:00:00.000Z")
    });
    if (!pinnedPost.ok) {
      throw new Error(pinnedPost.error);
    }
    await repository.save(pinnedPost.value);

    const autoHiddenPost = SpacePostAggregate.create({
      id: "post-robotics-auto-hidden",
      spaceId: "space-robotics",
      authorId: "member-lee",
      authorHandle: "@lee",
      content: "Link flagged by moderators.",
      createdAt: new Date("2025-01-01T10:00:00.000Z"),
      moderationStatus: "auto_hidden",
      moderation: {
        status: "auto_hidden",
        updatedAt: new Date("2025-01-01T10:05:00.000Z"),
        updatedBy: "system-auto",
        reason: "Potential spam link"
      }
    });
    if (!autoHiddenPost.ok) {
      throw new Error(autoHiddenPost.error);
    }
    await repository.save(autoHiddenPost.value);

    await service.list("space-robotics", 50);
    expect(telemetry.listed).toHaveLength(1);
    expect(telemetry.listed[0]?.surface).toBe("space_board");
    expect(telemetry.listed[0]?.returnedCount).toBe(2);
    expect(telemetry.pinned).toHaveLength(1);
    expect(telemetry.pinned[0]?.pinnedCount).toBe(1);
    expect(telemetry.autoHidden).toHaveLength(1);
    expect(telemetry.autoHidden[0]?.autoHiddenCount).toBe(1);
  });
});
