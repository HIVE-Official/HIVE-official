// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { spaceService, spacePostService, serializePost } from "../../../../../../../server/spaces/service";

const BodySchema = z.object({
  status: z.enum(["going", "maybe", "not_going", "waitlist"]).nullable(),
});

export async function POST(request: Request, context: { params: { spaceId: string; eventId: string } }) {
  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.issues.map((i) => i.message).join(", ") } },
      { status: 400 }
    );
  }

  const result = await spacePostService.setEventRsvp({
    spaceId: context.params.spaceId,
    postId: context.params.eventId,
    status: parsed.data.status,
  });

  if (!result.ok) {
    return NextResponse.json({ success: false, error: { code: "RSVP_FAILED", message: result.error } }, { status: 400 });
  }

  const payload = serializePost(result.value);
  return NextResponse.json({ success: true, data: payload });
}
