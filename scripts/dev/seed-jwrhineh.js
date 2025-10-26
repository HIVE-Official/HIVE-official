// Persona: Design System Guild × IAM — seeds Jacob Rhinehart for local testing.
// Usage: NODE_OPTIONS= node scripts/dev/seed-jwrhineh.js
const { loadEnvConfig } = require("@next/env");
const admin = require("firebase-admin");

loadEnvConfig(process.cwd(), true);

const requiredEnv = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`[seed-jwrhineh] Missing Firebase admin credentials: ${missing.join(", ")}`);
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey
  })
});

const firestore = app.firestore();
const auth = app.auth();
const { Timestamp, FieldValue } = admin.firestore;

const PROFILE_ID = "profile-jwrhineh";
const EMAIL = "jwrhineh@buffalo.edu";
const HANDLE = "jacobrhinehart";

const profileDoc = firestore.collection("profiles").doc(PROFILE_ID);

async function ensureAuthUser() {
  try {
    const existing = await auth.getUserByEmail(EMAIL);
    await auth.updateUser(existing.uid, {
      displayName: "Jacob Rhinehart",
      emailVerified: true
    });
    return existing.uid;
  } catch (error) {
    if (error && error.code === "auth/user-not-found") {
      const created = await auth.createUser({
        email: EMAIL,
        displayName: "Jacob Rhinehart",
        emailVerified: true
      });
      return created.uid;
    }
    throw error;
  }
}

function toTimestamp(value) {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }
  return Timestamp.fromDate(new Date(value));
}

async function seedProfile() {
  const uid = await ensureAuthUser();
  const now = Timestamp.now();

  const onboardingCompletedAt = new Date("2024-09-04T18:15:00Z");
  const consentGrantedAt = new Date("2024-09-04T17:45:00Z");

  await profileDoc.set(
    {
      profileId: PROFILE_ID,
      firebaseUid: uid,
      email: EMAIL,
      emailLowercase: EMAIL.toLowerCase(),
      userType: "student",
      campusId: "ub-buffalo",
      handle: HANDLE,
      handleLowercase: HANDLE.toLowerCase(),
      personalInfo: {
        firstName: "Jacob",
        lastName: "Rhinehart",
        pronouns: "he/him",
        bio: "Business admin senior coordinating campus entrepreneurship pilots. Focused on tool adoption for off-campus students.",
        photoUrl: "https://static.hive.so/dev/jacob-rhinehart.jpg"
      },
      academicInfo: {
        majors: ["Business Administration"],
        minors: ["Entrepreneurship"],
        graduationYear: 2026,
        courses: ["MGO 403", "MGM 406", "MGB 301"]
      },
      socialInfo: {
        instagram: "@jacob.rhinehart",
        linkedin: "https://www.linkedin.com/in/jacob-rhinehart",
        website: "https://jacobrhinehart.com"
      },
      interests: [
        { id: "entrepreneurship", label: "Entrepreneurship", category: "Business" },
        { id: "student-experience", label: "Student Experience", category: "Community" },
        { id: "product-pilots", label: "Product Pilots", category: "Operations" }
      ],
      clubs: ["UB Entrepreneurs", "Off-Campus Council"],
      residentialSelection: {
        spaceId: "off-campus-students",
        name: "Off-Campus Students Network"
      },
      isOnboarded: true,
      onboardingCompletedAt: toTimestamp(onboardingCompletedAt) || FieldValue.serverTimestamp(),
      consentGrantedAt: toTimestamp(consentGrantedAt),
      isVerified: true,
      isActive: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  await profileDoc
    .collection("settings")
    .doc("privacy")
    .set(
      {
        visibility: "campus",
        showEmail: false,
        showAcademicInfo: true,
        showActivity: true,
        showSpaces: true,
        allowMessages: true,
        updatedAt: now
      },
      { merge: true }
    );

  await firestore.collection("presence").doc(PROFILE_ID).set(
    {
      status: "online",
      isGhostMode: false,
      lastSeen: now,
      updatedAt: now
    },
    { merge: true }
  );

  await firestore.collection("onboarding_progress").doc(PROFILE_ID).delete();

  console.log("[seed-jwrhineh] Seeded profile and verified onboarding for Jacob Rhinehart");
}

seedProfile()
  .catch((error) => {
    console.error("[seed-jwrhineh] Failed to seed profile", error);
    process.exit(1);
  })
  .finally(async () => {
    await app.delete();
  });
