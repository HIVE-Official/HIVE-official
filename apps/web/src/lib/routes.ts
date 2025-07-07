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
    SCHOOL_SELECT: '/auth/school-select',  // Step 1: Choose school + email (integrated)
    CHECK_EMAIL: '/auth/check-email',      // Step 2: Check for magic link
    VERIFY: '/auth/verify',                // Verify magic link
    ERROR: '/auth/error',
    EXPIRED: '/auth/expired',
    // Removed: /auth/email - now integrated into school-select
  },
  
  // 4-Step Progressive Onboarding Flow
  ONBOARDING: {
    ROOT: '/onboarding',
    STEP_1: '/onboarding/1',  // Welcome + Role Selection (student/faculty/alumni)
    STEP_2: '/onboarding/2',  // Profile Creation (name, handle, avatar)
    STEP_3: '/onboarding/3',  // Academic Info (level, graduation year)
    STEP_4: '/onboarding/4',  // Interest Selection + Community Preview
    COMPLETE: '/onboarding/complete',
    // Special flows
    FACULTY_VERIFY: '/onboarding/faculty-verify',
    ALUMNI_SOON: '/onboarding/alumni-soon',
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
  
  // Spaces
  SPACES: {
    ROOT: '/spaces',
    REQUEST: '/spaces/request',
    REQUEST_SUCCESS: '/spaces/request/success',
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
  if (currentStep >= 4) {
    return ROUTES.ONBOARDING.COMPLETE;
  }
  return ROUTES.ONBOARDING.STEP(currentStep + 1);
};

export const getPreviousOnboardingStep = (currentStep: number): string | null => {
  if (currentStep <= 1) {
    return null; // No step before step 1 (role selection)
  }
  return ROUTES.ONBOARDING.STEP(currentStep - 1);
};

// Type-safe route params  
export type OnboardingStep = 1 | 2 | 3 | 4;

export const isValidOnboardingStep = (step: string): step is `${OnboardingStep}` => {
  const num = parseInt(step, 10);
  return !isNaN(num) && num >= 1 && num <= 4; // 4-step progressive flow
};

// Route guards configuration
export const ROUTE_GUARDS = {
  // Public routes (no auth required)
  PUBLIC: [
    ROUTES.HOME,
    ROUTES.AUTH.SCHOOL_SELECT,
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

// Progressive onboarding flow configuration
export const ONBOARDING_FLOW = {
  TOTAL_STEPS: 4, // Progressive 4-step flow
  STEPS: {
    1: { name: 'Welcome & Role', path: ROUTES.ONBOARDING.STEP_1 },
    2: { name: 'Create Profile', path: ROUTES.ONBOARDING.STEP_2 },
    3: { name: 'Academic Info', path: ROUTES.ONBOARDING.STEP_3 },
    4: { name: 'Select Interests', path: ROUTES.ONBOARDING.STEP_4 },
  },
} as const;