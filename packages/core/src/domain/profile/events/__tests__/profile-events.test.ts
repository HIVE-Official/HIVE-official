/**
 * Profile Domain Events Tests
 * Tests for profile event classes
 */

import { describe, it, expect } from 'vitest';
import { ProfileCreatedEvent } from '../profile-created.event';
import { ProfileOnboardedEvent } from '../profile-onboarded.event';

describe('Profile Domain Events', () => {
  describe('ProfileCreatedEvent', () => {
    it('should create event with correct properties', () => {
      // Arrange & Act
      const event = new ProfileCreatedEvent(
        'profile_123',
        'john_doe',
        'john@buffalo.edu',
        'ub-buffalo'
      );

      // Assert
      expect(event.aggregateId).toBe('profile_123');
      expect(event.handle).toBe('john_doe');
      expect(event.email).toBe('john@buffalo.edu');
      expect(event.campusId).toBe('ub-buffalo');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      // Arrange & Act
      const event = new ProfileCreatedEvent(
        'profile_123',
        'john_doe',
        'john@buffalo.edu',
        'ub-buffalo'
      );

      // Assert
      expect(event.eventType).toBe('ProfileCreated');
    });

    it('should serialize to data correctly', () => {
      // Arrange
      const event = new ProfileCreatedEvent(
        'profile_123',
        'john_doe',
        'john@buffalo.edu',
        'ub-buffalo'
      );

      // Act
      const data = event.toData();

      // Assert
      expect(data).toEqual({
        eventType: 'ProfileCreated',
        aggregateId: 'profile_123',
        occurredAt: event.occurredAt,
        handle: 'john_doe',
        email: 'john@buffalo.edu',
        campusId: 'ub-buffalo'
      });
    });
  });

  describe('ProfileOnboardedEvent', () => {
    it('should create event with correct properties', () => {
      // Arrange & Act
      const event = new ProfileOnboardedEvent(
        'profile_123',
        'ub-buffalo',
        ['coding', 'sports', 'music']
      );

      // Assert
      expect(event.aggregateId).toBe('profile_123');
      expect(event.campusId).toBe('ub-buffalo');
      expect(event.interests).toEqual(['coding', 'sports', 'music']);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      // Arrange & Act
      const event = new ProfileOnboardedEvent(
        'profile_123',
        'ub-buffalo',
        ['coding']
      );

      // Assert
      expect(event.eventType).toBe('ProfileOnboarded');
    });

    it('should serialize to data correctly', () => {
      // Arrange
      const interests = ['coding', 'sports'];
      const event = new ProfileOnboardedEvent(
        'profile_123',
        'ub-buffalo',
        interests
      );

      // Act
      const data = event.toData();

      // Assert
      expect(data).toEqual({
        eventType: 'ProfileOnboarded',
        aggregateId: 'profile_123',
        occurredAt: event.occurredAt,
        campusId: 'ub-buffalo',
        interests
      });
    });

    it('should handle empty interests array', () => {
      // Arrange & Act
      const event = new ProfileOnboardedEvent(
        'profile_123',
        'ub-buffalo',
        []
      );

      // Assert
      expect(event.interests).toEqual([]);
      expect(event.toData().interests).toEqual([]);
    });
  });
});
