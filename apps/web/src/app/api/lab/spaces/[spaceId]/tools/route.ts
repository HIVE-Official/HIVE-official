// Bounded Context Owner: HiveLab Guild
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { toolService, serializeTool, serializeToolForCatalog } from "../../../../../../server/tools/service";
import { resolveActorProfileId } from "../../../../../../server/auth/session-actor";
import { spaceService } from "../../../../../../server/spaces/service";

const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

export async function GET(request: NextRequest, context: { params: { spaceId: string } }) {
  const qpProfile = request.nextUrl.searchParams.get("profileId") ?? null;
  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? qpProfile : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to view tools" } },
      { status: 401 }
    );
  }

  // Derive campusId from query or space
  let campusId: string | null = request.nextUrl.searchParams.get("campusId");
  if (!campusId) {
    const space = await spaceService.getSpaceById(context.params.spaceId);
    campusId = space?.campusId ?? null;
  }
  if (!campusId) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID", message: "campusId is required" } },
      { status: 400 }
    );
  }
  // TODO: filter dashboard by context.params.spaceId when repository supports space scoping
  const dashboard = await toolService.getDashboard({ profileId, campusId });
  const referenceDate = new Date();

  return NextResponse.json({
    success: true,
    data: {
      owned: dashboard.owned.map((tool: any) => ({
        ...serializeToolForCatalog(tool, { referenceDate }),
        icon: tool.icon ?? null
      })),
      drafts: dashboard.drafts.map((tool: any) => ({
        ...serializeToolForCatalog(tool, { referenceDate }),
        icon: tool.icon ?? null
      })),
      published: dashboard.published.map((tool: any) => ({
        ...serializeToolForCatalog(tool, { referenceDate }),
        icon: tool.icon ?? null
      }))
    }
  });
}

const CreateBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  // createdBy and campusId are optional; server prefers session + space
  createdBy: z.string().min(1).optional(),
  campusId: z.string().min(1).optional()
});

export async function POST(request: NextRequest, context: { params: { spaceId: string } }) {
  const json = await request.json().catch(() => null);
  const parsed = CreateBodySchema.safeParse(json ?? {});

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_BODY",
          message: parsed.error.issues.map((issue) => issue.message).join(", ")
        }
      },
      { status: 400 }
    );
  }

  const actor = await resolveActorProfileId(request);
  const profileId = actor ?? (BYPASS_AUTH ? parsed.data.createdBy ?? null : null);
  if (!profileId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Sign in to create tools" } },
      { status: 401 }
    );
  }

  let campusId: string | null = parsed.data.campusId ?? null;
  if (!campusId) {
    const space = await spaceService.getSpaceById(context.params.spaceId);
    campusId = space?.campusId ?? null;
  }
  if (!campusId) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID", message: "campusId (or valid space) required" } },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID();
  const result = await toolService.createDraft({
    id,
    name: parsed.data.name,
    description: parsed.data.description,
    createdBy: profileId,
    campusId,
    // Space scoping will be persisted when repository supports it
    spaceId: context.params.spaceId,
    elements: [
      {
        id: `${id}-element`,
        name: parsed.data.name,
        type: "form",
        config: { template: "blank" }
      }
    ]
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: { code: "CREATE_FAILED", message: result.error } },
      { status: result.error === "FORBIDDEN" ? 403 : 400 }
    );
  }

  return NextResponse.json({ success: true, data: serializeTool(result.value, { includeCountdown: true }) });
}
