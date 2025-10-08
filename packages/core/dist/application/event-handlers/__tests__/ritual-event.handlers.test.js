"use strict";
/**
 * Ritual Event Handler Tests
 * Tests for ritual domain event handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ritual_event_handlers_1 = require("../ritual-event.handlers");
const ritual_created_event_1 = require("../../../domain/rituals/events/ritual-created.event");
const participant_joined_event_1 = require("../../../domain/rituals/events/participant-joined.event");
const milestone_completed_event_1 = require("../../../domain/rituals/events/milestone-completed.event");
const ritual_activated_event_1 = require("../../../domain/rituals/events/ritual-activated.event");
(0, vitest_1.describe)('Ritual Event Handlers', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('handleRitualCreated', () => {
        (0, vitest_1.it)('should handle ritual created event', async () => {
            // Arrange
            const event = new ritual_created_event_1.RitualCreatedEvent('ritual_123', 'Daily Fitness Challenge', 'health', 'creator_456');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, ritual_event_handlers_1.handleRitualCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[RitualEventHandler] Ritual created: Daily Fitness Challenge by creator_456');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle different ritual types', async () => {
            const types = ['health', 'social', 'academic', 'campus'];
            for (const type of types) {
                const event = new ritual_created_event_1.RitualCreatedEvent(`ritual_${type}`, `Test ${type} Ritual`, type, 'creator_123');
                const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
                await (0, ritual_event_handlers_1.handleRitualCreated)(event);
                (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            }
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new ritual_created_event_1.RitualCreatedEvent('ritual_789', 'Study Together', 'academic', 'prof_101');
            await (0, vitest_1.expect)((0, ritual_event_handlers_1.handleRitualCreated)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleParticipantJoined', () => {
        (0, vitest_1.it)('should handle participant joined event', async () => {
            // Arrange
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_123', 'profile_456', 10);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, ritual_event_handlers_1.handleParticipantJoined)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[RitualEventHandler] Participant profile_456 joined ritual ritual_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track participant count', async () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_popular', 'profile_999', 100);
            await (0, ritual_event_handlers_1.handleParticipantJoined)(event);
            (0, vitest_1.expect)(event.participantCount).toBe(100);
        });
        (0, vitest_1.it)('should handle first participant', async () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_new', 'profile_first', 1);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, ritual_event_handlers_1.handleParticipantJoined)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.participantCount).toBe(1);
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new participant_joined_event_1.ParticipantJoinedEvent('ritual_456', 'profile_789', 25);
            await (0, vitest_1.expect)((0, ritual_event_handlers_1.handleParticipantJoined)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleMilestoneCompleted', () => {
        (0, vitest_1.it)('should handle milestone completed event', async () => {
            // Arrange
            const rewards = [
                { type: 'badge', value: 'Gold Star', description: '10 day streak' },
                { type: 'points', value: 100, description: 'Bonus points' }
            ];
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_123', 'milestone_456', '10 Day Streak', rewards);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, ritual_event_handlers_1.handleMilestoneCompleted)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[RitualEventHandler] Milestone 10 Day Streak (milestone_456) completed in ritual ritual_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle milestone with no rewards', async () => {
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_789', 'milestone_basic', 'First Day Complete', []);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, ritual_event_handlers_1.handleMilestoneCompleted)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.rewards).toEqual([]);
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle milestone with multiple rewards', async () => {
            const rewards = [
                { type: 'badge', value: 'Champion', description: 'Top performer' },
                { type: 'points', value: 500, description: 'Achievement bonus' },
                { type: 'title', value: 'Ritual Master', description: 'Special title' }
            ];
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_epic', 'milestone_legend', 'Legendary Achievement', rewards);
            await (0, ritual_event_handlers_1.handleMilestoneCompleted)(event);
            (0, vitest_1.expect)(event.rewards).toHaveLength(3);
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new milestone_completed_event_1.MilestoneCompletedEvent('ritual_456', 'milestone_789', 'Week Complete', [{ type: 'badge', value: 'Week Warrior', description: 'Completed week' }]);
            await (0, vitest_1.expect)((0, ritual_event_handlers_1.handleMilestoneCompleted)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleRitualActivated', () => {
        (0, vitest_1.it)('should handle ritual activated event', async () => {
            // Arrange
            const event = new ritual_activated_event_1.RitualActivatedEvent('ritual_123');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, ritual_event_handlers_1.handleRitualActivated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[RitualEventHandler] Ritual activated: ritual_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle multiple ritual activations', async () => {
            const ritualIds = ['ritual_1', 'ritual_2', 'ritual_3'];
            for (const id of ritualIds) {
                const event = new ritual_activated_event_1.RitualActivatedEvent(id);
                const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
                await (0, ritual_event_handlers_1.handleRitualActivated)(event);
                (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            }
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new ritual_activated_event_1.RitualActivatedEvent('ritual_new_active');
            await (0, vitest_1.expect)((0, ritual_event_handlers_1.handleRitualActivated)(event)).resolves.toBeUndefined();
        });
    });
});
//# sourceMappingURL=ritual-event.handlers.test.js.map