"use strict";
/**
 * Profile Domain Events Tests
 * Tests for profile event classes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_created_event_1 = require("../profile-created.event");
const profile_onboarded_event_1 = require("../profile-onboarded.event");
(0, vitest_1.describe)('Profile Domain Events', () => {
    (0, vitest_1.describe)('ProfileCreatedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            // Arrange & Act
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_123', 'john_doe', 'john@buffalo.edu', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(event.aggregateId).toBe('profile_123');
            (0, vitest_1.expect)(event.handle).toBe('john_doe');
            (0, vitest_1.expect)(event.email).toBe('john@buffalo.edu');
            (0, vitest_1.expect)(event.campusId).toBe('ub-buffalo');
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            // Arrange & Act
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_123', 'john_doe', 'john@buffalo.edu', 'ub-buffalo');
            // Assert
            (0, vitest_1.expect)(event.eventType).toBe('ProfileCreated');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            // Arrange
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_123', 'john_doe', 'john@buffalo.edu', 'ub-buffalo');
            // Act
            const data = event.toData();
            // Assert
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'ProfileCreated',
                aggregateId: 'profile_123',
                occurredAt: event.occurredAt,
                handle: 'john_doe',
                email: 'john@buffalo.edu',
                campusId: 'ub-buffalo'
            });
        });
    });
    (0, vitest_1.describe)('ProfileOnboardedEvent', () => {
        (0, vitest_1.it)('should create event with correct properties', () => {
            // Arrange & Act
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_123', 'ub-buffalo', ['coding', 'sports', 'music']);
            // Assert
            (0, vitest_1.expect)(event.aggregateId).toBe('profile_123');
            (0, vitest_1.expect)(event.campusId).toBe('ub-buffalo');
            (0, vitest_1.expect)(event.interests).toEqual(['coding', 'sports', 'music']);
            (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should have correct event type', () => {
            // Arrange & Act
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_123', 'ub-buffalo', ['coding']);
            // Assert
            (0, vitest_1.expect)(event.eventType).toBe('ProfileOnboarded');
        });
        (0, vitest_1.it)('should serialize to data correctly', () => {
            // Arrange
            const interests = ['coding', 'sports'];
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_123', 'ub-buffalo', interests);
            // Act
            const data = event.toData();
            // Assert
            (0, vitest_1.expect)(data).toEqual({
                eventType: 'ProfileOnboarded',
                aggregateId: 'profile_123',
                occurredAt: event.occurredAt,
                campusId: 'ub-buffalo',
                interests
            });
        });
        (0, vitest_1.it)('should handle empty interests array', () => {
            // Arrange & Act
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_123', 'ub-buffalo', []);
            // Assert
            (0, vitest_1.expect)(event.interests).toEqual([]);
            (0, vitest_1.expect)(event.toData().interests).toEqual([]);
        });
    });
});
//# sourceMappingURL=profile-events.test.js.map