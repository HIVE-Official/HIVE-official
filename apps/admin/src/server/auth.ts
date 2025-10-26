// Bounded Context Owner: Governance Guild
import { cookies } from "next/headers";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

const SESSION_COOKIE_NAME = "hive_session";

export type AdminSession = {
  sessionId: string;
  profileId: string;
  scopes: readonly string[];
};

/**
 * Resolve current session from cookie and fetch from Firestore.
 * In development without Firebase configured, returns a permissive fake session.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const cookie = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return devFallback();

  if (!isFirebaseConfigured()) return devFallback();

  const db = firebaseFirestore();
  const doc = await db.collection("sessions").doc(cookie).get();
  if (!doc.exists) return null;
  const data = doc.data() as { profileId?: string; scopes?: string[] } | undefined;
  if (!data || !data.profileId) return null;
  return { sessionId: cookie, profileId: String(data.profileId), scopes: data.scopes ?? [] };
}

/**
 * Check if the current session has admin-level scopes.
 * Accepts any of: "admin", "app:admin", "platform:admin", "governance:admin".
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getAdminSession();
  if (!session) return false;
  const s = new Set(session.scopes);
  const byScope = s.has("admin") || s.has("app:admin") || s.has("platform:admin") || s.has("governance:admin");
  if (byScope) return true;

  // Optional: email allowlist for belt-and-suspenders hardening
  const allow = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (allow && allow.length > 0 && isFirebaseConfigured()) {
    try {
      const db = firebaseFirestore();
      const prof = await db.collection("profiles").doc(session.profileId).get();
      const email = String((prof.data() as any)?.email ?? "").toLowerCase();
      if (email && allow.includes(email)) return true;
    } catch {
      // ignore
    }
  }
  return false;
}

function devFallback(): AdminSession | null {
  if (process.env.NODE_ENV !== "production") {
    // Allow in dev when Firebase not configured or cookie absent.
    return { sessionId: "dev", profileId: "dev-profile", scopes: ["admin"] };
  }
  return null;
}
