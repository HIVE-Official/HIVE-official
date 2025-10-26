// Bounded Context Owner: HiveLab Guild
// Minimal execution endpoint for a tool in a Space context.
// Creates a Space post with toolContext for visibility/placement tests.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resolveActorProfileId } from "../../../../../../../../server/auth/session-actor";
import { spaceService, spacePostService, serializePost } from "../../../../../../../../server/spaces/service";
import { toolService } from "../../../../../../../../server/tools/service";
import { getToolTelemetry } from "../../../../../../../../server/tools/telemetry";

const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

const BodySchema = z.object({
  authorHandle: z.string().trim().min(1).default("lab-runner"),
  content: z.string().trim().min(1).default("Tool run update"),
  placement: z.enum(["board:input", "board:recap"]).default("board:input"),
  variant: z.string().trim().optional()
});

export async function POST(request: NextRequest, context: { params: { spaceId: string; toolId: string } }) {
  const { spaceId, toolId } = context.params;
  const space = await spaceService.getSpaceById(spaceId);
  if (!space) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } },
      { status: 404 }
    );
  }

  // Resolve actor; allow bypass in dev
  const actor = await resolveActorProfileId(request);
  const qpProfile = request.nextUrl.searchParams.get("profileId")?.trim() || null;
  const profileId = actor ?? (BYPASS_AUTH ? qpProfile : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to execute tools" } },
      { status: 401 }
    );
  }

  // Fetch tool snapshot and basic permission checks
  const toolResult = await toolService.getTool(toolId);
  if (!toolResult.ok) {
    return NextResponse.json(
      { success: false, error: { code: "TOOL_NOT_FOUND", message: "Tool not found" } },
      { status: 404 }
    );
  }
  const tool = toolResult.value;

  // Ensure campus alignment and optional space scoping alignment
  if (tool.campusId !== space.campusId) {
    return NextResponse.json(
      { success: false, error: { code: "CAMPUS_MISMATCH", message: "Tool and space campus mismatch" } },
      { status: 400 }
    );
  }
  if (tool.spaceId && tool.spaceId !== spaceId) {
    return NextResponse.json(
      { success: false, error: { code: "TOOL_SPACE_MISMATCH", message: "Tool not scoped to this space" } },
      { status: 400 }
    );
  }

  // Require tool editors (creator or canEdit) OR space leader
  const isToolEditor = tool.createdBy === profileId || tool.permissions.canEdit.includes(profileId);
  const isSpaceLeader = space.members.some((m) => m.profileId === profileId && m.role === "leader");
  if (!isToolEditor && !isSpaceLeader) {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "You cannot execute this tool in this space" } },
      { status: 403 }
    );
  }

  // Parse body
  const body = await request.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: parsed.error.message } },
      { status: 400 }
    );
  }

  const postId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const result = await spacePostService.create({
    postId,
    spaceId,
    authorId: profileId,
    authorHandle: parsed.data.authorHandle,
    content: parsed.data.content,
    kind: "standard",
    audience: "members",
    origin: "tool_manual",
    toolContext: {
      toolId: tool.id,
      toolSlug: tool.authoring.slug,
      placementId: parsed.data.placement,
      variant: parsed.data.variant ?? undefined,
      toolVersion: tool.version
    }
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "EXECUTION_FAILED", message: result.error } },
      { status: 400 }
    );
  }
  // Record execution interaction
  try {
    const telemetry = getToolTelemetry();
    await telemetry.recordInteraction({
      toolId: tool.id,
      performedBy: profileId,
      event: "execute",
      metadata: {
        spaceId,
        postId: result.value.id,
        placementId: (result.value.toolContext as any)?.placementId ?? null
      }
    });
  } catch {
    // best-effort
  }

  return NextResponse.json({ success: true, data: serializePost(result.value) }, { status: 201 });
}
