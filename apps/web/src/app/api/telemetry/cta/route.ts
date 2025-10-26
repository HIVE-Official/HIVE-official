// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

type CtaEvent = {
  id: string; // e.g., hero_get_in, final_get_in, triad_students
  href?: string;
  surface?: string; // e.g., landing_v2
  pos?: string; // e.g., hero, triad, footer
  path?: string; // current page path
  cid?: string; // anonymous client id
  ts?: number; // epoch ms
  meta?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  let payload: CtaEvent | undefined;
  try {
    payload = (await request.json()) as CtaEvent;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!payload?.id) {
    return NextResponse.json({ error: "missing_id" }, { status: 400 });
  }

  const record = {
    ...payload,
    ts: typeof payload.ts === "number" ? payload.ts : Date.now(),
    ua: request.headers.get("user-agent") ?? null,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    createdAt: new Date()
  } as const;

  try {
    if (isFirebaseConfigured()) {
      const db = firebaseFirestore();
      await db.collection("telemetry_cta").add(record as unknown as Record<string, unknown>);
    } else {
      // Fallback: console logging in non-configured environments
      // eslint-disable-next-line no-console
      console.warn("telemetry.cta", { id: record.id, path: record.path, href: record.href, pos: record.pos });
    }
  } catch {
    // Non-fatal; continue
  }

  return NextResponse.json({ ok: true });
}

