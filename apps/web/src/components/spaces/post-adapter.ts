// Bounded Context Owner: Community Guild
// Maps serialized Space posts from the server into a richer view model that the UI can use.

export type SerializedAttachment = {
  readonly type: string;
  readonly url: string;
  readonly title?: string | null;
  readonly description?: string | null;
};

export type SerializedToolContext = {
  readonly toolId: string;
  readonly toolSlug?: string | null;
  readonly placementId?: string | null;
  readonly variant?: string | null;
} | null;

export type SerializedSpacePost = {
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
  readonly moderationUpdatedAt?: string;
  readonly moderationUpdatedBy?: string;
  readonly moderationReason?: string | null;
  readonly moderationEscalatedAt?: string | null;
  readonly moderationEscalatedBy?: string | null;
  readonly moderationEscalatedReason?: string | null;
  readonly pinnedAt: string | null;
  readonly pinExpiresAt: string | null;
  readonly attachments: readonly SerializedAttachment[];
  readonly toolContext: SerializedToolContext;
  readonly engagementSummary: Record<string, number> | null;
};

export type AdaptedAttachment = {
  readonly type: "image" | "file" | "link" | "video" | "unknown";
  readonly url: string;
  readonly title?: string;
  readonly description?: string;
};

export type AdaptedSpacePost = {
  readonly id: string;
  readonly spaceId: string;
  readonly kind: string;
  readonly audience: "members" | "campus" | "public";
  readonly visibility: "public" | "members_only";
  readonly origin: string;
  readonly shareToCampus: boolean;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: {
    readonly id: string;
    readonly handle: string;
    readonly displayName: string;
  };
  readonly counts: {
    readonly reactions: number;
    readonly comments: number;
  };
  readonly tags: readonly string[];
  readonly attachments: readonly AdaptedAttachment[];
  readonly toolContext: SerializedToolContext;
  readonly engagementSummary: Record<string, number> | null;
  readonly moderation: {
    readonly status: string;
    readonly isHidden: boolean;
  };
  readonly pin: {
    readonly pinnedAt?: Date;
    readonly expiresAt?: Date;
    readonly isPinned: boolean;
  };
};

const toDateOrUndefined = (value: string | null): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const deriveDisplayName = (handle: string, fallback: string): string => {
  if (handle) {
    return handle.startsWith("@") ? handle.slice(1) : handle;
  }
  return fallback;
};

const normalizeAttachmentType = (type: string): AdaptedAttachment["type"] => {
  switch (type) {
    case "image":
    case "file":
    case "link":
    case "video":
      return type;
    default:
      return "unknown";
  }
};

export function adaptSpacePost(serialized: SerializedSpacePost): AdaptedSpacePost {
  const createdAt = new Date(serialized.createdAt);
  const updatedAt = new Date(serialized.updatedAt ?? serialized.createdAt);

  const pinnedAt = toDateOrUndefined(serialized.pinnedAt);
  const expiresAt = toDateOrUndefined(serialized.pinExpiresAt);
  const now = new Date();
  const isPinned = Boolean(pinnedAt && (!expiresAt || expiresAt.getTime() > now.getTime()));

  const attachments: AdaptedAttachment[] = (serialized.attachments ?? []).map((attachment) => ({
    type: normalizeAttachmentType(attachment.type),
    url: attachment.url,
    title: attachment.title ?? undefined,
    description: attachment.description ?? undefined
  }));

  return {
    id: serialized.id,
    spaceId: serialized.spaceId,
    kind: serialized.kind,
    audience: serialized.audience,
    visibility: serialized.audience === "public" ? "public" : "members_only",
    origin: serialized.origin,
    shareToCampus: serialized.shareToCampus,
    content: serialized.content,
    createdAt,
    updatedAt,
    author: {
      id: serialized.authorId,
      handle: serialized.authorHandle,
      displayName: deriveDisplayName(serialized.authorHandle, serialized.authorId)
    },
    counts: {
      reactions: serialized.reactions,
      comments: serialized.commentCount
    },
    tags: [...serialized.tags],
    attachments,
    toolContext: serialized.toolContext,
    engagementSummary: serialized.engagementSummary,
    moderation: {
      status: serialized.moderationStatus,
      isHidden: serialized.moderationStatus !== "active"
    },
    pin: {
      pinnedAt,
      expiresAt,
      isPinned
    }
  };
}

export function adaptSpacePosts(serialized: readonly SerializedSpacePost[]): AdaptedSpacePost[] {
  return serialized.map(adaptSpacePost);
}
