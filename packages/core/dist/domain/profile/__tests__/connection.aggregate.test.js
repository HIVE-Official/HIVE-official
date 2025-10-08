"use strict";
/**
 * Connection Aggregate Tests
 * Comprehensive test suite for Connection domain logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const connection_1 = require("../aggregates/connection");
const profile_id_value_1 = require("../value-objects/profile-id.value");
(0, vitest_1.describe)('Connection Aggregate', () => {
    // Test data factories
    const createValidProfileIds = () => {
        const profileId1Result = profile_id_value_1.ProfileId.create('profile_alice_123');
        const profileId2Result = profile_id_value_1.ProfileId.create('profile_bob_456');
        if (profileId1Result.isFailure)
            throw new Error(`ProfileId1 failed: ${profileId1Result.error}`);
        if (profileId2Result.isFailure)
            throw new Error(`ProfileId2 failed: ${profileId2Result.error}`);
        return {
            profileId1: profileId1Result.getValue(),
            profileId2: profileId2Result.getValue()
        };
    };
    (0, vitest_1.describe)('Connection Creation', () => {
        (0, vitest_1.it)('should create a connection with valid data', () => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            (0, vitest_1.expect)(connectionResult.isSuccess).toBe(true);
            const connection = connectionResult.getValue();
            (0, vitest_1.expect)(connection.profileId1.value).toBe('profile_alice_123');
            (0, vitest_1.expect)(connection.profileId2.value).toBe('profile_bob_456');
            (0, vitest_1.expect)(connection.type).toBe(connection_1.ConnectionType.PENDING);
            (0, vitest_1.expect)(connection.source).toBe(connection_1.ConnectionSource.SEARCH);
            (0, vitest_1.expect)(connection.isActive).toBe(true);
            (0, vitest_1.expect)(connection.requestedBy.value).toBe('profile_alice_123');
            (0, vitest_1.expect)(connection.mutualSpaces).toEqual([]);
            (0, vitest_1.expect)(connection.interactionCount).toBe(0);
        });
        (0, vitest_1.it)('should create connection with specified type and source', () => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                type: connection_1.ConnectionType.FOLLOWER,
                source: connection_1.ConnectionSource.SPACE,
                requestedBy: profileId1
            });
            (0, vitest_1.expect)(connectionResult.isSuccess).toBe(true);
            const connection = connectionResult.getValue();
            (0, vitest_1.expect)(connection.type).toBe(connection_1.ConnectionType.FOLLOWER);
            (0, vitest_1.expect)(connection.source).toBe(connection_1.ConnectionSource.SPACE);
        });
        (0, vitest_1.it)('should order profile IDs consistently', () => {
            // Test that profileId1 < profileId2 always (sorted alphabetically)
            const profileIdAResult = profile_id_value_1.ProfileId.create('profile_zebra_999');
            const profileIdBResult = profile_id_value_1.ProfileId.create('profile_alpha_111');
            if (profileIdAResult.isFailure || profileIdBResult.isFailure) {
                throw new Error('Failed to create ProfileIds');
            }
            const connectionResult = connection_1.Connection.create({
                profileId1: profileIdAResult.getValue(), // zebra (should become profileId2)
                profileId2: profileIdBResult.getValue(), // alpha (should become profileId1)
                requestedBy: profileIdAResult.getValue()
            });
            (0, vitest_1.expect)(connectionResult.isSuccess).toBe(true);
            const connection = connectionResult.getValue();
            // Should be ordered: alpha < zebra
            (0, vitest_1.expect)(connection.profileId1.value).toBe('profile_alpha_111');
            (0, vitest_1.expect)(connection.profileId2.value).toBe('profile_zebra_999');
        });
        (0, vitest_1.it)('should generate consistent connection IDs', () => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connection1Result = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            const connection2Result = connection_1.Connection.create({
                profileId1: profileId2, // Swapped order
                profileId2: profileId1,
                requestedBy: profileId2
            });
            (0, vitest_1.expect)(connection1Result.isSuccess).toBe(true);
            (0, vitest_1.expect)(connection2Result.isSuccess).toBe(true);
            const connection1 = connection1Result.getValue();
            const connection2 = connection2Result.getValue();
            // Should have same connection ID regardless of input order
            (0, vitest_1.expect)(connection1.connectionId.value).toBe(connection2.connectionId.value);
        });
    });
    (0, vitest_1.describe)('Connection Acceptance', () => {
        let connection;
        let profileId1;
        let profileId2;
        (0, vitest_1.beforeEach)(() => {
            const profileIds = createValidProfileIds();
            profileId1 = profileIds.profileId1;
            profileId2 = profileIds.profileId2;
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should accept a pending connection', () => {
            const result = connection.accept(profileId2);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(connection.type).toBe(connection_1.ConnectionType.FRIEND);
            (0, vitest_1.expect)(connection.acceptedBy?.value).toBe(profileId2.value);
            (0, vitest_1.expect)(connection.acceptedAt).toBeInstanceOf(Date);
            (0, vitest_1.expect)(connection.isMutual).toBe(true);
            (0, vitest_1.expect)(connection.status).toBe('accepted');
        });
        (0, vitest_1.it)('should not accept non-pending connection', () => {
            // First accept the connection
            connection.accept(profileId2);
            // Try to accept again
            const result = connection.accept(profileId2);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Connection is not pending');
        });
        (0, vitest_1.it)('should not allow self-acceptance', () => {
            const result = connection.accept(profileId1); // requester trying to accept own request
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Cannot accept your own connection request');
        });
        (0, vitest_1.it)('should not allow acceptance by third party', () => {
            const thirdPartyResult = profile_id_value_1.ProfileId.create('profile_charlie_789');
            if (thirdPartyResult.isFailure)
                throw new Error('Failed to create third party ID');
            const thirdParty = thirdPartyResult.getValue();
            const result = connection.accept(thirdParty);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Accepter is not part of this connection');
        });
    });
    (0, vitest_1.describe)('Connection Rejection', () => {
        let connection;
        let profileId1;
        let profileId2;
        (0, vitest_1.beforeEach)(() => {
            const profileIds = createValidProfileIds();
            profileId1 = profileIds.profileId1;
            profileId2 = profileIds.profileId2;
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should reject a pending connection', () => {
            const result = connection.reject();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(connection.isActive).toBe(false);
            (0, vitest_1.expect)(connection.rejectedAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should not reject non-pending connection', () => {
            // First accept the connection
            connection.accept(profileId2);
            // Try to reject
            const result = connection.reject();
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Connection is not pending');
        });
    });
    (0, vitest_1.describe)('Connection Blocking', () => {
        let connection;
        let profileId1;
        let profileId2;
        (0, vitest_1.beforeEach)(() => {
            const profileIds = createValidProfileIds();
            profileId1 = profileIds.profileId1;
            profileId2 = profileIds.profileId2;
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should block a connection', () => {
            const result = connection.block(profileId1);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(connection.type).toBe(connection_1.ConnectionType.BLOCKED);
            (0, vitest_1.expect)(connection.isActive).toBe(false);
            (0, vitest_1.expect)(connection.blockedAt).toBeInstanceOf(Date);
            (0, vitest_1.expect)(connection.status).toBe('blocked');
        });
        (0, vitest_1.it)('should not allow blocking by third party', () => {
            const thirdPartyResult = profile_id_value_1.ProfileId.create('profile_charlie_789');
            if (thirdPartyResult.isFailure)
                throw new Error('Failed to create third party ID');
            const thirdParty = thirdPartyResult.getValue();
            const result = connection.block(thirdParty);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Blocker is not part of this connection');
        });
        (0, vitest_1.it)('should unblock a blocked connection', () => {
            // First block
            connection.block(profileId1);
            // Then unblock
            const result = connection.unblock();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(connection.type).toBe(connection_1.ConnectionType.PENDING);
            (0, vitest_1.expect)(connection.isActive).toBe(true);
        });
        (0, vitest_1.it)('should not unblock non-blocked connection', () => {
            const result = connection.unblock();
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toBe('Connection is not blocked');
        });
    });
    (0, vitest_1.describe)('Connection Utility Methods', () => {
        let connection;
        let profileId1;
        let profileId2;
        (0, vitest_1.beforeEach)(() => {
            const profileIds = createValidProfileIds();
            profileId1 = profileIds.profileId1;
            profileId2 = profileIds.profileId2;
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should disconnect a connection', () => {
            connection.disconnect();
            (0, vitest_1.expect)(connection.isActive).toBe(false);
        });
        (0, vitest_1.it)('should get other profile ID', () => {
            const otherProfile = connection.getOtherProfileId(profileId1);
            (0, vitest_1.expect)(otherProfile?.value).toBe(profileId2.value);
            const otherProfile2 = connection.getOtherProfileId(profileId2);
            (0, vitest_1.expect)(otherProfile2?.value).toBe(profileId1.value);
        });
        (0, vitest_1.it)('should return null for non-involved profile', () => {
            const thirdPartyResult = profile_id_value_1.ProfileId.create('profile_charlie_789');
            if (thirdPartyResult.isFailure)
                throw new Error('Failed to create third party ID');
            const thirdParty = thirdPartyResult.getValue();
            const otherProfile = connection.getOtherProfileId(thirdParty);
            (0, vitest_1.expect)(otherProfile).toBeNull();
        });
        (0, vitest_1.it)('should check if profile is involved', () => {
            (0, vitest_1.expect)(connection.involves(profileId1)).toBe(true);
            (0, vitest_1.expect)(connection.involves(profileId2)).toBe(true);
            const thirdPartyResult = profile_id_value_1.ProfileId.create('profile_charlie_789');
            if (thirdPartyResult.isFailure)
                throw new Error('Failed to create third party ID');
            const thirdParty = thirdPartyResult.getValue();
            (0, vitest_1.expect)(connection.involves(thirdParty)).toBe(false);
        });
    });
    (0, vitest_1.describe)('Mutual Spaces Management', () => {
        let connection;
        (0, vitest_1.beforeEach)(() => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should add mutual space', () => {
            connection.addMutualSpace('space_123');
            (0, vitest_1.expect)(connection.mutualSpaces).toContain('space_123');
            (0, vitest_1.expect)(connection.mutualSpaces.length).toBe(1);
        });
        (0, vitest_1.it)('should not add duplicate mutual space', () => {
            connection.addMutualSpace('space_123');
            connection.addMutualSpace('space_123'); // Duplicate
            (0, vitest_1.expect)(connection.mutualSpaces).toEqual(['space_123']);
            (0, vitest_1.expect)(connection.mutualSpaces.length).toBe(1);
        });
        (0, vitest_1.it)('should remove mutual space', () => {
            connection.addMutualSpace('space_123');
            connection.addMutualSpace('space_456');
            connection.removeMutualSpace('space_123');
            (0, vitest_1.expect)(connection.mutualSpaces).not.toContain('space_123');
            (0, vitest_1.expect)(connection.mutualSpaces).toContain('space_456');
            (0, vitest_1.expect)(connection.mutualSpaces.length).toBe(1);
        });
    });
    (0, vitest_1.describe)('Interaction Tracking', () => {
        let connection;
        (0, vitest_1.beforeEach)(() => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            if (connectionResult.isFailure) {
                throw new Error('Failed to create connection for test');
            }
            connection = connectionResult.getValue();
        });
        (0, vitest_1.it)('should increment interaction count', () => {
            (0, vitest_1.expect)(connection.interactionCount).toBe(0);
            connection.incrementInteraction();
            (0, vitest_1.expect)(connection.interactionCount).toBe(1);
            connection.incrementInteraction();
            (0, vitest_1.expect)(connection.interactionCount).toBe(2);
        });
    });
    (0, vitest_1.describe)('Status Mapping', () => {
        let profileId1;
        let profileId2;
        (0, vitest_1.beforeEach)(() => {
            const profileIds = createValidProfileIds();
            profileId1 = profileIds.profileId1;
            profileId2 = profileIds.profileId2;
        });
        (0, vitest_1.it)('should map PENDING type to pending status', () => {
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                type: connection_1.ConnectionType.PENDING,
                requestedBy: profileId1
            });
            const connection = connectionResult.getValue();
            (0, vitest_1.expect)(connection.status).toBe('pending');
        });
        (0, vitest_1.it)('should map FRIEND type to accepted status when accepted', () => {
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            const connection = connectionResult.getValue();
            connection.accept(profileId2);
            (0, vitest_1.expect)(connection.status).toBe('accepted');
        });
        (0, vitest_1.it)('should map FOLLOWER type to following status', () => {
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                type: connection_1.ConnectionType.FOLLOWER,
                requestedBy: profileId1
            });
            const connection = connectionResult.getValue();
            (0, vitest_1.expect)(connection.status).toBe('following');
        });
        (0, vitest_1.it)('should map BLOCKED type to blocked status', () => {
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                requestedBy: profileId1
            });
            const connection = connectionResult.getValue();
            connection.block(profileId1);
            (0, vitest_1.expect)(connection.status).toBe('blocked');
        });
    });
    (0, vitest_1.describe)('Data Serialization', () => {
        (0, vitest_1.it)('should serialize to data object', () => {
            const { profileId1, profileId2 } = createValidProfileIds();
            const connectionResult = connection_1.Connection.create({
                profileId1,
                profileId2,
                type: connection_1.ConnectionType.PENDING,
                source: connection_1.ConnectionSource.SPACE,
                requestedBy: profileId1
            });
            const connection = connectionResult.getValue();
            connection.addMutualSpace('space_123');
            connection.incrementInteraction();
            const data = connection.toData();
            (0, vitest_1.expect)(data).toEqual({
                id: connection.id,
                connectionId: connection.connectionId.value,
                profileId1: 'profile_alice_123',
                profileId2: 'profile_bob_456',
                type: connection_1.ConnectionType.PENDING,
                source: connection_1.ConnectionSource.SPACE,
                requestedBy: 'profile_alice_123',
                acceptedBy: undefined,
                isActive: true,
                isMutual: false,
                status: 'pending',
                createdAt: connection.createdAt,
                updatedAt: connection.updatedAt,
                acceptedAt: undefined,
                rejectedAt: undefined,
                blockedAt: undefined,
                mutualSpaces: ['space_123'],
                interactionCount: 1,
                metadata: undefined
            });
        });
    });
});
//# sourceMappingURL=connection.aggregate.test.js.map