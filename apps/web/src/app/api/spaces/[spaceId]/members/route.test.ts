// Bounded Context Owner: Community Guild
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

let GET: typeof import("./route").GET;

describe("GET /api/spaces/:spaceId/members — paginated members", () => {
  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    ({ GET } = await import("./route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("returns members with nextCursor when limited", async () => {
    const url = new URL("https://hive.test/api/spaces/space-robotics/members?limit=2");
    const res = await GET(new Request(url) as unknown as import("next/server").NextRequest, { params: { spaceId: "space-robotics" } });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data.items)).toBe(true);
    expect(json.data.items.length).toBeGreaterThan(0);
    expect(json.data.items.length).toBeLessThanOrEqual(2);
    expect(json.data.total).toBeGreaterThan(json.data.items.length - 1);
    expect(typeof json.data.nextCursor === "string" || json.data.nextCursor === null).toBe(true);
  });

  it("supports cursor pagination", async () => {
    const base = "https://hive.test/api/spaces/space-robotics/members?limit=1";
    const first = await GET(new Request(base) as unknown as import("next/server").NextRequest, { params: { spaceId: "space-robotics" } });
    const firstJson = await first.json();
    const nextCursor: string | null = firstJson.data.nextCursor;
    if (nextCursor) {
      const second = await GET(new Request(`${base}&cursor=${encodeURIComponent(nextCursor)}`) as unknown as import("next/server").NextRequest, { params: { spaceId: "space-robotics" } });
      const secondJson = await second.json();
      expect(secondJson.success).toBe(true);
      // When more exist, second page should return items as well
      expect(Array.isArray(secondJson.data.items)).toBe(true);
    }
  });
});
