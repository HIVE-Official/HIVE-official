// Bounded Context Owner: Identity & Access Management Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import type { Firestore } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import type { ProfilePresence } from "../../profile/profile.contract";
import { FirestoreProfileRepository } from "../auth/repositories/firestore-profile.repository";

type PresenceWritePayload = {
  status?: ProfilePresence["status"];
  isGhostMode?: boolean;
};

const presenceDefaults: ProfilePresence = {
  status: "offline",
  lastSeenAt: null,
  isGhostMode: false,
};

const usingDevFallback = () => !isFirebaseConfigured() && process.env.ENABLE_DEV_SEEDS === "true";

const db = (): Firestore => {
  if (!isFirebaseConfigured()) {
    throw new Error("Firestore unavailable; configure Firebase or enable dev seeds");
  }
  return firebaseFirestore();
};

export async function getPresence(profileId: string): Promise<ProfilePresence> {
  if (usingDevFallback()) return presenceDefaults;
  const doc = await db().collection("presence").doc(profileId).get();
  if (!doc.exists) return presenceDefaults;
  const data = (doc.data() ?? {}) as Record<string, unknown>;
  const rawStatus = data.status;
  const status: ProfilePresence["status"] = rawStatus === "online" || rawStatus === "away" ? rawStatus : "offline";
  const lastSeenField = data.lastSeen;
  const lastSeenAt = lastSeenField instanceof Timestamp ? lastSeenField.toDate() : null;
  const isGhostMode = Boolean(data.isGhostMode);
  return { status, lastSeenAt, isGhostMode };
}

export async function updatePresence(profileId: string, payload: PresenceWritePayload): Promise<ProfilePresence> {
  if (usingDevFallback()) return presenceDefaults;

  const firestore = db();

  // Resolve campusId for rules and roster queries
  const repo = new FirestoreProfileRepository(firestore);
  const aggregate = await repo.findById(profileId);
  if (!aggregate) throw new Error("Profile not found");
  const campusId = aggregate.getProps().campusId;

  const now = Timestamp.now();
  const docRef = firestore.collection("presence").doc(profileId);
  const existing = await docRef.get();
  const prev = existing.exists ? (existing.data() ?? {}) as Record<string, unknown> : {};

  // Derive status: explicit > derived from lastSeen (now) > offline
  const explicit = payload.status;
  const status: ProfilePresence["status"] = explicit ?? "online";
  const isGhostMode = payload.isGhostMode ?? Boolean(prev.isGhostMode ?? false);

  await docRef.set(
    {
      status,
      lastSeen: now,
      isGhostMode,
      campusId,
      updatedAt: now,
    },
    { merge: true }
  );

  return { status, lastSeenAt: new Date(), isGhostMode };
}

export type { PresenceWritePayload };

