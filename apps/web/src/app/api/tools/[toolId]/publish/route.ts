// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../server/tools/service";
import { requireActorProfileId } from "../../../../../server/auth/session-actor";
import { validatePublishGate } from "../../../../../server/tools/run-test";

export async function POST(request: NextRequest, { params }: { params: { toolId: string } }) {
  const { toolId } = params;
  const body = await request.json().catch(() => ({}));
  const BodySchema = z.object({
    stage: z.coerce.string().default("limited_run")
  });
  const parsed = BodySchema.safeParse(body);
  const { stage } = parsed.success ? parsed.data : BodySchema.parse({});

  const profileId = await requireActorProfileId(request, false);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to publish tools" } },
      { status: 401 }
    );
  }

  // Allow "certified" when explicitly enabled to keep pre‑GA posture conservative
  const allowCertified = process.env.LAB_CERTIFY_ENABLED === "true";
  if (stage !== "limited_run" && !(allowCertified && stage === "certified")) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_STAGE", message: allowCertified ? "Stage must be limited_run or certified" : "Only limited_run is supported" } },
      { status: 400 }
    );
  }

  // Provide clearer error messages by checking gate before calling service (service still enforces gates)
  const pre = await toolService.getTool(toolId);
  if (!pre.ok) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Tool not found" } },
      { status: 404 }
    );
  }
  const gate = validatePublishGate(pre.value);
  if (!gate.ok) {
    return NextResponse.json(
      { success: false, error: gate },
      { status: 400 }
    );
  }

  const result = await toolService.publishTool({ toolId, profileId, stage: stage === "certified" ? "certified" : "limited_run" });
  if (!result.ok) {
    const status = result.error === "FORBIDDEN" ? 403 : 400;
    return NextResponse.json(
      { success: false, error: { code: result.error === "FORBIDDEN" ? "FORBIDDEN" : "PUBLISH_FAILED", message: String(result.error) } },
      { status }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value, { includeCountdown: true }) });
}
