import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCalendarIntegration, type CalendarEvent, type CalendarStats, type CalendarIntegration } from '../../../hooks/use-calendar-integration';
import React from 'react';

// Mock the useSession hook
vi.mock('../../../hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    user: {
      id: 'test-user-123',
      email: 'test@example.com',
    },
  })),
}));

// Mock fetch
global.fetch = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

// Mock console methods
const consoleSpy = {
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('useCalendarIntegration', () => {
  let queryClient: QueryClient;

  const mockEvents: CalendarEvent[] = [
    {
      id: 'event-1',
      title: 'CS Lecture',
      description: 'Data Structures',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T11:30:00Z',
      location: 'Room 101',
      type: 'class',
      spaceId: 'space-1',
      spaceName: 'CS 101',
      isPrivate: false,
      reminderMinutes: 15,
      metadata: {
        courseCode: 'CS101',
        professor: 'Dr. Smith',
        building: 'Science Building',
        roomNumber: '101',
      },
    },
    {
      id: 'event-2',
      title: 'Study Session',
      description: 'Group study for midterm',
      startTime: '2024-01-16T14:00:00Z',
      endTime: '2024-01-16T16:00:00Z',
      location: 'Library',
      type: 'study',
      isPrivate: false,
      reminderMinutes: 30,
    },
  ];

  const mockStats: CalendarStats = {
    totalEvents: 25,
    todayEvents: 3,
    weekEvents: 12,
    monthEvents: 25,
    studyHours: 18,
    classHours: 15,
    meetingHours: 6,
    freeHours: 45,
    busyScore: 68,
    productivityTrend: [
      { date: '2024-01-15', events: 4, studyTime: 3, productivity: 85 },
      { date: '2024-01-16', events: 6, studyTime: 2, productivity: 72 },
    ],
  };

  const mockIntegrations: CalendarIntegration[] = [
    {
      provider: 'hive',
      isConnected: true,
      lastSync: '2024-01-15T12:00:00Z',
      syncEnabled: true,
      calendars: [{ id: 'hive-main', name: 'HIVE Calendar', color: '#FFD700', isEnabled: true, isReadOnly: false }],
    },
    {
      provider: 'google',
      isConnected: false,
      syncEnabled: false,
      calendars: [],
    },
  ];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
          staleTime: 0,
        },
      },
    });

    vi.clearAllMocks();
    consoleSpy.warn.mockClear();
    consoleSpy.error.mockClear();

    // Mock successful API responses by default
    vi.mocked(fetch).mockImplementation((url) => {
      if (url.toString().includes('/api/calendar/events')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      }
      if (url.toString().includes('/api/calendar/stats')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ stats: mockStats }),
        } as Response);
      }
      if (url.toString().includes('/api/calendar/integrations')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ integrations: mockIntegrations }),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      token: 'test-token',
      userId: 'test-user-123',
    }));
  });

  afterEach(() => {
    queryClient.clear();
    vi.resetAllMocks();
  });

  const createWrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );

  describe('Hook Initialization', () => {
    it('initializes with default values', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      expect(result.current.events).toEqual([]);
      expect(result.current.stats).toBeUndefined();
      expect(result.current.integrations).toEqual([]);
      expect(result.current.isLoading).toBe(true);
    });

    it('fetches data when user is available', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.events).toEqual(mockEvents);
      expect(result.current.stats).toEqual(mockStats);
      expect(result.current.integrations).toEqual(mockIntegrations);
    });

    it('handles different time ranges', async () => {
      const { result } = renderHook(() => useCalendarIntegration('month'), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/calendar/events?'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });

  describe('API Integration', () => {
    it('makes correct API calls with authentication', async () => {
      renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/calendar/events'),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: 'Bearer test-token',
              'Content-Type': 'application/json',
            }),
            credentials: 'include',
          })
        );
      });
    });

    it('includes correct query parameters for time range', async () => {
      renderHook(() => useCalendarIntegration('week'), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/timeRange=week/),
          expect.any(Object)
        );
      });
    });

    it('handles API errors gracefully', async () => {
      vi.mocked(fetch).mockImplementation(() =>
        Promise.resolve({
          ok: false,
        } as Response)
      );

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should fall back to mock data when API fails
      expect(result.current.events).toBeDefined();
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        'Calendar API not available, using mock data:',
        expect.any(Error)
      );
    });

    it('uses development token in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: 'Bearer test-token',
            }),
          })
        );
      });

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Event Management', () => {
    it('creates new events', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (options?.method === 'POST') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ event: { id: 'new-event', ...JSON.parse(options.body as string) } }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const eventData = {
        title: 'New Event',
        startTime: '2024-01-20T10:00:00Z',
        endTime: '2024-01-20T11:00:00Z',
        type: 'meeting' as const,
        isPrivate: false,
      };

      await result.current.createEvent(eventData);

      expect(fetch).toHaveBeenCalledWith(
        '/api/calendar/events',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(eventData),
        })
      );
    });

    it('updates existing events', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (options?.method === 'PATCH') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ event: { id: 'event-1', title: 'Updated Event' } }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const updates = { title: 'Updated Event' };
      await result.current.updateEvent({ id: 'event-1', updates });

      expect(fetch).toHaveBeenCalledWith(
        '/api/calendar/events/event-1',
        expect.objectContaining({
          method: 'PATCH',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(updates),
        })
      );
    });

    it('deletes events', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (options?.method === 'DELETE') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.deleteEvent('event-1');

      expect(fetch).toHaveBeenCalledWith(
        '/api/calendar/events/event-1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('handles event management errors', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (options?.method === 'POST') {
          return Promise.resolve({
            ok: false,
            status: 400,
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const eventData = {
        title: 'New Event',
        startTime: '2024-01-20T10:00:00Z',
        endTime: '2024-01-20T11:00:00Z',
        type: 'meeting' as const,
        isPrivate: false,
      };

      await expect(result.current.createEvent(eventData)).rejects.toThrow('Failed to create event: 400');
    });
  });

  describe('Integration Management', () => {
    it('connects calendar integrations', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (url.toString().includes('/connect') && options?.method === 'POST') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ integrations: mockIntegrations }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.connectIntegration('google');

      expect(fetch).toHaveBeenCalledWith(
        '/api/calendar/integrations/connect',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ provider: 'google' }),
        })
      );
    });

    it('handles integration connection errors', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (url.toString().includes('/connect') && options?.method === 'POST') {
          return Promise.resolve({
            ok: false,
            status: 401,
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ integrations: mockIntegrations }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(result.current.connectIntegration('google')).rejects.toThrow('Failed to connect google: 401');
    });
  });

  describe('Utility Functions', () => {
    it('gets today events correctly', async () => {
      // Mock events with today's date
      const todayEvents = [
        {
          ...mockEvents[0],
          startTime: new Date().toISOString(),
        },
      ];

      vi.mocked(fetch).mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: todayEvents }),
        } as Response)
      );

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const todayEventsResult = result.current.getTodayEvents();
      expect(todayEventsResult).toHaveLength(1);
    });

    it('gets upcoming events with correct limit', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const upcomingEvents = result.current.getUpcomingEvents(3);
      expect(upcomingEvents).toHaveLength(Math.min(3, mockEvents.length));
    });

    it('filters events by type', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const classEvents = result.current.getEventsByType('class');
      expect(classEvents).toHaveLength(1);
      expect(classEvents[0].type).toBe('class');

      const studyEvents = result.current.getEventsByType('study');
      expect(studyEvents).toHaveLength(1);
      expect(studyEvents[0].type).toBe('study');
    });

    it('refreshes all queries', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Clear previous calls
      vi.mocked(fetch).mockClear();

      result.current.refreshAll();

      // Should trigger refetch
      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });
  });

  describe('Loading States', () => {
    it('provides individual loading states', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      // Initially loading
      expect(result.current.isLoadingEvents).toBe(true);
      expect(result.current.isLoadingStats).toBe(true);
      expect(result.current.isLoadingIntegrations).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLoadingEvents).toBe(false);
      expect(result.current.isLoadingStats).toBe(false);
      expect(result.current.isLoadingIntegrations).toBe(false);
    });

    it('provides mutation loading states', async () => {
      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isCreating).toBe(false);
      expect(result.current.isUpdating).toBe(false);
      expect(result.current.isDeleting).toBe(false);
      expect(result.current.isConnecting).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('provides individual error states', async () => {
      vi.mocked(fetch).mockImplementation((url) => {
        if (url.toString().includes('/events')) {
          return Promise.reject(new Error('Events API error'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.hasError).toBe(true);
      });

      expect(result.current.eventsError).toBeDefined();
    });

    it('handles localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(consoleSpy.warn).toHaveBeenCalledWith('Failed to get stored token:', expect.any(Error));
    });
  });

  describe('Server-Side Rendering', () => {
    it('handles SSR environment gracefully', async () => {
      const originalWindow = global.window;
      // @ts-expect-error - Temporarily removing window for SSR testing
      delete global.window;

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      expect(result.current.events).toEqual([]);

      global.window = originalWindow;
    });
  });

  describe('Date Range Calculations', () => {
    it('calculates correct date ranges for different time ranges', async () => {
      // Test day range
      renderHook(() => useCalendarIntegration('day'), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/timeRange=day/),
          expect.any(Object)
        );
      });

      vi.mocked(fetch).mockClear();

      // Test month range
      renderHook(() => useCalendarIntegration('month'), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(/timeRange=month/),
          expect.any(Object)
        );
      });
    });
  });

  describe('Query Invalidation', () => {
    it('invalidates queries after successful mutations', async () => {
      vi.mocked(fetch).mockImplementation((url, options) => {
        if (options?.method === 'POST') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ event: { id: 'new-event' } }),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ events: mockEvents }),
        } as Response);
      });

      const { result } = renderHook(() => useCalendarIntegration(), {
        wrapper: createWrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Clear previous calls
      vi.mocked(fetch).mockClear();

      const eventData = {
        title: 'New Event',
        startTime: '2024-01-20T10:00:00Z',
        endTime: '2024-01-20T11:00:00Z',
        type: 'meeting' as const,
        isPrivate: false,
      };

      await result.current.createEvent(eventData);

      // Should refetch data after successful creation
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/calendar/events'),
          expect.objectContaining({ method: undefined })
        );
      });
    });
  });
});