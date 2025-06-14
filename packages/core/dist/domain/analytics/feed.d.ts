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
        timeSpent: number;
        postsVisible: number;
        scrollDepth: number;
        deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    }, {
        timeSpent: number;
        postsVisible: number;
        scrollDepth: number;
        deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "space_feed_viewed";
    userId: string;
    metadata: {
        timeSpent: number;
        postsVisible: number;
        scrollDepth: number;
        deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    };
    spaceId: string;
    timestamp: Date;
}, {
    event: "space_feed_viewed";
    userId: string;
    metadata: {
        timeSpent: number;
        postsVisible: number;
        scrollDepth: number;
        deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    };
    spaceId: string;
    timestamp: Date;
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
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        contentLength: number;
        hasMentions: boolean;
        hasRichFormatting: boolean;
        composerSource: "inline" | "modal";
        draftTime?: number | undefined;
    }, {
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        contentLength: number;
        hasMentions: boolean;
        hasRichFormatting: boolean;
        draftTime?: number | undefined;
        composerSource?: "inline" | "modal" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "post_created";
    userId: string;
    metadata: {
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        contentLength: number;
        hasMentions: boolean;
        hasRichFormatting: boolean;
        composerSource: "inline" | "modal";
        draftTime?: number | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
}, {
    event: "post_created";
    userId: string;
    metadata: {
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        contentLength: number;
        hasMentions: boolean;
        hasRichFormatting: boolean;
        draftTime?: number | undefined;
        composerSource?: "inline" | "modal" | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
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
        authorId: string;
        reaction: "heart";
        action: "add" | "remove";
        postAge: number;
        isOwnPost: boolean;
    }, {
        authorId: string;
        reaction: "heart";
        action: "add" | "remove";
        postAge: number;
        isOwnPost: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "post_reacted";
    userId: string;
    metadata: {
        authorId: string;
        reaction: "heart";
        action: "add" | "remove";
        postAge: number;
        isOwnPost: boolean;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
}, {
    event: "post_reacted";
    userId: string;
    metadata: {
        authorId: string;
        reaction: "heart";
        action: "add" | "remove";
        postAge: number;
        isOwnPost: boolean;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
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
        authorId: string;
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        postAge: number;
        viewDuration: number;
        scrolledToEnd: boolean;
    }, {
        authorId: string;
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        postAge: number;
        viewDuration: number;
        scrolledToEnd: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "post_viewed";
    userId: string;
    metadata: {
        authorId: string;
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        postAge: number;
        viewDuration: number;
        scrolledToEnd: boolean;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
}, {
    event: "post_viewed";
    userId: string;
    metadata: {
        authorId: string;
        postType: "text" | "event" | "image" | "poll" | "toolshare";
        postAge: number;
        viewDuration: number;
        scrolledToEnd: boolean;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
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
        editTime: number;
        contentLengthBefore: number;
        contentLengthAfter: number;
        editReason?: "typo" | "clarification" | "addition" | "other" | undefined;
    }, {
        editTime: number;
        contentLengthBefore: number;
        contentLengthAfter: number;
        editReason?: "typo" | "clarification" | "addition" | "other" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "post_edited";
    userId: string;
    metadata: {
        editTime: number;
        contentLengthBefore: number;
        contentLengthAfter: number;
        editReason?: "typo" | "clarification" | "addition" | "other" | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
}, {
    event: "post_edited";
    userId: string;
    metadata: {
        editTime: number;
        contentLengthBefore: number;
        contentLengthAfter: number;
        editReason?: "typo" | "clarification" | "addition" | "other" | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
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
        deletedBy: "admin" | "builder" | "author";
        postAge: number;
        hadReactions: boolean;
        reactionCount: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake" | undefined;
    }, {
        deletedBy: "admin" | "builder" | "author";
        postAge: number;
        hadReactions: boolean;
        reactionCount: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "post_deleted";
    userId: string;
    metadata: {
        deletedBy: "admin" | "builder" | "author";
        postAge: number;
        hadReactions: boolean;
        reactionCount: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake" | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
}, {
    event: "post_deleted";
    userId: string;
    metadata: {
        deletedBy: "admin" | "builder" | "author";
        postAge: number;
        hadReactions: boolean;
        reactionCount: number;
        deleteReason?: "other" | "inappropriate" | "spam" | "mistake" | undefined;
    };
    spaceId: string;
    timestamp: Date;
    postId: string;
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
        joinMethod: "auto" | "search" | "invite" | "browse";
        referrerSpaceId?: string | undefined;
        invitedBy?: string | undefined;
    }, {
        joinMethod: "auto" | "search" | "invite" | "browse";
        referrerSpaceId?: string | undefined;
        invitedBy?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "space_joined";
    userId: string;
    metadata: {
        joinMethod: "auto" | "search" | "invite" | "browse";
        referrerSpaceId?: string | undefined;
        invitedBy?: string | undefined;
    };
    spaceId: string;
    timestamp: Date;
}, {
    event: "space_joined";
    userId: string;
    metadata: {
        joinMethod: "auto" | "search" | "invite" | "browse";
        referrerSpaceId?: string | undefined;
        invitedBy?: string | undefined;
    };
    spaceId: string;
    timestamp: Date;
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
        lastActiveAt: Date;
        membershipDuration: number;
        postsCreated: number;
        reactionsGiven: number;
        leaveReason?: "privacy" | "content" | "other" | "inactive" | undefined;
    }, {
        lastActiveAt: Date;
        membershipDuration: number;
        postsCreated: number;
        reactionsGiven: number;
        leaveReason?: "privacy" | "content" | "other" | "inactive" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "space_left";
    userId: string;
    metadata: {
        lastActiveAt: Date;
        membershipDuration: number;
        postsCreated: number;
        reactionsGiven: number;
        leaveReason?: "privacy" | "content" | "other" | "inactive" | undefined;
    };
    spaceId: string;
    timestamp: Date;
}, {
    event: "space_left";
    userId: string;
    metadata: {
        lastActiveAt: Date;
        membershipDuration: number;
        postsCreated: number;
        reactionsGiven: number;
        leaveReason?: "privacy" | "content" | "other" | "inactive" | undefined;
    };
    spaceId: string;
    timestamp: Date;
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
        action: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId: string;
        targetType: "post" | "user";
        reason?: string | undefined;
    }, {
        action: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId: string;
        targetType: "post" | "user";
        reason?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "builder_action";
    userId: string;
    metadata: {
        action: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId: string;
        targetType: "post" | "user";
        reason?: string | undefined;
    };
    spaceId: string;
    timestamp: Date;
}, {
    event: "builder_action";
    userId: string;
    metadata: {
        action: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId: string;
        targetType: "post" | "user";
        reason?: string | undefined;
    };
    spaceId: string;
    timestamp: Date;
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
        sessionId: string;
        activeTime: number;
        tabVisible: boolean;
        scrollPosition: number;
        lastInteraction: Date;
    }, {
        sessionId: string;
        activeTime: number;
        tabVisible: boolean;
        scrollPosition: number;
        lastInteraction: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    event: "space_heartbeat";
    userId: string;
    metadata: {
        sessionId: string;
        activeTime: number;
        tabVisible: boolean;
        scrollPosition: number;
        lastInteraction: Date;
    };
    spaceId: string;
    timestamp: Date;
}, {
    event: "space_heartbeat";
    userId: string;
    metadata: {
        sessionId: string;
        activeTime: number;
        tabVisible: boolean;
        scrollPosition: number;
        lastInteraction: Date;
    };
    spaceId: string;
    timestamp: Date;
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
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
        }, {
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        postsCreated: number;
        activeMembers: number;
        newMembers: number;
        leftMembers: number;
        postsByType: Record<string, number>;
        avgPostLength: number;
        totalReactions: number;
        avgReactionsPerPost: number;
        totalViewTime: number;
        avgSessionDuration: number;
        builderActions: number;
        postsModerated: number;
        topPosts: {
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
        }[];
    }, {
        postsCreated: number;
        activeMembers: number;
        newMembers: number;
        leftMembers: number;
        postsByType: Record<string, number>;
        avgPostLength: number;
        totalReactions: number;
        avgReactionsPerPost: number;
        totalViewTime: number;
        avgSessionDuration: number;
        builderActions: number;
        postsModerated: number;
        topPosts: {
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    date: string;
    spaceId: string;
    metrics: {
        postsCreated: number;
        activeMembers: number;
        newMembers: number;
        leftMembers: number;
        postsByType: Record<string, number>;
        avgPostLength: number;
        totalReactions: number;
        avgReactionsPerPost: number;
        totalViewTime: number;
        avgSessionDuration: number;
        builderActions: number;
        postsModerated: number;
        topPosts: {
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
        }[];
    };
}, {
    date: string;
    spaceId: string;
    metrics: {
        postsCreated: number;
        activeMembers: number;
        newMembers: number;
        leftMembers: number;
        postsByType: Record<string, number>;
        avgPostLength: number;
        totalReactions: number;
        avgReactionsPerPost: number;
        totalViewTime: number;
        avgSessionDuration: number;
        builderActions: number;
        postsModerated: number;
        topPosts: {
            reactions: number;
            postId: string;
            views: number;
            engagementScore: number;
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
        postsCreated: number;
        reactionsGiven: number;
        avgPostLength: number;
        avgSessionDuration: number;
        spacesVisited: number;
        peakActivityHour: number;
        preferredPostTypes: string[];
        mentionsUsed: number;
        reactionsReceived: number;
        postsViewed: number;
        scrollDepthAvg: number;
        mostActiveSpaceId?: string | undefined;
    }, {
        postsCreated: number;
        reactionsGiven: number;
        avgPostLength: number;
        avgSessionDuration: number;
        spacesVisited: number;
        peakActivityHour: number;
        preferredPostTypes: string[];
        mentionsUsed: number;
        reactionsReceived: number;
        postsViewed: number;
        scrollDepthAvg: number;
        mostActiveSpaceId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    date: string;
    userId: string;
    metrics: {
        postsCreated: number;
        reactionsGiven: number;
        avgPostLength: number;
        avgSessionDuration: number;
        spacesVisited: number;
        peakActivityHour: number;
        preferredPostTypes: string[];
        mentionsUsed: number;
        reactionsReceived: number;
        postsViewed: number;
        scrollDepthAvg: number;
        mostActiveSpaceId?: string | undefined;
    };
}, {
    date: string;
    userId: string;
    metrics: {
        postsCreated: number;
        reactionsGiven: number;
        avgPostLength: number;
        avgSessionDuration: number;
        spacesVisited: number;
        peakActivityHour: number;
        preferredPostTypes: string[];
        mentionsUsed: number;
        reactionsReceived: number;
        postsViewed: number;
        scrollDepthAvg: number;
        mostActiveSpaceId?: string | undefined;
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
    batchSize: number;
    flushInterval: number;
    hashUserIds: boolean;
    retentionDays: number;
    sampleRate: number;
    dataset: string;
    feedEventsTable: string;
    spaceMetricsTable: string;
    userBehaviorTable: string;
}, {
    batchSize?: number | undefined;
    flushInterval?: number | undefined;
    hashUserIds?: boolean | undefined;
    retentionDays?: number | undefined;
    sampleRate?: number | undefined;
    dataset?: string | undefined;
    feedEventsTable?: string | undefined;
    spaceMetricsTable?: string | undefined;
    userBehaviorTable?: string | undefined;
}>;
export type FeedAnalyticsConfig = z.infer<typeof FeedAnalyticsConfigSchema>;
export declare const createFeedEvent: <T extends FeedAnalyticsEvent["event"]>(event: T, data: Omit<Extract<FeedAnalyticsEvent, {
    event: T;
}>, "event" | "timestamp"> & {
    timestamp?: Date;
}) => Extract<FeedAnalyticsEvent, {
    event: T;
}>;
export declare const hashUserId: (userId: string, salt?: string) => string;
export declare const calculateEngagementScore: (reactions: number, views: number, postAge: number, // in hours
spaceSize: number) => number;
//# sourceMappingURL=feed.d.ts.map