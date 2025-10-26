// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { Timestamp } from "firebase-admin/firestore";

export type CtaEvent = {
  id: string;
  href?: string | null;
  surface?: string | null;
  pos?: string | null;
  path?: string | null;
  cid?: string | null;
  ts?: number | null;
  ua?: string | null;
  ip?: string | null;
  createdAt?: Date | null;
};

export async function listCtaEvents(limit = 100): Promise<CtaEvent[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const db = firebaseFirestore();
    const snap = await db
      .collection("telemetry_cta")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => {
      const data = d.data() as any;
      const createdAtTs = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : null);
      return {
        id: data.id,
        href: data.href ?? null,
        surface: data.surface ?? null,
        pos: data.pos ?? null,
        path: data.path ?? null,
        cid: data.cid ?? null,
        ts: data.ts ?? null,
        ua: data.ua ?? null,
        ip: data.ip ?? null,
        createdAt: createdAtTs
      } satisfies CtaEvent;
    });
  } catch (err) {
    console.warn("admin.cta_list_error", err);
    return [];
  }
}

export async function countCtaEvents24h(): Promise<number | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const db = firebaseFirestore();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const snap = await db
      .collection("telemetry_cta")
      .where("createdAt", ">=", Timestamp.fromDate(dayAgo))
      .get();
    return snap.size;
  } catch (err) {
    console.warn("admin.cta_count_error", err);
    return null;
  }
}

