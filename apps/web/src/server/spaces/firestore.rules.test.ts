// Bounded Context Owner: Community Guild
// Verifies Firestore security rules for Spaces posts using real BDD scenarios.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
  type RulesTestContext
} from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

const PROJECT_ID = "hive-spaces-rules";
const RULES_PATH = resolve(process.cwd(), "firestore.rules");

interface SeedSpaceOptions {
  readonly id: string;
  readonly memberRoles: Record<string, "leader" | "admin" | "moderator" | "member">;
  readonly postingPolicy?: "members" | "leaders_only";
}

interface SeedPostOptions {
  readonly spaceId: string;
  readonly postId: string;
  readonly authorId: string;
  readonly audience?: "members" | "campus" | "public";
  readonly moderationStatus?: "active" | "auto_hidden" | "escalated" | "removed";
  readonly pinnedAt?: Date | null;
  readonly pinExpiresAt?: Date | null;
}

let testEnv: RulesTestEnvironment;

const loadRules = () => readFileSync(RULES_PATH, "utf8");

const emulatorHostEnv = process.env.FIRESTORE_EMULATOR_HOST ?? "";
const [emulatorHost, emulatorPortStr] = emulatorHostEnv.split(":");
const emulatorPort = emulatorPortStr ? Number(emulatorPortStr) : Number.NaN;
const shouldRunRuleTests = Boolean(emulatorHost && !Number.isNaN(emulatorPort));
const describeRuleTests = shouldRunRuleTests ? describe : describe.skip;

const authContext = (uid: string, claims?: Record<string, unknown>): RulesTestContext =>
  testEnv.authenticatedContext(uid, {
    email: `${uid}@buffalo.edu`,
    campusId: "ub-buffalo",
    ...(claims ?? {})
  });

const seedSpace = async ({ id, memberRoles, postingPolicy = "members" }: SeedSpaceOptions) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await db.collection("spaces").doc(id).set({
      campusId: "ub-buffalo",
      visibility: "campus",
      isActive: true,
      leaderId: Object.keys(memberRoles).find((memberId) => memberRoles[memberId] === "leader"),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Robotics Guild",
      description: "Hacking bots after class",
      type: "student_organization",
      tags: ["robots"],
      settings: {
        isInviteOnly: false,
        maxMembers: 200,
        postingPolicy
      },
      memberRoles,
      members: Object.entries(memberRoles).map(([profileId, role]) => ({
        profileId,
        role,
        joinedAt: new Date()
      }))
    });
  });
};

const seedPost = async ({
  spaceId,
  postId,
  authorId,
  audience = "members",
  moderationStatus = "active",
  pinnedAt = null,
  pinExpiresAt = null
}: SeedPostOptions) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const status = moderationStatus;
    const now = new Date();
    const db = context.firestore();
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("posts")
      .doc(postId)
      .set({
        spaceId,
        authorId,
        authorHandle: "nia",
        content: "Kickoff meeting tonight!",
        createdAt: now,
        updatedAt: now,
        reactions: 0,
        commentCount: 0,
        tags: [],
        audience,
        moderationStatus: status,
        kind: "standard",
        origin: "member",
        shareToCampus: false,
        pinnedAt,
        pinExpiresAt,
        attachments: [],
        engagementSummary: null,
        moderationUpdatedAt: now,
        moderationUpdatedBy: authorId,
        moderationReason: null,
        moderationEscalatedAt: status === "escalated" ? now : null,
        moderationEscalatedBy: status === "escalated" ? authorId : null,
        moderationEscalatedReason: status === "escalated" ? "Escalated for review" : null
      });
  });
};

beforeAll(async () => {
  if (!shouldRunRuleTests) {
    return;
  }
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host: emulatorHost,
      port: emulatorPort,
      rules: loadRules()
    }
  });
});

afterEach(async () => {
  if (!shouldRunRuleTests) {
    return;
  }
  await testEnv.clearFirestore();
});

afterAll(async () => {
  if (!shouldRunRuleTests) {
    return;
  }
  await testEnv.cleanup();
});

describeRuleTests("Spaces Firestore rules — post safety rails", () => {
  it("allows a member to read active posts but hides auto-hidden ones", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-active",
      authorId: "profile-jordan",
      moderationStatus: "active"
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-hidden",
      authorId: "profile-jordan",
      moderationStatus: "auto_hidden"
    });

    const memberDb = authContext("profile-jordan").firestore();
    await assertSucceeds(
      memberDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-active").get()
    );
    await assertFails(
      memberDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-hidden").get()
    );
  });

  it("allows leaders to see auto-hidden posts for moderation", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-hidden",
      authorId: "profile-jordan",
      moderationStatus: "auto_hidden"
    });

    const leaderDb = authContext("profile-nia").firestore();
    await assertSucceeds(
      leaderDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-hidden").get()
    );
  });

  it("exposes escalated posts only to moderators and limits members", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-escalated",
      authorId: "profile-jordan",
      moderationStatus: "escalated"
    });

    const memberDb = authContext("profile-jordan").firestore();
    await assertFails(
      memberDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-escalated").get()
    );

    const leaderDb = authContext("profile-nia").firestore();
    await assertSucceeds(
      leaderDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-escalated").get()
    );
  });

  it("blocks non-members from reading members-only posts", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-members-only",
      authorId: "profile-jordan",
      audience: "members"
    });

    const outsiderDb = authContext("profile-guest").firestore();
    await assertFails(
      outsiderDb.collection("spaces").doc("space-robotics").collection("posts").doc("post-members-only").get()
    );
  });

  it("allows leaders to pin posts while preventing members from doing so", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-to-pin",
      authorId: "profile-jordan"
    });

    const leaderDb = authContext("profile-nia").firestore();
    const memberDb = authContext("profile-jordan").firestore();
    const pinUpdate = {
      pinnedAt: new Date("2025-01-01T15:00:00Z"),
      pinExpiresAt: new Date("2025-01-03T15:00:00Z"),
      updatedAt: new Date("2025-01-01T15:00:00Z")
    };

    await assertSucceeds(
      leaderDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .doc("post-to-pin")
        .update(pinUpdate)
    );

    await assertFails(
      memberDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .doc("post-to-pin")
        .update({
          pinnedAt: new Date("2025-01-02T15:00:00Z"),
          pinExpiresAt: new Date("2025-01-04T15:00:00Z"),
          updatedAt: new Date("2025-01-02T15:00:00Z")
        })
    );
  });

  it("allows leaders to create posts that start pinned", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader"
      }
    });

    const leaderDb = authContext("profile-nia").firestore();
    await assertSucceeds(
      leaderDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .add({
          spaceId: "space-robotics",
          authorId: "profile-nia",
          authorHandle: "nia",
          content: "Pinned kickoff update",
          createdAt: new Date("2025-01-01T12:00:00Z"),
          updatedAt: new Date("2025-01-01T12:00:00Z"),
          reactions: 0,
          commentCount: 0,
          tags: [],
          audience: "members",
          moderationStatus: "active",
          kind: "announcement",
          origin: "leader",
          shareToCampus: false,
          attachments: [],
          engagementSummary: null,
          pinnedAt: new Date("2025-01-01T12:00:00Z"),
          pinExpiresAt: new Date("2025-01-03T12:00:00Z")
        })
    );
  });

  it("allows moderators to flip moderationStatus without touching pins", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-moe": "moderator",
        "profile-jordan": "member"
      }
    });
    await seedPost({
      spaceId: "space-robotics",
      postId: "post-to-moderate",
      authorId: "profile-jordan",
      moderationStatus: "auto_hidden"
    });

    const moderatorDb = authContext("profile-moe").firestore();

    await assertSucceeds(
      moderatorDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .doc("post-to-moderate")
        .update({
          moderationStatus: "removed",
          updatedAt: new Date("2025-01-02T10:00:00Z")
        })
    );

    await assertFails(
      moderatorDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .doc("post-to-moderate")
        .update({
          pinnedAt: new Date("2025-01-02T11:00:00Z"),
          updatedAt: new Date("2025-01-02T11:00:00Z")
        })
    );
  });

  it("enforces leaders-only posting policy", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      },
      postingPolicy: "leaders_only"
    });

    const leaderDb = authContext("profile-nia").firestore();
    const memberDb = authContext("profile-jordan").firestore();

    await assertSucceeds(
      leaderDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .add({
          spaceId: "space-robotics",
          authorId: "profile-nia",
          authorHandle: "nia",
          content: "Leaders only update",
          createdAt: new Date(),
          updatedAt: new Date(),
          reactions: 0,
          commentCount: 0,
          tags: [],
          audience: "members",
          moderationStatus: "active",
          kind: "announcement",
          origin: "leader",
          shareToCampus: false,
          attachments: []
        })
    );

    await assertFails(
      memberDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("posts")
        .add({
          spaceId: "space-robotics",
          authorId: "profile-jordan",
          authorHandle: "jordan",
          content: "Trying to post as a member",
          createdAt: new Date(),
          updatedAt: new Date(),
          reactions: 0,
          commentCount: 0,
          tags: [],
          audience: "members",
          moderationStatus: "active",
          kind: "standard",
          origin: "member",
          shareToCampus: false,
          attachments: []
        })
    );
  });
});

describeRuleTests("Spaces Firestore rules — join requests", () => {
  it("allows leaders to list pending join requests and blocks members", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader",
        "profile-jordan": "member"
      }
    });

    // seed a join request
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection("spaces")
        .doc("space-robotics")
        .collection("joinRequests")
        .doc("req-1")
        .set({
          profileId: "profile-maya",
          requestedAt: new Date(),
          status: "pending"
        });
    });

    const leaderDb = authContext("profile-nia").firestore();
    await assertSucceeds(
      leaderDb.collection("spaces").doc("space-robotics").collection("joinRequests").get()
    );

    const memberDb = authContext("profile-jordan").firestore();
    await assertFails(
      memberDb.collection("spaces").doc("space-robotics").collection("joinRequests").get()
    );
  });

  it("allows any UB user to create their own pending join request", async () => {
    await seedSpace({
      id: "space-robotics",
      memberRoles: {
        "profile-nia": "leader"
      }
    });

    const guestDb = authContext("profile-guest").firestore();
    await assertSucceeds(
      guestDb
        .collection("spaces")
        .doc("space-robotics")
        .collection("joinRequests")
        .add({
          profileId: "profile-guest",
          requestedAt: new Date(),
          status: "pending"
        })
    );
  });
});
