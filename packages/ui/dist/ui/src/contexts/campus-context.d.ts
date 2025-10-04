import * as React from "react";
import type { User, Space, Connection } from "@hive/core";
/**
 * Campus Context System
 * Provides unified campus state and context across all slices
 */
export interface CampusLocation {
    id: string;
    name: string;
    type: 'building' | 'outdoor' | 'dorm' | 'academic' | 'recreational';
    coordinates?: {
        lat: number;
        lng: number;
    };
    address?: string;
    campusZone: 'north' | 'south' | 'center' | 'off-campus';
}
export interface CampusProximityData {
    currentBuilding?: CampusLocation;
    nearbyBuildings: CampusLocation[];
    walkingDistance: Record<string, number>;
    frequentLocations: CampusLocation[];
}
export interface CampusActivityStream {
    recentPosts: number;
    activeSpaces: number;
    onlineUsers: number;
    trending: {
        hashtags: string[];
        spaces: string[];
        events: string[];
    };
}
export interface UpcomingCampusEvent {
    id: string;
    name: string;
    startTime: string;
    location: CampusLocation;
    spaceId?: string;
    attendeeCount: number;
    type: 'academic' | 'social' | 'athletic' | 'cultural';
}
export interface ToolSuggestion {
    toolId: string;
    name: string;
    description: string;
    relevanceScore: number;
    context: 'feed' | 'spaces' | 'profile' | 'general';
    usageHint: string;
}
export interface Tool {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    spaceId?: string;
    usageCount: number;
    category: 'productivity' | 'social' | 'academic' | 'creative';
}
export interface CampusContextValue {
    campus: {
        id: 'ub-buffalo';
        name: 'University at Buffalo';
        timezone: 'America/New_York';
        academicYear: '2024-2025';
        currentSemester: 'fall';
    };
    location: {
        current: CampusLocation | null;
        proximity: CampusProximityData;
        buildings: CampusLocation[];
    };
    community: {
        userSpaces: Space[];
        suggestedSpaces: Space[];
        connections: Connection[];
        campusActivity: CampusActivityStream;
    };
    temporal: {
        timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
        academicPeriod: 'regular' | 'finals' | 'break' | 'rush';
        events: UpcomingCampusEvent[];
    };
    tools: {
        contextualSuggestions: ToolSuggestion[];
        recentlyUsed: Tool[];
        spaceTools: Record<string, Tool[]>;
    };
    actions: {
        updateLocation: (location: CampusLocation | null) => void;
        refreshCommunityData: () => Promise<void>;
        updateToolContext: (context: 'feed' | 'spaces' | 'profile') => void;
        requestLocationPermission: () => Promise<boolean>;
    };
}
export interface CampusProviderProps {
    children: React.ReactNode;
    user?: User;
    initialLocation?: CampusLocation;
}
/**
 * Campus Context Provider
 * Root provider for campus-wide context
 */
export declare function CampusProvider({ children, user, initialLocation }: CampusProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to use campus context
 */
export declare function useCampusContext(): CampusContextValue;
/**
 * Hook for location-specific context
 */
export declare function useCampusLocation(): {
    currentLocation: CampusLocation;
    nearbyBuildings: CampusLocation[];
    campusBuildings: CampusLocation[];
    updateLocation: (location: CampusLocation | null) => void;
    requestPermission: () => Promise<boolean>;
};
/**
 * Hook for community-specific context
 */
export declare function useCampusCommunity(): {
    userSpaces: Space[];
    suggestedSpaces: Space[];
    connections: Connection[];
    campusActivity: CampusActivityStream;
    refreshData: () => Promise<void>;
};
/**
 * Hook for temporal context
 */
export declare function useCampusTemporal(): {
    timeOfDay: "morning" | "afternoon" | "evening" | "night";
    academicPeriod: "regular" | "finals" | "break" | "rush";
    upcomingEvents: UpcomingCampusEvent[];
    isStudyTime: boolean;
    isFinalsTime: boolean;
    isSocialTime: boolean;
};
/**
 * Hook for tool context
 */
export declare function useCampusTools(): {
    contextualSuggestions: ToolSuggestion[];
    recentlyUsed: Tool[];
    spaceTools: Record<string, Tool[]>;
    updateContext: (context: "feed" | "spaces" | "profile") => void;
};
//# sourceMappingURL=campus-context.d.ts.map