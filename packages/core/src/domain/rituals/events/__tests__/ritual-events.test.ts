/**
 * Ritual Domain Events Tests
 * Tests for ritual event classes
 */

import { describe, it, expect } from 'vitest';
import { RitualCreatedEvent } from '../ritual-created.event';
import { RitualActivatedEvent } from '../ritual-activated.event';
import { RitualDeactivatedEvent } from '../ritual-deactivated.event';
import { ParticipantJoinedEvent } from '../participant-joined.event';
import { ParticipantLeftEvent } from '../participant-left.event';
import { MilestoneCompletedEvent } from '../milestone-completed.event';

describe('Ritual Domain Events', () => {
  describe('RitualCreatedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new RitualCreatedEvent(
        'ritual_123',
        'Campus Fitness Challenge',
        'long',
        'creator_456'
      );

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.name).toBe('Campus Fitness Challenge');
      expect(event.type).toBe('long');
      expect(event.createdBy).toBe('creator_456');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new RitualCreatedEvent('r1', 'Test', 'short', 'u1');
      expect(event.getEventName()).toBe('RitualCreated');
    });

    it('should serialize to data correctly', () => {
      const event = new RitualCreatedEvent('ritual_123', 'Study Group', 'medium', 'user_1');
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'RitualCreated',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt,
        name: 'Study Group',
        type: 'medium',
        createdBy: 'user_1'
      });
    });

    it('should support different ritual types', () => {
      const short = new RitualCreatedEvent('r1', 'Daily Task', 'short', 'u1');
      const medium = new RitualCreatedEvent('r2', 'Weekly Goal', 'medium', 'u1');
      const long = new RitualCreatedEvent('r3', 'Semester Challenge', 'long', 'u1');

      expect(short.type).toBe('short');
      expect(medium.type).toBe('medium');
      expect(long.type).toBe('long');
    });
  });

  describe('RitualActivatedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new RitualActivatedEvent('ritual_123');

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new RitualActivatedEvent('ritual_123');
      expect(event.getEventName()).toBe('RitualActivated');
    });

    it('should serialize to data correctly', () => {
      const event = new RitualActivatedEvent('ritual_123');
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'RitualActivated',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt
      });
    });
  });

  describe('RitualDeactivatedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new RitualDeactivatedEvent('ritual_123');

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new RitualDeactivatedEvent('ritual_123');
      expect(event.getEventName()).toBe('RitualDeactivated');
    });

    it('should serialize to data correctly', () => {
      const event = new RitualDeactivatedEvent('ritual_123');
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'RitualDeactivated',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt
      });
    });
  });

  describe('ParticipantJoinedEvent', () => {
    it('should create event with correct properties', () => {
      const event = new ParticipantJoinedEvent('ritual_123', 'profile_456', 42);

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.profileId).toBe('profile_456');
      expect(event.participantCount).toBe(42);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new ParticipantJoinedEvent('ritual_1', 'profile_1', 1);
      expect(event.getEventName()).toBe('ParticipantJoined');
    });

    it('should serialize to data correctly', () => {
      const event = new ParticipantJoinedEvent('ritual_123', 'profile_456', 100);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'ParticipantJoined',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt,
        profileId: 'profile_456',
        participantCount: 100
      });
    });

    it('should handle first participant', () => {
      const event = new ParticipantJoinedEvent('ritual_new', 'profile_1', 1);
      expect(event.participantCount).toBe(1);
    });
  });

  describe('ParticipantLeftEvent', () => {
    it('should create event with correct properties', () => {
      const event = new ParticipantLeftEvent('ritual_123', 'profile_456', 41);

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.profileId).toBe('profile_456');
      expect(event.participantCount).toBe(41);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new ParticipantLeftEvent('ritual_1', 'profile_1', 0);
      expect(event.getEventName()).toBe('ParticipantLeft');
    });

    it('should serialize to data correctly', () => {
      const event = new ParticipantLeftEvent('ritual_123', 'profile_456', 50);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'ParticipantLeft',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt,
        profileId: 'profile_456',
        participantCount: 50
      });
    });

    it('should handle last participant leaving', () => {
      const event = new ParticipantLeftEvent('ritual_123', 'profile_last', 0);
      expect(event.participantCount).toBe(0);
    });
  });

  describe('MilestoneCompletedEvent', () => {
    it('should create event with correct properties', () => {
      const rewards = [
        { type: 'badge', value: 'Gold Star', description: 'Completed 10 days' },
        { type: 'points', value: 100, description: '100 bonus points' }
      ];
      const event = new MilestoneCompletedEvent(
        'ritual_123',
        'milestone_1',
        '10 Day Streak',
        rewards
      );

      expect(event.aggregateId).toBe('ritual_123');
      expect(event.milestoneId).toBe('milestone_1');
      expect(event.milestoneName).toBe('10 Day Streak');
      expect(event.rewards).toEqual(rewards);
      expect(event.occurredAt).toBeInstanceOf(Date);
    });

    it('should have correct event type', () => {
      const event = new MilestoneCompletedEvent('r1', 'm1', 'First Step', []);
      expect(event.getEventName()).toBe('MilestoneCompleted');
    });

    it('should serialize to data correctly', () => {
      const rewards = [{ type: 'badge', value: 'Champion', description: 'Top performer' }];
      const event = new MilestoneCompletedEvent('ritual_123', 'milestone_1', 'Champion', rewards);
      const data = event.toData();

      expect(data).toEqual({
        eventType: 'MilestoneCompleted',
        aggregateId: 'ritual_123',
        occurredAt: event.occurredAt,
        milestoneId: 'milestone_1',
        milestoneName: 'Champion',
        rewards
      });
    });

    it('should handle empty rewards array', () => {
      const event = new MilestoneCompletedEvent('r1', 'm1', 'Basic Achievement', []);
      expect(event.rewards).toEqual([]);
      expect(event.toData().rewards).toEqual([]);
    });

    it('should handle multiple rewards', () => {
      const rewards = [
        { type: 'badge', value: 'Gold', description: 'Top tier' },
        { type: 'points', value: 500, description: 'Bonus points' },
        { type: 'title', value: 'Champion', description: 'Special title' }
      ];
      const event = new MilestoneCompletedEvent('r1', 'm1', 'Ultimate', rewards);
      expect(event.rewards).toHaveLength(3);
    });
  });
});
