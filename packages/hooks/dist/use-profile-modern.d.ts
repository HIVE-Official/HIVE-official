import { useProfileUnlocks } from './stores/profile-store';
import type { ProfileData, SpaceMembership, ProfileAnalytics } from './stores/profile-store';
interface UpdateProfileData {
    fullName?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    isPublic?: boolean;
    builderOptIn?: boolean;
    builderAnalyticsEnabled?: boolean;
    handle?: string;
}
interface UseProfileModernReturn {
    profile: ProfileData | null;
    spaces: SpaceMembership[];
    analytics: ProfileAnalytics | null;
    unlocks: ReturnType<typeof useProfileUnlocks>;
    updateProfile: (data: UpdateProfileData) => Promise<void>;
    uploadPhoto: (file: File) => Promise<string>;
    isEditing: boolean;
    setEditing: (editing: boolean) => void;
    selectedCard: string | null;
    setSelectedCard: (cardId: string | null) => void;
    loading: {
        profile: boolean;
        spaces: boolean;
        analytics: boolean;
        updating: boolean;
        uploading: boolean;
    };
    errors: {
        profile: string | null;
        spaces: string | null;
        analytics: string | null;
    };
    completionPercentage: number;
    nextSteps: string[];
    clearErrors: () => void;
    refresh: () => void;
    reset: () => void;
}
/**
 * Modern profile hook using Zustand + React Query
 * Replaces the old useState/useEffect patterns with proper state management
 */
export declare function useProfileModern(userId?: string): UseProfileModernReturn;
export type { ProfileData, SpaceMembership, ProfileAnalytics, UpdateProfileData };
//# sourceMappingURL=use-profile-modern.d.ts.map