import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-client';
import { useAuthStore } from '../stores/auth-store';
import { useProfileStore, type ProfileData, type SpaceMembership, type ProfileAnalytics } from '../stores/profile-store';

// API client functions
async function fetchUserProfile(_userId: string): Promise<ProfileData> {
  const token = await useAuthStore.getState().user?.getIdToken();
  const response = await fetch(`/api/profile/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  const data = await response.json();
  return data.profile;
}

async function fetchUserSpaceMemberships(userId: string, includeActivity = true): Promise<SpaceMembership[]> {
  const token = await useAuthStore.getState().user?.getIdToken();
  const params = new URLSearchParams({
    includeActivity: includeActivity.toString(),
    timeRange: 'week',
  });
  
  const response = await fetch(`/api/profile/spaces?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch space memberships: ${response.statusText}`);
  }

  const data = await response.json();
  return data.memberships || [];
}

async function fetchUserAnalytics(_userId: string): Promise<ProfileAnalytics> {
  const token = await useAuthStore.getState().user?.getIdToken();
  const response = await fetch(`/api/profile/analytics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile analytics: ${response.statusText}`);
  }

  const data = await response.json();
  return data.analytics;
}

async function updateUserProfile(userId: string, updates: Partial<ProfileData>): Promise<ProfileData> {
  const token = await useAuthStore.getState().user?.getIdToken();
  const response = await fetch(`/api/profile/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update profile');
  }

  const data = await response.json();
  return data.profile;
}

async function uploadProfilePhoto(file: File): Promise<{ avatarUrl: string }> {
  const token = await useAuthStore.getState().user?.getIdToken();
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch('/api/profile/upload-photo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload photo');
  }

  return await response.json();
}

// React Query hooks
export function useUserProfile(userId = 'me') {
  const { setProfile, setProfileLoading, setProfileError } = useProfileStore();
  
  const query = useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => fetchUserProfile(userId),
    staleTime: 2 * 60 * 1000, // Consider fresh for 2 minutes
    enabled: !!userId,
  });

  // Handle side effects using useEffect instead of deprecated callbacks
  useEffect(() => {
    if (userId === 'me') {
      if (query.data) {
        setProfile(query.data);
        setProfileError(null);
      }
      if (query.error) {
        setProfileError(query.error.message);
      }
      setProfileLoading(query.isLoading);
    }
  }, [userId, query.data, query.error, query.isLoading, setProfile, setProfileError, setProfileLoading]);

  return query;
}

export function useUserSpaceMemberships(userId = 'me', includeActivity = true) {
  const { setSpaceMemberships, setSpacesLoading, setSpacesError } = useProfileStore();
  
  const query = useQuery({
    queryKey: [...queryKeys.profile(userId), 'spaces', { includeActivity }],
    queryFn: () => fetchUserSpaceMemberships(userId, includeActivity),
    staleTime: 1 * 60 * 1000, // Consider fresh for 1 minute (more dynamic data)
    enabled: !!userId,
  });

  // Handle side effects using useEffect instead of deprecated callbacks
  useEffect(() => {
    if (userId === 'me') {
      if (query.data) {
        setSpaceMemberships(query.data);
        setSpacesError(null);
      }
      if (query.error) {
        setSpacesError(query.error.message);
      }
      setSpacesLoading(query.isLoading);
    }
  }, [userId, query.data, query.error, query.isLoading, setSpaceMemberships, setSpacesError, setSpacesLoading]);

  return query;
}

export function useUserAnalytics(userId = 'me') {
  const { setAnalytics, setAnalyticsLoading, setAnalyticsError } = useProfileStore();
  
  const query = useQuery({
    queryKey: queryKeys.userAnalytics(userId),
    queryFn: () => fetchUserAnalytics(userId),
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes (less dynamic)
    enabled: !!userId,
  });

  // Handle side effects using useEffect instead of deprecated callbacks
  useEffect(() => {
    if (userId === 'me') {
      if (query.data) {
        setAnalytics(query.data);
        setAnalyticsError(null);
      }
      if (query.error) {
        setAnalyticsError(query.error.message);
      }
      setAnalyticsLoading(query.isLoading);
    }
  }, [userId, query.data, query.error, query.isLoading, setAnalytics, setAnalyticsError, setAnalyticsLoading]);

  return query;
}

// Mutations
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateProfile } = useProfileStore();
  // User context available via useAuthStore if needed
  
  return useMutation({
    mutationFn: (updates: Partial<ProfileData>) => updateUserProfile('me', updates),
    onMutate: async (updates) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.profile('me') });
      
      // Snapshot previous value
      const previousProfile = queryClient.getQueryData(queryKeys.profile('me'));
      
      // Optimistically update store
      updateProfile(updates);
      
      // Return rollback function
      return { previousProfile };
    },
    onError: (error, _updates, context) => {
      // Rollback optimistic update
      if (context?.previousProfile) {
        queryClient.setQueryData(queryKeys.profile('me'), context.previousProfile);
      }
      
      // Set error in store
      useProfileStore.getState().setProfileError(error.message);
    },
    onSuccess: (data: ProfileData) => {
      // Update cache with server response
      queryClient.setQueryData(queryKeys.profile('me'), data);
      
      // Update store with final server data
      useProfileStore.getState().setProfile(data);
      useProfileStore.getState().setProfileError(null);
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.profile('me') });
    },
  });
}

export function useUploadProfilePhoto() {
  const queryClient = useQueryClient();
  const { updateProfile } = useProfileStore();
  
  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (data: { avatarUrl: string }) => {
      // Update profile with new avatar URL
      updateProfile({ avatarUrl: data.avatarUrl });
      
      // Invalidate profile queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.profile('me') });
    },
    onError: (error: Error) => {
      useProfileStore.getState().setProfileError(error.message);
    },
  });
}

// Combined hook for all profile data
export function useProfileData(userId = 'me') {
  const profile = useUserProfile(userId);
  const spaces = useUserSpaceMemberships(userId);
  const analytics = useUserAnalytics(userId);
  
  return {
    profile,
    spaces,
    analytics,
    isLoading: profile.isLoading || spaces.isLoading || analytics.isLoading,
    isError: profile.isError || spaces.isError || analytics.isError,
    error: profile.error || spaces.error || analytics.error,
  };
}

// Real-time subscription hook (for Firebase integration)
export function useProfileSubscription(_userId = 'me') {
  // Real-time subscription placeholder
  // QueryClient and profile store setters would be used in full implementation
  
  // This would integrate with Firebase real-time listeners
  // For now, it's a placeholder that could be extended
  return {
    subscribe: () => {
      // Set up Firebase listeners here
      // Return cleanup function
      return () => {
        // Cleanup listeners
      };
    },
    unsubscribe: () => {
      // Manual unsubscribe if needed
    },
  };
}