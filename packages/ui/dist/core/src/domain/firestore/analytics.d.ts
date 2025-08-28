import { z } from "zod";
export declare const UserAnalyticsSchema: z.ZodObject<{
    userId: z.ZodString;
    date: z.ZodString;
    dailyActiveMinutes: z.ZodNumber;
    sessionsCount: z.ZodNumber;
    postsCreated: z.ZodNumber;
    postsLiked: z.ZodNumber;
    spacesVisited: z.ZodArray<z.ZodString, "many">;
    toolsUsed: z.ZodArray<z.ZodString, "many">;
    ritualsParticipated: z.ZodArray<z.ZodString, "many">;
    engagementScore: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    userId?: string;
    dailyActiveMinutes?: number;
    sessionsCount?: number;
    postsCreated?: number;
    postsLiked?: number;
    spacesVisited?: string[];
    toolsUsed?: string[];
    ritualsParticipated?: string[];
    engagementScore?: number;
}, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    userId?: string;
    dailyActiveMinutes?: number;
    sessionsCount?: number;
    postsCreated?: number;
    postsLiked?: number;
    spacesVisited?: string[];
    toolsUsed?: string[];
    ritualsParticipated?: string[];
    engagementScore?: number;
}>;
export declare const SpaceAnalyticsSchema: z.ZodObject<{
    spaceId: z.ZodString;
    date: z.ZodString;
    memberCount: z.ZodNumber;
    activeMembers: z.ZodNumber;
    newMembers: z.ZodNumber;
    postsCount: z.ZodNumber;
    engagementRate: z.ZodNumber;
    averageSessionDuration: z.ZodNumber;
    toolsShared: z.ZodNumber;
    eventsCreated: z.ZodNumber;
    topContributors: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    spaceId?: string;
    memberCount?: number;
    activeMembers?: number;
    newMembers?: number;
    postsCount?: number;
    engagementRate?: number;
    averageSessionDuration?: number;
    toolsShared?: number;
    eventsCreated?: number;
    topContributors?: string[];
}, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    spaceId?: string;
    memberCount?: number;
    activeMembers?: number;
    newMembers?: number;
    postsCount?: number;
    engagementRate?: number;
    averageSessionDuration?: number;
    toolsShared?: number;
    eventsCreated?: number;
    topContributors?: string[];
}>;
export declare const PlatformAnalyticsSchema: z.ZodObject<{
    date: z.ZodString;
    totalUsers: z.ZodNumber;
    activeUsers: z.ZodNumber;
    newUsers: z.ZodNumber;
    totalSpaces: z.ZodNumber;
    activeSpaces: z.ZodNumber;
    totalPosts: z.ZodNumber;
    totalTools: z.ZodNumber;
    ritualsActive: z.ZodNumber;
    averageEngagement: z.ZodNumber;
    retentionRate: z.ZodNumber;
    schoolBreakdown: z.ZodRecord<z.ZodString, z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    totalUsers?: number;
    activeUsers?: number;
    newUsers?: number;
    totalSpaces?: number;
    activeSpaces?: number;
    totalPosts?: number;
    totalTools?: number;
    ritualsActive?: number;
    averageEngagement?: number;
    retentionRate?: number;
    schoolBreakdown?: Record<string, number>;
}, {
    createdAt?: Date;
    updatedAt?: Date;
    date?: string;
    totalUsers?: number;
    activeUsers?: number;
    newUsers?: number;
    totalSpaces?: number;
    activeSpaces?: number;
    totalPosts?: number;
    totalTools?: number;
    ritualsActive?: number;
    averageEngagement?: number;
    retentionRate?: number;
    schoolBreakdown?: Record<string, number>;
}>;
export declare const AnalyticsEventSchema: z.ZodObject<{
    userId: z.ZodString;
    sessionId: z.ZodString;
    eventType: z.ZodEnum<["page_view", "post_create", "post_like", "post_comment", "space_join", "space_leave", "tool_use", "ritual_participate", "profile_update", "search_query", "notification_click", "app_background", "app_foreground"]>;
    eventData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    metadata: z.ZodObject<{
        userAgent: z.ZodOptional<z.ZodString>;
        platform: z.ZodOptional<z.ZodEnum<["web", "mobile", "desktop"]>>;
        referrer: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodDate;
        location: z.ZodOptional<z.ZodObject<{
            pathname: z.ZodString;
            search: z.ZodOptional<z.ZodString>;
            hash: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            search?: string;
            pathname?: string;
            hash?: string;
        }, {
            search?: string;
            pathname?: string;
            hash?: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        location?: {
            search?: string;
            pathname?: string;
            hash?: string;
        };
        userAgent?: string;
        referrer?: string;
        timestamp?: Date;
        platform?: "mobile" | "desktop" | "web";
    }, {
        location?: {
            search?: string;
            pathname?: string;
            hash?: string;
        };
        userAgent?: string;
        referrer?: string;
        timestamp?: Date;
        platform?: "mobile" | "desktop" | "web";
    }>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        location?: {
            search?: string;
            pathname?: string;
            hash?: string;
        };
        userAgent?: string;
        referrer?: string;
        timestamp?: Date;
        platform?: "mobile" | "desktop" | "web";
    };
    createdAt?: Date;
    userId?: string;
    sessionId?: string;
    eventType?: "post_like" | "page_view" | "post_create" | "post_comment" | "space_join" | "space_leave" | "tool_use" | "ritual_participate" | "profile_update" | "search_query" | "notification_click" | "app_background" | "app_foreground";
    eventData?: Record<string, any>;
}, {
    metadata?: {
        location?: {
            search?: string;
            pathname?: string;
            hash?: string;
        };
        userAgent?: string;
        referrer?: string;
        timestamp?: Date;
        platform?: "mobile" | "desktop" | "web";
    };
    createdAt?: Date;
    userId?: string;
    sessionId?: string;
    eventType?: "post_like" | "page_view" | "post_create" | "post_comment" | "space_join" | "space_leave" | "tool_use" | "ritual_participate" | "profile_update" | "search_query" | "notification_click" | "app_background" | "app_foreground";
    eventData?: Record<string, any>;
}>;
export type UserAnalytics = z.infer<typeof UserAnalyticsSchema>;
export type SpaceAnalytics = z.infer<typeof SpaceAnalyticsSchema>;
export type PlatformAnalytics = z.infer<typeof PlatformAnalyticsSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export declare const UserAnalyticsConverter: {
    toFirestore: (analytics: UserAnalytics) => {
        createdAt: Date;
        updatedAt: Date;
        date?: string;
        userId?: string;
        dailyActiveMinutes?: number;
        sessionsCount?: number;
        postsCreated?: number;
        postsLiked?: number;
        spacesVisited?: string[];
        toolsUsed?: string[];
        ritualsParticipated?: string[];
        engagementScore?: number;
    };
    fromFirestore: (data: any) => UserAnalytics;
};
export declare const AnalyticsEventConverter: {
    toFirestore: (event: AnalyticsEvent) => {
        metadata: {
            timestamp: Date;
            location?: {
                search?: string;
                pathname?: string;
                hash?: string;
            };
            userAgent?: string;
            referrer?: string;
            platform?: "mobile" | "desktop" | "web";
        };
        createdAt: Date;
        userId?: string;
        sessionId?: string;
        eventType?: "post_like" | "page_view" | "post_create" | "post_comment" | "space_join" | "space_leave" | "tool_use" | "ritual_participate" | "profile_update" | "search_query" | "notification_click" | "app_background" | "app_foreground";
        eventData?: Record<string, any>;
    };
    fromFirestore: (data: any) => AnalyticsEvent;
};
export declare const ANALYTICS_COLLECTIONS: {
    readonly USER_ANALYTICS: (userId: string) => string;
    readonly SPACE_ANALYTICS: (spaceId: string) => string;
    readonly PLATFORM_ANALYTICS: "platform_analytics";
    readonly EVENTS: "analytics_events";
    readonly USER_EVENTS: (userId: string) => string;
};
export declare const AnalyticsUtils: {
    createEvent: (userId: string, eventType: AnalyticsEvent["eventType"], eventData?: Record<string, any>, sessionId?: string) => Omit<AnalyticsEvent, "createdAt">;
    aggregateUserMetrics: (events: AnalyticsEvent[]) => Partial<UserAnalytics>;
    calculateEngagementScore: (analytics: UserAnalytics) => number;
};
//# sourceMappingURL=analytics.d.ts.map