// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { grantUserRole, rejectBuilderRequest } from "@admin/server/users";
import { logAdminEvent } from "@admin/server/audit";

type Body = { profileId: string; role: string; requestId?: string };

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }
  let body: Body | null = null;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "JSON body required." } },
      { status: 400 }
    );
  }
  if (!body?.profileId || !body?.role) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "profileId and role are required." } },
      { status: 400 }
    );
  }
  const session = await getAdminSession();
  const result = await grantUserRole(body.profileId, body.role);
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "GRANT_FAILED", message: result.reason } },
      { status: 400 }
    );
  }
  if (body.requestId) {
    await rejectBuilderRequest(body.requestId); // mark closed
  }
  await logAdminEvent({ action: `grant:${body.role}`, page: "api:users:grant-role", targetId: body.profileId, sessionId: session?.sessionId, actorProfileId: session?.profileId });
  return NextResponse.json({ success: true, data: { profileId: body.profileId, role: body.role, persisted: result.persisted } });
}

