// Bounded Context Owner: Identity & Access Management Guild
// Verifies Firestore rules for connections-related subcollections under profiles.
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

const PROJECT_ID = "hive-profile-connections-rules";
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

describeRuleTests("Profiles — Connections subcollections rules", () => {
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

  it("allows owner to read connections; blocks non-owner read and all client writes", async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.collection("profiles").doc("owner").collection("connections").doc("peer").set({ mutualSpaces: 2 });
    });

    const ownerDb = ubAuth("owner").firestore();
    await assertSucceeds(ownerDb.collection("profiles").doc("owner").collection("connections").get());
    await assertFails(ownerDb.collection("profiles").doc("owner").collection("connections").doc("peer").set({}));

    const peerDb = ubAuth("peer").firestore();
    await assertFails(peerDb.collection("profiles").doc("owner").collection("connections").get());
    await assertFails(peerDb.collection("profiles").doc("owner").collection("connections").doc("peer").set({}));
  });

  it("blocks client reads/writes on pending/suggested unless owner", async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.collection("profiles").doc("owner").collection("pendingConnections").doc("peer").set({ at: new Date() });
      await db.collection("profiles").doc("owner").collection("suggestedConnections").doc("peer").set({ reason: "mutual" });
    });

    const ownerDb = ubAuth("owner").firestore();
    await assertSucceeds(ownerDb.collection("profiles").doc("owner").collection("pendingConnections").get());
    await assertSucceeds(ownerDb.collection("profiles").doc("owner").collection("suggestedConnections").get());

    const peerDb = ubAuth("peer").firestore();
    await assertFails(peerDb.collection("profiles").doc("owner").collection("pendingConnections").get());
    await assertFails(peerDb.collection("profiles").doc("owner").collection("suggestedConnections").get());
  });
});

