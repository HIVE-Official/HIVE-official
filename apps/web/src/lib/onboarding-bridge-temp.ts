/**
 * Temporary Onboarding Bridge
 * Working implementation to fix the import resolution issue
 */

import { useCallback } from 'react';
import { useAuth } from "@hive/auth-logic";

export interface OnboardingData {
  fullName: string;
  userType: 'student' | 'alumni' | 'faculty';
  firstName?: string;
  lastName?: string;
  major: string;
  academicLevel?: string;
  graduationYear: number;
  handle: string;
  avatarUrl?: string;
  interests?: string[];
  builderRequestSpaces?: string[];
  consentGiven: boolean;
}

export interface OnboardingResult {
  success: boolean;
  user?: any;
  builderRequestsCreated?: number;
  error?: string;
}

/**
 * Temporary working implementation of useOnboardingBridge
 */
export function useOnboardingBridge() {
  const unifiedAuth = useAuth();

  const completeOnboarding = useCallback(async (
    onboardingData: OnboardingData
  ): Promise<OnboardingResult> => {
    try {
      if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
        throw new Error('User must be authenticated to complete onboarding');
      }

      // Validate required fields
      const requiredFields: (keyof OnboardingData)[] = [
        'fullName', 'userType', 'major', 'graduationYear', 'handle', 'consentGiven'
      ];
      
      for (const field of requiredFields) {
        if (!onboardingData[field]) {
          throw new Error(`Required field missing: ${field}`);
        }
      }

      if (!onboardingData.consentGiven) {
        throw new Error('User consent is required to complete onboarding');
      }

      // Make direct API call to complete onboarding
      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await unifiedAuth.getAuthToken?.() || ''}`,
        },
        body: JSON.stringify(onboardingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Onboarding completion failed');
      }

        // Handle development user update if provided
      if (result.devUserUpdate && typeof window !== 'undefined') {
        localStorage.setItem('dev_auth_mode', 'true');
        localStorage.setItem('dev_user', JSON.stringify(result.devUserUpdate));

        // Trigger storage event for auth hook to pick up changes
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'dev_user',
          newValue: JSON.stringify(result.devUserUpdate)
        }));
      }

      // Update the auth state to reflect onboarding is complete
      if (unifiedAuth.refreshUser) {
        await unifiedAuth.refreshUser();
      }

      return {
        success: true,
        user: result.user,
        builderRequestsCreated: result.builderRequestsCreated || 0,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }, [unifiedAuth]);

  const needsOnboarding = useCallback(() => {
    return !unifiedAuth.user?.onboardingCompleted;
  }, [unifiedAuth.user]);

  const getOnboardingProgress = useCallback(() => {
    return {
      completedSteps: 7,
      totalSteps: 7,
      percentage: 100,
      isComplete: true,
    };
  }, []);

  const createPostOnboardingSpaces = useCallback(async (onboardingData: OnboardingData) => {
    try {
      // This would normally create cohort spaces based on major/graduation year
      
      return {
        cohortSpaces: [],
        joinedSpaces: [],
        totalSpaces: 0,
      };
    } catch (error) {
      return {
        cohortSpaces: [],
        joinedSpaces: [],
        totalSpaces: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, []);

  return {
    completeOnboarding,
    needsOnboarding,
    getOnboardingProgress,
    createPostOnboardingSpaces,
    isAuthenticated: unifiedAuth.isAuthenticated,
    user: unifiedAuth.user,
    isLoading: unifiedAuth.isLoading,
    error: unifiedAuth.error || '',
    canAccessFeature: unifiedAuth.canAccessFeature,
    hasValidSession: unifiedAuth.hasValidSession,
  };
}