// State Management - Zustand Stores
export * from './stores';

// Server State Management - React Query
export * from './queries';

// Auth utilities
export { initializeAuthSync, useAuthSync } from './auth/firebase-auth-sync';
export { useAuthOperations } from './auth/use-auth-operations';

// Analytics hooks
export { useAnalytics } from './use-analytics';
export { useCreationAnalytics } from './use-creation-analytics';

// Onboarding analytics
export { useOnboardingAnalytics } from './use-onboarding-analytics';

// Modern Profile hooks with Zustand + React Query
export { useProfileModern } from './use-profile-modern';
export { 
  useUserProfile, 
  useUserSpaceMemberships, 
  useUserAnalytics,
  useUpdateProfile,
  useUploadProfilePhoto,
  useProfileData 
} from './queries/profile-queries';

// Onboarding hooks with React Query
export {
  useHandleAvailability,
  useSubmitOnboarding,
  useUploadProfilePhoto as useUploadOnboardingPhoto
} from './queries/onboarding-queries';

// Legacy Data fetching hooks (deprecated - use modern versions)
export { useSpaces as useLegacySpaces } from './use-spaces';
export { useProfile as useLegacyProfile } from './use-profile';

// Utility hooks
export { useDebounce } from './use-debounce';

// Feature flags hooks
export { useFeatureFlags, useToolBuilderVariant, useNavigationVariant } from './use-feature-flags'; 