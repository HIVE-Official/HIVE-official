// @vitest-environment node
import { describe, expect, it, beforeEach } from "vitest";
import { runPinExpirySweep } from "./pin-expiry";

class FakeBatch {
  readonly operations: { readonly ref: FakeDocumentRef; readonly data: Record<string, unknown> }[] = [];

  update(ref: FakeDocumentRef, data: Record<string, unknown>) {
    this.operations.push({ ref, data });
  }

  async commit() {
    this.operations.forEach(({ ref, data }) => {
      ref.applyUpdate(data);
    });
  }
}

class FakeDocumentRef {
  constructor(public readonly path: string, private readonly state: Record<string, unknown>) {}

  applyUpdate(update: Record<string, unknown>) {
    Object.assign(this.state, update);
  }
}

class FakeDocumentSnapshot {
  constructor(public readonly ref: FakeDocumentRef) {}
}

class FakeFirestore {
  private readonly docs: FakeDocumentSnapshot[];
  readonly committedBatches: FakeBatch[] = [];

  constructor(documents: { readonly path: string; readonly state: Record<string, unknown> }[]) {
    this.docs = documents.map((doc) => new FakeDocumentSnapshot(new FakeDocumentRef(doc.path, doc.state)));
  }

  collectionGroup() {
    const query = {
      where: () => query,
      async get() {
        return {
          empty: query.docs.length === 0,
          docs: query.docs
        };
      },
      docs: this.docs
    };
    return query;
  }

  batch() {
    const batch = new FakeBatch();
    this.committedBatches.push(batch);
    return batch;
  }
}

describe("Pin expiry sweep", () => {
  let firestore: FakeFirestore;
  let documents: { readonly path: string; readonly state: Record<string, unknown> }[];

  beforeEach(() => {
    documents = [
      {
        path: "spaces/space-robotics/posts/post-1",
        state: { pinnedAt: new Date("2025-01-01T05:00:00Z"), pinExpiresAt: new Date("2025-01-02T05:00:00Z") }
      },
      {
        path: "spaces/space-art/posts/post-2",
        state: { pinnedAt: new Date("2025-01-01T08:00:00Z"), pinExpiresAt: new Date("2025-01-02T09:00:00Z") }
      }
    ];

    firestore = new FakeFirestore(documents);
  });

  it("unpins expired posts so UB students only see fresh pins", async () => {
    const now = new Date("2025-01-02T12:00:00Z");
    const metrics = await runPinExpirySweep(firestore as unknown as any, now);

    expect(metrics.expiredCount).toBe(2);
    expect(metrics.spacesTouched).toBe(2);
    expect(metrics.posts).toEqual([
      {
        spaceId: "space-robotics",
        postId: "post-1",
        expiredAt: now.toISOString()
      },
      {
        spaceId: "space-art",
        postId: "post-2",
        expiredAt: now.toISOString()
      }
    ]);

    expect(documents[0]?.state.pinnedAt).toBeNull();
    expect(documents[0]?.state.pinExpiresAt).toBeNull();
    expect(documents[1]?.state.pinnedAt).toBeNull();
    expect(documents[1]?.state.pinExpiresAt).toBeNull();
  });
});
