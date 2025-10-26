// Bounded Context Owner: Identity & Access Management Guild
// Computes automatic Connections from shared Spaces memberships and upserts summaries.
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import type { Firestore } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { FirestoreProfileRepository } from "../auth/repositories/firestore-profile.repository";
import { profileConnectionSchema, profileConnectionSummarySchema, type ProfileConnectionState } from "../../profile/profile.contract";

type SpaceDoc = {
  id: string;
  campusId: string;
  isActive: boolean;
  memberRoles?: Record<string, string>;
};

const db = (): Firestore => {
  if (!isFirebaseConfigured()) throw new Error("Firebase not configured");
  return firebaseFirestore();
};

export async function refreshAutoConnections(profileId: string, maxSpaces: number = 250): Promise<ProfileConnectionState> {
  const firestore = db();
  const repo = new FirestoreProfileRepository(firestore);
  const me = await repo.findById(profileId);
  if (!me) throw new Error("Profile not found");
  const campusId = me.getProps().campusId;

  // Fetch a bounded set of campus spaces and determine memberships
  const spacesSnap = await firestore
    .collection("spaces")
    .where("campusId", "==", campusId)
    .where("isActive", "==", true)
    .limit(maxSpaces)
    .get();

  const candidateCounts = new Map<string, number>();

  spacesSnap.docs.forEach((doc) => {
    const data = doc.data() as SpaceDoc;
    const roles = (data.memberRoles ?? {}) as Record<string, string>;
    if (Object.prototype.hasOwnProperty.call(roles, profileId)) {
      for (const memberId of Object.keys(roles)) {
        if (memberId === profileId) continue;
        candidateCounts.set(memberId, (candidateCounts.get(memberId) ?? 0) + 1);
      }
    }
  });

  // Resolve summaries and upsert connection docs
  const now = Timestamp.now();
  const accepted = [] as ReturnType<typeof profileConnectionSchema.parse>[];

  for (const [otherId, mutualSpaces] of candidateCounts.entries()) {
    const other = await repo.findById(otherId);
    if (!other) continue;
    const props = other.getProps();
    const summary = profileConnectionSummarySchema.parse({
      profileId: otherId,
      handle: props.handle?.value ?? props.email.value.split("@")[0] ?? otherId,
      displayName: `${props.personalInfo?.firstName ?? ""} ${props.personalInfo?.lastName ?? ""}`.trim() ||
        (props.handle?.value ?? otherId),
      avatarUrl: props.personalInfo?.photoUrl ?? undefined,
      userType: props.userType,
      campusId: props.campusId,
      mutualSpaces,
      mutualConnections: 0,
      lastActiveAt: null,
    });

    await firestore
      .collection("profiles").doc(profileId)
      .collection("connections").doc(otherId)
      .set({
        ...summary,
        connectedAt: now,
        tags: [],
        updatedAt: now,
      }, { merge: true });

    accepted.push(profileConnectionSchema.parse({ summary, connectedAt: new Date(), tags: [] }));
  }

  // Pending/suggestions unchanged here; rely on existing loaders
  const state: ProfileConnectionState = {
    accepted,
    pending: [],
    suggestions: [],
    lastSyncedAt: new Date(),
  };

  return state;
}

