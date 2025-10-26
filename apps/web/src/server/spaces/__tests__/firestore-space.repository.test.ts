// Bounded Context Owner: Community Guild
import { describe, expect, it, beforeEach, vi } from "vitest";
import { SpaceAggregate } from "@core";

const setMock = vi.fn();
const docMock = vi.fn(() => ({
  set: setMock,
  collection: (...args: any[]) => (collectionMock as any)(...args)
}));
const collectionMock = vi.fn(() => ({ doc: docMock }));
const txnSetCalls: Array<{ data: any; options: any }> = [];

vi.mock("firebase-admin/app", () => {
  const initializeApp = vi.fn(() => ({}));
  return {
    initializeApp,
    getApps: () => [],
    cert: vi.fn(() => ({}))
  };
});

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: () => ({
    collection: (...args: any[]) => (collectionMock as any)(...args),
    runTransaction: async (fn: (tx: any) => Promise<void>) => {
      const tx = {
        async get() {
          return { docs: [], size: 0 };
        },
        set(_ref: any, data: any, options: any) {
          txnSetCalls.push({ data, options });
        },
        delete() {
          // no-op for this test
        }
      };
      await fn(tx);
    }
  })
}));

describe("FirestoreSpaceRepository", () => {
  beforeEach(() => {
    process.env.FIREBASE_PROJECT_ID = "test-project";
    process.env.FIREBASE_CLIENT_EMAIL = "svc@test-project";
    process.env.FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nFAKE\n-----END PRIVATE KEY-----";
    setMock.mockClear();
    docMock.mockClear();
    collectionMock.mockClear();
    txnSetCalls.length = 0;
  });

  it("persists memberRoles map and postingPolicy for rule enforcement", async () => {
    const creation = SpaceAggregate.create({
      id: "space-test",
      campusId: "ub-buffalo",
      leaderId: "profile-leader",
      name: "Test Space",
      description: "Coordinating makers after hours.",
      type: "student_organization",
      visibility: "campus",
      tags: ["makers"],
      settings: { postingPolicy: "leaders_only" }
    });

    if (!creation.ok) {
      throw new Error(creation.error);
    }

    const aggregate = creation.value;
    aggregate.pullDomainEvents();

    const addAdmin = aggregate.addMember("profile-admin", {
      campusId: "ub-buffalo",
      role: "admin"
    });
    if (!addAdmin.ok) {
      throw new Error(addAdmin.error);
    }

    const { FirestoreSpaceRepository } = await import("../firestore-space.repository");
    const repo = new FirestoreSpaceRepository();
    await repo.save(aggregate);

    expect(collectionMock).toHaveBeenCalledWith("spaces");
    expect(docMock).toHaveBeenCalledWith("space-test");
    // Transactional set should have been invoked once for the space document
    expect(txnSetCalls.length).toBeGreaterThanOrEqual(1);
    const spaceSet = txnSetCalls.find((c) => c.data && typeof c.data === "object" && "memberRoles" in c.data);
    expect(spaceSet).toBeDefined();
    const payload = spaceSet?.data;
    expect(payload).toMatchObject({
      memberRoles: {
        "profile-leader": "leader",
        "profile-admin": "admin"
      },
      settings: {
        postingPolicy: "leaders_only"
      }
    });
    const options = spaceSet?.options;
    expect(options).toEqual({ merge: true });
  });
});
