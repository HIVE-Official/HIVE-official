import { useState, useEffect, useCallback } from 'react';
import { logger } from '@hive/core';

interface HandleAvailabilityResult {
  available: boolean | null;
  message: string;
  isChecking: boolean;
  error: string | null;
  suggestions: string[];
}

export function useHandleAvailability(handle: string, debounceMs: number = 500) {
  const [result, setResult] = useState<HandleAvailabilityResult>({
    available: null,
    message: '',
    isChecking: false,
    error: null,
    suggestions: [],
  });

  const checkAvailability = useCallback(async (handleToCheck: string) => {
    if (!handleToCheck || handleToCheck.length < 3) {
      setResult({
        available: null,
        message: '',
        isChecking: false,
        error: null,
        suggestions: [],
      });
      return;
    }

    // Validate handle format client-side first
    const handleRegex = /^[a-z0-9_]{3,20}$/;
    if (!handleRegex.test(handleToCheck)) {
      setResult({
        available: false,
        message: 'Handle must be 3-20 characters, lowercase letters, numbers, and underscores only',
        isChecking: false,
        error: null,
        suggestions: [],
      });
      return;
    }

    setResult(prev => ({ ...prev, isChecking: true, error: null }));

    try {
      const response = await fetch('/api/profile/check-handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle: handleToCheck }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before checking another handle.');
        }
        throw new Error('Failed to check handle availability');
      }

      const data = await response.json();
      
      setResult({
        available: data.available,
        message: data.message,
        isChecking: false,
        error: null,
        suggestions: data.suggestions || [],
      });

    } catch (error) {
      logger.error('Handle availability check failed', { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setResult({
        available: null,
        message: '',
        isChecking: false,
        error: error instanceof Error ? error.message : 'Failed to check handle availability',
        suggestions: [],
      });
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (handle.trim()) {
        void checkAvailability(handle.trim());
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [handle, debounceMs, checkAvailability]);

  return result;
} 