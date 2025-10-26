// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";

const VisibilitySchema = z.enum(["private", "space", "campus", "public"]);

export async function POST(request: NextRequest, { params }: { params: { toolId: string } }) {
  const { toolId } = params;
  const body = await request.json().catch(() => ({}));
  const BodySchema = z.object({
    visibility: VisibilitySchema.default("private"),
  });
  const parsedBody = BodySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID", message: "Invalid request body" } },
      { status: 400 }
    );
  }
  const { visibility } = parsedBody.data;
  const profileId = await requireActorProfileId(request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to change visibility" } },
      { status: 401 }
    );
  }
  const parsed = VisibilitySchema.safeParse(visibility);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_VISIBILITY", message: "visibility must be private|space|campus|public" } },
      { status: 400 }
    );
  }

  const result = await toolService.updateVisibility({ toolId, profileId, visibility: parsed.data });
  if (!result.ok) {
    const status = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: result.error === "FORBIDDEN" ? "FORBIDDEN" : "UPDATE_FAILED", message: String(result.error) } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value, { includeCountdown: true }) });
}
