"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfileModern = useProfileModern;
const profile_queries_1 = require("./queries/profile-queries");
const profile_store_1 = require("./stores/profile-store");
/**
 * Modern profile hook using Zustand + React Query
 * Replaces the old useState/useEffect patterns with proper state management
 */
function useProfileModern(userId = 'me') {
    // React Query hooks for data fetching
    const profileQuery = (0, profile_queries_1.useUserProfile)(userId);
    const spacesQuery = (0, profile_queries_1.useUserSpaceMemberships)(userId);
    const analyticsQuery = (0, profile_queries_1.useUserAnalytics)(userId);
    // Mutations
    const updateProfileMutation = (0, profile_queries_1.useUpdateProfile)();
    const uploadPhotoMutation = (0, profile_queries_1.useUploadProfilePhoto)();
    // Zustand store state
    const profile = (0, profile_store_1.useProfileData)();
    const spaces = (0, profile_store_1.useSpaceMemberships)();
    const analytics = (0, profile_store_1.useProfileAnalytics)();
    const unlocks = (0, profile_store_1.useProfileUnlocks)();
    const loadingStates = (0, profile_store_1.useProfileLoading)();
    const errorStates = (0, profile_store_1.useProfileErrors)();
    // Store actions
    const { setEditing, setSelectedCard, setProfileError, setSpacesError, setAnalyticsError, reset, isEditing, selectedCard } = (0, profile_store_1.useProfileStore)();
    // Computed values
    const completionPercentage = profile?.completionPercentage || 0;
    const nextSteps = getNextSteps(profile);
    // Actions
    const updateProfile = async (data) => {
        try {
            await updateProfileMutation.mutateAsync(data);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
        }
    };
    const uploadPhoto = async (file) => {
        try {
            const result = await uploadPhotoMutation.mutateAsync(file);
            return result.avatarUrl;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Failed to upload photo');
        }
    };
    const clearErrors = () => {
        setProfileError(null);
        setSpacesError(null);
        setAnalyticsError(null);
    };
    const refresh = () => {
        profileQuery.refetch();
        spacesQuery.refetch();
        analyticsQuery.refetch();
    };
    return {
        // Data
        profile,
        spaces,
        analytics,
        unlocks,
        // Actions
        updateProfile,
        uploadPhoto,
        // UI State
        isEditing,
        setEditing,
        selectedCard,
        setSelectedCard,
        // Loading states
        loading: {
            profile: profileQuery.isLoading || loadingStates.profile,
            spaces: spacesQuery.isLoading || loadingStates.spaces,
            analytics: analyticsQuery.isLoading || loadingStates.analytics,
            updating: updateProfileMutation.isPending,
            uploading: uploadPhotoMutation.isPending,
        },
        // Error states
        errors: {
            profile: profileQuery.error?.message || errorStates.profile,
            spaces: spacesQuery.error?.message || errorStates.spaces,
            analytics: analyticsQuery.error?.message || errorStates.analytics,
        },
        // Computed values
        completionPercentage,
        nextSteps,
        // Utility functions
        clearErrors,
        refresh,
        reset,
    };
}
// Helper function to determine next steps for profile completion
function getNextSteps(profile) {
    if (!profile)
        return ['Complete your profile setup'];
    const steps = [];
    if (!profile.fullName)
        steps.push('Add your full name');
    if (!profile.handle)
        steps.push('Choose your handle');
    if (!profile.bio)
        steps.push('Write a short bio');
    if (!profile.major)
        steps.push('Add your major');
    if (!profile.avatarUrl)
        steps.push('Upload a profile photo');
    if (steps.length === 0) {
        steps.push('Join your first space', 'Connect with classmates', 'Explore campus tools');
    }
    return steps.slice(0, 3); // Show max 3 next steps
}
//# sourceMappingURL=use-profile-modern.js.map