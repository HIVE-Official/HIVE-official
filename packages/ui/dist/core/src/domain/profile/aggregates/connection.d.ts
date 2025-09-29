/**
 * Connection Aggregate
 * Represents a connection between two profiles
 */
import { AggregateRoot } from '../../shared/base/AggregateRoot.base';
import { Result } from '../../shared/base/Result';
import { ProfileId } from '../value-objects/profile-id.value';
import { ConnectionId } from '../value-objects/connection-id.value';
export declare enum ConnectionType {
    FRIEND = "friend",
    FOLLOWER = "follower",
    FOLLOWING = "following",
    BLOCKED = "blocked",
    PENDING = "pending"
}
export declare enum ConnectionSource {
    SEARCH = "search",
    SUGGESTION = "suggestion",
    MUTUAL = "mutual",
    SPACE = "space",
    EVENT = "event",
    QR_CODE = "qr_code"
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
export declare class Connection extends AggregateRoot<ConnectionProps> {
    get connectionId(): ConnectionId;
    get profileId1(): ProfileId;
    get profileId2(): ProfileId;
    get type(): ConnectionType;
    get source(): ConnectionSource;
    get isActive(): boolean;
    get isMutual(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    get acceptedAt(): Date | undefined;
    get rejectedAt(): Date | undefined;
    get blockedAt(): Date | undefined;
    get metadata(): Record<string, any> | undefined;
    get mutualSpaces(): string[];
    get interactionCount(): number;
    get status(): string;
    get requestedBy(): ProfileId;
    get acceptedBy(): ProfileId | undefined;
    private constructor();
    static create(props: {
        profileId1: ProfileId;
        profileId2: ProfileId;
        type?: ConnectionType;
        source?: ConnectionSource;
        requestedBy: ProfileId;
    }, id?: string): Result<Connection>;
    accept(acceptedBy: ProfileId): Result<void>;
    reject(): Result<void>;
    block(blockedBy: ProfileId): Result<void>;
    unblock(): Result<void>;
    disconnect(): void;
    addMutualSpace(spaceId: string): void;
    removeMutualSpace(spaceId: string): void;
    incrementInteraction(): void;
    getOtherProfileId(profileId: ProfileId): ProfileId | null;
    involves(profileId: ProfileId): boolean;
    toData(): any;
}
export {};
//# sourceMappingURL=connection.d.ts.map