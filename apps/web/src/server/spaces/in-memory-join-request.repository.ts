// Bounded Context Owner: Community Guild
import type {
  SpaceJoinRequest,
  SpaceJoinRequestCreateInput,
  SpaceJoinRequestRepository,
  SpaceJoinRequestStatus
} from "@core";

export class InMemoryJoinRequestRepository implements SpaceJoinRequestRepository {
  private readonly store = new Map<string, SpaceJoinRequest[]>(); // key: spaceId

  async create(input: SpaceJoinRequestCreateInput): Promise<SpaceJoinRequest> {
    const request: SpaceJoinRequest = {
      id: input.id,
      spaceId: input.spaceId,
      profileId: input.profileId,
      requestedAt: input.requestedAt,
      status: "pending"
    };
    const list = this.store.get(input.spaceId) ?? [];
    this.store.set(input.spaceId, [request, ...list]);
    return request;
    }

  async listBySpace(spaceId: string, status?: SpaceJoinRequestStatus): Promise<readonly SpaceJoinRequest[]> {
    const list = this.store.get(spaceId) ?? [];
    if (!status) return [...list];
    return list.filter((r) => r.status === status);
  }

  async findById(spaceId: string, requestId: string): Promise<SpaceJoinRequest | null> {
    const list = this.store.get(spaceId) ?? [];
    return list.find((r) => r.id === requestId) ?? null;
  }

  async updateStatus(spaceId: string, requestId: string, update: { status: Exclude<SpaceJoinRequestStatus, "pending">; resolvedAt: Date; resolvedBy: string; reason?: string | null }): Promise<SpaceJoinRequest | null> {
    const list = this.store.get(spaceId) ?? [];
    const idx = list.findIndex((r) => r.id === requestId);
    if (idx === -1) return null;
    const current = list[idx]!;
    const next: SpaceJoinRequest = {
      ...current,
      status: update.status,
      resolvedAt: update.resolvedAt,
      resolvedBy: update.resolvedBy,
      reason: update.reason ?? null
    };
    const newList = [...list];
    newList[idx] = next;
    this.store.set(spaceId, newList);
    return next;
  }
}

