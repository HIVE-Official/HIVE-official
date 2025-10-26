// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { toolService, serializeTool } from "../../../server/tools/service";
import { requireActorProfileId } from "../../../server/auth/session-actor";
import { spaceService } from "../../../server/spaces/service";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const BodySchema = z.object({
    name: z.coerce.string().trim().min(1).default("New Tool"),
    description: z.coerce.string().trim().default("Untitled draft"),
    campusId: z.coerce.string().trim().optional(),
    spaceId: z.coerce.string().trim().optional(),
    templateId: z.coerce.string().trim().optional()
  });
  const parsed = BodySchema.safeParse(body);
  const { name, description, campusId: bodyCampusId, spaceId, templateId } = parsed.success
    ? parsed.data
    : BodySchema.parse({});

  // Resolve actor from session; allow dev override only when BYPASS_AUTH
  const profileId = await requireActorProfileId(request, true);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to create tools" } },
      { status: 401 }
    );
  }

  // Resolve campusId: prefer explicit campusId; else derive from spaceId if provided
  let campusId = bodyCampusId ?? null;
  if (!campusId && spaceId) {
    try {
      const space = await spaceService.getSpaceById(spaceId);
      campusId = space?.campusId ?? null;
    } catch {
      campusId = null;
    }
  }
  if (!campusId) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID", message: "campusId (or a valid spaceId) is required" } },
      { status: 400 }
    );
  }

  const id = `tool-${randomUUID()}`;

  // Create draft. If no templateId provided, include a minimal default element.
  const result = await toolService.createDraft({
    id,
    campusId,
    name,
    description,
    createdBy: profileId,
    spaceId,
    templateId,
    elements: templateId
      ? undefined
      : [
          {
            id: "quick_form",
            name: "Quick Form",
            type: "collector",
            config: { fieldLimit: 1 }
          }
        ]
  });

  if (!result.ok) {
    const code = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: result.error === "FORBIDDEN" ? "FORBIDDEN" : "CREATE_FAILED", message: String(result.error) } },
      { status: code }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value) });
}
