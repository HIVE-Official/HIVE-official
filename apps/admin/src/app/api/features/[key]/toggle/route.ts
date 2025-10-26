// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { setFeatureFlag } from "@admin/server/features";
import { logAdminEvent } from "@admin/server/audit";
import { isFirebaseConfigured } from "@hive/firebase";

type Body = {
  enabled: boolean;
  label?: string;
  description?: string;
  audience?: string;
};

export async function POST(_: Request, { params }: { params: { key: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const key = decodeURIComponent(params.key);
  let body: Body | null = null;
  try {
    body = (await _.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "JSON body required." } },
      { status: 400 }
    );
  }

  if (typeof body.enabled !== "boolean") {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "'enabled' boolean is required." } },
      { status: 400 }
    );
  }

  const session = await getAdminSession();

  // Write when Firebase configured; otherwise, no-op success for dev UX
  if (isFirebaseConfigured()) {
    await setFeatureFlag({ key, enabled: body.enabled });
  }

  await logAdminEvent({
    action: "feature_toggle",
    page: "api:features:toggle",
    targetId: key,
    sessionId: session?.sessionId,
    actorProfileId: session?.profileId,
    meta: { enabled: body.enabled, audience: body.audience }
  });

  return NextResponse.json({ success: true, data: { key, enabled: body.enabled, persisted: isFirebaseConfigured() } });
}
