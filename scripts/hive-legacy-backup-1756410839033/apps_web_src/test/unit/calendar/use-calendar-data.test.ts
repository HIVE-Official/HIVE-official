import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCalendarData } from '../../../hooks/use-calendar-data';
import type { CalendarCardData, CalendarCardState } from '@hive/ui';

// Mock calendar-api
vi.mock('../../../lib/calendar-api', () => ({
  fetchCalendarEvents: vi.fn(),
  transformApiEvent: vi.fn((apiEvent) => ({
    id: apiEvent.id,
    title: apiEvent.title,
    time: '2:00 PM',
    type: apiEvent.type || 'academic',
    location: apiEvent.location,
    attendees: apiEvent.attendees || [],
    isAllDay: false,
    hasReminder: false,
    metadata: apiEvent.metadata
  }))
}));

// Mock console methods
const consoleSpy = {
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('useCalendarData', () => {
  const mockApiEvents = [
    {
      id: 'event-1',
      title: 'CS Lecture',
      start: '2024-01-15T10:00:00Z',
      end: '2024-01-15T11:30:00Z',
      location: 'Room 101',
      type: 'academic',
      metadata: { courseCode: 'CS101' }
    },
    {
      id: 'event-2',
      title: 'Study Session',
      start: '2024-01-16T14:00:00Z',
      end: '2024-01-16T16:00:00Z',
      location: 'Library',
      type: 'social',
    },
    {
      id: 'event-3',
      title: 'Meeting',
      start: '2024-01-17T09:00:00Z',
      end: '2024-01-17T10:00:00Z',
      type: 'meeting',
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.warn.mockClear();
    consoleSpy.error.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Hook Initialization', () => {
    it('initializes with loading state', () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      expect(result.current.state).toBe('loading');
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });

    it('provides refetch function', () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      expect(typeof result.current.refetch).toBe('function');
    });

    it('fetches data automatically when autoFetch is true', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents, autoFetch: true })
      );

      await waitFor(() => {
        expect(mockFetchEvents).toHaveBeenCalled();
      });
    });

    it('does not fetch data when autoFetch is false', () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents, autoFetch: false })
      );

      expect(mockFetchEvents).not.toHaveBeenCalled();
    });
  });

  describe('Data Fetching', () => {
    it('processes successful data fetch', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeDefined();
      expect(result.current.data!.nextEvent).toBeDefined();
      expect(result.current.data!.upcomingEvents).toBeDefined();
      expect(result.current.data!.todaysEvents).toBeDefined();
      expect(result.current.error).toBeUndefined();
    });

    it('handles empty data response', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('empty');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });

    it('handles null data response', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(null);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('empty');
      });

      expect(result.current.data).toBeUndefined();
    });

    it('handles undefined data response', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(undefined);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('empty');
      });

      expect(result.current.data).toBeUndefined();
    });

    it('handles fetch errors', async () => {
      const mockFetchEvents = vi.fn().mockRejectedValue(new Error('Fetch failed'));
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('error');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBe('Fetch failed');
    });

    it('handles non-Error rejection', async () => {
      const mockFetchEvents = vi.fn().mockRejectedValue('String error');
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('error');
      });

      expect(result.current.error).toBe('Failed to fetch events');
    });
  });

  describe('Data Transformation', () => {
    it('sorts events by time for next event selection', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([
        { ...mockApiEvents[0], time: '4:00 PM' },
        { ...mockApiEvents[1], time: '2:00 PM' },
        { ...mockApiEvents[2], time: '10:00 AM' }
      ]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.nextEvent.id).toBe('event-3'); // 10:00 AM event
    });

    it('limits upcoming events to 5', async () => {
      const manyEvents = Array.from({ length: 10 }, (_, i) => ({
        ...mockApiEvents[0],
        id: `event-${i}`,
        title: `Event ${i}`
      }));
      
      const mockFetchEvents = vi.fn().mockResolvedValue(manyEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.upcomingEvents).toHaveLength(5);
    });

    it('includes all events in todaysEvents', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.todaysEvents).toHaveLength(mockApiEvents.length);
    });

    it('sets up default calendar connections', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      const connections = result.current.data!.connections;
      expect(connections).toHaveLength(2);
      expect(connections[0].type).toBe('google');
      expect(connections[0].status).toBe('disconnected');
      expect(connections[1].type).toBe('university');
      expect(connections[1].status).toBe('disconnected');
    });

    it('initializes empty conflicts array', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.conflicts).toEqual([]);
    });

    it('sets lastUpdated timestamp', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      const beforeTime = new Date();
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      const afterTime = new Date();
      const lastUpdated = result.current.data!.lastUpdated;
      
      expect(lastUpdated.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(lastUpdated.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });
  });

  describe('No Fetch Function Handling', () => {
    it('shows empty state when no fetchEvents provided', async () => {
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: undefined })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('empty');
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it('handles manual refetch with no fetchEvents', async () => {
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: undefined })
      );

      result.current.refetch();

      await waitFor(() => {
        expect(result.current.state).toBe('empty');
      });
    });
  });

  describe('Manual Refetch', () => {
    it('allows manual data refetch', async () => {
      const mockFetchEvents = vi.fn()
        .mockResolvedValueOnce([mockApiEvents[0]])
        .mockResolvedValueOnce(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.todaysEvents).toHaveLength(1);

      result.current.refetch();

      await waitFor(() => {
        expect(result.current.data!.todaysEvents).toHaveLength(3);
      });

      expect(mockFetchEvents).toHaveBeenCalledTimes(2);
    });

    it('handles refetch errors', async () => {
      const mockFetchEvents = vi.fn()
        .mockResolvedValueOnce(mockApiEvents)
        .mockRejectedValueOnce(new Error('Refetch failed'));
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      result.current.refetch();

      await waitFor(() => {
        expect(result.current.state).toBe('error');
      });

      expect(result.current.error).toBe('Refetch failed');
    });
  });

  describe('Time Conversion Utility', () => {
    beforeEach(() => {
      // Reset mocks to use real transformApiEvent for time testing
      vi.resetModules();
    });

    it('converts AM times correctly', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([
        { ...mockApiEvents[0], time: '9:30 AM' },
        { ...mockApiEvents[1], time: '11:45 AM' }
      ]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      // Events should be sorted by time
      expect(result.current.data!.nextEvent.time).toBe('9:30 AM');
    });

    it('converts PM times correctly', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([
        { ...mockApiEvents[0], time: '2:15 PM' },
        { ...mockApiEvents[1], time: '4:30 PM' }
      ]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.nextEvent.time).toBe('2:15 PM');
    });

    it('handles 12 AM and 12 PM correctly', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([
        { ...mockApiEvents[0], time: '12:00 AM' },
        { ...mockApiEvents[1], time: '12:00 PM' }
      ]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      // 12:00 AM should come before 12:00 PM
      expect(result.current.data!.nextEvent.time).toBe('12:00 AM');
    });

    it('handles invalid time formats gracefully', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([
        { ...mockApiEvents[0], time: 'invalid' },
        { ...mockApiEvents[1], time: '' },
        { ...mockApiEvents[2], time: '2:00 PM' }
      ]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      // Should still process events even with invalid times
      expect(result.current.data!.todaysEvents).toHaveLength(3);
    });
  });

  describe('Loading States', () => {
    it('manages loading state during fetch', async () => {
      let resolvePromise: (value: any) => void;
      const fetchPromise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      const mockFetchEvents = vi.fn().mockReturnValue(fetchPromise);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.state).toBe('loading');

      resolvePromise!(mockApiEvents);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.state).toBe('default');
    });

    it('clears error on successful refetch', async () => {
      const mockFetchEvents = vi.fn()
        .mockRejectedValueOnce(new Error('Initial error'))
        .mockResolvedValueOnce(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('error');
      });

      expect(result.current.error).toBe('Initial error');

      result.current.refetch();

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.error).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    it('handles events with missing time property', async () => {
      const eventsWithoutTime = mockApiEvents.map(event => ({ ...event, time: undefined }));
      const mockFetchEvents = vi.fn().mockResolvedValue(eventsWithoutTime);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.todaysEvents).toHaveLength(eventsWithoutTime.length);
    });

    it('handles single event response', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue([mockApiEvents[0]]);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data!.nextEvent).toEqual(expect.objectContaining({
        id: 'event-1',
        title: 'CS Lecture'
      }));
      expect(result.current.data!.upcomingEvents).toHaveLength(0);
      expect(result.current.data!.todaysEvents).toHaveLength(1);
    });

    it('maintains state consistency during rapid refetches', async () => {
      const mockFetchEvents = vi.fn().mockResolvedValue(mockApiEvents);
      
      const { result } = renderHook(() => 
        useCalendarData({ fetchEvents: mockFetchEvents })
      );

      // Trigger multiple rapid refetches
      result.current.refetch();
      result.current.refetch();
      result.current.refetch();

      await waitFor(() => {
        expect(result.current.state).toBe('default');
      });

      expect(result.current.data).toBeDefined();
    });
  });
});