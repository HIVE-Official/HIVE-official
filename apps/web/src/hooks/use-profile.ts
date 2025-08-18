import { useState, useCallback } from 'react';
import { profileAPI, ProfileUpdateData } from '../lib/profile-api';

interface UseProfileReturn {
  isLoading: boolean;
  error: string | null;
  uploadPhoto: (_file: File) => Promise<string | null>;
  updateProfile: (data: ProfileUpdateData) => Promise<boolean>;
  clearError: () => void;
}

export function useProfile(): UseProfileReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadPhoto = useCallback(async (file: File): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await profileAPI.uploadPhoto(file);
      return result.avatarUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload photo';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: ProfileUpdateData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await profileAPI.updateProfile(data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    uploadPhoto,
    updateProfile,
    clearError,
  };
}