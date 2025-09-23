"use client";

/**
 * Unified Profile Context Provider
 * Bridges useHiveProfile hook with @hive/ui component ecosystem
 * Provides both HiveProfile and ProfileSystem formats for maximum compatibility
 */

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useHiveProfile, UseHiveProfileReturn } from '@/hooks/use-hive-profile';
import { transformHiveProfileToProfileSystem, createMockProfileSystem } from '@/lib/profile-transformers';
import type { HiveProfile } from '@hive/core';
import type { ProfileSystem } from '@/lib/profile-transformers';

interface ProfileContextValue {
  // Raw HiveProfile data (for API compatibility)
  hiveProfile: HiveProfile | null;

  // Transformed ProfileSystem data (for @hive/ui components)
  profileSystem: ProfileSystem | null;

  // Dashboard data
  dashboard: UseHiveProfileReturn['dashboard'];

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

  // Transform HiveProfile to ProfileSystem format for @hive/ui components
  const profileSystem = useMemo(() => {
    // Use mock data if provided (for development/testing)
    if (mockData) {
      return mockData;
    }

    // If no profile data yet, return null
    if (!profileHook.profile) {
      return null;
    }

    // Transform HiveProfile to ProfileSystem
    try {
      return transformHiveProfileToProfileSystem(
        profileHook.profile,
        profileHook.dashboard || undefined
      );
    } catch (error) {
      console.error('Failed to transform profile data:', error);
      // Fallback to mock data structure to prevent UI crashes
      return createMockProfileSystem(profileHook.profile.identity.id);
    }
  }, [profileHook.profile, profileHook.dashboard, mockData]);

  // Create context value with all necessary data and actions
  const contextValue: ProfileContextValue = useMemo(() => ({
    // Data
    hiveProfile: profileHook.profile,
    profileSystem,
    dashboard: profileHook.dashboard,

    // State
    isLoading: profileHook.isLoading,
    isUpdating: profileHook.isUpdating,
    error: profileHook.error,
    completeness: profileHook.completeness,

    // Actions (pass-through from hook)
    loadProfile: profileHook.loadProfile,
    updateProfile: profileHook.updateProfile,
    uploadAvatar: profileHook.uploadAvatar,
    toggleGhostMode: profileHook.toggleGhostMode,
    refreshDashboard: profileHook.refreshDashboard,
    clearError: profileHook.clearError,

    // Calendar actions
    createEvent: profileHook.createEvent,
    updateEvent: profileHook.updateEvent,
    deleteEvent: profileHook.deleteEvent,
    getCalendarEvents: profileHook.getCalendarEvents,
    detectConflicts: profileHook.detectConflicts,
    resolveConflict: profileHook.resolveConflict
  }), [profileHook, profileSystem]);

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