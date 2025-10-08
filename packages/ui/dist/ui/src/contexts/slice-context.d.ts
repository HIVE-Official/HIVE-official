import * as React from "react";
import type { FeedPost, Space, Tool } from "@hive/core";
/**
 * Slice-specific context system
 * Provides context for each main slice while integrating with campus context
 */
export type SliceType = 'feed' | 'spaces' | 'profile' | 'hivelab';
export interface FeedSliceContext {
    content: {
        personalFeed: FeedPost[];
        campusActivity: FeedPost[];
        communityDiscovery: FeedPost[];
        locationActivity: FeedPost[];
    };
    filters: {
        activeFilters: string[];
        locationFilter: string | null;
        communityFilter: string | null;
        timeFilter: 'today' | 'week' | 'all';
    };
    interactions: {
        recentEngagements: string[];
        savedPosts: string[];
        hiddenPosts: string[];
    };
    campusIntegration: {
        localTrending: string[];
        nearbyActivity: FeedPost[];
        friendActivity: FeedPost[];
        spaceActivity: Record<string, FeedPost[]>;
    };
}
export interface SpacesSliceContext {
    organization: {
        joinedSpaces: Space[];
        discoveredSpaces: Space[];
        recommendedSpaces: Space[];
        nearbySpaces: Space[];
    };
    discovery: {
        searchQuery: string;
        categoryFilter: string | null;
        locationFilter: string | null;
        sortBy: 'activity' | 'members' | 'relevance' | 'distance';
    };
    participation: {
        activeSpaces: Space[];
        leadershipRoles: Record<string, string>;
        recentActivity: Record<string, number>;
    };
    campusIntegration: {
        officialSpaces: Space[];
        buildingSpaces: Space[];
        majorRelatedSpaces: Space[];
        eventBasedSpaces: Space[];
    };
}
export interface ProfileSliceContext {
    identity: {
        campusRole: 'student' | 'alumni' | 'staff';
        graduationYear: number | null;
        major: string | null;
        dorm: string | null;
        interests: string[];
    };
    connections: {
        campusConnections: any[];
        dormmates: any[];
        classmates: any[];
        spaceConnections: Record<string, any[]>;
    };
    activity: {
        recentPosts: FeedPost[];
        spaceParticipation: Record<string, number>;
        toolCreations: Tool[];
        eventsAttended: any[];
    };
    presence: {
        activeSpaces: string[];
        reputationScore: number;
        campusInvolvement: string[];
        visibilitySettings: Record<string, boolean>;
    };
}
export interface HiveLabSliceContext {
    creation: {
        activeProject: Tool | null;
        draftTools: Tool[];
        templates: any[];
        collaborations: any[];
    };
    management: {
        ownedTools: Tool[];
        sharedTools: Tool[];
        usageAnalytics: Record<string, number>;
        feedback: Record<string, any[]>;
    };
    integration: {
        spaceToolRequests: any[];
        feedToolSuggestions: any[];
        profileToolShowcase: Tool[];
    };
    campusEcosystem: {
        popularTools: Tool[];
        campusTemplates: any[];
        communityTools: Tool[];
        officialTools: Tool[];
    };
}
export interface SliceContextValue {
    currentSlice: SliceType;
    feedContext: FeedSliceContext;
    spacesContext: SpacesSliceContext;
    profileContext: ProfileSliceContext;
    hiveLabContext: HiveLabSliceContext;
    actions: {
        setCurrentSlice: (slice: SliceType) => void;
        updateFeedContext: (updates: Partial<FeedSliceContext>) => void;
        updateSpacesContext: (updates: Partial<SpacesSliceContext>) => void;
        updateProfileContext: (updates: Partial<ProfileSliceContext>) => void;
        updateHiveLabContext: (updates: Partial<HiveLabSliceContext>) => void;
        preserveContextOnNavigation: (fromSlice: SliceType, toSlice: SliceType) => void;
    };
}
export interface SliceContextProviderProps {
    children: React.ReactNode;
    initialSlice?: SliceType;
}
/**
 * Slice Context Provider
 * Manages context for each slice while integrating with campus context
 */
export declare function SliceContextProvider({ children, initialSlice }: SliceContextProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to use slice context
 */
export declare function useSliceContext(): SliceContextValue;
/**
 * Hook for feed-specific context
 */
export declare function useFeedContext(): {
    content: {
        personalFeed: FeedPost[];
        campusActivity: FeedPost[];
        communityDiscovery: FeedPost[];
        locationActivity: FeedPost[];
    };
    filters: {
        activeFilters: string[];
        locationFilter: string | null;
        communityFilter: string | null;
        timeFilter: "today" | "week" | "all";
    };
    interactions: {
        recentEngagements: string[];
        savedPosts: string[];
        hiddenPosts: string[];
    };
    campusIntegration: {
        localTrending: string[];
        nearbyActivity: FeedPost[];
        friendActivity: FeedPost[];
        spaceActivity: Record<string, FeedPost[]>;
    };
    updateContext: (updates: Partial<FeedSliceContext>) => void;
};
/**
 * Hook for spaces-specific context
 */
export declare function useSpacesContext(): {
    organization: {
        joinedSpaces: Space[];
        discoveredSpaces: Space[];
        recommendedSpaces: Space[];
        nearbySpaces: Space[];
    };
    discovery: {
        searchQuery: string;
        categoryFilter: string | null;
        locationFilter: string | null;
        sortBy: "activity" | "members" | "relevance" | "distance";
    };
    participation: {
        activeSpaces: Space[];
        leadershipRoles: Record<string, string>;
        recentActivity: Record<string, number>;
    };
    campusIntegration: {
        officialSpaces: Space[];
        buildingSpaces: Space[];
        majorRelatedSpaces: Space[];
        eventBasedSpaces: Space[];
    };
    updateContext: (updates: Partial<SpacesSliceContext>) => void;
};
/**
 * Hook for profile-specific context
 */
export declare function useProfileContext(): {
    identity: {
        campusRole: "student" | "alumni" | "staff";
        graduationYear: number | null;
        major: string | null;
        dorm: string | null;
        interests: string[];
    };
    connections: {
        campusConnections: any[];
        dormmates: any[];
        classmates: any[];
        spaceConnections: Record<string, any[]>;
    };
    activity: {
        recentPosts: FeedPost[];
        spaceParticipation: Record<string, number>;
        toolCreations: Tool[];
        eventsAttended: any[];
    };
    presence: {
        activeSpaces: string[];
        reputationScore: number;
        campusInvolvement: string[];
        visibilitySettings: Record<string, boolean>;
    };
    updateContext: (updates: Partial<ProfileSliceContext>) => void;
};
/**
 * Hook for HiveLab-specific context
 */
export declare function useHiveLabContext(): {
    creation: {
        activeProject: Tool | null;
        draftTools: Tool[];
        templates: any[];
        collaborations: any[];
    };
    management: {
        ownedTools: Tool[];
        sharedTools: Tool[];
        usageAnalytics: Record<string, number>;
        feedback: Record<string, any[]>;
    };
    integration: {
        spaceToolRequests: any[];
        feedToolSuggestions: any[];
        profileToolShowcase: Tool[];
    };
    campusEcosystem: {
        popularTools: Tool[];
        campusTemplates: any[];
        communityTools: Tool[];
        officialTools: Tool[];
    };
    updateContext: (updates: Partial<HiveLabSliceContext>) => void;
};
//# sourceMappingURL=slice-context.d.ts.map