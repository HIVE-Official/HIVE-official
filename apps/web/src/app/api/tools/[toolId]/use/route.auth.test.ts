// Bounded Context Owner: HiveLab Guild
import { NextRequest } from "next/server";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

describe("Tool usage route auth", () => {
  let POST: typeof import("./route").POST;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");
    ({ POST } = await import("./route"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("rejects usage without session (no dev bypass)", async () => {
    const req = new NextRequest("https://hive.test/api/tools/tool-any/use", {
      method: "POST"
    } as any);
    const res = await POST(req as any, { params: { toolId: "tool-any" } });
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("UNAUTHENTICATED");
  });
});

