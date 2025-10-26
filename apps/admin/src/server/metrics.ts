// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { Timestamp } from "firebase-admin/firestore";

export type OverviewMetrics = {
  signups24h: number | null;
  activeUsers: number | null;
  spaces24h: number | null;
  moderationOpen: number | null;
};

export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  if (!isFirebaseConfigured()) {
    return { signups24h: null, activeUsers: null, spaces24h: null, moderationOpen: null };
  }

  try {
    const db = firebaseFirestore();
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [signupsSnap, sessionsSnap, spacesSnap, moderationSnap] = await Promise.all([
      db.collection("profiles").where("createdAt", ">=", Timestamp.fromDate(dayAgo)).get(),
      db.collection("sessions").where("expiresAt", ">=", Timestamp.fromDate(now)).get(),
      db.collection("spaces").where("createdAt", ">=", Timestamp.fromDate(dayAgo)).get(),
      db.collection("moderation_queue").where("status", "==", "open").get().catch(() => ({ size: 0 }))
    ]);

    return {
      signups24h: signupsSnap.size,
      activeUsers: sessionsSnap.size,
      spaces24h: spacesSnap.size,
      moderationOpen: (moderationSnap as any).size ?? 0
    };
  } catch (err) {
    console.warn("admin.metrics_error", err);
    return { signups24h: null, activeUsers: null, spaces24h: null, moderationOpen: null };
  }
}

