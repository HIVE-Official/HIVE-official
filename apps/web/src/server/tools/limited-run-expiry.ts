// Bounded Context Owner: HiveLab Guild
import { toolService } from "./service";

export async function listExpiredLimitedRunTools(reference = new Date()) {
  const snapshots = await toolService.listLimitedRunExpiring(reference);
  return snapshots.filter((snapshot) => snapshot.limitedRunEndsAt && snapshot.limitedRunEndsAt <= reference);
}

export async function expireLimitedRunTools(reference = new Date()) {
  const expired = await listExpiredLimitedRunTools(reference);
  const results: Array<{ id: string; certified: boolean; error?: string }> = [];

  for (const tool of expired) {
    if (tool.status !== "limited_run") {
      results.push({ id: tool.id, certified: false, error: "not_limited_run" });
      continue;
    }

    const publish = await toolService.publishTool({
      toolId: tool.id,
      profileId: tool.createdBy,
      stage: "certified"
    });
    if (publish.ok) {
      results.push({ id: tool.id, certified: true });
    } else {
      results.push({ id: tool.id, certified: false, error: publish.error });
    }
  }

  return results;
}
