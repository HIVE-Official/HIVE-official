/**
 * Custom hooks for Profile data integration with bulletproof backend
 */

import { useState, useEffect, useCallback } from 'react';
import { profileService, type ProfileData, type DashboardData, type SpaceMembership, type ProfileAnalytics } from '@/lib/api/profile-service';

/**
 * Hook for user profile data
 */
export function useProfileData() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      console.error('Profile fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<ProfileData>) => {
    try {
      setError(null);
      const updatedProfile = await profileService.updateProfile(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  }, []);

  const generateAvatar = useCallback(async () => {
    try {
      setError(null);
      const { avatarUrl } = await profileService.generateAvatar();
      if (profile) {
        setProfile({ ...profile, avatarUrl });
      }
      return avatarUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate avatar');
      throw err;
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfile,
    generateAvatar
  };
}

/**
 * Hook for dashboard data
 */
export function useDashboardData(timeRange = 'week', includeRecommendations = true) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const dashboardData = await profileService.getDashboard(timeRange, includeRecommendations);
      setDashboard(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard');
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange, includeRecommendations]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    isLoading,
    error,
    refetch: fetchDashboard
  };
}

/**
 * Hook for user spaces
 */
export function useProfileSpaces(includeActivity = true, includeStats = true, timeRange = 'week') {
  const [spaces, setSpaces] = useState<SpaceMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaces = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const spacesData = await profileService.getSpaces(includeActivity, includeStats, timeRange);
      setSpaces(spacesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch spaces');
      console.error('Spaces fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [includeActivity, includeStats, timeRange]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  return {
    spaces,
    isLoading,
    error,
    refetch: fetchSpaces
  };
}

/**
 * Hook for profile analytics
 */
export function useProfileAnalytics(timeRange = 'month', includeInsights = true) {
  const [analytics, setAnalytics] = useState<ProfileAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const analyticsData = await profileService.getAnalytics(timeRange, includeInsights);
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      console.error('Analytics fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange, includeInsights]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    isLoading,
    error,
    refetch: fetchAnalytics
  };
}

/**
 * Hook for calendar events
 */
export function useCalendarEvents(startDate?: string, endDate?: string, type?: string) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const eventsData = await profileService.getCalendarEvents(startDate, endDate, type);
      setEvents(eventsData.events || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calendar events');
      console.error('Calendar events fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, type]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createEvent = useCallback(async (eventData: {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
    location?: string;
    spaceId?: string;
    isRecurring?: boolean;
    recurringPattern?: string;
  }) => {
    try {
      setError(null);
      const newEvent = await profileService.createCalendarEvent(eventData);
      await fetchEvents(); // Refresh events
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    }
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
    createEvent
  };
}

/**
 * Hook for user connections
 */
export function useConnections(limit = 20, includeDetails = true, sortBy = 'recent') {
  const [connections, setConnections] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const connectionsData = await profileService.getConnections(limit, includeDetails, sortBy);
      setConnections(connectionsData.connections || []);
      setStats(connectionsData.stats || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch connections');
      console.error('Connections fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [limit, includeDetails, sortBy]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return {
    connections,
    stats,
    isLoading,
    error,
    refetch: fetchConnections
  };
}

/**
 * Hook for profile stats
 */
export function useProfileStats(timeRange = 'month', includeComparisons = false) {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const statsData = await profileService.getStats(timeRange, includeComparisons);
      setStats(statsData.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      console.error('Stats fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange, includeComparisons]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats
  };
}

/**
 * Hook for privacy settings
 */
export function usePrivacySettings() {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const settingsData = await profileService.getPrivacySettings();
      setSettings(settingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch privacy settings');
      console.error('Privacy settings fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(async (newSettings: any) => {
    try {
      setError(null);
      const updatedSettings = await profileService.updatePrivacySettings(newSettings);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update privacy settings');
      throw err;
    }
  }, []);

  return {
    settings,
    isLoading,
    error,
    refetch: fetchSettings,
    updateSettings
  };
}