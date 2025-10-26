// Bounded Context Owner: HiveLab Guild
import { describe, expect, it } from "vitest";

process.env.ENABLE_DEV_SEEDS = "true";
process.env.USE_FIRESTORE_TOOLS = "false";
process.env.USE_FIRESTORE_SPACES = "false";
describe("ToolDeploymentReconciliationJob", () => {
  it("removes tool deployments targeting missing spaces", async () => {
    const { ToolDeploymentReconciliationJob } = await import("./reconcile-deployments.job");
    const { toolService } = await import("../service");
    const job = new ToolDeploymentReconciliationJob();
    const toolId = "tool-event-rsvp";

    const deploy = await toolService.deployTool({
      toolId,
      profileId: "profile-jwrhineh",
      spaceIds: ["space-nonexistent"]
    });
    expect(deploy.ok).toBe(true);

    const before = await toolService.getTool(toolId);
    if (!before.ok) {
      throw new Error(String(before.error ?? "getTool failed"));
    }
    expect(before.value.deployedTo).toContain("space-nonexistent");

    const result = await job.run();
    expect(result.scanned).toBeGreaterThan(0);
    expect(result.reconciled).toBeGreaterThanOrEqual(1);
    expect(result.removedSpaceIds).toBeGreaterThanOrEqual(1);

    const after = await toolService.getTool(toolId);
    if (!after.ok) {
      throw new Error(String(after.error ?? "getTool failed"));
    }
    expect(after.value.deployedTo).not.toContain("space-nonexistent");
  });
});
