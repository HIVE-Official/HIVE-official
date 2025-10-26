// Bounded Context Owner: Identity & Access Management Guild
// Verifies Firestore security rules for Presence documents under Profiles.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
  type RulesTestContext
} from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

const PROJECT_ID = "hive-profile-presence-rules";
const RULES_PATH = resolve(process.cwd(), "firestore.rules");

let testEnv: RulesTestEnvironment;

const loadRules = () => readFileSync(RULES_PATH, "utf8");

const emulatorHostEnv = process.env.FIRESTORE_EMULATOR_HOST ?? "";
const [emulatorHost, emulatorPortStr] = emulatorHostEnv.split(":");
const emulatorPort = emulatorPortStr ? Number(emulatorPortStr) : Number.NaN;
const shouldRunRuleTests = Boolean(emulatorHost && !Number.isNaN(emulatorPort));
const describeRuleTests = shouldRunRuleTests ? describe : describe.skip;

const ubAuth = (uid: string): RulesTestContext =>
  testEnv.authenticatedContext(uid, {
    email: `${uid}@buffalo.edu`,
    campusId: "ub-buffalo"
  });

const otherCampusAuth = (uid: string): RulesTestContext =>
  testEnv.authenticatedContext(uid, {
    email: `${uid}@other.edu`,
    campusId: "other-campus"
  });

const seedPresence = async (
  profileId: string,
  data: Record<string, unknown>
) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await db.collection("presence").doc(profileId).set({
      campusId: "ub-buffalo",
      status: "online",
      lastSeen: new Date(),
      isGhostMode: false,
      updatedAt: new Date(),
      ...data
    });
  });
};

describeRuleTests("Profiles — Presence Firestore rules", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: emulatorHost,
        port: emulatorPort,
        rules: loadRules()
      }
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("allows owner to create/update their presence", async () => {
    const ownerDb = ubAuth("profile-alex").firestore();
    await assertSucceeds(
      ownerDb.collection("presence").doc("profile-alex").set({
        campusId: "ub-buffalo",
        status: "online",
        isGhostMode: false,
        updatedAt: new Date()
      })
    );
  });

  it("allows campus peers to read non-ghost presence; blocks other campuses", async () => {
    await seedPresence("profile-rory", { isGhostMode: false });

    const campusPeer = ubAuth("profile-jules").firestore();
    await assertSucceeds(campusPeer.collection("presence").doc("profile-rory").get());

    const otherPeer = otherCampusAuth("profile-avery").firestore();
    await assertFails(otherPeer.collection("presence").doc("profile-rory").get());
  });

  it("hides ghost-mode presence from peers but not owner", async () => {
    await seedPresence("profile-zoe", { isGhostMode: true });

    const campusPeer = ubAuth("profile-jordan").firestore();
    await assertFails(campusPeer.collection("presence").doc("profile-zoe").get());

    const ownerDb = ubAuth("profile-zoe").firestore();
    await assertSucceeds(ownerDb.collection("presence").doc("profile-zoe").get());
  });
});

