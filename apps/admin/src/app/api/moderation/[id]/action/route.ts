// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { performModerationAction, type ModerationDecision } from "@admin/server/moderation";
import { logAdminEvent } from "@admin/server/audit";

type Body = { action: ModerationDecision; note?: string };

export async function POST(req: Request, { params }: { params: { id: string } }) {
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

  if (!body?.action) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "'action' is required." } },
      { status: 400 }
    );
  }

  const session = await getAdminSession();
  const result = await performModerationAction(params.id, body.action, { note: body.note, actorProfileId: session?.profileId });

  await logAdminEvent({
    action: `moderation:${body.action}`,
    page: "api:moderation:action",
    targetId: params.id,
    sessionId: session?.sessionId,
    actorProfileId: session?.profileId
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "ACTION_FAILED", message: result.reason } },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, data: { id: params.id, action: body.action, persisted: result.persisted } });
}

