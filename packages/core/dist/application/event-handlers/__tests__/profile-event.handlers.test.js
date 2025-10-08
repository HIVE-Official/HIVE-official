"use strict";
/**
 * Profile Event Handler Tests
 * Tests for profile domain event handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const profile_event_handlers_1 = require("../profile-event.handlers");
const profile_created_event_1 = require("../../../domain/profile/events/profile-created.event");
const profile_onboarded_event_1 = require("../../../domain/profile/events/profile-onboarded.event");
const campus_id_value_1 = require("../../../domain/profile/value-objects/campus-id.value");
const enhanced_feed_1 = require("../../../domain/feed/enhanced-feed");
const Result_1 = require("../../../domain/shared/base/Result");
// Mock repository factory
vitest_1.vi.mock('../../../infrastructure/repositories/factory', () => ({
    getFeedRepository: vitest_1.vi.fn(() => mockFeedRepo),
    getSpaceRepository: vitest_1.vi.fn(() => mockSpaceRepo)
}));
// Mock repositories
const mockFeedRepo = {
    saveFeed: vitest_1.vi.fn(),
    findByUserId: vitest_1.vi.fn(),
    getFeedContent: vitest_1.vi.fn(),
    save: vitest_1.vi.fn()
};
const mockSpaceRepo = {
    findByCampus: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    save: vitest_1.vi.fn()
};
(0, vitest_1.describe)('Profile Event Handlers', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('handleProfileCreated', () => {
        (0, vitest_1.it)('should create default feed when profile is created', async () => {
            // Arrange
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_test_123', 'testuser', 'test@buffalo.edu', 'ub-buffalo');
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            // Act
            await (0, profile_event_handlers_1.handleProfileCreated)(event);
            // Assert
            (0, vitest_1.expect)(mockFeedRepo.saveFeed).toHaveBeenCalledTimes(1);
            const feedArg = mockFeedRepo.saveFeed.mock.calls[0][0];
            (0, vitest_1.expect)(feedArg).toBeInstanceOf(enhanced_feed_1.EnhancedFeed);
        });
        (0, vitest_1.it)('should handle errors gracefully when feed creation fails', async () => {
            // Arrange
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_test_123', 'testuser', 'test@buffalo.edu', 'ub-buffalo');
            mockFeedRepo.saveFeed.mockRejectedValue(new Error('Database error'));
            // Spy on console.error
            const consoleErrorSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            await (0, profile_event_handlers_1.handleProfileCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleErrorSpy).toHaveBeenCalledWith('[ProfileEventHandler] Failed to handle profile created:', vitest_1.expect.any(Error));
            consoleErrorSpy.mockRestore();
        });
        (0, vitest_1.it)('should log profile creation event', async () => {
            // Arrange
            const event = new profile_created_event_1.ProfileCreatedEvent('profile_test_123', 'testuser', 'test@buffalo.edu', 'ub-buffalo');
            mockFeedRepo.saveFeed.mockResolvedValue(Result_1.Result.ok(undefined));
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, profile_event_handlers_1.handleProfileCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ProfileEventHandler] Profile created: profile_test_123');
            consoleLogSpy.mockRestore();
        });
    });
    (0, vitest_1.describe)('handleProfileOnboarded', () => {
        (0, vitest_1.it)('should handle profile onboarded event', async () => {
            // Arrange
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_test_123', 'ub-buffalo', ['coding', 'sports']);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, profile_event_handlers_1.handleProfileOnboarded)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ProfileEventHandler] Profile onboarded: profile_test_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle errors gracefully when processing fails', async () => {
            // Arrange
            const event = new profile_onboarded_event_1.ProfileOnboardedEvent('profile_test_123', 'ub-buffalo', ['coding']);
            // Force an error by mocking CampusId
            vitest_1.vi.spyOn(campus_id_value_1.CampusId, 'createUBBuffalo').mockImplementation(() => {
                throw new Error('Test error');
            });
            const consoleErrorSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            // Act
            await (0, profile_event_handlers_1.handleProfileOnboarded)(event);
            // Assert
            (0, vitest_1.expect)(consoleErrorSpy).toHaveBeenCalledWith('[ProfileEventHandler] Failed to handle profile onboarded:', vitest_1.expect.any(Error));
            consoleErrorSpy.mockRestore();
            vitest_1.vi.restoreAllMocks();
        });
    });
});
//# sourceMappingURL=profile-event.handlers.test.js.map