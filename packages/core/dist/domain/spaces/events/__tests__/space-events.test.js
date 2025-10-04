"use strict";
/**
 * Space Domain Events Tests
 * Tests for space event classes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_created_event_1 = require("../space-created.event");
const member_joined_event_1 = require("../member-joined.event");
const member_removed_event_1 = require("../member-removed.event");
const member_role_updated_event_1 = require("../member-role-updated.event");
const post_created_event_1 = require("../post-created.event");
(0, vitest_1.describe)('Space Domain Events', () => {
    (0, vitest_1.describe)('SpaceCreatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            // Arrange & Act
            const event = new space_created_event_1.SpaceCreatedEvent('space_123', 'Computer Science Club', 'student-org', 'creator_456');
            // Assert
            (0, vitest_1.expect)(event.aggregateId).toBe('space_123');
            (0, vitest_1.expect)(event.name).toBe('Computer Science Club');
            (0, vitest_1.expect)(event.category).toBe('student-org');
            (0, vitest_1.expect)(event.createdBy).toBe('creator_456');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new space_created_event_1.SpaceCreatedEvent('space_123', 'Test Space', 'study-group', 'user_1');
            (0, vitest_1.expect)(event.getEventName()).toBe('SpaceCreated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new space_created_event_1.SpaceCreatedEvent('space_123', 'Test Space', 'study-group', 'user_1');
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'SpaceCreated',
                aggregateId: 'space_123',
                occurredAt: event.occurredAt,
                name: 'Test Space',
                category: 'study-group',
                createdBy: 'user_1'
            });
        });
    });
    (0, vitest_1.describe)('MemberJoinedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_456', 'member', 25);
            (0, vitest_1.expect)(event.aggregateId).toBe('space_123');
            (0, vitest_1.expect)(event.profileId).toBe('profile_456');
            (0, vitest_1.expect)(event.role).toBe('member');
            (0, vitest_1.expect)(event.memberCount).toBe(25);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should support different roles', () => {
            const adminEvent = new member_joined_event_1.MemberJoinedEvent('space_1', 'profile_1', 'admin', 1);
            const modEvent = new member_joined_event_1.MemberJoinedEvent('space_1', 'profile_2', 'moderator', 2);
            const memberEvent = new member_joined_event_1.MemberJoinedEvent('space_1', 'profile_3', 'member', 3);
            (0, vitest_1.expect)(adminEvent.role).toBe('admin');
            (0, vitest_1.expect)(modEvent.role).toBe('moderator');
            (0, vitest_1.expect)(memberEvent.role).toBe('member');
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_456', 'member', 10);
            (0, vitest_1.expect)(event.getEventName()).toBe('MemberJoined');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_456', 'moderator', 15);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'MemberJoined',
                aggregateId: 'space_123',
                occurredAt: event.occurredAt,
                profileId: 'profile_456',
                role: 'moderator',
                memberCount: 15
            });
        });
    });
    (0, vitest_1.describe)('MemberRemovedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_456', 24);
            (0, vitest_1.expect)(event.aggregateId).toBe('space_123');
            (0, vitest_1.expect)(event.profileId).toBe('profile_456');
            (0, vitest_1.expect)(event.memberCount).toBe(24);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_456', 10);
            (0, vitest_1.expect)(event.getEventName()).toBe('MemberRemoved');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_456', 20);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'MemberRemoved',
                aggregateId: 'space_123',
                occurredAt: event.occurredAt,
                profileId: 'profile_456',
                memberCount: 20
            });
        });
        (0, vitest_1.it)('should handle zero member count', () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_456', 0);
            (0, vitest_1.expect)(event.memberCount).toBe(0);
        });
    });
    (0, vitest_1.describe)('MemberRoleUpdatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new member_role_updated_event_1.MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'moderator');
            (0, vitest_1.expect)(event.aggregateId).toBe('space_123');
            (0, vitest_1.expect)(event.profileId).toBe('profile_456');
            (0, vitest_1.expect)(event.oldRole).toBe('member');
            (0, vitest_1.expect)(event.newRole).toBe('moderator');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should support all role transitions', () => {
            const promotion = new member_role_updated_event_1.MemberRoleUpdatedEvent('s1', 'p1', 'member', 'moderator');
            const demotion = new member_role_updated_event_1.MemberRoleUpdatedEvent('s1', 'p2', 'admin', 'moderator');
            const elevation = new member_role_updated_event_1.MemberRoleUpdatedEvent('s1', 'p3', 'moderator', 'admin');
            (0, vitest_1.expect)(promotion.oldRole).toBe('member');
            (0, vitest_1.expect)(promotion.newRole).toBe('moderator');
            (0, vitest_1.expect)(demotion.oldRole).toBe('admin');
            (0, vitest_1.expect)(demotion.newRole).toBe('moderator');
            (0, vitest_1.expect)(elevation.newRole).toBe('admin');
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new member_role_updated_event_1.MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'admin');
            (0, vitest_1.expect)(event.getEventName()).toBe('MemberRoleUpdated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new member_role_updated_event_1.MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'moderator');
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'MemberRoleUpdated',
                aggregateId: 'space_123',
                occurredAt: event.occurredAt,
                profileId: 'profile_456',
                oldRole: 'member',
                newRole: 'moderator'
            });
        });
    });
    (0, vitest_1.describe)('PostCreatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new post_created_event_1.PostCreatedEvent('space_123', 'post_789', 'author_456', 42);
            (0, vitest_1.expect)(event.aggregateId).toBe('space_123');
            (0, vitest_1.expect)(event.postId).toBe('post_789');
            (0, vitest_1.expect)(event.authorId).toBe('author_456');
            (0, vitest_1.expect)(event.postCount).toBe(42);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new post_created_event_1.PostCreatedEvent('space_123', 'post_1', 'author_1', 1);
            (0, vitest_1.expect)(event.getEventName()).toBe('PostCreated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new post_created_event_1.PostCreatedEvent('space_123', 'post_789', 'author_456', 100);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'PostCreated',
                aggregateId: 'space_123',
                occurredAt: event.occurredAt,
                postId: 'post_789',
                authorId: 'author_456',
                postCount: 100
            });
        });
        (0, vitest_1.it)('should handle first post in space', () => {
            const event = new post_created_event_1.PostCreatedEvent('space_new', 'post_first', 'author_1', 1);
            (0, vitest_1.expect)(event.postCount).toBe(1);
        });
    });
});
//# sourceMappingURL=space-events.test.js.map