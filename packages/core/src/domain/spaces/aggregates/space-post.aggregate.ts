// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../../shared/result";
import type { SpacePostDomainEvent } from "../events/post.events";

const MAX_CONTENT_LENGTH = 4000;
const QUALITY_SCORE_MIN = 0;
const QUALITY_SCORE_MAX = 100;
const MAX_MODERATION_REASON_LENGTH = 500;

const ENGAGEMENT_KEYS = [
  "rsvpYes",
  "rsvpMaybe",
  "rsvpNo",
  "checkIns",
  "acknowledgements",
  "formSubmissions"
] as const;

export type SpacePostKind =
  | "standard"
  | "event"
  | "form"
  | "poll"
  | "check_in"
  | "announcement"
  | "tracker"
  | "digest"
  | "recap";

export type SpacePostAudience = "members" | "campus" | "public";
export type SpacePostOrigin = "member" | "leader" | "tool_manual" | "tool_automation";
export type SpacePostModerationStatus = "active" | "auto_hidden" | "escalated" | "removed";
export type SpacePostEngagementKey = (typeof ENGAGEMENT_KEYS)[number];

export type SpacePostEngagementSummary = Partial<Record<SpacePostEngagementKey, number>>;

export type SpacePostEngagementSummaryPatch = Partial<
  Record<SpacePostEngagementKey, number | null | undefined>
>;

export interface SpacePostModerationInput {
  readonly status?: SpacePostModerationStatus;
  readonly updatedAt?: Date;
  readonly updatedBy?: string;
  readonly reason?: string | null;
  readonly escalatedAt?: Date | null;
  readonly escalatedBy?: string | null;
  readonly escalatedReason?: string | null;
}

export interface SpacePostModerationContext {
  readonly actorId: string;
  readonly reason?: string | null;
  readonly escalatedReason?: string | null;
}

export interface SpacePostAudienceContext {
  readonly actorId: string;
  readonly reason?: string | null;
}

export interface SpacePostPinContext {
  readonly actorId: string;
  readonly reason?: string | null;
}

export type SpacePostAttachmentType = "image" | "file" | "link" | "video";

export interface SpacePostAttachment {
  readonly type: SpacePostAttachmentType;
  readonly url: string;
  readonly title?: string;
  readonly description?: string;
}

export type SpacePostEventRsvpStatus = "going" | "maybe" | "not_going" | "waitlist";

export interface SpacePostEventDetails {
  readonly title: string;
  readonly description: string | null;
  readonly location: string;
  readonly startAt: Date;
  readonly endAt: Date;
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
  readonly userRsvp: SpacePostEventRsvpStatus | null;
  readonly userCheckedIn: boolean;
  readonly coverImageUrl: string | null;
  readonly coverImageAlt: string | null;
}

export interface SpacePostToolContext {
  readonly toolId: string;
  readonly toolSlug?: string;
  readonly placementId?: string;
  readonly variant?: string;
  readonly toolVersion?: number;
}

export interface SpacePostSnapshot {
  readonly id: string;
  readonly spaceId: string;
  readonly authorId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly reactions: number;
  readonly commentCount: number;
  readonly tags: readonly string[];
  readonly kind: SpacePostKind;
  readonly audience: SpacePostAudience;
  readonly origin: SpacePostOrigin;
  readonly shareToCampus: boolean;
  readonly qualityScore: number | null;
  readonly moderationStatus: SpacePostModerationStatus;
  readonly moderationUpdatedAt: Date;
  readonly moderationUpdatedBy: string;
  readonly moderationReason: string | null;
  readonly moderationEscalatedAt: Date | null;
  readonly moderationEscalatedBy: string | null;
  readonly moderationEscalatedReason: string | null;
  readonly pinnedAt: Date | null;
  readonly pinExpiresAt: Date | null;
  readonly attachments: readonly SpacePostAttachment[];
  readonly toolContext: SpacePostToolContext | null;
  readonly engagementSummary: SpacePostEngagementSummary | null;
  readonly event: SpacePostEventDetails | null;
}

export interface SpacePostCreationInput {
  readonly id: string;
  readonly spaceId: string;
  readonly authorId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt?: Date;
  readonly tags?: readonly string[];
  readonly kind?: SpacePostKind;
  readonly audience?: SpacePostAudience;
  readonly origin?: SpacePostOrigin;
  readonly shareToCampus?: boolean;
  readonly qualityScore?: number | null;
  readonly moderationStatus?: SpacePostModerationStatus;
  readonly moderation?: SpacePostModerationInput;
  readonly pinnedAt?: Date | null;
  readonly pinExpiresAt?: Date | null;
  readonly toolContext?: SpacePostToolContext | null;
  readonly engagementSummary?: SpacePostEngagementSummary | null;
  readonly attachments?: readonly SpacePostAttachment[];
  readonly event?: SpacePostEventDetails | null;
}

const sanitizeTags = (tags?: readonly string[]): readonly string[] => {
  if (!tags) {
    return [];
  }

  const seen = new Set<string>();
  const sanitized: string[] = [];

  for (const raw of tags) {
    const trimmed = raw.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    sanitized.push(trimmed);
  }

  return sanitized;
};

const sanitizeAttachments = (
  attachments?: readonly SpacePostAttachment[]
): SpacePostAttachment[] => {
  if (!attachments) return [];
  const result: SpacePostAttachment[] = [];
  for (const attachment of attachments) {
    const url = (attachment.url ?? "").toString().trim();
    if (!url) continue;
    const type = attachment.type;
    if (type !== "image" && type !== "file" && type !== "link" && type !== "video") continue;
    const title = attachment.title?.toString().trim();
    const description = attachment.description?.toString().trim();
    result.push({ type, url, title: title || undefined, description: description || undefined });
  }
  return result;
};

const RSVP_STATUSES: ReadonlySet<SpacePostEventRsvpStatus> = new Set([
  "going",
  "maybe",
  "not_going",
  "waitlist"
] as const);

const toDate = (value: Date | string): Date | null => {
  if (value instanceof Date) {
    const timestamp = value.getTime();
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const normalizeNonNegativeInteger = (value: number | null | undefined): number => {
  if (value === undefined || value === null) {
    return 0;
  }
  const rounded = Math.round(value);
  if (!Number.isFinite(rounded) || rounded < 0) {
    return 0;
  }
  return rounded;
};

const normalizeNullablePositiveInteger = (
  value: number | null | undefined
): number | null => {
  if (value === undefined || value === null) {
    return null;
  }
  const rounded = Math.round(value);
  if (!Number.isFinite(rounded) || rounded <= 0) {
    return null;
  }
  return rounded;
};

const sanitizeEventDetails = (
  kind: SpacePostKind,
  details?: SpacePostEventDetails | null
): Result<SpacePostEventDetails | null> => {
  if (kind !== "event") {
    if (details) {
      return err("Event details can only be set on event posts");
    }
    return ok(null);
  }

  if (!details) {
    return err("Event details are required for event posts");
  }

  const title = details.title?.trim();
  if (!title) {
    return err("Event title is required");
  }

  const location = details.location?.trim();
  if (!location) {
    return err("Event location is required");
  }

  const startAt = toDate(details.startAt);
  if (!startAt) {
    return err("Event start time is invalid");
  }

  const endAt = toDate(details.endAt);
  if (!endAt) {
    return err("Event end time is invalid");
  }

  if (endAt.getTime() <= startAt.getTime()) {
    return err("Event end time must be after the start time");
  }

  const userRsvp = details.userRsvp ?? null;
  if (userRsvp && !RSVP_STATUSES.has(userRsvp)) {
    return err("Event RSVP status is invalid");
  }

  const coHostIds = (details.coHostIds ?? []).map((id) => id.trim()).filter(Boolean);
  const coHostNames = (details.coHostNames ?? []).map((name) => name.trim()).filter(Boolean);

  return ok({
    title,
    description: details.description?.trim?.() ?? null,
    location,
    startAt,
    endAt,
    maxAttendees: normalizeNullablePositiveInteger(details.maxAttendees),
    enableWaitlist: Boolean(details.enableWaitlist),
    goingCount: normalizeNonNegativeInteger(details.goingCount),
    maybeCount: normalizeNonNegativeInteger(details.maybeCount),
    waitlistCount: normalizeNonNegativeInteger(details.waitlistCount),
    checkInEnabled: Boolean(details.checkInEnabled),
    checkedInCount: normalizeNonNegativeInteger(details.checkedInCount),
    checkInWindowBefore:
      details.checkInWindowBefore === null || details.checkInWindowBefore === undefined
        ? null
        : Math.round(details.checkInWindowBefore),
    checkInWindowAfter:
      details.checkInWindowAfter === null || details.checkInWindowAfter === undefined
        ? null
        : Math.round(details.checkInWindowAfter),
    qrCodeEnabled: Boolean(details.qrCodeEnabled),
    coHostIds,
    coHostNames,
    isRssImported: Boolean(details.isRssImported),
    userRsvp,
    userCheckedIn: Boolean(details.userCheckedIn),
    coverImageUrl: details.coverImageUrl?.trim?.() ?? null,
    coverImageAlt: details.coverImageAlt?.trim?.() ?? null
  });
};

const sanitizeToolContext = (
  context?: SpacePostToolContext | null
): SpacePostToolContext | null => {
  if (!context) {
    return null;
  }

  const toolId = context.toolId?.trim?.();
  if (!toolId) {
    return null;
  }

  const toolSlug = context.toolSlug?.trim() || undefined;
  const placementId = context.placementId?.trim() || undefined;
  const variant = context.variant?.trim() || undefined;
  const toolVersion = Number.isFinite(context.toolVersion) ? Number(context.toolVersion) : undefined;

  return {
    toolId,
    toolSlug,
    placementId,
    variant,
    toolVersion
  };
};

const sanitizeEngagementSummary = (
  summary?: SpacePostEngagementSummary | null
): SpacePostEngagementSummary | null => {
  if (!summary) {
    return null;
  }

  const sanitized: SpacePostEngagementSummary = {};
  for (const key of ENGAGEMENT_KEYS) {
    const value = summary[key];
    if (value === undefined) {
      continue;
    }
    if (!Number.isFinite(value) || value < 0) {
      continue;
    }
    sanitized[key] = Math.round(value);
  }

  return Object.keys(sanitized).length > 0 ? sanitized : null;
};

const sanitizeReason = (reason?: string | null): string | null => {
  if (reason === undefined || reason === null) {
    return null;
  }
  const trimmed = reason.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.length > MAX_MODERATION_REASON_LENGTH) {
    return trimmed.slice(0, MAX_MODERATION_REASON_LENGTH);
  }
  return trimmed;
};

const AUDIENCE_TRANSITIONS: Record<SpacePostAudience, readonly SpacePostAudience[]> = {
  members: ["campus", "public"],
  campus: ["members", "public"],
  public: ["campus", "members"]
} as const;

const MODERATION_TRANSITIONS: Record<
  SpacePostModerationStatus,
  readonly SpacePostModerationStatus[]
> = {
  active: ["auto_hidden", "removed"],
  auto_hidden: ["active", "removed", "escalated"],
  escalated: ["active", "removed"],
  removed: []
} as const;

const datesEqual = (a: Date | null, b: Date | null): boolean => {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  return a.getTime() === b.getTime();
};

const arraysEqual = (a: readonly string[], b: readonly string[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((value, index) => value === b[index]);
};

const attachmentsEqual = (
  a: readonly SpacePostAttachment[],
  b: readonly SpacePostAttachment[]
): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, index) => {
    const candidate = b[index];
    return (
      candidate.type === item.type &&
      candidate.url === item.url &&
      candidate.title === item.title &&
      candidate.description === item.description
    );
  });
};

const toolContextsEqual = (
  a: SpacePostToolContext | null,
  b: SpacePostToolContext | null
): boolean => {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  return (
    a.toolId === b.toolId &&
    a.toolSlug === b.toolSlug &&
    a.placementId === b.placementId &&
    a.variant === b.variant
  );
};

const engagementSummariesEqual = (
  a: SpacePostEngagementSummary | null,
  b: SpacePostEngagementSummary | null
): boolean => {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  for (const key of ENGAGEMENT_KEYS) {
    if ((a[key] ?? undefined) !== (b[key] ?? undefined)) {
      return false;
    }
  }

  return true;
};

const eventDetailsEqual = (
  a: SpacePostEventDetails | null,
  b: SpacePostEventDetails | null
): boolean => {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (a.title !== b.title) return false;
  if ((a.description ?? null) !== (b.description ?? null)) return false;
  if (a.location !== b.location) return false;
  if (!datesEqual(a.startAt, b.startAt)) return false;
  if (!datesEqual(a.endAt, b.endAt)) return false;
  if ((a.maxAttendees ?? null) !== (b.maxAttendees ?? null)) return false;
  if (a.enableWaitlist !== b.enableWaitlist) return false;
  if (a.goingCount !== b.goingCount) return false;
  if (a.maybeCount !== b.maybeCount) return false;
  if (a.waitlistCount !== b.waitlistCount) return false;
  if (a.checkInEnabled !== b.checkInEnabled) return false;
  if (a.checkedInCount !== b.checkedInCount) return false;
  if ((a.checkInWindowBefore ?? null) !== (b.checkInWindowBefore ?? null)) return false;
  if ((a.checkInWindowAfter ?? null) !== (b.checkInWindowAfter ?? null)) return false;
  if (a.qrCodeEnabled !== b.qrCodeEnabled) return false;
  if (!arraysEqual(a.coHostIds, b.coHostIds)) return false;
  if (!arraysEqual(a.coHostNames, b.coHostNames)) return false;
  if (a.isRssImported !== b.isRssImported) return false;
  if ((a.userRsvp ?? null) !== (b.userRsvp ?? null)) return false;
  if (a.userCheckedIn !== b.userCheckedIn) return false;
  if ((a.coverImageUrl ?? null) !== (b.coverImageUrl ?? null)) return false;
  if ((a.coverImageAlt ?? null) !== (b.coverImageAlt ?? null)) return false;

  return true;
};

const hasSnapshotChanged = (prev: SpacePostSnapshot, next: SpacePostSnapshot): boolean => {
  if (prev === next) {
    return false;
  }

  if (prev.content !== next.content) return true;
  if (prev.reactions !== next.reactions) return true;
  if (prev.commentCount !== next.commentCount) return true;
  if (prev.kind !== next.kind) return true;
  if (prev.audience !== next.audience) return true;
  if (prev.origin !== next.origin) return true;
  if (prev.shareToCampus !== next.shareToCampus) return true;
  if (prev.qualityScore !== next.qualityScore) return true;
  if (prev.moderationStatus !== next.moderationStatus) return true;
  if (!datesEqual(prev.moderationUpdatedAt, next.moderationUpdatedAt)) return true;
  if (prev.moderationUpdatedBy !== next.moderationUpdatedBy) return true;
  if ((prev.moderationReason ?? null) !== (next.moderationReason ?? null)) return true;
  if (!datesEqual(prev.moderationEscalatedAt, next.moderationEscalatedAt)) return true;
  if ((prev.moderationEscalatedBy ?? null) !== (next.moderationEscalatedBy ?? null)) return true;
  if ((prev.moderationEscalatedReason ?? null) !== (next.moderationEscalatedReason ?? null)) return true;
  if (!datesEqual(prev.pinnedAt, next.pinnedAt)) return true;
  if (!datesEqual(prev.pinExpiresAt, next.pinExpiresAt)) return true;
  if (!arraysEqual(prev.tags, next.tags)) return true;
  if (!attachmentsEqual(prev.attachments, next.attachments)) return true;
  if (!toolContextsEqual(prev.toolContext, next.toolContext)) return true;
  if (!engagementSummariesEqual(prev.engagementSummary, next.engagementSummary)) return true;
  if (!eventDetailsEqual(prev.event, next.event)) return true;

  return false;
};

const cloneAttachments = (attachments: readonly SpacePostAttachment[]) =>
  attachments.map((attachment) => ({ ...attachment }));

const cloneEngagementSummary = (summary: SpacePostEngagementSummary | null) =>
  summary ? { ...summary } : null;

const cloneToolContext = (context: SpacePostToolContext | null) =>
  context ? { ...context } : null;

const cloneEventDetails = (event: SpacePostEventDetails | null) => {
  if (!event) {
    return null;
  }

  return {
    ...event,
    startAt: new Date(event.startAt.getTime()),
    endAt: new Date(event.endAt.getTime()),
    coHostIds: [...event.coHostIds],
    coHostNames: [...event.coHostNames]
  };
};

export class SpacePostAggregate {
  private props: SpacePostSnapshot;
  private readonly events: SpacePostDomainEvent[] = [];

  private constructor(snapshot: SpacePostSnapshot) {
    this.props = {
      ...snapshot,
      moderationUpdatedAt: new Date(snapshot.moderationUpdatedAt.getTime()),
      moderationEscalatedAt: snapshot.moderationEscalatedAt
        ? new Date(snapshot.moderationEscalatedAt.getTime())
        : null,
      tags: [...snapshot.tags],
      attachments: cloneAttachments(snapshot.attachments),
      engagementSummary: cloneEngagementSummary(snapshot.engagementSummary),
      toolContext: cloneToolContext(snapshot.toolContext),
      event: cloneEventDetails(snapshot.event)
    };
  }

  static create(input: SpacePostCreationInput): Result<SpacePostAggregate> {
    const sanitizedContent = input.content.trim();
    if (sanitizedContent.length === 0) {
      return err("Post content cannot be empty");
    }

    if (sanitizedContent.length > MAX_CONTENT_LENGTH) {
      return err("Post content is too long");
    }

    const createdAt = input.createdAt ?? new Date();
    const kind = input.kind ?? "standard";
    const audience = input.audience ?? "members";
    const toolContext = sanitizeToolContext(input.toolContext);
    const origin = input.origin ?? (toolContext ? "tool_manual" : "member");
    const shareToCampus = Boolean(input.shareToCampus);
    if (audience === "members" && shareToCampus) {
      return err("Cannot enable campus sharing for members-only audience");
    }
    const moderationInput = input.moderation ?? {};
    const moderationStatus = moderationInput.status ?? input.moderationStatus ?? "active";
    const qualityScore =
      input.qualityScore === null || input.qualityScore === undefined
        ? null
        : Number(input.qualityScore);

    if (qualityScore !== null) {
      if (!Number.isFinite(qualityScore)) {
        return err("Quality score must be a finite number");
      }
      if (qualityScore < QUALITY_SCORE_MIN || qualityScore > QUALITY_SCORE_MAX) {
        return err("Quality score must be between 0 and 100");
      }
    }

    const pinnedAt = input.pinnedAt ?? null;
    const pinExpiresAt = input.pinExpiresAt ?? null;

    if (pinExpiresAt && !pinnedAt) {
      return err("Cannot set a pin expiration without pinning the post");
    }

    if (pinnedAt && pinExpiresAt && pinExpiresAt.getTime() <= pinnedAt.getTime()) {
      return err("Pin expiration must be after the pinned timestamp");
    }

    const moderationUpdatedAt = moderationInput.updatedAt ?? createdAt;
    const moderationUpdatedBy = (moderationInput.updatedBy ?? input.authorId ?? "").trim();

    if (!moderationUpdatedBy) {
      return err("Moderation actor is required");
    }

    const moderationReason = sanitizeReason(moderationInput.reason);
    const moderationEscalatedAt = moderationInput.escalatedAt ?? null;
    const moderationEscalatedBy = moderationInput.escalatedBy?.trim?.() || null;
    const moderationEscalatedReason = sanitizeReason(
      moderationInput.escalatedReason ?? moderationInput.reason ?? null
    );

    const eventResult = sanitizeEventDetails(kind, input.event);
    if (!eventResult.ok) {
      return eventResult;
    }

    const event = eventResult.value;

    const aggregate = new SpacePostAggregate({
      id: input.id,
      spaceId: input.spaceId,
      authorId: input.authorId,
      authorHandle: input.authorHandle,
      content: sanitizedContent,
      createdAt,
      updatedAt: createdAt,
      reactions: 0,
      commentCount: 0,
      tags: sanitizeTags(input.tags),
      kind,
      audience,
      origin,
      shareToCampus,
      qualityScore,
      moderationStatus,
      moderationUpdatedAt,
      moderationUpdatedBy,
      moderationReason,
      moderationEscalatedAt,
      moderationEscalatedBy,
      moderationEscalatedReason,
      pinnedAt,
      pinExpiresAt,
      attachments: sanitizeAttachments(input.attachments),
      toolContext,
      engagementSummary: sanitizeEngagementSummary(input.engagementSummary),
      event
    });

    aggregate.events.push({
      type: "SpacePostCreated",
      payload: {
        postId: aggregate.props.id,
        spaceId: aggregate.props.spaceId,
        authorId: aggregate.props.authorId
      }
    });

    return ok(aggregate);
  }

  static rehydrate(snapshot: SpacePostSnapshot): SpacePostAggregate {
    return new SpacePostAggregate(snapshot);
  }

  toSnapshot(): SpacePostSnapshot {
    return {
      ...this.props,
      moderationUpdatedAt: new Date(this.props.moderationUpdatedAt.getTime()),
      moderationEscalatedAt: this.props.moderationEscalatedAt
        ? new Date(this.props.moderationEscalatedAt.getTime())
        : null,
      tags: [...this.props.tags],
      attachments: cloneAttachments(this.props.attachments),
      engagementSummary: cloneEngagementSummary(this.props.engagementSummary),
      toolContext: cloneToolContext(this.props.toolContext),
      event: cloneEventDetails(this.props.event)
    };
  }

  pullDomainEvents(): SpacePostDomainEvent[] {
    return this.events.splice(0, this.events.length);
  }

  getId(): string {
    return this.props.id;
  }

  getSpaceId(): string {
    return this.props.spaceId;
  }

  updateContent(content: string, at = new Date()): Result<void> {
    const trimmed = content.trim();
    if (!trimmed) {
      return err("Post content cannot be empty");
    }
    if (trimmed.length > MAX_CONTENT_LENGTH) {
      return err("Post content is too long");
    }
    return this.commit({ content: trimmed }, at);
  }

  retag(tags: readonly string[], at = new Date()): Result<void> {
    return this.commit({ tags: sanitizeTags(tags) }, at);
  }

  pin(
    context: SpacePostPinContext & { at?: Date; expiresAt?: Date }
  ): Result<void> {
    const actorId = context.actorId?.trim();
    if (!actorId) {
      return err("Pin actor is required");
    }

    const { at = new Date(), expiresAt } = context;

    if (expiresAt && expiresAt.getTime() <= at.getTime()) {
      return err("Pin expiration must be after the pin timestamp");
    }

    const previousPinnedAt = this.props.pinnedAt
      ? new Date(this.props.pinnedAt.getTime())
      : null;
    const previousPinExpiresAt = this.props.pinExpiresAt
      ? new Date(this.props.pinExpiresAt.getTime())
      : null;
    const reason = sanitizeReason(context.reason);

    const result = this.commit(
      {
        pinnedAt: at,
        pinExpiresAt: expiresAt ?? null
      },
      at
    );

    if (!result.ok) {
      return result;
    }

    if (
      datesEqual(previousPinnedAt, this.props.pinnedAt) &&
      datesEqual(previousPinExpiresAt, this.props.pinExpiresAt)
    ) {
      return result;
    }

    this.events.push({
      type: "SpacePostPinStatusChanged",
      payload: {
        postId: this.props.id,
        spaceId: this.props.spaceId,
        actorId,
        action: "pinned",
        pinnedAt: this.props.pinnedAt,
        pinExpiresAt: this.props.pinExpiresAt,
        previousPinnedAt,
        previousPinExpiresAt,
        reason
      }
    });

    return result;
  }

  unpin(context: SpacePostPinContext, at = new Date()): Result<void> {
    const actorId = context.actorId?.trim();
    if (!actorId) {
      return err("Pin actor is required");
    }

    if (!this.props.pinnedAt && !this.props.pinExpiresAt) {
      return ok(undefined);
    }

    const previousPinnedAt = this.props.pinnedAt
      ? new Date(this.props.pinnedAt.getTime())
      : null;
    const previousPinExpiresAt = this.props.pinExpiresAt
      ? new Date(this.props.pinExpiresAt.getTime())
      : null;
    const reason = sanitizeReason(context.reason);

    const result = this.commit(
      {
        pinnedAt: null,
        pinExpiresAt: null
      },
      at
    );

    if (!result.ok) {
      return result;
    }

    this.events.push({
      type: "SpacePostPinStatusChanged",
      payload: {
        postId: this.props.id,
        spaceId: this.props.spaceId,
        actorId,
        action: "unpinned",
        pinnedAt: null,
        pinExpiresAt: null,
        previousPinnedAt,
        previousPinExpiresAt,
        reason
      }
    });

    return result;
  }

  setModerationStatus(
    status: SpacePostModerationStatus,
    context: SpacePostModerationContext,
    at = new Date()
  ): Result<void> {
    const actorId = context.actorId?.trim();
    if (!actorId) {
      return err("Moderation actor is required");
    }

    const currentStatus = this.props.moderationStatus;
    if (status === currentStatus) {
      const reason = sanitizeReason(context.reason);
      if (reason === this.props.moderationReason) {
        return ok(undefined);
      }
      return this.commit(
        {
          moderationReason: reason,
          moderationUpdatedAt: at,
          moderationUpdatedBy: actorId
        },
        at
      );
    }

    const allowed = MODERATION_TRANSITIONS[currentStatus] ?? [];
    if (!allowed.includes(status)) {
      return err(`Cannot transition moderation status from ${currentStatus} to ${status}`);
    }

    const reason = sanitizeReason(context.reason);
    const escalatedReason = sanitizeReason(context.escalatedReason ?? context.reason ?? null);

    const update: Partial<SpacePostSnapshot> = {
      moderationStatus: status,
      moderationReason: reason,
      moderationUpdatedAt: at,
      moderationUpdatedBy: actorId,
      ...(status === "escalated"
        ? {
            moderationEscalatedAt: at,
            moderationEscalatedBy: actorId,
            moderationEscalatedReason: escalatedReason
          }
        : {})
    };

    const previousStatus = this.props.moderationStatus;
    const result = this.commit(update, at);
    if (!result.ok) {
      return result;
    }

    if (previousStatus !== status) {
      this.events.push({
        type: "SpacePostModerationChanged",
        payload: {
          postId: this.props.id,
          spaceId: this.props.spaceId,
          from: previousStatus,
          to: status,
          actorId,
          reason,
          escalatedReason: status === "escalated" ? escalatedReason : null
        }
      });
    }

    return result;
  }

  setAudience(
    audience: SpacePostAudience,
    context: SpacePostAudienceContext,
    at = new Date()
  ): Result<void> {
    const actorId = context.actorId?.trim();
    if (!actorId) {
      return err("Audience actor is required");
    }

    const currentAudience = this.props.audience;
    if (audience === currentAudience) {
      return ok(undefined);
    }

    const allowed = AUDIENCE_TRANSITIONS[currentAudience] ?? [];
    if (!allowed.includes(audience)) {
      return err(`Cannot transition audience from ${currentAudience} to ${audience}`);
    }

    const reason = sanitizeReason(context.reason);
    const previousShareToCampus = this.props.shareToCampus;
    const previousAudience = currentAudience;
    const update: Partial<SpacePostSnapshot> =
      audience === "members" && previousShareToCampus
        ? { audience, shareToCampus: false }
        : { audience };

    const result = this.commit(update, at);
    if (!result.ok) {
      return result;
    }

    if (this.props.audience === previousAudience) {
      return result;
    }

    this.events.push({
      type: "SpacePostAudienceChanged",
      payload: {
        postId: this.props.id,
        spaceId: this.props.spaceId,
        actorId,
        from: previousAudience,
        to: this.props.audience,
        reason,
        previousShareToCampus,
        shareToCampus: this.props.shareToCampus
      }
    });

    return result;
  }

  setOrigin(origin: SpacePostOrigin, at = new Date()): Result<void> {
    return this.commit({ origin }, at);
  }

  setShareToCampus(enabled: boolean, at = new Date()): Result<void> {
    const desired = Boolean(enabled);

    if (desired && this.props.audience === "members") {
      return err("Cannot enable campus sharing for members-only audience");
    }

    if (desired === this.props.shareToCampus) {
      return ok(undefined);
    }

    return this.commit({ shareToCampus: desired }, at);
  }

  setQualityScore(score: number | null, at = new Date()): Result<void> {
    if (score === null) {
      return this.commit({ qualityScore: null }, at);
    }

    if (!Number.isFinite(score)) {
      return err("Quality score must be a finite number");
    }

    if (score < QUALITY_SCORE_MIN || score > QUALITY_SCORE_MAX) {
      return err("Quality score must be between 0 and 100");
    }

    return this.commit({ qualityScore: Math.round(score) }, at);
  }

  replaceAttachments(attachments: readonly SpacePostAttachment[], at = new Date()): Result<void> {
    return this.commit({ attachments: sanitizeAttachments(attachments) }, at);
  }

  setToolContext(context: SpacePostToolContext | null, at = new Date()): Result<void> {
    return this.commit({ toolContext: sanitizeToolContext(context) }, at);
  }

  updateEngagementSummary(
    updates: SpacePostEngagementSummaryPatch,
    at = new Date()
  ): Result<void> {
    const next: SpacePostEngagementSummary = {
      ...(this.props.engagementSummary ?? {})
    };

    let mutated = false;

    for (const key of ENGAGEMENT_KEYS) {
      const incoming = updates[key];
      if (incoming === undefined) {
        continue;
      }

      if (incoming === null) {
        if (key in next) {
          delete next[key];
          mutated = true;
        }
        continue;
      }

      if (!Number.isFinite(incoming) || incoming < 0) {
        return err("Engagement metrics must be non-negative numbers");
      }

      const rounded = Math.round(incoming);
      if (next[key] !== rounded) {
        next[key] = rounded;
        mutated = true;
      }
    }

    if (!mutated) {
      return ok(undefined);
    }

    return this.commit({ engagementSummary: sanitizeEngagementSummary(next) }, at);
  }

  /**
   * Set the current user's RSVP status for an event post and adjust aggregate counters.
   * Note: This is a coarse-grained model that updates overall counts; it does not
   * track per-user history and assumes toggles are idempotent for a single actor.
   */
  setEventRsvp(status: SpacePostEventRsvpStatus | null, at = new Date()): Result<void> {
    if (this.props.kind !== "event" || !this.props.event) {
      return err("RSVP can only be set on event posts");
    }

    const prev = this.props.event.userRsvp ?? null;
    const next = { ...this.props.event };

    // Decrement previous bucket when switching
    if (prev && prev !== status) {
      if (prev === "going" && next.goingCount > 0) next.goingCount -= 1;
      if (prev === "maybe" && next.maybeCount > 0) next.maybeCount -= 1;
      if (prev === "waitlist" && next.waitlistCount > 0) next.waitlistCount -= 1;
      // not_going does not contribute to counts
    }

    // Increment new bucket when set (and different from previous)
    if (status && status !== prev) {
      if (status === "going") next.goingCount += 1;
      if (status === "maybe") next.maybeCount += 1;
      if (status === "waitlist") next.waitlistCount += 1;
      // not_going does not contribute to counts
    }

    next.userRsvp = status;

    return this.commit({ event: next }, at);
  }

  setEventCheckIn(checkedIn: boolean, at = new Date()): Result<void> {
    if (this.props.kind !== "event") {
      return err("Check-in is only valid for event posts");
    }
    if (!this.props.event) {
      return err("Event details are required");
    }
    const next = { ...this.props.event };
    const prev = Boolean(next.userCheckedIn);
    if (prev === checkedIn) {
      return ok(undefined);
    }
    if (checkedIn) {
      next.checkedInCount = Math.max(0, (next.checkedInCount ?? 0) + 1);
    } else {
      next.checkedInCount = Math.max(0, (next.checkedInCount ?? 0) - 1);
    }
    next.userCheckedIn = checkedIn;
    return this.commit({ event: next }, at);
  }

  incrementReactions(delta: number, at = new Date()): Result<void> {
    if (!Number.isFinite(delta)) {
      return err("Reaction delta must be finite");
    }
    if (delta === 0) {
      return ok(undefined);
    }

    const next = this.props.reactions + Math.round(delta);
    if (next < 0) {
      return err("Reactions cannot be negative");
    }

    return this.commit({ reactions: next }, at);
  }

  incrementCommentCount(delta: number, at = new Date()): Result<void> {
    if (!Number.isFinite(delta)) {
      return err("Comment delta must be finite");
    }
    if (delta === 0) {
      return ok(undefined);
    }

    const next = this.props.commentCount + Math.round(delta);
    if (next < 0) {
      return err("Comment count cannot be negative");
    }

    return this.commit({ commentCount: next }, at);
  }

  private commit(update: Partial<SpacePostSnapshot>, at: Date): Result<void> {
    const next: SpacePostSnapshot = {
      ...this.props,
      ...update,
      tags: update.tags ? [...update.tags] : this.props.tags,
      attachments: update.attachments
        ? cloneAttachments(update.attachments)
        : this.props.attachments,
      engagementSummary:
        update.engagementSummary !== undefined
          ? cloneEngagementSummary(update.engagementSummary ?? null)
          : this.props.engagementSummary,
      toolContext:
        update.toolContext !== undefined
          ? cloneToolContext(update.toolContext ?? null)
          : this.props.toolContext,
      event:
        update.event !== undefined
          ? cloneEventDetails(update.event ?? null)
          : this.props.event,
      moderationUpdatedAt: update.moderationUpdatedAt ?? this.props.moderationUpdatedAt,
      moderationUpdatedBy:
        update.moderationUpdatedBy !== undefined
          ? update.moderationUpdatedBy
          : this.props.moderationUpdatedBy,
      moderationReason:
        update.moderationReason !== undefined
          ? update.moderationReason ?? null
          : this.props.moderationReason,
      moderationEscalatedAt:
        update.moderationEscalatedAt !== undefined
          ? update.moderationEscalatedAt ?? null
          : this.props.moderationEscalatedAt,
      moderationEscalatedBy:
        update.moderationEscalatedBy !== undefined
          ? update.moderationEscalatedBy
          : this.props.moderationEscalatedBy,
      moderationEscalatedReason:
        update.moderationEscalatedReason !== undefined
          ? update.moderationEscalatedReason ?? null
          : this.props.moderationEscalatedReason,
      updatedAt: this.props.updatedAt
    };

    if (!hasSnapshotChanged(this.props, next)) {
      return ok(undefined);
    }

    this.props = {
      ...next,
      tags: [...next.tags],
      attachments: cloneAttachments(next.attachments),
      engagementSummary: cloneEngagementSummary(next.engagementSummary),
      toolContext: cloneToolContext(next.toolContext),
      event: cloneEventDetails(next.event),
      moderationUpdatedAt: new Date(next.moderationUpdatedAt.getTime()),
      moderationEscalatedAt: next.moderationEscalatedAt
        ? new Date(next.moderationEscalatedAt.getTime())
        : null,
      updatedAt: at
    };

    this.events.push({
      type: "SpacePostUpdated",
      payload: {
        postId: this.props.id,
        spaceId: this.props.spaceId
      }
    });

    return ok(undefined);
  }
}
