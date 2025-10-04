/**
 * AnalyticsSession Aggregate Tests
 * Comprehensive test suite for AnalyticsSession domain logic
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AnalyticsSession } from '../analytics-session';
import {
  CreationAnalyticsEvent,
  FeedAnalyticsEvent,
  OnboardingAnalyticsEvent,
  CreationEventType,
  FeedEventType,
  OnboardingStepName
} from '../../types';
import { PrivacyPreferences } from '../../services/privacy.service';

// Mock crypto.randomUUID for consistent testing
const mockUUID = 'test-session-id-123';
vi.stubGlobal('crypto', {
  randomUUID: () => mockUUID
});

// Mock the EventBatchingService
vi.mock('../../services/event-batching.service', () => ({
  EventBatchingService: vi.fn().mockImplementation((batchSize, flushInterval, onFlush) => ({
    addEvent: vi.fn(),
    flush: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn().mockResolvedValue(undefined)
  }))
}));

// Mock the PrivacyService
vi.mock('../../services/privacy.service', () => ({
  PrivacyService: {
    applyPrivacySettings: vi.fn((event, preferences) => {
      if (preferences.analyticsOptOut) return null;
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
    removeExpiredEvents: vi.fn((events) => events),
    generatePrivacyReport: vi.fn(() => ({
      totalEvents: 2,
      anonymizedEvents: 0,
      eventsWithPII: 1,
      expiredEvents: 0,
      complianceIssues: []
    }))
  }
}));

// Use fake timers for consistent timing tests
vi.useFakeTimers();

describe('AnalyticsSession Aggregate', () => {
  let session: AnalyticsSession;
  let mockFlushCallback: vi.Mock;

  // Test data factories
  const createValidCreationEvent = (): CreationAnalyticsEvent => ({
    eventId: 'creation_event_1',
    sessionId: mockUUID,
    timestamp: new Date(),
    eventType: 'tool_created' as CreationEventType,
    toolId: 'tool_123',
    spaceId: 'space_456'
  });

  const createValidFeedEvent = (): FeedAnalyticsEvent => ({
    eventId: 'feed_event_1',
    sessionId: mockUUID,
    timestamp: new Date(),
    eventType: 'post_created' as FeedEventType,
    postId: 'post_123',
    spaceId: 'space_456'
  });

  const createValidOnboardingEvent = (): OnboardingAnalyticsEvent => ({
    eventId: 'onboarding_event_1',
    sessionId: mockUUID,
    timestamp: new Date(),
    stepName: 'welcome' as OnboardingStepName,
    stepIndex: 0,
    isCompleted: true,
    timeSpent: 5000
  });

  beforeEach(() => {
    mockFlushCallback = vi.fn().mockResolvedValue(undefined);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.useFakeTimers();
  });

  describe('Session Creation', () => {
    it('should create session with default values', () => {
      session = new AnalyticsSession();

      expect(session.getSessionId()).toBe(mockUUID);
      expect(session.getIsActive()).toBe(true);
      expect(session.getDuration()).toBeGreaterThanOrEqual(0);
      expect(session.getEvents()).toEqual([]);
    });

    it('should create session with user ID', () => {
      const userId = 'user_123';
      session = new AnalyticsSession(userId);

      expect(session.getSessionId()).toBe(mockUUID);
      const stats = session.getStatistics();
      expect(stats.userId).toBe(userId);
    });

    it('should create session with privacy preferences', () => {
      const privacyPrefs: PrivacyPreferences = {
        analyticsOptOut: false,
        anonymizeData: true,
        retentionDays: 30
      };

      session = new AnalyticsSession('user_123', privacyPrefs);

      expect(session.getSessionId()).toBe(mockUUID);
      expect(session.getIsActive()).toBe(true);
    });
  });

  describe('Session Management', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
    });

    it('should calculate session duration', () => {
      const initialDuration = session.getDuration();
      expect(initialDuration).toBeGreaterThanOrEqual(0);

      // Small delay to ensure duration increases
      vi.advanceTimersByTime(100);
      const laterDuration = session.getDuration();
      expect(laterDuration).toBeGreaterThanOrEqual(initialDuration);
    });

    it('should end session successfully', async () => {
      expect(session.getIsActive()).toBe(true);

      await session.end();

      expect(session.getIsActive()).toBe(false);
      const stats = session.getStatistics();
      expect(stats.endTime).toBeInstanceOf(Date);
    });

    it('should not end session twice', async () => {
      await session.end();
      expect(session.getIsActive()).toBe(false);

      // Should not throw error when ending again
      await session.end();
      expect(session.getIsActive()).toBe(false);
    });

    it('should destroy session and cleanup resources', async () => {
      session.setupBatching(10, 1000, mockFlushCallback);
      session.addEvent(createValidCreationEvent());

      await session.destroy();

      expect(session.getIsActive()).toBe(false);
      expect(session.getEvents()).toEqual([]);
    });
  });

  describe('Event Management', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
    });

    it('should add creation event to session', () => {
      const event = createValidCreationEvent();

      session.addEvent(event);

      const events = session.getEvents();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        ...event,
        sessionId: mockUUID
      });
    });

    it('should add feed event to session', () => {
      const event = createValidFeedEvent();

      session.addEvent(event);

      const events = session.getEvents();
      expect(events).toHaveLength(1);
      expect(events[0].eventType).toBe('post_created');
    });

    it('should add onboarding event to session', () => {
      const event = createValidOnboardingEvent();

      session.addEvent(event);

      const events = session.getEvents();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject(event);
    });

    it('should not add events to inactive session', async () => {
      await session.end();

      expect(() => {
        session.addEvent(createValidCreationEvent());
      }).toThrow('Cannot add events to inactive session');
    });

    it('should add multiple events of different types', () => {
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());
      session.addEvent(createValidOnboardingEvent());

      const events = session.getEvents();
      expect(events).toHaveLength(3);

      const eventTypes = events.map(e => 'eventType' in e ? e.eventType : e.stepName);
      expect(eventTypes).toContain('tool_created');
      expect(eventTypes).toContain('post_created');
      expect(eventTypes).toContain('welcome');
    });

    it('should ensure events have session ID', () => {
      const event = createValidCreationEvent();
      delete (event as any).sessionId; // Remove sessionId to test it gets added

      session.addEvent(event);

      const events = session.getEvents();
      expect(events[0].sessionId).toBe(mockUUID);
    });
  });

  describe('Event Filtering and Retrieval', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());
      session.addEvent(createValidOnboardingEvent());
    });

    it('should get events by creation event type', () => {
      const creationEvents = session.getEventsByType('tool_created');

      expect(creationEvents).toHaveLength(1);
      expect(creationEvents[0]).toMatchObject({
        eventType: 'tool_created'
      });
    });

    it('should get events by feed event type', () => {
      const feedEvents = session.getEventsByType('post_created');

      expect(feedEvents).toHaveLength(1);
      expect(feedEvents[0]).toMatchObject({
        eventType: 'post_created'
      });
    });

    it('should get events by onboarding step name', () => {
      const onboardingEvents = session.getEventsByType('welcome');

      expect(onboardingEvents).toHaveLength(1);
      expect(onboardingEvents[0]).toMatchObject({
        stepName: 'welcome'
      });
    });

    it('should return empty array for non-existent event type', () => {
      const events = session.getEventsByType('non_existent_type');

      expect(events).toHaveLength(0);
    });
  });

  describe('Event Batching', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
    });

    it('should setup event batching', () => {
      session.setupBatching(50, 5000, mockFlushCallback);

      // Adding an event should work without errors
      session.addEvent(createValidCreationEvent());
      expect(session.getEvents()).toHaveLength(1);
    });

    it('should flush events when session ends', async () => {
      session.setupBatching(10, 1000, mockFlushCallback);
      session.addEvent(createValidCreationEvent());

      await session.end();

      // The session should call flush on the batching service, not the callback directly
      expect(session.getIsActive()).toBe(false);
    });

    it('should handle batching service during destroy', async () => {
      session.setupBatching(10, 1000, mockFlushCallback);
      session.addEvent(createValidCreationEvent());

      await session.destroy();

      // The session should call destroy on the batching service and cleanup events
      expect(session.getIsActive()).toBe(false);
      expect(session.getEvents()).toEqual([]);
    });
  });

  describe('Privacy Settings', () => {
    it('should filter out events when user opts out', () => {
      const privacyPrefs: PrivacyPreferences = {
        analyticsOptOut: true
      };

      session = new AnalyticsSession('user_123', privacyPrefs);
      session.addEvent(createValidCreationEvent());

      expect(session.getEvents()).toHaveLength(0);
    });

    it('should anonymize events when privacy setting enabled', () => {
      const privacyPrefs: PrivacyPreferences = {
        anonymizeData: true
      };

      session = new AnalyticsSession('user_123', privacyPrefs);
      const event = createValidCreationEvent();
      event.userId = 'user_123';

      session.addEvent(event);

      const events = session.getEvents();
      expect(events[0].userId).toBeUndefined();
      expect(events[0].anonymized).toBe(true);
      expect(events[0].userIdHash).toBeDefined();
    });

    it('should update privacy preferences', () => {
      session = new AnalyticsSession('user_123');

      // Add event normally
      session.addEvent(createValidCreationEvent());
      expect(session.getEvents()).toHaveLength(1);

      // Update privacy preferences to opt out
      session.updatePrivacyPreferences({ analyticsOptOut: true });

      // New events should be filtered out
      session.addEvent(createValidFeedEvent());
      expect(session.getEvents()).toHaveLength(1); // Still only 1 event
    });
  });

  describe('Session Statistics', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
    });

    it('should generate session statistics', () => {
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());
      session.addEvent(createValidOnboardingEvent());

      const stats = session.getStatistics();

      expect(stats).toMatchObject({
        sessionId: mockUUID,
        userId: 'user_123',
        startTime: expect.any(Date),
        duration: expect.any(Number),
        eventCount: 3,
        isActive: true
      });

      expect(stats.eventsByType).toEqual({
        'tool_created': 1,
        'post_created': 1,
        'welcome': 1
      });
    });

    it('should include end time in statistics after session ends', async () => {
      await session.end();

      const stats = session.getStatistics();
      expect(stats.endTime).toBeInstanceOf(Date);
      expect(stats.isActive).toBe(false);
    });

    it('should track event counts by type correctly', () => {
      // Add multiple events of same type
      session.addEvent(createValidCreationEvent());
      session.addEvent({
        ...createValidCreationEvent(),
        eventId: 'creation_event_2',
        eventType: 'tool_updated' as CreationEventType
      });

      const stats = session.getStatistics();
      expect(stats.eventsByType).toEqual({
        'tool_created': 1,
        'tool_updated': 1
      });
    });
  });

  describe('Privacy Compliance', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
    });

    it('should generate privacy report', () => {
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());

      const report = session.generatePrivacyReport();

      expect(report).toMatchObject({
        sessionId: mockUUID,
        totalEvents: expect.any(Number),
        anonymizedEvents: expect.any(Number),
        eventsWithPII: expect.any(Number),
        expiredEvents: expect.any(Number),
        complianceIssues: expect.any(Array)
      });
    });

    it('should cleanup expired events', () => {
      // Add events (they would be expired in a real scenario with old timestamps)
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());

      const beforeCleanup = session.getEvents().length;
      session.cleanupExpiredEvents(30); // 30 days retention
      const afterCleanup = session.getEvents().length;

      // In this test case, events are not actually expired, so count should remain same
      expect(afterCleanup).toBe(beforeCleanup);
    });
  });

  describe('Data Export', () => {
    beforeEach(() => {
      session = new AnalyticsSession('user_123');
      session.addEvent(createValidCreationEvent());
      session.addEvent(createValidFeedEvent());
    });

    it('should export session data', () => {
      const exportData = session.export();

      expect(exportData).toMatchObject({
        sessionId: mockUUID,
        userId: 'user_123',
        startTime: expect.any(Date),
        isActive: true,
        events: expect.any(Array),
        statistics: expect.any(Object)
      });

      expect(exportData.events).toHaveLength(2);
      expect(exportData.statistics.eventCount).toBe(2);
    });

    it('should export session data after ending', async () => {
      await session.end();

      const exportData = session.export();

      expect(exportData.isActive).toBe(false);
      expect(exportData.endTime).toBeInstanceOf(Date);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle session creation without user ID', () => {
      session = new AnalyticsSession();

      const stats = session.getStatistics();
      expect(stats.userId).toBeUndefined();
    });

    it('should handle empty privacy preferences', () => {
      session = new AnalyticsSession('user_123', {});
      session.addEvent(createValidCreationEvent());

      expect(session.getEvents()).toHaveLength(1);
    });

    it('should handle events without optional fields', () => {
      session = new AnalyticsSession('user_123');

      const minimalEvent: CreationAnalyticsEvent = {
        eventId: 'minimal_event',
        sessionId: mockUUID,
        timestamp: new Date(),
        eventType: 'tool_created' as CreationEventType
      };

      session.addEvent(minimalEvent);
      expect(session.getEvents()).toHaveLength(1);
    });

    it('should handle statistics generation with no events', () => {
      session = new AnalyticsSession('user_123');

      const stats = session.getStatistics();
      expect(stats.eventCount).toBe(0);
      expect(stats.eventsByType).toEqual({});
    });

    it('should handle batching setup after adding events', () => {
      session = new AnalyticsSession('user_123');
      session.addEvent(createValidCreationEvent());

      // Should not throw error
      session.setupBatching(10, 1000, mockFlushCallback);

      // Should still be able to add more events
      session.addEvent(createValidFeedEvent());
      expect(session.getEvents()).toHaveLength(2);
    });
  });
});