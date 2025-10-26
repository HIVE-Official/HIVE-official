// Bounded Context Owner: HiveLab Guild
import { NextRequest } from "next/server";
import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import type { ToolApplicationService } from "@core";

describe("Attach event to element API", () => {
  let POST: typeof import("./route").POST;
  let toolService: ToolApplicationService;
  let toolId: string;
  const campusId = "ub-buffalo";

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");

    ({ POST } = await import("./route"));
    ({ toolService } = await import("../../../../../../../server/tools/service"));

    const creation = await toolService.createDraft({
      id: "tool-attach-test",
      campusId,
      name: "Attach Test",
      description: "Testing attach",
      createdBy: "profile-jwrhineh",
      // Use an element that extends events so attach is valid
      elements: [
        { id: "slots_shifts", name: "Slots", type: "scheduler", config: {} }
      ]
    });
    if (!creation.ok) {
      throw new Error(`Failed to seed tool: ${creation.error}`);
    }
    toolId = creation.value.id;
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("rejects unauthenticated requests", async () => {
    const req = new NextRequest("https://hive.test/api/tools/tool-attach-test/elements/slots_shifts/attach", {
      method: "POST",
      body: JSON.stringify({ eventId: "event-123" })
    } as any);
    const res = await POST(req, { params: { toolId, elementId: "slots_shifts" } });
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("UNAUTHENTICATED");
  });

  it("attaches an event id to a valid element when authenticated (dev bypass)", async () => {
    const req = new NextRequest("https://hive.test/api/tools/tool-attach-test/elements/slots_shifts/attach", {
      method: "POST",
      body: JSON.stringify({ eventId: "event-abc" }),
      headers: { "x-actor-id": "profile-jwrhineh" } as any
    } as any);
    const res = await POST(req, { params: { toolId, elementId: "slots_shifts" } });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    const elements = json.data?.authoring?.elements ?? [];
    const found = elements.find((e: any) => e.id === "slots_shifts");
    expect(found).toBeTruthy();
    expect(found.attachedEventId).toBe("event-abc");
  });
});
