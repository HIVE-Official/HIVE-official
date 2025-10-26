// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { listUsers } from "@admin/server/users";
import { listSpaces } from "@admin/server/spaces";
import { listFeatureFlags } from "@admin/server/features";
import { logAdminEvent } from "@admin/server/audit";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ success: false, error: { code: "NOT_AUTHORIZED" } }, { status: 403 });
  }
  const session = await getAdminSession();
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";
  const [users, spaces, flags] = await Promise.all([
    listUsers(5, q || undefined).catch(() => []),
    listSpaces(5, q || undefined).catch(() => []),
    listFeatureFlags(100).catch(() => [])
  ]);
  const f = q ? flags.filter((fl) => fl.key.includes(q) || (fl.label || "").toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];
  await logAdminEvent({ action: "view", page: "api:search", sessionId: session?.sessionId, actorProfileId: session?.profileId, meta: { q } });
  return NextResponse.json({ success: true, data: { users, spaces, flags: f } });
}

