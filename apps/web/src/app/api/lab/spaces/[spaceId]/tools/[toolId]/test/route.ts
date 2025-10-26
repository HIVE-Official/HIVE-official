// Bounded Context Owner: HiveLab Guild
import { NextResponse } from "next/server";
import { toolService, serializeTool } from "../../../../../../../../server/tools/service";
import { executeRunTest } from "../../../../../../../../server/tools/run-test";

export async function POST(_request: Request, context: { params: { spaceId: string; toolId: string } }) {
  const result = await toolService.getTool(context.params.toolId);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: result.error } }, { status: 404 });
  }

  const run = await executeRunTest(result.value);

  return NextResponse.json({
    success: true,
    data: {
      lastRunAt: run.lastRunAt,
      health: run.report.health,
      issues: run.report.issues,
      timeline: run.report.timeline,
      posting: run.report.posting,
      attachStatus: run.report.attachStatus,
      runtime: run.report.runtime,
      tool: serializeTool(run.snapshot, { includeCountdown: true, referenceDate: new Date(run.lastRunAt) })
    }
  });
}
