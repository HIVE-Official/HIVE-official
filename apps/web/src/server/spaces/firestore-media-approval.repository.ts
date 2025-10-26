// Bounded Context Owner: Community Guild
import {
  type SpaceMediaApprovalRepository,
  type SpaceMediaApproval,
  type SpaceMediaApprovalEnqueueInput,
  type SpaceMediaApprovalStatus,
  type SpaceMediaApprovalUpdate
} from "@core";
import { firebaseFirestore } from "@hive/firebase";

const mediaApprovalCollection = (spaceId: string) =>
  firebaseFirestore().collection("spaces").doc(spaceId).collection("mediaApprovals");

const toDate = (value: unknown): Date => {
  if (!value) {
    return new Date();
  }
  if (value instanceof Date) {
    return value;
  }
  const maybeTimestamp = value as { toDate?: () => Date };
  if (maybeTimestamp?.toDate) {
    return maybeTimestamp.toDate();
  }
  return new Date(value as string);
};

const ensureString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const toDomain = (
  id: string,
  data: Record<string, unknown>
): SpaceMediaApproval => ({
  id,
  spaceId: ensureString(data.spaceId),
  postId: ensureString(data.postId),
  attachment: (data.attachment as SpaceMediaApproval["attachment"]) ?? { type: "link", url: "" },
  status: ensureString(data.status, "pending") as SpaceMediaApproval["status"],
  requestedBy: ensureString(data.requestedBy),
  requestedAt: toDate(data.requestedAt),
  resolvedBy: (data.resolvedBy as string | undefined) ?? null,
  resolvedAt: data.resolvedAt ? toDate(data.resolvedAt) : null,
  resolutionReason: (data.resolutionReason as string | undefined) ?? null
});

export class FirestoreSpaceMediaApprovalRepository implements SpaceMediaApprovalRepository {
  async enqueue(inputs: readonly SpaceMediaApprovalEnqueueInput[]): Promise<void> {
    if (!inputs.length) {
      return;
    }

    const firestore = firebaseFirestore();
    const batch = firestore.batch();

    for (const entry of inputs) {
      const docRef = mediaApprovalCollection(entry.spaceId).doc(entry.id);
      batch.set(docRef, {
        spaceId: entry.spaceId,
        postId: entry.postId,
        attachment: entry.attachment,
        status: "pending",
        requestedBy: entry.requestedBy,
        requestedAt: entry.requestedAt,
        resolvedBy: null,
        resolvedAt: null,
        resolutionReason: null
      });
    }

    await batch.commit();
  }

  async listBySpace(spaceId: string, status: SpaceMediaApprovalStatus = "pending") {
    const query = await mediaApprovalCollection(spaceId)
      .where("status", "==", status)
      .orderBy("requestedAt", "asc")
      .get();

    return query.docs.map((doc) => toDomain(doc.id, doc.data() as Record<string, unknown>));
  }

  async findById(spaceId: string, approvalId: string) {
    const doc = await mediaApprovalCollection(spaceId).doc(approvalId).get();
    if (!doc.exists) {
      return null;
    }
    return toDomain(doc.id, doc.data() as Record<string, unknown>);
  }

  async updateStatus(spaceId: string, approvalId: string, update: SpaceMediaApprovalUpdate) {
    const firestore = firebaseFirestore();
    const docRef = mediaApprovalCollection(spaceId).doc(approvalId);

    return firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(docRef);
      if (!snapshot.exists) {
        return null;
      }

      const data = snapshot.data() as Record<string, unknown>;
      if (data.status !== "pending") {
        return toDomain(snapshot.id, data);
      }
      const next = {
        ...data,
        status: update.status,
        resolvedBy: update.resolvedBy,
        resolvedAt: update.resolvedAt,
        resolutionReason: update.resolutionReason ?? null
      };

      transaction.update(docRef, {
        status: update.status,
        resolvedBy: update.resolvedBy,
        resolvedAt: update.resolvedAt,
        resolutionReason: update.resolutionReason ?? null
      });

      return toDomain(snapshot.id, next);
    });
  }
}
