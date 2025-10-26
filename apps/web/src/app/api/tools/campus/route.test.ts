// Bounded Context Owner: HiveLab Guild
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { ToolApplicationService } from "@core";

interface SeedInput {
  readonly toolService: ToolApplicationService;
  readonly campusId: string;
  readonly visibility: "campus" | "public";
  readonly createdBy?: string;
}

const seedCertifiedTool = async (input: SeedInput): Promise<string> => {
  const id = `tool-${input.visibility}-${randomUUID()}`;
  const creation = await input.toolService.createDraft({
    id,
    campusId: input.campusId,
    name: `Test ${input.visibility} Tool`,
    description: `Seeded ${input.visibility} visibility tool for integration tests.`,
    createdBy: input.createdBy ?? "profile-jwrhineh",
    elements: [
      {
        id: "quick_form",
        name: "Quick Form",
        type: "collector",
        config: { fieldLimit: 1 }
      }
    ]
  });
  expect(creation.ok).toBe(true);

  const limitedRun = await input.toolService.publishTool({
    toolId: id,
    profileId: input.createdBy ?? "profile-jwrhineh",
    stage: "limited_run"
  });
  expect(limitedRun.ok).toBe(true);

  const certified = await input.toolService.publishTool({
    toolId: id,
    profileId: input.createdBy ?? "profile-jwrhineh",
    stage: "certified"
  });
  expect(certified.ok).toBe(true);

  const visibilityUpdate = await input.toolService.updateVisibility({
    toolId: id,
    profileId: input.createdBy ?? "profile-jwrhineh",
    visibility: input.visibility
  });
  expect(visibilityUpdate.ok).toBe(true);

  return id;
};

describe("HiveLab campus catalog API", () => {
  let getCampusCatalog: typeof import("./route").GET;
  let toolService: ToolApplicationService;
  let publicToolId: string;
  let otherCampusToolId: string;

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");

    ({ GET: getCampusCatalog } = await import("./route"));
    ({ toolService } = await import("../../../../server/tools/service"));

    publicToolId = await seedCertifiedTool({
      toolService,
      campusId: "ub-buffalo",
      visibility: "public"
    });

    otherCampusToolId = await seedCertifiedTool({
      toolService,
      campusId: "rit-rochester",
      visibility: "campus",
      createdBy: "profile-rit-leader"
    });
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("returns certified campus + public tools for UB leaders", async () => {
    const response = await getCampusCatalog(
      new NextRequest("https://hive.test/api/tools/campus?campusId=ub-buffalo&profileId=profile-jwrhineh")
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.meta.profileId).toBe("profile-jwrhineh");
    expect(body.meta.visibility).toBe("all");

    const ids: string[] = body.data.map((tool: { id: string }) => tool.id);
    expect(ids).toContain("tool-event-rsvp");
    expect(ids).toContain(publicToolId);
    expect(ids).not.toContain(otherCampusToolId);

    body.data.forEach((tool: { status: string; visibility: string; placement: { start: boolean; live: boolean; board: string; calendar: boolean }; deployments: { count: number } }) => {
      expect(tool.status).toBe("certified");
      expect(["campus", "public"]).toContain(tool.visibility);
      expect(tool.placement).toMatchObject({
        start: expect.any(Boolean),
        live: expect.any(Boolean),
        board: expect.stringMatching(/^(off|on_input|recap_only)$/),
        calendar: expect.any(Boolean)
      });
      expect(tool.deployments.count).toBeGreaterThanOrEqual(0);
    });
  });

  it("lets leaders focus on public-only tools when filtered", async () => {
    const response = await getCampusCatalog(
      new NextRequest("https://hive.test/api/tools/campus?campusId=ub-buffalo&profileId=profile-jwrhineh&visibility=public")
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toEqual([
      expect.objectContaining({
        id: publicToolId,
        visibility: "public",
        status: "certified",
        placement: expect.objectContaining({
          start: expect.any(Boolean),
          live: expect.any(Boolean),
          board: expect.stringMatching(/^(off|on_input|recap_only)$/),
          calendar: expect.any(Boolean)
        })
      })
    ]);
  });

  it("rejects non-leader profiles that try to browse the campus catalog", async () => {
    const response = await getCampusCatalog(
      new NextRequest(
        "https://hive.test/api/tools/campus?campusId=ub-buffalo&profileId=profile-kai"
      )
    );

    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("FORBIDDEN");
  });
});
