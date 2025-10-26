// Bounded Context Owner: Community Guild
import type { SpacePostAttachment } from "./aggregates/space-post.aggregate";

export type SpaceMediaApprovalStatus = "pending" | "approved" | "rejected";

export interface SpaceMediaApproval {
  readonly id: string;
  readonly spaceId: string;
  readonly postId: string;
  readonly attachment: SpacePostAttachment;
  readonly status: SpaceMediaApprovalStatus;
  readonly requestedBy: string;
  readonly requestedAt: Date;
  readonly resolvedBy: string | null;
  readonly resolvedAt: Date | null;
  readonly resolutionReason: string | null;
}

export interface SpaceMediaApprovalEnqueueInput {
  readonly id: string;
  readonly spaceId: string;
  readonly postId: string;
  readonly attachment: SpacePostAttachment;
  readonly requestedBy: string;
  readonly requestedAt: Date;
}

export interface SpaceMediaApprovalUpdate {
  readonly status: Exclude<SpaceMediaApprovalStatus, "pending">;
  readonly resolvedBy: string;
  readonly resolvedAt: Date;
  readonly resolutionReason?: string | null;
}
