"use client";

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from './use-session';

// Calendar event interfaces
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  type: 'class' | 'study' | 'meeting' | 'event' | 'deadline' | 'personal';
  spaceId?: string;
  spaceName?: string;
  attendees?: string[];
  isPrivate: boolean;
  reminderMinutes?: number;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  metadata?: {
    courseCode?: string;
    professor?: string;
    building?: string;
    roomNumber?: string;
    zoomLink?: string;
    assignments?: string[];
  };
}

export interface CalendarStats {
  totalEvents: number;
  todayEvents: number;
  weekEvents: number;
  monthEvents: number;
  studyHours: number;
  classHours: number;
  meetingHours: number;
  freeHours: number;
  busyScore: number; // 0-100 scale
  productivityTrend: Array<{
    date: string;
    events: number;
    studyTime: number;
    productivity: number;
  }>;
}

export interface CalendarIntegration {
  provider: 'google' | 'outlook' | 'apple' | 'hive';
  isConnected: boolean;
  lastSync?: string;
  syncEnabled: boolean;
  calendars: Array<{
    id: string;
    name: string;
    color: string;
    isEnabled: boolean;
    isReadOnly: boolean;
  }>;
}

// Calendar API functions
async function fetchCalendarEvents(timeRange: 'day' | 'week' | 'month' = 'week'): Promise<CalendarEvent[]> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  // Calculate date range
  const now = new Date();
  const startDate = new Date(now);
  const endDate = new Date(now);

  switch (timeRange) {
    case 'day':
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'week':
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'month':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  const searchParams = new URLSearchParams({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    timeRange
  });

  try {
    const response = await fetch(`/api/calendar/events?${searchParams}`, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      // Return mock data if API not available
      return getMockCalendarEvents(timeRange);
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.warn('Calendar API not available, using mock data:', error);
    return getMockCalendarEvents(timeRange);
  }
}

async function fetchCalendarStats(): Promise<CalendarStats> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  try {
    const response = await fetch('/api/calendar/stats', {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      return getMockCalendarStats();
    }

    const data = await response.json();
    return data.stats || getMockCalendarStats();
  } catch (error) {
    console.warn('Calendar stats API not available, using mock data:', error);
    return getMockCalendarStats();
  }
}

async function fetchCalendarIntegrations(): Promise<CalendarIntegration[]> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  try {
    const response = await fetch('/api/calendar/integrations', {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      return getMockCalendarIntegrations();
    }

    const data = await response.json();
    return data.integrations || [];
  } catch (error) {
    console.warn('Calendar integrations API not available, using mock data:', error);
    return getMockCalendarIntegrations();
  }
}

// Mock data functions
function getMockCalendarEvents(timeRange: string): CalendarEvent[] {
  const now = new Date();
  const events: CalendarEvent[] = [];

  // Generate mock events based on time range
  const eventCount = timeRange === 'day' ? 3 : timeRange === 'week' ? 12 : 25;

  for (let i = 0; i < eventCount; i++) {
    const startTime = new Date(now);
    startTime.setDate(now.getDate() + Math.floor(Math.random() * (timeRange === 'day' ? 1 : timeRange === 'week' ? 7 : 30)));
    startTime.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));
    
    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 60 + Math.floor(Math.random() * 120));

    const eventTypes: CalendarEvent['type'][] = ['class', 'study', 'meeting', 'event', 'deadline'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    events.push({
      id: `event-${i}`,
      title: getEventTitle(type, i),
      description: `Mock ${type} event for testing`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      location: type === 'class' ? `Room ${100 + i}` : undefined,
      type,
      spaceId: type === 'class' ? `space-${i % 3}` : undefined,
      spaceName: type === 'class' ? `Course ${i % 3}` : undefined,
      isPrivate: Math.random() > 0.7,
      reminderMinutes: 15,
      metadata: type === 'class' ? {
        courseCode: `CS${300 + i}`,
        professor: `Prof. Smith`,
        building: 'Science Building',
        roomNumber: `${100 + i}`
      } : undefined
    });
  }

  return events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

function getEventTitle(type: CalendarEvent['type'], index: number): string {
  switch (type) {
    case 'class':
      return `CS${300 + index} Lecture`;
    case 'study':
      return `Study Session - ${['Math', 'Physics', 'Chemistry'][index % 3]}`;
    case 'meeting':
      return `${['Team', 'Project', 'Study Group'][index % 3]} Meeting`;
    case 'event':
      return `${['Campus', 'Club', 'Social'][index % 3]} Event`;
    case 'deadline':
      return `${['Assignment', 'Project', 'Essay'][index % 3]} Due`;
    default:
      return `Event ${index}`;
  }
}

function getMockCalendarStats(): CalendarStats {
  return {
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
      { date: '2024-01-17', events: 3, studyTime: 4, productivity: 90 },
      { date: '2024-01-18', events: 5, studyTime: 3, productivity: 78 },
      { date: '2024-01-19', events: 4, studyTime: 3, productivity: 82 },
      { date: '2024-01-20', events: 2, studyTime: 1, productivity: 65 },
      { date: '2024-01-21', events: 3, studyTime: 2, productivity: 75 }
    ]
  };
}

function getMockCalendarIntegrations(): CalendarIntegration[] {
  return [
    {
      provider: 'hive',
      isConnected: true,
      lastSync: new Date().toISOString(),
      syncEnabled: true,
      calendars: [
        { id: 'hive-main', name: 'HIVE Calendar', color: 'var(--hive-brand-primary)', isEnabled: true, isReadOnly: false }
      ]
    },
    {
      provider: 'google',
      isConnected: false,
      syncEnabled: false,
      calendars: []
    },
    {
      provider: 'outlook',
      isConnected: false,
      syncEnabled: false,
      calendars: []
    }
  ];
}

// Helper functions
function getStoredToken(): string {
  if (typeof window === 'undefined') return 'test-token';
  
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      return session.token || 'test-token';
    }
  } catch (error) {
    console.warn('Failed to get stored token:', error);
  }
  
  return 'test-token';
}

// Main hook
export function useCalendarIntegration(timeRange: 'day' | 'week' | 'month' = 'week') {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Events query
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
    refetch: refetchEvents
  } = useQuery<CalendarEvent[]>({
    queryKey: ['calendar-events', timeRange],
    queryFn: () => fetchCalendarEvents(timeRange),
    staleTime: 60000, // 1 minute
    enabled: !!user && isClient
  });

  // Stats query
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError
  } = useQuery<CalendarStats>({
    queryKey: ['calendar-stats'],
    queryFn: fetchCalendarStats,
    staleTime: 300000, // 5 minutes
    enabled: !!user && isClient
  });

  // Integrations query
  const {
    data: integrations,
    isLoading: integrationsLoading,
    error: integrationsError
  } = useQuery<CalendarIntegration[]>({
    queryKey: ['calendar-integrations'],
    queryFn: fetchCalendarIntegrations,
    staleTime: 600000, // 10 minutes
    enabled: !!user && isClient
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: Partial<CalendarEvent>) => {
      const authHeader = process.env.NODE_ENV === 'development' 
        ? 'Bearer test-token' 
        : `Bearer ${getStoredToken()}`;

      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
    }
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CalendarEvent> }) => {
      const authHeader = process.env.NODE_ENV === 'development' 
        ? 'Bearer test-token' 
        : `Bearer ${getStoredToken()}`;

      const response = await fetch(`/api/calendar/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to update event: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
    }
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const authHeader = process.env.NODE_ENV === 'development' 
        ? 'Bearer test-token' 
        : `Bearer ${getStoredToken()}`;

      const response = await fetch(`/api/calendar/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
    }
  });

  // Connect integration mutation
  const connectIntegrationMutation = useMutation({
    mutationFn: async (provider: CalendarIntegration['provider']) => {
      const authHeader = process.env.NODE_ENV === 'development' 
        ? 'Bearer test-token' 
        : `Bearer ${getStoredToken()}`;

      const response = await fetch('/api/calendar/integrations/connect', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ provider }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to connect ${provider}: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
    }
  });

  // Utility functions
  const getTodayEvents = useCallback(() => {
    if (!events) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= today && eventDate < tomorrow;
    });
  }, [events]);

  const getUpcomingEvents = useCallback((count = 5) => {
    if (!events) return [];
    const now = new Date();
    
    return events
      .filter(event => new Date(event.startTime) > now)
      .slice(0, count);
  }, [events]);

  const getEventsByType = useCallback((type: CalendarEvent['type']) => {
    if (!events) return [];
    return events.filter(event => event.type === type);
  }, [events]);

  const isLoading = eventsLoading || statsLoading || integrationsLoading;
  const hasError = eventsError || statsError || integrationsError;

  return {
    // Data
    events: events || [],
    stats,
    integrations: integrations || [],
    
    // Loading states
    isLoading,
    isLoadingEvents: eventsLoading,
    isLoadingStats: statsLoading,
    isLoadingIntegrations: integrationsLoading,
    
    // Error states
    hasError,
    eventsError,
    statsError,
    integrationsError,
    
    // Actions
    createEvent: createEventMutation.mutateAsync,
    updateEvent: updateEventMutation.mutateAsync,
    deleteEvent: deleteEventMutation.mutateAsync,
    connectIntegration: connectIntegrationMutation.mutateAsync,
    
    // Mutation states
    isCreating: createEventMutation.isPending,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
    isConnecting: connectIntegrationMutation.isPending,
    
    // Utilities
    getTodayEvents,
    getUpcomingEvents,
    getEventsByType,
    refetchEvents,
    
    refreshAll: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
    }
  };
}

export default useCalendarIntegration;
