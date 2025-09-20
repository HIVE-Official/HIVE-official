/**
 * HIVE Authentication Hooks
 * 
 * Handles .edu verification, onboarding flow, and profile completion tracking
 * Social-first approach with privacy defaults during vBETA
 */

"use client";

import { useEffect, useState } from 'react';
import { useHiveState } from './hive-state-management';
import type { 
  User, 
  ProfileCompletionStage, 
  AuthStatus,
  BuilderLevel 
} from './hive-state-management';

// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

/**
 * Main authentication hook with .edu verification
 */
export function useAuth() {
  const { state, dispatch, isAuthenticated, isOnboarding, currentUser } = useHiveState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Send magic link to .edu email
  const sendMagicLink = async (email: string) => {
    if (!email.endsWith('.edu')) {
      setError('Please use your university email address (.edu)');
      return false
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Dispatch action to start login flow
      dispatch({ type: 'AUTH_START_LOGIN', payload: { email } });
      
      // In real implementation, this would call your auth API
      // For demo purposes, we'll simulate the flow
      console.log(`Magic link sent to ${email}`);
      
      return true
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
      return false
    } finally {
      setIsLoading(false)
    }
  };
  
  // Verify magic link token
  const verifyMagicLink = async (token: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      dispatch({ type: 'AUTH_VERIFY_EMAIL', payload: { token } });
      
      // In real implementation, verify token with API
      // For demo, create a mock user
      const mockUser: User = {
        id: `user-${Date.now()}`,
        handle: '',
        name: '',
        email: `student@university.edu`,
        university: '',
        year: '',
        major: '',
        builderLevel: 'novice',
        ghostMode: 'visible',
        joinedAt: new Date(),
        lastActive: new Date(),
        profileCompletion: {
          stage: 'welcome',
          percentage: 10,
          nextSteps: ['Add your name', 'Select your university', 'Choose your major']
        },
        privacy: {
          profileVisibility: 'private',    // Private during vBETA
          toolSharingDefault: 'private',   // Private by default
          activityTracking: false,         // Opt-in only
          friendDiscovery: false           // Disabled until V1
        }
      };
      
      dispatch({ 
        type: 'AUTH_LOGIN_SUCCESS', 
        payload: { user: mockUser, token: 'mock-session-token' } 
      })};
      
      return true
    } catch (err) {
      setError('Invalid or expired link. Please request a new one.');
      return false
    } finally {
      setIsLoading(false)
    }
  };
  
  // Logout and return to feed
  const logout = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
    dispatch({ type: 'NAVIGATE_BACK_TO_FEED' })
  };
  
  // Update user profile
  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    
    dispatch({ 
      type: 'AUTH_UPDATE_PROFILE', 
      payload: updates 
    })
  };
  
  return {
    // State
    isAuthenticated,
    isOnboarding,
    isLoading,
    error,
    user: currentUser,
    authStatus: state.auth.status,
    
    // Actions
    sendMagicLink,
    verifyMagicLink,
    logout,
    updateProfile,
    clearError: () => setError(null)
  }
}

// ============================================================================
// ONBOARDING HOOKS
// ============================================================================

/**
 * Profile completion and onboarding flow
 */
export function useOnboarding() {
  const { state, dispatch, currentUser } = useHiveState();
  
  const profileCompletion = currentUser?.profileCompletion || {
    stage: 'welcome',
    percentage: 0,
    nextSteps: []
  };
  
  // Advance to next onboarding stage
  const advanceStage = (stage: ProfileCompletionStage, data: any) => {
    dispatch({ 
      type: 'PROFILE_ADVANCE_STAGE', 
      payload: { stage, data } 
    });
    
    // Update completion percentage
    const percentages: Record<ProfileCompletionStage, number> = {
      welcome: 10,
      academics: 35,
      handle: 55,
      photo: 75,
      legal: 90,
      complete: 100
    };
    
    const percentage = percentages[stage] || 0;
    const nextSteps = getNextSteps(stage);
    
    dispatch({ 
      type: 'PROFILE_UPDATE_COMPLETION', 
      payload: { percentage, nextSteps } 
    })
  };
  
  // Get next steps for current stage
  const getNextSteps = (stage: ProfileCompletionStage): string[] => {
    switch (stage) {
      case 'welcome':
        return ['Add your name', 'Select your university', 'Choose your year & major'];
      case 'academics':
        return ['Create your unique handle', 'This will be your HIVE identity'];
      case 'handle':
        return ['Add a profile photo', 'Help others recognize you'];
      case 'photo':
        return ['Review terms & privacy', 'Complete your HIVE profile'];
      case 'legal':
        return ['Explore HIVE!', 'Join your first spaces'];
      case 'complete':
        return [];
      default:
        return []
    }
  };
  
  // Check if user can access feature based on completion
  const canAccessFeature = (feature: 'spaces' | 'tools' | 'lab' | 'social'): boolean => {
    const completionPercentage = profileCompletion.percentage;
    
    switch (feature) {
      case 'spaces': return completionPercentage >= 35;  // After academics
      case 'tools': return completionPercentage >= 55;   // After handle
      case 'lab': return completionPercentage >= 75;     // After photo
      case 'social': return completionPercentage >= 100; // Full completion
      default: return false
    }
  };
  
  return {
    // State
    currentStage: profileCompletion.stage,
    completionPercentage: profileCompletion.percentage,
    nextSteps: profileCompletion.nextSteps,
    isComplete: profileCompletion.stage === 'complete',
    
    // Actions
    advanceStage,
    canAccessFeature,
    
    // Stage checkers
    isWelcomeStage: profileCompletion.stage === 'welcome',
    isAcademicsStage: profileCompletion.stage === 'academics',
    isHandleStage: profileCompletion.stage === 'handle',
    isPhotoStage: profileCompletion.stage === 'photo',
    isLegalStage: profileCompletion.stage === 'legal'
  }
}

// ============================================================================
// BUILDER PROGRESSION HOOKS
// ============================================================================

/**
 * Builder level progression and tool permissions
 */
export function useBuilderProgression() {
  const { state, dispatch, currentUser, checkToolPermission } = useHiveState();
  
  const builderLevel = currentUser?.builderLevel || 'novice';
  
  // Calculate builder progression
  const getBuilderProgress = (): { level: BuilderLevel; percentage: number; nextLevel: BuilderLevel | null} => {
    const progressMap: Record<BuilderLevel, { percentage: number; nextLevel: BuilderLevel | null }> = {
      novice: { percentage: 25, nextLevel: 'intermediate' },
      intermediate: { percentage: 50, nextLevel: 'advanced' },
      advanced: { percentage: 75, nextLevel: 'expert' },
      expert: { percentage: 100, nextLevel: null }
    };
    
    return {
      level: builderLevel,
      ...progressMap[builderLevel]
    }
  };
  
  // Check what user can build
  const getBuildingCapabilities = () => {
    switch (builderLevel) {
      case 'novice':
        return {
          canUsePersonalTools: true,
          canCreatePersonalTools: false,
          canUseSpaceTools: false,
          canCreateSpaceTools: false,
          canCreateRituals: false,
          maxPersonalTools: 3
        };
      case 'intermediate':
        return {
          canUsePersonalTools: true,
          canCreatePersonalTools: true,
          canUseSpaceTools: true,
          canCreateSpaceTools: false,
          canCreateRituals: false,
          maxPersonalTools: 10
        };
      case 'advanced':
        return {
          canUsePersonalTools: true,
          canCreatePersonalTools: true,
          canUseSpaceTools: true,
          canCreateSpaceTools: true,
          canCreateRituals: true,
          maxPersonalTools: 25
        };
      case 'expert':
        return {
          canUsePersonalTools: true,
          canCreatePersonalTools: true,
          canUseSpaceTools: true,
          canCreateSpaceTools: true,
          canCreateRituals: true,
          maxPersonalTools: Infinity
        };
      default:
        return {
          canUsePersonalTools: false,
          canCreatePersonalTools: false,
          canUseSpaceTools: false,
          canCreateSpaceTools: false,
          canCreateRituals: false,
          maxPersonalTools: 0
        }
    }
  };
  
  // Advance builder level (based on usage metrics)
  const advanceBuilderLevel = (newLevel: BuilderLevel) => {
    if (!currentUser) return;
    
    dispatch({
      type: 'AUTH_UPDATE_PROFILE',
      payload: {
        ...currentUser,
        builderLevel: newLevel
      }
    })
  };
  
  const progress = getBuilderProgress();
  const capabilities = getBuildingCapabilities();
  
  return {
    // Current state
    level: builderLevel,
    progress: progress.percentage,
    nextLevel: progress.nextLevel,
    capabilities,
    
    // Permissions
    checkToolPermission,
    
    // Actions
    advanceBuilderLevel,
    
    // Helpers
    isNovice: builderLevel === 'novice',
    isIntermediate: builderLevel === 'intermediate',
    isAdvanced: builderLevel === 'advanced',
    isExpert: builderLevel === 'expert',
    canAccessLab: ['intermediate', 'advanced', 'expert'].includes(builderLevel)
  }
}

// ============================================================================
// PRIVACY & GHOST MODE HOOKS
// ============================================================================

/**
 * Privacy controls and ghost mode management
 */
export function usePrivacy() {
  const { currentUser, dispatch } = useHiveState();
  
  const privacy = currentUser?.privacy || {
    profileVisibility: 'private',
    toolSharingDefault: 'private',
    activityTracking: false,
    friendDiscovery: false
  };
  
  const ghostMode = currentUser?.ghostMode || 'visible';
  
  // Toggle ghost mode (complete invisibility)
  const toggleGhostMode = () => {
    if (!currentUser) return;
    
    const newGhostMode = ghostMode === 'ghost' ? 'visible' : 'ghost';
    
    dispatch({
      type: 'AUTH_UPDATE_PROFILE',
      payload: {
        ...currentUser,
        ghostMode: newGhostMode
      }
    })
  };
  
  // Update privacy settings
  const updatePrivacySettings = (updates: Partial<typeof privacy>) => {
    if (!currentUser) return;
    
    dispatch({
      type: 'AUTH_UPDATE_PROFILE',
      payload: {
        ...currentUser,
        privacy: {
          ...privacy,
          ...updates
        }
      }
    })
  };
  
  // Check what's visible to others
  const getVisibilityStatus = () => {
    if (ghostMode === 'ghost') {
      return {
        profileVisible: false,
        activityVisible: false,
        toolsVisible: false,
        spaceMembershipVisible: false,
        description: 'You are completely invisible to other users'
      }
    }
    
    return {
      profileVisible: privacy.profileVisibility !== 'private',
      activityVisible: privacy.activityTracking,
      toolsVisible: privacy.toolSharingDefault !== 'private',
      spaceMembershipVisible: privacy.friendDiscovery,
      description: `Profile is ${privacy.profileVisibility}, activity ${privacy.activityTracking ? 'tracked' : 'private'}`
    }
  };
  
  return {
    // Current state
    privacy,
    ghostMode,
    isGhost: ghostMode === 'ghost',
    visibility: getVisibilityStatus(),
    
    // Actions
    toggleGhostMode,
    updatePrivacySettings,
    
    // Quick setters
    setProfileVisibility: (visibility: 'private' | 'friends' | 'public') => 
      updatePrivacySettings({ profileVisibility: visibility }),
    setToolSharingDefault: (sharing: 'private' | 'space' | 'public') =>
      updatePrivacySettings({ toolSharingDefault: sharing }),
    toggleActivityTracking: () => 
      updatePrivacySettings({ activityTracking: !privacy.activityTracking }),
    toggleFriendDiscovery: () =>
      updatePrivacySettings({ friendDiscovery: !privacy.friendDiscovery })
  }
}

// ============================================================================
// EXPORT ALL HOOKS
// ============================================================================

