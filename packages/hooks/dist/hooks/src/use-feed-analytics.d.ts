import type { FeedAnalyticsConfig, FeedItemType, FeedInteractionType } from "@hive/core";
interface UseFeedAnalyticsOptions {
    spaceId: string;
    userId: string;
    config?: Partial<FeedAnalyticsConfig>;
}
interface FeedAnalyticsHook {
    trackPostCreated: (data: {
        postId: string;
        postType: "text" | "image" | "poll" | "event" | "toolshare";
        contentLength: number;
        hasMentions: boolean;
        hasRichFormatting: boolean;
        draftTime?: number;
    }) => void;
    trackPostReacted: (data: {
        postId: string;
        reaction: "heart";
        action: "add" | "remove";
        postAge: number;
        authorId: string;
        isOwnPost: boolean;
    }) => void;
    trackPostViewed: (data: {
        postId: string;
        viewDuration: number;
        scrolledToEnd: boolean;
        authorId: string;
        postType: "text" | "image" | "poll" | "event" | "toolshare";
        postAge: number;
    }) => void;
    trackPostEdited: (data: {
        postId: string;
        editTime: number;
        contentLengthBefore: number;
        contentLengthAfter: number;
        editReason?: "typo" | "clarification" | "addition" | "other";
    }) => void;
    trackPostDeleted: (data: {
        postId: string;
        deletedBy: "author" | "builder" | "admin";
        postAge: number;
        hadReactions: boolean;
        reactionCount: number;
        deleteReason?: "inappropriate" | "spam" | "mistake" | "other";
    }) => void;
    trackSpaceJoined: (data: {
        joinMethod: "invite" | "browse" | "search" | "auto";
        referrerSpaceId?: string;
        invitedBy?: string;
    }) => void;
    trackSpaceLeft: (data: {
        membershipDuration: number;
        postsCreated: number;
        reactionsGiven: number;
        lastActiveAt: Date;
        leaveReason?: "inactive" | "content" | "privacy" | "other";
    }) => void;
    trackBuilderAction: (data: {
        action: "pin_post" | "unpin_post" | "delete_post" | "mute_user" | "unmute_user";
        targetId: string;
        targetType: "post" | "user";
        reason?: string;
    }) => void;
    trackFeedViewed: (data: {
        postsVisible: number;
        scrollDepth: number;
        timeSpent: number;
        deviceType?: "mobile" | "tablet" | "desktop";
    }) => void;
    startSession: () => void;
    endSession: () => void;
    isSessionActive: boolean;
    trackFeedView: (feedId: string, itemCount: number) => void;
    trackItemView: (itemId: string, itemType: FeedItemType, position: number) => void;
    trackItemInteraction: (itemId: string, itemType: FeedItemType, interactionType: FeedInteractionType, position: number, data?: Record<string, unknown>) => void;
    trackFeedError: (error: Error, context?: Record<string, unknown>) => void;
    trackFeedRefresh: (feedId: string, reason?: string) => void;
    trackFeedFilter: (filters: Record<string, unknown>) => void;
}
export declare const useFeedAnalytics: ({ spaceId, userId, config, }: UseFeedAnalyticsOptions) => FeedAnalyticsHook;
export {};
//# sourceMappingURL=use-feed-analytics.d.ts.map