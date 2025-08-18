"use client";

import { useUnifiedAuth } from '@hive/ui';

interface SessionData {
  userId: string;
  email: string;
  schoolId: string;
  needsOnboarding?: boolean;
  onboardingCompleted?: boolean;
  verifiedAt: string;
  profileData?: {
    fullName: string;
    handle: string;
    major: string;
    avatarUrl: string;
    builderOptIn: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  handle?: string;
  major?: string;
  avatarUrl?: string;
  schoolId: string;
  builderOptIn?: boolean;
  onboardingCompleted: boolean;
}

/**
 * DEPRECATED: Compatibility wrapper around UnifiedAuth
 * Use useUnifiedAuth directly in new code
 */
export function useSession() {
  const unifiedAuth = useUnifiedAuth();

  // Transform UnifiedAuth data to match useSession interface
  const user: User | null = unifiedAuth.user ? {
    id: unifiedAuth.user.id,
    email: unifiedAuth.user.email,
    fullName: unifiedAuth.user.fullName,
    handle: unifiedAuth.user.handle,
    major: unifiedAuth.user.major,
    avatarUrl: unifiedAuth.user.avatarUrl,
    schoolId: unifiedAuth.user.schoolId || '',
    builderOptIn: unifiedAuth.user.builderOptIn,
    onboardingCompleted: unifiedAuth.user.onboardingCompleted,
  } : null;

  const sessionData: SessionData | null = unifiedAuth.user ? {
    userId: unifiedAuth.user.id,
    email: unifiedAuth.user.email,
    schoolId: unifiedAuth.user.schoolId || '',
    needsOnboarding: !unifiedAuth.user.onboardingCompleted,
    onboardingCompleted: unifiedAuth.user.onboardingCompleted,
    verifiedAt: unifiedAuth.session?.issuedAt || new Date().toISOString(),
    profileData: {
      fullName: unifiedAuth.user.fullName || '',
      handle: unifiedAuth.user.handle || '',
      major: unifiedAuth.user.major || '',
      avatarUrl: unifiedAuth.user.avatarUrl || '',
      builderOptIn: unifiedAuth.user.builderOptIn || false,
    },
  } : null;

  return {
    isLoading: unifiedAuth.isLoading,
    isAuthenticated: unifiedAuth.isAuthenticated,
    user,
    sessionData,
    // Legacy logout method
    logout: unifiedAuth.logout,
  };
}