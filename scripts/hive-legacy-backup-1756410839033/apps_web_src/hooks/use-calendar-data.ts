import { useState, useEffect, useCallback } from 'react';
import type { CalendarCardData, CalendarCardState } from '@hive/ui';
import { fetchCalendarEvents, transformApiEvent } from '../lib/calendar-api';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  [key: string]: unknown;
}

interface UseCalendarDataOptions {
  fetchEvents?: () => Promise<CalendarEvent[]>;
  autoFetch?: boolean;
}

interface UseCalendarDataResult {
  data: CalendarCardData | undefined;
  state: CalendarCardState;
  refetch: () => void;
  isLoading: boolean;
  error: string | undefined;
}

/**
 * Hook for managing calendar data in HIVE dashboard
 * Provides mock data by default, but can be configured to fetch real data
 */
/**
 * Convert time string like "2:00 PM" to minutes since midnight
 */
const convertTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  
  const [time, period] = timeStr.split(' ');
  if (!time || !period) return 0;
  
  const [hours, minutes] = time.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  
  let totalMinutes = minutes;
  
  if (period === 'AM') {
    totalMinutes += hours === 12 ? 0 : hours * 60;
  } else if (period === 'PM') {
    totalMinutes += hours === 12 ? 12 * 60 : (hours + 12) * 60;
  }
  
  return totalMinutes;
};

export const useCalendarData = (options: UseCalendarDataOptions = {}): UseCalendarDataResult => {
  const { fetchEvents = fetchCalendarEvents, autoFetch = true } = options;
  const [data, setData] = useState<CalendarCardData | undefined>();
  const [state, setState] = useState<CalendarCardState>('loading');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const refetch = useCallback(async () => {
    if (!fetchEvents) {
      // No data source - show empty state
      setData(undefined);
      setState('empty');
      return;
    }

    setIsLoading(true);
    setState('loading');
    setError(undefined);

    try {
      const apiEvents = await fetchEvents();
      
      if (!apiEvents || apiEvents.length === 0) {
        setState('empty');
        setData(undefined);
      } else {
        // Transform API events to UI Event format
        const events = apiEvents.map(transformApiEvent);
        
        // Sort events by time to get the next upcoming event
        const sortedEvents = events.sort((a, b) => {
          const timeA = convertTimeToMinutes(a.time || '');
          const timeB = convertTimeToMinutes(b.time || '');
          return timeA - timeB;
        });

        const transformedData: CalendarCardData = {
          nextEvent: sortedEvents[0],
          upcomingEvents: sortedEvents.slice(1, 6), // Limit to 5 upcoming events
          todaysEvents: sortedEvents,
          connections: [
            {
              id: 'google',
              name: 'Google',
              type: 'google',
              status: 'disconnected', // Default to disconnected until user connects
              color: '#4285f4'
            },
            {
              id: 'university',
              name: 'University',
              type: 'university',
              status: 'disconnected', // Default to disconnected until user connects
              color: '#ffd700'
            }
          ],
          conflicts: [], // TODO: Implement conflict detection
          lastUpdated: new Date()
        };
        
        setData(transformedData);
        setState('default');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
      setState('error');
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  useEffect(() => {
    refetch();
  }, [refetch, autoFetch]);

  return {
    data,
    state,
    refetch,
    isLoading,
    error
  };
};

export default useCalendarData;