"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const creation_analytics_event_1 = require("../creation-analytics.event");
const feed_analytics_event_1 = require("../feed-analytics.event");
const onboarding_analytics_event_1 = require("../onboarding-analytics.event");
(0, vitest_1.describe)('CreationAnalyticsEventEntity', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new creation_analytics_event_1.CreationAnalyticsEventEntity({
            eventId: 'event_123',
            eventType: 'builder_opened',
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp: new Date('2025-10-01T12:00:00Z'),
            toolId: 'tool_101',
            elementId: 'element_202',
            spaceId: 'space_303'
        });
        (0, vitest_1.expect)(event.eventId).toBe('event_123');
        (0, vitest_1.expect)(event.eventType).toBe('builder_opened');
        (0, vitest_1.expect)(event.userId).toBe('user_456');
        (0, vitest_1.expect)(event.sessionId).toBe('session_789');
        (0, vitest_1.expect)(event.toolId).toBe('tool_101');
        (0, vitest_1.expect)(event.elementId).toBe('element_202');
        (0, vitest_1.expect)(event.spaceId).toBe('space_303');
        (0, vitest_1.expect)(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
    });
    (0, vitest_1.it)('should create event using factory method', () => {
        const event = creation_analytics_event_1.CreationAnalyticsEventEntity.create('builder_opened', {
            userId: 'user_123',
            sessionId: 'session_456',
            toolId: 'tool_789'
        });
        (0, vitest_1.expect)(event.eventType).toBe('builder_opened');
        (0, vitest_1.expect)(event.userId).toBe('user_123');
        (0, vitest_1.expect)(event.sessionId).toBe('session_456');
        (0, vitest_1.expect)(event.toolId).toBe('tool_789');
        (0, vitest_1.expect)(event.eventId).toBeDefined();
        (0, vitest_1.expect)(event.timestamp).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should identify builder events correctly', () => {
        const builderEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('builder_opened', { sessionId: 's1' });
        const elementEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('element_added', { sessionId: 's2' });
        const canvasEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('canvas_saved', { sessionId: 's3' });
        const toolEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('tool_published', { sessionId: 's4' });
        (0, vitest_1.expect)(builderEvent.isBuilderEvent()).toBe(true);
        (0, vitest_1.expect)(elementEvent.isBuilderEvent()).toBe(true);
        (0, vitest_1.expect)(canvasEvent.isBuilderEvent()).toBe(true);
        (0, vitest_1.expect)(toolEvent.isBuilderEvent()).toBe(false);
    });
    (0, vitest_1.it)('should identify tool lifecycle events correctly', () => {
        const toolEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('tool_published', { sessionId: 's1' });
        const builderEvent = creation_analytics_event_1.CreationAnalyticsEventEntity.create('builder_opened', { sessionId: 's2' });
        (0, vitest_1.expect)(toolEvent.isToolLifecycleEvent()).toBe(true);
        (0, vitest_1.expect)(builderEvent.isToolLifecycleEvent()).toBe(false);
    });
    (0, vitest_1.it)('should anonymize event', () => {
        const event = new creation_analytics_event_1.CreationAnalyticsEventEntity({
            eventId: 'event_1',
            eventType: 'builder_opened',
            userId: 'user_secret',
            userIdHash: 'hash_secret',
            sessionId: 'session_1',
            timestamp: new Date(),
            metadata: { userId: 'user_secret', other: 'data' }
        });
        const anonymized = event.anonymize();
        (0, vitest_1.expect)(anonymized.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.userIdHash).toBeUndefined();
        (0, vitest_1.expect)(anonymized.anonymized).toBe(true);
        (0, vitest_1.expect)(anonymized.metadata?.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.metadata?.other).toBe('data');
    });
    (0, vitest_1.it)('should add metadata', () => {
        const event = creation_analytics_event_1.CreationAnalyticsEventEntity.create('builder_opened', {
            sessionId: 's1',
            metadata: { initial: 'value' }
        });
        const withMetadata = event.withMetadata({ added: 'data', count: 42 });
        (0, vitest_1.expect)(withMetadata.metadata).toEqual({
            initial: 'value',
            added: 'data',
            count: 42
        });
    });
    (0, vitest_1.it)('should serialize to JSON correctly', () => {
        const timestamp = new Date('2025-10-01T12:00:00Z');
        const event = new creation_analytics_event_1.CreationAnalyticsEventEntity({
            eventId: 'event_123',
            eventType: 'builder_opened',
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp,
            toolId: 'tool_101',
            spaceId: 'space_303',
            metadata: { test: true }
        });
        const json = event.toJSON();
        (0, vitest_1.expect)(json).toEqual({
            eventId: 'event_123',
            eventType: 'builder_opened',
            userId: 'user_456',
            userIdHash: undefined,
            sessionId: 'session_789',
            timestamp,
            toolId: 'tool_101',
            elementId: undefined,
            spaceId: 'space_303',
            anonymized: undefined,
            metadata: { test: true }
        });
    });
});
(0, vitest_1.describe)('FeedAnalyticsEventEntity', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new feed_analytics_event_1.FeedAnalyticsEventEntity({
            eventId: 'event_123',
            eventType: 'post_viewed',
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp: new Date('2025-10-01T12:00:00Z'),
            postId: 'post_101',
            spaceId: 'space_202'
        });
        (0, vitest_1.expect)(event.eventId).toBe('event_123');
        (0, vitest_1.expect)(event.eventType).toBe('post_viewed');
        (0, vitest_1.expect)(event.userId).toBe('user_456');
        (0, vitest_1.expect)(event.sessionId).toBe('session_789');
        (0, vitest_1.expect)(event.postId).toBe('post_101');
        (0, vitest_1.expect)(event.spaceId).toBe('space_202');
        (0, vitest_1.expect)(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
    });
    (0, vitest_1.it)('should create event using factory method', () => {
        const event = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_liked', {
            spaceId: 'space_123',
            userId: 'user_456',
            sessionId: 'session_789',
            postId: 'post_101'
        });
        (0, vitest_1.expect)(event.eventType).toBe('post_liked');
        (0, vitest_1.expect)(event.spaceId).toBe('space_123');
        (0, vitest_1.expect)(event.userId).toBe('user_456');
        (0, vitest_1.expect)(event.postId).toBe('post_101');
        (0, vitest_1.expect)(event.eventId).toBeDefined();
        (0, vitest_1.expect)(event.timestamp).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should identify post events correctly', () => {
        const postViewEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_viewed', { spaceId: 's1' });
        const postLikeEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_liked', { spaceId: 's2' });
        const spaceEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('space_viewed', { spaceId: 's3' });
        (0, vitest_1.expect)(postViewEvent.isPostEvent()).toBe(true);
        (0, vitest_1.expect)(postLikeEvent.isPostEvent()).toBe(true);
        (0, vitest_1.expect)(spaceEvent.isPostEvent()).toBe(false);
    });
    (0, vitest_1.it)('should identify space events correctly', () => {
        const spaceEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('space_viewed', { spaceId: 's1' });
        const postEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_liked', { spaceId: 's2' });
        (0, vitest_1.expect)(spaceEvent.isSpaceEvent()).toBe(true);
        (0, vitest_1.expect)(postEvent.isSpaceEvent()).toBe(false);
    });
    (0, vitest_1.it)('should identify builder events correctly', () => {
        const builderEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('builder_action', { spaceId: 's1' });
        const postEvent = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_viewed', { spaceId: 's2' });
        (0, vitest_1.expect)(builderEvent.isBuilderEvent()).toBe(true);
        (0, vitest_1.expect)(postEvent.isBuilderEvent()).toBe(false);
    });
    (0, vitest_1.it)('should anonymize event', () => {
        const event = new feed_analytics_event_1.FeedAnalyticsEventEntity({
            eventId: 'event_1',
            eventType: 'post_viewed',
            userId: 'user_secret',
            userIdHash: 'hash_secret',
            sessionId: 'session_1',
            spaceId: 'space_1',
            timestamp: new Date(),
            metadata: { userId: 'user_secret', other: 'data' }
        });
        const anonymized = event.anonymize();
        (0, vitest_1.expect)(anonymized.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.userIdHash).toBeUndefined();
        (0, vitest_1.expect)(anonymized.anonymized).toBe(true);
        (0, vitest_1.expect)(anonymized.metadata?.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.metadata?.other).toBe('data');
    });
    (0, vitest_1.it)('should add metadata', () => {
        const event = feed_analytics_event_1.FeedAnalyticsEventEntity.create('post_viewed', {
            spaceId: 's1',
            metadata: { initial: 'value' }
        });
        const withMetadata = event.withMetadata({ duration: 5000, scrollDepth: 0.75 });
        (0, vitest_1.expect)(withMetadata.metadata).toEqual({
            initial: 'value',
            duration: 5000,
            scrollDepth: 0.75
        });
    });
    (0, vitest_1.it)('should serialize to JSON correctly', () => {
        const timestamp = new Date('2025-10-01T12:00:00Z');
        const event = new feed_analytics_event_1.FeedAnalyticsEventEntity({
            eventId: 'event_123',
            eventType: 'post_liked',
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp,
            postId: 'post_101',
            spaceId: 'space_202',
            metadata: { likeCount: 42 }
        });
        const json = event.toJSON();
        (0, vitest_1.expect)(json).toEqual({
            eventId: 'event_123',
            eventType: 'post_liked',
            userId: 'user_456',
            userIdHash: undefined,
            sessionId: 'session_789',
            timestamp,
            postId: 'post_101',
            spaceId: 'space_202',
            anonymized: undefined,
            metadata: { likeCount: 42 }
        });
    });
});
(0, vitest_1.describe)('OnboardingAnalyticsEventEntity', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new onboarding_analytics_event_1.OnboardingAnalyticsEventEntity({
            eventId: 'event_123',
            stepName: 'email_verification',
            stepIndex: 0,
            isCompleted: true,
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp: new Date('2025-10-01T12:00:00Z'),
            timeSpent: 30000,
            validationErrors: []
        });
        (0, vitest_1.expect)(event.eventId).toBe('event_123');
        (0, vitest_1.expect)(event.stepName).toBe('email_verification');
        (0, vitest_1.expect)(event.stepIndex).toBe(0);
        (0, vitest_1.expect)(event.isCompleted).toBe(true);
        (0, vitest_1.expect)(event.userId).toBe('user_456');
        (0, vitest_1.expect)(event.sessionId).toBe('session_789');
        (0, vitest_1.expect)(event.timeSpent).toBe(30000);
        (0, vitest_1.expect)(event.validationErrors).toEqual([]);
        (0, vitest_1.expect)(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
    });
    (0, vitest_1.it)('should create event using factory method', () => {
        const event = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('profile_setup', {
            stepIndex: 1,
            isCompleted: true,
            userId: 'user_123',
            sessionId: 'session_456'
        });
        (0, vitest_1.expect)(event.stepName).toBe('profile_setup');
        (0, vitest_1.expect)(event.stepIndex).toBe(1);
        (0, vitest_1.expect)(event.isCompleted).toBe(true);
        (0, vitest_1.expect)(event.userId).toBe('user_123');
        (0, vitest_1.expect)(event.eventId).toBeDefined();
        (0, vitest_1.expect)(event.timestamp).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should identify first step correctly', () => {
        const firstStep = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('email_verification', {
            stepIndex: 0,
            isCompleted: true
        });
        const secondStep = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('profile_setup', {
            stepIndex: 1,
            isCompleted: true
        });
        (0, vitest_1.expect)(firstStep.isFirstStep()).toBe(true);
        (0, vitest_1.expect)(secondStep.isFirstStep()).toBe(false);
    });
    (0, vitest_1.it)('should identify last step correctly', () => {
        const legalStep = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('legal', {
            stepIndex: 5,
            isCompleted: true
        });
        const interestsStep = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('interests', {
            stepIndex: 3,
            isCompleted: true
        });
        (0, vitest_1.expect)(legalStep.isLastStep()).toBe(true);
        (0, vitest_1.expect)(interestsStep.isLastStep()).toBe(false);
    });
    (0, vitest_1.it)('should detect validation errors', () => {
        const withErrors = new onboarding_analytics_event_1.OnboardingAnalyticsEventEntity({
            eventId: 'event_1',
            stepName: 'profile_setup',
            stepIndex: 1,
            isCompleted: false,
            sessionId: 's1',
            timestamp: new Date(),
            validationErrors: ['Handle is required', 'Invalid email']
        });
        const withoutErrors = new onboarding_analytics_event_1.OnboardingAnalyticsEventEntity({
            eventId: 'event_2',
            stepName: 'profile_setup',
            stepIndex: 1,
            isCompleted: true,
            sessionId: 's2',
            timestamp: new Date(),
            validationErrors: []
        });
        (0, vitest_1.expect)(withErrors.hasValidationErrors()).toBe(true);
        (0, vitest_1.expect)(withoutErrors.hasValidationErrors()).toBe(false);
    });
    (0, vitest_1.it)('should calculate completion rate correctly', () => {
        const step0 = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('email_verification', {
            stepIndex: 0,
            isCompleted: true
        });
        const step2 = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('interests', {
            stepIndex: 2,
            isCompleted: true
        });
        const step5 = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('legal', {
            stepIndex: 5,
            isCompleted: true
        });
        (0, vitest_1.expect)(step0.getCompletionRate()).toBeCloseTo(1 / 6);
        (0, vitest_1.expect)(step2.getCompletionRate()).toBeCloseTo(3 / 6);
        (0, vitest_1.expect)(step5.getCompletionRate()).toBeCloseTo(6 / 6);
    });
    (0, vitest_1.it)('should anonymize event', () => {
        const event = new onboarding_analytics_event_1.OnboardingAnalyticsEventEntity({
            eventId: 'event_1',
            stepName: 'profile_setup',
            stepIndex: 1,
            isCompleted: true,
            userId: 'user_secret',
            userIdHash: 'hash_secret',
            sessionId: 'session_1',
            timestamp: new Date(),
            metadata: { userId: 'user_secret', other: 'data' }
        });
        const anonymized = event.anonymize();
        (0, vitest_1.expect)(anonymized.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.userIdHash).toBeUndefined();
        (0, vitest_1.expect)(anonymized.anonymized).toBe(true);
        (0, vitest_1.expect)(anonymized.metadata?.userId).toBeUndefined();
        (0, vitest_1.expect)(anonymized.metadata?.other).toBe('data');
    });
    (0, vitest_1.it)('should add metadata', () => {
        const event = onboarding_analytics_event_1.OnboardingAnalyticsEventEntity.create('profile_setup', {
            stepIndex: 1,
            isCompleted: true,
            metadata: { initial: 'value' }
        });
        const withMetadata = event.withMetadata({ formData: { handle: 'test' }, attempts: 1 });
        (0, vitest_1.expect)(withMetadata.metadata).toEqual({
            initial: 'value',
            formData: { handle: 'test' },
            attempts: 1
        });
    });
    (0, vitest_1.it)('should serialize to JSON correctly', () => {
        const timestamp = new Date('2025-10-01T12:00:00Z');
        const event = new onboarding_analytics_event_1.OnboardingAnalyticsEventEntity({
            eventId: 'event_123',
            stepName: 'profile_setup',
            stepIndex: 1,
            isCompleted: true,
            userId: 'user_456',
            sessionId: 'session_789',
            timestamp,
            timeSpent: 45000,
            validationErrors: [],
            metadata: { formFields: 3 }
        });
        const json = event.toJSON();
        (0, vitest_1.expect)(json).toEqual({
            eventId: 'event_123',
            stepName: 'profile_setup',
            stepIndex: 1,
            isCompleted: true,
            userId: 'user_456',
            userIdHash: undefined,
            sessionId: 'session_789',
            timestamp,
            timeSpent: 45000,
            validationErrors: [],
            anonymized: undefined,
            metadata: { formFields: 3 }
        });
    });
});
//# sourceMappingURL=analytics-events.test.js.map