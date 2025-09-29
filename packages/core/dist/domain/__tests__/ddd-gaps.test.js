"use strict";
/**
 * Tests for DDD Gap Implementations
 * Verifying domain events, services, and specifications work correctly
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Import domain events
const domain_event_1 = require("../shared/domain-event");
const events_1 = require("../feed/events");
const events_2 = require("../rituals/events");
// Import specifications
const specification_1 = require("../shared/specification");
// Import services
const services_1 = require("../feed/services");
const services_2 = require("../rituals/services");
(0, vitest_1.describe)('Domain Events', () => {
    (0, vitest_1.describe)('EventBus', () => {
        let eventBus;
        (0, vitest_1.beforeEach)(() => {
            eventBus = new domain_event_1.EventBus();
        });
        (0, vitest_1.it)('should publish and handle events', async () => {
            const handler = {
                handle: vitest_1.vi.fn()
            };
            eventBus.subscribe('FeedItemViewed', handler);
            const event = new events_1.FeedItemViewed('feed-1', { toString: () => 'item-1' }, 'user-1', 5000);
            await eventBus.publish(event);
            (0, vitest_1.expect)(handler.handle).toHaveBeenCalledWith(event);
        });
        (0, vitest_1.it)('should handle multiple subscribers for same event', async () => {
            const handler1 = { handle: vitest_1.vi.fn() };
            const handler2 = { handle: vitest_1.vi.fn() };
            eventBus.subscribe('RitualStarted', handler1);
            eventBus.subscribe('RitualStarted', handler2);
            const event = new events_2.RitualStarted({ toString: () => 'ritual-1' }, 50);
            await eventBus.publish(event);
            (0, vitest_1.expect)(handler1.handle).toHaveBeenCalled();
            (0, vitest_1.expect)(handler2.handle).toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Feed Domain Events', () => {
        (0, vitest_1.it)('should create FeedItemBecameTrending event with correct payload', () => {
            const event = new events_1.FeedItemBecameTrending('feed-1', { toString: () => 'item-1' }, 0.85, 'high_engagement');
            const json = event.toJSON();
            (0, vitest_1.expect)(json.eventName).toBe('FeedItemBecameTrending');
            (0, vitest_1.expect)(json.aggregateId).toBe('feed-1');
            (0, vitest_1.expect)(json.payload).toMatchObject({
                feedId: 'feed-1',
                itemId: 'item-1',
                trendingScore: 0.85,
                reason: 'high_engagement'
            });
        });
        (0, vitest_1.it)('should create FeedItemInteracted event with user metadata', () => {
            const event = new events_1.FeedItemInteracted('feed-1', { toString: () => 'item-1' }, 'user-1', 'like', { emoji: '❤️' });
            (0, vitest_1.expect)(event.metadata.userId).toBe('user-1');
            (0, vitest_1.expect)(event.toJSON().payload).toMatchObject({
                interactionType: 'like',
                interactionMetadata: { emoji: '❤️' }
            });
        });
    });
    (0, vitest_1.describe)('Ritual Domain Events', () => {
        (0, vitest_1.it)('should create MilestoneUnlocked event', () => {
            const event = new events_2.MilestoneUnlocked({ toString: () => 'ritual-1' }, { id: 'user-1' }, 'First Steps', 100, 'Bronze Badge', false);
            (0, vitest_1.expect)(event.eventName).toBe('MilestoneUnlocked');
            (0, vitest_1.expect)(event.toJSON().payload).toMatchObject({
                milestoneName: 'First Steps',
                milestoneThreshold: 100,
                reward: 'Bronze Badge',
                isGlobalMilestone: false
            });
        });
        (0, vitest_1.it)('should create RitualCompleted event with top participants', () => {
            const topParticipants = [
                { id: 'user-1', points: 1500 },
                { id: 'user-2', points: 1200 },
                { id: 'user-3', points: 1000 }
            ];
            const event = new events_2.RitualCompleted({ toString: () => 'ritual-1' }, 150, 2500, 'goal_reached', topParticipants);
            (0, vitest_1.expect)(event.toJSON().payload).toMatchObject({
                finalParticipantCount: 150,
                totalActivities: 2500,
                completionReason: 'goal_reached',
                topParticipants
            });
        });
    });
});
(0, vitest_1.describe)('Specification Pattern', () => {
    (0, vitest_1.describe)('Feed Specifications', () => {
        const mockFeedItems = [
            {
                id: '1',
                source: { spaceId: 'space-1' },
                content: { authorId: { id: 'author-1' } },
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                isTrending: true,
                interactions: [],
                tags: ['tech', 'ai']
            },
            {
                id: '2',
                source: { spaceId: 'space-2' },
                content: { authorId: { id: 'author-2' } },
                createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
                isTrending: false,
                interactions: [],
                tags: ['social']
            },
            {
                id: '3',
                source: { spaceId: 'space-1' },
                content: { authorId: { id: 'author-1' } },
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
                isTrending: false,
                interactions: [],
                tags: ['tech', 'web3']
            }
        ];
        (0, vitest_1.it)('should filter by single specification', () => {
            const spec = specification_1.FeedItemSpecifications.isTrending();
            const filtered = mockFeedItems.filter(item => spec.isSatisfiedBy(item));
            (0, vitest_1.expect)(filtered).toHaveLength(1);
            (0, vitest_1.expect)(filtered[0].id).toBe('1');
        });
        (0, vitest_1.it)('should combine specifications with AND', () => {
            const spec = specification_1.FeedItemSpecifications.fromSpace('space-1')
                .and(specification_1.FeedItemSpecifications.isRecent(24));
            const filtered = mockFeedItems.filter(item => spec.isSatisfiedBy(item));
            (0, vitest_1.expect)(filtered).toHaveLength(2);
            (0, vitest_1.expect)(filtered.map(i => i.id)).toEqual(['1', '3']);
        });
        (0, vitest_1.it)('should combine specifications with OR', () => {
            const spec = specification_1.FeedItemSpecifications.isTrending()
                .or(specification_1.FeedItemSpecifications.hasTag('web3'));
            const filtered = mockFeedItems.filter(item => spec.isSatisfiedBy(item));
            (0, vitest_1.expect)(filtered).toHaveLength(2);
            (0, vitest_1.expect)(filtered.map(i => i.id)).toEqual(['1', '3']);
        });
        (0, vitest_1.it)('should negate specifications with NOT', () => {
            const spec = specification_1.FeedItemSpecifications.fromSpace('space-1').not();
            const filtered = mockFeedItems.filter(item => spec.isSatisfiedBy(item));
            (0, vitest_1.expect)(filtered).toHaveLength(1);
            (0, vitest_1.expect)(filtered[0].id).toBe('2');
        });
    });
    (0, vitest_1.describe)('Ritual Specifications', () => {
        const mockRituals = [
            {
                id: '1',
                type: { type: 'challenge' },
                status: { isActive: () => true },
                startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                participantCount: 75,
                canJoin: () => true,
                participations: []
            },
            {
                id: '2',
                type: { type: 'onboarding' },
                status: { isActive: () => true },
                startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                participantCount: 25,
                canJoin: () => true,
                participations: []
            },
            {
                id: '3',
                type: { type: 'challenge' },
                status: { isActive: () => false },
                startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                participantCount: 0,
                canJoin: () => false,
                participations: []
            }
        ];
        (0, vitest_1.it)('should filter active rituals', () => {
            const spec = specification_1.RitualSpecifications.isActive();
            const filtered = mockRituals.filter(r => spec.isSatisfiedBy(r));
            (0, vitest_1.expect)(filtered).toHaveLength(2);
            (0, vitest_1.expect)(filtered.map(r => r.id)).toEqual(['1', '2']);
        });
        (0, vitest_1.it)('should find challenge rituals ending soon with good participation', () => {
            const spec = specification_1.RitualSpecifications.isActive()
                .and(specification_1.RitualSpecifications.hasType('challenge'))
                .and(specification_1.RitualSpecifications.isEndingSoon(7))
                .and(specification_1.RitualSpecifications.hasMinimumParticipants(50));
            const filtered = mockRituals.filter(r => spec.isSatisfiedBy(r));
            (0, vitest_1.expect)(filtered).toHaveLength(1);
            (0, vitest_1.expect)(filtered[0].id).toBe('1');
        });
    });
});
(0, vitest_1.describe)('Domain Services', () => {
    (0, vitest_1.describe)('Feed Services', () => {
        (0, vitest_1.describe)('FeedModerationService', () => {
            let moderationService;
            (0, vitest_1.beforeEach)(() => {
                moderationService = new services_1.FeedModerationService();
            });
            (0, vitest_1.it)('should filter content with blocked keywords', () => {
                moderationService.addBlockedKeywords(['spam', 'blocked']);
                const item = {
                    content: { text: 'This is spam content', authorId: { id: 'user-1' } }
                };
                (0, vitest_1.expect)(moderationService.shouldFilterContent(item)).toBe(true);
            });
            (0, vitest_1.it)('should check content violations', async () => {
                moderationService.addBlockedKeywords(['inappropriate', 'banned']);
                const result = await moderationService.checkContentViolations('This contains inappropriate content and banned words');
                (0, vitest_1.expect)(result.hasViolations).toBe(true);
                (0, vitest_1.expect)(result.violations).toHaveLength(2);
                (0, vitest_1.expect)(result.severity).toBe('medium');
            });
        });
        (0, vitest_1.describe)('FeedContentAggregationService', () => {
            (0, vitest_1.it)('should deduplicate and sort aggregated content', () => {
                const service = new services_1.FeedContentAggregationService(new Map());
                // Test the sorting and deduplication logic
                const items = [
                    {
                        id: { toString: () => '1' },
                        relevanceScore: { compareTo: (other) => 0.8 - other.value, value: 0.8 },
                        createdAt: new Date('2024-01-01')
                    },
                    {
                        id: { toString: () => '2' },
                        relevanceScore: { compareTo: (other) => 0.9 - other.value, value: 0.9 },
                        createdAt: new Date('2024-01-02')
                    },
                    {
                        id: { toString: () => '1' }, // Duplicate
                        relevanceScore: { compareTo: (other) => 0.7 - other.value, value: 0.7 },
                        createdAt: new Date('2024-01-03')
                    }
                ];
                // Access private method through reflection for testing
                const sorted = service.sortAndDeduplicate(items, 10);
                (0, vitest_1.expect)(sorted).toHaveLength(2); // Deduplicated
                (0, vitest_1.expect)(sorted[0].id.toString()).toBe('2'); // Highest relevance first
            });
        });
    });
    (0, vitest_1.describe)('Ritual Services', () => {
        (0, vitest_1.describe)('RitualGamificationService', () => {
            let gamificationService;
            (0, vitest_1.beforeEach)(() => {
                gamificationService = new services_2.RitualGamificationService();
            });
            (0, vitest_1.it)('should calculate streak correctly', () => {
                const activities = [
                    { timestamp: new Date('2024-01-01T12:00:00') },
                    { timestamp: new Date('2024-01-02T12:00:00') },
                    { timestamp: new Date('2024-01-03T12:00:00') },
                    { timestamp: new Date('2024-01-05T12:00:00') } // Gap
                ];
                const streak = gamificationService.calculateStreak(activities);
                (0, vitest_1.expect)(streak).toBe(1); // Reset after gap
            });
            (0, vitest_1.it)('should apply bonuses correctly', () => {
                const basePoints = { multiply: (m) => ({ value: 100 * m }) };
                const participation = { activities: [] };
                const ritual = {
                    endDate: new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 hours from now
                };
                const result = gamificationService.calculatePointsWithBonuses(basePoints, participation, ritual, {});
                // First activity (1.5) * Final push (1.3) = 1.95
                (0, vitest_1.expect)(result.value).toBeCloseTo(195, 0);
            });
            (0, vitest_1.it)('should generate correct achievements', () => {
                const participation = {
                    id: 'p1',
                    joinedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    activities: Array(7).fill(null).map((_, i) => ({
                        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
                    })),
                    milestonesUnlocked: ['m1', 'm2', 'm3'],
                    totalPoints: { value: 1000 }
                };
                const ritual = {
                    startDate: new Date(Date.now() - 25 * 60 * 60 * 1000),
                    participantCount: 100,
                    getLeaderboard: () => [participation]
                };
                const achievements = gamificationService.generateAchievements(participation, ritual);
                (0, vitest_1.expect)(achievements).toContain('early_bird');
                (0, vitest_1.expect)(achievements).toContain('week_warrior');
                (0, vitest_1.expect)(achievements).toContain('milestone_hunter');
                (0, vitest_1.expect)(achievements).toContain('top_performer');
            });
        });
        (0, vitest_1.describe)('RitualAnalyticsService', () => {
            let analyticsService;
            (0, vitest_1.beforeEach)(() => {
                analyticsService = new services_2.RitualAnalyticsService();
            });
            (0, vitest_1.it)('should calculate health score', () => {
                const ritual = {
                    getStatistics: () => ({
                        participantCount: 75,
                        totalActivities: 750,
                        completionRate: 60,
                        daysRemaining: 15
                    }),
                    progressPercentage: 60
                };
                const healthScore = analyticsService.calculateHealthScore(ritual);
                (0, vitest_1.expect)(healthScore).toBeGreaterThan(50);
                (0, vitest_1.expect)(healthScore).toBeLessThanOrEqual(100);
            });
            (0, vitest_1.it)('should predict completion likelihood', () => {
                const ritual = {
                    getStatistics: () => ({
                        participantCount: 100,
                        totalActivities: 1500,
                        completionRate: 70,
                        averagePointsPerParticipant: 80,
                        daysRemaining: 10
                    }),
                    progressPercentage: 70
                };
                const prediction = analyticsService.predictCompletionLikelihood(ritual);
                (0, vitest_1.expect)(prediction.likelihood).toBeGreaterThan(60);
                (0, vitest_1.expect)(prediction.confidence).toBeGreaterThan(50);
                (0, vitest_1.expect)(prediction.factors).toHaveProperty('currentProgress');
            });
        });
    });
});
//# sourceMappingURL=ddd-gaps.test.js.map