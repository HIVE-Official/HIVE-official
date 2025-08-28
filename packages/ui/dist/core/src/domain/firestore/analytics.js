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
// Firestore-specific helpers
export const UserAnalyticsConverter = {
    toFirestore: (analytics) => ({
        ...analytics,
        createdAt: analytics.createdAt,
        updatedAt: analytics.updatedAt
    }),
    fromFirestore: (data) => {
        return UserAnalyticsSchema.parse({
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
        });
    }
};
export const AnalyticsEventConverter = {
    toFirestore: (event) => ({
        ...event,
        metadata: {
            ...event.metadata,
            timestamp: event.metadata.timestamp
        },
        createdAt: event.createdAt
    }),
    fromFirestore: (data) => {
        return AnalyticsEventSchema.parse({
            ...data,
            metadata: {
                ...data.metadata,
                timestamp: data.metadata?.timestamp?.toDate?.() || data.metadata?.timestamp
            },
            createdAt: data.createdAt?.toDate?.() || data.createdAt
        });
    }
};
// Collection paths
export const ANALYTICS_COLLECTIONS = {
    USER_ANALYTICS: (userId) => `users/${userId}/analytics`,
    SPACE_ANALYTICS: (spaceId) => `spaces/${spaceId}/analytics`,
    PLATFORM_ANALYTICS: 'platform_analytics',
    EVENTS: 'analytics_events',
    USER_EVENTS: (userId) => `users/${userId}/events`
};
// Analytics utility functions
export const AnalyticsUtils = {
    createEvent: (userId, eventType, eventData, sessionId) => ({
        userId,
        sessionId: sessionId || generateSessionId(),
        eventType,
        eventData,
        metadata: {
            timestamp: new Date(),
            platform: 'web', // Default, should be determined by context
            location: {
                pathname: typeof window !== 'undefined' ? window.location.pathname : '/'
            }
        }
    }),
    aggregateUserMetrics: (events) => {
        const today = new Date().toISOString().split('T')[0];
        const todayEvents = events.filter(e => e.createdAt.toISOString().split('T')[0] === today);
        return {
            date: today,
            dailyActiveMinutes: calculateActiveMinutes(todayEvents),
            sessionsCount: new Set(todayEvents.map(e => e.sessionId)).size,
            postsCreated: todayEvents.filter(e => e.eventType === 'post_create').length,
            postsLiked: todayEvents.filter(e => e.eventType === 'post_like').length,
            spacesVisited: Array.from(new Set(todayEvents
                .filter(e => e.eventData?.spaceId)
                .map(e => e.eventData?.spaceId))),
            toolsUsed: Array.from(new Set(todayEvents
                .filter(e => e.eventType === 'tool_use')
                .map(e => e.eventData?.toolId))),
            ritualsParticipated: Array.from(new Set(todayEvents
                .filter(e => e.eventType === 'ritual_participate')
                .map(e => e.eventData?.ritualId)))
        };
    },
    calculateEngagementScore: (analytics) => {
        // Simple engagement score calculation
        const baseScore = Math.min(analytics.dailyActiveMinutes / 60, 10) * 10; // Max 100 points for 60+ minutes
        const interactionBonus = (analytics.postsCreated * 5) + (analytics.postsLiked * 1);
        const socialBonus = analytics.spacesVisited.length * 2;
        const toolBonus = analytics.toolsUsed.length * 3;
        return Math.min(100, baseScore + interactionBonus + socialBonus + toolBonus);
    }
};
// Helper functions
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function calculateActiveMinutes(events) {
    // Group events by session and calculate active time
    const sessionEvents = events.reduce((acc, event) => {
        if (!acc[event.sessionId])
            acc[event.sessionId] = [];
        acc[event.sessionId].push(event);
        return acc;
    }, {});
    let totalMinutes = 0;
    Object.values(sessionEvents).forEach(sessionEventList => {
        if (sessionEventList.length < 2)
            return;
        const sortedEvents = sessionEventList.sort((a, b) => a.metadata.timestamp.getTime() - b.metadata.timestamp.getTime());
        const sessionStart = sortedEvents[0].metadata.timestamp;
        const sessionEnd = sortedEvents[sortedEvents.length - 1].metadata.timestamp;
        const sessionDuration = (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60);
        // Cap session duration at 4 hours to avoid inflated metrics
        totalMinutes += Math.min(sessionDuration, 240);
    });
    return Math.round(totalMinutes);
}
//# sourceMappingURL=analytics.js.map