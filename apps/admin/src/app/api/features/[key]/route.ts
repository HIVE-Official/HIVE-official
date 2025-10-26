// Bounded Context Owner: Governance Guild
import { NextResponse } from "next/server";
import { isAdmin, getAdminSession } from "@admin/server/auth";
import { setFeatureFlag } from "@admin/server/features";
import { logAdminEvent } from "@admin/server/audit";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

type Body = {
  label?: string;
  description?: string;
  audience?: string;
  rolloutPercentage?: number;
  segments?: { campuses?: string[]; roles?: string[] };
};

export async function PATCH(req: Request, { params }: { params: { key: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  let body: Body | null = null;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "JSON body required." } },
      { status: 400 }
    );
  }

  const key = decodeURIComponent(params.key);
  const session = await getAdminSession();

  let diff: Record<string, any> | undefined;
  if (isFirebaseConfigured()) {
    const db = firebaseFirestore();
    const before = await db.collection("feature_flags").doc(key).get().catch(() => null);
    await setFeatureFlag({ key, ...body });
    try {
      const a = before?.data() ?? {};
      const changed: Record<string, any> = {};
      for (const k of ["label", "description", "audience", "rolloutPercentage", "segments"]) {
        if (JSON.stringify(a?.[k]) !== JSON.stringify((body as any)?.[k])) {
          changed[k] = (body as any)?.[k];
        }
      }
      diff = changed;
    } catch {}
  }
  await logAdminEvent({ action: "feature_update", page: "api:features:update", targetId: key, sessionId: session?.sessionId, actorProfileId: session?.profileId, meta: diff });
  return NextResponse.json({ success: true, data: { key, persisted: isFirebaseConfigured() } });
}
