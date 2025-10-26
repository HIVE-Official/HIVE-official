// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../shared/result";
import type { IdGenerator } from "../../shared/id-generator";
import type { SpacePostAttachment } from "../../domain/spaces/aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import type {
  SpaceMediaApproval,
  SpaceMediaApprovalEnqueueInput
} from "../../domain/spaces/media-approval.types";
import type { SpaceMediaApprovalRepository } from "../../domain/spaces/media-approval.repository";
import type { SpacePostTelemetryPort } from "./ports/space-post-telemetry.port";

export interface SpaceMediaApprovalApplicationServiceDependencies {
  readonly repository: SpaceMediaApprovalRepository;
  readonly postRepository: SpacePostRepository;
  readonly idGenerator: IdGenerator;
  readonly clock?: () => Date;
  readonly telemetry?: SpacePostTelemetryPort;
}

export class SpaceMediaApprovalApplicationService {
  private readonly repository: SpaceMediaApprovalRepository;
  private readonly postRepository: SpacePostRepository;
  private readonly idGenerator: IdGenerator;
  private readonly clock: () => Date;
  private readonly telemetry?: SpacePostTelemetryPort;

  constructor(dependencies: SpaceMediaApprovalApplicationServiceDependencies) {
    this.repository = dependencies.repository;
    this.postRepository = dependencies.postRepository;
    this.idGenerator = dependencies.idGenerator;
    this.clock = dependencies.clock ?? (() => new Date());
    this.telemetry = dependencies.telemetry;
  }

  async enqueuePendingMedia(input: {
    readonly spaceId: string;
    readonly postId: string;
    readonly requestedBy: string;
    readonly attachments: readonly SpacePostAttachment[];
  }): Promise<Result<readonly SpaceMediaApproval[]>> {
    if (!input.attachments.length) {
      return ok([]);
    }

    const requestedAt = this.clock();
    const entries: SpaceMediaApprovalEnqueueInput[] = input.attachments.map((attachment) => ({
      id: this.idGenerator.generate(),
      spaceId: input.spaceId,
      postId: input.postId,
      attachment,
      requestedBy: input.requestedBy,
      requestedAt
    }));

    await this.repository.enqueue(entries);

    void this.telemetry?.recordMediaApprovalQueued?.({
      spaceId: input.spaceId,
      postId: input.postId,
      approvalIds: entries.map((entry) => entry.id),
      requestedBy: input.requestedBy,
      requestedAt
    });

    return ok(
      entries.map((entry) => ({
        id: entry.id,
        spaceId: entry.spaceId,
        postId: entry.postId,
        attachment: entry.attachment,
        status: "pending",
        requestedBy: entry.requestedBy,
        requestedAt: entry.requestedAt,
        resolvedAt: null,
        resolvedBy: null,
        resolutionReason: null
      }))
    );
  }

  async listPending(spaceId: string): Promise<readonly SpaceMediaApproval[]> {
    return this.repository.listBySpace(spaceId, "pending");
  }

  async get(spaceId: string, approvalId: string): Promise<SpaceMediaApproval | null> {
    return this.repository.findById(spaceId, approvalId);
  }

  async approve(input: {
    readonly spaceId: string;
    readonly approvalId: string;
    readonly actorId: string;
  }): Promise<Result<SpaceMediaApproval>> {
    const existing = await this.repository.findById(input.spaceId, input.approvalId);
    if (!existing) {
      return err("Approval request not found");
    }
    if (existing.status !== "pending") {
      return err("Approval request already resolved");
    }

    const resolvedAt = this.clock();
    const updated = await this.repository.updateStatus(input.spaceId, input.approvalId, {
      status: "approved",
      resolvedAt,
      resolvedBy: input.actorId,
      resolutionReason: null
    });

    if (!updated) {
      return err("Failed to resolve approval request");
    }

    const post = await this.postRepository.findById(updated.spaceId, updated.postId);
    if (!post) {
      return err("Associated post not found");
    }

    const snapshot = post.toSnapshot();
    const attachments = [...snapshot.attachments, updated.attachment];
    const result = post.replaceAttachments(attachments, resolvedAt);
    if (!result.ok) {
      return result;
    }

    await this.postRepository.save(post);

    void this.telemetry?.recordMediaApprovalResolved?.({
      spaceId: updated.spaceId,
      postId: updated.postId,
      approvalId: updated.id,
      resolvedBy: input.actorId,
      status: "approved",
      latencyMs: resolvedAt.getTime() - updated.requestedAt.getTime()
    });

    return ok(updated);
  }

  async reject(input: {
    readonly spaceId: string;
    readonly approvalId: string;
    readonly actorId: string;
    readonly reason?: string | null;
  }): Promise<Result<SpaceMediaApproval>> {
    const existing = await this.repository.findById(input.spaceId, input.approvalId);
    if (!existing) {
      return err("Approval request not found");
    }
    if (existing.status !== "pending") {
      return err("Approval request already resolved");
    }

    const resolvedAt = this.clock();
    const updated = await this.repository.updateStatus(input.spaceId, input.approvalId, {
      status: "rejected",
      resolvedAt,
      resolvedBy: input.actorId,
      resolutionReason: input.reason ?? null
    });

    if (!updated) {
      return err("Failed to resolve approval request");
    }

    void this.telemetry?.recordMediaApprovalResolved?.({
      spaceId: updated.spaceId,
      postId: updated.postId,
      approvalId: updated.id,
      resolvedBy: input.actorId,
      status: "rejected",
      latencyMs: resolvedAt.getTime() - updated.requestedAt.getTime()
    });

    return ok(updated);
  }
}
