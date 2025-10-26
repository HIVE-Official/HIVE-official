// Bounded Context Owner: Community Guild
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

let checkInPOST: typeof import("./route").POST;
let rsvpPOST: typeof import("../rsvp/route").POST;

describe("Event Check-In — toggles userCheckedIn and updates counts", () => {
  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");

    ({ POST: checkInPOST } = await import("./route"));
    ({ POST: rsvpPOST } = await import("../rsvp/route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("sets userCheckedIn=true for an event with check-ins enabled", async () => {
    // Ensure RSVP exists (not strictly needed but realistic)
    const rsvpRes = await rsvpPOST(
      new Request("https://hive.test/api/spaces/space-robotics/events/post-robotics-event/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "going" })
      }),
      { params: { spaceId: "space-robotics", eventId: "post-robotics-event" } }
    );
    expect(rsvpRes.status).toBe(200);

    const res = await checkInPOST(
      new Request("https://hive.test/api/spaces/space-robotics/events/post-robotics-event/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkedIn: true })
      }),
      { params: { spaceId: "space-robotics", eventId: "post-robotics-event" } }
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.event.userCheckedIn).toBe(true);
    expect(json.data.event.checkedInCount).toBeGreaterThanOrEqual(1);
  });
});

