"use client";

import { useState } from 'react';
import { useAuth } from '@hive/auth-logic';

interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  isPublic?: boolean;
  builderOptIn?: boolean;
  builderAnalyticsEnabled?: boolean;
}

interface UseProfileReturn {
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  uploadPhoto: (file: File) => Promise<string | null>;
  isUpdating: boolean;
  error: string | null;
  clearError: () => void;
}

export function useProfile(): UseProfileReturn {
  const { user, refreshUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      // Refresh user data to get updated profile
      await refreshUser();
      return true;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      
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

      const result = await response.json();
      
      // Refresh user data to get updated avatar URL
      await refreshUser();
      return result.avatarUrl;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload photo';
      setError(message);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProfile,
    uploadPhoto,
    isUpdating,
    error,
    clearError,
  };
}