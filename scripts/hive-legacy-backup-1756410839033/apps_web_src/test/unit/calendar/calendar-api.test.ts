import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  transformApiEvent,
  connectCalendarService,
  syncCalendarService,
  type CalendarApiEvent
} from '../../../lib/calendar-api';
import type { Event } from '@hive/ui';

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

// Mock global fetch - properly mock Response interface
const mockFetch = vi.fn();

describe('calendar-api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.log.mockClear();
    consoleSpy.error.mockClear();
    
    // Setup fetch mock to return proper Response for different request types
    mockFetch.mockImplementation((url, options = {}) => {
      const method = options.method || 'GET';
      
      if (method === 'GET' && url.includes('/api/calendar')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({ events: [] }),
        });
      }
      
      if (method === 'POST' && url.includes('/api/calendar')) {
        return Promise.resolve({
          ok: true,
          status: 201,
          json: vi.fn().mockResolvedValue({ 
            id: 'mock-event-id',
            ...JSON.parse(options.body || '{}')
          }),
        });
      }
      
      if ((method === 'PUT' || method === 'PATCH') && url.includes('/api/calendar')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({ 
            id: 'mock-event-id', 
            ...JSON.parse(options.body || '{}')
          }),
        });
      }
      
      if (method === 'DELETE' && url.includes('/api/calendar')) {
        return Promise.resolve({
          ok: true,
          status: 204,
          json: vi.fn().mockResolvedValue({}),
        });
      }
      
      // Default response
      return Promise.resolve({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({}),
      });
    });
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchCalendarEvents', () => {
    it('returns empty array as placeholder', async () => {
      const events = await fetchCalendarEvents();
      expect(events).toEqual([]);
    });

    it('makes API call to calendar endpoint', async () => {
      await fetchCalendarEvents();
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar');
    });

    it('is consistent across multiple calls', async () => {
      const events1 = await fetchCalendarEvents();
      const events2 = await fetchCalendarEvents();
      
      expect(events1).toEqual(events2);
      expect(events1).toEqual([]);
    });
  });

  describe('createCalendarEvent', () => {
    const mockEventData: Omit<CalendarApiEvent, 'id'> = {
      title: 'Test Event',
      start: '2024-01-15T10:00:00Z',
      end: '2024-01-15T11:00:00Z',
      location: 'Test Location',
      description: 'Test Description',
      type: 'meeting'
    };

    it('successfully creates calendar event', async () => {
      const result = await createCalendarEvent(mockEventData);
      expect(result).toEqual({
        id: 'mock-event-id',
        ...mockEventData
      });
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockEventData),
      });
    });

    it('handles API errors and logs to console', async () => {
      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('API Error'));
      
      await expect(createCalendarEvent(mockEventData)).rejects.toThrow('API Error');
      
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to create calendar event:',
        expect.any(Error)
      );
    });

    it('successfully creates events with success response', async () => {
      const result = await createCalendarEvent(mockEventData);
      expect(result).toEqual({
        id: 'mock-event-id',
        ...mockEventData
      });
    });

    it('handles different event types', async () => {
      const academicEvent = { ...mockEventData, type: 'academic' as const };
      const socialEvent = { ...mockEventData, type: 'social' as const };
      const milestoneEvent = { ...mockEventData, type: 'milestone' as const };

      const result1 = await createCalendarEvent(academicEvent);
      const result2 = await createCalendarEvent(socialEvent);
      const result3 = await createCalendarEvent(milestoneEvent);

      expect(result1.type).toBe('academic');
      expect(result2.type).toBe('social');
      expect(result3.type).toBe('milestone');
    });

    it('handles events with minimal data', async () => {
      const minimalEvent = {
        title: 'Minimal Event',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z'
      };

      const result = await createCalendarEvent(minimalEvent);
      expect(result).toEqual({
        id: 'mock-event-id',
        ...minimalEvent
      });
    });

    it('handles events with full metadata', async () => {
      const fullEvent = {
        ...mockEventData,
        attendees: ['user1', 'user2'],
        metadata: {
          category: 'work',
          priority: 'high',
          tags: ['important', 'deadline']
        }
      };

      const result = await createCalendarEvent(fullEvent);
      expect(result).toEqual({
        id: 'mock-event-id',
        ...fullEvent
      });
    });
  });

  describe('updateCalendarEvent', () => {
    const eventId = 'event-123';
    const updateData: Partial<CalendarApiEvent> = {
      title: 'Updated Event',
      location: 'New Location'
    };

    it('successfully updates calendar event', async () => {
      const result = await updateCalendarEvent(eventId, updateData);
      expect(result).toEqual({
        id: 'mock-event-id',
        ...updateData
      });
      expect(mockFetch).toHaveBeenCalledWith(`/api/calendar/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
    });

    it('handles API errors and logs to console', async () => {
      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('API Error'));
      
      await expect(updateCalendarEvent(eventId, updateData)).rejects.toThrow('API Error');
      
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to update calendar event:',
        expect.any(Error)
      );
    });

    it('handles different update scenarios', async () => {
      const titleUpdate = { title: 'New Title' };
      const timeUpdate = { start: '2024-01-16T10:00:00Z' };
      const locationUpdate = { location: 'New Room' };

      const result1 = await updateCalendarEvent(eventId, titleUpdate);
      const result2 = await updateCalendarEvent(eventId, timeUpdate);
      const result3 = await updateCalendarEvent(eventId, locationUpdate);

      expect(result1.title).toBe('New Title');
      expect(result2.start).toBe('2024-01-16T10:00:00Z');
      expect(result3.location).toBe('New Room');
    });

    it('handles empty update object', async () => {
      const result = await updateCalendarEvent(eventId, {});
      expect(result).toEqual({
        id: 'mock-event-id'
      });
    });

    it('handles different event IDs', async () => {
      const result1 = await updateCalendarEvent('event-1', updateData);
      const result2 = await updateCalendarEvent('event-2', updateData);
      const result3 = await updateCalendarEvent('', updateData);

      expect(result1).toEqual({ id: 'mock-event-id', ...updateData });
      expect(result2).toEqual({ id: 'mock-event-id', ...updateData });
      expect(result3).toEqual({ id: 'mock-event-id', ...updateData });
    });
  });

  describe('deleteCalendarEvent', () => {
    const eventId = 'event-123';

    it('successfully deletes calendar event', async () => {
      await expect(deleteCalendarEvent(eventId)).resolves.toBeUndefined();
      expect(mockFetch).toHaveBeenCalledWith(`/api/calendar/${eventId}`, {
        method: 'DELETE',
      });
    });

    it('handles API errors and logs to console', async () => {
      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('API Error'));
      
      await expect(deleteCalendarEvent(eventId)).rejects.toThrow('API Error');
      
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to delete calendar event:',
        expect.any(Error)
      );
    });

    it('handles different event IDs', async () => {
      await expect(deleteCalendarEvent('event-1')).resolves.toBeUndefined();
      await expect(deleteCalendarEvent('event-2')).resolves.toBeUndefined();
      await expect(deleteCalendarEvent('nonexistent')).resolves.toBeUndefined();
    });

    it('handles empty event ID', async () => {
      await expect(deleteCalendarEvent('')).resolves.toBeUndefined();
    });
  });

  describe('transformApiEvent', () => {
    const baseApiEvent: CalendarApiEvent = {
      id: 'event-123',
      title: 'Test Event',
      start: '2024-01-15T14:30:00Z',
      end: '2024-01-15T16:00:00Z',
      location: 'Room 101',
      description: 'Test description',
      type: 'academic',
      attendees: ['user1', 'user2'],
      metadata: { courseCode: 'CS101' }
    };

    it('transforms API event to UI Event format', () => {
      const uiEvent = transformApiEvent(baseApiEvent);

      expect(uiEvent).toEqual({
        id: 'event-123',
        title: 'Test Event',
        time: expect.any(String),
        type: 'academic',
        location: 'Room 101',
        attendees: ['user1', 'user2'],
        isAllDay: false,
        hasReminder: false,
        metadata: { courseCode: 'CS101' }
      });
    });

    it('formats time correctly for different times', () => {
      const morningEvent = { ...baseApiEvent, start: '2024-01-15T09:00:00Z' };
      const afternoonEvent = { ...baseApiEvent, start: '2024-01-15T15:30:00Z' };
      const eveningEvent = { ...baseApiEvent, start: '2024-01-15T20:45:00Z' };

      const morningUI = transformApiEvent(morningEvent);
      const afternoonUI = transformApiEvent(afternoonEvent);
      const eveningUI = transformApiEvent(eveningEvent);

      // Time formatting will depend on local timezone, just verify format structure
      expect(morningUI.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
      expect(afternoonUI.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
      expect(eveningUI.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });

    it('defaults type to academic when not provided', () => {
      const eventWithoutType = { ...baseApiEvent };
      delete eventWithoutType.type;

      const uiEvent = transformApiEvent(eventWithoutType);
      expect(uiEvent.type).toBe('academic');
    });

    it('handles missing optional fields', () => {
      const minimalEvent: CalendarApiEvent = {
        id: 'minimal',
        title: 'Minimal Event',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z'
      };

      const uiEvent = transformApiEvent(minimalEvent);

      expect(uiEvent.location).toBeUndefined();
      expect(uiEvent.attendees).toEqual([]);
      expect(uiEvent.metadata).toBeUndefined();
    });

    it('detects all-day events correctly', () => {
      // Create a full 24-hour event (exactly 24 hours)
      const allDayEvent = {
        ...baseApiEvent,
        start: '2024-01-15T00:00:00.000Z',
        end: '2024-01-16T00:00:00.000Z' // Next day at midnight
      };

      const uiEvent = transformApiEvent(allDayEvent);
      expect(uiEvent.isAllDay).toBe(true);
    });

    it('detects non-all-day events correctly', () => {
      const regularEvent = {
        ...baseApiEvent,
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z'
      };

      const uiEvent = transformApiEvent(regularEvent);
      expect(uiEvent.isAllDay).toBe(false);
    });

    it('handles 24+ hour events as all-day', () => {
      const longEvent = {
        ...baseApiEvent,
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-16T12:00:00Z' // 26 hours later
      };

      const uiEvent = transformApiEvent(longEvent);
      expect(uiEvent.isAllDay).toBe(true);
    });

    it('preserves all event types', () => {
      const types: CalendarApiEvent['type'][] = ['academic', 'social', 'meeting', 'milestone', 'deadline'];
      
      types.forEach(type => {
        const event = { ...baseApiEvent, type };
        const uiEvent = transformApiEvent(event);
        expect(uiEvent.type).toBe(type);
      });
    });

    it('handles empty attendees array', () => {
      const eventWithEmptyAttendees = { ...baseApiEvent, attendees: [] };
      const uiEvent = transformApiEvent(eventWithEmptyAttendees);
      expect(uiEvent.attendees).toEqual([]);
    });

    it('sets hasReminder to false by default', () => {
      const uiEvent = transformApiEvent(baseApiEvent);
      expect(uiEvent.hasReminder).toBe(false);
    });
  });

  describe('connectCalendarService', () => {
    it('attempts connection for Google and returns proper response', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true, redirectUrl: 'https://oauth.google.com' })
      });
      
      const result = await connectCalendarService('google');
      
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar/connect/google', {
        method: 'POST'
      });
      expect(result).toEqual({ success: true, redirectUrl: 'https://oauth.google.com' });
    });

    it('attempts connection for Outlook and handles API errors', async () => {
      // Mock API error
      mockFetch.mockRejectedValueOnce(new Error('Connection failed'));
      
      const result = await connectCalendarService('outlook');
      
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar/connect/outlook', {
        method: 'POST'
      });
      expect(result).toEqual({ success: false, error: 'outlook calendar integration coming soon' });
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('returns consistent response structure', async () => {
      // Mock error responses for both
      mockFetch.mockRejectedValue(new Error('Not available'));
      
      const googleResult = await connectCalendarService('google');
      const outlookResult = await connectCalendarService('outlook');

      expect(googleResult).toHaveProperty('success');
      expect(outlookResult).toHaveProperty('success');
      expect(googleResult.success).toBe(false);
      expect(outlookResult.success).toBe(false);
    });

    it('does not include redirectUrl in response', async () => {
      const result = await connectCalendarService('google');
      expect(result.redirectUrl).toBeUndefined();
    });

    it('handles connection attempts gracefully', async () => {
      await expect(connectCalendarService('google')).resolves.not.toThrow();
      await expect(connectCalendarService('outlook')).resolves.not.toThrow();
    });
  });

  describe('syncCalendarService', () => {
    const connectionId = 'connection-123';

    it('attempts sync and returns proper response', async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true, lastSync: '2024-01-15T10:00:00Z' })
      });
      
      const result = await syncCalendarService(connectionId);
      
      expect(mockFetch).toHaveBeenCalledWith(`/api/calendar/sync/${connectionId}`, {
        method: 'POST'
      });
      expect(result.success).toBe(true);
      expect(result.lastSync).toBeInstanceOf(Date);
    });

    it('handles API errors and returns fallback response', async () => {
      // Mock API error
      mockFetch.mockRejectedValueOnce(new Error('Sync failed'));
      
      const result = await syncCalendarService(connectionId);

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('lastSync');
      expect(result.success).toBe(false);
      expect(result.lastSync).toBeInstanceOf(Date);
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('provides current timestamp as lastSync', async () => {
      const beforeSync = new Date();
      const result = await syncCalendarService(connectionId);
      const afterSync = new Date();

      expect(result.lastSync.getTime()).toBeGreaterThanOrEqual(beforeSync.getTime());
      expect(result.lastSync.getTime()).toBeLessThanOrEqual(afterSync.getTime());
    });

    it('handles different connection IDs', async () => {
      // Mock error responses for all
      mockFetch.mockRejectedValue(new Error('Not available'));
      
      const result1 = await syncCalendarService('conn-1');
      const result2 = await syncCalendarService('conn-2');
      const result3 = await syncCalendarService('');

      expect(mockFetch).toHaveBeenCalledWith('/api/calendar/sync/conn-1', { method: 'POST' });
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar/sync/conn-2', { method: 'POST' });
      expect(mockFetch).toHaveBeenCalledWith('/api/calendar/sync/', { method: 'POST' });

      expect(result1.success).toBe(false);
      expect(result2.success).toBe(false);
      expect(result3.success).toBe(false);
    });

    it('handles sync attempts gracefully', async () => {
      await expect(syncCalendarService(connectionId)).resolves.not.toThrow();
    });
  });

  describe('Time Formatting Utility', () => {
    it('formats morning times correctly', () => {
      const morningEvent = {
        id: 'morning',
        title: 'Morning Event',
        start: '2024-01-15T09:30:00Z',
        end: '2024-01-15T10:30:00Z'
      };

      const uiEvent = transformApiEvent(morningEvent);
      // Time will vary based on timezone, just check format
      expect(uiEvent.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });

    it('formats afternoon times correctly', () => {
      const afternoonEvent = {
        id: 'afternoon',
        title: 'Afternoon Event',
        start: '2024-01-15T15:45:00Z',
        end: '2024-01-15T16:45:00Z'
      };

      const uiEvent = transformApiEvent(afternoonEvent);
      // Time will vary based on timezone, just check format
      expect(uiEvent.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });

    it('handles midnight correctly', () => {
      const midnightEvent = {
        id: 'midnight',
        title: 'Midnight Event',
        start: '2024-01-15T00:00:00Z',
        end: '2024-01-15T01:00:00Z'
      };

      const uiEvent = transformApiEvent(midnightEvent);
      // Time will vary based on timezone, just check format
      expect(uiEvent.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });

    it('handles noon correctly', () => {
      const noonEvent = {
        id: 'noon',
        title: 'Noon Event',
        start: '2024-01-15T12:00:00Z',
        end: '2024-01-15T13:00:00Z'
      };

      const uiEvent = transformApiEvent(noonEvent);
      // Time will vary based on timezone, just check format
      expect(uiEvent.time).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });
  });

  describe('All-Day Event Detection', () => {
    it('detects exact 24-hour events', () => {
      const exactDayEvent = {
        id: 'exact-day',
        title: 'All Day Event',
        start: '2024-01-15T00:00:00Z',
        end: '2024-01-16T00:00:00Z'
      };

      const uiEvent = transformApiEvent(exactDayEvent);
      expect(uiEvent.isAllDay).toBe(true);
    });

    it('detects traditional all-day format', () => {
      // Create a local midnight to 23:59 event (which should be detected as all-day in any timezone)
      const now = new Date('2024-01-15T12:00:00Z'); // Use noon as base
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 0, 0);
      
      const traditionalAllDay = {
        id: 'traditional',
        title: 'Traditional All Day',
        start: startOfDay.toISOString(),
        end: endOfDay.toISOString()
      };

      const uiEvent = transformApiEvent(traditionalAllDay);
      expect(uiEvent.isAllDay).toBe(true);
    });

    it('detects multi-day events as all-day', () => {
      const multiDayEvent = {
        id: 'multi-day',
        title: 'Multi Day Event',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-17T16:00:00Z'
      };

      const uiEvent = transformApiEvent(multiDayEvent);
      expect(uiEvent.isAllDay).toBe(true);
    });

    it('correctly identifies regular timed events', () => {
      const timedEvent = {
        id: 'timed',
        title: 'Regular Meeting',
        start: '2024-01-15T14:00:00Z',
        end: '2024-01-15T15:30:00Z'
      };

      const uiEvent = transformApiEvent(timedEvent);
      expect(uiEvent.isAllDay).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully in createCalendarEvent', async () => {
      const eventData = {
        title: 'Test Event',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z'
      };

      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('Server Error'));

      await expect(createCalendarEvent(eventData)).rejects.toThrow('Server Error');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to create calendar event:',
        expect.any(Error)
      );
    });

    it('handles API errors gracefully in updateCalendarEvent', async () => {
      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('Server Error'));

      await expect(updateCalendarEvent('event-1', { title: 'Updated' })).rejects.toThrow('Server Error');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to update calendar event:',
        expect.any(Error)
      );
    });

    it('handles API errors gracefully in deleteCalendarEvent', async () => {
      // Mock fetch to return error
      mockFetch.mockRejectedValueOnce(new Error('Server Error'));

      await expect(deleteCalendarEvent('event-1')).rejects.toThrow('Server Error');
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to delete calendar event:',
        expect.any(Error)
      );
    });
  });
});