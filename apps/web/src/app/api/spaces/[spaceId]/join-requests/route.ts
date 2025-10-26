// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, spaceJoinRequestService } from "../../../../../server/spaces/service";
import { resolveActorProfileId } from "../../../../../server/auth/session-actor";
import { canModerate } from "../../../../../server/spaces/policy";

const CreateSchema = z.object({ profileId: z.string().min(1).optional() });

export async function GET(_request: Request, context: { params: { spaceId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });
  // Authorization: only moderators/leaders can list join requests
  const url = new URL(_request.url);
  const actorId = await resolveActorProfileId(_request, url.searchParams.get("actorId"));
  if (!actorId) return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } }, { status: 401 });
  if (!canModerate(space, actorId)) return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Only moderators/leaders" } }, { status: 403 });
  const pending = await spaceJoinRequestService.list(space.id, "pending");
  return NextResponse.json({ success: true, data: pending.map((r) => ({
    id: r.id,
    spaceId: r.spaceId,
    profileId: r.profileId,
    requestedAt: r.requestedAt.toISOString(),
    status: r.status
  })) });
}

export async function POST(request: Request, context: { params: { spaceId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });
  const json = await request.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map((i) => i.message).join(", ") } }, { status: 400 });
  }
  const profileId = (await resolveActorProfileId(request, parsed.data.profileId))!;
  if (!profileId) return NextResponse.json({ success: false, error: { code: "UNAUTHENTICATED", message: "Session required" } }, { status: 401 });
  const result = await spaceJoinRequestService.request({ spaceId: space.id, profileId });
  if (!result.ok) {
    const code = result.error === "Already a member" ? 400 : 400;
    return NextResponse.json({ success: false, error: { code: "JOIN_REQUEST_FAILED", message: result.error } }, { status: code });
  }
  return NextResponse.json({ success: true, data: { id: result.value.id, spaceId: result.value.spaceId, profileId: result.value.profileId, requestedAt: result.value.requestedAt.toISOString(), status: result.value.status } }, { status: 202 });
}

