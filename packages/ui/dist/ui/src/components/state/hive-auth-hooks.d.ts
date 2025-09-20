/**
 * HIVE Authentication Hooks
 *
 * Handles .edu verification, onboarding flow, and profile completion tracking
 * Social-first approach with privacy defaults during vBETA
 */
import type { ProfileCompletionStage, BuilderLevel } from './hive-state-management';
/**
 * Main authentication hook with .edu verification
 */
export declare function useAuth(): boolean;
/**
 * Profile completion and onboarding flow
 */
export declare function useOnboarding(): {
    currentStage: ProfileCompletionStage;
    completionPercentage: number;
    nextSteps: string[];
    isComplete: boolean;
    advanceStage: (stage: ProfileCompletionStage, data: any) => void;
    canAccessFeature: (feature: "spaces" | "tools" | "lab" | "social") => boolean;
    isWelcomeStage: boolean;
    isAcademicsStage: boolean;
    isHandleStage: boolean;
    isPhotoStage: boolean;
    isLegalStage: boolean;
};
/**
 * Builder level progression and tool permissions
 */
export declare function useBuilderProgression(): {
    level: BuilderLevel;
    progress: number;
    nextLevel: BuilderLevel;
    capabilities: {
        canUsePersonalTools: boolean;
        canCreatePersonalTools: boolean;
        canUseSpaceTools: boolean;
        canCreateSpaceTools: boolean;
        canCreateRituals: boolean;
        maxPersonalTools: number;
    };
    checkToolPermission: (toolId: string, permission: import("./hive-state-management").ToolPermission) => boolean;
    advanceBuilderLevel: (newLevel: BuilderLevel) => void;
    isNovice: boolean;
    isIntermediate: boolean;
    isAdvanced: boolean;
    isExpert: boolean;
    canAccessLab: boolean;
};
/**
 * Privacy controls and ghost mode management
 */
export declare function usePrivacy(): {
    privacy: {
        profileVisibility: "private" | "friends" | "public";
        toolSharingDefault: "private" | "space" | "public";
        activityTracking: boolean;
        friendDiscovery: boolean;
    };
    ghostMode: import("./hive-state-management").GhostModeStatus;
    isGhost: boolean;
    visibility: {
        profileVisible: boolean;
        activityVisible: boolean;
        toolsVisible: boolean;
        spaceMembershipVisible: boolean;
        description: string;
    };
    toggleGhostMode: () => void;
    updatePrivacySettings: (updates: Partial<{
        profileVisibility: "private" | "friends" | "public";
        toolSharingDefault: "private" | "space" | "public";
        activityTracking: boolean;
        friendDiscovery: boolean;
    }>) => void;
    setProfileVisibility: (visibility: "private" | "friends" | "public") => void;
    setToolSharingDefault: (sharing: "private" | "space" | "public") => void;
    toggleActivityTracking: () => void;
    toggleFriendDiscovery: () => void;
};
//# sourceMappingURL=hive-auth-hooks.d.ts.map