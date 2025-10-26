// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { undoModerationAction } from "@admin/server/moderation";
import { logAdminEvent } from "@admin/server/audit";

export async function POST(_: Request, { params }: { params: { actionId: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }
  const session = await getAdminSession();
  const result = await undoModerationAction(params.actionId);
  await logAdminEvent({ action: "moderation:undo", page: "api:moderation:undo", targetId: params.actionId, sessionId: session?.sessionId, actorProfileId: session?.profileId });
  if (!result.ok) {
    return NextResponse.json({ success: false, error: { code: "UNDO_FAILED", message: result.reason } }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: { id: params.actionId, persisted: result.persisted } });
}

