// Bounded Context Owner: Community Guild
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

let joinSpace: typeof import("./join/route").POST;
let leaveSpace: typeof import("./leave/route").POST;
let updateRole: typeof import("./[spaceId]/members/role/route").POST;
let createPost: typeof import("./[spaceId]/posts/route").POST;

describe("Scenario: Membership and posting policies honor campus governance", () => {
  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");

    ({ POST: joinSpace } = await import("./join/route"));
    ({ POST: leaveSpace } = await import("./leave/route"));
    ({ POST: updateRole } = await import("./[spaceId]/members/role/route"));
    ({ POST: createPost } = await import("./[spaceId]/posts/route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("lets a new UB member join Robotics, become a moderator, and depart cleanly", async () => {
    const joinResponse = await joinSpace(
      new Request("https://hive.test/api/spaces/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: "space-robotics",
          profileId: "profile-maya"
        })
      })
    );

    expect(joinResponse.status).toBe(200);
    const joinBody = await joinResponse.json();
    expect(joinBody.success).toBe(true);
    const joinedMember = joinBody.data.members.find(
      (member: { profileId: string }) => member.profileId === "profile-maya"
    );
    expect(joinedMember).toBeDefined();
    expect(joinBody.data.memberCount).toBeGreaterThan(3);
    // Join response is trimmed for hot path: no posts payload
    expect(joinBody.data.posts).toBeUndefined();

    const promoteResponse = await updateRole(
      new Request("https://hive.test/api/spaces/space-robotics/members/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: "profile-maya",
          role: "moderator"
        })
      }),
      { params: { spaceId: "space-robotics" } }
    );

    expect(promoteResponse.status).toBe(200);
    const promoteBody = await promoteResponse.json();
    const promotedMember = promoteBody.data.members.find(
      (member: { profileId: string }) => member.profileId === "profile-maya"
    );
    expect(promotedMember?.role).toBe("moderator");

    const leaveResponse = await leaveSpace(
      new Request("https://hive.test/api/spaces/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: "space-robotics",
          profileId: "profile-maya"
        })
      })
    );

    expect(leaveResponse.status).toBe(200);
    const leaveBody = await leaveResponse.json();
    const remainingMember = leaveBody.data.members.find(
      (member: { profileId: string }) => member.profileId === "profile-maya"
    );
    expect(remainingMember).toBeUndefined();
  });

  it("blocks non-leaders from posting in Phi Theta when composer policy is leaders-only", async () => {
    const disallowedResponse = await createPost(
      new Request("https://hive.test/api/spaces/space-phi-theta/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: "profile-kai",
          authorHandle: "@kai",
          content: "Posting on behalf of the chapter without approval."
        })
      }),
      { params: { spaceId: "space-phi-theta" } }
    );

    expect(disallowedResponse.status).toBe(403);
    const disallowedBody = await disallowedResponse.json();
    expect(disallowedBody.success).toBe(false);
    expect(disallowedBody.error.code).toBe("POSTING_RESTRICTED");

    const leaderResponse = await createPost(
      new Request("https://hive.test/api/spaces/space-phi-theta/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: "profile-sam",
          authorHandle: "@sam",
          content: "Leaders can still publish fundraising updates."
        })
      }),
      { params: { spaceId: "space-phi-theta" } }
    );

    expect(leaderResponse.status).toBe(201);
    const leaderBody = await leaderResponse.json();
    expect(leaderBody.success).toBe(true);
    expect(leaderBody.data.moderationStatus).toBe("active");
  });

  it("join role hardening: ignores client-provided role and assigns member", async () => {
    const joinResponse = await joinSpace(
      new Request("https://hive.test/api/spaces/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Attempt to smuggle an elevated role; schema should ignore unknown keys
        body: JSON.stringify({
          spaceId: "space-robotics",
          profileId: "profile-zoe",
          role: "admin"
        })
      })
    );

    expect(joinResponse.status).toBe(200);
    const body = await joinResponse.json();
    expect(body.success).toBe(true);
    const member = body.data.members.find(
      (m: { profileId: string; role: string }) => m.profileId === "profile-zoe"
    );
    expect(member).toBeDefined();
    expect(member.role).toBe("member");
  });
});
