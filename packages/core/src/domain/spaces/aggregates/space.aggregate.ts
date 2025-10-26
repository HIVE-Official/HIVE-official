// Bounded Context Owner: Community Guild
import { err, ok, type Result } from "../../../shared/result";
import type { SpaceType, SpaceVisibility } from "../space.types";
import type { SpaceDomainEvent } from "../events/space.events";

export type SpaceMemberRole = "leader" | "admin" | "moderator" | "member";

export interface SpaceMember {
  readonly profileId: string;
  readonly role: SpaceMemberRole;
  readonly joinedAt: Date;
}

export type SpacePostingPolicy = "members" | "leaders_only";
export type SpaceJoinPolicy = "open" | "request" | "invite_only";

export interface SpaceSettings {
  readonly maxMembers?: number;
  readonly isInviteOnly: boolean;
  readonly postingPolicy: SpacePostingPolicy;
  readonly joinPolicy: SpaceJoinPolicy;
  readonly mediaApprovalPolicy?: "leaders_only" | "all" | "disabled";
}

export interface SpaceSnapshot {
  readonly id: string;
  readonly campusId: string;
  readonly name: string;
  readonly description: string;
  readonly type: SpaceType;
  readonly visibility: SpaceVisibility;
  readonly tags: readonly string[];
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly leaderId: string;
  readonly settings: SpaceSettings;
  readonly members: readonly SpaceMember[];
}

export interface SpaceCreationInput {
  readonly id: string;
  readonly campusId: string;
  readonly leaderId: string;
  readonly name: string;
  readonly description: string;
  readonly type: SpaceType;
  readonly visibility: SpaceVisibility;
  readonly tags?: readonly string[];
  readonly settings?: Partial<SpaceSettings>;
  readonly createdAt?: Date;
}

export class SpaceAggregate {
  private props: SpaceSnapshot;
  private readonly domainEvents: SpaceDomainEvent[] = [];

  private constructor(props: SpaceSnapshot) {
    this.props = {
      ...props,
      tags: [...props.tags],
      members: props.members.map((member) => ({ ...member }))
    };
  }

  static create(input: SpaceCreationInput): Result<SpaceAggregate> {
    if (!input.name.trim()) {
      return err("Space name is required");
    }

    const createdAt = input.createdAt ?? new Date();
    const settings: SpaceSettings = {
      maxMembers: input.settings?.maxMembers,
      isInviteOnly: input.settings?.isInviteOnly ?? false,
      postingPolicy: input.settings?.postingPolicy ?? "members",
      joinPolicy:
        (input.settings as Partial<SpaceSettings> | undefined)?.joinPolicy ??
        ((input.settings?.isInviteOnly ?? false) ? "invite_only" : "open"),
      mediaApprovalPolicy: (input.settings as Partial<SpaceSettings> | undefined)?.mediaApprovalPolicy ?? "leaders_only"
    };

    const leaderMember: SpaceMember = {
      profileId: input.leaderId,
      role: "leader",
      joinedAt: createdAt
    };

    const aggregate = new SpaceAggregate({
      id: input.id,
      campusId: input.campusId,
      leaderId: input.leaderId,
      name: input.name.trim(),
      description: input.description.trim(),
      type: input.type,
      visibility: input.visibility,
      tags: [...(input.tags ?? [])],
      isActive: true,
      createdAt,
      updatedAt: createdAt,
      settings,
      members: [leaderMember]
    });

    aggregate.domainEvents.push({
      type: "SpaceCreated",
      payload: {
        spaceId: aggregate.props.id,
        campusId: aggregate.props.campusId,
        leaderId: aggregate.props.leaderId
      }
    });

    return ok(aggregate);
  }

  static rehydrate(snapshot: SpaceSnapshot): SpaceAggregate {
    return new SpaceAggregate(snapshot);
  }

  toSnapshot(): SpaceSnapshot {
    return {
      ...this.props,
      tags: [...this.props.tags],
      members: this.props.members.map((member) => ({ ...member }))
    };
  }

  pullDomainEvents(): SpaceDomainEvent[] {
    return this.domainEvents.splice(0, this.domainEvents.length);
  }

  getId(): string {
    return this.props.id;
  }

  getCampusId(): string {
    return this.props.campusId;
  }

  getMemberCount(): number {
    return this.props.members.length;
  }

  hasMember(profileId: string): boolean {
    return this.props.members.some((member) => member.profileId === profileId);
  }

  getMemberRole(profileId: string): SpaceMemberRole | undefined {
    return this.props.members.find((member) => member.profileId === profileId)?.role;
  }

  addMember(
    profileId: string,
    input: { campusId: string; role?: SpaceMemberRole; joinedAt?: Date }
  ): Result<void> {
    if (input.campusId !== this.props.campusId) {
      return err("Campus mismatch prevents joining this space");
    }

    if (this.hasMember(profileId)) {
      return err("Member already joined this space");
    }

    const maxMembers = this.props.settings.maxMembers;
    if (typeof maxMembers === "number" && this.props.members.length >= maxMembers) {
      return err("Space membership is at maximum capacity");
    }

    const now = input.joinedAt ?? new Date();
    const role = input.role ?? "member";

    this.props = {
      ...this.props,
      members: [
        ...this.props.members,
        {
          profileId,
          role,
          joinedAt: now
        }
      ],
      updatedAt: now
    };

    this.domainEvents.push({
      type: "SpaceMemberJoined",
      payload: {
        spaceId: this.props.id,
        profileId,
        role
      }
    });

    return ok(undefined);
  }

  removeMember(profileId: string): Result<void> {
    if (!this.hasMember(profileId)) {
      return err("Member does not belong to this space");
    }

    const member = this.props.members.find((candidate) => candidate.profileId === profileId)!;
    if (member.role === "leader" && this.countLeaders() <= 1) {
      return err("Cannot remove the last leader from the space");
    }

    const now = new Date();

    this.props = {
      ...this.props,
      members: this.props.members.filter((candidate) => candidate.profileId !== profileId),
      updatedAt: now
    };

    this.domainEvents.push({
      type: "SpaceMemberRemoved",
      payload: {
        spaceId: this.props.id,
        profileId
      }
    });

    return ok(undefined);
  }

  updateMemberRole(profileId: string, role: SpaceMemberRole): Result<void> {
    if (!this.hasMember(profileId)) {
      return err("Member does not belong to this space");
    }

    const currentRole = this.getMemberRole(profileId)!;
    if (currentRole === role) {
      return ok(undefined);
    }

    if (currentRole === "leader" && this.countLeaders() <= 1 && role !== "leader") {
      return err("Cannot demote the last leader");
    }

    const updatedMembers = this.props.members.map((member) =>
      member.profileId === profileId ? { ...member, role } : member
    );

    this.props = {
      ...this.props,
      members: updatedMembers,
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "SpaceMemberRoleUpdated",
      payload: {
        spaceId: this.props.id,
        profileId,
        role
      }
    });

    return ok(undefined);
  }

  updateSettings(settings: Partial<SpaceSettings>): Result<void> {
    const desiredMax = settings.maxMembers ?? this.props.settings.maxMembers;
    if (typeof desiredMax === "number" && this.props.members.length > desiredMax) {
      return err("Cannot reduce capacity below current membership count");
    }

    this.props = {
      ...this.props,
      settings: {
        ...this.props.settings,
        ...settings,
        postingPolicy: settings.postingPolicy ?? this.props.settings.postingPolicy,
        joinPolicy: settings.joinPolicy ?? this.props.settings.joinPolicy,
        mediaApprovalPolicy: settings.mediaApprovalPolicy ?? this.props.settings.mediaApprovalPolicy
      },
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "SpaceSettingsUpdated",
      payload: {
        spaceId: this.props.id,
        maxMembers: this.props.settings.maxMembers,
        isInviteOnly: this.props.settings.isInviteOnly,
        postingPolicy: this.props.settings.postingPolicy
      }
    });

    return ok(undefined);
  }

  private countLeaders(): number {
    return this.props.members.filter((member) => member.role === "leader").length;
  }

  updateDetails(updates: { name?: string; description?: string; tags?: readonly string[] }): Result<void> {
    const name = updates.name?.trim();
    if (updates.name !== undefined && (!name || name.length === 0)) {
      return err("Space name cannot be empty");
    }

    const description = updates.description?.trim();
    if (updates.description !== undefined && (!description || description.length < 10)) {
      return err("Description must be at least 10 characters");
    }

    const tags = updates.tags ? updates.tags.map((tag) => tag.trim()).filter(Boolean) : undefined;

    this.props = {
      ...this.props,
      name: name ?? this.props.name,
      description: description ?? this.props.description,
      tags: tags ? [...tags] : this.props.tags,
      updatedAt: new Date()
    };

    this.domainEvents.push({
      type: "SpaceDetailsUpdated",
      payload: {
        spaceId: this.props.id,
        name,
        description,
        tags
      }
    });

    return ok(undefined);
  }
}
