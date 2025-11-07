'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { RitualFeedBanner } from '@hive/core';

const RITUAL_POLL_INTERVAL = 30000; // 30 seconds
const RITUAL_STALE_TIME = 60000; // 1 minute

interface UseActiveRitualsOptions {
  enabled?: boolean;
  pollInterval?: number;
  archetype?: string;
}

interface UseActiveRitualsResult {
  rituals: RitualFeedBanner[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

/**
 * Hook for real-time polling of active rituals
 * Fetches active rituals every 30 seconds to keep banner data fresh
 *
 * @example
 * ```tsx
 * const { rituals, isLoading, error } = useActiveRituals();
 *
 * if (rituals.length > 0) {
 *   return <RitualFeedBanner banner={rituals[0]} />;
 * }
 * ```
 */
export function useActiveRituals(
  options: UseActiveRitualsOptions = {},
): UseActiveRitualsResult {
  const { enabled = true, pollInterval = RITUAL_POLL_INTERVAL, archetype } = options;

  const [rituals, setRituals] = useState<RitualFeedBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRituals = useCallback(async () => {
    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const params = new URLSearchParams({
        activeOnly: 'true',
        format: 'banner',
      });

      if (archetype) {
        params.append('archetype', archetype);
      }

      const response = await fetch(`/api/rituals?${params.toString()}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch rituals: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const fetchedRituals = data.data || [];

      setRituals(fetchedRituals);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
        console.error('[useActiveRituals] Fetch error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [archetype]);

  // Initial fetch
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    void fetchRituals();
  }, [enabled, fetchRituals]);

  // Polling interval
  useEffect(() => {
    if (!enabled || pollInterval <= 0) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(() => {
      void fetchRituals();
    }, pollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, pollInterval, fetchRituals]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await fetchRituals();
  }, [fetchRituals]);

  return {
    rituals,
    isLoading,
    error,
    refetch,
    lastUpdated,
  };
}

/**
 * Hook for fetching a specific ritual by ID with optional polling
 *
 * @example
 * ```tsx
 * const { ritual, isLoading } = useRitual('ritual-id');
 * ```
 */
export function useRitual(
  ritualId: string | null,
  options: { enabled?: boolean; pollInterval?: number } = {},
) {
  const { enabled = true, pollInterval = 0 } = options;

  const [ritual, setRitual] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRitual = useCallback(async () => {
    if (!ritualId) {
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`/api/rituals/${ritualId}?format=detail`, {
        signal: controller.signal,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ritual: ${response.status}`);
      }

      const data = await response.json();
      setRitual(data.data);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
        console.error('[useRitual] Fetch error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [ritualId]);

  useEffect(() => {
    if (!enabled || !ritualId) {
      setIsLoading(false);
      return;
    }

    void fetchRitual();
  }, [enabled, ritualId, fetchRitual]);

  useEffect(() => {
    if (!enabled || pollInterval <= 0 || !ritualId) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      void fetchRitual();
    }, pollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, pollInterval, ritualId, fetchRitual]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    ritual,
    isLoading,
    error,
    refetch: fetchRitual,
  };
}
