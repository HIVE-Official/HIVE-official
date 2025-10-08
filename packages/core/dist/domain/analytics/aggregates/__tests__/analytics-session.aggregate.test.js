"use strict";
/**
 * AnalyticsSession Aggregate Tests
 * Comprehensive test suite for AnalyticsSession domain logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const analytics_session_1 = require("../analytics-session");
// Mock crypto.randomUUID for consistent testing
const mockUUID = 'test-session-id-123';
vitest_1.vi.stubGlobal('crypto', {
    randomUUID: () => mockUUID
});
// Mock the EventBatchingService
vitest_1.vi.mock('../../services/event-batching.service', () => ({
    EventBatchingService: vitest_1.vi.fn().mockImplementation((batchSize, flushInterval, onFlush) => ({
        addEvent: vitest_1.vi.fn(),
        flush: vitest_1.vi.fn().mockResolvedValue(undefined),
        destroy: vitest_1.vi.fn().mockResolvedValue(undefined)
    }))
}));
// Mock the PrivacyService
vitest_1.vi.mock('../../services/privacy.service', () => ({
    PrivacyService: {
        applyPrivacySettings: vitest_1.vi.fn((event, preferences) => {
            if (preferences.analyticsOptOut)
                return null;
            if (preferences.anonymizeData) {
                return {
                    ...event,
                    userId: undefined,
                    userIdHash: 'hashed_user_id',
                    anonymized: true
                };
            }
            return event;
        }),
        removeExpiredEvents: vitest_1.vi.fn((events) => events),
        generatePrivacyReport: vitest_1.vi.fn(() => ({
            totalEvents: 2,
            anonymizedEvents: 0,
            eventsWithPII: 1,
            expiredEvents: 0,
            complianceIssues: []
        }))
    }
}));
// Use fake timers for consistent timing tests
vitest_1.vi.useFakeTimers();
(0, vitest_1.describe)('AnalyticsSession Aggregate', () => {
    let session;
    let mockFlushCallback;
    // Test data factories
    const createValidCreationEvent = () => ({
        eventId: 'creation_event_1',
        sessionId: mockUUID,
        timestamp: new Date(),
        eventType: 'tool_created',
        toolId: 'tool_123',
        spaceId: 'space_456'
    });
    const createValidFeedEvent = () => ({
        eventId: 'feed_event_1',
        sessionId: mockUUID,
        timestamp: new Date(),
        eventType: 'post_created',
        postId: 'post_123',
        spaceId: 'space_456'
    });
    const createValidOnboardingEvent = () => ({
        eventId: 'onboarding_event_1',
        sessionId: mockUUID,
        timestamp: new Date(),
        stepName: 'welcome',
        stepIndex: 0,
        isCompleted: true,
        timeSpent: 5000
    });
    (0, vitest_1.beforeEach)(() => {
        mockFlushCallback = vitest_1.vi.fn().mockResolvedValue(undefined);
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.useRealTimers();
        vitest_1.vi.useFakeTimers();
    });
    (0, vitest_1.describe)('Session Creation', () => {
        (0, vitest_1.it)('should create session with default values', () => {
            session = new analytics_session_1.AnalyticsSession();
            (0, vitest_1.expect)(session.getSessionId()).toBe(mockUUID);
            (0, vitest_1.expect)(session.getIsActive()).toBe(true);
            (0, vitest_1.expect)(session.getDuration()).toBeGreaterThanOrEqual(0);
            (0, vitest_1.expect)(session.getEvents()).toEqual([]);
        });
        (0, vitest_1.it)('should create session with user ID', () => {
            const userId = 'user_123';
            session = new analytics_session_1.AnalyticsSession(userId);
            (0, vitest_1.expect)(session.getSessionId()).toBe(mockUUID);
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.userId).toBe(userId);
        });
        (0, vitest_1.it)('should create session with privacy preferences', () => {
            const privacyPrefs = {
                analyticsOptOut: false,
                anonymizeData: true,
                retentionDays: 30
            };
            session = new analytics_session_1.AnalyticsSession('user_123', privacyPrefs);
            (0, vitest_1.expect)(session.getSessionId()).toBe(mockUUID);
            (0, vitest_1.expect)(session.getIsActive()).toBe(true);
        });
    });
    (0, vitest_1.describe)('Session Management', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
        });
        (0, vitest_1.it)('should calculate session duration', () => {
            const initialDuration = session.getDuration();
            (0, vitest_1.expect)(initialDuration).toBeGreaterThanOrEqual(0);
            // Small delay to ensure duration increases
            vitest_1.vi.advanceTimersByTime(100);
            const laterDuration = session.getDuration();
            (0, vitest_1.expect)(laterDuration).toBeGreaterThanOrEqual(initialDuration);
        });
        (0, vitest_1.it)('should end session successfully', async () => {
            (0, vitest_1.expect)(session.getIsActive()).toBe(true);
            await session.end();
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.endTime).toBeInstanceOf(Date);
        });
        (0, vitest_1.it)('should not end session twice', async () => {
            await session.end();
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
            // Should not throw error when ending again
            await session.end();
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
        });
        (0, vitest_1.it)('should destroy session and cleanup resources', async () => {
            session.setupBatching(10, 1000, mockFlushCallback);
            session.addEvent(createValidCreationEvent());
            await session.destroy();
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
            (0, vitest_1.expect)(session.getEvents()).toEqual([]);
        });
    });
    (0, vitest_1.describe)('Event Management', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
        });
        (0, vitest_1.it)('should add creation event to session', () => {
            const event = createValidCreationEvent();
            session.addEvent(event);
            const events = session.getEvents();
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0]).toMatchObject({
                ...event,
                sessionId: mockUUID
            });
        });
        (0, vitest_1.it)('should add feed event to session', () => {
            const event = createValidFeedEvent();
            session.addEvent(event);
            const events = session.getEvents();
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0].eventType).toBe('post_created');
        });
        (0, vitest_1.it)('should add onboarding event to session', () => {
            const event = createValidOnboardingEvent();
            session.addEvent(event);
            const events = session.getEvents();
            (0, vitest_1.expect)(events).toHaveLength(1);
            (0, vitest_1.expect)(events[0]).toMatchObject(event);
        });
        (0, vitest_1.it)('should not add events to inactive session', async () => {
            await session.end();
            (0, vitest_1.expect)(() => {
                session.addEvent(createValidCreationEvent());
            }).toThrow('Cannot add events to inactive session');
        });
        (0, vitest_1.it)('should add multiple events of different types', () => {
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
            session.addEvent(createValidOnboardingEvent());
            const events = session.getEvents();
            (0, vitest_1.expect)(events).toHaveLength(3);
            const eventTypes = events.map(e => 'eventType' in e ? e.eventType : e.stepName);
            (0, vitest_1.expect)(eventTypes).toContain('tool_created');
            (0, vitest_1.expect)(eventTypes).toContain('post_created');
            (0, vitest_1.expect)(eventTypes).toContain('welcome');
        });
        (0, vitest_1.it)('should ensure events have session ID', () => {
            const event = createValidCreationEvent();
            delete event.sessionId; // Remove sessionId to test it gets added
            session.addEvent(event);
            const events = session.getEvents();
            (0, vitest_1.expect)(events[0].sessionId).toBe(mockUUID);
        });
    });
    (0, vitest_1.describe)('Event Filtering and Retrieval', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
            session.addEvent(createValidOnboardingEvent());
        });
        (0, vitest_1.it)('should get events by creation event type', () => {
            const creationEvents = session.getEventsByType('tool_created');
            (0, vitest_1.expect)(creationEvents).toHaveLength(1);
            (0, vitest_1.expect)(creationEvents[0]).toMatchObject({
                eventType: 'tool_created'
            });
        });
        (0, vitest_1.it)('should get events by feed event type', () => {
            const feedEvents = session.getEventsByType('post_created');
            (0, vitest_1.expect)(feedEvents).toHaveLength(1);
            (0, vitest_1.expect)(feedEvents[0]).toMatchObject({
                eventType: 'post_created'
            });
        });
        (0, vitest_1.it)('should get events by onboarding step name', () => {
            const onboardingEvents = session.getEventsByType('welcome');
            (0, vitest_1.expect)(onboardingEvents).toHaveLength(1);
            (0, vitest_1.expect)(onboardingEvents[0]).toMatchObject({
                stepName: 'welcome'
            });
        });
        (0, vitest_1.it)('should return empty array for non-existent event type', () => {
            const events = session.getEventsByType('non_existent_type');
            (0, vitest_1.expect)(events).toHaveLength(0);
        });
    });
    (0, vitest_1.describe)('Event Batching', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
        });
        (0, vitest_1.it)('should setup event batching', () => {
            session.setupBatching(50, 5000, mockFlushCallback);
            // Adding an event should work without errors
            session.addEvent(createValidCreationEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(1);
        });
        (0, vitest_1.it)('should flush events when session ends', async () => {
            session.setupBatching(10, 1000, mockFlushCallback);
            session.addEvent(createValidCreationEvent());
            await session.end();
            // The session should call flush on the batching service, not the callback directly
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
        });
        (0, vitest_1.it)('should handle batching service during destroy', async () => {
            session.setupBatching(10, 1000, mockFlushCallback);
            session.addEvent(createValidCreationEvent());
            await session.destroy();
            // The session should call destroy on the batching service and cleanup events
            (0, vitest_1.expect)(session.getIsActive()).toBe(false);
            (0, vitest_1.expect)(session.getEvents()).toEqual([]);
        });
    });
    (0, vitest_1.describe)('Privacy Settings', () => {
        (0, vitest_1.it)('should filter out events when user opts out', () => {
            const privacyPrefs = {
                analyticsOptOut: true
            };
            session = new analytics_session_1.AnalyticsSession('user_123', privacyPrefs);
            session.addEvent(createValidCreationEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(0);
        });
        (0, vitest_1.it)('should anonymize events when privacy setting enabled', () => {
            const privacyPrefs = {
                anonymizeData: true
            };
            session = new analytics_session_1.AnalyticsSession('user_123', privacyPrefs);
            const event = createValidCreationEvent();
            event.userId = 'user_123';
            session.addEvent(event);
            const events = session.getEvents();
            (0, vitest_1.expect)(events[0].userId).toBeUndefined();
            (0, vitest_1.expect)(events[0].anonymized).toBe(true);
            (0, vitest_1.expect)(events[0].userIdHash).toBeDefined();
        });
        (0, vitest_1.it)('should update privacy preferences', () => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            // Add event normally
            session.addEvent(createValidCreationEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(1);
            // Update privacy preferences to opt out
            session.updatePrivacyPreferences({ analyticsOptOut: true });
            // New events should be filtered out
            session.addEvent(createValidFeedEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(1); // Still only 1 event
        });
    });
    (0, vitest_1.describe)('Session Statistics', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
        });
        (0, vitest_1.it)('should generate session statistics', () => {
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
            session.addEvent(createValidOnboardingEvent());
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats).toMatchObject({
                sessionId: mockUUID,
                userId: 'user_123',
                startTime: vitest_1.expect.any(Date),
                duration: vitest_1.expect.any(Number),
                eventCount: 3,
                isActive: true
            });
            (0, vitest_1.expect)(stats.eventsByType).toEqual({
                'tool_created': 1,
                'post_created': 1,
                'welcome': 1
            });
        });
        (0, vitest_1.it)('should include end time in statistics after session ends', async () => {
            await session.end();
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.endTime).toBeInstanceOf(Date);
            (0, vitest_1.expect)(stats.isActive).toBe(false);
        });
        (0, vitest_1.it)('should track event counts by type correctly', () => {
            // Add multiple events of same type
            session.addEvent(createValidCreationEvent());
            session.addEvent({
                ...createValidCreationEvent(),
                eventId: 'creation_event_2',
                eventType: 'tool_updated'
            });
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.eventsByType).toEqual({
                'tool_created': 1,
                'tool_updated': 1
            });
        });
    });
    (0, vitest_1.describe)('Privacy Compliance', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
        });
        (0, vitest_1.it)('should generate privacy report', () => {
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
            const report = session.generatePrivacyReport();
            (0, vitest_1.expect)(report).toMatchObject({
                sessionId: mockUUID,
                totalEvents: vitest_1.expect.any(Number),
                anonymizedEvents: vitest_1.expect.any(Number),
                eventsWithPII: vitest_1.expect.any(Number),
                expiredEvents: vitest_1.expect.any(Number),
                complianceIssues: vitest_1.expect.any(Array)
            });
        });
        (0, vitest_1.it)('should cleanup expired events', () => {
            // Add events (they would be expired in a real scenario with old timestamps)
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
            const beforeCleanup = session.getEvents().length;
            session.cleanupExpiredEvents(30); // 30 days retention
            const afterCleanup = session.getEvents().length;
            // In this test case, events are not actually expired, so count should remain same
            (0, vitest_1.expect)(afterCleanup).toBe(beforeCleanup);
        });
    });
    (0, vitest_1.describe)('Data Export', () => {
        (0, vitest_1.beforeEach)(() => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            session.addEvent(createValidCreationEvent());
            session.addEvent(createValidFeedEvent());
        });
        (0, vitest_1.it)('should export session data', () => {
            const exportData = session.export();
            (0, vitest_1.expect)(exportData).toMatchObject({
                sessionId: mockUUID,
                userId: 'user_123',
                startTime: vitest_1.expect.any(Date),
                isActive: true,
                events: vitest_1.expect.any(Array),
                statistics: vitest_1.expect.any(Object)
            });
            (0, vitest_1.expect)(exportData.events).toHaveLength(2);
            (0, vitest_1.expect)(exportData.statistics.eventCount).toBe(2);
        });
        (0, vitest_1.it)('should export session data after ending', async () => {
            await session.end();
            const exportData = session.export();
            (0, vitest_1.expect)(exportData.isActive).toBe(false);
            (0, vitest_1.expect)(exportData.endTime).toBeInstanceOf(Date);
        });
    });
    (0, vitest_1.describe)('Edge Cases and Error Handling', () => {
        (0, vitest_1.it)('should handle session creation without user ID', () => {
            session = new analytics_session_1.AnalyticsSession();
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.userId).toBeUndefined();
        });
        (0, vitest_1.it)('should handle empty privacy preferences', () => {
            session = new analytics_session_1.AnalyticsSession('user_123', {});
            session.addEvent(createValidCreationEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle events without optional fields', () => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            const minimalEvent = {
                eventId: 'minimal_event',
                sessionId: mockUUID,
                timestamp: new Date(),
                eventType: 'tool_created'
            };
            session.addEvent(minimalEvent);
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle statistics generation with no events', () => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            const stats = session.getStatistics();
            (0, vitest_1.expect)(stats.eventCount).toBe(0);
            (0, vitest_1.expect)(stats.eventsByType).toEqual({});
        });
        (0, vitest_1.it)('should handle batching setup after adding events', () => {
            session = new analytics_session_1.AnalyticsSession('user_123');
            session.addEvent(createValidCreationEvent());
            // Should not throw error
            session.setupBatching(10, 1000, mockFlushCallback);
            // Should still be able to add more events
            session.addEvent(createValidFeedEvent());
            (0, vitest_1.expect)(session.getEvents()).toHaveLength(2);
        });
    });
});
//# sourceMappingURL=analytics-session.aggregate.test.js.map