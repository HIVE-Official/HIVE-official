// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../shared/result";
import {
  SpacePostAggregate,
  type SpacePostSnapshot,
  type SpacePostAudience,
  type SpacePostKind,
  type SpacePostOrigin,
  type SpacePostModerationStatus,
  type SpacePostModerationInput,
  type SpacePostToolContext,
  type SpacePostEngagementSummary,
  type SpacePostAttachment,
  type SpacePostEventDetails
} from "../../domain/spaces/aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../../domain/spaces/space-post.repository";
import type { SpacePostTelemetryPort } from "./ports/space-post-telemetry.port";
import type { SpacePostDomainEventPublisherPort } from "./ports/space-post-domain-event-publisher.port";

export interface SpacePostApplicationServiceDependencies {
  readonly repository: SpacePostRepository;
  readonly clock?: () => Date;
  readonly telemetry?: SpacePostTelemetryPort;
  readonly events?: SpacePostDomainEventPublisherPort;
}

export class SpacePostApplicationService {
  private readonly repository: SpacePostRepository;
  private readonly clock: () => Date;
  private readonly telemetry?: SpacePostTelemetryPort;
  private readonly eventPublisher?: SpacePostDomainEventPublisherPort;

  constructor(dependencies: SpacePostApplicationServiceDependencies) {
    this.repository = dependencies.repository;
    this.clock = dependencies.clock ?? (() => new Date());
    this.telemetry = dependencies.telemetry;
    this.eventPublisher = dependencies.events;
  }

  async list(
    spaceId: string,
    limit?: number,
    surface: "space_board" | "campus_feed" | "internal_metrics" = "space_board"
  ): Promise<SpacePostSnapshot[]> {
    const startedAt = this.clock();
    const posts = await this.repository.listBySpace(spaceId, limit);
    // Repositories are expected to return posts in reverse chronological order.
    const snapshots = posts.map((post) => post.toSnapshot());
    const pinnedCount = snapshots.filter((snapshot) => snapshot.pinnedAt !== null).length;
    const autoHiddenCount = snapshots.filter(
      (snapshot) => snapshot.moderationStatus === "auto_hidden"
    ).length;

    const endedAt = this.clock();
    const durationMs = endedAt.getTime() - startedAt.getTime();

    if (surface !== "internal_metrics") {
      void this.telemetry?.recordPostListFetched({
        spaceId,
        surface,
        durationMs,
        limit,
        returnedCount: snapshots.length
      });
      void this.telemetry?.recordPinnedCount({
        spaceId,
        surface,
        pinnedCount
      });
      void this.telemetry?.recordModerationAutoHidden({
        spaceId,
        surface,
        autoHiddenCount
      });
    }

    return snapshots;
  }

  async create(input: {
    postId: string;
    spaceId: string;
    authorId: string;
    authorHandle: string;
    content: string;
    tags?: readonly string[];
    kind?: SpacePostKind;
    audience?: SpacePostAudience;
    origin?: SpacePostOrigin;
    shareToCampus?: boolean;
    qualityScore?: number | null;
    moderationStatus?: SpacePostModerationStatus;
    moderation?: SpacePostModerationInput;
    pinnedAt?: Date | null;
    pinExpiresAt?: Date | null;
    toolContext?: SpacePostToolContext | null;
    engagementSummary?: SpacePostEngagementSummary | null;
    attachments?: readonly SpacePostAttachment[];
    event?: SpacePostEventDetails | null;
  }): Promise<Result<SpacePostSnapshot>> {
    if (input.toolContext?.placementId?.startsWith("board:")) {
      const existing = await this.repository.listBySpace(input.spaceId);
      const snapshots = existing.map((aggregate) => aggregate.toSnapshot());
      const conflicts = snapshots.filter((snapshot) => {
        const context = snapshot.toolContext;
        if (!context) return false;
        if (context.toolId !== input.toolContext?.toolId) return false;
        return context.placementId?.startsWith("board:");
      });

      if (input.toolContext.placementId === "board:input" && conflicts.some((snapshot) => snapshot.toolContext?.placementId === "board:input")) {
        return err("A board thread for this tool already exists. Collapse updates under the active thread instead of opening a new one.");
      }

      if (input.toolContext.placementId === "board:recap" && conflicts.some((snapshot) => snapshot.toolContext?.placementId === "board:recap")) {
        return err("This tool already has a recap post. Share results in the existing thread.");
      }
    }

    const startedAt = this.clock();
    const creation = SpacePostAggregate.create({
      id: input.postId,
      spaceId: input.spaceId,
      authorId: input.authorId,
      authorHandle: input.authorHandle,
      content: input.content,
      createdAt: this.clock(),
      tags: input.tags,
      kind: input.kind,
      audience: input.audience,
      origin: input.origin,
      shareToCampus: input.shareToCampus,
      qualityScore: input.qualityScore,
      moderationStatus: input.moderationStatus,
      moderation: input.moderation,
      pinnedAt: input.pinnedAt,
      pinExpiresAt: input.pinExpiresAt,
      toolContext: input.toolContext,
      engagementSummary: input.engagementSummary,
      attachments: input.attachments,
      event: input.event ?? null
    });

    if (!creation.ok) {
      void this.telemetry?.recordPostCreateFailure?.({
        spaceId: input.spaceId,
        postId: input.postId,
        reason: creation.error
      });
      return creation;
    }

    const aggregate = creation.value;
    await this.repository.save(aggregate);
    const snapshot = aggregate.toSnapshot();
    const endedAt = this.clock();
    const durationMs = endedAt.getTime() - startedAt.getTime();

    await this.dispatchDomainEvents(aggregate, snapshot.createdAt);

    void this.telemetry?.recordPostCreateSuccess({
      spaceId: snapshot.spaceId,
      postId: snapshot.id,
      surface: "space_board",
      durationMs,
      attachmentsCount: snapshot.attachments.length,
      pinned: snapshot.pinnedAt !== null,
      pinExpiresAt: snapshot.pinExpiresAt,
      kind: snapshot.kind,
      audience: snapshot.audience,
      origin: snapshot.origin,
      shareToCampus: snapshot.shareToCampus
    });

    return ok(snapshot);
  }

  async setEventRsvp(input: {
    readonly spaceId: string;
    readonly postId: string;
    readonly status: "going" | "maybe" | "not_going" | "waitlist" | null;
    readonly at?: Date;
  }): Promise<Result<SpacePostSnapshot>> {
    const post = await this.repository.findById(input.spaceId, input.postId);
    if (!post) return err("Post not found");
    const at = input.at ?? this.clock();
    const result = post.setEventRsvp(input.status, at);
    if (!result.ok) return err(result.error);
    await this.repository.save(post);
    await this.dispatchDomainEvents(post, at);
    return ok(post.toSnapshot());
  }

  async setEventCheckIn(input: {
    readonly spaceId: string;
    readonly postId: string;
    readonly checkedIn: boolean;
    readonly at?: Date;
  }): Promise<Result<SpacePostSnapshot>> {
    const post = await this.repository.findById(input.spaceId, input.postId);
    if (!post) return err("Post not found");
    const at = input.at ?? this.clock();
    const snap = post.toSnapshot();
    if (snap.kind !== "event" || !snap.event) return err("CHECKIN_NOT_EVENT");
    if (!snap.event.checkInEnabled) return err("CHECKIN_DISABLED");
    const start = snap.event.startAt;
    const end = snap.event.endAt;
    const beforeMin = snap.event.checkInWindowBefore ?? 0;
    const afterMin = snap.event.checkInWindowAfter ?? 0;
    const windowStart = new Date(start.getTime() - beforeMin * 60_000);
    const windowEnd = new Date(end.getTime() + afterMin * 60_000);
    if (at < windowStart || at > windowEnd) {
      return err("CHECKIN_WINDOW_CLOSED");
    }
    const result = post.setEventCheckIn(input.checkedIn, at);
    if (!result.ok) return err(result.error);
    await this.repository.save(post);
    await this.dispatchDomainEvents(post, at);
    return ok(post.toSnapshot());
  }

  async setPinStatus(input: {
    readonly spaceId: string;
    readonly postId: string;
    readonly actorId: string;
    readonly action: "pin" | "unpin";
    readonly at?: Date;
    readonly expiresAt?: Date | null;
  }): Promise<Result<SpacePostSnapshot>> {
    const post = await this.repository.findById(input.spaceId, input.postId);
    if (!post) return err("Post not found");
    const at = input.at ?? this.clock();
    if (input.action === "pin") {
      const existing = await this.repository.listBySpace(input.spaceId);
      const pinnedCount = existing.filter((p) => {
        const s = p.toSnapshot();
        return s.pinnedAt !== null && p.getId() !== input.postId;
      }).length;
      if (pinnedCount >= 2) {
        return err("PIN_LIMIT_REACHED");
      }
      const res = post.pin({
        actorId: input.actorId,
        at,
        ...(input.expiresAt ? { expiresAt: input.expiresAt } : {})
      });
      if (!res.ok) return err(res.error);
    } else {
      const res = post.unpin({ actorId: input.actorId }, at);
      if (!res.ok) return err(res.error);
    }
    await this.repository.save(post);
    await this.dispatchDomainEvents(post, at);
    return ok(post.toSnapshot());
  }

  async applyModerationAction(input: {
    readonly spaceId: string;
    readonly postId: string;
    readonly actorId: string;
    readonly action: "auto_hide" | "unhide" | "escalate" | "remove";
    readonly reason?: string | null;
    readonly escalatedReason?: string | null;
    readonly at?: Date;
  }): Promise<Result<SpacePostSnapshot>> {
    const post = await this.repository.findById(input.spaceId, input.postId);
    if (!post) {
      return err("Post not found");
    }

    const at = input.at ?? this.clock();
    const statusByAction: Record<
      "auto_hide" | "unhide" | "escalate" | "remove",
      SpacePostModerationStatus
    > = {
      auto_hide: "auto_hidden",
      unhide: "active",
      escalate: "escalated",
      remove: "removed"
    };

    const status = statusByAction[input.action];
    if (!status) {
      return err(`Unsupported moderation action: ${input.action}`);
    }

    const result = post.setModerationStatus(
      status,
      {
        actorId: input.actorId,
        reason: input.reason ?? null,
        escalatedReason:
          input.action === "escalate" ? input.escalatedReason ?? input.reason ?? null : null
      },
      at
    );

    if (!result.ok) {
      return err(result.error);
    }

    await this.repository.save(post);
    await this.dispatchDomainEvents(post, at);

    return ok(post.toSnapshot());
  }

  private async dispatchDomainEvents(post: SpacePostAggregate, occurredAt: Date): Promise<void> {
    const events = post.pullDomainEvents();
    if (!events.length) {
      return;
    }
    await this.eventPublisher?.publish(events, occurredAt);
  }
}
