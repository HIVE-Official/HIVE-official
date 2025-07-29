import { z } from 'zod';
export declare const FeedAnalyticsEventSchema: z.ZodDiscriminatedUnion<"event", [z.ZodObject<{
    event: z.ZodLiteral<"space_feed_viewed">;
    spaceId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        postsVisible: z.ZodNumber;
        scrollDepth: z.ZodNumber;
        timeSpent: z.ZodNumber;
        deviceType: z.ZodOptional<z.ZodEnum<["mobile", "tablet", "desktop"]>>;
    }, "strip", z.ZodTypeAny, {
        deviceType?: "mobile" | "tablet" | "desktop";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    }, {
        deviceType?: "mobile" | "tablet" | "desktop";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        deviceType?: "mobile" | "tablet" | "desktop";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_feed_viewed";
    spaceId?: string;
}, {
    metadata?: {
        deviceType?: "mobile" | "tablet" | "desktop";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_feed_viewed";
    spaceId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"post_created">;
    spaceId: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        postType: z.ZodEnum<["text", "image", "poll", "event", "toolshare"]>;
        contentLength: z.ZodNumber;
        hasMentions: z.ZodBoolean;
        hasRichFormatting: z.ZodBoolean;
        draftTime: z.ZodOptional<z.ZodNumber>;
        composerSource: z.ZodDefault<z.ZodEnum<["inline", "modal"]>>;
    }, "strip", z.ZodTypeAny, {
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "modal" | "inline";
    }, {
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "modal" | "inline";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "modal" | "inline";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_created";
    spaceId?: string;
    postId?: string;
}, {
    metadata?: {
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "modal" | "inline";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_created";
    spaceId?: string;
    postId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"post_reacted">;
    spaceId: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        reaction: z.ZodEnum<["heart"]>;
        action: z.ZodEnum<["add", "remove"]>;
        postAge: z.ZodNumber;
        authorId: z.ZodString;
        isOwnPost: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        action?: "add" | "remove";
        authorId?: string;
        reaction?: "heart";
        postAge?: number;
        isOwnPost?: boolean;
    }, {
        action?: "add" | "remove";
        authorId?: string;
        reaction?: "heart";
        postAge?: number;
        isOwnPost?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        action?: "add" | "remove";
        authorId?: string;
        reaction?: "heart";
        postAge?: number;
        isOwnPost?: boolean;
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_reacted";
    spaceId?: string;
    postId?: string;
}, {
    metadata?: {
        action?: "add" | "remove";
        authorId?: string;
        reaction?: "heart";
        postAge?: number;
        isOwnPost?: boolean;
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_reacted";
    spaceId?: string;
    postId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"post_viewed">;
    spaceId: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        viewDuration: z.ZodNumber;
        scrolledToEnd: z.ZodBoolean;
        authorId: z.ZodString;
        postType: z.ZodEnum<["text", "image", "poll", "event", "toolshare"]>;
        postAge: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        authorId?: string;
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    }, {
        authorId?: string;
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        authorId?: string;
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_viewed";
    spaceId?: string;
    postId?: string;
}, {
    metadata?: {
        authorId?: string;
        postType?: "image" | "text" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_viewed";
    spaceId?: string;
    postId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"post_edited">;
    spaceId: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        editTime: z.ZodNumber;
        contentLengthBefore: z.ZodNumber;
        contentLengthAfter: z.ZodNumber;
        editReason: z.ZodOptional<z.ZodEnum<["typo", "clarification", "addition", "other"]>>;
    }, "strip", z.ZodTypeAny, {
        editTime?: number;
        contentLengthBefore?: number;
        contentLengthAfter?: number;
        editReason?: "other" | "typo" | "clarification" | "addition";
    }, {
        editTime?: number;
        contentLengthBefore?: number;
        contentLengthAfter?: number;
        editReason?: "other" | "typo" | "clarification" | "addition";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        editTime?: number;
        contentLengthBefore?: number;
        contentLengthAfter?: number;
        editReason?: "other" | "typo" | "clarification" | "addition";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_edited";
    spaceId?: string;
    postId?: string;
}, {
    metadata?: {
        editTime?: number;
        contentLengthBefore?: number;
        contentLengthAfter?: number;
        editReason?: "other" | "typo" | "clarification" | "addition";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_edited";
    spaceId?: string;
    postId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"post_deleted">;
    spaceId: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        deletedBy: z.ZodEnum<["author", "builder", "admin"]>;
        postAge: z.ZodNumber;
        hadReactions: z.ZodBoolean;
        reactionCount: z.ZodNumber;
        deleteReason: z.ZodOptional<z.ZodEnum<["inappropriate", "spam", "mistake", "other"]>>;
    }, "strip", z.ZodTypeAny, {
        deletedBy?: "builder" | "admin" | "author";
        postAge?: number;
        hadReactions?: boolean;
        reactionCount?: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake";
    }, {
        deletedBy?: "builder" | "admin" | "author";
        postAge?: number;
        hadReactions?: boolean;
        reactionCount?: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        deletedBy?: "builder" | "admin" | "author";
        postAge?: number;
        hadReactions?: boolean;
        reactionCount?: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_deleted";
    spaceId?: string;
    postId?: string;
}, {
    metadata?: {
        deletedBy?: "builder" | "admin" | "author";
        postAge?: number;
        hadReactions?: boolean;
        reactionCount?: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake";
    };
    userId?: string;
    timestamp?: Date;
    event?: "post_deleted";
    spaceId?: string;
    postId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"space_joined">;
    spaceId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        joinMethod: z.ZodEnum<["invite", "browse", "search", "auto"]>;
        referrerSpaceId: z.ZodOptional<z.ZodString>;
        invitedBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        joinMethod?: "search" | "auto" | "invite" | "browse";
        referrerSpaceId?: string;
        invitedBy?: string;
    }, {
        joinMethod?: "search" | "auto" | "invite" | "browse";
        referrerSpaceId?: string;
        invitedBy?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        joinMethod?: "search" | "auto" | "invite" | "browse";
        referrerSpaceId?: string;
        invitedBy?: string;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_joined";
    spaceId?: string;
}, {
    metadata?: {
        joinMethod?: "search" | "auto" | "invite" | "browse";
        referrerSpaceId?: string;
        invitedBy?: string;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_joined";
    spaceId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"space_left">;
    spaceId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        membershipDuration: z.ZodNumber;
        postsCreated: z.ZodNumber;
        reactionsGiven: z.ZodNumber;
        lastActiveAt: z.ZodDate;
        leaveReason: z.ZodOptional<z.ZodEnum<["inactive", "content", "privacy", "other"]>>;
    }, "strip", z.ZodTypeAny, {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "inactive" | "privacy";
    }, {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "inactive" | "privacy";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "inactive" | "privacy";
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_left";
    spaceId?: string;
}, {
    metadata?: {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "inactive" | "privacy";
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_left";
    spaceId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"builder_action">;
    spaceId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        action: z.ZodEnum<["pin_post", "unpin_post", "delete_post", "mute_user", "unmute_user"]>;
        targetId: z.ZodString;
        targetType: z.ZodEnum<["post", "user"]>;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        targetId?: string;
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        reason?: string;
        targetType?: "post" | "user";
    }, {
        targetId?: string;
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        reason?: string;
        targetType?: "post" | "user";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        targetId?: string;
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        reason?: string;
        targetType?: "post" | "user";
    };
    userId?: string;
    timestamp?: Date;
    event?: "builder_action";
    spaceId?: string;
}, {
    metadata?: {
        targetId?: string;
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        reason?: string;
        targetType?: "post" | "user";
    };
    userId?: string;
    timestamp?: Date;
    event?: "builder_action";
    spaceId?: string;
}>, z.ZodObject<{
    event: z.ZodLiteral<"space_heartbeat">;
    spaceId: z.ZodString;
    userId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodObject<{
        sessionId: z.ZodString;
        activeTime: z.ZodNumber;
        tabVisible: z.ZodBoolean;
        scrollPosition: z.ZodNumber;
        lastInteraction: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        sessionId?: string;
        activeTime?: number;
        tabVisible?: boolean;
        scrollPosition?: number;
        lastInteraction?: Date;
    }, {
        sessionId?: string;
        activeTime?: number;
        tabVisible?: boolean;
        scrollPosition?: number;
        lastInteraction?: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        sessionId?: string;
        activeTime?: number;
        tabVisible?: boolean;
        scrollPosition?: number;
        lastInteraction?: Date;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_heartbeat";
    spaceId?: string;
}, {
    metadata?: {
        sessionId?: string;
        activeTime?: number;
        tabVisible?: boolean;
        scrollPosition?: number;
        lastInteraction?: Date;
    };
    userId?: string;
    timestamp?: Date;
    event?: "space_heartbeat";
    spaceId?: string;
}>]>;
export type FeedAnalyticsEvent = z.infer<typeof FeedAnalyticsEventSchema>;
export declare const SpaceEngagementMetricsSchema: z.ZodObject<{
    spaceId: z.ZodString;
    date: z.ZodString;
    metrics: z.ZodObject<{
        activeMembers: z.ZodNumber;
        newMembers: z.ZodNumber;
        leftMembers: z.ZodNumber;
        postsCreated: z.ZodNumber;
        postsByType: z.ZodRecord<z.ZodString, z.ZodNumber>;
        avgPostLength: z.ZodNumber;
        totalReactions: z.ZodNumber;
        avgReactionsPerPost: z.ZodNumber;
        totalViewTime: z.ZodNumber;
        avgSessionDuration: z.ZodNumber;
        builderActions: z.ZodNumber;
        postsModerated: z.ZodNumber;
        topPosts: z.ZodArray<z.ZodObject<{
            postId: z.ZodString;
            reactions: z.ZodNumber;
            views: z.ZodNumber;
            engagementScore: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }, {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        postsCreated?: number;
        activeMembers?: number;
        newMembers?: number;
        leftMembers?: number;
        postsByType?: Record<string, number>;
        avgPostLength?: number;
        totalReactions?: number;
        avgReactionsPerPost?: number;
        totalViewTime?: number;
        avgSessionDuration?: number;
        builderActions?: number;
        postsModerated?: number;
        topPosts?: {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }[];
    }, {
        postsCreated?: number;
        activeMembers?: number;
        newMembers?: number;
        leftMembers?: number;
        postsByType?: Record<string, number>;
        avgPostLength?: number;
        totalReactions?: number;
        avgReactionsPerPost?: number;
        totalViewTime?: number;
        avgSessionDuration?: number;
        builderActions?: number;
        postsModerated?: number;
        topPosts?: {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    date?: string;
    metrics?: {
        postsCreated?: number;
        activeMembers?: number;
        newMembers?: number;
        leftMembers?: number;
        postsByType?: Record<string, number>;
        avgPostLength?: number;
        totalReactions?: number;
        avgReactionsPerPost?: number;
        totalViewTime?: number;
        avgSessionDuration?: number;
        builderActions?: number;
        postsModerated?: number;
        topPosts?: {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }[];
    };
    spaceId?: string;
}, {
    date?: string;
    metrics?: {
        postsCreated?: number;
        activeMembers?: number;
        newMembers?: number;
        leftMembers?: number;
        postsByType?: Record<string, number>;
        avgPostLength?: number;
        totalReactions?: number;
        avgReactionsPerPost?: number;
        totalViewTime?: number;
        avgSessionDuration?: number;
        builderActions?: number;
        postsModerated?: number;
        topPosts?: {
            reactions?: number;
            postId?: string;
            views?: number;
            engagementScore?: number;
        }[];
    };
    spaceId?: string;
}>;
export type SpaceEngagementMetrics = z.infer<typeof SpaceEngagementMetricsSchema>;
export declare const UserFeedBehaviorSchema: z.ZodObject<{
    userId: z.ZodString;
    date: z.ZodString;
    metrics: z.ZodObject<{
        spacesVisited: z.ZodNumber;
        postsCreated: z.ZodNumber;
        reactionsGiven: z.ZodNumber;
        avgSessionDuration: z.ZodNumber;
        peakActivityHour: z.ZodNumber;
        mostActiveSpaceId: z.ZodOptional<z.ZodString>;
        preferredPostTypes: z.ZodArray<z.ZodString, "many">;
        avgPostLength: z.ZodNumber;
        mentionsUsed: z.ZodNumber;
        reactionsReceived: z.ZodNumber;
        postsViewed: z.ZodNumber;
        scrollDepthAvg: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        postsCreated?: number;
        reactionsGiven?: number;
        avgPostLength?: number;
        avgSessionDuration?: number;
        spacesVisited?: number;
        peakActivityHour?: number;
        mostActiveSpaceId?: string;
        preferredPostTypes?: string[];
        mentionsUsed?: number;
        reactionsReceived?: number;
        postsViewed?: number;
        scrollDepthAvg?: number;
    }, {
        postsCreated?: number;
        reactionsGiven?: number;
        avgPostLength?: number;
        avgSessionDuration?: number;
        spacesVisited?: number;
        peakActivityHour?: number;
        mostActiveSpaceId?: string;
        preferredPostTypes?: string[];
        mentionsUsed?: number;
        reactionsReceived?: number;
        postsViewed?: number;
        scrollDepthAvg?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    date?: string;
    metrics?: {
        postsCreated?: number;
        reactionsGiven?: number;
        avgPostLength?: number;
        avgSessionDuration?: number;
        spacesVisited?: number;
        peakActivityHour?: number;
        mostActiveSpaceId?: string;
        preferredPostTypes?: string[];
        mentionsUsed?: number;
        reactionsReceived?: number;
        postsViewed?: number;
        scrollDepthAvg?: number;
    };
    userId?: string;
}, {
    date?: string;
    metrics?: {
        postsCreated?: number;
        reactionsGiven?: number;
        avgPostLength?: number;
        avgSessionDuration?: number;
        spacesVisited?: number;
        peakActivityHour?: number;
        mostActiveSpaceId?: string;
        preferredPostTypes?: string[];
        mentionsUsed?: number;
        reactionsReceived?: number;
        postsViewed?: number;
        scrollDepthAvg?: number;
    };
    userId?: string;
}>;
export type UserFeedBehavior = z.infer<typeof UserFeedBehaviorSchema>;
export declare const FeedAnalyticsConfigSchema: z.ZodObject<{
    batchSize: z.ZodDefault<z.ZodNumber>;
    flushInterval: z.ZodDefault<z.ZodNumber>;
    hashUserIds: z.ZodDefault<z.ZodBoolean>;
    retentionDays: z.ZodDefault<z.ZodNumber>;
    sampleRate: z.ZodDefault<z.ZodNumber>;
    dataset: z.ZodDefault<z.ZodString>;
    feedEventsTable: z.ZodDefault<z.ZodString>;
    spaceMetricsTable: z.ZodDefault<z.ZodString>;
    userBehaviorTable: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    batchSize?: number;
    flushInterval?: number;
    hashUserIds?: boolean;
    retentionDays?: number;
    sampleRate?: number;
    dataset?: string;
    feedEventsTable?: string;
    spaceMetricsTable?: string;
    userBehaviorTable?: string;
}, {
    batchSize?: number;
    flushInterval?: number;
    hashUserIds?: boolean;
    retentionDays?: number;
    sampleRate?: number;
    dataset?: string;
    feedEventsTable?: string;
    spaceMetricsTable?: string;
    userBehaviorTable?: string;
}>;
export type FeedAnalyticsConfig = z.infer<typeof FeedAnalyticsConfigSchema>;
export declare const createFeedEvent: <T extends FeedAnalyticsEvent["event"]>(event: T, data: Omit<Extract<FeedAnalyticsEvent, {
    event: T;
}>, "event" | "timestamp"> & {
    timestamp?: Date;
}) => Extract<FeedAnalyticsEvent, {
    event: T;
}>;
export declare const hashUserIdForFeed: (userId: string, salt?: string) => string;
export declare const calculateEngagementScore: (reactions: number, views: number, postAge: number, // in hours
spaceSize: number) => number;
//# sourceMappingURL=feed.d.ts.map