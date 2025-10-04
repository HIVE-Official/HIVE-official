"use strict";
/**
 * ProfilePrivacy Value Object Tests
 * Tests for profile privacy settings
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_privacy_value_1 = require("../profile-privacy.value");
(0, vitest_1.describe)('ProfilePrivacy', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid privacy settings with all fields', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'public',
                showEmail: true,
                showConnections: true,
                allowConnectionRequests: true
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const privacy = result.getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('public');
            (0, vitest_1.expect)(privacy.showEmail).toBe(true);
            (0, vitest_1.expect)(privacy.showConnections).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(true);
        });
        (0, vitest_1.it)('should create privacy settings with private visibility', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'private',
                showEmail: false,
                showConnections: false,
                allowConnectionRequests: false
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().profileVisibility).toBe('private');
        });
        (0, vitest_1.it)('should create privacy settings with connections-only visibility', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'connections',
                showEmail: false,
                showConnections: true,
                allowConnectionRequests: true
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().profileVisibility).toBe('connections');
        });
        (0, vitest_1.it)('should fail with invalid visibility value', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'invalid',
                showEmail: true,
                showConnections: true,
                allowConnectionRequests: true
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid profile visibility');
        });
    });
    (0, vitest_1.describe)('createPublic()', () => {
        (0, vitest_1.it)('should create public privacy settings', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.createPublic();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const privacy = result.getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('public');
            (0, vitest_1.expect)(privacy.showEmail).toBe(true);
            (0, vitest_1.expect)(privacy.showConnections).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(true);
        });
        (0, vitest_1.it)('should return isPublic as true', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            (0, vitest_1.expect)(privacy.isPublic()).toBe(true);
            (0, vitest_1.expect)(privacy.isPrivate()).toBe(false);
        });
    });
    (0, vitest_1.describe)('createPrivate()', () => {
        (0, vitest_1.it)('should create private privacy settings', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.createPrivate();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const privacy = result.getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('private');
            (0, vitest_1.expect)(privacy.showEmail).toBe(false);
            (0, vitest_1.expect)(privacy.showConnections).toBe(false);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(false);
        });
        (0, vitest_1.it)('should return isPrivate as true', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            (0, vitest_1.expect)(privacy.isPrivate()).toBe(true);
            (0, vitest_1.expect)(privacy.isPublic()).toBe(false);
        });
    });
    (0, vitest_1.describe)('createConnectionsOnly()', () => {
        (0, vitest_1.it)('should create connections-only privacy settings', () => {
            const result = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const privacy = result.getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('connections');
            (0, vitest_1.expect)(privacy.showEmail).toBe(false);
            (0, vitest_1.expect)(privacy.showConnections).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(true);
        });
        (0, vitest_1.it)('should return isConnectionsOnly as true', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly().getValue();
            (0, vitest_1.expect)(privacy.isConnectionsOnly()).toBe(true);
            (0, vitest_1.expect)(privacy.isPublic()).toBe(false);
            (0, vitest_1.expect)(privacy.isPrivate()).toBe(false);
        });
    });
    (0, vitest_1.describe)('visibility checks', () => {
        (0, vitest_1.it)('isPublic() should return true only for public visibility', () => {
            const publicPrivacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            const privatePrivacy = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            const connectionsPrivacy = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly().getValue();
            (0, vitest_1.expect)(publicPrivacy.isPublic()).toBe(true);
            (0, vitest_1.expect)(privatePrivacy.isPublic()).toBe(false);
            (0, vitest_1.expect)(connectionsPrivacy.isPublic()).toBe(false);
        });
        (0, vitest_1.it)('isPrivate() should return true only for private visibility', () => {
            const publicPrivacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            const privatePrivacy = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            const connectionsPrivacy = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly().getValue();
            (0, vitest_1.expect)(privatePrivacy.isPrivate()).toBe(true);
            (0, vitest_1.expect)(publicPrivacy.isPrivate()).toBe(false);
            (0, vitest_1.expect)(connectionsPrivacy.isPrivate()).toBe(false);
        });
        (0, vitest_1.it)('isConnectionsOnly() should return true only for connections visibility', () => {
            const publicPrivacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            const privatePrivacy = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            const connectionsPrivacy = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly().getValue();
            (0, vitest_1.expect)(connectionsPrivacy.isConnectionsOnly()).toBe(true);
            (0, vitest_1.expect)(publicPrivacy.isConnectionsOnly()).toBe(false);
            (0, vitest_1.expect)(privatePrivacy.isConnectionsOnly()).toBe(false);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when all settings are the same', () => {
            const privacy1 = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            const privacy2 = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            (0, vitest_1.expect)(privacy1.equals(privacy2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when visibility differs', () => {
            const privacy1 = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            const privacy2 = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            (0, vitest_1.expect)(privacy1.equals(privacy2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when any setting differs', () => {
            const privacy1 = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'public',
                showEmail: true,
                showConnections: true,
                allowConnectionRequests: true
            }).getValue();
            const privacy2 = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'public',
                showEmail: false, // Different
                showConnections: true,
                allowConnectionRequests: true
            }).getValue();
            (0, vitest_1.expect)(privacy1.equals(privacy2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('real-world scenarios', () => {
        (0, vitest_1.it)('should create typical student public profile', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createPublic().getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('public');
            (0, vitest_1.expect)(privacy.showEmail).toBe(true);
            (0, vitest_1.expect)(privacy.showConnections).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(true);
        });
        (0, vitest_1.it)('should create cautious student profile', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createConnectionsOnly().getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('connections');
            (0, vitest_1.expect)(privacy.showEmail).toBe(false); // Hidden from non-connections
            (0, vitest_1.expect)(privacy.showConnections).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(true);
        });
        (0, vitest_1.it)('should create private faculty profile', () => {
            const privacy = profile_privacy_value_1.ProfilePrivacy.createPrivate().getValue();
            (0, vitest_1.expect)(privacy.profileVisibility).toBe('private');
            (0, vitest_1.expect)(privacy.showEmail).toBe(false);
            (0, vitest_1.expect)(privacy.showConnections).toBe(false);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(false);
        });
        (0, vitest_1.it)('should allow custom privacy combination', () => {
            // Public profile but doesn't want connection requests
            const result = profile_privacy_value_1.ProfilePrivacy.create({
                profileVisibility: 'public',
                showEmail: true,
                showConnections: true,
                allowConnectionRequests: false
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const privacy = result.getValue();
            (0, vitest_1.expect)(privacy.isPublic()).toBe(true);
            (0, vitest_1.expect)(privacy.allowConnectionRequests).toBe(false);
        });
    });
    (0, vitest_1.describe)('edge cases', () => {
        (0, vitest_1.it)('should handle all boolean combinations for public visibility', () => {
            const combinations = [
                { showEmail: true, showConnections: true, allowConnectionRequests: true },
                { showEmail: true, showConnections: true, allowConnectionRequests: false },
                { showEmail: true, showConnections: false, allowConnectionRequests: true },
                { showEmail: false, showConnections: true, allowConnectionRequests: true }
            ];
            combinations.forEach(combo => {
                const result = profile_privacy_value_1.ProfilePrivacy.create({
                    profileVisibility: 'public',
                    ...combo
                });
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=profile-privacy.value.test.js.map