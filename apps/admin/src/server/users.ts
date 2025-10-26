// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { Timestamp } from "firebase-admin/firestore";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  handle?: string;
  userType?: string;
  createdAt?: Date | null;
  isActive?: boolean;
};

export async function listUsers(limit = 25, q?: string): Promise<AdminUser[]> {
  if (!isFirebaseConfigured()) return [];
  const db = firebaseFirestore();

  const toUser = (doc: any): AdminUser => {
    const d = doc.data();
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    const name = d.personalInfo?.firstName || d.handle || d.email || doc.id;
    return {
      id: doc.id,
      name: String(name),
      email: String(d.email ?? ""),
      handle: d.handle ?? undefined,
      userType: d.userType ?? undefined,
      createdAt,
      isActive: Boolean(d.isActive ?? true)
    } satisfies AdminUser;
  };

  if (!q) {
    const snap = await db.collection("profiles").orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map(toUser);
  }

  const qNorm = String(q);
  // Try handle and email prefix search; merge results and cap to limit
  const results: Record<string, AdminUser> = {};
  try {
    const hSnap = await db
      .collection("profiles")
      .orderBy("handle")
      .startAt(qNorm)
      .endAt(qNorm + "\uf8ff")
      .limit(limit)
      .get();
    for (const d of hSnap.docs) results[d.id] = toUser(d);
  } catch {}

  try {
    const eSnap = await db
      .collection("profiles")
      .orderBy("email")
      .startAt(qNorm)
      .endAt(qNorm + "\uf8ff")
      .limit(limit)
      .get();
    for (const d of eSnap.docs) results[d.id] = toUser(d);
  } catch {}

  return Object.values(results).slice(0, limit);
}

export type Page<T> = { items: T[]; nextCursor?: string };

function encodeCursor(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}
function decodeCursor<T = any>(cursor?: string): T | null {
  try {
    if (!cursor) return null;
    return JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function listUsersPage(limit = 25, q?: string, cursor?: string): Promise<Page<AdminUser>> {
  if (!isFirebaseConfigured()) return { items: [] };
  const db = firebaseFirestore();

  if (q) {
    // For search, reuse listUsers. Cursor not supported for search.
    const items = await listUsers(limit, q);
    return { items };
  }

  const parsed = decodeCursor<{ createdAt?: string }>(cursor || undefined);
  let query = db.collection("profiles").orderBy("createdAt", "desc") as any;
  if (parsed?.createdAt) {
    const ts = new Date(parsed.createdAt);
    query = query.startAfter(Timestamp.fromDate(ts));
  }
  query = query.limit(limit);
  const snap = await query.get();
  const items = snap.docs.map((doc: any) => {
    const d = doc.data();
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    const name = d.personalInfo?.firstName || d.handle || d.email || doc.id;
    return {
      id: doc.id,
      name: String(name),
      email: String(d.email ?? ""),
      handle: d.handle ?? undefined,
      userType: d.userType ?? undefined,
      createdAt,
      isActive: Boolean(d.isActive ?? true)
    } satisfies AdminUser;
  });
  const last = items[items.length - 1];
  const nextCursor = items.length === limit && last?.createdAt ? encodeCursor({ createdAt: last.createdAt.toISOString() }) : undefined;
  return { items, nextCursor };
}

export type BuilderRequest = {
  id: string;
  profileId: string;
  email?: string;
  reason?: string;
  status?: string;
  createdAt?: Date | null;
};

export async function listBuilderRequests(limit = 25): Promise<BuilderRequest[]> {
  if (!isFirebaseConfigured()) return [];
  const db = firebaseFirestore();
  const snap = await db
    .collection("builder_requests")
    .where("status", "==", "open")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()
    .catch(() => ({ docs: [] as any[] }));
  return snap.docs.map((doc: any) => {
    const d = doc.data() ?? {};
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    return {
      id: doc.id,
      profileId: String(d.profileId ?? ""),
      email: d.email ?? undefined,
      reason: d.reason ?? undefined,
      status: d.status ?? "open",
      createdAt
    } satisfies BuilderRequest;
  });
}

export async function grantUserRole(profileId: string, role: string): Promise<{ ok: true; persisted: boolean } | { ok: false; reason: string }> {
  if (!isFirebaseConfigured()) return { ok: true, persisted: false };
  try {
    const db = firebaseFirestore();
    await db.collection("profiles").doc(profileId).set({ userType: role }, { merge: true });
    return { ok: true, persisted: true };
  } catch (e: any) {
    return { ok: false, reason: String(e?.message || e) };
  }
}

export async function rejectBuilderRequest(id: string): Promise<{ ok: true; persisted: boolean } | { ok: false; reason: string }> {
  if (!isFirebaseConfigured()) return { ok: true, persisted: false };
  try {
    const db = firebaseFirestore();
    await db.collection("builder_requests").doc(id).set({ status: "rejected", closedAt: new Date() }, { merge: true });
    return { ok: true, persisted: true };
  } catch (e: any) {
    return { ok: false, reason: String(e?.message || e) };
  }
}
