/**
 * Temporary Onboarding Bridge
 * Working implementation to fix the import resolution issue
 */

import { useCallback } from 'react';
import { useUnifiedAuth } from "@hive/ui";

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
  const unifiedAuth = useUnifiedAuth();

  const completeOnboarding = useCallback(async (
    onboardingData: OnboardingData
  ): Promise<OnboardingResult> => {
    try {
      console.log('Starting onboarding completion bridge', {
        handle: onboardingData.handle,
        userType: onboardingData.userType,
        major: onboardingData.major,
      });

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

      // Call the unified auth complete onboarding method
      const result = await unifiedAuth.completeOnboarding(onboardingData);

      if (!result.success) {
        throw new Error(result.error || 'Onboarding completion failed');
      }

      console.log('Onboarding completion successful', {
        userId: result.user?.id,
        handle: onboardingData.handle,
      });

      return {
        success: true,
        user: result.user,
        builderRequestsCreated: 0,
      };

    } catch (error) {
      console.error('Onboarding completion failed:', error);
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
      console.log('Creating post-onboarding spaces for:', onboardingData.major);
      
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