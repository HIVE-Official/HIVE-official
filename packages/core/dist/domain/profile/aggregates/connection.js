"use strict";
/**
 * Connection Aggregate
 * Represents a connection between two profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.ConnectionSource = exports.ConnectionType = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const profile_id_value_1 = require("../value-objects/profile-id.value");
const connection_id_value_1 = require("../value-objects/connection-id.value");
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["FRIEND"] = "friend";
    ConnectionType["FOLLOWER"] = "follower";
    ConnectionType["FOLLOWING"] = "following";
    ConnectionType["BLOCKED"] = "blocked";
    ConnectionType["PENDING"] = "pending";
})(ConnectionType || (exports.ConnectionType = ConnectionType = {}));
var ConnectionSource;
(function (ConnectionSource) {
    ConnectionSource["SEARCH"] = "search";
    ConnectionSource["SUGGESTION"] = "suggestion";
    ConnectionSource["MUTUAL"] = "mutual";
    ConnectionSource["SPACE"] = "space";
    ConnectionSource["EVENT"] = "event";
    ConnectionSource["QR_CODE"] = "qr_code";
})(ConnectionSource || (exports.ConnectionSource = ConnectionSource = {}));
class Connection extends AggregateRoot_base_1.AggregateRoot {
    get connectionId() {
        return this.props.connectionId;
    }
    get profileId1() {
        return this.props.profileId1;
    }
    get profileId2() {
        return this.props.profileId2;
    }
    get type() {
        return this.props.type;
    }
    get source() {
        return this.props.source;
    }
    get isActive() {
        return this.props.isActive;
    }
    get isMutual() {
        return this.props.type === ConnectionType.FRIEND && this.props.acceptedBy !== undefined;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get acceptedAt() {
        return this.props.acceptedAt;
    }
    get rejectedAt() {
        return this.props.rejectedAt;
    }
    get blockedAt() {
        return this.props.blockedAt;
    }
    get metadata() {
        return this.props.metadata;
    }
    get mutualSpaces() {
        return this.props.mutualSpaces;
    }
    get interactionCount() {
        return this.props.interactionCount;
    }
    get status() {
        // Map the connection type to a status string that the repository expects
        switch (this.props.type) {
            case ConnectionType.FRIEND:
                if (this.props.acceptedBy)
                    return 'accepted';
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
    get requestedBy() {
        return this.props.requestedBy;
    }
    get acceptedBy() {
        return this.props.acceptedBy;
    }
    constructor(props, id) {
        super(props, id || `connection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        // Ensure profileId1 < profileId2 for consistent ordering
        const [orderedId1, orderedId2] = [props.profileId1.value, props.profileId2.value].sort();
        const profile1 = profile_id_value_1.ProfileId.create(orderedId1).getValue();
        const profile2 = profile_id_value_1.ProfileId.create(orderedId2).getValue();
        const connectionIdResult = connection_id_value_1.ConnectionId.createFromProfiles(profile1.value, profile2.value);
        if (connectionIdResult.isFailure) {
            return Result_1.Result.fail(connectionIdResult.error);
        }
        const connectionProps = {
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
        return Result_1.Result.ok(new Connection(connectionProps, id));
    }
    accept(acceptedBy) {
        if (this.props.type !== ConnectionType.PENDING) {
            return Result_1.Result.fail('Connection is not pending');
        }
        // Verify the accepter is the other party
        if (acceptedBy.value === this.props.requestedBy.value) {
            return Result_1.Result.fail('Cannot accept your own connection request');
        }
        if (acceptedBy.value !== this.props.profileId1.value &&
            acceptedBy.value !== this.props.profileId2.value) {
            return Result_1.Result.fail('Accepter is not part of this connection');
        }
        this.props.acceptedBy = acceptedBy;
        this.props.type = ConnectionType.FRIEND;
        this.props.acceptedAt = new Date();
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    reject() {
        if (this.props.type !== ConnectionType.PENDING) {
            return Result_1.Result.fail('Connection is not pending');
        }
        this.props.isActive = false;
        this.props.rejectedAt = new Date();
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    block(blockedBy) {
        // Verify the blocker is part of this connection
        if (blockedBy.value !== this.props.profileId1.value &&
            blockedBy.value !== this.props.profileId2.value) {
            return Result_1.Result.fail('Blocker is not part of this connection');
        }
        this.props.type = ConnectionType.BLOCKED;
        this.props.isActive = false;
        this.props.blockedAt = new Date();
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    unblock() {
        if (this.props.type !== ConnectionType.BLOCKED) {
            return Result_1.Result.fail('Connection is not blocked');
        }
        this.props.type = ConnectionType.PENDING;
        this.props.isActive = true;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    disconnect() {
        this.props.isActive = false;
        this.props.updatedAt = new Date();
    }
    addMutualSpace(spaceId) {
        if (!this.props.mutualSpaces.includes(spaceId)) {
            this.props.mutualSpaces.push(spaceId);
            this.props.updatedAt = new Date();
        }
    }
    removeMutualSpace(spaceId) {
        this.props.mutualSpaces = this.props.mutualSpaces.filter(id => id !== spaceId);
        this.props.updatedAt = new Date();
    }
    incrementInteraction() {
        this.props.interactionCount++;
        this.props.updatedAt = new Date();
    }
    getOtherProfileId(profileId) {
        if (profileId.value === this.props.profileId1.value) {
            return this.props.profileId2;
        }
        if (profileId.value === this.props.profileId2.value) {
            return this.props.profileId1;
        }
        return null;
    }
    involves(profileId) {
        return profileId.value === this.props.profileId1.value ||
            profileId.value === this.props.profileId2.value;
    }
    toData() {
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
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map