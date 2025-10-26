// Bounded Context Owner: Community Guild
export type SpaceJoinRequestStatus = "pending" | "approved" | "rejected";

export interface SpaceJoinRequest {
  readonly id: string;
  readonly spaceId: string;
  readonly profileId: string;
  readonly requestedAt: Date;
  readonly status: SpaceJoinRequestStatus;
  readonly resolvedAt?: Date | null;
  readonly resolvedBy?: string | null;
  readonly reason?: string | null;
}

export interface SpaceJoinRequestCreateInput {
  readonly id: string;
  readonly spaceId: string;
  readonly profileId: string;
  readonly requestedAt: Date;
}

export interface SpaceJoinRequestRepository {
  create(_input: SpaceJoinRequestCreateInput): Promise<SpaceJoinRequest>;
  listBySpace(_spaceId: string, _status?: SpaceJoinRequestStatus): Promise<readonly SpaceJoinRequest[]>;
  findById(_spaceId: string, _requestId: string): Promise<SpaceJoinRequest | null>;
  updateStatus(
    _spaceId: string,
    _requestId: string,
    _update: { status: Exclude<SpaceJoinRequestStatus, "pending">; resolvedAt: Date; resolvedBy: string; reason?: string | null }
  ): Promise<SpaceJoinRequest | null>;
}

