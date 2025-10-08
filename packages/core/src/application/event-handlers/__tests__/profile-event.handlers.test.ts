/**
 * Profile Event Handler Tests
 * Tests for profile domain event handlers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handleProfileCreated, handleProfileOnboarded } from '../profile-event.handlers';
import { ProfileCreatedEvent } from '../../../domain/profile/events/profile-created.event';
import { ProfileOnboardedEvent } from '../../../domain/profile/events/profile-onboarded.event';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../../../domain/profile/value-objects/campus-id.value';
import { EnhancedFeed } from '../../../domain/feed/enhanced-feed';
import { Result } from '../../../domain/shared/base/Result';

// Mock repository factory
vi.mock('../../../infrastructure/repositories/factory', () => ({
  getFeedRepository: vi.fn(() => mockFeedRepo),
  getSpaceRepository: vi.fn(() => mockSpaceRepo)
}));

// Mock repositories
const mockFeedRepo = {
  saveFeed: vi.fn(),
  findByUserId: vi.fn(),
  getFeedContent: vi.fn(),
  save: vi.fn()
};

const mockSpaceRepo = {
  findByCampus: vi.fn(),
  findByCategory: vi.fn(),
  save: vi.fn()
};

describe('Profile Event Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleProfileCreated', () => {
    it('should create default feed when profile is created', async () => {
      // Arrange
      const event = new ProfileCreatedEvent(
        'profile_test_123',
        'testuser',
        'test@buffalo.edu',
        'ub-buffalo'
      );

      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      // Act
      await handleProfileCreated(event);

      // Assert
      expect(mockFeedRepo.saveFeed).toHaveBeenCalledTimes(1);
      const feedArg = mockFeedRepo.saveFeed.mock.calls[0][0];
      expect(feedArg).toBeInstanceOf(EnhancedFeed);
    });

    it('should handle errors gracefully when feed creation fails', async () => {
      // Arrange
      const event = new ProfileCreatedEvent(
        'profile_test_123',
        'testuser',
        'test@buffalo.edu',
        'ub-buffalo'
      );

      mockFeedRepo.saveFeed.mockRejectedValue(new Error('Database error'));

      // Spy on console.error
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      await handleProfileCreated(event);

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[ProfileEventHandler] Failed to handle profile created:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('should log profile creation event', async () => {
      // Arrange
      const event = new ProfileCreatedEvent(
        'profile_test_123',
        'testuser',
        'test@buffalo.edu',
        'ub-buffalo'
      );

      mockFeedRepo.saveFeed.mockResolvedValue(Result.ok(undefined));

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleProfileCreated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ProfileEventHandler] Profile created: profile_test_123'
      );

      consoleLogSpy.mockRestore();
    });
  });

  describe('handleProfileOnboarded', () => {
    it('should handle profile onboarded event', async () => {
      // Arrange
      const event = new ProfileOnboardedEvent(
        'profile_test_123',
        'ub-buffalo',
        ['coding', 'sports']
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleProfileOnboarded(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[ProfileEventHandler] Profile onboarded: profile_test_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle errors gracefully when processing fails', async () => {
      // Arrange
      const event = new ProfileOnboardedEvent(
        'profile_test_123',
        'ub-buffalo',
        ['coding']
      );

      // Force an error by mocking CampusId
      vi.spyOn(CampusId, 'createUBBuffalo').mockImplementation(() => {
        throw new Error('Test error');
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      await handleProfileOnboarded(event);

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[ProfileEventHandler] Failed to handle profile onboarded:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
      vi.restoreAllMocks();
    });
  });
});
