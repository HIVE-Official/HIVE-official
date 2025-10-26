// Bounded Context Owner: HiveLab Guild
// Admin/dev-only job endpoint to reconcile tool deployments with current space state.

import { NextRequest, NextResponse } from "next/server";
import { ToolDeploymentReconciliationJob } from "../../../../../server/tools/jobs/reconcile-deployments.job";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";

export async function POST(request: NextRequest) {
  // Dev-only: require seeds mode. In production, this endpoint is disabled until admin roles are wired.
  if (process.env.ENABLE_DEV_SEEDS !== "true") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Reconcile job is disabled outside dev seeds" } },
      { status: 403 }
    );
  }
  const actor = await requireActorProfileId(request, true);
  if (!actor) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Not authorized to run jobs" } },
      { status: 401 }
    );
  }

  const job = new ToolDeploymentReconciliationJob();
  const result = await job.run();
  return NextResponse.json({ success: true, data: result });
}
