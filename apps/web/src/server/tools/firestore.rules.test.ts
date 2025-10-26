// Bounded Context Owner: HiveLab Guild
// Guards critical invariants for Tools rules.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

const PROJECT_ID = "hive-tools-rules";
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

describeRuleTests("Tools Firestore rules — basic posture", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: { host: emulatorHost, port: emulatorPort, rules: loadRules() },
      hub: { host: emulatorHost, port: emulatorPort + 1 }
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("allows UB user to read a public tool from same campus", async () => {
    await seedDoc("tools", "tool-1", {
      campusId: "ub-buffalo",
      createdBy: "profile-alex",
      visibility: "public",
      status: "published",
      permissions: { canEdit: ["profile-alex"], canFork: true, requiresApproval: false }
    });

    const ctx = authContext("profile-sam");
    const db = ctx.firestore();
    await assertSucceeds(db.collection("tools").doc("tool-1").get());
  });

  it("denies creating a tool when createdBy mismatches auth.uid", async () => {
    const ctx = authContext("profile-sam");
    const db = ctx.firestore();
    await assertFails(
      db.collection("tools").doc("bad-tool").set({
        campusId: "ub-buffalo",
        createdBy: "profile-other", // mismatch
        status: "draft",
        visibility: "private",
        permissions: { canEdit: ["profile-sam"] }
      })
    );
  });

  it("allows creating a private draft tool by the author with self-edit permission (no space)", async () => {
    const ctx = authContext("profile-sam");
    const db = ctx.firestore();
    await assertSucceeds(
      db.collection("tools").doc("draft-1").set({
        campusId: "ub-buffalo",
        createdBy: "profile-sam",
        status: "draft",
        visibility: "private",
        permissions: { canEdit: ["profile-sam"], canFork: true }
      })
    );
  });
});

