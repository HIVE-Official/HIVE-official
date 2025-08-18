/**
 * Onboarding Bridge Hook
 * Bridges onboarding completion to UnifiedAuth and Profile hydration
 */
import { useCallback } from 'react';
import { useUnifiedAuth } from '../contexts/unified-auth-context';
import { logger } from '../lib/logger';
/**
 * Hook for managing onboarding completion and profile hydration
 */
export function useOnboardingBridge() {
    const unifiedAuth = useUnifiedAuth();
    // Complete onboarding with full integration
    const completeOnboarding = useCallback(async (onboardingData) => {
        try {
            logger.info('Starting onboarding completion bridge', {
                handle: onboardingData.handle,
                userType: onboardingData.userType,
                major: onboardingData.major,
            });
            if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
                throw new Error('User must be authenticated to complete onboarding');
            }
            // Validate required fields
            const requiredFields = [
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
            logger.info('Onboarding completion successful', {
                userId: unifiedAuth.user.id,
                handle: onboardingData.handle,
                builderRequestsCreated: result?.builderRequestsCreated || 0,
            });
            return {
                success: true,
                user: result?.user || unifiedAuth.user,
                builderRequestsCreated: result?.builderRequestsCreated || 0,
            };
        }
        catch (error) {
            logger.error('Onboarding completion failed', {
                error: error instanceof Error ? error.message : String(error),
                userId: unifiedAuth.user?.id,
                handle: onboardingData.handle,
            });
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Onboarding completion failed',
            };
        }
    }, [unifiedAuth]);
    // Check if user needs onboarding
    const needsOnboarding = useCallback(() => {
        return unifiedAuth.requiresOnboarding();
    }, [unifiedAuth]);
    // Get current onboarding progress
    const getOnboardingProgress = useCallback(() => {
        if (!unifiedAuth.user)
            return null;
        const user = unifiedAuth.user;
        let completedSteps = 0;
        const totalSteps = 7; // Welcome, UserType, Name, Academics, Handle, Photo, Legal
        // Check which steps are completed based on user data
        if (user.email)
            completedSteps++; // Welcome (has account)
        if (user.fullName)
            completedSteps++; // Name step
        if (user.major)
            completedSteps++; // Academics step  
        if (user.handle)
            completedSteps++; // Handle step
        if (user.avatarUrl)
            completedSteps++; // Photo step (optional)
        if (user.onboardingCompleted)
            completedSteps = totalSteps; // All done
        return {
            completedSteps,
            totalSteps,
            percentage: Math.round((completedSteps / totalSteps) * 100),
            isComplete: user.onboardingCompleted,
        };
    }, [unifiedAuth.user]);
    // Create spaces after onboarding (called automatically by completeOnboarding)
    const createPostOnboardingSpaces = useCallback(async (onboardingData) => {
        try {
            if (!unifiedAuth.hasValidSession()) {
                throw new Error('Valid session required for space creation');
            }
            const token = await unifiedAuth.getAuthToken();
            if (!token) {
                throw new Error('No auth token available');
            }
            // Auto-create cohort spaces
            const cohortResponse = await fetch('/api/spaces/cohort/auto-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    major: onboardingData.major,
                    graduationYear: onboardingData.graduationYear,
                }),
            });
            let cohortSpaces = [];
            if (cohortResponse.ok) {
                const cohortResult = await cohortResponse.json();
                cohortSpaces = cohortResult.spaces || [];
                logger.info('Cohort spaces created', {
                    count: cohortSpaces.length,
                    userId: unifiedAuth.user?.id
                });
            }
            // Auto-join relevant spaces
            const autoJoinResponse = await fetch('/api/spaces/auto-join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: unifiedAuth.user?.id
                }),
            });
            let joinedSpaces = [];
            if (autoJoinResponse.ok) {
                const joinResult = await autoJoinResponse.json();
                joinedSpaces = joinResult.spaces || [];
                logger.info('Auto-joined spaces', {
                    count: joinedSpaces.length,
                    userId: unifiedAuth.user?.id
                });
            }
            return {
                cohortSpaces,
                joinedSpaces,
                totalSpaces: cohortSpaces.length + joinedSpaces.length,
            };
        }
        catch (error) {
            logger.error('Post-onboarding space creation failed', {
                error: error instanceof Error ? error.message : String(error),
                userId: unifiedAuth.user?.id,
            });
            // Don't throw - space creation failure shouldn't block onboarding
            return {
                cohortSpaces: [],
                joinedSpaces: [],
                totalSpaces: 0,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }, [unifiedAuth]);
    return {
        // Core onboarding functions
        completeOnboarding,
        needsOnboarding,
        getOnboardingProgress,
        createPostOnboardingSpaces,
        // Auth state
        isAuthenticated: unifiedAuth.isAuthenticated,
        user: unifiedAuth.user,
        isLoading: unifiedAuth.isLoading,
        error: unifiedAuth.error,
        // Utility functions
        canAccessFeature: unifiedAuth.canAccessFeature,
        hasValidSession: unifiedAuth.hasValidSession,
    };
}
//# sourceMappingURL=use-onboarding-bridge.js.map