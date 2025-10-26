// Bounded Context Owner: Identity & Access Management Guild
import type { DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { z } from "zod";

type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

export function parseDoc<T>(
  snap: DocumentSnapshot,
  schema: z.ZodSchema<T>
): Result<T, string> {
  if (!snap.exists) return { ok: false, error: "Document does not exist" };
  const parsed = schema.safeParse(snap.data());
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((i) => i.message).join(", ")
    };
  }
  return { ok: true, value: parsed.data };
}

export function parseQuery<T>(
  snap: QuerySnapshot,
  schema: z.ZodSchema<T>
): Result<ReadonlyArray<T>, string> {
  const items: T[] = [];
  for (const doc of snap.docs) {
    const parsed = schema.safeParse(doc.data());
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues.map((i) => i.message).join(", ")
      };
    }
    items.push(parsed.data);
  }
  return { ok: true, value: items };
}

