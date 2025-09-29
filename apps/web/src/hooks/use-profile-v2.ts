/**
 * Profile Hook V2
 * Uses CQRS pattern for profile management
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@hive/auth-logic';
import { useToast } from './use-toast';

interface ProfileData {
  id: string;
  handle: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  interests: string[];
  photos: string[];
  isActive: boolean;
  isVerified: boolean;
  userType: string;
  campusId: string;
  privacy?: any;
  badges: any[];
  lastSeen?: Date;
  followerCount: number;
  followingCount: number;
  connectionCount: number;
  connectionStatus?: string;
  isOwnProfile: boolean;
}

interface UseProfileOptions {
  handle?: string;
  profileId?: string;
  autoLoad?: boolean;
}

interface UseProfileReturn {
  profile: ProfileData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  updatePrivacy: (privacy: any) => Promise<boolean>;
  isOwnProfile: boolean;
}

export function useProfileV2(options: UseProfileOptions = {}): UseProfileReturn {
  const { handle, profileId, autoLoad = true } = options;
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setError(new Error('User not authenticated'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (handle) params.append('handle', handle);
      if (profileId) params.append('id', profileId);

      const response = await fetch(`/api/profile/v2?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to load profile');
      }

      const data = await response.json();

      if (data.success && data.data) {
        setProfile(data.data);
      } else {
        throw new Error('Invalid profile data');
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err as Error);
      toast({
        title: 'Failed to load profile',
        description: (err as Error).message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [user, handle, profileId, toast]);

  const updatePrivacy = useCallback(async (privacySettings: any): Promise<boolean> => {
    if (!user || !profile?.isOwnProfile) {
      toast({
        title: 'Unauthorized',
        description: 'You can only update your own privacy settings',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const response = await fetch('/api/profile/v2', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privacy: privacySettings })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update privacy');
      }

      const data = await response.json();

      if (data.success) {
        // Update local profile state
        setProfile(prev => prev ? {
          ...prev,
          privacy: data.data.privacy
        } : null);

        toast({
          title: 'Privacy settings updated',
          description: `${data.data.fieldsUpdated} settings were updated`
        });

        return true;
      }

      return false;
    } catch (err) {
      console.error('Failed to update privacy:', err);
      toast({
        title: 'Failed to update privacy',
        description: (err as Error).message,
        variant: 'destructive'
      });
      return false;
    }
  }, [user, profile, toast]);

  const refresh = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  // Auto-load profile on mount if requested
  useEffect(() => {
    if (autoLoad && user) {
      fetchProfile();
    }
  }, [autoLoad, user, fetchProfile]);

  return {
    profile,
    loading,
    error,
    refresh,
    updatePrivacy,
    isOwnProfile: profile?.isOwnProfile || false
  };
}