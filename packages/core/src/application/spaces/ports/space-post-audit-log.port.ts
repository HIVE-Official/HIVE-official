// Bounded Context Owner: Community Guild
import type {
  SpacePostAudience,
  SpacePostModerationStatus
} from "../../../domain/spaces/aggregates/space-post.aggregate";

export type SpacePostAuditLogEvent =
  | {
      readonly type: "space_post.pin_status.changed";
      readonly occurredAt: Date;
      readonly spaceId: string;
      readonly postId: string;
      readonly actorId: string;
      readonly action: "pinned" | "unpinned";
      readonly reason: string | null;
      readonly pinnedAt: Date | null;
      readonly pinExpiresAt: Date | null;
      readonly previousPinnedAt: Date | null;
      readonly previousPinExpiresAt: Date | null;
    }
  | {
      readonly type: "space_post.audience.changed";
      readonly occurredAt: Date;
      readonly spaceId: string;
      readonly postId: string;
      readonly actorId: string;
      readonly from: SpacePostAudience;
      readonly to: SpacePostAudience;
      readonly reason: string | null;
      readonly previousShareToCampus: boolean;
      readonly shareToCampus: boolean;
    }
  | {
      readonly type: "space_post.moderation.changed";
      readonly occurredAt: Date;
      readonly spaceId: string;
      readonly postId: string;
      readonly actorId: string;
      readonly from: SpacePostModerationStatus;
      readonly to: SpacePostModerationStatus;
      readonly reason: string | null;
      readonly escalatedReason: string | null;
    };

export interface SpacePostAuditLogPort {
  record(event: SpacePostAuditLogEvent): Promise<void>;
}
