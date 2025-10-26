// Bounded Context Owner: Community Guild
import { beforeEach, describe, expect, it } from "vitest";
import {
  SpacePostAggregate,
  type SpacePostSnapshot,
  type SpacePostAttachment,
  type SpacePostAudience,
  type SpacePostEngagementSummary,
  type SpacePostKind,
  type SpacePostModerationInput,
  type SpacePostModerationStatus,
  type SpacePostOrigin,
  type SpacePostToolContext,
  type SpacePostEventDetails
} from "../aggregates/space-post.aggregate";
import type { SpacePostRepository } from "../space-post.repository";

class ContractInMemorySpacePostRepository implements SpacePostRepository {
  private readonly store = new Map<string, SpacePostAggregate[]>();

  async listBySpace(spaceId: string, limit?: number): Promise<SpacePostAggregate[]> {
    const collection = this.store.get(spaceId) ?? [];
    const sorted = [...collection].sort(
      (left, right) => right.toSnapshot().createdAt.getTime() - left.toSnapshot().createdAt.getTime()
    );
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }

  async findById(spaceId: string, postId: string): Promise<SpacePostAggregate | null> {
    const collection = this.store.get(spaceId) ?? [];
    return collection.find((candidate) => candidate.getId() === postId) ?? null;
  }

  async save(post: SpacePostAggregate): Promise<void> {
    const collection = this.store.get(post.getSpaceId()) ?? [];
    const filtered = collection.filter((candidate) => candidate.getId() !== post.getId());
    this.store.set(post.getSpaceId(), [post, ...filtered]);
  }

  async listPinsExpiringBefore(referenceTime: Date, limit = 100): Promise<SpacePostAggregate[]> {
    const candidates = Array.from(this.store.values())
      .flat()
      .filter((aggregate) => {
        const snapshot = aggregate.toSnapshot();
        if (!snapshot.pinnedAt || !snapshot.pinExpiresAt) {
          return false;
        }
        return snapshot.pinExpiresAt.getTime() <= referenceTime.getTime();
      })
      .sort(
        (left, right) =>
          (left.toSnapshot().pinExpiresAt?.getTime() ?? 0) -
          (right.toSnapshot().pinExpiresAt?.getTime() ?? 0)
      );

    return candidates.slice(0, limit);
  }
}

interface SpacePostSeed {
  readonly id: string;
  readonly spaceId: string;
  readonly authorId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: Date;
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

const createSnapshotFromSeed = (seed: SpacePostSeed): SpacePostSnapshot => {
  const creation = SpacePostAggregate.create({
    id: seed.id,
    spaceId: seed.spaceId,
    authorId: seed.authorId,
    authorHandle: seed.authorHandle,
    content: seed.content,
    createdAt: seed.createdAt,
    tags: seed.tags,
    kind: seed.kind,
    audience: seed.audience,
    origin: seed.origin,
    shareToCampus: seed.shareToCampus,
    qualityScore: seed.qualityScore,
    moderationStatus: seed.moderationStatus,
    moderation: seed.moderation,
    pinnedAt: seed.pinnedAt,
    pinExpiresAt: seed.pinExpiresAt,
    toolContext: seed.toolContext,
    engagementSummary: seed.engagementSummary,
    attachments: seed.attachments,
    event: seed.event ?? null
  });

  if (!creation.ok) {
    throw new Error(`Failed to build space post snapshot: ${creation.error}`);
  }

  const aggregate = creation.value;
  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

const normalizeSnapshot = (snapshot: SpacePostSnapshot) => ({
  id: snapshot.id,
  spaceId: snapshot.spaceId,
  authorId: snapshot.authorId,
  authorHandle: snapshot.authorHandle,
  content: snapshot.content,
  createdAt: snapshot.createdAt.toISOString(),
  updatedAt: snapshot.updatedAt.toISOString(),
  reactions: snapshot.reactions,
  commentCount: snapshot.commentCount,
  tags: [...snapshot.tags],
  kind: snapshot.kind,
  audience: snapshot.audience,
  origin: snapshot.origin,
  shareToCampus: snapshot.shareToCampus,
  qualityScore: snapshot.qualityScore,
  moderationStatus: snapshot.moderationStatus,
  moderationUpdatedAt: snapshot.moderationUpdatedAt.toISOString(),
  moderationUpdatedBy: snapshot.moderationUpdatedBy,
  moderationReason: snapshot.moderationReason,
  moderationEscalatedAt: snapshot.moderationEscalatedAt
    ? snapshot.moderationEscalatedAt.toISOString()
    : null,
  moderationEscalatedBy: snapshot.moderationEscalatedBy,
  moderationEscalatedReason: snapshot.moderationEscalatedReason,
  pinnedAt: snapshot.pinnedAt ? snapshot.pinnedAt.toISOString() : null,
  pinExpiresAt: snapshot.pinExpiresAt ? snapshot.pinExpiresAt.toISOString() : null,
  attachments: snapshot.attachments.map((attachment) => ({
    type: attachment.type,
    url: attachment.url,
    title: attachment.title ?? null,
    description: attachment.description ?? null
  })),
  toolContext: snapshot.toolContext
    ? {
        toolId: snapshot.toolContext.toolId,
        toolSlug: snapshot.toolContext.toolSlug ?? null,
        placementId: snapshot.toolContext.placementId ?? null,
        variant: snapshot.toolContext.variant ?? null
      }
    : null,
  engagementSummary: snapshot.engagementSummary ? { ...snapshot.engagementSummary } : null,
  event: snapshot.event
    ? {
        title: snapshot.event.title,
        description: snapshot.event.description ?? null,
        location: snapshot.event.location,
        startAt: snapshot.event.startAt.toISOString(),
        endAt: snapshot.event.endAt.toISOString(),
        maxAttendees: snapshot.event.maxAttendees,
        enableWaitlist: snapshot.event.enableWaitlist,
        goingCount: snapshot.event.goingCount,
        maybeCount: snapshot.event.maybeCount,
        waitlistCount: snapshot.event.waitlistCount,
        checkInEnabled: snapshot.event.checkInEnabled,
        checkedInCount: snapshot.event.checkedInCount,
        checkInWindowBefore: snapshot.event.checkInWindowBefore ?? null,
        checkInWindowAfter: snapshot.event.checkInWindowAfter ?? null,
        qrCodeEnabled: snapshot.event.qrCodeEnabled,
        coHostIds: [...snapshot.event.coHostIds],
        coHostNames: [...snapshot.event.coHostNames],
        isRssImported: snapshot.event.isRssImported,
        userRsvp: snapshot.event.userRsvp ?? null,
        userCheckedIn: snapshot.event.userCheckedIn,
        coverImageUrl: snapshot.event.coverImageUrl ?? null,
        coverImageAlt: snapshot.event.coverImageAlt ?? null
      }
    : null
});

const roboticsScenarioSeeds: SpacePostSnapshot[] = [
  createSnapshotFromSeed({
    id: "post-robotics-event",
    spaceId: "space-robotics",
    authorId: "profile-ava",
    authorHandle: "@ava",
    content: "Robotics kickoff this Friday. RSVP to join the pit crew.",
    createdAt: new Date("2025-02-05T18:00:00.000Z"),
    tags: ["events", "pit crew", "events"],
    kind: "event",
    audience: "campus",
    origin: "tool_automation",
    shareToCampus: true,
    qualityScore: 88,
    moderationStatus: "active",
    pinnedAt: new Date("2025-02-05T18:05:00.000Z"),
    pinExpiresAt: new Date("2025-02-07T18:05:00.000Z"),
    toolContext: {
      toolId: "tool-event-planner",
      toolSlug: "event-planner",
      placementId: "composer:event",
      variant: "v2"
    },
    engagementSummary: {
      rsvpYes: 47.3,
      acknowledgements: 5
    },
    attachments: [
      { type: "image", url: "https://cdn.hive.edu/events/kickoff.png", title: "Flyer" },
      { type: "link", url: "https://hive.edu/events/kickoff" }
    ],
    event: {
      title: "Autonomous Rover Kickoff",
      description: "Pit crew briefing with RSVP required for lab access.",
      location: "Foundry Lab",
      startAt: new Date("2025-02-09T00:00:00.000Z"),
      endAt: new Date("2025-02-09T02:00:00.000Z"),
      maxAttendees: 75,
      enableWaitlist: true,
      goingCount: 47,
      maybeCount: 12,
      waitlistCount: 4,
      checkInEnabled: true,
      checkedInCount: 0,
      checkInWindowBefore: 45,
      checkInWindowAfter: 30,
      qrCodeEnabled: true,
      coHostIds: ["profile-luca"],
      coHostNames: ["Luca Nguyen"],
      isRssImported: false,
      userRsvp: "going",
      userCheckedIn: false,
      coverImageUrl: "https://cdn.hive.edu/events/kickoff.png",
      coverImageAlt: "Students prepping a robot chassis on a workbench"
    }
  }),
  createSnapshotFromSeed({
    id: "post-robotics-poll",
    spaceId: "space-robotics",
    authorId: "profile-lee",
    authorHandle: "@lee",
    content: "Vote for the Saturday build shift you can cover.",
    createdAt: new Date("2025-02-04T14:10:00.000Z"),
    tags: ["polls", "scheduling"],
    kind: "poll",
    audience: "members",
    origin: "tool_manual",
    shareToCampus: false,
    qualityScore: null,
    moderationStatus: "auto_hidden",
    moderation: {
      status: "auto_hidden",
      updatedBy: "system-auto",
      updatedAt: new Date("2025-02-04T14:30:00.000Z"),
      reason: "Report threshold reached"
    },
    pinnedAt: null,
    pinExpiresAt: null,
    toolContext: {
      toolId: "tool-poll",
      variant: "v1"
    },
    engagementSummary: {
      formSubmissions: 12.6
    },
    attachments: [
      { type: "link", url: "https://hive.edu/tools/poll/shift" },
      { type: "link", url: "" }
    ]
  }),
  createSnapshotFromSeed({
    id: "post-robotics-escalated",
    spaceId: "space-robotics",
    authorId: "profile-ava",
    authorHandle: "@ava",
    content: "Incident report placeholder. Await Hive review.",
    createdAt: new Date("2025-02-04T16:00:00.000Z"),
    tags: ["safety"],
    kind: "announcement",
    audience: "members",
    origin: "member",
    shareToCampus: false,
    qualityScore: null,
    moderationStatus: "escalated",
    moderation: {
      status: "escalated",
      updatedAt: new Date("2025-02-04T16:05:00.000Z"),
      updatedBy: "system-auto",
      reason: "Potential safety risk",
      escalatedAt: new Date("2025-02-04T16:05:00.000Z"),
      escalatedBy: "system-auto",
      escalatedReason: "Forwarded to Hive team for review"
    },
    pinnedAt: null,
    pinExpiresAt: null,
    toolContext: null,
    engagementSummary: null,
    attachments: []
  }),
  createSnapshotFromSeed({
    id: "post-robotics-standard",
    spaceId: "space-robotics",
    authorId: "profile-sam",
    authorHandle: "@sam",
    content: "Sensor kits ready for pickup outside 220D. Grab before lab closes.",
    createdAt: new Date("2025-02-01T10:00:00.000Z"),
    tags: ["hardware", "Hardware"],
    kind: "standard",
    audience: "members",
    origin: "member",
    shareToCampus: false,
    qualityScore: 52,
    moderationStatus: "active",
    pinnedAt: null,
    pinExpiresAt: null,
    toolContext: null,
    engagementSummary: null,
    attachments: []
  }),
  createSnapshotFromSeed({
    id: "post-panic-standard",
    spaceId: "space-panic-relief",
    authorId: "profile-nia",
    authorHandle: "@nia",
    content: "Breathing track from tonight's calm circle. Keep it handy for midterms.",
    createdAt: new Date("2025-02-06T04:00:00.000Z"),
    tags: ["calm", "midterms"],
    kind: "standard",
    audience: "members",
    origin: "member",
    shareToCampus: false,
    qualityScore: 41,
    moderationStatus: "active",
    pinnedAt: null,
    pinExpiresAt: null,
    toolContext: null,
    engagementSummary: {
      acknowledgements: 9
    },
    attachments: [{ type: "link", url: "https://calm.hive.edu/breathe" }]
  })
];

const seedRepositories = async ({
  subject,
  reference
}: {
  readonly subject: SpacePostRepository;
  readonly reference: SpacePostRepository;
}): Promise<void> => {
  for (const snapshot of roboticsScenarioSeeds) {
    await subject.save(SpacePostAggregate.rehydrate(snapshot));
    await reference.save(SpacePostAggregate.rehydrate(snapshot));
  }
};

export interface SpacePostRepositoryContractOptions {
  readonly subjectFactory: () => SpacePostRepository;
  readonly beforeEach?: () => void | Promise<void>;
  readonly scenarioName?: string;
}

export const runSpacePostRepositoryParityContract = ({
  subjectFactory,
  beforeEach: setup,
  scenarioName
}: SpacePostRepositoryContractOptions) => {
  const scenarioLabel =
    scenarioName ??
    "Scenario: UB Robotics leaders trust posts stay consistent after Firestore migration";

  describe(scenarioLabel, () => {
    let subject: SpacePostRepository;
    let reference: SpacePostRepository;

    beforeEach(async () => {
      if (setup) {
        await setup();
      }
      subject = subjectFactory();
      reference = new ContractInMemorySpacePostRepository();
    });

    it("keeps event, tool, announcement, and standard posts aligned across adapters", async () => {
      await seedRepositories({ subject, reference });

      const expected = (
        await reference.listBySpace("space-robotics")
      ).map((aggregate) => normalizeSnapshot(aggregate.toSnapshot()));

      const subjectSnapshots = (
        await subject.listBySpace("space-robotics")
      ).map((aggregate) => normalizeSnapshot(aggregate.toSnapshot()));

      expect(subjectSnapshots).toEqual(expected);
    });

    it("lets Robotics leaders pull just the latest highlights without drifting metadata", async () => {
      await seedRepositories({ subject, reference });

      const expectedLimited = (
        await reference.listBySpace("space-robotics", 2)
      ).map((aggregate) => normalizeSnapshot(aggregate.toSnapshot()));

      const subjectLimited = (
        await subject.listBySpace("space-robotics", 2)
      ).map((aggregate) => normalizeSnapshot(aggregate.toSnapshot()));

      expect(subjectLimited).toEqual(expectedLimited);
    });

    it("retrieves individual Robotics posts by id with matching metadata", async () => {
      await seedRepositories({ subject, reference });

      const expected = await reference.findById("space-robotics", "post-robotics-event");
      const actual = await subject.findById("space-robotics", "post-robotics-event");

      expect(actual?.toSnapshot().id).toBe(expected?.toSnapshot().id);
      expect(actual ? normalizeSnapshot(actual.toSnapshot()) : null).toEqual(
        expected ? normalizeSnapshot(expected.toSnapshot()) : null
      );
    });
  });
};

export const spacePostRepositoryContractSeeds = roboticsScenarioSeeds;
