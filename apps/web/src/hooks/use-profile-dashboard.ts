/**
 * Profile Dashboard Hook
 * Manages dashboard layout, cards, and user profile data
 */

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout, UserProfile, UserConnection } from '@/lib/firebase-collections';
import { useSession } from './use-session';

interface ProfileDashboardData {
  profile: UserProfile | null;
  layout: DashboardLayout | null;
  connections: UserConnection[];
  stats: {
    spaces: number;
    tools: number;
    connections: number;
    reputation: number;
  };
}

interface UseProfileDashboardReturn {
  data: ProfileDashboardData;
  isLoading: boolean;
  error: string | null;
  
  // Layout Management
  updateLayout: (newLayout: DashboardLayout) => Promise<boolean>;
  resetLayout: (device?: string) => Promise<boolean>;
  
  // Profile Management
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<boolean>;
  
  // Social Features
  sendConnectionRequest: (userId: string, type?: string) => Promise<boolean>;
  acceptConnection: (connectionId: string) => Promise<boolean>;
  removeConnection: (connectionId: string) => Promise<boolean>;
  
  // Integrations
  connectCalendar: (provider: 'google' | 'outlook') => Promise<string>;
  syncCalendar: (provider: string) => Promise<boolean>;
  disconnectCalendar: (provider: string) => Promise<boolean>;
  
  // Refresh data
  refresh: () => Promise<void>;
}

export function useProfileDashboard(): UseProfileDashboardReturn {
  const { user } = useSession();
  const [data, setData] = useState<ProfileDashboardData>({
    profile: null,
    layout: null,
    connections: [],
    stats: {
      spaces: 0,
      tools: 0,
      connections: 0,
      reputation: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [profileRes, layoutRes, connectionsRes, statsRes] = await Promise.all([
        fetch('/api/profile/me'),
        fetch('/api/profile/dashboard/layout'),
        fetch('/api/profile/connections/manage?status=accepted'),
        fetch('/api/profile/stats')
      ]);

      const results = await Promise.all([
        profileRes.ok ? profileRes.json() : null,
        layoutRes.ok ? layoutRes.json() : null,
        connectionsRes.ok ? connectionsRes.json() : null,
        statsRes.ok ? statsRes.json() : null
      ]);

      setData({
        profile: results[0]?.profile || null,
        layout: results[1]?.layout || null,
        connections: results[2]?.connections || [],
        stats: results[3]?.stats || {
          spaces: 0,
          tools: 0,
          connections: 0,
          reputation: 0
        }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Layout Management
  const updateLayout = useCallback(async (newLayout: DashboardLayout): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/dashboard/layout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLayout)
      });

      if (response.ok) {
        const result = await response.json();
        setData(prev => ({ ...prev, layout: result.layout }));
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to update layout');
      return false;
    }
  }, []);

  const resetLayout = useCallback(async (device?: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/dashboard/layout/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device })
      });

      if (response.ok) {
        const result = await response.json();
        setData(prev => ({ ...prev, layout: result.layout }));
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to reset layout');
      return false;
    }
  }, []);

  // Profile Management
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const result = await response.json();
        setData(prev => ({ ...prev, profile: result.profile }));
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to update profile');
      return false;
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setData(prev => ({
          ...prev,
          profile: prev.profile ? {
            ...prev.profile,
            avatarUrl: result.avatarUrl
          } : null
        }));
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to upload avatar');
      return false;
    }
  }, []);

  // Social Features
  const sendConnectionRequest = useCallback(async (
    userId: string, 
    type: string = 'friend'
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/connections/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectedUserId: userId, type })
      });

      if (response.ok) {
        // Refresh connections
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to send connection request');
      return false;
    }
  }, [fetchDashboardData]);

  const acceptConnection = useCallback(async (connectionId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/connections/manage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId, status: 'accepted' })
      });

      if (response.ok) {
        // Refresh connections
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to accept connection');
      return false;
    }
  }, [fetchDashboardData]);

  const removeConnection = useCallback(async (connectionId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/profile/connections/manage?connectionId=${connectionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh connections
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to remove connection');
      return false;
    }
  }, [fetchDashboardData]);

  // Integration Management
  const connectCalendar = useCallback(async (provider: 'google' | 'outlook'): Promise<string> => {
    try {
      const response = await fetch('/api/profile/integrations/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });

      if (response.ok) {
        const result = await response.json();
        return result.authUrl;
      }
      throw new Error('Failed to get auth URL');
    } catch (error) {
      setError(`Failed to connect ${provider} calendar`);
      throw error;
    }
  }, []);

  const syncCalendar = useCallback(async (provider: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/integrations/calendar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });

      return response.ok;
    } catch (error) {
      setError(`Failed to sync ${provider} calendar`);
      return false;
    }
  }, []);

  const disconnectCalendar = useCallback(async (provider: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/profile/integrations/calendar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });

      return response.ok;
    } catch (error) {
      setError(`Failed to disconnect ${provider} calendar`);
      return false;
    }
  }, []);

  // Refresh all data
  const refresh = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    isLoading,
    error,
    updateLayout,
    resetLayout,
    updateProfile,
    uploadAvatar,
    sendConnectionRequest,
    acceptConnection,
    removeConnection,
    connectCalendar,
    syncCalendar,
    disconnectCalendar,
    refresh
  };
}