// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, spacePostService, serializePost } from "../../../../../../../server/spaces/service";

const RsvpSchema = z.object({
  actorId: z.string().min(1),
  status: z.enum(["going", "maybe", "not_going", "waitlist"]).nullable()
});

export async function POST(
  request: Request,
  context: { params: { spaceId: string; postId: string } }
) {
  const { spaceId, postId } = context.params;
  const space = await spaceService.getSpaceById(spaceId);

  if (!space) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } },
      { status: 404 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = RsvpSchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map(i => i.message).join(", ") } },
      { status: 400 }
    );
  }

  const membership = space.members.find((m) => m.profileId === parsed.data.actorId);
  if (!membership) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_A_MEMBER", message: "Only members can RSVP to events in this space" } },
      { status: 403 }
    );
  }

  const result = await spacePostService.setEventRsvp({
    spaceId,
    postId,
    status: parsed.data.status
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "RSVP_FAILED", message: result.error } },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, data: serializePost(result.value) });
}

