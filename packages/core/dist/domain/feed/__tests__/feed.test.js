"use strict";
/**
 * Feed Domain Tests
 * Tests for the read-only discovery layer
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const feed_1 = require("../feed");
const value_objects_1 = require("../value-objects");
(0, vitest_1.describe)('Feed Domain', () => {
    (0, vitest_1.describe)('Feed Creation', () => {
        (0, vitest_1.it)('should create an empty feed', () => {
            const userId = new feed_1.ProfileId('user123');
            const result = feed_1.Feed.create(userId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const feed = result.getValue();
            (0, vitest_1.expect)(feed.itemCount).toBe(0);
            (0, vitest_1.expect)(feed.userId.equals(userId)).toBe(true);
            (0, vitest_1.expect)(feed.filter.type).toBe('all');
        });
        (0, vitest_1.it)('should create feed with specific filter', () => {
            const userId = new feed_1.ProfileId('user123');
            const filter = value_objects_1.FeedFilter.trending();
            const result = feed_1.Feed.create(userId, filter);
            const feed = result.getValue();
            (0, vitest_1.expect)(feed.filter.type).toBe('trending');
        });
    });
    (0, vitest_1.describe)('Content Addition', () => {
        let feed;
        const userId = new feed_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            feed = feed_1.Feed.create(userId).getValue();
        });
        (0, vitest_1.it)('should add space post to feed', () => {
            const source = value_objects_1.ContentSource.create('space_post', 'space123', 'CS Study Group').getValue();
            const content = {
                text: 'Great study session today!',
                mediaUrls: [],
                authorId: new feed_1.ProfileId('author456'),
                authorName: 'John Doe',
            };
            const factors = {
                recency: 0.9,
                engagement: 0.5,
                socialProximity: 0.8,
                spaceRelevance: 1.0,
                trendingBoost: 0.3,
            };
            const result = feed.addContent(source, content, factors);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(feed.itemCount).toBe(1);
            const item = result.getValue();
            (0, vitest_1.expect)(item.content.text).toBe('Great study session today!');
            (0, vitest_1.expect)(item.source.isFromSpace()).toBe(true);
        });
        (0, vitest_1.it)('should add event to feed', () => {
            const source = value_objects_1.ContentSource.create('event', 'event456', 'Campus Party').getValue();
            const content = {
                title: 'Campus Party Tonight',
                text: 'Join us at the quad for music and food!',
                mediaUrls: ['https://example.com/party.jpg'],
                authorId: new feed_1.ProfileId('organizer789'),
                authorName: 'Student Events',
            };
            const factors = {
                recency: 1.0,
                engagement: 0.7,
                socialProximity: 0.5,
                spaceRelevance: 0.6,
                trendingBoost: 0.8,
            };
            const result = feed.addContent(source, content, factors);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const item = result.getValue();
            (0, vitest_1.expect)(item.source.isEvent()).toBe(true);
            (0, vitest_1.expect)(item.isTrending).toBe(true); // trendingBoost > 0.5
        });
        (0, vitest_1.it)('should sort items by relevance score', () => {
            // Add low relevance item
            const lowRelevanceFactors = {
                recency: 0.1, engagement: 0.1, socialProximity: 0.1,
                spaceRelevance: 0.1, trendingBoost: 0.1
            };
            const source1 = value_objects_1.ContentSource.create('space_post', 'space1').getValue();
            const content1 = {
                text: 'Low relevance post',
                mediaUrls: [],
                authorId: new feed_1.ProfileId('author1'),
                authorName: 'Author 1',
            };
            // Add high relevance item
            const highRelevanceFactors = {
                recency: 0.9, engagement: 0.8, socialProximity: 0.9,
                spaceRelevance: 1.0, trendingBoost: 0.7
            };
            const source2 = value_objects_1.ContentSource.create('space_post', 'space2').getValue();
            const content2 = {
                text: 'High relevance post',
                mediaUrls: [],
                authorId: new feed_1.ProfileId('author2'),
                authorName: 'Author 2',
            };
            feed.addContent(source1, content1, lowRelevanceFactors);
            feed.addContent(source2, content2, highRelevanceFactors);
            const items = feed.items;
            (0, vitest_1.expect)(items[0].content.text).toBe('High relevance post');
            (0, vitest_1.expect)(items[1].content.text).toBe('Low relevance post');
        });
    });
    (0, vitest_1.describe)('Feed Filtering', () => {
        let feed;
        const userId = new feed_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            feed = feed_1.Feed.create(userId).getValue();
            // Add different types of content
            const spaceSource = value_objects_1.ContentSource.create('space_post', 'space1').getValue();
            const eventSource = value_objects_1.ContentSource.create('event', 'event1').getValue();
            const ritualSource = value_objects_1.ContentSource.create('ritual_update', 'ritual1').getValue();
            const defaultFactors = {
                recency: 0.5, engagement: 0.5, socialProximity: 0.5,
                spaceRelevance: 0.5, trendingBoost: 0.8 // Make trending
            };
            const content = {
                text: 'Test content',
                mediaUrls: [],
                authorId: new feed_1.ProfileId('author1'),
                authorName: 'Author',
            };
            feed.addContent(spaceSource, { ...content, text: 'Space post' }, defaultFactors);
            feed.addContent(eventSource, { ...content, text: 'Event post' }, defaultFactors);
            feed.addContent(ritualSource, { ...content, text: 'Ritual update' }, defaultFactors);
        });
        (0, vitest_1.it)('should filter by my spaces', () => {
            const result = feed.applyFilter(value_objects_1.FeedFilter.mySpaces());
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const spaceItems = feed.items;
            (0, vitest_1.expect)(spaceItems).toHaveLength(1);
            (0, vitest_1.expect)(spaceItems[0].content.text).toBe('Space post');
        });
        (0, vitest_1.it)('should filter by events', () => {
            feed.applyFilter(value_objects_1.FeedFilter.events());
            const eventItems = feed.items;
            (0, vitest_1.expect)(eventItems).toHaveLength(1);
            (0, vitest_1.expect)(eventItems[0].content.text).toBe('Event post');
        });
        (0, vitest_1.it)('should filter by trending', () => {
            feed.applyFilter(value_objects_1.FeedFilter.trending());
            const trendingItems = feed.items;
            (0, vitest_1.expect)(trendingItems).toHaveLength(3); // All have trendingBoost > 0.5
        });
        (0, vitest_1.it)('should show all with all filter', () => {
            feed.applyFilter(value_objects_1.FeedFilter.all());
            (0, vitest_1.expect)(feed.items).toHaveLength(3);
        });
    });
    (0, vitest_1.describe)('Feed Interactions', () => {
        let feed;
        const userId = new feed_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            feed = feed_1.Feed.create(userId).getValue();
            const source = value_objects_1.ContentSource.create('space_post', 'space1').getValue();
            const content = {
                text: 'Test post',
                mediaUrls: [],
                authorId: new feed_1.ProfileId('author1'),
                authorName: 'Author',
            };
            const factors = {
                recency: 0.5, engagement: 0.5, socialProximity: 0.5,
                spaceRelevance: 0.5, trendingBoost: 0.3
            };
            feed.addContent(source, content, factors);
        });
        (0, vitest_1.it)('should record view interaction', () => {
            const item = feed.items[0];
            const result = feed.recordInteraction(item.id, 'view');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(item.interactions).toHaveLength(1);
            (0, vitest_1.expect)(item.interactions[0].type).toBe('view');
        });
        (0, vitest_1.it)('should record reaction interaction', () => {
            const item = feed.items[0];
            const result = feed.recordInteraction(item.id, 'react', { emoji: '👍' });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const interaction = result.getValue();
            (0, vitest_1.expect)(interaction.isEngagement()).toBe(true);
            (0, vitest_1.expect)(interaction.data?.emoji).toBe('👍');
        });
        (0, vitest_1.it)('should hide item when hide interaction recorded', () => {
            const item = feed.items[0];
            (0, vitest_1.expect)(item.isVisible).toBe(true);
            feed.recordInteraction(item.id, 'hide');
            (0, vitest_1.expect)(item.isVisible).toBe(false);
            (0, vitest_1.expect)(feed.itemCount).toBe(0); // Hidden items not counted
        });
        (0, vitest_1.it)('should reject interaction for non-existent item', () => {
            const fakeId = { id: 'fake123', equals: () => false };
            const result = feed.recordInteraction(fakeId, 'view');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('not found');
        });
    });
    (0, vitest_1.describe)('Feed Analytics', () => {
        let feed;
        const userId = new feed_1.ProfileId('user123');
        (0, vitest_1.beforeEach)(() => {
            feed = feed_1.Feed.create(userId).getValue();
            // Add multiple items with interactions
            for (let i = 0; i < 5; i++) {
                const source = value_objects_1.ContentSource.create('space_post', `space${i}`).getValue();
                const content = {
                    text: `Post ${i}`,
                    mediaUrls: [],
                    authorId: new feed_1.ProfileId(`author${i}`),
                    authorName: `Author ${i}`,
                };
                const factors = {
                    recency: 0.5, engagement: 0.5, socialProximity: 0.5,
                    spaceRelevance: 0.5, trendingBoost: i < 2 ? 0.8 : 0.2 // First 2 are trending
                };
                const item = feed.addContent(source, content, factors).getValue();
                // Add some interactions
                feed.recordInteraction(item.id, 'view');
                if (i < 3) {
                    feed.recordInteraction(item.id, 'react');
                }
                if (i === 0) {
                    feed.recordInteraction(item.id, 'hide');
                }
            }
        });
        (0, vitest_1.it)('should calculate engagement rate', () => {
            const engagementRate = feed.getEngagementRate();
            // 3 items with reactions out of 5 total items
            (0, vitest_1.expect)(engagementRate).toBe(0.6);
        });
        (0, vitest_1.it)('should get trending items', () => {
            const trendingItems = feed.getTrendingItems();
            (0, vitest_1.expect)(trendingItems).toHaveLength(2);
            (0, vitest_1.expect)(trendingItems.every(item => item.isTrending)).toBe(true);
        });
        (0, vitest_1.it)('should get activity summary', () => {
            const timeWindow = value_objects_1.TimeWindow.last24Hours();
            const summary = feed.getActivitySummary(timeWindow);
            (0, vitest_1.expect)(summary.totalItems).toBe(5);
            (0, vitest_1.expect)(summary.engagements).toBe(3); // 3 reactions
            (0, vitest_1.expect)(summary.hiddenItems).toBe(1); // 1 hidden item
            (0, vitest_1.expect)(summary.trendingItems).toBe(2); // 2 trending items
        });
        (0, vitest_1.it)('should get my spaces items', () => {
            const mySpacesItems = feed.getMySpacesItems();
            (0, vitest_1.expect)(mySpacesItems).toHaveLength(5); // All are from spaces
            (0, vitest_1.expect)(mySpacesItems.every(item => item.source.isFromSpace())).toBe(true);
        });
    });
    (0, vitest_1.describe)('Feed Algorithm', () => {
        (0, vitest_1.describe)('Algorithm Factors Calculation', () => {
            const content = {
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                authorId: new feed_1.ProfileId('author123'),
                spaceId: new feed_1.SpaceId('space456'),
                reactionCount: 10,
                commentCount: 5,
                repostCount: 2,
            };
            const user = {
                id: new feed_1.ProfileId('user123'),
                spaceIds: [new feed_1.SpaceId('space456'), new feed_1.SpaceId('space789')],
                connectionIds: [new feed_1.ProfileId('author123'), new feed_1.ProfileId('friend456')],
            };
            (0, vitest_1.it)('should calculate recency score', () => {
                const factors = feed_1.FeedAlgorithm.calculateFactors(content, user);
                (0, vitest_1.expect)(factors.recency).toBeGreaterThan(0);
                (0, vitest_1.expect)(factors.recency).toBeLessThanOrEqual(1);
            });
            (0, vitest_1.it)('should calculate engagement score', () => {
                const factors = feed_1.FeedAlgorithm.calculateFactors(content, user);
                // Should use SPEC formula: reactions + comments×2 + reposts×3
                // 10 + 5×2 + 2×3 = 26
                (0, vitest_1.expect)(factors.engagement).toBeGreaterThan(0);
            });
            (0, vitest_1.it)('should give higher social proximity for connections', () => {
                const factors = feed_1.FeedAlgorithm.calculateFactors(content, user);
                // Author is in user's connections
                (0, vitest_1.expect)(factors.socialProximity).toBe(1.0);
            });
            (0, vitest_1.it)('should give higher space relevance for user spaces', () => {
                const factors = feed_1.FeedAlgorithm.calculateFactors(content, user);
                // Content is from user's space
                (0, vitest_1.expect)(factors.spaceRelevance).toBe(1.0);
            });
            (0, vitest_1.it)('should calculate trending boost for recent engaging content', () => {
                const recentContent = {
                    ...content,
                    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                    reactionCount: 50,
                    commentCount: 20,
                    repostCount: 10,
                };
                const factors = feed_1.FeedAlgorithm.calculateFactors(recentContent, user);
                (0, vitest_1.expect)(factors.trendingBoost).toBeGreaterThan(0);
            });
            (0, vitest_1.it)('should give zero trending boost for old content', () => {
                const oldContent = {
                    ...content,
                    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
                };
                const factors = feed_1.FeedAlgorithm.calculateFactors(oldContent, user);
                (0, vitest_1.expect)(factors.trendingBoost).toBe(0);
            });
        });
    });
    (0, vitest_1.describe)('Value Objects', () => {
        (0, vitest_1.describe)('ContentSource', () => {
            (0, vitest_1.it)('should create valid content source', () => {
                const result = value_objects_1.ContentSource.create('space_post', 'space123', 'My Space');
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const source = result.getValue();
                (0, vitest_1.expect)(source.type).toBe('space_post');
                (0, vitest_1.expect)(source.id).toBe('space123');
                (0, vitest_1.expect)(source.name).toBe('My Space');
            });
            (0, vitest_1.it)('should reject empty source ID', () => {
                const result = value_objects_1.ContentSource.create('space_post', '');
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('cannot be empty');
            });
        });
        (0, vitest_1.describe)('RelevanceScore', () => {
            (0, vitest_1.it)('should create valid relevance score', () => {
                const result = value_objects_1.RelevanceScore.create(0.75);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const score = result.getValue();
                (0, vitest_1.expect)(score.score).toBe(0.75);
                (0, vitest_1.expect)(score.isHighlyRelevant()).toBe(true);
            });
            (0, vitest_1.it)('should reject negative scores', () => {
                const result = value_objects_1.RelevanceScore.create(-0.1);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('cannot be negative');
            });
            (0, vitest_1.it)('should reject scores above 1', () => {
                const result = value_objects_1.RelevanceScore.create(1.5);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('cannot exceed 1.0');
            });
        });
        (0, vitest_1.describe)('TimeWindow', () => {
            (0, vitest_1.it)('should create valid time window', () => {
                const start = new Date('2024-01-01');
                const end = new Date('2024-01-02');
                const result = value_objects_1.TimeWindow.create(start, end);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
                const window = result.getValue();
                (0, vitest_1.expect)(window.getDurationHours()).toBe(24);
            });
            (0, vitest_1.it)('should reject invalid time window', () => {
                const start = new Date('2024-01-02');
                const end = new Date('2024-01-01');
                const result = value_objects_1.TimeWindow.create(start, end);
                (0, vitest_1.expect)(result.isFailure).toBe(true);
                (0, vitest_1.expect)(result.error).toContain('Start time must be before end time');
            });
            (0, vitest_1.it)('should check if date is within window', () => {
                const window = value_objects_1.TimeWindow.today();
                const now = new Date();
                (0, vitest_1.expect)(window.contains(now)).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=feed.test.js.map