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
    major?: string;      // Legacy field for backward compatibility
    majors?: string[];   // New field for multiple majors
    avatarUrl: string;
    builderOptIn: boolean;
  };
}

export interface User {
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
export function useSession() {
  const hiveAuth = useUnifiedAuth();

  // Transform HiveAuth data to match useSession interface
  const user: User | null = hiveAuth.user ? {
    id: hiveAuth.user.id,
    email: hiveAuth.user.email,
    fullName: hiveAuth.user.fullName,
    handle: hiveAuth.user.handle,
    major: hiveAuth.user.major,        // Legacy field
    majors: hiveAuth.user.majors,      // New array field
    avatarUrl: hiveAuth.user.avatarUrl,
    schoolId: hiveAuth.user.schoolId || '',
    builderOptIn: hiveAuth.user.builderOptIn,
    onboardingCompleted: hiveAuth.user.onboardingCompleted,
  } : null;

  const sessionData: SessionData | null = hiveAuth.user ? {
    userId: hiveAuth.user.id,
    email: hiveAuth.user.email,
    schoolId: hiveAuth.user.schoolId || '',
    needsOnboarding: !hiveAuth.user.onboardingCompleted,
    onboardingCompleted: hiveAuth.user.onboardingCompleted,
    verifiedAt: new Date().toISOString(),
    profileData: {
      fullName: hiveAuth.user.fullName || '',
      handle: hiveAuth.user.handle || '',
      major: hiveAuth.user.major,           // Legacy field
      majors: hiveAuth.user.majors,         // New array field
      avatarUrl: hiveAuth.user.avatarUrl || '',
      builderOptIn: hiveAuth.user.builderOptIn || false,
    },
  } : null;

  return {
    isLoading: hiveAuth.isLoading,
    isAuthenticated: hiveAuth.isAuthenticated,
    user,
    session: sessionData,  // Use 'session' for better compatibility
    sessionData,
    // Legacy logout method
    logout: hiveAuth.signOut,
    // Add getIdToken for API compatibility
    getIdToken: hiveAuth.getAuthToken,
  };
}