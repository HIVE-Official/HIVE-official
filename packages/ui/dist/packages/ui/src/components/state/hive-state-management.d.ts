/**
 * HIVE State Management Framework
 *
 * Social-first state management with tool-level permissions and feed-centric persistence:
 * - Auth flow with .edu verification
 * - Profile completion tracking (% complete, next steps)
 * - Tool permission levels (view, use, edit, create)
 * - Builder status progression (novice → intermediate → advanced)
 * - State persistence (always return to feed unless deep-linked)
 */
import React from 'react';
export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'onboarding';
export type ProfileCompletionStage = 'welcome' | 'academics' | 'handle' | 'photo' | 'legal' | 'complete';
export type BuilderLevel = 'novice' | 'intermediate' | 'advanced' | 'expert';
export type ToolPermission = 'view' | 'use' | 'edit' | 'create' | 'admin';
export type SpaceMembershipRole = 'member' | 'leader' | 'admin';
export type GhostModeStatus = 'visible' | 'ghost';
export interface User {
    id: string;
    handle: string;
    name: string;
    email: string;
    avatar?: string;
    university: string;
    year: string;
    major: string;
    builderLevel: BuilderLevel;
    ghostMode: GhostModeStatus;
    joinedAt: Date;
    lastActive: Date;
    profileCompletion: {
        stage: ProfileCompletionStage;
        percentage: number;
        nextSteps: string[];
    };
    privacy: {
        profileVisibility: 'private' | 'friends' | 'public';
        toolSharingDefault: 'private' | 'space' | 'public';
        activityTracking: boolean;
        friendDiscovery: boolean;
    };
    social?: {
        friends: string[];
        blockedUsers: string[];
        favoriteSpaces: string[];
    };
}
export interface Space {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'residential' | 'social' | 'campus-wide';
    memberCount: number;
    isActive: boolean;
    friendMembers: string[];
    recentActivity: number;
    trending: boolean;
    rssEvents?: {
        source: string;
        lastUpdate: Date;
        eventCount: number;
    };
}
export interface Tool {
    id: string;
    name: string;
    description: string;
    category: 'personal' | 'space' | 'ritual';
    createdBy: string;
    permissions: {
        view: ToolPermission;
        use: ToolPermission;
        edit: ToolPermission;
        create: ToolPermission;
        share: 'private' | 'space' | 'friends' | 'public';
    };
    usageStats: {
        totalUses: number;
        uniqueUsers: number;
        lastUsed: Date;
    };
    shareableUrl?: string;
    previewCard?: {
        title: string;
        description: string;
        image?: string;
    };
}
export interface AppState {
    auth: {
        status: AuthStatus;
        user: User | null;
        sessionToken?: string;
        emailVerified: boolean;
    };
    navigation: {
        currentRoute: string;
        previousRoute: string;
        returnToFeed: boolean;
        deepLinked: boolean;
    };
    spaces: {
        joined: Space[];
        discovered: Space[];
        memberships: Record<string, {
            spaceId: string;
            role: SpaceMembershipRole;
            joinedAt: Date;
            isActive: boolean;
        }>;
    };
    tools: {
        personal: Tool[];
        accessible: Tool[];
        created: Tool[];
        permissionCache: Record<string, {
            toolId: string;
            canView: boolean;
            canUse: boolean;
            canEdit: boolean;
            canShare: boolean;
            lastChecked: Date;
        }>;
    };
    feed: {
        timeline: any[];
        unreadCount: number;
        lastRefresh: Date;
        filters: {
            spaceTypes: string[];
            showFriends: boolean;
            showAnnouncements: boolean;
        };
    };
    ui: {
        theme: 'dark' | 'light';
        reducedMotion: boolean;
        compactMode: boolean;
        isMobile: boolean;
        bottomTabsVisible: boolean;
        activeModal: string | null;
        commandPaletteOpen: boolean;
        notificationsOpen: boolean;
    };
    features: {
        socialFeaturesEnabled: boolean;
        builderToolsEnabled: boolean;
        ritualParticipation: boolean;
        deepLinkSharing: boolean;
    };
}
export type StateAction = {
    type: 'AUTH_START_LOGIN';
    payload: {
        email: string;
    };
} | {
    type: 'AUTH_VERIFY_EMAIL';
    payload: {
        token: string;
    };
} | {
    type: 'AUTH_LOGIN_SUCCESS';
    payload: {
        user: User;
        token: string;
    };
} | {
    type: 'AUTH_LOGOUT';
} | {
    type: 'AUTH_UPDATE_PROFILE';
    payload: Partial<User>;
} | {
    type: 'PROFILE_ADVANCE_STAGE';
    payload: {
        stage: ProfileCompletionStage;
        data: any;
    };
} | {
    type: 'PROFILE_UPDATE_COMPLETION';
    payload: {
        percentage: number;
        nextSteps: string[];
    };
} | {
    type: 'NAVIGATE_TO';
    payload: {
        route: string;
        fromDeepLink?: boolean;
    };
} | {
    type: 'NAVIGATE_BACK_TO_FEED';
} | {
    type: 'SET_RETURN_TO_FEED';
    payload: boolean;
} | {
    type: 'SPACE_JOIN';
    payload: {
        spaceId: string;
        role?: SpaceMembershipRole;
    };
} | {
    type: 'SPACE_LEAVE';
    payload: {
        spaceId: string;
    };
} | {
    type: 'SPACES_LOAD_DISCOVERED';
    payload: {
        spaces: Space[];
    };
} | {
    type: 'SPACE_UPDATE_SOCIAL_PROOF';
    payload: {
        spaceId: string;
        memberCount: number;
        friendMembers: string[];
    };
} | {
    type: 'TOOL_CREATE';
    payload: {
        tool: Tool;
    };
} | {
    type: 'TOOL_UPDATE_PERMISSIONS';
    payload: {
        toolId: string;
        permissions: Tool['permissions'];
    };
} | {
    type: 'TOOL_CACHE_PERMISSIONS';
    payload: {
        toolId: string;
        permissions: any;
    };
} | {
    type: 'TOOLS_LOAD_ACCESSIBLE';
    payload: {
        tools: Tool[];
    };
} | {
    type: 'FEED_REFRESH';
    payload: {
        items: any[];
    };
} | {
    type: 'FEED_UPDATE_FILTERS';
    payload: Partial<AppState['feed']['filters']>;
} | {
    type: 'FEED_MARK_READ';
} | {
    type: 'UI_SET_MOBILE';
    payload: boolean;
} | {
    type: 'UI_TOGGLE_COMMAND_PALETTE';
} | {
    type: 'UI_OPEN_MODAL';
    payload: string;
} | {
    type: 'UI_CLOSE_MODAL';
} | {
    type: 'FEATURE_ENABLE';
    payload: {
        feature: keyof AppState['features'];
        enabled: boolean;
    };
};
interface StateContextType {
    state: AppState;
    dispatch: React.Dispatch<StateAction>;
    isAuthenticated: boolean;
    isOnboarding: boolean;
    currentUser: User | null;
    checkToolPermission: (toolId: string, permission: ToolPermission) => boolean;
    getSpaceMembership: (spaceId: string) => any | null;
    shouldReturnToFeed: () => boolean;
    getProfileCompletionPercentage: () => number;
}
export declare const useHiveState: () => StateContextType;
interface HiveStateProviderProps {
    children: React.ReactNode;
    initialUser?: User;
    persistenceKey?: string;
}
export declare function HiveStateProvider({ children, initialUser, persistenceKey }: HiveStateProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Check if user can perform action on tool
 */
export declare function canPerformToolAction(user: User | null, tool: Tool, action: 'view' | 'use' | 'edit' | 'create' | 'share'): boolean;
/**
 * Generate shareable URL for tool with proper attribution
 */
export declare function generateToolShareUrl(tool: Tool, baseUrl?: string): string;
export {};
//# sourceMappingURL=hive-state-management.d.ts.map