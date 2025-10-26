// Bounded Context Owner: Community Guild
import type {
  SpacePostAudience,
  SpacePostModerationStatus
} from "../aggregates/space-post.aggregate";
export interface SpacePostCreatedEvent {
  readonly type: "SpacePostCreated";
  readonly payload: {
    readonly postId: string;
    readonly spaceId: string;
    readonly authorId: string;
  };
}

export interface SpacePostUpdatedEvent {
  readonly type: "SpacePostUpdated";
  readonly payload: {
    readonly postId: string;
    readonly spaceId: string;
  };
}

export interface SpacePostModerationChangedEvent {
  readonly type: "SpacePostModerationChanged";
  readonly payload: {
    readonly postId: string;
    readonly spaceId: string;
    readonly from: SpacePostModerationStatus;
    readonly to: SpacePostModerationStatus;
    readonly actorId: string;
    readonly reason: string | null;
    readonly escalatedReason: string | null;
  };
}

export interface SpacePostAudienceChangedEvent {
  readonly type: "SpacePostAudienceChanged";
  readonly payload: {
    readonly postId: string;
    readonly spaceId: string;
    readonly from: SpacePostAudience;
    readonly to: SpacePostAudience;
    readonly actorId: string;
    readonly reason: string | null;
    readonly previousShareToCampus: boolean;
    readonly shareToCampus: boolean;
  };
}

export interface SpacePostPinStatusChangedEvent {
  readonly type: "SpacePostPinStatusChanged";
  readonly payload: {
    readonly postId: string;
    readonly spaceId: string;
    readonly actorId: string;
    readonly action: "pinned" | "unpinned";
    readonly pinnedAt: Date | null;
    readonly pinExpiresAt: Date | null;
    readonly previousPinnedAt: Date | null;
    readonly previousPinExpiresAt: Date | null;
    readonly reason: string | null;
  };
}

export type SpacePostDomainEvent =
  | SpacePostCreatedEvent
  | SpacePostUpdatedEvent
  | SpacePostModerationChangedEvent
  | SpacePostAudienceChangedEvent
  | SpacePostPinStatusChangedEvent;
