// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { listCtaEvents, countCtaEvents24h } from "@admin/server/cta";
import { logAdminEvent } from "@admin/server/audit";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ success: false, error: { code: "NOT_AUTHORIZED" } }, { status: 403 });
  }

  const [items, count24h] = await Promise.all([
    listCtaEvents(200),
    countCtaEvents24h()
  ]);

  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "api:analytics-cta", sessionId: session?.sessionId, actorProfileId: session?.profileId });

  return NextResponse.json({ success: true, data: { items, count24h } });
}

