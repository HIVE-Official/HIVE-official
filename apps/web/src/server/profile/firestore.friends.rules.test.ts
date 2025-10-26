// Bounded Context Owner: Identity & Access Management Guild
// Verifies Firestore security rules for friends and friendRequests collections.
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

const PROJECT_ID = "hive-profile-friends-rules";
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

describeRuleTests("Profiles — Friends & Requests Firestore rules", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: { host: emulatorHost, port: emulatorPort, rules: loadRules() }
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("allows owner to write friends and friendRequests; blocks others", async () => {
    const ownerDb = ubAuth("profile-alex").firestore();
    await assertSucceeds(ownerDb.collection("profiles").doc("profile-alex").collection("friendRequests").doc("profile-zoe").set({ requestedAt: new Date(), direction: "outgoing" }));
    await assertSucceeds(ownerDb.collection("profiles").doc("profile-alex").collection("friends").doc("profile-zoe").set({ acceptedAt: new Date() }));

    const otherDb = ubAuth("profile-zoe").firestore();
    await assertFails(otherDb.collection("profiles").doc("profile-alex").collection("friendRequests").doc("profile-zoe").set({ requestedAt: new Date() }));
    await assertFails(otherDb.collection("profiles").doc("profile-alex").collection("friends").doc("profile-zoe").set({ acceptedAt: new Date() }));
  });

  it("restricts reads of friends and friendRequests to owner only", async () => {
    // Seed as owner
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.collection("profiles").doc("owner").collection("friends").doc("peer").set({ acceptedAt: new Date() });
      await db.collection("profiles").doc("owner").collection("friendRequests").doc("peer").set({ requestedAt: new Date(), direction: "incoming" });
    });

    const ownerDb = ubAuth("owner").firestore();
    await assertSucceeds(ownerDb.collection("profiles").doc("owner").collection("friends").get());
    await assertSucceeds(ownerDb.collection("profiles").doc("owner").collection("friendRequests").get());

    const otherDb = ubAuth("peer").firestore();
    await assertFails(otherDb.collection("profiles").doc("owner").collection("friends").get());
    await assertFails(otherDb.collection("profiles").doc("owner").collection("friendRequests").get());
  });
});

