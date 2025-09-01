// Temporary stub for @hive/hooks to enable compilation testing

export const useAuth = () => ({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export const useProfile = () => ({
  profile: null,
  loading: false,
  updateProfile: async () => {},
});

export const useSpace = () => ({
  space: null,
  loading: false,
  joinSpace: async () => {},
  leaveSpace: async () => {},
});

export const useFeatureFlags = () => ({
  flags: {},
  loading: false,
  isEnabled: () => false,
});

export const useCreationAnalytics = () => ({
  track: () => {},
  loading: false,
});

export const useFeedAnalytics = () => ({
  track: () => {},
  loading: false,
});

export const useOnboardingAnalytics = () => ({
  track: () => {},
  loading: false,
});

export const useFeatureFlag = (_flag: string) => ({
  isEnabled: false,
  loading: false,
});