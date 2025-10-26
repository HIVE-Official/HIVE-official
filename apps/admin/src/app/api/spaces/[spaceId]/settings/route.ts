// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin } from "@admin/server/auth";
import { loadAdminSpaceContext } from "@admin/server/space-context";

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

  const serialized = context.serialized;
  const guidelines = Array.isArray(serialized.guidelines) ? (serialized.guidelines as string[]) : [];
  const helperIds = Array.isArray(serialized.helperIds) ? (serialized.helperIds as string[]) : [];
  const modules = {
    calendar: true,
    tools: true,
    analytics: true,
    moderation: true,
    about: true
  };

  const payload = {
    spaceId: params.spaceId,
    generatedAt: new Date().toISOString(),
    visibility: (typeof serialized.visibility === "string" ? serialized.visibility : "campus"),
    postingPolicy: (typeof serialized.postingPolicy === "string" ? serialized.postingPolicy : "members"),
    shareToCampusAllowed: Boolean(serialized.shareToCampusAllowed),
    helperIds,
    guidelines,
    modules,
    recommendedActions: helperIds.length === 0
      ? ["Assign at least one helper so UB students know who to ping for safety issues."]
      : [],
    notes:
      "Settings snapshot keeps governance consistent with the About page. Align join, posting, and share policies before handing off to design."
  };

  return NextResponse.json({ success: true, data: payload });
}
