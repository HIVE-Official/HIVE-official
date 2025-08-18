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
        deviceType?: "mobile" | "desktop" | "tablet";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    }, {
        deviceType?: "mobile" | "desktop" | "tablet";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        deviceType?: "mobile" | "desktop" | "tablet";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    };
    event?: "space_feed_viewed";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
}, {
    metadata?: {
        deviceType?: "mobile" | "desktop" | "tablet";
        timeSpent?: number;
        postsVisible?: number;
        scrollDepth?: number;
    };
    event?: "space_feed_viewed";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "inline" | "modal";
    }, {
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "inline" | "modal";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "inline" | "modal";
    };
    event?: "post_created";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
    postId?: string;
}, {
    metadata?: {
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        contentLength?: number;
        hasMentions?: boolean;
        hasRichFormatting?: boolean;
        draftTime?: number;
        composerSource?: "inline" | "modal";
    };
    event?: "post_created";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    event?: "post_reacted";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
    postId?: string;
}, {
    metadata?: {
        action?: "add" | "remove";
        authorId?: string;
        reaction?: "heart";
        postAge?: number;
        isOwnPost?: boolean;
    };
    event?: "post_reacted";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    }, {
        authorId?: string;
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        authorId?: string;
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    };
    event?: "post_viewed";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
    postId?: string;
}, {
    metadata?: {
        authorId?: string;
        postType?: "text" | "image" | "event" | "poll" | "toolshare";
        postAge?: number;
        viewDuration?: number;
        scrolledToEnd?: boolean;
    };
    event?: "post_viewed";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    event?: "post_edited";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
    postId?: string;
}, {
    metadata?: {
        editTime?: number;
        contentLengthBefore?: number;
        contentLengthAfter?: number;
        editReason?: "other" | "typo" | "clarification" | "addition";
    };
    event?: "post_edited";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    event?: "post_deleted";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
    postId?: string;
}, {
    metadata?: {
        deletedBy?: "builder" | "admin" | "author";
        postAge?: number;
        hadReactions?: boolean;
        reactionCount?: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake";
    };
    event?: "post_deleted";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    event?: "space_joined";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
}, {
    metadata?: {
        joinMethod?: "search" | "auto" | "invite" | "browse";
        referrerSpaceId?: string;
        invitedBy?: string;
    };
    event?: "space_joined";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
        leaveReason?: "content" | "other" | "privacy" | "inactive";
    }, {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "privacy" | "inactive";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "privacy" | "inactive";
    };
    event?: "space_left";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
}, {
    metadata?: {
        lastActiveAt?: Date;
        membershipDuration?: number;
        postsCreated?: number;
        reactionsGiven?: number;
        leaveReason?: "content" | "other" | "privacy" | "inactive";
    };
    event?: "space_left";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId?: string;
        reason?: string;
        targetType?: "user" | "post";
    }, {
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId?: string;
        reason?: string;
        targetType?: "user" | "post";
    }>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId?: string;
        reason?: string;
        targetType?: "user" | "post";
    };
    event?: "builder_action";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
}, {
    metadata?: {
        action?: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId?: string;
        reason?: string;
        targetType?: "user" | "post";
    };
    event?: "builder_action";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    event?: "space_heartbeat";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
}, {
    metadata?: {
        sessionId?: string;
        activeTime?: number;
        tabVisible?: boolean;
        scrollPosition?: number;
        lastInteraction?: Date;
    };
    event?: "space_heartbeat";
    spaceId?: string;
    userId?: string;
    timestamp?: Date;
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
    spaceId?: string;
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
}, {
    date?: string;
    spaceId?: string;
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
    userId?: string;
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
}, {
    date?: string;
    userId?: string;
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