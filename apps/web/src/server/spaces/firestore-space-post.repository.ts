// Bounded Context Owner: Community Guild
import {
  SpacePostAggregate,
  type SpacePostRepository,
  type SpacePostSnapshot,
  type SpacePostAudience,
  type SpacePostKind,
  type SpacePostOrigin,
  type SpacePostModerationStatus,
  type SpacePostToolContext,
  type SpacePostAttachment,
  type SpacePostEngagementSummary,
  type SpacePostEventDetails
} from "@core";
import { firebaseFirestore } from "@hive/firebase";
import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

const postsCollection = () => firebaseFirestore().collectionGroup("posts");
const spacePostsCollection = (spaceId: string) => firebaseFirestore().collection("spaces").doc(spaceId).collection("posts");

const ENGAGEMENT_KEYS = [
  "rsvpYes",
  "rsvpMaybe",
  "rsvpNo",
  "checkIns",
  "acknowledgements",
  "formSubmissions"
] as const;

const MAX_MODERATION_REASON_LENGTH = 500;

const normalizeActor = (value: unknown, fallback: string): string => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return fallback;
};

const normalizeActorOrNull = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const normalizeReason = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (trimmed.length > MAX_MODERATION_REASON_LENGTH) {
    return trimmed.slice(0, MAX_MODERATION_REASON_LENGTH);
  }
  return trimmed;
};

const toDate = (value: unknown): Date => {
  if (!value) {
    return new Date();
  }
  if (value instanceof Date) {
    return value;
  }
  // Firestore Timestamp
  const maybeTimestamp = value as { toDate?: () => Date };
  if (maybeTimestamp?.toDate) {
    return maybeTimestamp.toDate();
  }
  return new Date(value as string);
};

const normalizeTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) {
    return [];
  }
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const raw of tags) {
    if (typeof raw !== "string") continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(trimmed);
  }
  return normalized;
};

const normalizeAttachments = (attachments: unknown): SpacePostAttachment[] => {
  if (!Array.isArray(attachments)) return [];
  const result: SpacePostAttachment[] = [];
  for (const candidate of attachments) {
    if (!candidate || typeof candidate !== "object") continue;
    const value = candidate as Record<string, unknown>;
    const type = value.type as SpacePostAttachment["type"];
    const url = typeof value.url === "string" ? value.url.trim() : "";
    if (!url) continue;
    if (type !== "image" && type !== "file" && type !== "link" && type !== "video") continue;
    const title = typeof value.title === "string" ? value.title.trim() : undefined;
    const description = typeof value.description === "string" ? value.description.trim() : undefined;
    result.push({ type, url, title: title || undefined, description: description || undefined });
  }
  return result;
};

// RSVP_STATUSES not currently used in normalization; present for future guards

const normalizeStringArray = (input: unknown): string[] => {
  if (!Array.isArray(input)) {
    return [];
  }
  return input
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.trim());
};

const toNumberOrNull = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return Math.round(value);
};

const toCount = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.round(value);
};

const normalizeEventDetails = (event: unknown): SpacePostEventDetails | null => {
  if (!event || typeof event !== "object") {
    return null;
  }

  const value = event as Record<string, unknown>;
  const title = typeof value.title === "string" ? value.title.trim() : "";
  if (!title) {
    return null;
  }

  const location =
    typeof value.location === "string" && value.location.trim().length > 0
      ? value.location.trim()
      : "";
  if (!location) {
    return null;
  }

  const startAt = toDate(value.startAt ?? value.start ?? Date.now());
  const endCandidate = value.endAt ?? value.end ?? new Date(startAt.getTime() + 60 * 60 * 1000);
  const endAt = toDate(endCandidate);

  const userRsvpCandidate = typeof value.userRsvp === "string" ? value.userRsvp.trim() : null;
  const userRsvp: SpacePostEventDetails["userRsvp"] =
    userRsvpCandidate === "going" ||
    userRsvpCandidate === "maybe" ||
    userRsvpCandidate === "not_going" ||
    userRsvpCandidate === "waitlist"
      ? (userRsvpCandidate as SpacePostEventDetails["userRsvp"])
      : null;

  return {
    title,
    description:
      typeof value.description === "string" && value.description.trim().length > 0
        ? value.description.trim()
        : null,
    location,
    startAt,
    endAt,
    maxAttendees: toNumberOrNull(value.maxAttendees),
    enableWaitlist: Boolean(value.enableWaitlist),
    goingCount: toCount(value.goingCount),
    maybeCount: toCount(value.maybeCount),
    waitlistCount: toCount(value.waitlistCount),
    checkInEnabled: Boolean(value.checkInEnabled),
    checkedInCount: toCount(value.checkedInCount),
    checkInWindowBefore:
      typeof value.checkInWindowBefore === "number"
        ? Math.round(value.checkInWindowBefore)
        : null,
    checkInWindowAfter:
      typeof value.checkInWindowAfter === "number" ? Math.round(value.checkInWindowAfter) : null,
    qrCodeEnabled: Boolean(value.qrCodeEnabled),
    coHostIds: normalizeStringArray(value.coHostIds),
    coHostNames: normalizeStringArray(value.coHostNames),
    isRssImported: Boolean(value.isRssImported),
    userRsvp,
    userCheckedIn: Boolean(value.userCheckedIn),
    coverImageUrl:
      typeof value.coverImageUrl === "string" && value.coverImageUrl.trim().length > 0
        ? value.coverImageUrl.trim()
        : null,
    coverImageAlt:
      typeof value.coverImageAlt === "string" && value.coverImageAlt.trim().length > 0
        ? value.coverImageAlt.trim()
        : null
  };
};

const normalizeToolContext = (context: unknown): SpacePostToolContext | null => {
  if (!context || typeof context !== "object") {
    return null;
  }
  const value = context as Record<string, unknown>;
  const rawToolId = value.toolId;
  if (typeof rawToolId !== "string" || rawToolId.trim().length === 0) {
    return null;
  }

  const toolSlug =
    typeof value.toolSlug === "string" && value.toolSlug.trim().length > 0
      ? value.toolSlug.trim()
      : undefined;
  const placementId =
    typeof value.placementId === "string" && value.placementId.trim().length > 0
      ? value.placementId.trim()
      : undefined;
  const variant =
    typeof value.variant === "string" && value.variant.trim().length > 0
      ? value.variant.trim()
      : undefined;
  const toolVersion =
    typeof value.toolVersion === "number" && Number.isFinite(value.toolVersion)
      ? value.toolVersion
      : undefined;

  return {
    toolId: rawToolId.trim(),
    toolSlug,
    placementId,
    variant,
    toolVersion
  };
};

const normalizeEngagementSummary = (
  summary: unknown
): SpacePostEngagementSummary | null => {
  if (!summary || typeof summary !== "object") {
    return null;
  }

  const value = summary as Record<string, unknown>;
  const normalized: SpacePostEngagementSummary = {};

  for (const key of ENGAGEMENT_KEYS) {
    const candidate = value[key];
    if (typeof candidate !== "number" || !Number.isFinite(candidate) || candidate < 0) {
      continue;
    }
    normalized[key] = Math.round(candidate);
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
};

const dataToAggregate = (
  id: string,
  data: DocumentData | Record<string, unknown>
): SpacePostAggregate => {
  const fallbackActor = typeof data.authorId === "string" ? data.authorId : "system";
  const moderationUpdatedAt = toDate(data.moderationUpdatedAt ?? data.updatedAt ?? Date.now());
  const moderationUpdatedBy = normalizeActor(data.moderationUpdatedBy, fallbackActor);
  const baseReason = normalizeReason(data.moderationReason);
  const moderationEscalatedAtCandidate = data.moderationEscalatedAt
    ? toDate(data.moderationEscalatedAt)
    : null;
  const moderationEscalatedByCandidate = normalizeActorOrNull(data.moderationEscalatedBy);
  const moderationEscalatedReasonCandidate = normalizeReason(data.moderationEscalatedReason);
  const snapshot: SpacePostSnapshot = {
    id,
    spaceId: typeof data.spaceId === "string" ? data.spaceId : "",
    authorId: typeof data.authorId === "string" ? data.authorId : "",
    authorHandle: typeof data.authorHandle === "string" ? data.authorHandle : "",
    content: typeof (data as Record<string, unknown>).content === "string" ? ((data as Record<string, unknown>).content as string) : "",
    createdAt: toDate(data.createdAt ?? Date.now()),
    updatedAt: toDate(data.updatedAt ?? Date.now()),
    reactions: typeof (data as Record<string, unknown>).reactions === "number" ? (data as Record<string, unknown>).reactions as number : 0,
    commentCount: typeof (data as Record<string, unknown>).commentCount === "number" ? (data as Record<string, unknown>).commentCount as number : 0,
    tags: normalizeTags(data.tags),
    kind: (data.kind ?? "standard") as SpacePostKind,
    audience: (data.audience ?? "members") as SpacePostAudience,
    origin: (data.origin ?? (data.toolContext ? "tool_manual" : "member")) as SpacePostOrigin,
    shareToCampus: Boolean(data.shareToCampus),
    qualityScore: typeof data.qualityScore === "number" ? data.qualityScore : null,
    moderationStatus: (data.moderationStatus ?? "active") as SpacePostModerationStatus,
    moderationUpdatedAt,
    moderationUpdatedBy,
    moderationReason: baseReason,
    moderationEscalatedAt:
      moderationEscalatedAtCandidate ??
      ((data.moderationStatus ?? "active") === "escalated" ? moderationUpdatedAt : null),
    moderationEscalatedBy:
      moderationEscalatedByCandidate ??
      ((data.moderationStatus ?? "active") === "escalated" ? moderationUpdatedBy : null),
    moderationEscalatedReason:
      moderationEscalatedReasonCandidate ??
      ((data.moderationStatus ?? "active") === "escalated" ? baseReason : null),
    pinnedAt: data.pinnedAt ? toDate(data.pinnedAt) : null,
    pinExpiresAt: data.pinExpiresAt ? toDate(data.pinExpiresAt) : null,
    attachments: normalizeAttachments(data.attachments),
    toolContext: normalizeToolContext(data.toolContext),
    engagementSummary: normalizeEngagementSummary(data.engagementSummary),
    event: normalizeEventDetails(data.event)
  };
  return SpacePostAggregate.rehydrate(snapshot);
};

const snapshotToAggregate = (doc: QueryDocumentSnapshot<DocumentData>): SpacePostAggregate => {
  return dataToAggregate(doc.id, doc.data());
};

export class FirestoreSpacePostRepository implements SpacePostRepository {
  async listBySpace(spaceId: string, limit = 50) {
    const query = await spacePostsCollection(spaceId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    return query.docs.map(snapshotToAggregate);
  }

  async findById(spaceId: string, postId: string) {
    const doc = await spacePostsCollection(spaceId).doc(postId).get();
    if (!doc.exists) {
      return null;
    }
    return dataToAggregate(doc.id, doc.data()!);
  }

  async save(post: SpacePostAggregate) {
    const snapshot = post.toSnapshot();
    // Fetch parent space to denormalize campusId onto the post document for future campus-wide queries
    let campusId: string | undefined;
    try {
      const parent = await firebaseFirestore().collection("spaces").doc(snapshot.spaceId).get();
      const data = (parent.data() as Record<string, any>) ?? {};
      if (typeof data.campusId === "string" && data.campusId.trim().length > 0) {
        campusId = data.campusId.trim();
      }
    } catch {
      // ignore; campusId remains undefined
    }

    const attachments = snapshot.attachments.map((attachment) => {
      const payload: Record<string, string> = {
        type: attachment.type,
        url: attachment.url
      };
      if (attachment.title) {
        payload.title = attachment.title;
      }
      if (attachment.description) {
        payload.description = attachment.description;
      }
      return payload;
    });

    const toolContext: Record<string, unknown> | null = snapshot.toolContext
      ? {
          toolId: snapshot.toolContext.toolId,
          ...(snapshot.toolContext.toolSlug ? { toolSlug: snapshot.toolContext.toolSlug } : {}),
          ...(snapshot.toolContext.placementId
            ? { placementId: snapshot.toolContext.placementId }
            : {}),
          ...(snapshot.toolContext.variant ? { variant: snapshot.toolContext.variant } : {}),
          ...(typeof snapshot.toolContext.toolVersion === "number"
            ? { toolVersion: snapshot.toolContext.toolVersion }
            : {})
        }
      : null;

    const engagementSummary = snapshot.engagementSummary
      ? Object.fromEntries(
          Object.entries(snapshot.engagementSummary).map(([key, value]) => [key, value ?? 0])
        )
      : null;

    const eventDetails: Record<string, unknown> | null = snapshot.event
      ? {
          title: snapshot.event.title,
          description: snapshot.event.description,
          location: snapshot.event.location,
          startAt: snapshot.event.startAt,
          endAt: snapshot.event.endAt,
          maxAttendees: snapshot.event.maxAttendees,
          enableWaitlist: snapshot.event.enableWaitlist,
          goingCount: snapshot.event.goingCount,
          maybeCount: snapshot.event.maybeCount,
          waitlistCount: snapshot.event.waitlistCount,
          checkInEnabled: snapshot.event.checkInEnabled,
          checkedInCount: snapshot.event.checkedInCount,
          checkInWindowBefore: snapshot.event.checkInWindowBefore,
          checkInWindowAfter: snapshot.event.checkInWindowAfter,
          qrCodeEnabled: snapshot.event.qrCodeEnabled,
          coHostIds: [...snapshot.event.coHostIds],
          coHostNames: [...snapshot.event.coHostNames],
          isRssImported: snapshot.event.isRssImported,
          userRsvp: snapshot.event.userRsvp,
          userCheckedIn: snapshot.event.userCheckedIn,
          coverImageUrl: snapshot.event.coverImageUrl,
          coverImageAlt: snapshot.event.coverImageAlt
        }
      : null;

    await spacePostsCollection(snapshot.spaceId).doc(snapshot.id).set({
      id: snapshot.id,
      spaceId: snapshot.spaceId,
      ...(campusId ? { campusId } : {}),
      authorId: snapshot.authorId,
      authorHandle: snapshot.authorHandle,
      content: snapshot.content,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
      reactions: snapshot.reactions,
      commentCount: snapshot.commentCount,
      tags: [...snapshot.tags],
      kind: snapshot.kind,
      audience: snapshot.audience,
      origin: snapshot.origin,
      shareToCampus: snapshot.shareToCampus,
      qualityScore: snapshot.qualityScore,
      moderationStatus: snapshot.moderationStatus,
      moderationUpdatedAt: snapshot.moderationUpdatedAt,
      moderationUpdatedBy: snapshot.moderationUpdatedBy,
      moderationReason: snapshot.moderationReason,
      moderationEscalatedAt: snapshot.moderationEscalatedAt,
      moderationEscalatedBy: snapshot.moderationEscalatedBy,
      moderationEscalatedReason: snapshot.moderationEscalatedReason,
      pinnedAt: snapshot.pinnedAt,
      pinExpiresAt: snapshot.pinExpiresAt,
      attachments,
      toolContext,
      engagementSummary,
      event: eventDetails
    });

    // Update lightweight activity signals on the parent space doc for recommendations
    try {
      const now = new Date();
      const cutoff = new Date(now.getTime() - 60 * 60 * 1000);
      const recent = await spacePostsCollection(snapshot.spaceId)
        .where("createdAt", ">=", cutoff)
        .get();
      const recentAuthors = new Set<string>();
      for (const doc of recent.docs) {
        const data = (doc.data() as Record<string, unknown>) ?? {};
        const authorId = typeof data.authorId === "string" ? data.authorId.trim() : "";
        if (authorId) {
          recentAuthors.add(authorId);
        }
      }
      await firebaseFirestore().collection("spaces").doc(snapshot.spaceId).set(
        {
          activity: {
            lastPostAt: snapshot.createdAt,
            recentPostCount1h: recent.size,
            onlineNowEstimate: recentAuthors.size
          }
        },
        { merge: true }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("spaces.activity.persist_failed", {
        spaceId: snapshot.spaceId,
        postId: snapshot.id,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async listPinsExpiringBefore(referenceTime: Date, limit = 100) {
    const query = await postsCollection()
      .where("pinnedAt", "!=", null)
      .where("pinExpiresAt", "<=", referenceTime)
      .orderBy("pinExpiresAt", "asc")
      .limit(limit)
      .get();

    return query.docs.map(snapshotToAggregate);
  }
}
