import { z } from "zod";
// User Analytics Schema
export const UserAnalyticsSchema = z.object({
    userId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
    dailyActiveMinutes: z.number().min(0).max(1440), // Max 24 hours
    sessionsCount: z.number().min(0),
    postsCreated: z.number().min(0),
    postsLiked: z.number().min(0),
    spacesVisited: z.array(z.string()).max(50), // Reasonable limit
    toolsUsed: z.array(z.string()).max(100),
    ritualsParticipated: z.array(z.string()).max(10),
    engagementScore: z.number().min(0).max(100),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Space Analytics Schema
export const SpaceAnalyticsSchema = z.object({
    spaceId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    memberCount: z.number().min(0),
    activeMembers: z.number().min(0),
    newMembers: z.number().min(0),
    postsCount: z.number().min(0),
    engagementRate: z.number().min(0).max(100),
    averageSessionDuration: z.number().min(0),
    toolsShared: z.number().min(0),
    eventsCreated: z.number().min(0),
    topContributors: z.array(z.string()).max(10),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Platform Analytics Schema
export const PlatformAnalyticsSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    totalUsers: z.number().min(0),
    activeUsers: z.number().min(0),
    newUsers: z.number().min(0),
    totalSpaces: z.number().min(0),
    activeSpaces: z.number().min(0),
    totalPosts: z.number().min(0),
    totalTools: z.number().min(0),
    ritualsActive: z.number().min(0),
    averageEngagement: z.number().min(0).max(100),
    retentionRate: z.number().min(0).max(100),
    schoolBreakdown: z.record(z.string(), z.number().min(0)),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Analytics Event Schema
export const AnalyticsEventSchema = z.object({
    userId: z.string().min(1),
    sessionId: z.string().min(1),
    eventType: z.enum([
        'page_view',
        'post_create',
        'post_like',
        'post_comment',
        'space_join',
        'space_leave',
        'tool_use',
        'ritual_participate',
        'profile_update',
        'search_query',
        'notification_click',
        'app_background',
        'app_foreground'
    ]),
    eventData: z.record(z.string(), z.any()).optional(),
    metadata: z.object({
        userAgent: z.string().optional(),
        platform: z.enum(['web', 'mobile', 'desktop']).optional(),
        referrer: z.string().optional(),
        timestamp: z.date(),
        location: z.object({
            pathname: z.string(),
            search: z.string().optional(),
            hash: z.string().optional()
        }).optional()
    }),
    createdAt: z.date()
});
//# sourceMappingURL=analytics.schema.js.map