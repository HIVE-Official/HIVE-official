import React from 'react';
interface PrivacySettings {
    ghostMode: {
        enabled: boolean;
        level: 'invisible' | 'minimal' | 'selective' | 'normal';
        hideFromDirectory: boolean;
        hideActivity: boolean;
        hideSpaceMemberships: boolean;
        hideLastSeen: boolean;
        hideOnlineStatus: boolean;
    };
    profileVisibility: {
        showToSpaceMembers: boolean;
        showToFollowers: boolean;
        showToPublic: boolean;
        hideProfilePhoto: boolean;
        hideHandle: boolean;
        hideInterests: boolean;
    };
    activitySharing: {
        shareActivityData: boolean;
        shareSpaceActivity: boolean;
        shareToolUsage: boolean;
        shareContentCreation: boolean;
        allowAnalytics: boolean;
    };
}
interface VisibilityResult {
    canSeeProfile: boolean;
    canSeeActivity: boolean;
    canSeeSpaceMemberships: boolean;
    canSeeOnlineStatus: boolean;
    canSeeLastSeen: boolean;
    visibilityLevel: 'full' | 'partial' | 'minimal' | 'none';
}
declare class PrivacyUtils {
    private static instance;
    private baseUrl;
    private cache;
    private constructor();
    static getInstance(): PrivacyUtils;
    getPrivacySettings(userId?: string): Promise<PrivacySettings | null>;
    updatePrivacySettings(updates: Partial<PrivacySettings>): Promise<boolean>;
    checkVisibility(targetUserId: string, context?: string): Promise<VisibilityResult | null>;
    batchCheckVisibility(userIds: string[], context?: string): Promise<Record<string, VisibilityResult>>;
    toggleGhostMode(enabled: boolean, level?: 'invisible' | 'minimal' | 'selective' | 'normal', duration?: number): Promise<boolean>;
    getGhostModeStatus(userId?: string): Promise<{
        enabled: boolean;
        level: string;
        duration?: number;
    } | null>;
    filterUserData(userData: Record<string, unknown>, visibility: VisibilityResult): Record<string, unknown> | null;
    shouldShareActivity(privacySettings: PrivacySettings, activityType: string): boolean;
    clearCache(): void;
}
export declare const privacyUtils: PrivacyUtils;
export declare function usePrivacyUtils(): PrivacyUtils;
export declare function withPrivacyCheck<T extends {
    userId?: string;
}>(Component: React.ComponentType<T>): (props: T) => import("react/jsx-runtime").JSX.Element;
export declare const privacyPresets: {
    open: {
        ghostMode: {
            enabled: boolean;
            level: "normal";
            hideFromDirectory: boolean;
            hideActivity: boolean;
            hideSpaceMemberships: boolean;
            hideLastSeen: boolean;
            hideOnlineStatus: boolean;
        };
        profileVisibility: {
            showToSpaceMembers: boolean;
            showToFollowers: boolean;
            showToPublic: boolean;
            hideProfilePhoto: boolean;
            hideHandle: boolean;
            hideInterests: boolean;
        };
        activitySharing: {
            shareActivityData: boolean;
            shareSpaceActivity: boolean;
            shareToolUsage: boolean;
            shareContentCreation: boolean;
            allowAnalytics: boolean;
        };
    };
    private: {
        ghostMode: {
            enabled: boolean;
            level: "selective";
            hideFromDirectory: boolean;
            hideActivity: boolean;
            hideSpaceMemberships: boolean;
            hideLastSeen: boolean;
            hideOnlineStatus: boolean;
        };
        profileVisibility: {
            showToSpaceMembers: boolean;
            showToFollowers: boolean;
            showToPublic: boolean;
            hideProfilePhoto: boolean;
            hideHandle: boolean;
            hideInterests: boolean;
        };
        activitySharing: {
            shareActivityData: boolean;
            shareSpaceActivity: boolean;
            shareToolUsage: boolean;
            shareContentCreation: boolean;
            allowAnalytics: boolean;
        };
    };
    stealth: {
        ghostMode: {
            enabled: boolean;
            level: "invisible";
            hideFromDirectory: boolean;
            hideActivity: boolean;
            hideSpaceMemberships: boolean;
            hideLastSeen: boolean;
            hideOnlineStatus: boolean;
        };
        profileVisibility: {
            showToSpaceMembers: boolean;
            showToFollowers: boolean;
            showToPublic: boolean;
            hideProfilePhoto: boolean;
            hideHandle: boolean;
            hideInterests: boolean;
        };
        activitySharing: {
            shareActivityData: boolean;
            shareSpaceActivity: boolean;
            shareToolUsage: boolean;
            shareContentCreation: boolean;
            allowAnalytics: boolean;
        };
    };
};
export default PrivacyUtils;
//# sourceMappingURL=privacy-utils.d.ts.map