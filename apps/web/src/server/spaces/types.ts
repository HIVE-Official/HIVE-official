// Bounded Context Owner: Community Guild
// Serialized contracts for Spaces payloads returned by server routes.

export interface SpacePostSerialized {
  readonly id: string;
  readonly spaceId: string;
  readonly authorId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly reactions: number;
  readonly commentCount: number;
  readonly tags: readonly string[];
  readonly kind: string;
  readonly audience: "members" | "campus" | "public";
  readonly origin: string;
  readonly shareToCampus: boolean;
  readonly qualityScore: number | null;
  readonly moderationStatus: string;
  readonly moderationUpdatedAt: string;
  readonly moderationUpdatedBy: string;
  readonly moderationReason: string | null;
  readonly moderationEscalatedAt: string | null;
  readonly moderationEscalatedBy: string | null;
  readonly moderationEscalatedReason: string | null;
  readonly pinnedAt: string | null;
  readonly pinExpiresAt: string | null;
  readonly attachments: readonly {
    readonly type: string;
    readonly url: string;
    readonly title: string | null;
    readonly description: string | null;
  }[];
  readonly event: null | {
    readonly title: string;
    readonly description: string | null;
    readonly location: string;
    readonly startAt: string;
    readonly endAt: string;
    readonly maxAttendees: number | null;
    readonly enableWaitlist: boolean;
    readonly goingCount: number;
    readonly maybeCount: number;
    readonly waitlistCount: number;
    readonly checkInEnabled: boolean;
    readonly checkedInCount: number;
    readonly checkInWindowBefore: number | null;
    readonly checkInWindowAfter: number | null;
    readonly qrCodeEnabled: boolean;
    readonly coHostIds: readonly string[];
    readonly coHostNames: readonly string[];
    readonly isRssImported: boolean;
    readonly userRsvp: "going" | "maybe" | "not_going" | "waitlist" | null;
    readonly userCheckedIn: boolean;
    readonly coverImageUrl: string | null;
    readonly coverImageAlt: string | null;
  };
  readonly toolContext: null | {
    readonly toolId: string;
    readonly toolSlug: string | null;
    readonly placementId: string | null;
    readonly variant: string | null;
    readonly toolVersion: number | null;
  };
  readonly engagementSummary: Record<string, number> | null;
}

export interface SerializedSpaceSettings {
  readonly maxMembers?: number;
  readonly isInviteOnly: boolean;
  readonly postingPolicy: "members" | "leaders_only";
  readonly joinPolicy?: "open" | "request" | "invite_only";
  readonly mediaApprovalPolicy?: "leaders_only" | "all" | "disabled";
}

export interface SerializedSpaceMember {
  readonly profileId: string;
  readonly role: string;
  readonly joinedAt: string;
  readonly presence?: { status: "online" | "recent" | "offline"; lastActive: string };
}

export interface SerializedSpace {
  readonly id: string;
  readonly campusId: string;
  readonly name: string;
  readonly description: string;
  readonly type: string;
  readonly visibility: string;
  readonly tags: readonly string[];
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly leaderId: string;
  readonly settings: SerializedSpaceSettings;
  readonly memberCount: number;
  readonly onlineNow: number;
  readonly activityScore: number;
  readonly urgency: "low" | "medium" | "high";
  readonly membership: SerializedSpaceMember | null;
  readonly tagline: string | null;
  readonly accentIcon: string | null;
  readonly pattern: string | null;
  readonly tools?: ReadonlyArray<Record<string, unknown>>;
  readonly postingPolicy: string;
  readonly shareToCampusAllowed: boolean;
  readonly members?: readonly SerializedSpaceMember[];
  readonly helperIds?: readonly string[];
  readonly upcomingEvents?: readonly Record<string, unknown>[];
  readonly calendarViewPreferences?: { mobileDefault: "list" | "month"; desktopDefault: "list" | "month" };
  readonly calendarGeneratedAt?: string;
  readonly guidelines?: readonly string[];
  readonly posts?: readonly SpacePostSerialized[];
}
