// Bounded Context Owner: Community Guild
import { describe, it, expect, beforeEach } from "vitest";
import { SpacePostAggregate } from "../../domain/spaces/aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import type { SpaceMediaApprovalRepository } from "../../domain/spaces/media-approval.repository";
import type {
  SpaceMediaApproval,
  SpaceMediaApprovalEnqueueInput,
  SpaceMediaApprovalUpdate
} from "../../domain/spaces/media-approval.types";
import { SpaceMediaApprovalApplicationService } from "./media-approval.application.service";
import { UuidGenerator } from "../../infrastructure/id/uuid-generator";

class FakeUuidGenerator extends UuidGenerator {
  private counter = 0;
  generate(): string {
    this.counter += 1;
    return `approval-${this.counter}`;
  }

  reset() {
    this.counter = 0;
  }
}

class InMemoryMediaApprovalRepository implements SpaceMediaApprovalRepository {
  private readonly store = new Map<string, Map<string, SpaceMediaApproval>>();

  async enqueue(inputs: readonly SpaceMediaApprovalEnqueueInput[]): Promise<void> {
    for (const entry of inputs) {
      const approvals = this.ensureSpace(entry.spaceId);
      approvals.set(entry.id, {
        id: entry.id,
        spaceId: entry.spaceId,
        postId: entry.postId,
        attachment: entry.attachment,
        status: "pending",
        requestedBy: entry.requestedBy,
        requestedAt: entry.requestedAt,
        resolvedBy: null,
        resolvedAt: null,
        resolutionReason: null
      });
    }
  }

  async listBySpace(spaceId: string) {
    return Array.from(this.store.get(spaceId)?.values() ?? []).filter((entry) => entry.status === "pending");
  }

  async findById(spaceId: string, approvalId: string) {
    return this.store.get(spaceId)?.get(approvalId) ?? null;
  }

  async updateStatus(spaceId: string, approvalId: string, update: SpaceMediaApprovalUpdate) {
    const approvals = this.store.get(spaceId);
    if (!approvals) {
      return null;
    }
    const existing = approvals.get(approvalId);
    if (!existing) {
      return null;
    }
    const updated: SpaceMediaApproval = {
      ...existing,
      status: update.status,
      resolvedBy: update.resolvedBy,
      resolvedAt: update.resolvedAt,
      resolutionReason: update.resolutionReason ?? null
    };
    approvals.set(approvalId, updated);
    return updated;
  }

  reset() {
    this.store.clear();
  }

  private ensureSpace(spaceId: string) {
    let approvals = this.store.get(spaceId);
    if (!approvals) {
      approvals = new Map();
      this.store.set(spaceId, approvals);
    }
    return approvals;
  }
}

class InMemoryPostRepository implements SpacePostRepository {
  private readonly store = new Map<string, Map<string, SpacePostAggregate>>();

  async listBySpace(spaceId: string, limit?: number) {
    const posts = Array.from(this.store.get(spaceId)?.values() ?? []);
    return typeof limit === "number" ? posts.slice(0, limit) : posts;
  }

  async findById(spaceId: string, postId: string) {
    return this.store.get(spaceId)?.get(postId) ?? null;
  }

  async save(post: SpacePostAggregate) {
    const spaceStore = this.ensureSpace(post.getSpaceId());
    spaceStore.set(post.getId(), post);
  }

  async listPinsExpiringBefore() {
    return [];
  }

  seed(snapshot: ReturnType<SpacePostAggregate["toSnapshot"]>) {
    const aggregate = SpacePostAggregate.rehydrate(snapshot);
    this.save(aggregate);
  }

  reset() {
    this.store.clear();
  }

  private ensureSpace(spaceId: string) {
    let posts = this.store.get(spaceId);
    if (!posts) {
      posts = new Map();
      this.store.set(spaceId, posts);
    }
    return posts;
  }
}

const createPostSnapshot = () => {
  const creation = SpacePostAggregate.create({
    id: "post-1",
    spaceId: "space-1",
    authorId: "leader-ava",
    authorHandle: "@ava",
    content: "Welcome to Robotics!",
    createdAt: new Date("2025-01-01T18:00:00.000Z")
  });
  if (!creation.ok) {
    throw new Error(creation.error);
  }
  const aggregate = creation.value;
  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

describe("SpaceMediaApprovalApplicationService", () => {
  const mediaRepository = new InMemoryMediaApprovalRepository();
  const postRepository = new InMemoryPostRepository();
  const clock = () => new Date("2025-01-02T10:00:00.000Z");
  const idGenerator = new FakeUuidGenerator();
  const service = new SpaceMediaApprovalApplicationService({
    repository: mediaRepository,
    postRepository,
    idGenerator,
    clock
  });

  beforeEach(() => {
    mediaRepository.reset();
    postRepository.reset();
    idGenerator.reset();
    postRepository.seed(createPostSnapshot());
  });

  it("queues pending media for leader review", async () => {
    const result = await service.enqueuePendingMedia({
      spaceId: "space-1",
      postId: "post-1",
      requestedBy: "member-nia",
      attachments: [
        {
          type: "image",
          url: "https://cdn.hive.edu/uploads/robot.jpg",
          title: "Robot"
        }
      ]
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value).toHaveLength(1);
    expect(result.value[0]?.status).toBe("pending");

    const pending = await service.listPending("space-1");
    expect(pending).toHaveLength(1);
    expect(pending[0]?.attachment.url).toContain("robot.jpg");
  });

  it("approves media by attaching it to the post", async () => {
    const queueResult = await service.enqueuePendingMedia({
      spaceId: "space-1",
      postId: "post-1",
      requestedBy: "member-nia",
      attachments: [
        {
          type: "image",
          url: "https://cdn.hive.edu/uploads/robot.jpg"
        }
      ]
    });
    if (!queueResult.ok) throw new Error("queue failed");
    const approvalId = queueResult.value[0]!.id;

    const approval = await service.approve({
      spaceId: "space-1",
      approvalId,
      actorId: "leader-ava"
    });

    expect(approval.ok).toBe(true);
    if (!approval.ok) return;
    expect(approval.value.status).toBe("approved");

    const post = await postRepository.findById("space-1", "post-1");
    expect(post).not.toBeNull();
    const snapshot = post!.toSnapshot();
    expect(snapshot.attachments).toHaveLength(1);
    expect(snapshot.attachments[0]?.url).toContain("robot.jpg");
  });

  it("rejects media without touching attachments", async () => {
    const queueResult = await service.enqueuePendingMedia({
      spaceId: "space-1",
      postId: "post-1",
      requestedBy: "member-nia",
      attachments: [
        {
          type: "image",
          url: "https://cdn.hive.edu/uploads/robot.jpg"
        }
      ]
    });
    if (!queueResult.ok) throw new Error("queue failed");
    const approvalId = queueResult.value[0]!.id;

    const rejection = await service.reject({
      spaceId: "space-1",
      approvalId,
      actorId: "leader-ava",
      reason: "Blurry image"
    });

    expect(rejection.ok).toBe(true);
    if (!rejection.ok) return;
    expect(rejection.value.status).toBe("rejected");
    expect(rejection.value.resolutionReason).toBe("Blurry image");

    const post = await postRepository.findById("space-1", "post-1");
    expect(post).not.toBeNull();
    expect(post!.toSnapshot().attachments).toHaveLength(0);
  });
});
