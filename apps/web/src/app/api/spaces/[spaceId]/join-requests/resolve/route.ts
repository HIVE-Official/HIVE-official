// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, spaceJoinRequestService } from "../../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../../server/auth/session-actor";
import { canUpdateRoles } from "../../../../../../server/spaces/policy";

const Schema = z.object({
  requestId: z.string().min(1),
  action: z.enum(["approve", "reject"]),
  actorId: z.string().min(1).optional(),
  reason: z.string().trim().max(500).optional()
});

export async function POST(request: Request, context: { params: { spaceId: string } }) {
  const json = await request.json().catch(() => null);
  const parsed = Schema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map((i) => i.message).join(", ") } }, { status: 400 });
  }

  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });

  const actorId = await resolveActorProfileId(request, parsed.data.actorId);
  if (!actorId) return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } }, { status: 401 });
  if (!canUpdateRoles(space, actorId)) return NextResponse.json({ success: false, error: { code: "NOT_AUTHORIZED", message: "Only leaders/admins can resolve join requests" } }, { status: 403 });

  const action = parsed.data.action;
  const reason = parsed.data.reason ?? null;
  const reqId = parsed.data.requestId;
  const result = action === "approve"
    ? await spaceJoinRequestService.approve({ spaceId: space.id, requestId: reqId, actorId, reason })
    : await spaceJoinRequestService.reject({ spaceId: space.id, requestId: reqId, actorId, reason });

  if (!result.ok) {
    return NextResponse.json({ success: false, error: { code: "RESOLVE_FAILED", message: result.error } }, { status: 400 });
  }

  const r = result.value.request;
  return NextResponse.json({ success: true, data: { id: r.id, spaceId: r.spaceId, profileId: r.profileId, requestedAt: r.requestedAt.toISOString(), status: r.status, resolvedAt: r.resolvedAt?.toISOString() ?? null, resolvedBy: r.resolvedBy ?? null, reason: r.reason ?? null } });
}

