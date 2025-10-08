"use strict";
/**
 * Space Event Handler Tests
 * Tests for space domain event handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_event_handlers_1 = require("../space-event.handlers");
const space_created_event_1 = require("../../../domain/spaces/events/space-created.event");
const member_joined_event_1 = require("../../../domain/spaces/events/member-joined.event");
const post_created_event_1 = require("../../../domain/spaces/events/post-created.event");
const member_removed_event_1 = require("../../../domain/spaces/events/member-removed.event");
// Mock repository factory
vitest_1.vi.mock('../../../infrastructure/repositories/factory', () => ({
    getProfileRepository: vitest_1.vi.fn(() => mockProfileRepo),
    getFeedRepository: vitest_1.vi.fn(() => mockFeedRepo),
    getSpaceRepository: vitest_1.vi.fn(() => mockSpaceRepo)
}));
// Mock repositories
const mockProfileRepo = {
    findById: vitest_1.vi.fn(),
    save: vitest_1.vi.fn()
};
const mockFeedRepo = {
    saveFeed: vitest_1.vi.fn(),
    findByUserId: vitest_1.vi.fn(),
    addSpaceToFeed: vitest_1.vi.fn(),
    removeSpaceFromFeed: vitest_1.vi.fn()
};
const mockSpaceRepo = {
    findById: vitest_1.vi.fn(),
    save: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn()
};
(0, vitest_1.describe)('Space Event Handlers', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('handleSpaceCreated', () => {
        (0, vitest_1.it)('should handle space created event', async () => {
            // Arrange
            const event = new space_created_event_1.SpaceCreatedEvent('space_123', 'Computer Science Club', 'student_org', 'creator_456');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, space_event_handlers_1.handleSpaceCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[SpaceEventHandler] Space created: Computer Science Club by creator_456');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle different space categories', async () => {
            const categories = ['student_org', 'academic', 'social', 'sports'];
            for (const category of categories) {
                const event = new space_created_event_1.SpaceCreatedEvent(`space_${category}`, `Test ${category}`, category, 'creator_123');
                const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
                await (0, space_event_handlers_1.handleSpaceCreated)(event);
                (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            }
        });
    });
    (0, vitest_1.describe)('handleMemberJoined', () => {
        (0, vitest_1.it)('should handle member joined event', async () => {
            // Arrange
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_456', 'member', 10);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, space_event_handlers_1.handleMemberJoined)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[SpaceEventHandler] Member profile_456 joined space space_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            // Arrange
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_456', 'member', 5);
            // Act & Assert - should not throw
            await (0, vitest_1.expect)((0, space_event_handlers_1.handleMemberJoined)(event)).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should handle different member roles', async () => {
            const roles = ['admin', 'moderator', 'member'];
            for (const role of roles) {
                const event = new member_joined_event_1.MemberJoinedEvent('space_123', `profile_${role}`, role, 1);
                const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
                await (0, space_event_handlers_1.handleMemberJoined)(event);
                (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            }
        });
        (0, vitest_1.it)('should track member count changes', async () => {
            const event = new member_joined_event_1.MemberJoinedEvent('space_123', 'profile_789', 'member', 25);
            await (0, space_event_handlers_1.handleMemberJoined)(event);
            (0, vitest_1.expect)(event.memberCount).toBe(25);
        });
    });
    (0, vitest_1.describe)('handlePostCreated', () => {
        (0, vitest_1.it)('should handle post created event', async () => {
            // Arrange
            const event = new post_created_event_1.PostCreatedEvent('space_123', 'post_456', 'author_789', 42);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, space_event_handlers_1.handlePostCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[SpaceEventHandler] Post created in space space_123 by author_789');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track post count', async () => {
            const event = new post_created_event_1.PostCreatedEvent('space_123', 'post_999', 'author_111', 100);
            await (0, space_event_handlers_1.handlePostCreated)(event);
            (0, vitest_1.expect)(event.postCount).toBe(100);
        });
    });
    (0, vitest_1.describe)('handleMemberRemoved', () => {
        (0, vitest_1.it)('should handle member removed event', async () => {
            // Arrange
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_456', 9);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, space_event_handlers_1.handleMemberRemoved)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[SpaceEventHandler] Member profile_456 removed from space space_123');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track member count after removal', async () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_123', 'profile_leaving', 15);
            await (0, space_event_handlers_1.handleMemberRemoved)(event);
            (0, vitest_1.expect)(event.memberCount).toBe(15);
        });
        (0, vitest_1.it)('should handle space with zero members', async () => {
            const event = new member_removed_event_1.MemberRemovedEvent('space_empty', 'last_member', 0);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, space_event_handlers_1.handleMemberRemoved)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.memberCount).toBe(0);
            consoleLogSpy.mockRestore();
        });
    });
});
//# sourceMappingURL=space-event.handlers.test.js.map