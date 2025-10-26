// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../shared/result";
import { SpaceAggregate, type SpaceSnapshot, type SpaceMemberRole } from "../../domain/spaces/aggregates/space.aggregate";
import type { SpaceRepository } from "../../domain/spaces/space.repository";
import type { SpaceType, SpaceVisibility } from "../../domain/spaces/space.types";
import type { SpaceDomainEventPublisherPort } from "./ports/space-domain-event-publisher.port";

export interface SpaceApplicationServiceDependencies {
  readonly repository: SpaceRepository;
  readonly clock?: () => Date;
  readonly events?: SpaceDomainEventPublisherPort;
}

export interface SpaceCatalog {
  readonly joined: readonly SpaceSnapshot[];
  readonly recommended: readonly SpaceSnapshot[];
  readonly all: readonly SpaceSnapshot[];
}

export class SpaceApplicationService {
  private readonly repository: SpaceRepository;
  private readonly clock: () => Date;
  private readonly eventPublisher?: SpaceDomainEventPublisherPort;

  constructor(dependencies: SpaceApplicationServiceDependencies) {
    this.repository = dependencies.repository;
    this.clock = dependencies.clock ?? (() => new Date());
    this.eventPublisher = dependencies.events;
  }

  async listByCampus(campusId: string): Promise<SpaceSnapshot[]> {
    const aggregates = await this.repository.listByCampus(campusId);
    return aggregates.map((space) => space.toSnapshot());
  }

  async searchSpacesByName(input: { campusId: string; query: string; limit?: number }): Promise<SpaceSnapshot[]> {
    const normalized = input.query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    const spaces = await this.listByCampus(input.campusId);
    const limit = typeof input.limit === "number" && input.limit > 0 ? input.limit : 6;

    const scored = spaces
      .map((space) => {
        const name = space.name.toLowerCase();
        const description = space.description?.toLowerCase() ?? "";
        const tags = (space.tags ?? []).map((tag) => tag.toLowerCase());

        let score = 0;
        if (name.includes(normalized)) {
          score += 3;
        }
        if (description.includes(normalized)) {
          score += 1;
        }
        if (tags.some((tag) => tag.includes(normalized))) {
          score += 2;
        }

        return { space, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.space.name.localeCompare(b.space.name));

    return scored.slice(0, limit).map(({ space }) => space);
  }

  async getSpaceById(spaceId: string): Promise<SpaceSnapshot | null> {
    const space = await this.repository.findById(spaceId);
    return space ? space.toSnapshot() : null;
  }

  async getCatalogForProfile(input: { campusId: string; profileId: string }): Promise<SpaceCatalog> {
    const spaces = await this.repository.listByCampus(input.campusId);
    const joined = spaces.filter((space) => space.hasMember(input.profileId)).map((space) => space.toSnapshot());

    const recommended = spaces
      .filter((space) => !space.hasMember(input.profileId))
      .map((space) => space.toSnapshot());

    return {
      joined,
      recommended,
      all: spaces.map((space) => space.toSnapshot())
    };
  }

  async joinSpace(input: { spaceId: string; profileId: string; campusId: string }): Promise<Result<SpaceSnapshot>> {
    const space = await this.repository.findById(input.spaceId);
    if (!space) {
      return err("Space not found");
    }

    // Enforce join policy before attempting to add member
    const snapshot = space.toSnapshot();
    const policy = snapshot.settings.joinPolicy ?? ((snapshot.settings.isInviteOnly ?? false) ? "invite_only" : "open");
    if (policy === "invite_only") {
      return err("Space is invite-only");
    }
    if (policy === "request") {
      return err("JOIN_REQUEST_REQUIRED");
    }

    const occurredAt = this.clock();
    const result = space.addMember(input.profileId, {
      campusId: input.campusId,
      // Join always defaults to member; role elevation uses dedicated path
      role: undefined,
      joinedAt: occurredAt
    });

    if (!result.ok) {
      return result;
    }

    await this.repository.save(space);
    await this.dispatchDomainEvents(space, occurredAt);
    return ok(space.toSnapshot());
  }

  async createSpace(input: {
    spaceId: string;
    campusId: string;
    leaderId: string;
    name: string;
    description: string;
    type: SpaceType;
    visibility: SpaceVisibility;
    tags?: readonly string[];
    settings?: {
      maxMembers?: number;
      isInviteOnly?: boolean;
    };
  }): Promise<Result<SpaceSnapshot>> {
    const existing = await this.repository.findById(input.spaceId);
    if (existing) {
      return err("Space identifier already exists");
    }

    const creation = SpaceAggregate.create({
      id: input.spaceId,
      campusId: input.campusId,
      leaderId: input.leaderId,
      name: input.name,
      description: input.description,
      type: input.type,
      visibility: input.visibility,
      tags: input.tags,
      settings: input.settings,
      createdAt: this.clock()
    });

    if (!creation.ok) {
      return creation;
    }

    const aggregate = creation.value;
    await this.repository.save(aggregate);
    await this.dispatchDomainEvents(aggregate, this.clock());
    return ok(aggregate.toSnapshot());
  }

  async leaveSpace(input: { spaceId: string; profileId: string }): Promise<Result<SpaceSnapshot>> {
    const space = await this.repository.findById(input.spaceId);
    if (!space) {
      return err("Space not found");
    }

    const result = space.removeMember(input.profileId);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(space);
    await this.dispatchDomainEvents(space, this.clock());
    return ok(space.toSnapshot());
  }

  async updateSettings(spaceId: string, settings: Parameters<SpaceAggregate["updateSettings"]>[0]): Promise<Result<SpaceSnapshot>> {
    const space = await this.repository.findById(spaceId);
    if (!space) {
      return err("Space not found");
    }

    const result = space.updateSettings(settings);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(space);
    await this.dispatchDomainEvents(space, this.clock());
    return ok(space.toSnapshot());
  }

  async updateDetails(spaceId: string, updates: { name?: string; description?: string; tags?: readonly string[] }): Promise<Result<SpaceSnapshot>> {
    const space = await this.repository.findById(spaceId);
    if (!space) {
      return err("Space not found");
    }

    const result = space.updateDetails(updates);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(space);
    await this.dispatchDomainEvents(space, this.clock());
    return ok(space.toSnapshot());
  }

  async updateMemberRole(spaceId: string, profileId: string, role: SpaceMemberRole): Promise<Result<SpaceSnapshot>> {
    const space = await this.repository.findById(spaceId);
    if (!space) {
      return err("Space not found");
    }

    const result = space.updateMemberRole(profileId, role);
    if (!result.ok) {
      return result;
    }

    await this.repository.save(space);
    await this.dispatchDomainEvents(space, this.clock());
    return ok(space.toSnapshot());
  }

  private async dispatchDomainEvents(space: SpaceAggregate, occurredAt: Date): Promise<void> {
    const events = space.pullDomainEvents();
    if (!events.length || !this.eventPublisher) {
      return;
    }
    await this.eventPublisher.publish(events, occurredAt);
  }
}
