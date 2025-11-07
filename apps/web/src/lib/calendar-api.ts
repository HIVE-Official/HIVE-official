// Event type is defined locally in this file

/**
 * Calendar API integration utilities
 * These functions will handle real calendar data when backend is ready
 */

export interface CalendarApiEvent {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string;   // ISO date string
  location?: string;
  description?: string;
  attendees?: string[];
  type?: 'academic' | 'social' | 'meeting' | 'milestone' | 'deadline';
  metadata?: any;
}

/**
 * Fetch events from the calendar API
 * Currently returns empty array - replace with real API call
 */
export const fetchCalendarEvents = async (): Promise<CalendarApiEvent[]> => {
  try {
    const { secureApiFetch } = await import('./secure-auth-utils');
    const response = await secureApiFetch('/api/calendar');
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    logger.error('Failed to fetch calendar events', error as Error, { component: 'calendar-api', action: 'fetch_events' });
    return [];
  }
};

/**
 * Create a new calendar event
 */
export const createCalendarEvent = async (event: Omit<CalendarApiEvent, 'id'>): Promise<CalendarApiEvent> => {
  try {
    const { secureApiFetch } = await import('./secure-auth-utils');
    const response = await secureApiFetch('/api/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to create event' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    logger.error('Failed to create calendar event', error as Error, { component: 'calendar-api', action: 'create_event' });
    throw error;
  }
};

/**
 * Update an existing calendar event
 */
export const updateCalendarEvent = async (id: string, event: Partial<CalendarApiEvent>): Promise<CalendarApiEvent> => {
  try {
    const { secureApiFetch } = await import('./secure-auth-utils');
    const response = await secureApiFetch(`/api/calendar/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to update event' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    logger.error('Failed to update calendar event', error as Error, { component: 'calendar-api', action: 'update_event', id });
    throw error;
  }
};

/**
 * Delete a calendar event
 */
export const deleteCalendarEvent = async (id: string): Promise<void> => {
  try {
    const { secureApiFetch } = await import('./secure-auth-utils');
    const response = await secureApiFetch(`/api/calendar/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to delete event' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    logger.error('Failed to delete calendar event', error as Error, { component: 'calendar-api', action: 'delete_event', id });
    throw error;
  }
};

// UI Event interface for HIVE calendar components
export interface Event {
  id: string;
  title: string;
  time: string;
  type: 'academic' | 'social' | 'meeting' | 'milestone' | 'deadline';
  location?: string;
  attendees: string[];
  isAllDay: boolean;
  hasReminder: boolean;
  metadata?: any;
}

/**
 * Convert API event format to HIVE UI Event format
 */
export const transformApiEvent = (apiEvent: CalendarApiEvent): Event => {
  const startDate = new Date(apiEvent.start);
  const endDate = new Date(apiEvent.end);
  
  return {
    id: apiEvent.id,
    title: apiEvent.title,
    time: formatTime(startDate),
    type: apiEvent.type || 'academic',
    location: apiEvent.location,
    attendees: apiEvent.attendees || [],
    isAllDay: isAllDayEvent(startDate, endDate),
    hasReminder: apiEvent.metadata?.hasReminder || false,
    metadata: apiEvent.metadata
  };
};

/**
 * Format time for display (e.g., "2:30 PM")
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Check if event is all day
 */
const isAllDayEvent = (start: Date, end: Date): boolean => {
  const diffInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return diffInHours >= 24 || (start.getHours() === 0 && start.getMinutes() === 0 && end.getHours() === 23 && end.getMinutes() === 59);
};

/**
 * Connect to external calendar service (Google, Outlook, etc.)
 */
export const connectCalendarService = async (type: 'google' | 'outlook'): Promise<{ success: boolean; redirectUrl?: string }> => {
  try {
    const response = await fetch(`/api/calendar/connect/${type}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to connect ${type} calendar`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(`Failed to connect ${type} calendar`, error as Error, { component: 'calendar-api', action: 'connect_calendar', type });
    // Return not implemented for now - can be implemented when OAuth flow is ready
    return { success: false, redirectUrl: '' };
  }
};

/**
 * Sync calendar with external service
 */
export const syncCalendarService = async (connectionId: string): Promise<{ success: boolean; lastSync: Date }> => {
  try {
    const response = await fetch(`/api/calendar/sync/${connectionId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync calendar');
    }
    
    const data = await response.json();
    return {
      success: data.success || false,
      lastSync: new Date(data.lastSync || Date.now())
    };
  } catch (error) {
    logger.error('Failed to sync calendar', error as Error, { component: 'calendar-api', action: 'sync_calendar', connectionId });
    // Return not implemented for now - can be implemented when sync API is ready
    return { success: false, lastSync: new Date() };
  }
};
import { logger } from './structured-logger';
