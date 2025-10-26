// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin } from "@admin/server/auth";
import { loadAdminSpaceContext } from "@admin/server/space-context";

interface ToolSummary {
  readonly toolId: string;
  readonly toolSlug?: string | null;
  readonly usageCount: number;
  readonly lastPostedAt: string;
  readonly placements: readonly string[];
  readonly lastPostExcerpt?: string;
}

const MAX_COMPOSER_SLOTS = 6;

export async function GET(
  _request: Request,
  { params }: { params: { spaceId: string } }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const context = await loadAdminSpaceContext(params.spaceId);
  if (!context) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found." } },
      { status: 404 }
    );
  }

  const toolUsage = new Map<string, ToolSummary>();

  for (const post of context.posts) {
    const tool = post.toolContext;
    if (!tool) continue;

    const key = tool.toolId;
    const existing = toolUsage.get(key);
    const createdAt = new Date(post.createdAt);
    const excerpt = post.content.slice(0, 80);

    if (existing) {
      const placements = new Set(existing.placements);
      if (tool.placementId) {
        placements.add(tool.placementId);
      }

      toolUsage.set(key, {
        ...existing,
        usageCount: existing.usageCount + 1,
        lastPostedAt:
          createdAt.getTime() > new Date(existing.lastPostedAt).getTime()
            ? createdAt.toISOString()
            : existing.lastPostedAt,
        placements: Array.from(placements),
        lastPostExcerpt: excerpt
      });
    } else {
      toolUsage.set(key, {
        toolId: tool.toolId,
        toolSlug: tool.toolSlug ?? null,
        usageCount: 1,
        lastPostedAt: createdAt.toISOString(),
        placements: tool.placementId ? [tool.placementId] : ["composer"],
        lastPostExcerpt: excerpt
      });
    }
  }

  const installed = Array.from(toolUsage.values()).sort(
    (a, b) => b.usageCount - a.usageCount
  );

  const composerActions = installed.slice(0, MAX_COMPOSER_SLOTS).map((entry, index) => ({
    toolId: entry.toolId,
    toolSlug: entry.toolSlug,
    label: entry.toolSlug ?? entry.toolId,
    placement: entry.placements[0] ?? "composer",
    order: index,
    usageCount: entry.usageCount
  }));

  const usageTelemetry = {
    postsLast7d: installed.reduce((acc, entry) => {
      const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return acc + (new Date(entry.lastPostedAt).getTime() >= cutoff ? entry.usageCount : 0);
    }, 0),
    totalToolPosts: installed.reduce((acc, entry) => acc + entry.usageCount, 0)
  };

  const payload = {
    spaceId: params.spaceId,
    generatedAt: new Date().toISOString(),
    installed,
    composerActions,
    policy: {
      dailyPostCap: 2,
      composerSlots: MAX_COMPOSER_SLOTS,
      overridesPast7d: 0
    },
    telemetry: usageTelemetry,
    notes:
      "Tools data is derived from Space posts with toolContext. Use this feed to coach leaders on safe usage and to spot stalled pilots."
  };

  return NextResponse.json({ success: true, data: payload });
}
