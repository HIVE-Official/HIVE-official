'use client';

import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

import useSWR from 'swr';

interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  status: string;
  startTime?: Date;
  endTime?: Date;
  participantCount?: number;
  progress?: number;
  nextOccurrence?: Date;
  frequency?: string;
}

interface RitualParticipation {
  ritualId: string;
  progress: number;
  completedActions: string[];
  milestonesReached: string[];
  status: 'active' | 'completed' | 'abandoned';
  score: number;
  rank?: number;
  rewards: string[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  
  return res.json();
};

/**
 * Hook for fetching and managing rituals
 */
export function useRituals(status?: string) {
  const { data, error, isLoading, mutate } = useSWR<{ rituals: Ritual[] }>(
    `/api/rituals${status ? `?status=${status}` : ''}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every minute
    }
  );

  return {
    rituals: data?.rituals || [],
    isLoading,
    error,
    refresh: mutate
  };
}

/**
 * Hook for fetching upcoming rituals for current user
 */
export function useUpcomingRituals() {
  const { data, error, isLoading, mutate } = useSWR<{ rituals: Ritual[] }>(
    '/api/rituals/upcoming',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  return {
    upcomingRituals: data?.rituals || [],
    isLoading,
    error,
    refresh: mutate
  };
}

/**
 * Hook for managing ritual participation
 */
export function useRitualParticipation(ritualId: string) {
  const [isJoining, setIsJoining] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Fetch participation data
  const { data, error, isLoading, mutate } = useSWR<RitualParticipation>(
    ritualId ? `/api/rituals/${ritualId}/participation` : null,
    fetcher
  );

  // Join ritual
  const joinRitual = useCallback(async () => {
    if (!ritualId || isJoining) return;

    setIsJoining(true);
    try {
      const response = await fetch(`/api/rituals/${ritualId}/join`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        await mutate(); // Refresh participation data
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to join ritual:', { error: String(error) });
      return false;
    } finally {
      setIsJoining(false);
    }
  }, [ritualId, isJoining, mutate]);

  // Track action
  const trackAction = useCallback(async (actionType: string, actionData?: any) => {
    if (!ritualId || isTracking) return;

    setIsTracking(true);
    try {
      const response = await fetch(`/api/rituals/${ritualId}/track`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actionType, actionData })
      });

      if (response.ok) {
        await mutate(); // Refresh participation data
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to track action:', { error: String(error) });
      return false;
    } finally {
      setIsTracking(false);
    }
  }, [ritualId, isTracking, mutate]);

  return {
    participation: data,
    isLoading,
    error,
    isJoining,
    isTracking,
    joinRitual,
    trackAction,
    refresh: mutate
  };
}

/**
 * Hook for ritual countdown timer
 */
export function useRitualCountdown(targetDate?: Date | string) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

/**
 * Hook for ritual leaderboard
 */
export function useRitualLeaderboard(ritualId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    leaderboard: Array<{
      userId: string;
      userName: string;
      score: number;
      rank: number;
      progress: number;
    }>;
  }>(
    ritualId ? `/api/rituals/${ritualId}/leaderboard` : null,
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds for live updates
    }
  );

  return {
    leaderboard: data?.leaderboard || [],
    isLoading,
    error,
    refresh: mutate
  };
}