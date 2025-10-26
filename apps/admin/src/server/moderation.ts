// Bounded Context Owner: Governance Guild
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { Timestamp } from "firebase-admin/firestore";

export type ModerationItem = {
  id: string;
  contentType: string;
  contentId: string;
  campusId?: string;
  reason?: string;
  priority?: string;
  status?: string;
  createdAt?: Date | null;
};

export async function listOpenModeration(limit = 25): Promise<ModerationItem[]> {
  if (!isFirebaseConfigured()) return [];
  const db = firebaseFirestore();
  const query = await db
    .collection("moderation_queue")
    .where("status", "==", "open")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()
    .catch(() => ({ docs: [] as any[] }));

  return query.docs.map((doc: any) => {
    const d = doc.data() ?? {};
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    return {
      id: doc.id,
      contentType: String(d.contentType ?? "unknown"),
      contentId: String(d.contentId ?? ""),
      campusId: d.campusId ?? undefined,
      reason: d.reason ?? undefined,
      priority: d.priority ?? undefined,
      status: d.status ?? "open",
      createdAt
    } satisfies ModerationItem;
  });
}

export type ModerationDecision = "approve" | "remove" | "ban" | "warn";

export async function performModerationAction(
  id: string,
  decision: ModerationDecision,
  options?: { note?: string; actorProfileId?: string }
): Promise<{ ok: true; persisted: boolean; actionId?: string; undoUntil?: Date } | { ok: false; reason: string }> {
  if (!isFirebaseConfigured()) return { ok: true, persisted: false };
  try {
    const db = firebaseFirestore();
    const now = new Date();
    const ref = db.collection("moderation_queue").doc(id);
    const doc = await ref.get();
    if (!doc.exists) return { ok: false, reason: "NOT_FOUND" };
    await ref.set(
      {
        status: "closed",
        decision,
        note: options?.note ?? null,
        actedBy: options?.actorProfileId ?? null,
        closedAt: now
      },
      { merge: true }
    );
    // Write action log for undo support
    const actionDoc = await db.collection("moderation_actions").add({
      moderationId: id,
      decision,
      note: options?.note ?? null,
      actorProfileId: options?.actorProfileId ?? null,
      createdAt: now,
      undoUntil: new Date(now.getTime() + 10 * 60 * 1000), // 10 minutes
      undoneAt: null
    });
    return { ok: true, persisted: true, actionId: actionDoc.id, undoUntil: new Date(now.getTime() + 10 * 60 * 1000) };
  } catch (err: any) {
    return { ok: false, reason: String(err?.message || err) };
  }
}

export async function undoModerationAction(actionId: string): Promise<{ ok: true; persisted: boolean } | { ok: false; reason: string }> {
  if (!isFirebaseConfigured()) return { ok: true, persisted: false };
  try {
    const db = firebaseFirestore();
    const a = await db.collection("moderation_actions").doc(actionId).get();
    if (!a.exists) return { ok: false, reason: "NOT_FOUND" };
    const d = a.data() as any;
    if (!d || d.undoneAt) return { ok: false, reason: "ALREADY_UNDONE" };
    const undoUntil: Date | null = d.undoUntil?.toDate?.() ?? d.undoUntil ?? null;
    if (!undoUntil || new Date() > new Date(undoUntil)) return { ok: false, reason: "UNDO_WINDOW_EXPIRED" };
    const modId = d.moderationId as string;
    if (!modId) return { ok: false, reason: "INVALID_ACTION" };
    await db.collection("moderation_queue").doc(modId).set({ status: "open", decision: null, note: null, closedAt: null }, { merge: true });
    await a.ref.set({ undoneAt: new Date() }, { merge: true });
    return { ok: true, persisted: true };
  } catch (err: any) {
    return { ok: false, reason: String(err?.message || err) };
  }
}

export type ModerationQuery = {
  status?: string; // open|closed
  contentType?: string;
  campusId?: string;
  limit?: number;
};

export async function listModeration(q: ModerationQuery): Promise<ModerationItem[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const db = firebaseFirestore();
    let col: any = db.collection("moderation_queue");
    if (q.status) col = col.where("status", "==", q.status);
    if (q.contentType) col = col.where("contentType", "==", q.contentType);
    if (q.campusId) col = col.where("campusId", "==", q.campusId);
    col = col.orderBy("createdAt", "desc").limit(q.limit ?? 50);
    const snap = await col.get().catch(() => ({ docs: [] as any[] }));
    return snap.docs.map((doc: any) => {
      const d = doc.data() ?? {};
      const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
      return {
        id: doc.id,
        contentType: String(d.contentType ?? "unknown"),
        contentId: String(d.contentId ?? ""),
        campusId: d.campusId ?? undefined,
        reason: d.reason ?? undefined,
        priority: d.priority ?? undefined,
        status: d.status ?? "open",
        createdAt
      } satisfies ModerationItem;
    });
  } catch {
    return [];
  }
}
/* eslint-disable @typescript-eslint/no-unsafe-return */
