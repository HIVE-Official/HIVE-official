// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { rejectBuilderRequest } from "@admin/server/users";
import { logAdminEvent } from "@admin/server/audit";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }
  const session = await getAdminSession();
  const result = await rejectBuilderRequest(params.id);
  await logAdminEvent({ action: "builder_request:reject", page: "api:users:builder-requests:reject", targetId: params.id, sessionId: session?.sessionId, actorProfileId: session?.profileId });
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "REJECT_FAILED", message: result.reason } },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true, data: { id: params.id, persisted: result.persisted } });
}

