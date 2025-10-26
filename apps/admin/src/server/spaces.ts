// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { Timestamp } from "firebase-admin/firestore";

export type AdminSpace = {
  id: string;
  name: string;
  leaderId?: string;
  isActive?: boolean;
  createdAt?: Date | null;
};

export async function listSpaces(limit = 25, q?: string): Promise<AdminSpace[]> {
  if (!isFirebaseConfigured()) return [];
  const db = firebaseFirestore();

  const toSpace = (doc: any): AdminSpace => {
    const d = doc.data();
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    return {
      id: doc.id,
      name: String(d.name ?? doc.id),
      leaderId: d.leaderId ?? undefined,
      isActive: Boolean(d.isActive ?? true),
      createdAt
    } satisfies AdminSpace;
  };

  if (!q) {
    const snap = await db.collection("spaces").orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map(toSpace);
  }

  try {
    const snap = await db
      .collection("spaces")
      .orderBy("name")
      .startAt(q)
      .endAt(q + "\uf8ff")
      .limit(limit)
      .get();
    return snap.docs.map(toSpace);
  } catch {
    return [];
  }
}

export type SpacePage = { items: AdminSpace[]; nextCursor?: string };

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

export async function listSpacesPage(limit = 25, q?: string, cursor?: string): Promise<SpacePage> {
  if (!isFirebaseConfigured()) return { items: [] };
  const db = firebaseFirestore();

  if (q) {
    // For search, reuse listSpaces. Cursor not supported for search.
    const items = await listSpaces(limit, q);
    return { items };
    }

  const parsed = decodeCursor<{ createdAt?: string }>(cursor || undefined);
  let query = db.collection("spaces").orderBy("createdAt", "desc") as any;
  if (parsed?.createdAt) {
    const ts = new Date(parsed.createdAt);
    query = query.startAfter(Timestamp.fromDate(ts));
  }
  query = query.limit(limit);
  const snap = await query.get();
  const items = snap.docs.map((doc: any) => {
    const d = doc.data();
    const createdAt: Date | null = d.createdAt instanceof Timestamp ? d.createdAt.toDate() : d.createdAt ?? null;
    return {
      id: doc.id,
      name: String(d.name ?? doc.id),
      leaderId: d.leaderId ?? undefined,
      isActive: Boolean(d.isActive ?? true),
      createdAt
    } satisfies AdminSpace;
  });
  const last = items[items.length - 1];
  const nextCursor = items.length === limit && last?.createdAt ? encodeCursor({ createdAt: last.createdAt.toISOString() }) : undefined;
  return { items, nextCursor };
}
