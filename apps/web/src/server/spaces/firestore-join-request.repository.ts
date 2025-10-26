// Bounded Context Owner: Community Guild
import type {
  SpaceJoinRequest,
  SpaceJoinRequestCreateInput,
  SpaceJoinRequestRepository,
  SpaceJoinRequestStatus
} from "@core";
import { firebaseFirestore } from "@hive/firebase";

const spaceDoc = (spaceId: string) => firebaseFirestore().collection("spaces").doc(spaceId);
const requestsCol = (spaceId: string) => spaceDoc(spaceId).collection("joinRequests");

const toDate = (v: unknown): Date => {
  if (!v) return new Date();
  if (v instanceof Date) return v;
  const ts = v as { toDate?: () => Date };
  if (typeof ts?.toDate === "function") return ts.toDate();
  const d = new Date(v as string);
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

const docToRequest = (spaceId: string, id: string, data: Record<string, unknown>): SpaceJoinRequest => ({
  id,
  spaceId,
  profileId: String((data as any).profileId ?? ""),
  requestedAt: toDate((data as any).requestedAt),
  status: ((data as any).status ?? "pending") as SpaceJoinRequestStatus,
  resolvedAt: (data as any).resolvedAt ? toDate((data as any).resolvedAt) : null,
  resolvedBy: typeof (data as any).resolvedBy === "string" ? (data as any).resolvedBy : null,
  reason: typeof (data as any).reason === "string" ? (data as any).reason : null
});

export class FirestoreJoinRequestRepository implements SpaceJoinRequestRepository {
  async create(input: SpaceJoinRequestCreateInput): Promise<SpaceJoinRequest> {
    await requestsCol(input.spaceId)
      .doc(input.id)
      .set({
        profileId: input.profileId,
        requestedAt: input.requestedAt,
        status: "pending"
      });
    const doc = await requestsCol(input.spaceId).doc(input.id).get();
    return docToRequest(input.spaceId, doc.id, (doc.data() as any) ?? {});
  }

  async listBySpace(spaceId: string, status?: SpaceJoinRequestStatus): Promise<readonly SpaceJoinRequest[]> {
    const base = requestsCol(spaceId);
    const query = status ? base.where("status", "==", status) : base;
    const snap = await query.orderBy("requestedAt", "desc").limit(50).get();
    return snap.docs.map((d) => docToRequest(spaceId, d.id, (d.data() as any) ?? {}));
  }

  async findById(spaceId: string, requestId: string): Promise<SpaceJoinRequest | null> {
    const doc = await requestsCol(spaceId).doc(requestId).get();
    if (!doc.exists) return null;
    return docToRequest(spaceId, doc.id, (doc.data() as any) ?? {});
  }

  async updateStatus(spaceId: string, requestId: string, update: { status: Exclude<SpaceJoinRequestStatus, "pending">; resolvedAt: Date; resolvedBy: string; reason?: string | null }): Promise<SpaceJoinRequest | null> {
    await requestsCol(spaceId)
      .doc(requestId)
      .set(
        {
          status: update.status,
          resolvedAt: update.resolvedAt,
          resolvedBy: update.resolvedBy,
          reason: update.reason ?? null
        },
        { merge: true }
      );
    const doc = await requestsCol(spaceId).doc(requestId).get();
    if (!doc.exists) return null;
    return docToRequest(spaceId, doc.id, (doc.data() as any) ?? {});
  }
}

