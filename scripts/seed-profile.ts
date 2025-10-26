// Bounded Context Owner: Identity & Access Management Guild
import { loadEnvConfig } from "@next/env";
import admin from "firebase-admin";
import { defaultProfileBundle } from "../apps/web/src/profile/profile.sample";

loadEnvConfig(process.cwd(), true);

const requiredEnv = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"] as const;

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing Firebase admin credentials: ${missing.join(", ")}`);
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey
  })
});

const firestore = app.firestore();
const { Timestamp, FieldValue } = admin.firestore;

const args = process.argv.slice(2);
const profileArg = args.find((arg) => arg.startsWith("--profile="));
const profileIdOverride = profileArg ? profileArg.split("=", 2)[1] ?? "" : "";

const bundle = defaultProfileBundle;
const identity = bundle.profile.identity;
const profileId = profileIdOverride || identity.id;

const toTimestamp = (value: Date | string | null | undefined) => {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }
  return Timestamp.fromDate(new Date(value));
};

async function seedProfile() {
  const profileDoc = firestore.collection("profiles").doc(profileId);
  const now = Timestamp.now();

  await profileDoc.set(
    {
      profileId,
      email: identity.email,
      emailLowercase: identity.email.toLowerCase(),
      userType: identity.userType,
      campusId: identity.campusId,
      handle: identity.handle,
      handleLowercase: identity.handle.toLowerCase(),
      personalInfo: identity.personalInfo ?? {
        firstName: identity.email.split("@")[0] ?? "Student",
        lastName: "Student"
      },
      academicInfo: identity.academicInfo ?? null,
      socialInfo: identity.socialInfo ?? null,
      affiliation: identity.affiliation ?? null,
      interests: identity.interests ?? [],
      clubs: identity.clubs ?? [],
      residentialSelection: identity.residentialSelection ?? null,
      isOnboarded: identity.onboarding.isComplete,
      onboardingCompletedAt: toTimestamp(identity.onboarding.completedAt) ?? FieldValue.serverTimestamp(),
      consentGrantedAt: toTimestamp(identity.onboarding.consentGrantedAt),
      isVerified: identity.isVerified,
      isActive: identity.isActive,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  const privacy = bundle.profile.privacy;
  await profileDoc
    .collection("settings")
    .doc("privacy")
    .set(
      {
        ...privacy,
        updatedAt: now
      },
      { merge: true }
    );

  const presence = bundle.profile.presence;
  await firestore.collection("presence").doc(profileId).set(
    {
      status: presence.status,
      isGhostMode: presence.isGhostMode,
      lastSeen: presence.lastSeenAt ? Timestamp.fromDate(presence.lastSeenAt) : now,
      updatedAt: now
    },
    { merge: true }
  );

  const connectionsCollection = profileDoc.collection("connections");
  await Promise.all(
    bundle.connections.accepted.map((connection) =>
      connectionsCollection.doc(connection.summary.profileId).set(
        {
          ...connection.summary,
          connectedAt: Timestamp.fromDate(connection.connectedAt),
          lastActiveAt: connection.summary.lastActiveAt
            ? Timestamp.fromDate(connection.summary.lastActiveAt)
            : now,
          tags: connection.tags ?? [],
          updatedAt: now
        },
        { merge: true }
      )
    )
  );

  const pendingCollection = profileDoc.collection("pendingConnections");
  await Promise.all(
    bundle.connections.pending.map((pend) =>
      pendingCollection.doc(pend.profileId).set(
        {
          ...pend,
          lastActiveAt: pend.lastActiveAt ? Timestamp.fromDate(pend.lastActiveAt) : now,
          updatedAt: now
        },
        { merge: true }
      )
    )
  );

  const suggestionsCollection = profileDoc.collection("suggestedConnections");
  await Promise.all(
    bundle.connections.suggestions.map((suggestion) =>
      suggestionsCollection.doc(suggestion.profileId).set(
        {
          ...suggestion,
          lastActiveAt: suggestion.lastActiveAt ? Timestamp.fromDate(suggestion.lastActiveAt) : now,
          updatedAt: now
        },
        { merge: true }
      )
    )
  );

  const activityCollection = profileDoc.collection("activity");
  await Promise.all(
    bundle.activity.entries.map((entry) =>
      activityCollection.add({
        type: entry.type,
        description: entry.description,
        metadata: entry.metadata ?? {},
        occurredAt: Timestamp.fromDate(entry.occurredAt),
        recordedAt: now
      })
    )
  );

  console.log(`Seeded profile data for ${profileId}`);
  await app.delete();
}

seedProfile().catch((error) => {
  console.error("Failed to seed profile", error);
  process.exit(1);
});
