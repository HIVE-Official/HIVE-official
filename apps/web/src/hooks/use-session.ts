"use client";

import { useAuth } from '@hive/auth-logic';

// Legacy session-specific User type for backward compatibility
interface LegacySessionUser {
  id: string;
  email: string;
  fullName?: string;
  handle?: string;
  major?: string;      // Legacy field for backward compatibility
  majors?: string[];   // New field for multiple majors
  avatarUrl?: string;
  schoolId: string;
  builderOptIn?: boolean;
  onboardingCompleted: boolean;
}

/**
 * DEPRECATED: Compatibility wrapper around UnifiedAuth
 * Use useUnifiedAuth directly in new code
 */
 
export function useSession(): any {
  const hiveAuth = useAuth();

  // Transform HiveAuth data to match useSession interface

  const user: LegacySessionUser | null = hiveAuth.user ? {
    id: hiveAuth.user.id,
    email: hiveAuth.user.email || '',
    fullName: hiveAuth.user.fullName || undefined,
    handle: hiveAuth.user.handle || undefined,
    major: hiveAuth.user.major || undefined,
    majors: hiveAuth.user.major ? [hiveAuth.user.major] : undefined,
    avatarUrl: hiveAuth.user.avatarUrl || undefined,
    schoolId: hiveAuth.user.schoolId || '',
    builderOptIn: hiveAuth.user.builderOptIn,
    onboardingCompleted: hiveAuth.user.onboardingCompleted,
  } : null;

  const sessionData: any | null = hiveAuth.user ? {
    userId: hiveAuth.user.id,
    email: hiveAuth.user.email,
    schoolId: hiveAuth.user.schoolId || '',
    needsOnboarding: !hiveAuth.user.onboardingCompleted,
    onboardingCompleted: hiveAuth.user.onboardingCompleted,
    verifiedAt: new Date().toISOString(),
    profileData: {
      fullName: hiveAuth.user.fullName || '',
      handle: hiveAuth.user.handle || '',
      major: hiveAuth.user.major || undefined,
      majors: hiveAuth.user.major ? [hiveAuth.user.major] : [],
      avatarUrl: hiveAuth.user.avatarUrl || '',
      builderOptIn: hiveAuth.user.builderOptIn || false,
    }
  } : null;

  return {
    isLoading: hiveAuth.isLoading,
    isAuthenticated: hiveAuth.isAuthenticated,
    user,
    session: sessionData,
    sessionData,
    logout: hiveAuth.logout,
    getIdToken: hiveAuth.getAuthToken || hiveAuth.user?.getIdToken
  };
}