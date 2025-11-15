"use client";

import { useState, useEffect, useCallback } from 'react';
import { getSecureAuthHeaders, handleAuthError } from '../lib/secure-auth-utils';
import type {
  HiveProfile,
} from '@hive/core';
import { getProfileCompleteness } from '@hive/core/types/profile-system';
import { useSession } from './use-session';

interface HiveProfileState {
  profile: HiveProfile | null;
  dashboard: HiveProfileDashboard | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  completeness: number;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
}

interface CalendarConflict {
  id: string;
  type: 'overlap' | 'double_booking' | 'travel_time';
  severity: 'high' | 'medium' | 'low';
  eventIds: string[];
  description: string;
  suggestion: string;
  suggestedActions: Array<{
    action: 'reschedule' | 'cancel' | 'shorten' | 'move_location';
    eventId: string;
    newTime?: string;
    newLocation?: string;
  }>;
}

interface HiveProfileActions {
  loadProfile: () => Promise<void>;
  updateProfile: (data: Partial<HiveProfile>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<string | null>;
  toggleGhostMode: (enabled: boolean) => Promise<void>;
  refreshDashboard: () => Promise<void>;
  clearError: () => void;
  // Calendar management functions
  createEvent: (event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  getCalendarEvents: (startDate?: string, endDate?: string) => Promise<CalendarEvent[]>;
  detectConflicts: (newEvent?: Partial<CalendarEvent>) => Promise<CalendarConflict[]>;
  resolveConflict: (conflictId: string, resolution: string, eventId?: string, newTime?: string) => Promise<boolean>;
}

// Minimal dashboard shape used by this hook (local only)
interface HiveProfileDashboard {
  profile: HiveProfile;
  recentSpaces: Array<{
    id: string;
    name: string;
    type: string;
    lastActivity?: string;
    memberCount: number;
    role: string;
  }>;
  recentTools: Array<unknown>;
  recentActivity: Array<{
    id: string;
    type: 'space';
    action: string;
    title?: string;
    timestamp: string;
  }>;
  upcomingEvents: Array<{
    id: string;
    title: string;
    startDate: string;
    type: string;
    spaceId?: string;
  }>;
}

// API response interfaces
interface ApiProfileData {
  id: string;
  fullName?: string;
  handle?: string;
  email?: string;
  avatarUrl?: string;
  profilePhoto?: string;
  major?: string;
  academicYear?: string;
  graduationYear?: string;
  schoolId?: string;
  housing?: string;
  pronouns?: string;
  bio?: string;
  statusMessage?: string;
  interests?: string[];
  isPublic?: boolean;
  showActivity?: boolean;
  showSpaces?: boolean;
  showConnections?: boolean;
  allowDirectMessages?: boolean;
  showOnlineStatus?: boolean;
  ghostMode?: {
    enabled?: boolean;
    level?: string;
  };
  isBuilder?: boolean;
  builderOptIn?: boolean;
  builderLevel?: string;
  specializations?: string[];
  toolsCreated?: number;
  spacesJoined?: number;
  spacesActive?: number;
  spacesLed?: number;
  toolsUsed?: number;
  connectionsCount?: number;
  totalActivity?: number;
  currentStreak?: number;
  longestStreak?: number;
  reputation?: number;
  achievements?: number;
  createdAt?: string;
  joinedAt?: string;
  updatedAt?: string;
  lastActive?: string;
  lastActiveAt?: string;
  lastSeenAt?: string;
  emailVerified?: boolean;
  profileVerified?: boolean;
  accountStatus?: string;
  userType?: string;
  onboardingCompleted?: boolean;
  [key: string]: unknown;
}

export interface UseHiveProfileReturn extends HiveProfileState, HiveProfileActions {}

/**
 * Centralized HIVE Profile Hook
 * Single source of truth for all profile data and operations
 * Integrates with HIVE's design system and atomic principles
 */
export function useHiveProfile(): UseHiveProfileReturn {
  const { user, isAuthenticated } = useSession();
  
  const [state, setState] = useState<HiveProfileState>({
    profile: null,
    dashboard: null,
    isLoading: false,
    isUpdating: false,
    error: null,
    completeness: 0
  });

  // API Helper Functions - SECURITY HARDENED
  const getAuthHeaders = useCallback(() => {
    try {
      return getSecureAuthHeaders();
    } catch (error) {
      handleAuthError(error as Error);
      throw error;
    }
  }, []);

  const handleApiResponse = useCallback(async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' })) as { message: string };
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }, []);

  // No transformation needed - API returns HiveProfile format directly

  // Load Profile Completion Status
  const loadProfileCompletion = useCallback(async () => {
    try {
      const response = await fetch('/api/profile/completion', {
        headers: getAuthHeaders()
      });

      const data = await handleApiResponse(response);

      if (data.success && data.completion) {
        return data.completion.completionPercentage;
      }
      return null;
    } catch (error) {
      console.error('Failed to load profile completion:', error);
      return null;
    }
  }, [getAuthHeaders, handleApiResponse]);

  // Load Profile Data
  const loadProfile = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Fetch profile and completion data in parallel
      const [profileResponse, completionPercentage] = await Promise.all([
        fetch('/api/profile', { headers: getAuthHeaders() }),
        loadProfileCompletion()
      ]);

      const data = await handleApiResponse(profileResponse);

      if (data.success && data.profile) {
        // API now returns HiveProfile format directly
        const profile = data.profile as HiveProfile;
        const completeness = completionPercentage ?? getProfileCompleteness(profile);

        setState(prev => ({
          ...prev,
          profile,
          completeness,
          isLoading: false
        }));
      } else {
        throw new Error(data.error || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load profile',
        isLoading: false
      }));
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, loadProfileCompletion]);

  // Update Profile
  const updateProfile = useCallback(async (updateData: HiveProfileUpdateData): Promise<boolean> => {
    if (!isAuthenticated || !user) return false;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      // Flatten update data for API compatibility
      const apiUpdateData: Record<string, unknown> = {};

      if (updateData.identity) {
        Object.assign(apiUpdateData, updateData.identity);
      }

      if (updateData.academic) {
        Object.assign(apiUpdateData, updateData.academic);
      }

      if (updateData.personal) {
        if (updateData.personal.bio !== undefined) apiUpdateData.bio = updateData.personal.bio;
        if (updateData.personal.statusMessage !== undefined) apiUpdateData.statusMessage = updateData.personal.statusMessage;
        if (updateData.personal.interests !== undefined) apiUpdateData.interests = updateData.personal.interests;
      }

      if (updateData.privacy) {
        Object.assign(apiUpdateData, updateData.privacy);
      }

      if (updateData.builder) {
        Object.assign(apiUpdateData, updateData.builder);
      }

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(apiUpdateData)
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        // Reload profile to get updated data
        await loadProfile();
        setState(prev => ({ ...prev, isUpdating: false }));
        return true;
      } else {
        throw new Error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isUpdating: false
      }));
      return false;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, loadProfile]);

  // Upload Avatar
  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    if (!isAuthenticated || !user) return null;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      const formData = new FormData();
      formData.append('photo', file);

      const headers = getAuthHeaders();
      // Remove Content-Type for FormData
      const { 'Content-Type': _, ...headersWithoutContentType } = headers;
      const finalHeaders = headersWithoutContentType;

      const response = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        headers: finalHeaders,
        body: formData
      });

      const data = await handleApiResponse(response);

      if (data.success && data.avatarUrl) {
        // Update profile with new avatar URL
        await updateProfile({
          identity: { avatarUrl: data.avatarUrl }
        });
        
        setState(prev => ({ ...prev, isUpdating: false }));
        return data.avatarUrl;
      } else {
        throw new Error(data.error || 'Failed to upload avatar');
      }
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to upload avatar',
        isUpdating: false
      }));
      return null;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, updateProfile]);

  // Toggle Ghost Mode
  const toggleGhostMode = useCallback(async (enabled: boolean) => {
    await updateProfile({
      privacy: {
        ghostMode: {
          enabled,
          level: enabled ? 'moderate' : 'minimal'
        }
      }
    });
  }, [updateProfile]);

  // Load Dashboard Data
  const refreshDashboard = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    try {
      const response = await fetch('/api/profile/dashboard?timeRange=week&includeRecommendations=true', {
        headers: getAuthHeaders()
      });

      const data = await handleApiResponse(response);
      
      if (data.success && data.dashboard) {
        const dashboard: HiveProfileDashboard = {
          profile: state.profile!, // Will be set by loadProfile
          recentSpaces: data.dashboard.quickActions?.favoriteSpaces?.map((space: { id: string; name: string; color: string; memberCount: number; [key: string]: unknown }) => ({
            id: space.id,
            name: space.name,
            type: 'favorite',
            lastActivity: space.lastActivity,
            memberCount: space.memberCount || 0,
            role: 'member'
          })) || [],
          recentTools: [], // Would need to fetch from tools API
          recentActivity: data.dashboard.recentActivity?.spaces?.map((activity: { spaceId: string; action: string; timestamp: string; [key: string]: unknown }, index: number) => ({
            id: `activity-${index}`,
            type: 'space' as const,
            action: activity.action,
            title: activity.spaceName,
            timestamp: activity.timestamp
          })) || [],
          upcomingEvents: data.dashboard.upcomingEvents?.map((event: { id: string; title: string; date: string; type: string; [key: string]: unknown }) => ({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            type: event.type,
            spaceId: event.spaceId
          })) || []
        };
        
        setState(prev => ({ ...prev, dashboard }));
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Don't set error state for dashboard failure - it's secondary data
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse]);

  // Clear Error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Calendar Management Functions
  const createEvent = useCallback(async (event: Partial<CalendarEvent>): Promise<CalendarEvent | null> => {
    if (!isAuthenticated || !user) return null;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      const response = await fetch('/api/profile/calendar/events', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(event)
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        // Refresh dashboard to show new event
        await refreshDashboard();
        setState(prev => ({ ...prev, isUpdating: false }));
        return data.event;
      } else {
        throw new Error(data.error || 'Failed to create event');
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to create event',
        isUpdating: false
      }));
      return null;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, refreshDashboard]);

  const updateEvent = useCallback(async (id: string, updates: Partial<CalendarEvent>): Promise<boolean> => {
    if (!isAuthenticated || !user) return false;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      const response = await fetch('/api/profile/calendar/events', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...updates })
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        // Refresh dashboard to show updated event
        await refreshDashboard();
        setState(prev => ({ ...prev, isUpdating: false }));
        return true;
      } else {
        throw new Error(data.error || 'Failed to update event');
      }
    } catch (error) {
      console.error('Failed to update event:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update event',
        isUpdating: false
      }));
      return false;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, refreshDashboard]);

  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    if (!isAuthenticated || !user) return false;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      const response = await fetch(`/api/profile/calendar/events?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        // Refresh dashboard to remove deleted event
        await refreshDashboard();
        setState(prev => ({ ...prev, isUpdating: false }));
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete event',
        isUpdating: false
      }));
      return false;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, refreshDashboard]);

  const getCalendarEvents = useCallback(async (startDate?: string, endDate?: string): Promise<CalendarEvent[]> => {
    if (!isAuthenticated || !user) return [];

    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/profile/calendar/events?${params.toString()}`, {
        headers: getAuthHeaders()
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        return data.events || [];
      } else {
        throw new Error(data.error || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch calendar events'
      }));
      return [];
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse]);

  const detectConflicts = useCallback(async (newEvent?: Partial<CalendarEvent>): Promise<CalendarConflict[]> => {
    if (!isAuthenticated || !user) return [];

    try {
      const params = new URLSearchParams();
      if (newEvent) {
        params.append('includeNewEvent', JSON.stringify(newEvent));
      }
      params.append('suggestTimes', 'true');

      const response = await fetch(`/api/profile/calendar/conflicts?${params.toString()}`, {
        headers: getAuthHeaders()
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        return data.conflicts || [];
      } else {
        throw new Error(data.error || 'Failed to detect conflicts');
      }
    } catch (error) {
      console.error('Failed to detect conflicts:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to detect conflicts'
      }));
      return [];
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse]);

  const resolveConflict = useCallback(async (
    conflictId: string, 
    resolution: string, 
    eventId?: string, 
    newTime?: string
  ): Promise<boolean> => {
    if (!isAuthenticated || !user) return false;

    try {
      setState(prev => ({ ...prev, isUpdating: true, error: null }));

      const response = await fetch('/api/profile/calendar/conflicts', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ conflictId, resolution, eventId, newTime })
      });

      const data = await handleApiResponse(response);

      if (data.success) {
        // Refresh dashboard to show resolved conflict
        await refreshDashboard();
        setState(prev => ({ ...prev, isUpdating: false }));
        return true;
      } else {
        throw new Error(data.error || 'Failed to resolve conflict');
      }
    } catch (error) {
      console.error('Failed to resolve conflict:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to resolve conflict',
        isUpdating: false
      }));
      return false;
    }
  }, [isAuthenticated, user, getAuthHeaders, handleApiResponse, refreshDashboard]);

  // Load profile on mount and when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfile();
    } else {
      setState({
        profile: null,
        dashboard: null,
        isLoading: false,
        isUpdating: false,
        error: null,
        completeness: 0
      });
    }
  }, [isAuthenticated, user?.uid]); // Remove loadProfile to prevent infinite loop

  // Load dashboard after profile is loaded
  useEffect(() => {
    if (state.profile && !state.dashboard) {
      refreshDashboard();
    }
  }, [state.profile?.identity?.id]); // Remove refreshDashboard and state.dashboard to prevent infinite loop

  return {
    // State
    profile: state.profile,
    dashboard: state.dashboard,
    isLoading: state.isLoading,
    isUpdating: state.isUpdating,
    error: state.error,
    completeness: state.completeness,
    
    // Actions
    loadProfile,
    updateProfile,
    uploadAvatar,
    toggleGhostMode,
    refreshDashboard,
    clearError,
    
    // Calendar Management
    createEvent,
    updateEvent,
    deleteEvent,
    getCalendarEvents,
    detectConflicts,
    resolveConflict
  };
}
