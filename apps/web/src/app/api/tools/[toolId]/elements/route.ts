// Bounded Context Owner: HiveLab Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";

const ElementSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  config: z.record(z.any()).default({})
});

const BodySchema = z.object({ elements: z.array(ElementSchema).min(1) });

export async function PUT(request: Request, context: { params: { toolId: string } }) {
  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.message } },
      { status: 400 }
    );
  }

  const profileId = await requireActorProfileId(request as unknown as Request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to edit tools" } },
      { status: 401 }
    );
  }
  const result = await toolService.updateElements({
    toolId: context.params.toolId,
    profileId,
    elements: parsed.data.elements
  });
  if (!result.ok) {
    const status = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: "UPDATE_ELEMENTS_FAILED", message: result.error } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value) });
}
