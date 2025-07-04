/**
 * Centralized routing configuration for HIVE platform
 * Based on ONBOARDING_AUTH_COMPLETION_CHECKLIST.md
 * 
 * Flow: School Selection → Magic Link Auth → 5-Step Onboarding
 */

export const ROUTES = {
  // Landing page
  HOME: '/',
  
  // Authentication Flow
  AUTH: {
    ROOT: '/auth',
    SCHOOL_SELECT: '/auth/school-select',  // Step 1: Choose school
    EMAIL: '/auth/email',                   // Step 2: Enter email
    CHECK_EMAIL: '/auth/check-email',       // Step 3: Check for magic link
    VERIFY: '/auth/verify',                 // Verify magic link
    ERROR: '/auth/error',
    EXPIRED: '/auth/expired',
    // Remove: /auth/choose - not in checklist
  },
  
  // 5-Step Onboarding Flow (numeric only)
  ONBOARDING: {
    ROOT: '/onboarding',
    STEP_1: '/onboarding/1',  // Welcome
    STEP_2: '/onboarding/2',  // Profile Creation (name, handle, avatar)
    STEP_3: '/onboarding/3',  // School Pledge
    STEP_4: '/onboarding/4',  // Academic Info (level, graduation year)
    STEP_5: '/onboarding/5',  // Interest Selection (67+ interests, 8 categories)
    COMPLETE: '/onboarding/complete',
    // Dynamic step helper
    STEP: (num: number) => `/onboarding/${num}` as const,
  },
  
  // Main App
  APP: {
    FEED: '/feed',
    PROFILE: '/profile',
    SPACES: '/spaces',
    CAMPUS: '/campus',
    SETTINGS: '/settings',
  },
  
  // Legal
  LEGAL: {
    TERMS: '/legal/terms',
    PRIVACY: '/legal/privacy',
    GUIDELINES: '/legal/community-guidelines',
  },
} as const;

// Helper functions for navigation
export const getNextOnboardingStep = (currentStep: number): string => {
  if (currentStep >= 5) {
    return ROUTES.ONBOARDING.COMPLETE;
  }
  return ROUTES.ONBOARDING.STEP(currentStep + 1);
};

export const getPreviousOnboardingStep = (currentStep: number): string | null => {
  if (currentStep <= 1) {
    return null;
  }
  return ROUTES.ONBOARDING.STEP(currentStep - 1);
};

// Type-safe route params
export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export const isValidOnboardingStep = (step: string): step is `${OnboardingStep}` => {
  const num = parseInt(step, 10);
  return !isNaN(num) && num >= 1 && num <= 5;
};

// Route guards configuration
export const ROUTE_GUARDS = {
  // Public routes (no auth required)
  PUBLIC: [
    ROUTES.HOME,
    ROUTES.AUTH.SCHOOL_SELECT,
    ROUTES.AUTH.EMAIL,
    ROUTES.AUTH.CHECK_EMAIL,
    ROUTES.AUTH.VERIFY,
    ROUTES.AUTH.ERROR,
    ROUTES.AUTH.EXPIRED,
    ...Object.values(ROUTES.LEGAL),
  ],
  
  // Routes that require authentication
  PROTECTED: [
    ...Object.values(ROUTES.ONBOARDING),
    ...Object.values(ROUTES.APP),
  ],
  
  // Routes that require completed onboarding
  REQUIRES_ONBOARDING: Object.values(ROUTES.APP),
} as const;

// Onboarding flow configuration
export const ONBOARDING_FLOW = {
  TOTAL_STEPS: 5,
  STEPS: {
    1: { name: 'Welcome', path: ROUTES.ONBOARDING.STEP_1 },
    2: { name: 'Create Profile', path: ROUTES.ONBOARDING.STEP_2 },
    3: { name: 'School Pledge', path: ROUTES.ONBOARDING.STEP_3 },
    4: { name: 'Academic Info', path: ROUTES.ONBOARDING.STEP_4 },
    5: { name: 'Select Interests', path: ROUTES.ONBOARDING.STEP_5 },
  },
} as const;