/**
 * Space Domain Events Tests
 * Tests for space event classes
 */

import { describe, it, expect } from 'vitest';
import { SpaceCreatedEvent } from '../space-created.event';
import { MemberJoinedEvent } from '../member-joined.event';
import { MemberRemovedEvent } from '../member-removed.event';
import { MemberRoleUpdatedEvent } from '../member-role-updated.event';
import { PostCreatedEvent } from '../post-created.event';

describe('Space Domain Events', () => {
  describe('SpaceCreatedEvent', () => {
    it('should create event with correct properties', () => {
      // Arrange & Act
      const event = new SpaceCreatedEvent(
        'space_123',
        'Computer Science Club',
        'student-org',
        'creator_456'
      );

      // Assert
      expect(event.aggregateId).toBe('space_123');
      expect(event.name).toBe('Computer Science Club');
      expect(event.category).toBe('student-org');
      expect(event.createdBy).toBe('creator_456');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new SpaceCreatedEvent('space_123', 'Test Space', 'study-group', 'user_1');
      expect(event.getEventName()).toBe('SpaceCreated');
    });

    it('should serialize to data correctly', () => {
      const event = new SpaceCreatedEvent('space_123', 'Test Space', 'study-group', 'user_1');
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'SpaceCreated',
        aggregateId: 'space_123',
        occurredAt: event.occurredAt,
        name: 'Test Space',
        category: 'study-group',
        createdBy: 'user_1'
      });
    });
  });

  describe('MemberJoinedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new MemberJoinedEvent('space_123', 'profile_456', 'member', 25);

      expect(event.aggregateId).toBe('space_123');
      expect(event.profileId).toBe('profile_456');
      expect(event.role).toBe('member');
      expect(event.memberCount).toBe(25);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should support different roles', () => {
      const adminEvent = new MemberJoinedEvent('space_1', 'profile_1', 'admin', 1);
      const modEvent = new MemberJoinedEvent('space_1', 'profile_2', 'moderator', 2);
      const memberEvent = new MemberJoinedEvent('space_1', 'profile_3', 'member', 3);

      expect(adminEvent.role).toBe('admin');
      expect(modEvent.role).toBe('moderator');
      expect(memberEvent.role).toBe('member');
    });

    it('should have correct event type', () => {
      const event = new MemberJoinedEvent('space_123', 'profile_456', 'member', 10);
      expect(event.getEventName()).toBe('MemberJoined');
    });

    it('should serialize to data correctly', () => {
      const event = new MemberJoinedEvent('space_123', 'profile_456', 'moderator', 15);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'MemberJoined',
        aggregateId: 'space_123',
        occurredAt: event.occurredAt,
        profileId: 'profile_456',
        role: 'moderator',
        memberCount: 15
      });
    });
  });

  describe('MemberRemovedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new MemberRemovedEvent('space_123', 'profile_456', 24);

      expect(event.aggregateId).toBe('space_123');
      expect(event.profileId).toBe('profile_456');
      expect(event.memberCount).toBe(24);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new MemberRemovedEvent('space_123', 'profile_456', 10);
      expect(event.getEventName()).toBe('MemberRemoved');
    });

    it('should serialize to data correctly', () => {
      const event = new MemberRemovedEvent('space_123', 'profile_456', 20);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'MemberRemoved',
        aggregateId: 'space_123',
        occurredAt: event.occurredAt,
        profileId: 'profile_456',
        memberCount: 20
      });
    });

    it('should handle zero member count', () => {
      const event = new MemberRemovedEvent('space_123', 'profile_456', 0);
      expect(event.memberCount).toBe(0);
    });
  });

  describe('MemberRoleUpdatedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'moderator');

      expect(event.aggregateId).toBe('space_123');
      expect(event.profileId).toBe('profile_456');
      expect(event.oldRole).toBe('member');
      expect(event.newRole).toBe('moderator');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should support all role transitions', () => {
      const promotion = new MemberRoleUpdatedEvent('s1', 'p1', 'member', 'moderator');
      const demotion = new MemberRoleUpdatedEvent('s1', 'p2', 'admin', 'moderator');
      const elevation = new MemberRoleUpdatedEvent('s1', 'p3', 'moderator', 'admin');

      expect(promotion.oldRole).toBe('member');
      expect(promotion.newRole).toBe('moderator');
      expect(demotion.oldRole).toBe('admin');
      expect(demotion.newRole).toBe('moderator');
      expect(elevation.newRole).toBe('admin');
    });

    it('should have correct event type', () => {
      const event = new MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'admin');
      expect(event.getEventName()).toBe('MemberRoleUpdated');
    });

    it('should serialize to data correctly', () => {
      const event = new MemberRoleUpdatedEvent('space_123', 'profile_456', 'member', 'moderator');
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'MemberRoleUpdated',
        aggregateId: 'space_123',
        occurredAt: event.occurredAt,
        profileId: 'profile_456',
        oldRole: 'member',
        newRole: 'moderator'
      });
    });
  });

  describe('PostCreatedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new PostCreatedEvent('space_123', 'post_789', 'author_456', 42);

      expect(event.aggregateId).toBe('space_123');
      expect(event.postId).toBe('post_789');
      expect(event.authorId).toBe('author_456');
      expect(event.postCount).toBe(42);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new PostCreatedEvent('space_123', 'post_1', 'author_1', 1);
      expect(event.getEventName()).toBe('PostCreated');
    });

    it('should serialize to data correctly', () => {
      const event = new PostCreatedEvent('space_123', 'post_789', 'author_456', 100);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'PostCreated',
        aggregateId: 'space_123',
        occurredAt: event.occurredAt,
        postId: 'post_789',
        authorId: 'author_456',
        postCount: 100
      });
    });

    it('should handle first post in space', () => {
      const event = new PostCreatedEvent('space_new', 'post_first', 'author_1', 1);
      expect(event.postCount).toBe(1);
    });
  });
});
