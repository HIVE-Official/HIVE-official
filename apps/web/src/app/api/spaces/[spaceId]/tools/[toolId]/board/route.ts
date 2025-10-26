// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getToolTelemetry } from "../../../../../../../server/tools/telemetry";
import { resolveActorProfileId } from "../../../../../../../server/auth/session-actor";

const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

const BodySchema = z.object({
  variant: z.enum(["input", "recap"]).default("input"),
});

export async function POST(request: NextRequest, context: { params: { spaceId: string; toolId: string } }) {
  const { spaceId, toolId } = context.params;
  const body = await request.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(body ?? {});
  const variant = parsed.success ? parsed.data.variant : "input";

  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? (request.headers.get("x-actor-id") ?? null) : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to trigger tool posts" } },
      { status: 401 }
    );
  }

  // Stub only: record telemetry to acknowledge the interaction. No post is created here.
  try {
    const telemetry = getToolTelemetry();
    await telemetry.recordInteraction({
      toolId,
      performedBy: profileId,
      event: variant === "input" ? "board_input_triggered" : "board_recap_triggered",
      metadata: { spaceId, variant }
    });
  } catch (error) {
    console.warn("tools.board.telemetry_failed", { toolId, spaceId, error });
  }

  return NextResponse.json({ success: true });
}
