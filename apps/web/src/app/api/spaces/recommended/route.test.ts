// Bounded Context Owner: Community Guild
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

let GET: typeof import("./route").GET;

describe("GET /api/spaces/recommended — paginated recommendations", () => {
  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");

    ({ GET } = await import("./route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("returns a first page of recommended spaces excluding joined", async () => {
    const url = new URL("https://hive.test/api/spaces/recommended");
    url.searchParams.set("campusId", "ub-buffalo");
    url.searchParams.set("profileId", "profile-maya"); // not a member in seeds
    url.searchParams.set("limit", "2");

    const res = await GET(new Request(url));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.items.length).toBeGreaterThan(0);
    expect(json.data.items.length).toBeLessThanOrEqual(2);
    // none of these should show membership for profile-maya
    for (const item of json.data.items) {
      expect(item.membership).toBeNull();
    }
  });

  it("supports cursor pagination", async () => {
    const base = "https://hive.test/api/spaces/recommended?campusId=ub-buffalo&profileId=profile-maya&limit=2";
    const first = await GET(new Request(base));
    const firstJson = await first.json();
    expect(firstJson.success).toBe(true);

    const { nextCursor } = firstJson.data;
    expect(typeof nextCursor === "string" || nextCursor === null).toBe(true);

    if (nextCursor) {
      const second = await GET(new Request(`${base}&cursor=${encodeURIComponent(nextCursor)}`));
      const secondJson = await second.json();
      expect(secondJson.success).toBe(true);
      // when more exist, second page should return items as well
      expect(secondJson.data.items.length).toBeGreaterThan(0);
      for (const item of secondJson.data.items) {
        expect(item.membership).toBeNull();
      }
    }
  });
});

