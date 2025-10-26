// Bounded Context Owner: Community Guild
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { SpacePostDomainEvent } from "@core";

const publishedEvents: SpacePostDomainEvent[] = [];

vi.mock("../../../../../../../server/spaces/get-space-post-event-publisher", () => ({
  getSpacePostEventPublisher: () => ({
    publish: async (events: readonly SpacePostDomainEvent[], _occurredAt: Date) => {
      publishedEvents.push(...events);
    }
  })
}));

describe("Scenario: RAs keep Spaces safe by escalating harmful posts", () => {
  let moderatePost: typeof import("./route").POST;
  let createPost: typeof import("../../route").POST;
  let listPosts: typeof import("../../route").GET;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");

    ({ POST: moderatePost } = await import("./route"));
    ({ POST: createPost, GET: listPosts } = await import("../../route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  beforeEach(() => {
    publishedEvents.length = 0;
  });

  it("lets the Robotics RA auto-hide, escalate, and remove a harmful post with audit events queued", async () => {
    const createResponse = await createPost(
      new Request("https://hive.test/api/spaces/space-robotics/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: "profile-nia",
          authorHandle: "@nia",
          content: "Posting sensitive student info – should be caught quickly."
        })
      }),
      { params: { spaceId: "space-robotics" } }
    );

    expect(createResponse.status).toBe(201);
    const createdBody = await createResponse.json();
    const postId: string = createdBody.data.id;

    const autoHideResponse = await moderatePost(
      new Request(
        `https://hive.test/api/spaces/space-robotics/posts/${postId}/moderation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actorId: "profile-jwrhineh",
            action: "auto_hide",
            reason: "Flagged for sensitive info"
          })
        }
      ),
      { params: { spaceId: "space-robotics", postId } }
    );

    expect(autoHideResponse.status).toBe(200);
    const autoHideBody = await autoHideResponse.json();
    expect(autoHideBody.data.moderationStatus).toBe("auto_hidden");

    const escalateResponse = await moderatePost(
      new Request(
        `https://hive.test/api/spaces/space-robotics/posts/${postId}/moderation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actorId: "profile-jwrhineh",
            action: "escalate",
            reason: "Needs campus safety review",
            escalatedReason: "Contains student ID numbers"
          })
        }
      ),
      { params: { spaceId: "space-robotics", postId } }
    );

    expect(escalateResponse.status).toBe(200);
    const escalateBody = await escalateResponse.json();
    expect(escalateBody.data.moderationStatus).toBe("escalated");

    const removeResponse = await moderatePost(
      new Request(
        `https://hive.test/api/spaces/space-robotics/posts/${postId}/moderation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actorId: "profile-jwrhineh",
            action: "remove",
            reason: "Confirmed PII violation"
          })
        }
      ),
      { params: { spaceId: "space-robotics", postId } }
    );

    expect(removeResponse.status).toBe(200);
    const removeBody = await removeResponse.json();
    expect(removeBody.data.moderationStatus).toBe("removed");

    const postsResponse = await listPosts(
      new Request("https://hive.test/api/spaces/space-robotics/posts"),
      { params: { spaceId: "space-robotics" } }
    );

    const postsBody = await postsResponse.json();
    const moderatedPost = (postsBody.data as Array<{ id: string; moderationStatus: string }>).find(
      (post) => post.id === postId
    );
    expect(moderatedPost?.moderationStatus).toBe("removed");

    const moderationEvents = publishedEvents.filter(
      (event) => event.type === "SpacePostModerationChanged"
    );
    expect(moderationEvents).toHaveLength(3);
    expect(moderationEvents.map((event) => [event.payload.from, event.payload.to])).toEqual([
      ["active", "auto_hidden"],
      ["auto_hidden", "escalated"],
      ["escalated", "removed"]
    ]);
  });

  it("rejects moderation attempts from non-leaders to preserve safety controls", async () => {
    const createResponse = await createPost(
      new Request("https://hive.test/api/spaces/space-robotics/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: "profile-nia",
          authorHandle: "@nia",
          content: "Quick post to confirm guardrails."
        })
      }),
      { params: { spaceId: "space-robotics" } }
    );

    const createdBody = await createResponse.json();
    const postId: string = createdBody.data.id;

    const unauthorizedResponse = await moderatePost(
      new Request(
        `https://hive.test/api/spaces/space-robotics/posts/${postId}/moderation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actorId: "profile-jordan",
            action: "auto_hide",
            reason: "Trying to moderate without permissions"
          })
        }
      ),
      { params: { spaceId: "space-robotics", postId } }
    );

    expect(unauthorizedResponse.status).toBe(403);
    const unauthorizedBody = await unauthorizedResponse.json();
    expect(unauthorizedBody.success).toBe(false);
    expect(unauthorizedBody.error.code).toBe("NOT_AUTHORIZED");
  });
});
