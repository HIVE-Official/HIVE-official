"use strict";
/**
 * Ritual Domain Events Tests
 * Tests for ritual event classes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_created_event_1 = require("../ritual-created.event");
const ritual_activated_event_1 = require("../ritual-activated.event");
const ritual_deactivated_event_1 = require("../ritual-deactivated.event");
const participant_joined_event_1 = require("../participant-joined.event");
const participant_left_event_1 = require("../participant-left.event");
const milestone_completed_event_1 = require("../milestone-completed.event");
(0, vitest_1.describe)('Ritual Domain Events', () => {
    (0, vitest_1.describe)('RitualCreatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new ritual_created_event_1.RitualCreatedEvent('ritual_123', 'Campus Fitness Challenge', 'long', 'creator_456');
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.name).toBe('Campus Fitness Challenge');
            (0, vitest_1.expect)(event.type).toBe('long');
            (0, vitest_1.expect)(event.createdBy).toBe('creator_456');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new ritual_created_event_1.RitualCreatedEvent('r1', 'Test', 'short', 'u1');
            (0, vitest_1.expect)(event.getEventName()).toBe('RitualCreated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new ritual_created_event_1.RitualCreatedEvent('ritual_123', 'Study Group', 'medium', 'user_1');
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'RitualCreated',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt,
                name: 'Study Group',
                type: 'medium',
                createdBy: 'user_1'
            });
        });
        (0, vitest_1.it)('should support different ritual types', () => {
            const short = new ritual_created_event_1.RitualCreatedEvent('r1', 'Daily Task', 'short', 'u1');
            const medium = new ritual_created_event_1.RitualCreatedEvent('r2', 'Weekly Goal', 'medium', 'u1');
            const long = new ritual_created_event_1.RitualCreatedEvent('r3', 'Semester Challenge', 'long', 'u1');
            (0, vitest_1.expect)(short.type).toBe('short');
            (0, vitest_1.expect)(medium.type).toBe('medium');
            (0, vitest_1.expect)(long.type).toBe('long');
        });
    });
    (0, vitest_1.describe)('RitualActivatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new ritual_activated_event_1.RitualActivatedEvent('ritual_123');
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new ritual_activated_event_1.RitualActivatedEvent('ritual_123');
            (0, vitest_1.expect)(event.getEventName()).toBe('RitualActivated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new ritual_activated_event_1.RitualActivatedEvent('ritual_123');
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'RitualActivated',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt
            });
        });
    });
    (0, vitest_1.describe)('RitualDeactivatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new ritual_deactivated_event_1.RitualDeactivatedEvent('ritual_123');
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new ritual_deactivated_event_1.RitualDeactivatedEvent('ritual_123');
            (0, vitest_1.expect)(event.getEventName()).toBe('RitualDeactivated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new ritual_deactivated_event_1.RitualDeactivatedEvent('ritual_123');
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'RitualDeactivated',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt
            });
        });
    });
    (0, vitest_1.describe)('ParticipantJoinedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_123', 'profile_456', 42);
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.profileId).toBe('profile_456');
            (0, vitest_1.expect)(event.participantCount).toBe(42);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_1', 'profile_1', 1);
            (0, vitest_1.expect)(event.getEventName()).toBe('ParticipantJoined');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_123', 'profile_456', 100);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'ParticipantJoined',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt,
                profileId: 'profile_456',
                participantCount: 100
            });
        });
        (0, vitest_1.it)('should handle first participant', () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_new', 'profile_1', 1);
            (0, vitest_1.expect)(event.participantCount).toBe(1);
        });
    });
    (0, vitest_1.describe)('ParticipantLeftEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const event = new participant_left_event_1.ParticipantLeftEvent('ritual_123', 'profile_456', 41);
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.profileId).toBe('profile_456');
            (0, vitest_1.expect)(event.participantCount).toBe(41);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new participant_left_event_1.ParticipantLeftEvent('ritual_1', 'profile_1', 0);
            (0, vitest_1.expect)(event.getEventName()).toBe('ParticipantLeft');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const event = new participant_left_event_1.ParticipantLeftEvent('ritual_123', 'profile_456', 50);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'ParticipantLeft',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt,
                profileId: 'profile_456',
                participantCount: 50
            });
        });
        (0, vitest_1.it)('should handle last participant leaving', () => {
            const event = new participant_left_event_1.ParticipantLeftEvent('ritual_123', 'profile_last', 0);
            (0, vitest_1.expect)(event.participantCount).toBe(0);
        });
    });
    (0, vitest_1.describe)('MilestoneCompletedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            const rewards = [
                { type: 'badge', value: 'Gold Star', description: 'Completed 10 days' },
                { type: 'points', value: 100, description: '100 bonus points' }
            ];
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_123', 'milestone_1', '10 Day Streak', rewards);
            (0, vitest_1.expect)(event.aggregateId).toBe('ritual_123');
            (0, vitest_1.expect)(event.milestoneId).toBe('milestone_1');
            (0, vitest_1.expect)(event.milestoneName).toBe('10 Day Streak');
            (0, vitest_1.expect)(event.rewards).toEqual(rewards);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('r1', 'm1', 'First Step', []);
            (0, vitest_1.expect)(event.getEventName()).toBe('MilestoneCompleted');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            const rewards = [{ type: 'badge', value: 'Champion', description: 'Top performer' }];
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_123', 'milestone_1', 'Champion', rewards);
            const data = event.toData();
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'MilestoneCompleted',
                aggregateId: 'ritual_123',
                occurredAt: event.occurredAt,
                milestoneId: 'milestone_1',
                milestoneName: 'Champion',
                rewards
            });
        });
        (0, vitest_1.it)('should handle empty rewards array', () => {
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('r1', 'm1', 'Basic Achievement', []);
            (0, vitest_1.expect)(event.rewards).toEqual([]);
            (0, vitest_1.expect)(event.toData().rewards).toEqual([]);
        });
        (0, vitest_1.it)('should handle multiple rewards', () => {
            const rewards = [
                { type: 'badge', value: 'Gold', description: 'Top tier' },
                { type: 'points', value: 500, description: 'Bonus points' },
                { type: 'title', value: 'Champion', description: 'Special title' }
            ];
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('r1', 'm1', 'Ultimate', rewards);
            (0, vitest_1.expect)(event.rewards).toHaveLength(3);
        });
    });
});
//# sourceMappingURL=ritual-events.test.js.map