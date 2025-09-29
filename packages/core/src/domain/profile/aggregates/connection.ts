/**
 * Connection Aggregate
 * Represents a connection between two profiles
 */

import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../value-objects/profile-id.value';
import { ConnectionId } from '../value-objects/connection-id.value';

export enum ConnectionType {
  FRIEND = 'friend',
  FOLLOWER = 'follower',
  FOLLOWING = 'following',
  BLOCKED = 'blocked',
  PENDING = 'pending'
}

export enum ConnectionSource {
  SEARCH = 'search',
  SUGGESTION = 'suggestion',
  MUTUAL = 'mutual',
  SPACE = 'space',
  EVENT = 'event',
  QR_CODE = 'qr_code'
}

interface ConnectionProps {
  connectionId: ConnectionId;
  profileId1: ProfileId;
  profileId2: ProfileId;
  type: ConnectionType;
  source: ConnectionSource;
  requestedBy: ProfileId;
  acceptedBy?: ProfileId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  blockedAt?: Date;
  mutualSpaces: string[];
  interactionCount: number;
  metadata?: Record<string, any>;
}

export class Connection extends AggregateRoot<ConnectionProps> {
  get connectionId(): ConnectionId {
    return this.props.connectionId;
  }

  get profileId1(): ProfileId {
    return this.props.profileId1;
  }

  get profileId2(): ProfileId {
    return this.props.profileId2;
  }

  get type(): ConnectionType {
    return this.props.type;
  }

  get source(): ConnectionSource {
    return this.props.source;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isMutual(): boolean {
    return this.props.type === ConnectionType.FRIEND && this.props.acceptedBy !== undefined;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get acceptedAt(): Date | undefined {
    return this.props.acceptedAt;
  }

  get rejectedAt(): Date | undefined {
    return this.props.rejectedAt;
  }

  get blockedAt(): Date | undefined {
    return this.props.blockedAt;
  }

  get metadata(): Record<string, any> | undefined {
    return this.props.metadata;
  }

  get mutualSpaces(): string[] {
    return this.props.mutualSpaces;
  }

  get interactionCount(): number {
    return this.props.interactionCount;
  }

  get status(): string {
    // Map the connection type to a status string that the repository expects
    switch (this.props.type) {
      case ConnectionType.FRIEND:
        if (this.props.acceptedBy) return 'accepted';
        return 'pending';
      case ConnectionType.FOLLOWER:
        return 'following';
      case ConnectionType.FOLLOWING:
        return 'following';
      case ConnectionType.BLOCKED:
        return 'blocked';
      case ConnectionType.PENDING:
        return 'pending';
      default:
        return 'pending';
    }
  }

  get requestedBy(): ProfileId {
    return this.props.requestedBy;
  }

  get acceptedBy(): ProfileId | undefined {
    return this.props.acceptedBy;
  }

  private constructor(props: ConnectionProps, id?: string) {
    super(props, id || `connection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  public static create(
    props: {
      profileId1: ProfileId;
      profileId2: ProfileId;
      type?: ConnectionType;
      source?: ConnectionSource;
      requestedBy: ProfileId;
    },
    id?: string
  ): Result<Connection> {
    // Ensure profileId1 < profileId2 for consistent ordering
    const [orderedId1, orderedId2] = [props.profileId1.value, props.profileId2.value].sort();
    const profile1 = ProfileId.create(orderedId1).getValue();
    const profile2 = ProfileId.create(orderedId2).getValue();

    const connectionIdResult = ConnectionId.createFromProfiles(
      profile1.value,
      profile2.value
    );

    if (connectionIdResult.isFailure) {
      return Result.fail<Connection>(connectionIdResult.error!);
    }

    const connectionProps: ConnectionProps = {
      connectionId: connectionIdResult.getValue(),
      profileId1: profile1,
      profileId2: profile2,
      type: props.type || ConnectionType.PENDING,
      source: props.source || ConnectionSource.SEARCH,
      requestedBy: props.requestedBy,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      mutualSpaces: [],
      interactionCount: 0
    };

    return Result.ok<Connection>(new Connection(connectionProps, id));
  }

  public accept(acceptedBy: ProfileId): Result<void> {
    if (this.props.type !== ConnectionType.PENDING) {
      return Result.fail<void>('Connection is not pending');
    }

    // Verify the accepter is the other party
    if (acceptedBy.value === this.props.requestedBy.value) {
      return Result.fail<void>('Cannot accept your own connection request');
    }

    if (acceptedBy.value !== this.props.profileId1.value &&
        acceptedBy.value !== this.props.profileId2.value) {
      return Result.fail<void>('Accepter is not part of this connection');
    }

    this.props.acceptedBy = acceptedBy;
    this.props.type = ConnectionType.FRIEND;
    this.props.acceptedAt = new Date();
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public reject(): Result<void> {
    if (this.props.type !== ConnectionType.PENDING) {
      return Result.fail<void>('Connection is not pending');
    }

    this.props.isActive = false;
    this.props.rejectedAt = new Date();
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public block(blockedBy: ProfileId): Result<void> {
    // Verify the blocker is part of this connection
    if (blockedBy.value !== this.props.profileId1.value &&
        blockedBy.value !== this.props.profileId2.value) {
      return Result.fail<void>('Blocker is not part of this connection');
    }

    this.props.type = ConnectionType.BLOCKED;
    this.props.isActive = false;
    this.props.blockedAt = new Date();
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public unblock(): Result<void> {
    if (this.props.type !== ConnectionType.BLOCKED) {
      return Result.fail<void>('Connection is not blocked');
    }

    this.props.type = ConnectionType.PENDING;
    this.props.isActive = true;
    this.props.updatedAt = new Date();

    return Result.ok<void>();
  }

  public disconnect(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public addMutualSpace(spaceId: string): void {
    if (!this.props.mutualSpaces.includes(spaceId)) {
      this.props.mutualSpaces.push(spaceId);
      this.props.updatedAt = new Date();
    }
  }

  public removeMutualSpace(spaceId: string): void {
    this.props.mutualSpaces = this.props.mutualSpaces.filter(id => id !== spaceId);
    this.props.updatedAt = new Date();
  }

  public incrementInteraction(): void {
    this.props.interactionCount++;
    this.props.updatedAt = new Date();
  }

  public getOtherProfileId(profileId: ProfileId): ProfileId | null {
    if (profileId.value === this.props.profileId1.value) {
      return this.props.profileId2;
    }
    if (profileId.value === this.props.profileId2.value) {
      return this.props.profileId1;
    }
    return null;
  }

  public involves(profileId: ProfileId): boolean {
    return profileId.value === this.props.profileId1.value ||
           profileId.value === this.props.profileId2.value;
  }

  public toData(): any {
    return {
      id: this.id,
      connectionId: this.props.connectionId.value,
      profileId1: this.props.profileId1.value,
      profileId2: this.props.profileId2.value,
      type: this.props.type,
      source: this.props.source,
      requestedBy: this.props.requestedBy.value,
      acceptedBy: this.props.acceptedBy?.value,
      isActive: this.props.isActive,
      isMutual: this.isMutual,
      status: this.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      acceptedAt: this.props.acceptedAt,
      rejectedAt: this.props.rejectedAt,
      blockedAt: this.props.blockedAt,
      mutualSpaces: this.props.mutualSpaces,
      interactionCount: this.props.interactionCount,
      metadata: this.props.metadata
    };
  }
}