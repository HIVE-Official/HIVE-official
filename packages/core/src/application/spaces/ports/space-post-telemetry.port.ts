// Bounded Context Owner: Community Guild
import type { SpacePostModerationStatus } from "../../../domain/spaces/aggregates/space-post.aggregate";

export interface SpacePostCreateSuccessMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly surface: "space_board" | "campus_feed";
  readonly durationMs: number;
  readonly attachmentsCount: number;
  readonly pinned: boolean;
  readonly pinExpiresAt?: Date | null;
  readonly kind: string;
  readonly audience: string;
  readonly origin: string;
  readonly shareToCampus: boolean;
}

export interface SpacePostCreateFailureMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly reason: string;
}

export interface SpacePostListMetric {
  readonly spaceId: string;
  readonly surface: "space_board" | "campus_feed" | "internal_metrics";
  readonly durationMs: number;
  readonly limit?: number;
  readonly returnedCount: number;
}

export interface SpacePostPinnedCountMetric {
  readonly spaceId: string;
  readonly surface: "space_board" | "campus_feed" | "internal_metrics";
  readonly pinnedCount: number;
}

export interface SpacePostModerationAutoHiddenMetric {
  readonly spaceId: string;
  readonly surface: "space_board" | "campus_feed" | "internal_metrics";
  readonly autoHiddenCount: number;
}

export interface SpacePostPinsExpiredMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly expiredAt: Date;
}

export interface SpaceMediaApprovalQueuedMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly approvalIds: readonly string[];
  readonly requestedBy: string;
  readonly requestedAt: Date;
}

export interface SpaceMediaApprovalResolvedMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly approvalId: string;
  readonly resolvedBy: string;
  readonly status: "approved" | "rejected";
  readonly latencyMs: number;
}

export interface SpacePostPinStatusChangedMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly actorId: string;
  readonly action: "pinned" | "unpinned";
  readonly reason: string | null;
  readonly pinnedAt: Date | null;
  readonly pinExpiresAt: Date | null;
}

export interface SpacePostModerationTransitionMetric {
  readonly spaceId: string;
  readonly postId: string;
  readonly actorId: string;
  readonly from: SpacePostModerationStatus;
  readonly to: SpacePostModerationStatus;
  readonly reason: string | null;
  readonly escalatedReason: string | null;
}

export interface SpacePostTelemetryPort {
  recordPostCreateSuccess(metric: SpacePostCreateSuccessMetric): Promise<void>;
  recordPostCreateFailure?(metric: SpacePostCreateFailureMetric): Promise<void>;
  recordPostListFetched(metric: SpacePostListMetric): Promise<void>;
  recordPinnedCount(metric: SpacePostPinnedCountMetric): Promise<void>;
  recordModerationAutoHidden(metric: SpacePostModerationAutoHiddenMetric): Promise<void>;
  recordPinExpired(metric: SpacePostPinsExpiredMetric): Promise<void>;
  recordMediaApprovalQueued?(metric: SpaceMediaApprovalQueuedMetric): Promise<void>;
  recordMediaApprovalResolved?(metric: SpaceMediaApprovalResolvedMetric): Promise<void>;
  recordPinStatusChanged?(metric: SpacePostPinStatusChangedMetric): Promise<void>;
  recordModerationTransition?(metric: SpacePostModerationTransitionMetric): Promise<void>;
}
