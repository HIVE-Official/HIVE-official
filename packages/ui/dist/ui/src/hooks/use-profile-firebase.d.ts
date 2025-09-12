/**
 * React Hooks for Firebase Profile Integration
 * Provides clean interface for components to interact with Firebase data
 */
import { type UserProfileDocument, type NotificationDocument, type SpaceMembershipDocument, type GhostModeDocument, type ToolDocument } from '../lib/firebase/profile-service';
export declare function useUserProfile(uid: string): {
    profile: UserProfileDocument | null;
    loading: boolean;
    error: string | null;
    updateProfile: (updates: Partial<UserProfileDocument>) => Promise<void>;
    uploadPhoto: (file: File) => Promise<string>;
    clearError: () => void;
};
export declare function useNotifications(uid: string): {
    notifications: NotificationDocument[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    markAsRead: (notificationId: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    clearError: () => void;
};
export declare function useUserSpaces(uid: string): {
    spaces: SpaceMembershipDocument[];
    loading: boolean;
    error: string | null;
    clearError: () => void;
};
export declare function useGhostMode(uid: string): {
    ghostMode: GhostModeDocument | null;
    loading: boolean;
    error: string | null;
    updateGhostMode: (settings: Partial<GhostModeDocument>) => Promise<void>;
    toggleGhostMode: (enabled: boolean) => Promise<void>;
    clearError: () => void;
};
export declare function useUserTools(uid: string): {
    tools: ToolDocument[];
    loading: boolean;
    error: string | null;
    clearError: () => void;
};
export declare function useProfileAnalytics(uid: string): {
    trackEvent: (event: string, data?: Record<string, unknown>) => Promise<void>;
    trackProfileView: () => void;
    trackCardInteraction: (cardType: string, action: string) => void;
    trackLayoutChange: (layoutData: any) => void;
};
export declare function useProfileData(uid: string): {
    profile: UserProfileDocument | null;
    notifications: NotificationDocument[];
    unreadNotifications: number;
    spaces: SpaceMembershipDocument[];
    ghostMode: GhostModeDocument | null;
    tools: ToolDocument[];
    loading: boolean;
    error: string | null;
    actions: {
        updateProfile: (updates: Partial<UserProfileDocument>) => Promise<void>;
        uploadPhoto: (file: File) => Promise<string>;
        markNotificationAsRead: (notificationId: string) => Promise<void>;
        markAllNotificationsAsRead: () => Promise<void>;
        updateGhostMode: (settings: Partial<GhostModeDocument>) => Promise<void>;
        toggleGhostMode: (enabled: boolean) => Promise<void>;
        trackEvent: (event: string, data?: Record<string, unknown>) => Promise<void>;
        trackProfileView: () => void;
        trackCardInteraction: (cardType: string, action: string) => void;
        trackLayoutChange: (layoutData: any) => void;
    };
    clearAllErrors: () => void;
};
export declare function useProfileLayout(uid: string): {
    layout: any;
    saveLayout: (layoutData: any) => Promise<void>;
    hasCustomLayout: boolean;
};
export declare function useProfileCleanup(): void;
//# sourceMappingURL=use-profile-firebase.d.ts.map