// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

export type AdminAuditEvent = {
  action: string; // e.g., view, search, open, update
  page?: string;
  targetId?: string;
  sessionId?: string;
  actorProfileId?: string;
  meta?: Record<string, unknown>;
};

export async function logAdminEvent(event: AdminAuditEvent): Promise<void> {
  try {
    if (!isFirebaseConfigured()) return; // no-op in dev without config
    const db = firebaseFirestore();
    await db.collection("admin_audit").add({
      ...event,
      timestamp: new Date()
    });
  } catch {
    // best-effort only; never throw
  }
}

export type AdminAuditRecord = AdminAuditEvent & { id: string; timestamp?: Date | null };

export async function listRecentAdminAudit(limit = 20): Promise<AdminAuditRecord[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const db = firebaseFirestore();
    const snap = await db
      .collection("admin_audit")
      .orderBy("timestamp", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((doc) => {
      const d = doc.data() as any;
      const ts = d?.timestamp?.toDate?.() ?? d?.timestamp ?? null;
      return {
        id: doc.id,
        action: String(d?.action ?? "unknown"),
        page: d?.page,
        targetId: d?.targetId,
        sessionId: d?.sessionId,
        actorProfileId: d?.actorProfileId,
        meta: d?.meta,
        timestamp: ts instanceof Date ? ts : ts ? new Date(ts) : null
      } satisfies AdminAuditRecord;
    });
  } catch {
    return [];
  }
}
