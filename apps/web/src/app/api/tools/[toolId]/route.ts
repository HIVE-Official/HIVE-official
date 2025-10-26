// Bounded Context Owner: HiveLab Guild
import { NextResponse } from "next/server";
import { toolService, serializeTool } from "../../../../server/tools/service";

export async function GET(_: Request, { params }: { params: { toolId: string } }) {
  const { toolId } = params;
  const result = await toolService.getTool(toolId);
  if (!result.ok) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Tool not found" } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: serializeTool(result.value, { includeCountdown: true }) });
}
