// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { listFeatureFlags } from "@admin/server/features";
import { logAdminEvent } from "@admin/server/audit";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const session = await getAdminSession();
  const flags = await listFeatureFlags(100);
  await logAdminEvent({ action: "view", page: "api:features", sessionId: session?.sessionId, actorProfileId: session?.profileId });

  return NextResponse.json({ success: true, data: { flags, generatedAt: new Date().toISOString() } });
}

