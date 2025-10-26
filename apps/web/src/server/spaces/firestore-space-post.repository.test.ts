// Bounded Context Owner: Community Guild
import { vi } from "vitest";
import {
  type SpacePostAttachment,
  type SpacePostAudience,
  type SpacePostEngagementSummary,
  type SpacePostKind,
  type SpacePostModerationStatus,
  type SpacePostOrigin,
  type SpacePostToolContext
} from "@core";
import { runSpacePostRepositoryParityContract } from "@core/domain/spaces/testing/space-post.repository.contract";
import { FirestoreSpacePostRepository } from "./firestore-space-post.repository";

class QueryDocumentSnapshotStub {
  readonly id: string;
  private readonly payload: SpacePostFirestorePayload;

  constructor(id: string, payload: SpacePostFirestorePayload) {
    this.id = id;
    this.payload = payload;
  }

  data(): SpacePostFirestorePayload {
    return cloneFirestorePayload(this.payload);
  }
}

interface SpacePostFirestorePayload {
  readonly id: string;
  readonly spaceId: string;
  readonly authorId: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly reactions: number;
  readonly commentCount: number;
  readonly tags: readonly string[];
  readonly kind: SpacePostKind;
  readonly audience: SpacePostAudience;
  readonly origin: SpacePostOrigin;
  readonly shareToCampus: boolean;
  readonly qualityScore: number | null;
  readonly moderationStatus: SpacePostModerationStatus;
  readonly pinnedAt: Date | null;
  readonly pinExpiresAt: Date | null;
  readonly attachments: readonly {
    readonly type: SpacePostAttachment["type"];
    readonly url: string;
    readonly title?: string;
    readonly description?: string;
  }[];
  readonly toolContext: SpacePostToolContext | null;
  readonly engagementSummary: SpacePostEngagementSummary | null;
}

const cloneDate = (input: Date | null): Date | null => {
  if (!input) {
    return null;
  }
  return new Date(input.getTime());
};

const cloneFirestorePayload = (payload: SpacePostFirestorePayload): SpacePostFirestorePayload => ({
  ...payload,
  createdAt: cloneDate(payload.createdAt)!,
  updatedAt: cloneDate(payload.updatedAt)!,
  pinnedAt: cloneDate(payload.pinnedAt),
  pinExpiresAt: cloneDate(payload.pinExpiresAt),
  attachments: payload.attachments.map((attachment) => ({ ...attachment })),
  toolContext: payload.toolContext ? { ...payload.toolContext } : null,
  engagementSummary: payload.engagementSummary ? { ...payload.engagementSummary } : null
});

class PostsCollectionStub {
  private readonly spaceId: string;
  private readonly spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>;
  private sortField: keyof SpacePostFirestorePayload | null = null;
  private sortDirection: "asc" | "desc" = "asc";
  private limitCount: number | null = null;
  private readonly filters: Array<(payload: SpacePostFirestorePayload) => boolean> = [];

  constructor(
    spaceId: string,
    spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>
  ) {
    this.spaceId = spaceId;
    this.spacesStore = spacesStore;
  }

  private ensureSpaceStore(): Map<string, SpacePostFirestorePayload> {
    let store = this.spacesStore.get(this.spaceId);
    if (!store) {
      store = new Map();
      this.spacesStore.set(this.spaceId, store);
    }
    return store;
  }

  doc(postId: string) {
    return {
      set: async (payload: SpacePostFirestorePayload) => {
        this.ensureSpaceStore().set(postId, cloneFirestorePayload(payload));
      },
      get: async () => {
        const payload = this.ensureSpaceStore().get(postId);
        if (!payload) {
          return {
            id: postId,
            exists: false as const,
            data: () => undefined as unknown as SpacePostFirestorePayload
          };
        }
        const snapshot = new QueryDocumentSnapshotStub(postId, payload);
        return {
          id: postId,
          exists: true as const,
          data: () => snapshot.data()
        };
      }
    };
  }

  orderBy(field: keyof SpacePostFirestorePayload, direction: "asc" | "desc" = "asc") {
    this.sortField = field;
    this.sortDirection = direction;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  where(
    field: keyof SpacePostFirestorePayload,
    operator: FirebaseFirestore.WhereFilterOp,
    value: unknown
  ) {
    if (operator === "!=") {
      this.filters.push((payload) => {
        const candidate = payload[field];
        return candidate !== (value ?? null);
      });
    } else if (operator === "<=") {
      this.filters.push((payload) => {
        const candidate = payload[field];
        if (!(candidate instanceof Date) || !(value instanceof Date)) {
          return false;
        }
        return candidate.getTime() <= value.getTime();
      });
    } else if (operator === "==") {
      this.filters.push((payload) => payload[field] === value);
    } else {
      throw new Error(`Unsupported where operator '${operator}' in PostsCollectionStub`);
    }
    return this;
  }

  private applyFilters(payload: SpacePostFirestorePayload): boolean {
    for (const filter of this.filters) {
      if (!filter(payload)) {
        return false;
      }
    }
    return true;
  }

  async get() {
    const store = this.ensureSpaceStore();
    let entries = Array.from(store.entries()).map(([id, payload]) => ({
      id,
      payload: cloneFirestorePayload(payload)
    }));

    entries = entries.filter(({ payload }) => this.applyFilters(payload));

    if (this.sortField) {
      entries.sort((a, b) => {
        const field = this.sortField!;
        const aValue = a.payload[field];
        const bValue = b.payload[field];
        const asNumber =
          aValue instanceof Date ? aValue.getTime() : typeof aValue === "number" ? aValue : 0;
        const bsNumber =
          bValue instanceof Date ? bValue.getTime() : typeof bValue === "number" ? bValue : 0;
        if (asNumber === bsNumber) {
          return 0;
        }
        return this.sortDirection === "desc"
          ? bsNumber - asNumber
          : asNumber - bsNumber;
      });
    }

    if (typeof this.limitCount === "number") {
      entries = entries.slice(0, this.limitCount);
    }

    return {
      docs: entries.map(
        ({ id, payload }) => new QueryDocumentSnapshotStub(id, payload)
      )
    };
  }
}

class SpaceDocumentStub {
  private readonly spaceId: string;
  private readonly spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>;

  constructor(
    spaceId: string,
    spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>
  ) {
    this.spaceId = spaceId;
    this.spacesStore = spacesStore;
  }

  collection(name: string) {
    if (name !== "posts") {
      throw new Error(`Unsupported collection '${name}' in SpaceDocumentStub`);
    }
    return new PostsCollectionStub(this.spaceId, this.spacesStore);
  }
}

class SpacesCollectionStub {
  private readonly spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>;

  constructor(spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>) {
    this.spacesStore = spacesStore;
  }

  doc(spaceId: string) {
    return new SpaceDocumentStub(spaceId, this.spacesStore);
  }
}

class PostsCollectionGroupStub {
  private readonly spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>;
  private sortField: keyof SpacePostFirestorePayload | null = null;
  private sortDirection: "asc" | "desc" = "asc";
  private limitCount: number | null = null;
  private readonly filters: Array<(payload: SpacePostFirestorePayload) => boolean> = [];

  constructor(spacesStore: Map<string, Map<string, SpacePostFirestorePayload>>) {
    this.spacesStore = spacesStore;
  }

  orderBy(field: keyof SpacePostFirestorePayload, direction: "asc" | "desc" = "asc") {
    this.sortField = field;
    this.sortDirection = direction;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  where(
    field: keyof SpacePostFirestorePayload,
    operator: FirebaseFirestore.WhereFilterOp,
    value: unknown
  ) {
    if (operator === "!=") {
      this.filters.push((payload) => {
        const candidate = payload[field];
        return candidate !== (value ?? null);
      });
    } else if (operator === "<=") {
      this.filters.push((payload) => {
        const candidate = payload[field];
        if (!(candidate instanceof Date) || !(value instanceof Date)) {
          return false;
        }
        return candidate.getTime() <= value.getTime();
      });
    } else if (operator === "==") {
      this.filters.push((payload) => payload[field] === value);
    } else {
      throw new Error(`Unsupported where operator '${operator}' in PostsCollectionGroupStub`);
    }
    return this;
  }

  private applyFilters(payload: SpacePostFirestorePayload): boolean {
    for (const filter of this.filters) {
      if (!filter(payload)) {
        return false;
      }
    }
    return true;
  }

  async get() {
    let entries = Array.from(this.spacesStore.entries()).flatMap(([spaceId, store]) =>
      Array.from(store.entries()).map(([id, payload]) => ({
        id,
        payload: cloneFirestorePayload({ ...payload, spaceId })
      }))
    );

    entries = entries.filter(({ payload }) => this.applyFilters(payload));

    if (this.sortField) {
      entries.sort((a, b) => {
        const field = this.sortField!;
        const aValue = a.payload[field];
        const bValue = b.payload[field];
        const asNumber =
          aValue instanceof Date ? aValue.getTime() : typeof aValue === "number" ? aValue : 0;
        const bsNumber =
          bValue instanceof Date ? bValue.getTime() : typeof bValue === "number" ? bValue : 0;
        if (asNumber === bsNumber) {
          return 0;
        }
        return this.sortDirection === "desc" ? bsNumber - asNumber : asNumber - bsNumber;
      });
    }

    if (typeof this.limitCount === "number") {
      entries = entries.slice(0, this.limitCount);
    }

    return {
      docs: entries.map(({ id, payload }) => new QueryDocumentSnapshotStub(id, payload))
    };
  }
}

class FirestoreStub {
  private readonly spacesStore = new Map<string, Map<string, SpacePostFirestorePayload>>();

  collection(name: string) {
    if (name !== "spaces") {
      throw new Error(`Unsupported collection '${name}' in FirestoreStub`);
    }
    return new SpacesCollectionStub(this.spacesStore);
  }

  collectionGroup(_name: string) {
    if (_name !== "posts") {
      throw new Error(`Unsupported collectionGroup '${_name}' in FirestoreStub`);
    }
    return new PostsCollectionGroupStub(this.spacesStore);
  }

  reset() {
    this.spacesStore.clear();
  }
}

const firestoreStub = new FirestoreStub();

vi.mock("@hive/firebase", () => ({
  firebaseFirestore: () => firestoreStub
}));

runSpacePostRepositoryParityContract({
  subjectFactory: () => new FirestoreSpacePostRepository(),
  beforeEach: () => firestoreStub.reset(),
  scenarioName:
    "Scenario: UB Robotics leaders rely on Firestore post parity for safe campus operations"
});
