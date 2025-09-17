import { useState, useCallback } from 'react';
import { profileAPI, PrivacySettings } from '@/lib/profile-api';

interface UsePrivacySettingsReturn {
  isLoading: boolean;
  error: string | null;
  updatePrivacySettings: (_settings: Partial<PrivacySettings>) => Promise<boolean>;
  togglePublicProfile: (_isPublic: boolean) => Promise<boolean>;
  clearError: () => void;
}

export function usePrivacySettings(): UsePrivacySettingsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updatePrivacySettings = useCallback(async (settings: Partial<PrivacySettings>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      await profileAPI.updatePrivacySettings(settings);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update privacy settings';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const togglePublicProfile = useCallback(async (isPublic: boolean): Promise<boolean> => {
    return updatePrivacySettings({ isPublic });
  }, [updatePrivacySettings]);

  return {
    isLoading,
    error,
    updatePrivacySettings,
    togglePublicProfile,
    clearError,
  };
}