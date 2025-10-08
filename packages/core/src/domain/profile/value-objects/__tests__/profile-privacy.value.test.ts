/**
 * ProfilePrivacy Value Object Tests
 * Tests for profile privacy settings
 */

import { describe, it, expect } from 'vitest';
import { ProfilePrivacy } from '../profile-privacy.value';

describe('ProfilePrivacy', () => {
  describe('create()', () => {
    it('should create valid privacy settings with all fields', () => {
      const result = ProfilePrivacy.create({
        profileVisibility: 'public',
        showEmail: true,
        showConnections: true,
        allowConnectionRequests: true
      });

      expect(result.isSuccess).toBe(true);

      const privacy = result.getValue();
      expect(privacy.profileVisibility).toBe('public');
      expect(privacy.showEmail).toBe(true);
      expect(privacy.showConnections).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(true);
    });

    it('should create privacy settings with private visibility', () => {
      const result = ProfilePrivacy.create({
        profileVisibility: 'private',
        showEmail: false,
        showConnections: false,
        allowConnectionRequests: false
      });

      expect(result.isSuccess).toBe(true);
      expect(result.getValue().profileVisibility).toBe('private');
    });

    it('should create privacy settings with connections-only visibility', () => {
      const result = ProfilePrivacy.create({
        profileVisibility: 'connections',
        showEmail: false,
        showConnections: true,
        allowConnectionRequests: true
      });

      expect(result.isSuccess).toBe(true);
      expect(result.getValue().profileVisibility).toBe('connections');
    });

    it('should fail with invalid visibility value', () => {
      const result = ProfilePrivacy.create({
        profileVisibility: 'invalid' as any,
        showEmail: true,
        showConnections: true,
        allowConnectionRequests: true
      });

      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Invalid profile visibility');
    });
  });

  describe('createPublic()', () => {
    it('should create public privacy settings', () => {
      const result = ProfilePrivacy.createPublic();
      expect(result.isSuccess).toBe(true);

      const privacy = result.getValue();
      expect(privacy.profileVisibility).toBe('public');
      expect(privacy.showEmail).toBe(true);
      expect(privacy.showConnections).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(true);
    });

    it('should return isPublic as true', () => {
      const privacy = ProfilePrivacy.createPublic().getValue();
      expect(privacy.isPublic()).toBe(true);
      expect(privacy.isPrivate()).toBe(false);
    });
  });

  describe('createPrivate()', () => {
    it('should create private privacy settings', () => {
      const result = ProfilePrivacy.createPrivate();
      expect(result.isSuccess).toBe(true);

      const privacy = result.getValue();
      expect(privacy.profileVisibility).toBe('private');
      expect(privacy.showEmail).toBe(false);
      expect(privacy.showConnections).toBe(false);
      expect(privacy.allowConnectionRequests).toBe(false);
    });

    it('should return isPrivate as true', () => {
      const privacy = ProfilePrivacy.createPrivate().getValue();
      expect(privacy.isPrivate()).toBe(true);
      expect(privacy.isPublic()).toBe(false);
    });
  });

  describe('createConnectionsOnly()', () => {
    it('should create connections-only privacy settings', () => {
      const result = ProfilePrivacy.createConnectionsOnly();
      expect(result.isSuccess).toBe(true);

      const privacy = result.getValue();
      expect(privacy.profileVisibility).toBe('connections');
      expect(privacy.showEmail).toBe(false);
      expect(privacy.showConnections).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(true);
    });

    it('should return isConnectionsOnly as true', () => {
      const privacy = ProfilePrivacy.createConnectionsOnly().getValue();
      expect(privacy.isConnectionsOnly()).toBe(true);
      expect(privacy.isPublic()).toBe(false);
      expect(privacy.isPrivate()).toBe(false);
    });
  });

  describe('visibility checks', () => {
    it('isPublic() should return true only for public visibility', () => {
      const publicPrivacy = ProfilePrivacy.createPublic().getValue();
      const privatePrivacy = ProfilePrivacy.createPrivate().getValue();
      const connectionsPrivacy = ProfilePrivacy.createConnectionsOnly().getValue();

      expect(publicPrivacy.isPublic()).toBe(true);
      expect(privatePrivacy.isPublic()).toBe(false);
      expect(connectionsPrivacy.isPublic()).toBe(false);
    });

    it('isPrivate() should return true only for private visibility', () => {
      const publicPrivacy = ProfilePrivacy.createPublic().getValue();
      const privatePrivacy = ProfilePrivacy.createPrivate().getValue();
      const connectionsPrivacy = ProfilePrivacy.createConnectionsOnly().getValue();

      expect(privatePrivacy.isPrivate()).toBe(true);
      expect(publicPrivacy.isPrivate()).toBe(false);
      expect(connectionsPrivacy.isPrivate()).toBe(false);
    });

    it('isConnectionsOnly() should return true only for connections visibility', () => {
      const publicPrivacy = ProfilePrivacy.createPublic().getValue();
      const privatePrivacy = ProfilePrivacy.createPrivate().getValue();
      const connectionsPrivacy = ProfilePrivacy.createConnectionsOnly().getValue();

      expect(connectionsPrivacy.isConnectionsOnly()).toBe(true);
      expect(publicPrivacy.isConnectionsOnly()).toBe(false);
      expect(privatePrivacy.isConnectionsOnly()).toBe(false);
    });
  });

  describe('equality', () => {
    it('should be equal when all settings are the same', () => {
      const privacy1 = ProfilePrivacy.createPublic().getValue();
      const privacy2 = ProfilePrivacy.createPublic().getValue();

      expect(privacy1.equals(privacy2)).toBe(true);
    });

    it('should not be equal when visibility differs', () => {
      const privacy1 = ProfilePrivacy.createPublic().getValue();
      const privacy2 = ProfilePrivacy.createPrivate().getValue();

      expect(privacy1.equals(privacy2)).toBe(false);
    });

    it('should not be equal when any setting differs', () => {
      const privacy1 = ProfilePrivacy.create({
        profileVisibility: 'public',
        showEmail: true,
        showConnections: true,
        allowConnectionRequests: true
      }).getValue();

      const privacy2 = ProfilePrivacy.create({
        profileVisibility: 'public',
        showEmail: false, // Different
        showConnections: true,
        allowConnectionRequests: true
      }).getValue();

      expect(privacy1.equals(privacy2)).toBe(false);
    });
  });

  describe('real-world scenarios', () => {
    it('should create typical student public profile', () => {
      const privacy = ProfilePrivacy.createPublic().getValue();

      expect(privacy.profileVisibility).toBe('public');
      expect(privacy.showEmail).toBe(true);
      expect(privacy.showConnections).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(true);
    });

    it('should create cautious student profile', () => {
      const privacy = ProfilePrivacy.createConnectionsOnly().getValue();

      expect(privacy.profileVisibility).toBe('connections');
      expect(privacy.showEmail).toBe(false); // Hidden from non-connections
      expect(privacy.showConnections).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(true);
    });

    it('should create private faculty profile', () => {
      const privacy = ProfilePrivacy.createPrivate().getValue();

      expect(privacy.profileVisibility).toBe('private');
      expect(privacy.showEmail).toBe(false);
      expect(privacy.showConnections).toBe(false);
      expect(privacy.allowConnectionRequests).toBe(false);
    });

    it('should allow custom privacy combination', () => {
      // Public profile but doesn't want connection requests
      const result = ProfilePrivacy.create({
        profileVisibility: 'public',
        showEmail: true,
        showConnections: true,
        allowConnectionRequests: false
      });

      expect(result.isSuccess).toBe(true);
      const privacy = result.getValue();
      expect(privacy.isPublic()).toBe(true);
      expect(privacy.allowConnectionRequests).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle all boolean combinations for public visibility', () => {
      const combinations = [
        { showEmail: true, showConnections: true, allowConnectionRequests: true },
        { showEmail: true, showConnections: true, allowConnectionRequests: false },
        { showEmail: true, showConnections: false, allowConnectionRequests: true },
        { showEmail: false, showConnections: true, allowConnectionRequests: true }
      ];

      combinations.forEach(combo => {
        const result = ProfilePrivacy.create({
          profileVisibility: 'public',
          ...combo
        });

        expect(result.isSuccess).toBe(true);
      });
    });
  });
});
