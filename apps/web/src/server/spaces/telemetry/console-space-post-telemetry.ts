// Bounded Context Owner: Community Guild
import type {
  SpacePostTelemetryPort,
  SpacePostCreateSuccessMetric,
  SpacePostListMetric,
  SpacePostPinnedCountMetric,
  SpacePostModerationAutoHiddenMetric,
  SpacePostPinsExpiredMetric,
  SpaceMediaApprovalQueuedMetric,
  SpaceMediaApprovalResolvedMetric,
  SpacePostPinStatusChangedMetric,
  SpacePostModerationTransitionMetric
} from "@core";

interface MetricEnvelope {
  readonly metric: string;
  readonly value: number;
  readonly labels: Record<string, string | number | boolean | null | undefined>;
}

const emitMetric = (envelope: MetricEnvelope) => {
  globalThis.console.warn(envelope);
};

export class ConsoleSpacePostTelemetry implements SpacePostTelemetryPort {
  async recordPostCreateSuccess(metric: SpacePostCreateSuccessMetric): Promise<void> {
    emitMetric({
      metric: "spaces.posts.create.success",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        surface: metric.surface,
        durationMs: metric.durationMs,
        attachmentsCount: metric.attachmentsCount,
        pinned: metric.pinned,
        pinExpiresAt: metric.pinExpiresAt?.toISOString() ?? null,
        kind: metric.kind,
        audience: metric.audience,
        origin: metric.origin,
        shareToCampus: metric.shareToCampus
      }
    });
    await Promise.resolve();
  }

  async recordPostCreateFailure(metric: {
    readonly spaceId: string;
    readonly postId: string;
    readonly reason: string;
  }): Promise<void> {
    emitMetric({
      metric: "spaces.posts.create.failure",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        reason: metric.reason
      }
    });
    await Promise.resolve();
  }

  async recordPostListFetched(metric: SpacePostListMetric): Promise<void> {
    emitMetric({
      metric: "spaces.posts.list.latency_ms",
      value: metric.durationMs,
      labels: {
        spaceId: metric.spaceId,
        surface: metric.surface,
        limit: metric.limit ?? null,
        returnedCount: metric.returnedCount
      }
    });
    await Promise.resolve();
  }

  async recordPinnedCount(metric: SpacePostPinnedCountMetric): Promise<void> {
    emitMetric({
      metric: "spaces.posts.pinned.count",
      value: metric.pinnedCount,
      labels: {
        spaceId: metric.spaceId,
        surface: metric.surface
      }
    });
    await Promise.resolve();
  }

  async recordModerationAutoHidden(
    metric: SpacePostModerationAutoHiddenMetric
  ): Promise<void> {
    emitMetric({
      metric: "spaces.posts.moderation.auto_hidden",
      value: metric.autoHiddenCount,
      labels: {
        spaceId: metric.spaceId,
        surface: metric.surface
      }
    });
    await Promise.resolve();
  }

  async recordPinExpired(metric: SpacePostPinsExpiredMetric): Promise<void> {
    emitMetric({
      metric: "spaces.posts.pins.expired",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        expiredAt: metric.expiredAt.toISOString()
      }
    });
    await Promise.resolve();
  }

  async recordMediaApprovalQueued(metric: SpaceMediaApprovalQueuedMetric): Promise<void> {
    emitMetric({
      metric: "spaces.media_approval.queued",
      value: metric.approvalIds.length,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        requestedBy: metric.requestedBy,
        requestedAt: metric.requestedAt.toISOString()
      }
    });
    await Promise.resolve();
  }

  async recordMediaApprovalResolved(metric: SpaceMediaApprovalResolvedMetric): Promise<void> {
    emitMetric({
      metric: "spaces.media_approval.resolved",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        approvalId: metric.approvalId,
        resolvedBy: metric.resolvedBy,
        status: metric.status,
        latencyMs: metric.latencyMs
      }
    });
    await Promise.resolve();
  }

  async recordPinStatusChanged(metric: SpacePostPinStatusChangedMetric): Promise<void> {
    emitMetric({
      metric: "spaces.posts.pin.status_changed",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        actorId: metric.actorId,
        action: metric.action,
        reason: metric.reason ?? null,
        pinnedAt: metric.pinnedAt?.toISOString() ?? null,
        pinExpiresAt: metric.pinExpiresAt?.toISOString() ?? null
      }
    });
    await Promise.resolve();
  }

  async recordModerationTransition(
    metric: SpacePostModerationTransitionMetric
  ): Promise<void> {
    emitMetric({
      metric: "spaces.posts.moderation.transition",
      value: 1,
      labels: {
        spaceId: metric.spaceId,
        postId: metric.postId,
        actorId: metric.actorId,
        from: metric.from,
        to: metric.to,
        reason: metric.reason ?? null,
        escalatedReason: metric.escalatedReason ?? null
      }
    });
    await Promise.resolve();
  }
}
