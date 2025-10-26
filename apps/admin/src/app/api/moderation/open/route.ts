// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { listModeration } from "@admin/server/moderation";
import { logAdminEvent } from "@admin/server/audit";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || undefined;
  const contentType = url.searchParams.get("contentType") || undefined;
  const campusId = url.searchParams.get("campusId") || undefined;
  const limit = Number.parseInt(url.searchParams.get("limit") || "50") || 50;
  const session = await getAdminSession();
  const items = await listModeration({ status: status || "open", contentType: contentType || undefined, campusId: campusId || undefined, limit });
  await logAdminEvent({ action: "view", page: "api:moderation:open", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  return NextResponse.json({ success: true, data: { items } });
}
