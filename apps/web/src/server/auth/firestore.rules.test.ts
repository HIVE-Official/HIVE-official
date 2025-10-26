// Bounded Context Owner: Identity & Access Management Guild
// Ensures identity-related Firestore collections remain server-only.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  initializeTestEnvironment,
  assertFails,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

const PROJECT_ID = "hive-auth-rules";
const RULES_PATH = resolve(process.cwd(), "firestore.rules");

let testEnv: RulesTestEnvironment;

const loadRules = () => readFileSync(RULES_PATH, "utf8");

const emulatorHostEnv = process.env.FIRESTORE_EMULATOR_HOST ?? "";
const [emulatorHost, emulatorPortStr] = emulatorHostEnv.split(":");
const emulatorPort = emulatorPortStr ? Number(emulatorPortStr) : Number.NaN;
const shouldRunRuleTests = Boolean(emulatorHost && !Number.isNaN(emulatorPort));
const describeRuleTests = shouldRunRuleTests ? describe : describe.skip;

const authContext = (uid: string) =>
  testEnv.authenticatedContext(uid, {
    email: `${uid}@buffalo.edu`,
    campusId: "ub-buffalo"
  });

const seedDoc = async (collection: string, docId: string, data: Record<string, unknown>) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await db.collection(collection).doc(docId).set(data);
  });
};

describeRuleTests("Identity & Onboarding Firestore rules", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: emulatorHost,
        port: emulatorPort,
        rules: loadRules()
      },
      hub: { host: emulatorHost, port: emulatorPort + 1 }
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("blocks direct profile reads/writes from authenticated users", async () => {
    await seedDoc("profiles", "profile-123", {
      profileId: "profile-123",
      email: "student@buffalo.edu",
      campusId: "ub-buffalo"
    });

    const user = authContext("profile-123");
    const db = user.firestore();
    await assertFails(db.collection("profiles").doc("profile-123").get());
    await assertFails(
      db.collection("profiles").doc("profile-123").set({ bio: "Trying to overwrite" })
    );
  });

  it("blocks onboarding progress read/write attempts from clients", async () => {
    await seedDoc("onboarding_progress", "profile-123", {
      profileId: "profile-123",
      stepsCompleted: ["personal-info"],
      partialSubmission: {},
      lastUpdated: new Date()
    });

    const user = authContext("profile-123");
    const db = user.firestore();
    await assertFails(db.collection("onboarding_progress").doc("profile-123").get());
    await assertFails(
      db.collection("onboarding_progress").doc("profile-123").set({ stepsCompleted: [] })
    );
  });

  it("blocks session document access from clients", async () => {
    await seedDoc("sessions", "session-abc", {
      profileId: "profile-123",
      issuedAt: new Date(),
      expiresAt: new Date()
    });

    const user = authContext("profile-123");
    const db = user.firestore();
    await assertFails(db.collection("sessions").doc("session-abc").get());
    await assertFails(db.collection("sessions").doc("session-abc").delete());
  });

  it("blocks throttle + telemetry collections from clients", async () => {
    await seedDoc("auth_throttle", "signup:email:hash", { count: 1, expiresAt: new Date() });
    await seedDoc("auth_throttle_events", "event-1", { bucket: "signup", occurredAt: new Date() });
    await seedDoc("auth_events", "event-2", { type: "signup_submitted", occurredAt: new Date() });

    const user = authContext("profile-123");
    const db = user.firestore();
    await assertFails(db.collection("auth_throttle").get());
    await assertFails(db.collection("auth_throttle_events").get());
    await assertFails(db.collection("auth_events").get());
  });
});
