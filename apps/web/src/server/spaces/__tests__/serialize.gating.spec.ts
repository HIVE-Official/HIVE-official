// Bounded Context Owner: Community Guild
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

describe("serializeSpace gating prevents unnecessary fetches", () => {
  let serializeSpace: typeof import("../service").serializeSpace;
  let spaceService: typeof import("../service").spaceService;

  const { listForSpaceMock } = vi.hoisted(() => ({
    listForSpaceMock: vi.fn(async () => [])
  }));

  beforeAll(async () => {
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("USE_FIRESTORE_TOOLS", "false");

    vi.mock("../../tools/service", () => ({
      toolService: { listForSpace: listForSpaceMock },
      serializeToolForCatalog: (tool: any) => tool
    }));

    ({ serializeSpace, spaceService } = await import("../service"));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("does not call tool service when includeTools=false", async () => {
    const space = await spaceService.getSpaceById("space-robotics");
    expect(space).toBeTruthy();
    if (!space) return;

    listForSpaceMock.mockClear();
    await serializeSpace(space, "profile-jwrhineh", {
      includeMeta: true,
      includeTools: false,
      includeActivityMetrics: false,
      includePosts: false
    });
    expect(listForSpaceMock).not.toHaveBeenCalled();
  });

  it("calls tool service when includeTools=true", async () => {
    const space = await spaceService.getSpaceById("space-robotics");
    expect(space).toBeTruthy();
    if (!space) return;

    listForSpaceMock.mockClear();
    await serializeSpace(space, "profile-jwrhineh", {
      includeMeta: true,
      includeTools: true,
      includeActivityMetrics: false,
      includePosts: false
    });
    expect(listForSpaceMock).toHaveBeenCalledTimes(1);
  });
});
