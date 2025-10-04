/**
 * Connection Aggregate Tests
 * Comprehensive test suite for Connection domain logic
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Connection, ConnectionType, ConnectionSource } from '../aggregates/connection';
import { ProfileId } from '../value-objects/profile-id.value';
import { ConnectionId } from '../value-objects/connection-id.value';
import { Result } from '../../shared/base/Result';

describe('Connection Aggregate', () => {
  // Test data factories
  const createValidProfileIds = () => {
    const profileId1Result = ProfileId.create('profile_alice_123');
    const profileId2Result = ProfileId.create('profile_bob_456');

    if (profileId1Result.isFailure) throw new Error(`ProfileId1 failed: ${profileId1Result.error}`);
    if (profileId2Result.isFailure) throw new Error(`ProfileId2 failed: ${profileId2Result.error}`);

    return {
      profileId1: profileId1Result.getValue(),
      profileId2: profileId2Result.getValue()
    };
  };

  describe('Connection Creation', () => {
    it('should create a connection with valid data', () => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      expect(connectionResult.isSuccess).toBe(true);
      const connection = connectionResult.getValue();
      expect(connection.profileId1.value).toBe('profile_alice_123');
      expect(connection.profileId2.value).toBe('profile_bob_456');
      expect(connection.type).toBe(ConnectionType.PENDING);
      expect(connection.source).toBe(ConnectionSource.SEARCH);
      expect(connection.isActive).toBe(true);
      expect(connection.requestedBy.value).toBe('profile_alice_123');
      expect(connection.mutualSpaces).toEqual([]);
      expect(connection.interactionCount).toBe(0);
    });

    it('should create connection with specified type and source', () => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        type: ConnectionType.FOLLOWER,
        source: ConnectionSource.SPACE,
        requestedBy: profileId1
      });

      expect(connectionResult.isSuccess).toBe(true);
      const connection = connectionResult.getValue();
      expect(connection.type).toBe(ConnectionType.FOLLOWER);
      expect(connection.source).toBe(ConnectionSource.SPACE);
    });

    it('should order profile IDs consistently', () => {
      // Test that profileId1 < profileId2 always (sorted alphabetically)
      const profileIdAResult = ProfileId.create('profile_zebra_999');
      const profileIdBResult = ProfileId.create('profile_alpha_111');

      if (profileIdAResult.isFailure || profileIdBResult.isFailure) {
        throw new Error('Failed to create ProfileIds');
      }

      const connectionResult = Connection.create({
        profileId1: profileIdAResult.getValue(), // zebra (should become profileId2)
        profileId2: profileIdBResult.getValue(), // alpha (should become profileId1)
        requestedBy: profileIdAResult.getValue()
      });

      expect(connectionResult.isSuccess).toBe(true);
      const connection = connectionResult.getValue();
      // Should be ordered: alpha < zebra
      expect(connection.profileId1.value).toBe('profile_alpha_111');
      expect(connection.profileId2.value).toBe('profile_zebra_999');
    });

    it('should generate consistent connection IDs', () => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connection1Result = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      const connection2Result = Connection.create({
        profileId1: profileId2, // Swapped order
        profileId2: profileId1,
        requestedBy: profileId2
      });

      expect(connection1Result.isSuccess).toBe(true);
      expect(connection2Result.isSuccess).toBe(true);

      const connection1 = connection1Result.getValue();
      const connection2 = connection2Result.getValue();

      // Should have same connection ID regardless of input order
      expect(connection1.connectionId.value).toBe(connection2.connectionId.value);
    });
  });

  describe('Connection Acceptance', () => {
    let connection: Connection;
    let profileId1: ProfileId;
    let profileId2: ProfileId;

    beforeEach(() => {
      const profileIds = createValidProfileIds();
      profileId1 = profileIds.profileId1;
      profileId2 = profileIds.profileId2;

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should accept a pending connection', () => {
      const result = connection.accept(profileId2);

      expect(result.isSuccess).toBe(true);
      expect(connection.type).toBe(ConnectionType.FRIEND);
      expect(connection.acceptedBy?.value).toBe(profileId2.value);
      expect(connection.acceptedAt).toBeInstanceOf(Date);
      expect(connection.isMutual).toBe(true);
      expect(connection.status).toBe('accepted');
    });

    it('should not accept non-pending connection', () => {
      // First accept the connection
      connection.accept(profileId2);

      // Try to accept again
      const result = connection.accept(profileId2);

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Connection is not pending');
    });

    it('should not allow self-acceptance', () => {
      const result = connection.accept(profileId1); // requester trying to accept own request

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Cannot accept your own connection request');
    });

    it('should not allow acceptance by third party', () => {
      const thirdPartyResult = ProfileId.create('profile_charlie_789');
      if (thirdPartyResult.isFailure) throw new Error('Failed to create third party ID');
      const thirdParty = thirdPartyResult.getValue();

      const result = connection.accept(thirdParty);

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Accepter is not part of this connection');
    });
  });

  describe('Connection Rejection', () => {
    let connection: Connection;
    let profileId1: ProfileId;
    let profileId2: ProfileId;

    beforeEach(() => {
      const profileIds = createValidProfileIds();
      profileId1 = profileIds.profileId1;
      profileId2 = profileIds.profileId2;

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should reject a pending connection', () => {
      const result = connection.reject();

      expect(result.isSuccess).toBe(true);
      expect(connection.isActive).toBe(false);
      expect(connection.rejectedAt).toBeInstanceOf(Date);
    });

    it('should not reject non-pending connection', () => {
      // First accept the connection
      connection.accept(profileId2);

      // Try to reject
      const result = connection.reject();

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Connection is not pending');
    });
  });

  describe('Connection Blocking', () => {
    let connection: Connection;
    let profileId1: ProfileId;
    let profileId2: ProfileId;

    beforeEach(() => {
      const profileIds = createValidProfileIds();
      profileId1 = profileIds.profileId1;
      profileId2 = profileIds.profileId2;

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should block a connection', () => {
      const result = connection.block(profileId1);

      expect(result.isSuccess).toBe(true);
      expect(connection.type).toBe(ConnectionType.BLOCKED);
      expect(connection.isActive).toBe(false);
      expect(connection.blockedAt).toBeInstanceOf(Date);
      expect(connection.status).toBe('blocked');
    });

    it('should not allow blocking by third party', () => {
      const thirdPartyResult = ProfileId.create('profile_charlie_789');
      if (thirdPartyResult.isFailure) throw new Error('Failed to create third party ID');
      const thirdParty = thirdPartyResult.getValue();

      const result = connection.block(thirdParty);

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Blocker is not part of this connection');
    });

    it('should unblock a blocked connection', () => {
      // First block
      connection.block(profileId1);

      // Then unblock
      const result = connection.unblock();

      expect(result.isSuccess).toBe(true);
      expect(connection.type).toBe(ConnectionType.PENDING);
      expect(connection.isActive).toBe(true);
    });

    it('should not unblock non-blocked connection', () => {
      const result = connection.unblock();

      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Connection is not blocked');
    });
  });

  describe('Connection Utility Methods', () => {
    let connection: Connection;
    let profileId1: ProfileId;
    let profileId2: ProfileId;

    beforeEach(() => {
      const profileIds = createValidProfileIds();
      profileId1 = profileIds.profileId1;
      profileId2 = profileIds.profileId2;

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should disconnect a connection', () => {
      connection.disconnect();

      expect(connection.isActive).toBe(false);
    });

    it('should get other profile ID', () => {
      const otherProfile = connection.getOtherProfileId(profileId1);

      expect(otherProfile?.value).toBe(profileId2.value);

      const otherProfile2 = connection.getOtherProfileId(profileId2);

      expect(otherProfile2?.value).toBe(profileId1.value);
    });

    it('should return null for non-involved profile', () => {
      const thirdPartyResult = ProfileId.create('profile_charlie_789');
      if (thirdPartyResult.isFailure) throw new Error('Failed to create third party ID');
      const thirdParty = thirdPartyResult.getValue();

      const otherProfile = connection.getOtherProfileId(thirdParty);

      expect(otherProfile).toBeNull();
    });

    it('should check if profile is involved', () => {
      expect(connection.involves(profileId1)).toBe(true);
      expect(connection.involves(profileId2)).toBe(true);

      const thirdPartyResult = ProfileId.create('profile_charlie_789');
      if (thirdPartyResult.isFailure) throw new Error('Failed to create third party ID');
      const thirdParty = thirdPartyResult.getValue();

      expect(connection.involves(thirdParty)).toBe(false);
    });
  });

  describe('Mutual Spaces Management', () => {
    let connection: Connection;

    beforeEach(() => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should add mutual space', () => {
      connection.addMutualSpace('space_123');

      expect(connection.mutualSpaces).toContain('space_123');
      expect(connection.mutualSpaces.length).toBe(1);
    });

    it('should not add duplicate mutual space', () => {
      connection.addMutualSpace('space_123');
      connection.addMutualSpace('space_123'); // Duplicate

      expect(connection.mutualSpaces).toEqual(['space_123']);
      expect(connection.mutualSpaces.length).toBe(1);
    });

    it('should remove mutual space', () => {
      connection.addMutualSpace('space_123');
      connection.addMutualSpace('space_456');
      connection.removeMutualSpace('space_123');

      expect(connection.mutualSpaces).not.toContain('space_123');
      expect(connection.mutualSpaces).toContain('space_456');
      expect(connection.mutualSpaces.length).toBe(1);
    });
  });

  describe('Interaction Tracking', () => {
    let connection: Connection;

    beforeEach(() => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      if (connectionResult.isFailure) {
        throw new Error('Failed to create connection for test');
      }
      connection = connectionResult.getValue();
    });

    it('should increment interaction count', () => {
      expect(connection.interactionCount).toBe(0);

      connection.incrementInteraction();
      expect(connection.interactionCount).toBe(1);

      connection.incrementInteraction();
      expect(connection.interactionCount).toBe(2);
    });
  });

  describe('Status Mapping', () => {
    let profileId1: ProfileId;
    let profileId2: ProfileId;

    beforeEach(() => {
      const profileIds = createValidProfileIds();
      profileId1 = profileIds.profileId1;
      profileId2 = profileIds.profileId2;
    });

    it('should map PENDING type to pending status', () => {
      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        type: ConnectionType.PENDING,
        requestedBy: profileId1
      });

      const connection = connectionResult.getValue();
      expect(connection.status).toBe('pending');
    });

    it('should map FRIEND type to accepted status when accepted', () => {
      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      const connection = connectionResult.getValue();
      connection.accept(profileId2);
      expect(connection.status).toBe('accepted');
    });

    it('should map FOLLOWER type to following status', () => {
      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        type: ConnectionType.FOLLOWER,
        requestedBy: profileId1
      });

      const connection = connectionResult.getValue();
      expect(connection.status).toBe('following');
    });

    it('should map BLOCKED type to blocked status', () => {
      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        requestedBy: profileId1
      });

      const connection = connectionResult.getValue();
      connection.block(profileId1);
      expect(connection.status).toBe('blocked');
    });
  });

  describe('Data Serialization', () => {
    it('should serialize to data object', () => {
      const { profileId1, profileId2 } = createValidProfileIds();

      const connectionResult = Connection.create({
        profileId1,
        profileId2,
        type: ConnectionType.PENDING,
        source: ConnectionSource.SPACE,
        requestedBy: profileId1
      });

      const connection = connectionResult.getValue();
      connection.addMutualSpace('space_123');
      connection.incrementInteraction();

      const data = connection.toData();

      expect(data).toEqual({
        id: connection.id,
        connectionId: connection.connectionId.value,
        profileId1: 'profile_alice_123',
        profileId2: 'profile_bob_456',
        type: ConnectionType.PENDING,
        source: ConnectionSource.SPACE,
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