"use client";

/**
 * Unified Profile Context Provider
 * Bridges useHiveProfile hook with @hive/ui component ecosystem
 * Provides both HiveProfile and ProfileSystem formats for maximum compatibility
 */

import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState } from 'react';
import { useHiveProfile, UseHiveProfileReturn } from '@/hooks/use-hive-profile';
import { toUnifiedProfile, toProfileSystem, createMockProfileSystem } from '@/lib/profile-transformers';
import type { HiveProfile, UnifiedHiveProfile, ProfileSystem } from '@hive/core';
import { presenceService, type PresenceData } from '@hive/core';
import { useAuth } from '@hive/auth-logic';
import type { PresenceStatus } from '@hive/ui';

interface ProfileContextValue {
  // Raw HiveProfile data (for API compatibility)
  hiveProfile: HiveProfile | null;

  // Unified profile data (modern format)
  unifiedProfile: UnifiedHiveProfile | null;

  // Transformed ProfileSystem data (for @hive/ui components)
  profileSystem: ProfileSystem | null;

  // Dashboard data
  dashboard: UseHiveProfileReturn['dashboard'];

  // Presence data
  presenceStatus: PresenceStatus;
  lastSeen: Date | null;
  isGhostMode: boolean;

  // State management
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  completeness: number;

  // Actions (pass-through from useHiveProfile)
  loadProfile: UseHiveProfileReturn['loadProfile'];
  updateProfile: UseHiveProfileReturn['updateProfile'];
  uploadAvatar: UseHiveProfileReturn['uploadAvatar'];
  toggleGhostMode: UseHiveProfileReturn['toggleGhostMode'];
  refreshDashboard: UseHiveProfileReturn['refreshDashboard'];
  clearError: UseHiveProfileReturn['clearError'];

  // Calendar actions
  createEvent: UseHiveProfileReturn['createEvent'];
  updateEvent: UseHiveProfileReturn['updateEvent'];
  deleteEvent: UseHiveProfileReturn['deleteEvent'];
  getCalendarEvents: UseHiveProfileReturn['getCalendarEvents'];
  detectConflicts: UseHiveProfileReturn['detectConflicts'];
  resolveConflict: UseHiveProfileReturn['resolveConflict'];
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

interface ProfileContextProviderProps {
  children: ReactNode;
  /**
   * Optional user ID for viewing other profiles
   * If not provided, uses current authenticated user
   */
  userId?: string;
  /**
   * Whether this is a public profile view (read-only)
   */
  isPublicView?: boolean;
  /**
   * Mock data for development/testing
   */
  mockData?: ProfileSystem;
}

export function ProfileContextProvider({
  children,
  userId,
  isPublicView = false,
  mockData
}: ProfileContextProviderProps) {
  // Use the existing useHiveProfile hook for data management
  const profileHook = useHiveProfile();
  const { user } = useAuth();

  // Presence state
  const [presenceStatus, setPresenceStatus] = useState<PresenceStatus>('offline');
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const [isGhostMode, setIsGhostMode] = useState(false);

  // Initialize presence tracking
  useEffect(() => {
    if (user && !isPublicView) {
      // Initialize presence for current user
      presenceService.initializePresence(user, 'ub-buffalo').then(() => {
        setPresenceStatus('online');
      });

      // Set up activity monitoring
      const handleActivity = () => {
        if (presenceStatus === 'away' && !isGhostMode) {
          presenceService.updateStatus('online');
          setPresenceStatus('online');
        }
      };

      // Monitor user activity
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keypress', handleActivity);

      return () => {
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keypress', handleActivity);
        presenceService.cleanup();
      };
    }
  }, [user, isPublicView, presenceStatus, isGhostMode]);

  // Create unified profile with advanced features
  const unifiedProfile = useMemo(() => {
    // If no profile data yet, return null
    if (!profileHook.profile) {
      return null;
    }

    // Convert to unified profile system
    try {
      return toUnifiedProfile(profileHook.profile);
    } catch (error) {
      console.error('Failed to create unified profile:', error);
      return null;
    }
  }, [profileHook.profile]);

  // Transform to ProfileSystem format for @hive/ui components
  const profileSystem = useMemo(() => {
    // Use mock data if provided (for development/testing)
    if (mockData) {
      return mockData;
    }

    // If no unified profile, return null
    if (!unifiedProfile) {
      return null;
    }

    // Transform UnifiedProfile to ProfileSystem
    try {
      return toProfileSystem(unifiedProfile);
    } catch (error) {
      console.error('Failed to transform to ProfileSystem:', error);
      // Fallback to mock data structure to prevent UI crashes
      return createMockProfileSystem(unifiedProfile.identity.id);
    }
  }, [unifiedProfile, mockData]);

  // Handle ghost mode toggle with presence service
  const handleToggleGhostMode = async () => {
    const newGhostMode = !isGhostMode;
    setIsGhostMode(newGhostMode);
    await presenceService.toggleGhostMode(newGhostMode);
    setPresenceStatus(newGhostMode ? 'ghost' : 'online');
    // Also call the original toggleGhostMode for profile update
    await profileHook.toggleGhostMode();
  };

  // Create context value with all necessary data and actions
  const contextValue: ProfileContextValue = useMemo(() => ({
    // Data
    hiveProfile: profileHook.profile,
    unifiedProfile,
    profileSystem,
    dashboard: profileHook.dashboard,

    // Presence data
    presenceStatus,
    lastSeen,
    isGhostMode,

    // State
    isLoading: profileHook.isLoading,
    isUpdating: profileHook.isUpdating,
    error: profileHook.error,
    completeness: profileHook.completeness,

    // Actions (pass-through from hook, with presence-aware ghost mode)
    loadProfile: profileHook.loadProfile,
    updateProfile: profileHook.updateProfile,
    uploadAvatar: profileHook.uploadAvatar,
    toggleGhostMode: handleToggleGhostMode,
    refreshDashboard: profileHook.refreshDashboard,
    clearError: profileHook.clearError,

    // Calendar actions
    createEvent: profileHook.createEvent,
    updateEvent: profileHook.updateEvent,
    deleteEvent: profileHook.deleteEvent,
    getCalendarEvents: profileHook.getCalendarEvents,
    detectConflicts: profileHook.detectConflicts,
    resolveConflict: profileHook.resolveConflict
  }), [profileHook, unifiedProfile, profileSystem, presenceStatus, lastSeen, isGhostMode]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * Hook to access profile context
 * Provides both HiveProfile and ProfileSystem formats
 */
export function useProfileContext(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileContextProvider');
  }

  return context;
}

/**
 * Hook to access ProfileSystem data specifically
 * Convenience hook for @hive/ui components
 */
export function useProfileSystem(): ProfileSystem | null {
  const { profileSystem } = useProfileContext();
  return profileSystem;
}

/**
 * Hook to access HiveProfile data specifically
 * Convenience hook for API interactions
 */
export function useHiveProfileData(): HiveProfile | null {
  const { hiveProfile } = useProfileContext();
  return hiveProfile;
}

/**
 * Hook to access UnifiedHiveProfile data specifically
 * Modern hook for new development
 */
export function useUnifiedProfile(): UnifiedHiveProfile | null {
  const { unifiedProfile } = useProfileContext();
  return unifiedProfile;
}

/**
 * Hook for profile actions
 * Convenience hook for state management
 */
export function useProfileActions() {
  const {
    loadProfile,
    updateProfile,
    uploadAvatar,
    toggleGhostMode,
    refreshDashboard,
    clearError,
    createEvent,
    updateEvent,
    deleteEvent,
    getCalendarEvents,
    detectConflicts,
    resolveConflict
  } = useProfileContext();

  return {
    loadProfile,
    updateProfile,
    uploadAvatar,
    toggleGhostMode,
    refreshDashboard,
    clearError,
    createEvent,
    updateEvent,
    deleteEvent,
    getCalendarEvents,
    detectConflicts,
    resolveConflict
  };
}

/**
 * Higher-order component to wrap components with ProfileContext
 */
export function withProfileContext<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    isPublicView?: boolean;
    mockData?: ProfileSystem;
  }
) {
  return function WrappedComponent(props: P) {
    return (
      <ProfileContextProvider
        isPublicView={options?.isPublicView}
        mockData={options?.mockData}
      >
        <Component {...props} />
      </ProfileContextProvider>
    );
  };
}

/**
 * Development helper: ProfileContext with mock data
 */
export function MockProfileContextProvider({ children }: { children: ReactNode }) {
  const mockData = createMockProfileSystem('mock-dev-user');

  return (
    <ProfileContextProvider mockData={mockData}>
      {children}
    </ProfileContextProvider>
  );
}