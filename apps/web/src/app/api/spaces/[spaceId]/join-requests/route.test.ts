// Bounded Context Owner: Community Guild
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

let joinPOST: typeof import("../../join/route").POST;
let listGET: typeof import("./route").GET;
let resolvePOST: typeof import("./resolve/route").POST;
let spaceGET: typeof import("../route").GET;

describe("Join Requests flow — request → list → approve", () => {
  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");
    vi.stubEnv("DISABLE_AUTH", "true");

    ({ POST: joinPOST } = await import("../../join/route"));
    ({ GET: listGET } = await import("./route"));
    ({ POST: resolvePOST } = await import("./resolve/route"));
    ({ GET: spaceGET } = await import("../route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("creates a pending join request for request-policy space and approves it", async () => {
    // space-dorm-richmond defaults to joinPolicy=request in seeds
    const joinRes = await joinPOST(
      new Request("https://hive.test/api/spaces/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId: "space-dorm-richmond", profileId: "profile-maya" })
      })
    );
    expect(joinRes.status).toBe(202);
    const joinJson = await joinRes.json();
    expect(joinJson.success).toBe(true);
    const reqId = joinJson.data.joinRequest.id as string;

    // List pending as leader/moderator (profile-jordan is leader)
    const listRes = await listGET(
      new Request("https://hive.test/api/spaces/space-dorm-richmond/join-requests?actorId=profile-jordan", {
        headers: { "x-actor-id": "profile-jordan" }
      }),
      { params: { spaceId: "space-dorm-richmond" } }
    );
    expect(listRes.status).toBe(200);
    const listJson = await listRes.json();
    expect(listJson.success).toBe(true);
    const found = listJson.data.find((r: any) => r.id === reqId);
    expect(found).toBeTruthy();

    // Approve request
    const approveRes = await resolvePOST(
      new Request("https://hive.test/api/spaces/space-dorm-richmond/join-requests/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-actor-id": "profile-jordan" },
        body: JSON.stringify({ requestId: reqId, action: "approve" })
      }),
      { params: { spaceId: "space-dorm-richmond" } }
    );
    expect(approveRes.status).toBe(200);
    const approveJson = await approveRes.json();
    expect(approveJson.success).toBe(true);
    expect(approveJson.data.status).toBe("approved");

    // Verify membership now includes profile-maya
    const spaceRes = await spaceGET(
      new Request("https://hive.test/api/spaces/space-dorm-richmond")
      , { params: { spaceId: "space-dorm-richmond" } }
    );
    expect(spaceRes.status).toBe(200);
    const spaceJson = await spaceRes.json();
    expect(spaceJson.success).toBe(true);
    const member = spaceJson.data.members.find((m: any) => m.profileId === "profile-maya");
    expect(member).toBeTruthy();
  });
});
