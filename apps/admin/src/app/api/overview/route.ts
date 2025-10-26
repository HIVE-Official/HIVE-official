// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { getOverviewMetrics } from "@admin/server/metrics";
import { logAdminEvent } from "@admin/server/audit";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const session = await getAdminSession();
  const metrics = await getOverviewMetrics();
  await logAdminEvent({ action: "view", page: "api:overview", sessionId: session?.sessionId, actorProfileId: session?.profileId });

  return NextResponse.json({ success: true, data: { metrics, generatedAt: new Date().toISOString() } });
}

