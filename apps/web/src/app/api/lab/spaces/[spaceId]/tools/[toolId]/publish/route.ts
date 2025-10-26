// Bounded Context Owner: HiveLab Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../../../../server/tools/service";
import { validatePublishGate } from "../../../../../../../../server/tools/run-test";

const Body = z.object({ stage: z.enum(["limited_run", "certified"]) });

const DEFAULT_PROFILE_ID = "profile-jwrhineh";

export async function POST(request: Request, context: { params: { spaceId: string; toolId: string } }) {
  // TODO: enforce publish gate (fresh test ≤ 10m and no blocking lints) when compiler is wired
  const payload = await request.json().catch(() => ({}));
  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: { code: "INVALID_BODY" } }, { status: 400 });
  }

  const profileId = new URL(request.url).searchParams.get("profileId") ?? DEFAULT_PROFILE_ID;
  const toolResult = await toolService.getTool(context.params.toolId);
  if (!toolResult.ok) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: toolResult.error } }, { status: 404 });
  }

  const gate = validatePublishGate(toolResult.value);
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: gate }, { status: 400 });
  }

  const result = await toolService.publishTool({
    toolId: context.params.toolId,
    profileId,
    stage: parsed.data.stage
  });
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "PUBLISH_FAILED", message: result.error } },
      { status: result.error === "FORBIDDEN" ? 403 : 400 }
    );
  }

  return NextResponse.json({
    success: true,
    stage: parsed.data.stage,
    data: serializeTool(result.value, { includeCountdown: true })
  });
}
