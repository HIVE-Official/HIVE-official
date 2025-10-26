// Bounded Context Owner: HiveLab Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toolService, serializeTool } from "../../../../../server/tools/service";

const HealthSchema = z.enum(["looks_good", "heads_up", "fix_required"]);

export async function POST(request: NextRequest, { params }: { params: { toolId: string } }) {
  const { toolId } = params;
  const body = await request.json().catch(() => ({}));
  const health = HealthSchema.safeParse((body as { health?: unknown }).health ?? "looks_good");
  const blocking = Number((body as { blockingIssueCount?: unknown }).blockingIssueCount ?? 0);

  if (!health.success || Number.isNaN(blocking) || blocking < 0) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_TEST", message: "Provide health looks_good|heads_up|fix_required and non-negative blockingIssueCount" } },
      { status: 400 }
    );
  }

  const result = await toolService.recordTestResult({
    toolId,
    runAt: new Date(),
    blockingIssueCount: blocking,
    health: health.data
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "TEST_FAILED", message: String(result.error) } },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true, data: serializeTool(result.value, { includeCountdown: true }) });
}
