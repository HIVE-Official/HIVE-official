interface SpaceLiveData {
    posts: any[];
    events: any[];
    members: any[];
    onlineUsers: string[];
    typingUsers: string[];
    activities: any[];
    unreadCount: number;
    lastUpdate: Date | null;
}
export declare function useSpaceLiveUpdates(spaceId: string, userId: string): SpaceLiveData;
export declare function useSpaceActivityStatus(spaceId: string, userId: string): {
    totalMembers: number;
    onlineMembers: number;
    recentPosts: number;
    upcomingEvents: number;
    isLive: boolean;
    hasRecentActivity: boolean | null;
};
export declare function useSpaceLeaderInsights(spaceId: string): {
    engagement: {
        postsToday: number;
        activeMembers: number;
        upcomingEvents: number;
    };
    trends: {
        growthRate: number;
        popularTimes: never[];
        engagementRate: number;
    };
};
export {};
//# sourceMappingURL=use-space-live-updates.d.ts.map