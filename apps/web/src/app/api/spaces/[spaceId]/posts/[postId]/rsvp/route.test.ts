// Bounded Context Owner: Community Guild
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

describe("POST /api/spaces/:spaceId/posts/:postId/rsvp — set RSVP status", () => {
  let RSVP: typeof import("./route").POST;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    ({ POST: RSVP } = await import("./route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("allows a space member to RSVP 'going' to a seeded robotics event", async () => {
    const res = await RSVP(
      new Request("https://hive.test/api/spaces/space-robotics/posts/post-robotics-event/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actorId: "profile-jwrhineh", status: "going" })
      }),
      { params: { spaceId: "space-robotics", postId: "post-robotics-event" } }
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.event?.userRsvp ?? null).toBe("going");
  });
});

