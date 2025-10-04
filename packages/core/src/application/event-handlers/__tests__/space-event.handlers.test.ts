/**
 * Space Event Handler Tests
 * Tests for space domain event handlers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  handleSpaceCreated,
  handleMemberJoined,
  handlePostCreated,
  handleMemberRemoved
} from '../space-event.handlers';
import { SpaceCreatedEvent } from '../../../domain/spaces/events/space-created.event';
import { MemberJoinedEvent } from '../../../domain/spaces/events/member-joined.event';
import { PostCreatedEvent } from '../../../domain/spaces/events/post-created.event';
import { MemberRemovedEvent } from '../../../domain/spaces/events/member-removed.event';

// Mock repository factory
vi.mock('../../../infrastructure/repositories/factory', () => ({
  getProfileRepository: vi.fn(() => mockProfileRepo),
  getFeedRepository: vi.fn(() => mockFeedRepo),
  getSpaceRepository: vi.fn(() => mockSpaceRepo)
}));

// Mock repositories
const mockProfileRepo = {
  findById: vi.fn(),
  save: vi.fn()
};

const mockFeedRepo = {
  saveFeed: vi.fn(),
  findByUserId: vi.fn(),
  addSpaceToFeed: vi.fn(),
  removeSpaceFromFeed: vi.fn()
};

const mockSpaceRepo = {
  findById: vi.fn(),
  save: vi.fn(),
  findByCampus: vi.fn()
};

describe('Space Event Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleSpaceCreated', () => {
    it('should handle space created event', async () => {
      // Arrange
      const event = new SpaceCreatedEvent(
        'space_123',
        'Computer Science Club',
        'student_org',
        'creator_456'
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleSpaceCreated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[SpaceEventHandler] Space created: Computer Science Club by creator_456'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle different space categories', async () => {
      const categories = ['student_org', 'academic', 'social', 'sports'];

      for (const category of categories) {
        const event = new SpaceCreatedEvent(
          `space_${category}`,
          `Test ${category}`,
          category,
          'creator_123'
        );

        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        await handleSpaceCreated(event);
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
      }
    });
  });

  describe('handleMemberJoined', () => {
    it('should handle member joined event', async () => {
      // Arrange
      const event = new MemberJoinedEvent(
        'space_123',
        'profile_456',
        'member',
        10
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleMemberJoined(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[SpaceEventHandler] Member profile_456 joined space space_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should complete without throwing errors', async () => {
      // Arrange
      const event = new MemberJoinedEvent(
        'space_123',
        'profile_456',
        'member',
        5
      );

      // Act & Assert - should not throw
      await expect(handleMemberJoined(event)).resolves.toBeUndefined();
    });

    it('should handle different member roles', async () => {
      const roles = ['admin', 'moderator', 'member'];

      for (const role of roles) {
        const event = new MemberJoinedEvent(
          'space_123',
          `profile_${role}`,
          role,
          1
        );

        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        await handleMemberJoined(event);
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
      }
    });

    it('should track member count changes', async () => {
      const event = new MemberJoinedEvent(
        'space_123',
        'profile_789',
        'member',
        25
      );

      await handleMemberJoined(event);
      expect(event.memberCount).toBe(25);
    });
  });

  describe('handlePostCreated', () => {
    it('should handle post created event', async () => {
      // Arrange
      const event = new PostCreatedEvent(
        'space_123',
        'post_456',
        'author_789',
        42
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handlePostCreated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[SpaceEventHandler] Post created in space space_123 by author_789'
      );

      consoleLogSpy.mockRestore();
    });

    it('should track post count', async () => {
      const event = new PostCreatedEvent(
        'space_123',
        'post_999',
        'author_111',
        100
      );

      await handlePostCreated(event);
      expect(event.postCount).toBe(100);
    });
  });

  describe('handleMemberRemoved', () => {
    it('should handle member removed event', async () => {
      // Arrange
      const event = new MemberRemovedEvent(
        'space_123',
        'profile_456',
        9
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleMemberRemoved(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[SpaceEventHandler] Member profile_456 removed from space space_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should track member count after removal', async () => {
      const event = new MemberRemovedEvent(
        'space_123',
        'profile_leaving',
        15
      );

      await handleMemberRemoved(event);
      expect(event.memberCount).toBe(15);
    });

    it('should handle space with zero members', async () => {
      const event = new MemberRemovedEvent(
        'space_empty',
        'last_member',
        0
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleMemberRemoved(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.memberCount).toBe(0);
      consoleLogSpy.mockRestore();
    });
  });
});
