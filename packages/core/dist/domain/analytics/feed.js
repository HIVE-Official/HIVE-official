"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEngagementScore = exports.hashUserIdForFeed = exports.createFeedEvent = exports.FeedAnalyticsConfigSchema = exports.UserFeedBehaviorSchema = exports.SpaceEngagementMetricsSchema = exports.FeedAnalyticsEventSchema = void 0;
const zod_1 = require("zod");
// Feed Analytics Events Schema
exports.FeedAnalyticsEventSchema = zod_1.z.discriminatedUnion('event', [
    // Space Feed Events
    zod_1.z.object({
        event: zod_1.z.literal('space_feed_viewed'),
        spaceId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            postsVisible: zod_1.z.number(),
            scrollDepth: zod_1.z.number().min(0).max(1), // 0-1 representing scroll percentage
            timeSpent: zod_1.z.number(), // milliseconds
            deviceType: zod_1.z.enum(['mobile', 'tablet', 'desktop']).optional(),
        }),
    }),
    // Post Creation Events
    zod_1.z.object({
        event: zod_1.z.literal('post_created'),
        spaceId: zod_1.z.string(),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            postType: zod_1.z.enum(['text', 'image', 'poll', 'event', 'toolshare']),
            contentLength: zod_1.z.number(),
            hasMentions: zod_1.z.boolean(),
            hasRichFormatting: zod_1.z.boolean(),
            draftTime: zod_1.z.number().optional(), // Time spent drafting in milliseconds
            composerSource: zod_1.z.enum(['inline', 'modal']).default('inline'),
        }),
    }),
    // Post Engagement Events
    zod_1.z.object({
        event: zod_1.z.literal('post_reacted'),
        spaceId: zod_1.z.string(),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            reaction: zod_1.z.enum(['heart']),
            action: zod_1.z.enum(['add', 'remove']),
            postAge: zod_1.z.number(), // Age of post in milliseconds when reacted
            authorId: zod_1.z.string(),
            isOwnPost: zod_1.z.boolean(),
        }),
    }),
    zod_1.z.object({
        event: zod_1.z.literal('post_viewed'),
        spaceId: zod_1.z.string(),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            viewDuration: zod_1.z.number(), // Time spent viewing in milliseconds
            scrolledToEnd: zod_1.z.boolean(),
            authorId: zod_1.z.string(),
            postType: zod_1.z.enum(['text', 'image', 'poll', 'event', 'toolshare']),
            postAge: zod_1.z.number(), // Age of post when viewed
        }),
    }),
    // Post Management Events
    zod_1.z.object({
        event: zod_1.z.literal('post_edited'),
        spaceId: zod_1.z.string(),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            editTime: zod_1.z.number(), // Time after creation when edited
            contentLengthBefore: zod_1.z.number(),
            contentLengthAfter: zod_1.z.number(),
            editReason: zod_1.z.enum(['typo', 'clarification', 'addition', 'other']).optional(),
        }),
    }),
    zod_1.z.object({
        event: zod_1.z.literal('post_deleted'),
        spaceId: zod_1.z.string(),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            deletedBy: zod_1.z.enum(['author', 'builder', 'admin']),
            postAge: zod_1.z.number(), // Age when deleted
            hadReactions: zod_1.z.boolean(),
            reactionCount: zod_1.z.number(),
            deleteReason: zod_1.z.enum(['inappropriate', 'spam', 'mistake', 'other']).optional(),
        }),
    }),
    // Space Engagement Events
    zod_1.z.object({
        event: zod_1.z.literal('space_joined'),
        spaceId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            joinMethod: zod_1.z.enum(['invite', 'browse', 'search', 'auto']),
            referrerSpaceId: zod_1.z.string().optional(),
            invitedBy: zod_1.z.string().optional(),
        }),
    }),
    zod_1.z.object({
        event: zod_1.z.literal('space_left'),
        spaceId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            membershipDuration: zod_1.z.number(), // Time as member in milliseconds
            postsCreated: zod_1.z.number(),
            reactionsGiven: zod_1.z.number(),
            lastActiveAt: zod_1.z.date(),
            leaveReason: zod_1.z.enum(['inactive', 'content', 'privacy', 'other']).optional(),
        }),
    }),
    // Builder Actions
    zod_1.z.object({
        event: zod_1.z.literal('builder_action'),
        spaceId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            action: zod_1.z.enum(['pin_post', 'unpin_post', 'delete_post', 'mute_user', 'unmute_user']),
            targetId: zod_1.z.string(), // postId or userId
            targetType: zod_1.z.enum(['post', 'user']),
            reason: zod_1.z.string().optional(),
        }),
    }),
    // Time Tracking (Heartbeat)
    zod_1.z.object({
        event: zod_1.z.literal('space_heartbeat'),
        spaceId: zod_1.z.string(),
        userId: zod_1.z.string(),
        timestamp: zod_1.z.date(),
        metadata: zod_1.z.object({
            sessionId: zod_1.z.string(),
            activeTime: zod_1.z.number(), // Active time in last 30 seconds
            tabVisible: zod_1.z.boolean(),
            scrollPosition: zod_1.z.number(),
            lastInteraction: zod_1.z.date(),
        }),
    }),
]);
// Aggregated Analytics Schemas
exports.SpaceEngagementMetricsSchema = zod_1.z.object({
    spaceId: zod_1.z.string(),
    date: zod_1.z.string(), // YYYY-MM-DD format
    metrics: zod_1.z.object({
        // Member Activity
        activeMembers: zod_1.z.number(),
        newMembers: zod_1.z.number(),
        leftMembers: zod_1.z.number(),
        // Content Creation
        postsCreated: zod_1.z.number(),
        postsByType: zod_1.z.record(zod_1.z.number()),
        avgPostLength: zod_1.z.number(),
        // Engagement
        totalReactions: zod_1.z.number(),
        avgReactionsPerPost: zod_1.z.number(),
        totalViewTime: zod_1.z.number(), // Total time spent viewing feed
        avgSessionDuration: zod_1.z.number(),
        // Builder Activity
        builderActions: zod_1.z.number(),
        postsModerated: zod_1.z.number(),
        // Top Content
        topPosts: zod_1.z.array(zod_1.z.object({
            postId: zod_1.z.string(),
            reactions: zod_1.z.number(),
            views: zod_1.z.number(),
            engagementScore: zod_1.z.number(),
        })).max(10),
    }),
});
// User Feed Behavior Schema
exports.UserFeedBehaviorSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    date: zod_1.z.string(), // YYYY-MM-DD format
    metrics: zod_1.z.object({
        // Activity
        spacesVisited: zod_1.z.number(),
        postsCreated: zod_1.z.number(),
        reactionsGiven: zod_1.z.number(),
        // Engagement Patterns
        avgSessionDuration: zod_1.z.number(),
        peakActivityHour: zod_1.z.number(), // 0-23
        mostActiveSpaceId: zod_1.z.string().optional(),
        // Content Preferences
        preferredPostTypes: zod_1.z.array(zod_1.z.string()),
        avgPostLength: zod_1.z.number(),
        mentionsUsed: zod_1.z.number(),
        // Social Behavior
        reactionsReceived: zod_1.z.number(),
        postsViewed: zod_1.z.number(),
        scrollDepthAvg: zod_1.z.number(),
    }),
});
// Analytics Pipeline Configuration
exports.FeedAnalyticsConfigSchema = zod_1.z.object({
    // Event Collection
    batchSize: zod_1.z.number().default(100),
    flushInterval: zod_1.z.number().default(30000), // 30 seconds
    // Privacy Settings
    hashUserIds: zod_1.z.boolean().default(true),
    retentionDays: zod_1.z.number().default(90),
    // Sampling
    sampleRate: zod_1.z.number().min(0).max(1).default(1), // 1 = 100% sampling
    // BigQuery Integration
    dataset: zod_1.z.string().default('hive_analytics'),
    feedEventsTable: zod_1.z.string().default('feed_events'),
    spaceMetricsTable: zod_1.z.string().default('space_metrics'),
    userBehaviorTable: zod_1.z.string().default('user_behavior'),
});
// Utility functions for analytics
const createFeedEvent = (event, data) => {
    return {
        event,
        timestamp: data.timestamp || new Date(),
        ...data,
    };
};
exports.createFeedEvent = createFeedEvent;
// Privacy-safe user ID hashing
const hashUserIdForFeed = (userId, salt = 'hive-analytics') => {
    // In production, use proper crypto hashing
    return btoa(`${salt}:${userId}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
};
exports.hashUserIdForFeed = hashUserIdForFeed;
// Calculate engagement score for posts
const calculateEngagementScore = (reactions, views, postAge, // in hours
spaceSize) => {
    // Weighted engagement score considering recency and space size
    const reactionWeight = 3;
    const viewWeight = 1;
    const ageDecay = Math.exp(-postAge / 24); // Decay over 24 hours
    const sizeNormalization = Math.log(spaceSize + 1) / Math.log(100); // Normalize for space size
    return ((reactions * reactionWeight + views * viewWeight) * ageDecay) / sizeNormalization;
};
exports.calculateEngagementScore = calculateEngagementScore;
//# sourceMappingURL=feed.js.map