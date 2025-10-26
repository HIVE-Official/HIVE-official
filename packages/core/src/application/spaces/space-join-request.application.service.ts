// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../shared/result";
import type { SpaceRepository } from "../../domain/spaces/space.repository";
import type {
  SpaceJoinRequest,
  SpaceJoinRequestRepository,
  SpaceJoinRequestStatus
} from "../../domain/spaces/join-request.repository";

export interface SpaceJoinRequestApplicationServiceDependencies {
  readonly repository: SpaceJoinRequestRepository;
  readonly spaceRepository: SpaceRepository;
  readonly idGenerator?: () => string;
  readonly clock?: () => Date;
}

export class SpaceJoinRequestApplicationService {
  private readonly repository: SpaceJoinRequestRepository;
  private readonly spaceRepository: SpaceRepository;
  private readonly id: () => string;
  private readonly clock: () => Date;

  constructor(deps: SpaceJoinRequestApplicationServiceDependencies) {
    this.repository = deps.repository;
    this.spaceRepository = deps.spaceRepository;
    this.id = deps.idGenerator ?? (() => Math.random().toString(36).slice(2));
    this.clock = deps.clock ?? (() => new Date());
  }

  async request(input: { spaceId: string; profileId: string }): Promise<Result<SpaceJoinRequest>> {
    const space = await this.spaceRepository.findById(input.spaceId);
    if (!space) return err("Space not found");
    const snapshot = space.toSnapshot();
    if (space.hasMember(input.profileId)) return err("Already a member");
    const request = await this.repository.create({
      id: this.id(),
      spaceId: snapshot.id,
      profileId: input.profileId,
      requestedAt: this.clock()
    });
    return ok(request);
  }

  async list(spaceId: string, status: SpaceJoinRequestStatus = "pending"): Promise<readonly SpaceJoinRequest[]> {
    return this.repository.listBySpace(spaceId, status);
  }

  async approve(input: { spaceId: string; requestId: string; actorId: string; reason?: string | null }): Promise<Result<{ request: SpaceJoinRequest }>> {
    const space = await this.spaceRepository.findById(input.spaceId);
    if (!space) return err("Space not found");
    const request = await this.repository.findById(input.spaceId, input.requestId);
    if (!request) return err("Request not found");
    if (request.status !== "pending") return err("Request already resolved");

    const update = await this.repository.updateStatus(input.spaceId, input.requestId, {
      status: "approved",
      resolvedAt: this.clock(),
      resolvedBy: input.actorId,
      reason: input.reason ?? null
    });
    if (!update) return err("Failed to resolve request");

    // Add member on approve
    const added = space.addMember(request.profileId, { campusId: space.getCampusId(), joinedAt: this.clock() });
    if (!added.ok) return err(added.error);
    await this.spaceRepository.save(space);
    return ok({ request: update });
  }

  async reject(input: { spaceId: string; requestId: string; actorId: string; reason?: string | null }): Promise<Result<{ request: SpaceJoinRequest }>> {
    const space = await this.spaceRepository.findById(input.spaceId);
    if (!space) return err("Space not found");
    const request = await this.repository.findById(input.spaceId, input.requestId);
    if (!request) return err("Request not found");
    if (request.status !== "pending") return err("Request already resolved");
    const update = await this.repository.updateStatus(input.spaceId, input.requestId, {
      status: "rejected",
      resolvedAt: this.clock(),
      resolvedBy: input.actorId,
      reason: input.reason ?? null
    });
    if (!update) return err("Failed to resolve request");
    return ok({ request: update });
  }
}

