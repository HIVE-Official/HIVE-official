"use client";

import { 
  useUserProfile, 
  useUserSpaceMemberships, 
  useUserAnalytics,
  useUpdateProfile,
  useUploadProfilePhoto
} from './queries/profile-queries';

import { 
  useProfileData, 
  useSpaceMemberships, 
  useProfileAnalytics, 
  useProfileUnlocks, 
  useProfileLoading, 
  useProfileErrors,
  useProfileStore 
} from './stores/profile-store';

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
  // Data
  profile: ProfileData | null;
  spaces: SpaceMembership[];
  analytics: ProfileAnalytics | null;
  unlocks: ReturnType<typeof useProfileUnlocks>;
  
  // Actions
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  uploadPhoto: (file: File) => Promise<string>;
  
  // UI State
  isEditing: boolean;
  setEditing: (editing: boolean) => void;
  selectedCard: string | null;
  setSelectedCard: (cardId: string | null) => void;
  
  // Loading states
  loading: {
    profile: boolean;
    spaces: boolean;
    analytics: boolean;
    updating: boolean;
    uploading: boolean;
  };
  
  // Error states
  errors: {
    profile: string | null;
    spaces: string | null;
    analytics: string | null;
  };
  
  // Computed values
  completionPercentage: number;
  nextSteps: string[];
  
  // Utility functions
  clearErrors: () => void;
  refresh: () => void;
  reset: () => void;
}

/**
 * Modern profile hook using Zustand + React Query
 * Replaces the old useState/useEffect patterns with proper state management
 */
export function useProfileModern(userId = 'me'): UseProfileModernReturn {
  // React Query hooks for data fetching
  const profileQuery = useUserProfile(userId);
  const spacesQuery = useUserSpaceMemberships(userId);
  const analyticsQuery = useUserAnalytics(userId);
  
  // Mutations
  const updateProfileMutation = useUpdateProfile();
  const uploadPhotoMutation = useUploadProfilePhoto();
  
  // Zustand store state
  const profile = useProfileData();
  const spaces = useSpaceMemberships();
  const analytics = useProfileAnalytics();
  const unlocks = useProfileUnlocks();
  const loadingStates = useProfileLoading();
  const errorStates = useProfileErrors();
  
  // Store actions
  const { 
    setEditing, 
    setSelectedCard, 
    setProfileError, 
    setSpacesError, 
    setAnalyticsError,
    reset,
    isEditing,
    selectedCard
  } = useProfileStore();

  // Computed values
  const completionPercentage = profile?.completionPercentage || 0;
  const nextSteps = getNextSteps(profile);

  // Actions
  const updateProfile = async (data: UpdateProfileData): Promise<void> => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    try {
      const result = await uploadPhotoMutation.mutateAsync(file);
      return result.avatarUrl;
    } catch (error) {
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
function getNextSteps(profile: ProfileData | null): string[] {
  if (!profile) return ['Complete your profile setup'];
  
  const steps: string[] = [];
  
  if (!profile.fullName) steps.push('Add your full name');
  if (!profile.handle) steps.push('Choose your handle');
  if (!profile.bio) steps.push('Write a short bio');
  if (!profile.major) steps.push('Add your major');
  if (!profile.avatarUrl) steps.push('Upload a profile photo');
  
  if (steps.length === 0) {
    steps.push('Join your first space', 'Connect with classmates', 'Explore campus tools');
  }
  
  return steps.slice(0, 3); // Show max 3 next steps
}

// Backward compatibility hook removed to avoid naming conflicts
// Components should use useProfileModern directly

// Export types for components
export type { 
  ProfileData, 
  SpaceMembership, 
  ProfileAnalytics, 
  UpdateProfileData 
};