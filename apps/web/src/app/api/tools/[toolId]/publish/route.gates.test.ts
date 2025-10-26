// Bounded Context Owner: HiveLab Guild
import { NextRequest } from "next/server";
import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import type { ToolApplicationService } from "@core";

describe("Tool publish route gates", () => {
  let POST: typeof import("./route").POST;
  let toolService: ToolApplicationService;
  let toolId: string;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");

    ({ POST } = await import("./route"));
    ({ toolService } = await import("../../../../../server/tools/service"));

    const creation = await toolService.createDraft({
      id: "tool-publish-gate-test",
      campusId: "ub-buffalo",
      name: "Publish Gate Tool",
      description: "Testing gates",
      createdBy: "profile-jwrhineh",
      elements: [{ id: "quick_form", name: "Form", type: "collector", config: {} }]
    });
    if (!creation.ok) {
      throw new Error(`Failed to seed tool: ${creation.error}`);
    }
    toolId = creation.value.id;
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("returns RUN_TEST_REQUIRED when publishing without a fresh test", async () => {
    const req = new NextRequest("https://hive.test/api/tools/tool-publish-gate-test/publish", {
      method: "POST",
      body: JSON.stringify({ stage: "limited_run" }),
      headers: { "x-actor-id": "profile-jwrhineh", "content-type": "application/json" } as any
    } as any);
    const res = await POST(req, { params: { toolId } });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("RUN_TEST_REQUIRED");
  });
});
