/**
 * Ritual Event Handler Tests
 * Tests for ritual domain event handlers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  handleRitualCreated,
  handleParticipantJoined,
  handleMilestoneCompleted,
  handleRitualActivated
} from '../ritual-event.handlers';
import { RitualCreatedEvent } from '../../../domain/rituals/events/ritual-created.event';
import { ParticipantJoinedEvent } from '../../../domain/rituals/events/participant-joined.event';
import { MilestoneCompletedEvent } from '../../../domain/rituals/events/milestone-completed.event';
import { RitualActivatedEvent } from '../../../domain/rituals/events/ritual-activated.event';

describe('Ritual Event Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleRitualCreated', () => {
    it('should handle ritual created event', async () => {
      // Arrange
      const event = new RitualCreatedEvent(
        'ritual_123',
        'Daily Fitness Challenge',
        'health',
        'creator_456'
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleRitualCreated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[RitualEventHandler] Ritual created: Daily Fitness Challenge by creator_456'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle different ritual types', async () => {
      const types = ['health', 'social', 'academic', 'campus'];

      for (const type of types) {
        const event = new RitualCreatedEvent(
          `ritual_${type}`,
          `Test ${type} Ritual`,
          type,
          'creator_123'
        );

        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        await handleRitualCreated(event);
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
      }
    });

    it('should complete without throwing errors', async () => {
      const event = new RitualCreatedEvent(
        'ritual_789',
        'Study Together',
        'academic',
        'prof_101'
      );

      await expect(handleRitualCreated(event)).resolves.toBeUndefined();
    });
  });

  describe('handleParticipantJoined', () => {
    it('should handle participant joined event', async () => {
      // Arrange
      const event = new ParticipantJoinedEvent(
        'ritual_123',
        'profile_456',
        10
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleParticipantJoined(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[RitualEventHandler] Participant profile_456 joined ritual ritual_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should track participant count', async () => {
      const event = new ParticipantJoinedEvent(
        'ritual_popular',
        'profile_999',
        100
      );

      await handleParticipantJoined(event);
      expect(event.participantCount).toBe(100);
    });

    it('should handle first participant', async () => {
      const event = new ParticipantJoinedEvent(
        'ritual_new',
        'profile_first',
        1
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleParticipantJoined(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.participantCount).toBe(1);
      consoleLogSpy.mockRestore();
    });

    it('should complete without throwing errors', async () => {
      const event = new ParticipantJoinedEvent(
        'ritual_456',
        'profile_789',
        25
      );

      await expect(handleParticipantJoined(event)).resolves.toBeUndefined();
    });
  });

  describe('handleMilestoneCompleted', () => {
    it('should handle milestone completed event', async () => {
      // Arrange
      const rewards = [
        { type: 'badge', value: 'Gold Star', description: '10 day streak' },
        { type: 'points', value: 100, description: 'Bonus points' }
      ];
      const event = new MilestoneCompletedEvent(
        'ritual_123',
        'milestone_456',
        '10 Day Streak',
        rewards
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleMilestoneCompleted(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[RitualEventHandler] Milestone 10 Day Streak (milestone_456) completed in ritual ritual_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle milestone with no rewards', async () => {
      const event = new MilestoneCompletedEvent(
        'ritual_789',
        'milestone_basic',
        'First Day Complete',
        []
      );

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await handleMilestoneCompleted(event);
      expect(consoleLogSpy).toHaveBeenCalled();
      expect(event.rewards).toEqual([]);
      consoleLogSpy.mockRestore();
    });

    it('should handle milestone with multiple rewards', async () => {
      const rewards = [
        { type: 'badge', value: 'Champion', description: 'Top performer' },
        { type: 'points', value: 500, description: 'Achievement bonus' },
        { type: 'title', value: 'Ritual Master', description: 'Special title' }
      ];
      const event = new MilestoneCompletedEvent(
        'ritual_epic',
        'milestone_legend',
        'Legendary Achievement',
        rewards
      );

      await handleMilestoneCompleted(event);
      expect(event.rewards).toHaveLength(3);
    });

    it('should complete without throwing errors', async () => {
      const event = new MilestoneCompletedEvent(
        'ritual_456',
        'milestone_789',
        'Week Complete',
        [{ type: 'badge', value: 'Week Warrior', description: 'Completed week' }]
      );

      await expect(handleMilestoneCompleted(event)).resolves.toBeUndefined();
    });
  });

  describe('handleRitualActivated', () => {
    it('should handle ritual activated event', async () => {
      // Arrange
      const event = new RitualActivatedEvent('ritual_123');

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Act
      await handleRitualActivated(event);

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[RitualEventHandler] Ritual activated: ritual_123'
      );

      consoleLogSpy.mockRestore();
    });

    it('should handle multiple ritual activations', async () => {
      const ritualIds = ['ritual_1', 'ritual_2', 'ritual_3'];

      for (const id of ritualIds) {
        const event = new RitualActivatedEvent(id);
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        await handleRitualActivated(event);
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
      }
    });

    it('should complete without throwing errors', async () => {
      const event = new RitualActivatedEvent('ritual_new_active');

      await expect(handleRitualActivated(event)).resolves.toBeUndefined();
    });
  });
});
