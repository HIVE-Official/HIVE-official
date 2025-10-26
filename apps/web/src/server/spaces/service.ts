// Bounded Context Owner: Community Guild
import {
  SpaceApplicationService,
  SpacePostApplicationService,
  SpacePostAggregate,
  SpaceMediaApprovalApplicationService,
  UuidGenerator,
  type SpacePostRepository,
  type SpaceSnapshot,
  type SpaceCatalog,
  type SpacePostSnapshot,
  type SpaceType,
  type SpaceVisibility
} from "@core";
import type { ToolSnapshot } from "@core";
import type { SpacePostSerialized, SerializedSpace } from "./types";
import { seedSpaceSnapshots } from "./fixtures";
import { InMemorySpaceRepository } from "./in-memory-space.repository";
import { FirestoreSpaceRepository } from "./firestore-space.repository";
import { seedSpacePostSnapshots } from "./post-fixtures";
import { FirestoreSpacePostRepository } from "./firestore-space-post.repository";
import { getSpacePostTelemetry } from "./telemetry";
import { FirestoreSpaceMediaApprovalRepository } from "./firestore-media-approval.repository";
import { InMemorySpaceMediaApprovalRepository } from "./in-memory-media-approval.repository";
import { SpaceJoinRequestApplicationService } from "@core";
import { InMemoryJoinRequestRepository } from "./in-memory-join-request.repository";
import { FirestoreJoinRequestRepository } from "./firestore-join-request.repository";
// Tools service is lazy-loaded inside serializeSpace to avoid seeding HiveLab fixtures
// during tests that only exercise post serialization.
import { getSpacePostEventPublisher } from "./get-space-post-event-publisher";
import { getSpaceEventPublisher } from "./get-space-event-publisher";
import { firebaseFirestore } from "@hive/firebase";

const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";
const preferFirestore = process.env.USE_FIRESTORE_SPACES !== "false";

const repository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreSpaceRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreSpaceRepository and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for spaces data."
        );
      }
      console.warn("Falling back to in-memory SpaceRepository", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory space repository requested but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemorySpaceRepository(seedSpaceSnapshots);
})();

export const spaceService = new SpaceApplicationService({
  repository,
  events: getSpaceEventPublisher()
});

class InMemorySpacePostRepository implements SpacePostRepository {
  private readonly store = new Map<string, SpacePostAggregate[]>();

  constructor(seed: readonly SpacePostSnapshot[] = []) {
    seed.forEach((snapshot) => {
      const aggregate = SpacePostAggregate.rehydrate(snapshot);
      const posts = this.store.get(snapshot.spaceId) ?? [];
      this.store.set(snapshot.spaceId, [aggregate, ...posts]);
    });
  }

  listBySpace(spaceId: string, limit?: number) {
    const posts = this.store.get(spaceId) ?? [];
    const sorted = [...posts].sort(
      (a, b) => b.toSnapshot().createdAt.getTime() - a.toSnapshot().createdAt.getTime()
    );
    const result = typeof limit === "number" ? sorted.slice(0, limit) : sorted;
    return Promise.resolve(result);
  }

  findById(spaceId: string, postId: string) {
    const posts = this.store.get(spaceId) ?? [];
    const found = posts.find((post) => post.getId() === postId) ?? null;
    return Promise.resolve(found);
  }

  save(post: SpacePostAggregate) {
    const posts = this.store.get(post.getSpaceId()) ?? [];
    this.store.set(post.getSpaceId(), [post, ...posts.filter((existing) => existing.getId() !== post.getId())]);
    return Promise.resolve();
  }

  listPinsExpiringBefore(referenceTime: Date, limit = 100) {
    const all = Array.from(this.store.values()).flat();
    const expired = all
      .filter((post) => {
        const snapshot = post.toSnapshot();
        return Boolean(snapshot.pinnedAt && snapshot.pinExpiresAt && snapshot.pinExpiresAt <= referenceTime);
      })
      .sort(
        (a, b) =>
          (a.toSnapshot().pinExpiresAt?.getTime() ?? 0) -
          (b.toSnapshot().pinExpiresAt?.getTime() ?? 0)
      );
    return Promise.resolve(expired.slice(0, limit));
  }
}

const postRepository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreSpacePostRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreSpacePostRepository and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for space posts."
        );
      }
      console.warn("Falling back to in-memory SpacePostRepository", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory space post repository requested but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemorySpacePostRepository(seedSpacePostSnapshots);
})();

const mediaApprovalRepository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreSpaceMediaApprovalRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreSpaceMediaApprovalRepository and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for media approvals."
        );
      }
      console.warn("Falling back to in-memory SpaceMediaApprovalRepository", error);
    }
  }

  if (!allowDevSeeds) {
    throw new Error(
      "In-memory media approval repository requested but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }

  return new InMemorySpaceMediaApprovalRepository();
})();

export const spacePostService = new SpacePostApplicationService({
  repository: postRepository,
  telemetry: getSpacePostTelemetry(),
  events: getSpacePostEventPublisher()
});

export const spaceMediaApprovalService = new SpaceMediaApprovalApplicationService({
  repository: mediaApprovalRepository,
  postRepository,
  idGenerator: new UuidGenerator(),
  telemetry: getSpacePostTelemetry()
});

const joinRequestRepository = (() => {
  if (preferFirestore) {
    try {
      return new FirestoreJoinRequestRepository();
    } catch (error) {
      if (!allowDevSeeds) {
        throw new Error(
          "Failed to initialize FirestoreJoinRequestRepository and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials for join requests."
        );
      }
      console.warn("Falling back to in-memory JoinRequestRepository", error);
    }
  }
  if (!allowDevSeeds) {
    throw new Error(
      "In-memory join request repository requested but ENABLE_DEV_SEEDS is not set. Enable dev seeds or configure Firebase."
    );
  }
  return new InMemoryJoinRequestRepository();
})();

export const spaceJoinRequestService = new SpaceJoinRequestApplicationService({
  repository: joinRequestRepository,
  spaceRepository: repository,
  idGenerator: () => new UuidGenerator().generate()
});

/**
 * Fetch a single space post aggregate by id for server-side views.
 */
export async function getSpacePostById(spaceId: string, postId: string): Promise<SpacePostAggregate | null> {
  return postRepository.findById(spaceId, postId);
}

type SpaceCategoryId =
  | "happening-now"
  | "support"
  | "residential"
  | "project"
  | "academic"
  | "social"
  | "greek_life";

interface SpaceMeta {
  readonly tagline: string;
  readonly accentIcon: string;
  readonly pattern: string;
  readonly helperIds: readonly string[];
  readonly categories: readonly SpaceCategoryId[];
  readonly recommendedFor: readonly string[];
  readonly guidelines: readonly string[];
}

// SpacePostSerialized moved to ./types for reuse across server and UI mapping

export interface SpaceCalendarEvent {
  readonly id: string;
  readonly spaceId: string;
  readonly title: string;
  readonly description: string;
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
  readonly checkInWindowBefore?: number | null;
  readonly checkInWindowAfter?: number | null;
  readonly qrCodeEnabled?: boolean;
  readonly coHostIds: readonly string[];
  readonly coHostNames: readonly string[];
  readonly isRssImported: boolean;
  readonly userRsvp: "going" | "maybe" | "not_going" | "waitlist" | null;
  readonly userCheckedIn?: boolean;
  readonly tags: readonly string[];
  readonly coverImageUrl?: string | null;
  readonly coverImageAlt?: string | null;
  readonly postId?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SpaceCalendarPayload {
  readonly events: readonly SpaceCalendarEvent[];
  readonly upcoming: readonly SpaceCalendarEvent[];
  readonly generatedAt: string;
  readonly viewPreferences: {
    readonly mobileDefault: "list" | "month";
    readonly desktopDefault: "list" | "month";
  };
}

export type SpaceProofRange = "7d" | "28d" | "90d" | "single";

export interface SpaceProofExportEntry {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly format: "csv" | "pdf" | "ics";
  readonly status: "ready" | "disabled";
  readonly availableRanges: readonly SpaceProofRange[];
  readonly downloadUrl: string | null;
}

export interface SpaceProofManifest {
  readonly spaceId: string;
  readonly generatedAt: string;
  readonly exports: readonly SpaceProofExportEntry[];
  readonly sampleEvents: readonly {
    readonly id: string;
    readonly title: string;
    readonly startAt: string;
    readonly location: string;
  }[];
}

export const SPACE_ROLE_PERMISSIONS = {
  canPin: new Set(["leader", "admin"]),
  canModerate: new Set(["leader", "admin", "moderator"])
} as const;

export const SPACE_VISIBILITY_SHARE_POLICY: Record<SpaceVisibility, boolean> = {
  public: true,
  campus: false,
  private: false
};

const mapEventPostToCalendarEvent = (post: SpacePostSnapshot): SpaceCalendarEvent | null => {
  const event = post.event;
  if (!event) {
    return null;
  }

  return {
    id: post.id,
    spaceId: post.spaceId,
    title: event.title,
    description: event.description ?? post.content,
    location: event.location,
    startAt: event.startAt.toISOString(),
    endAt: event.endAt.toISOString(),
    maxAttendees: event.maxAttendees,
    enableWaitlist: event.enableWaitlist,
    goingCount: event.goingCount,
    maybeCount: event.maybeCount,
    waitlistCount: event.waitlistCount,
    checkInEnabled: event.checkInEnabled,
    checkedInCount: event.checkedInCount,
    checkInWindowBefore: event.checkInWindowBefore ?? null,
    checkInWindowAfter: event.checkInWindowAfter ?? null,
    qrCodeEnabled: event.qrCodeEnabled,
    coHostIds: event.coHostIds,
    coHostNames: event.coHostNames,
    isRssImported: event.isRssImported,
    userRsvp: event.userRsvp,
    userCheckedIn: event.userCheckedIn,
    tags: post.tags,
    coverImageUrl: event.coverImageUrl,
    coverImageAlt: event.coverImageAlt,
    postId: post.id,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString()
  };
};

export const getSpaceCalendar = async (
  spaceId: string,
  preloadedPosts?: readonly SpacePostSnapshot[]
): Promise<SpaceCalendarPayload> => {
  const posts =
    preloadedPosts ?? (await spacePostService.list(spaceId, undefined, "internal_metrics"));
  const events = posts
    .filter((post) => post.kind === "event")
    .map(mapEventPostToCalendarEvent)
    .filter((event): event is SpaceCalendarEvent => event !== null)
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );

  const now = Date.now();
  const upcoming = events.filter(
    (event) => new Date(event.endAt).getTime() >= now
  );

  return {
    events,
    upcoming,
    generatedAt: new Date().toISOString(),
    viewPreferences: {
      mobileDefault: "list",
      desktopDefault: "month"
    }
  };
};

export const getSpaceProofManifest = async (spaceId: string): Promise<SpaceProofManifest> => {
  const calendar = await getSpaceCalendar(spaceId);
  const hasEvents = calendar.events.length > 0;
  const exportDefinitions: Omit<SpaceProofExportEntry, "status" | "downloadUrl">[] = [
    {
      id: "event_rsvp_csv",
      label: "RSVP CSV",
      description: "Includes RSVP status, timestamps, and contact info for verification.",
      format: "csv",
      availableRanges: ["7d", "28d", "90d"] satisfies readonly SpaceProofRange[]
    },
    {
      id: "event_checkins_csv",
      label: "Check-In CSV",
      description: "Check-in window log with timestamps, device source, and leader overrides.",
      format: "csv",
      availableRanges: ["7d", "28d", "90d"] satisfies readonly SpaceProofRange[]
    },
    {
      id: "event_recap_pdf",
      label: "Event Recap PDF",
      description: "One-sheet event summary for advisors with attendance graphs and highlights.",
      format: "pdf",
      availableRanges: ["7d", "28d", "90d"] satisfies readonly SpaceProofRange[]
    },
    {
      id: "event_calendar_ics",
      label: "Calendar Feed (ICS)",
      description: "Add the space calendar to external calendars (single feed).",
      format: "ics",
      availableRanges: ["single"] satisfies readonly SpaceProofRange[]
    }
  ];

  const exports = exportDefinitions.map((definition) => ({
    ...definition,
    status: hasEvents ? ("ready" as const) : ("disabled" as const),
    downloadUrl: hasEvents
      ? `/api/spaces/${spaceId}/proof/download?type=${definition.id}&range=${definition.availableRanges[0]}`
      : null
  }));

  const sampleEvents = calendar.events.slice(0, 3).map((event) => ({
    id: event.id,
    title: event.title,
    startAt: event.startAt,
    location: event.location
  }));

  return {
    spaceId,
    generatedAt: new Date().toISOString(),
    exports,
    sampleEvents
  };
};

const spaceMetadata: Record<string, SpaceMeta> = {
  "space-robotics": {
    tagline: "Win the next hardware hackathon together.",
    accentIcon: "🤖",
    pattern: "linear-gradient(90deg, rgba(244,114,182,0.4) 0%, rgba(56,189,248,0.4) 100%)",
    helperIds: ["profile-luca", "profile-jwrhineh"],
    categories: ["happening-now", "project", "academic"],
    recommendedFor: ["computer-science", "mechanical-engineering"],
    guidelines: [
      "Share blockers before midnight so helpers can jump in.",
      "Flag parts that need re-order immediately.",
      "Respect lab quiet hours after 10pm."
    ]
  },
  "space-panic-relief": {
    tagline: "Night owls helping night owls calm down.",
    accentIcon: "🫶",
    pattern: "linear-gradient(135deg, rgba(251,191,36,0.35) 0%, rgba(244,114,182,0.35) 100%)",
    helperIds: ["profile-kai", "profile-nia"],
    categories: ["happening-now", "support"],
    recommendedFor: ["all-students"],
    guidelines: [
      "No judgement. We meet panic with calm.",
      "Use @helper for urgent requests.",
      "Respect anonymity preferences."
    ]
  },
  "space-dorm-richmond": {
    tagline: "Coordinate anything happening on 7th.",
    accentIcon: "🏠",
    pattern: "repeating-linear-gradient(90deg, rgba(59,130,246,0.25) 0px, rgba(59,130,246,0.25) 16px, transparent 16px, transparent 32px)",
    helperIds: ["profile-jordan"],
    categories: ["residential", "social"],
    recommendedFor: ["richmond-residents"],
    guidelines: [
      "Keep noise callouts respectful.",
      "Use #lending for sharing items.",
      "Report facility issues via pinned form."
    ]
  },
  "space-phi-theta": {
    tagline: "Serve the community and keep the chapter thriving.",
    accentIcon: "⚜️",
    pattern: "linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(59,130,246,0.3) 100%)",
    helperIds: ["profile-sam", "profile-lee"],
    categories: ["greek_life", "social"],
    recommendedFor: ["greek-life"],
    guidelines: [
      "Track philanthropy hours weekly.",
      "Coordinate mixers through the shared calendar.",
      "Keep private chapter details in the locked thread."
    ]
  }
};

const SPACE_TYPE_COPY: Record<SpaceType, { label: string; description: string }> = {
  student_organization: {
    label: "Student Organizations",
    description: "Clubs, interest groups, and student-led squads looking to grow."
  },
  university_organization: {
    label: "University Organizations",
    description: "Departments, offices, and programs sharing official updates."
  },
  greek_life: {
    label: "Greek Life",
    description: "Chapters coordinating philanthropy, rituals, and member life."
  },
  residential: {
    label: "Residential Communities",
    description: "Dorms, halls, and apartments keeping residents aligned."
  }
};

const getMeta = (spaceId: string): SpaceMeta | undefined => spaceMetadata[spaceId];

const computeMetrics = (
  space: SpaceSnapshot,
  posts: readonly SpacePostSnapshot[],
  meta: SpaceMeta | undefined
): { onlineNow: number; activityScore: number; urgency: "low" | "medium" | "high" } => {
  const now = Date.now();
  const hourWindowMs = 60 * 60 * 1000;
  const recentPosts = posts.filter((post) => now - post.createdAt.getTime() <= hourWindowMs);
  const recentAuthors = new Set(recentPosts.map((post) => post.authorId));
  const onlineNow = Math.min(space.members.length, recentAuthors.size);
  const activityScore = Math.min(100, onlineNow * 10 + recentPosts.length * 20);

  let urgency: "low" | "medium" | "high" = "low";
  if (meta?.categories.includes("support")) {
    urgency = "high";
  } else if (recentPosts.length >= 3) {
    urgency = "high";
  } else if (recentPosts.length > 0 || onlineNow > 2) {
    urgency = "medium";
  }

  return { onlineNow, activityScore, urgency };
};

const computeMetricsFromSignals = (
  space: SpaceSnapshot,
  signals: { recentPostCount1h: number; lastPostAt?: Date | null; onlineNowEstimate?: number | null },
  meta: SpaceMeta | undefined
): { onlineNow: number; activityScore: number; urgency: "low" | "medium" | "high" } => {
  const recentPosts = Math.max(0, Math.floor(signals.recentPostCount1h ?? 0));
  const onlineEstimate =
    typeof signals.onlineNowEstimate === "number" && Number.isFinite(signals.onlineNowEstimate)
      ? Math.max(0, Math.floor(signals.onlineNowEstimate))
      : recentPosts;
  const onlineNow = Math.min(space.members.length, onlineEstimate);
  const activityScore = Math.min(100, onlineNow * 10 + recentPosts * 20);

  let urgency: "low" | "medium" | "high" = "low";
  if (meta?.categories.includes("support")) {
    urgency = "high";
  } else if (recentPosts >= 3) {
    urgency = "high";
  } else if (recentPosts > 0 || onlineNow > 2) {
    urgency = "medium";
  }

  return { onlineNow, activityScore, urgency };
};

const getPersistedActivitySignals = async (
  spaceId: string
): Promise<{ recentPostCount1h: number; lastPostAt?: Date | null; onlineNowEstimate?: number | null } | null> => {
  if (!preferFirestore) return null;
  try {
    const doc = await firebaseFirestore().collection("spaces").doc(spaceId).get();
    if (!doc.exists) return null;
    const data = (doc.data() as Record<string, any>) ?? {};
    const activity = (data.activity as Record<string, any>) ?? {};
    const lastPostAtValue = activity.lastPostAt;
    const lastPostAt = lastPostAtValue?.toDate?.() ? lastPostAtValue.toDate() : (lastPostAtValue ? new Date(lastPostAtValue) : null);
    const count = typeof activity.recentPostCount1h === "number" ? activity.recentPostCount1h : 0;
    const onlineNowEstimate =
      typeof activity.onlineNowEstimate === "number" ? activity.onlineNowEstimate : null;
    return { recentPostCount1h: count, lastPostAt, onlineNowEstimate };
  } catch {
    return null;
  }
};

export const serializePost = (post: SpacePostSnapshot): SpacePostSerialized => ({
  id: post.id,
  spaceId: post.spaceId,
  authorId: post.authorId,
  authorHandle: post.authorHandle,
  content: post.content,
  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
  reactions: post.reactions,
  commentCount: post.commentCount,
  tags: post.tags,
  kind: post.kind,
  audience: post.audience,
  origin: post.origin,
  shareToCampus: post.shareToCampus,
  qualityScore: post.qualityScore,
  moderationStatus: post.moderationStatus,
  moderationUpdatedAt: post.moderationUpdatedAt.toISOString(),
  moderationUpdatedBy: post.moderationUpdatedBy,
  moderationReason: post.moderationReason,
  moderationEscalatedAt: post.moderationEscalatedAt
    ? post.moderationEscalatedAt.toISOString()
    : null,
  moderationEscalatedBy: post.moderationEscalatedBy ?? null,
  moderationEscalatedReason: post.moderationEscalatedReason ?? null,
  pinnedAt: post.pinnedAt ? post.pinnedAt.toISOString() : null,
  pinExpiresAt: post.pinExpiresAt ? post.pinExpiresAt.toISOString() : null,
  attachments: post.attachments.map((attachment) => ({
    type: attachment.type,
    url: attachment.url,
    title: attachment.title ?? null,
    description: attachment.description ?? null
  })),
  event: (post.event
    ? {
        title: post.event.title,
        description: post.event.description,
        location: post.event.location,
        startAt: post.event.startAt.toISOString(),
        endAt: post.event.endAt.toISOString(),
        maxAttendees: post.event.maxAttendees,
        enableWaitlist: post.event.enableWaitlist,
        goingCount: post.event.goingCount,
        maybeCount: post.event.maybeCount,
        waitlistCount: post.event.waitlistCount,
        checkInEnabled: post.event.checkInEnabled,
        checkedInCount: post.event.checkedInCount,
        checkInWindowBefore: post.event.checkInWindowBefore ?? null,
        checkInWindowAfter: post.event.checkInWindowAfter ?? null,
        qrCodeEnabled: post.event.qrCodeEnabled,
        coHostIds: post.event.coHostIds,
        coHostNames: post.event.coHostNames,
        isRssImported: post.event.isRssImported,
        userRsvp: post.event.userRsvp,
        userCheckedIn: post.event.userCheckedIn,
        coverImageUrl: post.event.coverImageUrl,
        coverImageAlt: post.event.coverImageAlt
      }
    : null) as SpacePostSerialized["event"],
  toolContext: (post.toolContext
    ? {
        toolId: post.toolContext.toolId,
        toolSlug: post.toolContext.toolSlug ?? null,
        placementId: post.toolContext.placementId ?? null,
        variant: post.toolContext.variant ?? null,
        toolVersion: post.toolContext.toolVersion ?? null
      }
    : null) as SpacePostSerialized["toolContext"],
  engagementSummary: post.engagementSummary ?? null
});

interface SerializeSpaceOptions {
  readonly includeMembers?: boolean;
  readonly includeMeta?: boolean;
  readonly includePosts?: boolean;
  readonly postsLimit?: number;
  readonly includeTools?: boolean;
  readonly includeActivityMetrics?: boolean;
}

export const serializeSpace = async (
  space: SpaceSnapshot,
  viewerId?: string,
  options: SerializeSpaceOptions = {}
): Promise<SerializedSpace> => {
  const meta = getMeta(space.id);
  let postsForMetrics: SpacePostSnapshot[] = [];
  const shouldFetchPostsForMetrics = options.includeActivityMetrics ?? true;
  let metrics: { onlineNow: number; activityScore: number; urgency: "low" | "medium" | "high" } = {
    onlineNow: 0,
    activityScore: 0,
    urgency: "low"
  };

  if (shouldFetchPostsForMetrics) {
    let usedSignals = false;
    if (!options.includePosts) {
      const signals = await getPersistedActivitySignals(space.id);
      if (signals) {
        metrics = computeMetricsFromSignals(space, signals, meta);
        usedSignals = true;
      }
    }
    if (!usedSignals) {
      try {
        postsForMetrics = await spacePostService.list(
          space.id,
          options.includePosts ? options.postsLimit : 10,
          "internal_metrics"
        );
        metrics = computeMetrics(space, postsForMetrics, meta);
      } catch (error) {
        console.warn("spaces.posts.fetch_failed", { spaceId: space.id, error: error instanceof Error ? error.message : String(error) });
        postsForMetrics = [];
        metrics = computeMetrics(space, postsForMetrics, meta);
      }
    }
  }
  // Lazy-load tools service only when explicitly requested
  let serializedTools: ReadonlyArray<Record<string, unknown>> = [];
  if (options.includeMeta && (options.includeTools ?? false)) {
    const { toolService, serializeToolForCatalog } = await import("../tools/service");
    let spaceTools: ReadonlyArray<ToolSnapshot> = [];
    try {
      spaceTools = await toolService.listForSpace(space.id);
    } catch (error) {
      console.warn("spaces.tools.fetch_failed", { spaceId: space.id, error: error instanceof Error ? error.message : String(error) });
      spaceTools = [];
    }
    const referenceDate = new Date();
    serializedTools = spaceTools.map((tool: ToolSnapshot) => {
      const catalogTool = serializeToolForCatalog(tool, { referenceDate });
      return {
        ...catalogTool,
        limitedRunCountdown: catalogTool.limitedRunDaysRemaining
      };
    });
  }
  const basePayload: SerializedSpace = {
    id: space.id,
    campusId: space.campusId,
    name: space.name,
    description: space.description,
    type: space.type,
    visibility: space.visibility,
    tags: [...space.tags],
    isActive: space.isActive,
    createdAt: space.createdAt.toISOString(),
    updatedAt: space.updatedAt.toISOString(),
    leaderId: space.leaderId,
    settings: {
      maxMembers: space.settings.maxMembers,
      isInviteOnly: space.settings.isInviteOnly,
      postingPolicy: space.settings.postingPolicy,
      joinPolicy: space.settings.joinPolicy,
      mediaApprovalPolicy: space.settings.mediaApprovalPolicy
    },
    memberCount: space.members.length,
    onlineNow: metrics.onlineNow,
    activityScore: metrics.activityScore,
    urgency: metrics.urgency,
    membership: viewerId
      ? (() => {
          const member = space.members.find((m) => m.profileId === viewerId);
          return member
            ? {
                profileId: member.profileId,
                role: member.role,
                joinedAt: member.joinedAt.toISOString(),
              }
            : null;
        })()
      : null,
    tagline: meta?.tagline ?? null,
    accentIcon: meta?.accentIcon ?? null,
    pattern: meta?.pattern ?? null,
    tools: serializedTools,
    postingPolicy: space.settings.postingPolicy,
    shareToCampusAllowed: SPACE_VISIBILITY_SHARE_POLICY[space.visibility] ?? false
  };

  const withMembers = options.includeMembers
    ? {
        members: space.members.map((member) => ({
          profileId: member.profileId,
          role: member.role,
          joinedAt: member.joinedAt.toISOString()
        })),
      }
    : {};

  const withMeta = options.includeMeta && meta
    ? (() => {
        const preloadedPosts =
          options.includePosts && postsForMetrics.length > 0 ? postsForMetrics : undefined;
        const calendar = getSpaceCalendar(space.id, preloadedPosts);
        return calendar.then((c) => ({
          helperIds: meta.helperIds,
          upcomingEvents: c.upcoming,
          calendarViewPreferences: c.viewPreferences,
          calendarGeneratedAt: c.generatedAt,
          guidelines: meta.guidelines,
        }));
      })()
    : Promise.resolve({});

  const withPosts = options.includePosts
    ? { posts: postsForMetrics.map(serializePost) }
    : {};

  const settingsObj = { ...space.settings } as SerializedSpace["settings"];

  const payload: SerializedSpace = {
    ...basePayload,
    settings: settingsObj,
    ...withPosts,
    ...(await withMeta),
    ...withMembers,
  };

  return payload;
};

const mapWithLimit = async <T, R>(items: readonly T[], limit: number, mapper: (item: T) => Promise<R>): Promise<R[]> => {
  const results: R[] = [];
  let index = 0;
  const workers = new Array(Math.max(1, limit)).fill(0).map(async () => {
    while (index < items.length) {
      const current = items[index++];
      const value = await mapper(current);
      results.push(value);
    }
  });
  await Promise.all(workers);
  return results;
};

const buildSections = async (
  spaces: readonly SpaceSnapshot[],
  viewerId: string,
  serialize?: (space: SpaceSnapshot) => Promise<SerializedSpace>
): Promise<CatalogSection[]> => {
  const sectionEntries = Object.entries(SPACE_TYPE_COPY) as Array<
    [SpaceType, { label: string; description: string }]
  >;

  const sections = sectionEntries
    .map(([type, copy]) => ({
      id: type,
      title: copy.label,
      description: copy.description,
      spaces: spaces.filter((space) => space.type === type)
    }))
    .filter((section) => section.spaces.length > 0);

  return Promise.all(
    sections.map(async (section) => ({
      ...section,
      spaces: await mapWithLimit(
        section.spaces,
        6,
        (space) => (serialize ? serialize(space) : serializeSpace(space, viewerId, { includeMeta: true }))
      )
    }))
  );
};

const buildTypeFilters = (
  spaces: readonly SpaceSnapshot[]
): ReadonlyArray<{ id: string; label: string; count: number }> => {
  const counts = spaces.reduce<Record<string, number>>((acc, space) => {
    acc[space.type] = (acc[space.type] ?? 0) + 1;
    return acc;
  }, {});

  return [
    { id: "all", label: "All", count: spaces.length },
    ...Object.entries(counts).map(([type, count]) => {
      const typedType = type as SpaceType;
      const copy = SPACE_TYPE_COPY[typedType];
      return {
        id: type,
        label: copy?.label ?? type.replace(/_/g, " "),
        count
      };
    })
  ];
};

type CatalogSection = { id: SpaceType; title: string; description: string; spaces: SerializedSpace[] };

export const buildCatalogResponse = async (
  catalog: SpaceCatalog,
  viewerId: string
): Promise<{
  joined: ReadonlyArray<SerializedSpace>;
  recommended: ReadonlyArray<SerializedSpace>;
  discover: ReadonlyArray<SerializedSpace>;
  sections: CatalogSection[];
  filters: ReadonlyArray<{ id: string; label: string; count: number }>;
}> => {
  const cache = new Map<string, Promise<SerializedSpace>>();
  const serialize = (space: SpaceSnapshot): Promise<SerializedSpace> => {
    const key = space.id;
    const existing = cache.get(key);
    if (existing) return existing;
    const task = serializeSpace(space, viewerId, { includeMeta: true, includeTools: false });
    cache.set(key, task);
    return task;
  };

  const sections = await buildSections(catalog.all, viewerId, serialize);
  const filters = buildTypeFilters(catalog.all);

  return {
    joined: await mapWithLimit(catalog.joined, 6, serialize),
    recommended: await mapWithLimit(catalog.recommended, 6, serialize),
    discover: await mapWithLimit(catalog.all, 6, serialize),
    sections,
    filters
  };
};

export async function getCatalogPresentation(input: {
  campusId: string;
  profileId: string;
}): ReturnType<typeof buildCatalogResponse> {
  const catalog = await spaceService.getCatalogForProfile(input);
  return buildCatalogResponse(catalog, input.profileId);
}
