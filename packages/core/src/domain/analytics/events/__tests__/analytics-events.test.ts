import { describe, it, expect } from 'vitest';
import { CreationAnalyticsEventEntity } from '../creation-analytics.event';
import { FeedAnalyticsEventEntity } from '../feed-analytics.event';
import { OnboardingAnalyticsEventEntity } from '../onboarding-analytics.event';

describe('CreationAnalyticsEventEntity', () => {
  it('should create event with correct properties', () => {
    const event = new CreationAnalyticsEventEntity({
      eventId: 'event_123',
      eventType: 'builder_opened',
      userId: 'user_456',
      sessionId: 'session_789',
      timestamp: new Date('2025-10-01T12:00:00Z'),
      toolId: 'tool_101',
      elementId: 'element_202',
      spaceId: 'space_303'
    });

    expect(event.eventId).toBe('event_123');
    expect(event.eventType).toBe('builder_opened');
    expect(event.userId).toBe('user_456');
    expect(event.sessionId).toBe('session_789');
    expect(event.toolId).toBe('tool_101');
    expect(event.elementId).toBe('element_202');
    expect(event.spaceId).toBe('space_303');
    expect(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
  });

  it('should create event using factory method', () => {
    const event = CreationAnalyticsEventEntity.create('builder_opened', {
      userId: 'user_123',
      sessionId: 'session_456',
      toolId: 'tool_789'
    });

    expect(event.eventType).toBe('builder_opened');
    expect(event.userId).toBe('user_123');
    expect(event.sessionId).toBe('session_456');
    expect(event.toolId).toBe('tool_789');
    expect(event.eventId).toBeDefined();
    expect(event.timestamp).toBeInstanceOf(Date);
  });

  it('should identify builder events correctly', () => {
    const builderEvent = CreationAnalyticsEventEntity.create('builder_opened', { sessionId: 's1' });
    const elementEvent = CreationAnalyticsEventEntity.create('element_added', { sessionId: 's2' });
    const canvasEvent = CreationAnalyticsEventEntity.create('canvas_saved', { sessionId: 's3' });
    const toolEvent = CreationAnalyticsEventEntity.create('tool_published', { sessionId: 's4' });

    expect(builderEvent.isBuilderEvent()).toBe(true);
    expect(elementEvent.isBuilderEvent()).toBe(true);
    expect(canvasEvent.isBuilderEvent()).toBe(true);
    expect(toolEvent.isBuilderEvent()).toBe(false);
  });

  it('should identify tool lifecycle events correctly', () => {
    const toolEvent = CreationAnalyticsEventEntity.create('tool_published', { sessionId: 's1' });
    const builderEvent = CreationAnalyticsEventEntity.create('builder_opened', { sessionId: 's2' });

    expect(toolEvent.isToolLifecycleEvent()).toBe(true);
    expect(builderEvent.isToolLifecycleEvent()).toBe(false);
  });

  it('should anonymize event', () => {
    const event = new CreationAnalyticsEventEntity({
      eventId: 'event_1',
      eventType: 'builder_opened',
      userId: 'user_secret',
      userIdHash: 'hash_secret',
      sessionId: 'session_1',
      timestamp: new Date(),
      metadata: { userId: 'user_secret', other: 'data' }
    });

    const anonymized = event.anonymize();

    expect(anonymized.userId).toBeUndefined();
    expect(anonymized.userIdHash).toBeUndefined();
    expect(anonymized.anonymized).toBe(true);
    expect(anonymized.metadata?.userId).toBeUndefined();
    expect(anonymized.metadata?.other).toBe('data');
  });

  it('should add metadata', () => {
    const event = CreationAnalyticsEventEntity.create('builder_opened', {
      sessionId: 's1',
      metadata: { initial: 'value' }
    });

    const withMetadata = event.withMetadata({ added: 'data', count: 42 });

    expect(withMetadata.metadata).toEqual({
      initial: 'value',
      added: 'data',
      count: 42
    });
  });

  it('should serialize to JSON correctly', () => {
    const timestamp = new Date('2025-10-01T12:00:00Z');
    const event = new CreationAnalyticsEventEntity({
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

    expect(json).toEqual({
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

describe('FeedAnalyticsEventEntity', () => {
  it('should create event with correct properties', () => {
    const event = new FeedAnalyticsEventEntity({
      eventId: 'event_123',
      eventType: 'post_viewed',
      userId: 'user_456',
      sessionId: 'session_789',
      timestamp: new Date('2025-10-01T12:00:00Z'),
      postId: 'post_101',
      spaceId: 'space_202'
    });

    expect(event.eventId).toBe('event_123');
    expect(event.eventType).toBe('post_viewed');
    expect(event.userId).toBe('user_456');
    expect(event.sessionId).toBe('session_789');
    expect(event.postId).toBe('post_101');
    expect(event.spaceId).toBe('space_202');
    expect(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
  });

  it('should create event using factory method', () => {
    const event = FeedAnalyticsEventEntity.create('post_liked', {
      spaceId: 'space_123',
      userId: 'user_456',
      sessionId: 'session_789',
      postId: 'post_101'
    });

    expect(event.eventType).toBe('post_liked');
    expect(event.spaceId).toBe('space_123');
    expect(event.userId).toBe('user_456');
    expect(event.postId).toBe('post_101');
    expect(event.eventId).toBeDefined();
    expect(event.timestamp).toBeInstanceOf(Date);
  });

  it('should identify post events correctly', () => {
    const postViewEvent = FeedAnalyticsEventEntity.create('post_viewed', { spaceId: 's1' });
    const postLikeEvent = FeedAnalyticsEventEntity.create('post_liked', { spaceId: 's2' });
    const spaceEvent = FeedAnalyticsEventEntity.create('space_viewed', { spaceId: 's3' });

    expect(postViewEvent.isPostEvent()).toBe(true);
    expect(postLikeEvent.isPostEvent()).toBe(true);
    expect(spaceEvent.isPostEvent()).toBe(false);
  });

  it('should identify space events correctly', () => {
    const spaceEvent = FeedAnalyticsEventEntity.create('space_viewed', { spaceId: 's1' });
    const postEvent = FeedAnalyticsEventEntity.create('post_liked', { spaceId: 's2' });

    expect(spaceEvent.isSpaceEvent()).toBe(true);
    expect(postEvent.isSpaceEvent()).toBe(false);
  });

  it('should identify builder events correctly', () => {
    const builderEvent = FeedAnalyticsEventEntity.create('builder_action', { spaceId: 's1' });
    const postEvent = FeedAnalyticsEventEntity.create('post_viewed', { spaceId: 's2' });

    expect(builderEvent.isBuilderEvent()).toBe(true);
    expect(postEvent.isBuilderEvent()).toBe(false);
  });

  it('should anonymize event', () => {
    const event = new FeedAnalyticsEventEntity({
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

    expect(anonymized.userId).toBeUndefined();
    expect(anonymized.userIdHash).toBeUndefined();
    expect(anonymized.anonymized).toBe(true);
    expect(anonymized.metadata?.userId).toBeUndefined();
    expect(anonymized.metadata?.other).toBe('data');
  });

  it('should add metadata', () => {
    const event = FeedAnalyticsEventEntity.create('post_viewed', {
      spaceId: 's1',
      metadata: { initial: 'value' }
    });

    const withMetadata = event.withMetadata({ duration: 5000, scrollDepth: 0.75 });

    expect(withMetadata.metadata).toEqual({
      initial: 'value',
      duration: 5000,
      scrollDepth: 0.75
    });
  });

  it('should serialize to JSON correctly', () => {
    const timestamp = new Date('2025-10-01T12:00:00Z');
    const event = new FeedAnalyticsEventEntity({
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

    expect(json).toEqual({
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

describe('OnboardingAnalyticsEventEntity', () => {
  it('should create event with correct properties', () => {
    const event = new OnboardingAnalyticsEventEntity({
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

    expect(event.eventId).toBe('event_123');
    expect(event.stepName).toBe('email_verification');
    expect(event.stepIndex).toBe(0);
    expect(event.isCompleted).toBe(true);
    expect(event.userId).toBe('user_456');
    expect(event.sessionId).toBe('session_789');
    expect(event.timeSpent).toBe(30000);
    expect(event.validationErrors).toEqual([]);
    expect(event.timestamp).toEqual(new Date('2025-10-01T12:00:00Z'));
  });

  it('should create event using factory method', () => {
    const event = OnboardingAnalyticsEventEntity.create('profile_setup', {
      stepIndex: 1,
      isCompleted: true,
      userId: 'user_123',
      sessionId: 'session_456'
    });

    expect(event.stepName).toBe('profile_setup');
    expect(event.stepIndex).toBe(1);
    expect(event.isCompleted).toBe(true);
    expect(event.userId).toBe('user_123');
    expect(event.eventId).toBeDefined();
    expect(event.timestamp).toBeInstanceOf(Date);
  });

  it('should identify first step correctly', () => {
    const firstStep = OnboardingAnalyticsEventEntity.create('email_verification', {
      stepIndex: 0,
      isCompleted: true
    });
    const secondStep = OnboardingAnalyticsEventEntity.create('profile_setup', {
      stepIndex: 1,
      isCompleted: true
    });

    expect(firstStep.isFirstStep()).toBe(true);
    expect(secondStep.isFirstStep()).toBe(false);
  });

  it('should identify last step correctly', () => {
    const legalStep = OnboardingAnalyticsEventEntity.create('legal', {
      stepIndex: 5,
      isCompleted: true
    });
    const interestsStep = OnboardingAnalyticsEventEntity.create('interests', {
      stepIndex: 3,
      isCompleted: true
    });

    expect(legalStep.isLastStep()).toBe(true);
    expect(interestsStep.isLastStep()).toBe(false);
  });

  it('should detect validation errors', () => {
    const withErrors = new OnboardingAnalyticsEventEntity({
      eventId: 'event_1',
      stepName: 'profile_setup',
      stepIndex: 1,
      isCompleted: false,
      sessionId: 's1',
      timestamp: new Date(),
      validationErrors: ['Handle is required', 'Invalid email']
    });

    const withoutErrors = new OnboardingAnalyticsEventEntity({
      eventId: 'event_2',
      stepName: 'profile_setup',
      stepIndex: 1,
      isCompleted: true,
      sessionId: 's2',
      timestamp: new Date(),
      validationErrors: []
    });

    expect(withErrors.hasValidationErrors()).toBe(true);
    expect(withoutErrors.hasValidationErrors()).toBe(false);
  });

  it('should calculate completion rate correctly', () => {
    const step0 = OnboardingAnalyticsEventEntity.create('email_verification', {
      stepIndex: 0,
      isCompleted: true
    });
    const step2 = OnboardingAnalyticsEventEntity.create('interests', {
      stepIndex: 2,
      isCompleted: true
    });
    const step5 = OnboardingAnalyticsEventEntity.create('legal', {
      stepIndex: 5,
      isCompleted: true
    });

    expect(step0.getCompletionRate()).toBeCloseTo(1 / 6);
    expect(step2.getCompletionRate()).toBeCloseTo(3 / 6);
    expect(step5.getCompletionRate()).toBeCloseTo(6 / 6);
  });

  it('should anonymize event', () => {
    const event = new OnboardingAnalyticsEventEntity({
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

    expect(anonymized.userId).toBeUndefined();
    expect(anonymized.userIdHash).toBeUndefined();
    expect(anonymized.anonymized).toBe(true);
    expect(anonymized.metadata?.userId).toBeUndefined();
    expect(anonymized.metadata?.other).toBe('data');
  });

  it('should add metadata', () => {
    const event = OnboardingAnalyticsEventEntity.create('profile_setup', {
      stepIndex: 1,
      isCompleted: true,
      metadata: { initial: 'value' }
    });

    const withMetadata = event.withMetadata({ formData: { handle: 'test' }, attempts: 1 });

    expect(withMetadata.metadata).toEqual({
      initial: 'value',
      formData: { handle: 'test' },
      attempts: 1
    });
  });

  it('should serialize to JSON correctly', () => {
    const timestamp = new Date('2025-10-01T12:00:00Z');
    const event = new OnboardingAnalyticsEventEntity({
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

    expect(json).toEqual({
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
