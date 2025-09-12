import { type ProfileData, type SpaceMembership, type ProfileAnalytics } from '../stores/profile-store';
export declare function useUserProfile(userId?: string): import("@tanstack/react-query").UseQueryResult<ProfileData, Error>;
export declare function useUserSpaceMemberships(userId?: string, includeActivity?: boolean): import("@tanstack/react-query").UseQueryResult<SpaceMembership[], Error>;
export declare function useUserAnalytics(userId?: string): import("@tanstack/react-query").UseQueryResult<ProfileAnalytics, Error>;
export declare function useUpdateProfile(): import("@tanstack/react-query").UseMutationResult<ProfileData, Error, Partial<ProfileData>, {
    previousProfile: unknown;
}>;
export declare function useUploadProfilePhoto(): import("@tanstack/react-query").UseMutationResult<{
    avatarUrl: string;
}, Error, File, unknown>;
export declare function useProfileData(userId?: string): {
    profile: import("@tanstack/react-query").UseQueryResult<ProfileData, Error>;
    spaces: import("@tanstack/react-query").UseQueryResult<SpaceMembership[], Error>;
    analytics: import("@tanstack/react-query").UseQueryResult<ProfileAnalytics, Error>;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};
export declare function useProfileSubscription(_userId?: string): {
    subscribe: () => () => void;
    unsubscribe: () => void;
};
//# sourceMappingURL=profile-queries.d.ts.map