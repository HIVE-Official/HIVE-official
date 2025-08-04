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

// Mock global fetch
global.fetch = vi.fn();

describe('calendar-api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.log.mockClear();
    consoleSpy.error.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchCalendarEvents', () => {
    it('returns empty array as placeholder', async () => {
      const events = await fetchCalendarEvents();
      expect(events).toEqual([]);
    });

    it('does not make any API calls', async () => {
      await fetchCalendarEvents();
      expect(fetch).not.toHaveBeenCalled();
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

    it('throws error indicating not implemented', async () => {
      await expect(createCalendarEvent(mockEventData))
        .rejects.toThrow('Event creation not implemented yet');
    });

    it('logs error to console', async () => {
      try {
        await createCalendarEvent(mockEventData);
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to create calendar event:',
        expect.any(Error)
      );
    });

    it('preserves original error message', async () => {
      try {
        await createCalendarEvent(mockEventData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Event creation not implemented yet');
      }
    });

    it('handles different event types', async () => {
      const academicEvent = { ...mockEventData, type: 'academic' as const };
      const socialEvent = { ...mockEventData, type: 'social' as const };
      const milestoneEvent = { ...mockEventData, type: 'milestone' as const };

      await expect(createCalendarEvent(academicEvent)).rejects.toThrow();
      await expect(createCalendarEvent(socialEvent)).rejects.toThrow();
      await expect(createCalendarEvent(milestoneEvent)).rejects.toThrow();

      expect(consoleSpy.error).toHaveBeenCalledTimes(3);
    });

    it('handles events with minimal data', async () => {
      const minimalEvent = {
        title: 'Minimal Event',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z'
      };

      await expect(createCalendarEvent(minimalEvent)).rejects.toThrow();
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

      await expect(createCalendarEvent(fullEvent)).rejects.toThrow();
    });
  });

  describe('updateCalendarEvent', () => {
    const eventId = 'event-123';
    const updateData: Partial<CalendarApiEvent> = {
      title: 'Updated Event',
      location: 'New Location'
    };

    it('throws error indicating not implemented', async () => {
      await expect(updateCalendarEvent(eventId, updateData))
        .rejects.toThrow('Event update not implemented yet');
    });

    it('logs error to console', async () => {
      try {
        await updateCalendarEvent(eventId, updateData);
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to update calendar event:',
        expect.any(Error)
      );
    });

    it('handles different update scenarios', async () => {
      const titleUpdate = { title: 'New Title' };
      const timeUpdate = { start: '2024-01-16T10:00:00Z' };
      const locationUpdate = { location: 'New Room' };

      await expect(updateCalendarEvent(eventId, titleUpdate)).rejects.toThrow();
      await expect(updateCalendarEvent(eventId, timeUpdate)).rejects.toThrow();
      await expect(updateCalendarEvent(eventId, locationUpdate)).rejects.toThrow();

      expect(consoleSpy.error).toHaveBeenCalledTimes(3);
    });

    it('handles empty update object', async () => {
      await expect(updateCalendarEvent(eventId, {})).rejects.toThrow();
    });

    it('preserves error for different event IDs', async () => {
      await expect(updateCalendarEvent('event-1', updateData)).rejects.toThrow();
      await expect(updateCalendarEvent('event-2', updateData)).rejects.toThrow();
      await expect(updateCalendarEvent('', updateData)).rejects.toThrow();

      expect(consoleSpy.error).toHaveBeenCalledTimes(3);
    });
  });

  describe('deleteCalendarEvent', () => {
    const eventId = 'event-123';

    it('throws error indicating not implemented', async () => {
      await expect(deleteCalendarEvent(eventId))
        .rejects.toThrow('Event deletion not implemented yet');
    });

    it('logs error to console', async () => {
      try {
        await deleteCalendarEvent(eventId);
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Failed to delete calendar event:',
        expect.any(Error)
      );
    });

    it('handles different event IDs', async () => {
      await expect(deleteCalendarEvent('event-1')).rejects.toThrow();
      await expect(deleteCalendarEvent('event-2')).rejects.toThrow();
      await expect(deleteCalendarEvent('nonexistent')).rejects.toThrow();

      expect(consoleSpy.error).toHaveBeenCalledTimes(3);
    });

    it('handles empty event ID', async () => {
      await expect(deleteCalendarEvent('')).rejects.toThrow();
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

      expect(morningUI.time).toMatch(/AM$/);
      expect(afternoonUI.time).toMatch(/PM$/);
      expect(eveningUI.time).toMatch(/PM$/);
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
      const allDayEvent = {
        ...baseApiEvent,
        start: '2024-01-15T00:00:00Z',
        end: '2024-01-15T23:59:00Z'
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
    it('logs connection attempt for Google', async () => {
      const result = await connectCalendarService('google');
      
      expect(consoleSpy.log).toHaveBeenCalledWith('Connecting to google calendar...');
      expect(result).toEqual({ success: false });
    });

    it('logs connection attempt for Outlook', async () => {
      const result = await connectCalendarService('outlook');
      
      expect(consoleSpy.log).toHaveBeenCalledWith('Connecting to outlook calendar...');
      expect(result).toEqual({ success: false });
    });

    it('returns consistent response structure', async () => {
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

    it('logs sync attempt', async () => {
      const result = await syncCalendarService(connectionId);
      
      expect(consoleSpy.log).toHaveBeenCalledWith(`Syncing calendar connection ${connectionId}...`);
      expect(result.success).toBe(false);
    });

    it('returns consistent response structure', async () => {
      const result = await syncCalendarService(connectionId);

      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('lastSync');
      expect(result.success).toBe(false);
      expect(result.lastSync).toBeInstanceOf(Date);
    });

    it('provides current timestamp as lastSync', async () => {
      const beforeSync = new Date();
      const result = await syncCalendarService(connectionId);
      const afterSync = new Date();

      expect(result.lastSync.getTime()).toBeGreaterThanOrEqual(beforeSync.getTime());
      expect(result.lastSync.getTime()).toBeLessThanOrEqual(afterSync.getTime());
    });

    it('handles different connection IDs', async () => {
      const result1 = await syncCalendarService('conn-1');
      const result2 = await syncCalendarService('conn-2');
      const result3 = await syncCalendarService('');

      expect(consoleSpy.log).toHaveBeenCalledWith('Syncing calendar connection conn-1...');
      expect(consoleSpy.log).toHaveBeenCalledWith('Syncing calendar connection conn-2...');
      expect(consoleSpy.log).toHaveBeenCalledWith('Syncing calendar connection ...');

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
      expect(uiEvent.time).toMatch(/9:30.*AM/);
    });

    it('formats afternoon times correctly', () => {
      const afternoonEvent = {
        id: 'afternoon',
        title: 'Afternoon Event',
        start: '2024-01-15T15:45:00Z',
        end: '2024-01-15T16:45:00Z'
      };

      const uiEvent = transformApiEvent(afternoonEvent);
      expect(uiEvent.time).toMatch(/3:45.*PM/);
    });

    it('handles midnight correctly', () => {
      const midnightEvent = {
        id: 'midnight',
        title: 'Midnight Event',
        start: '2024-01-15T00:00:00Z',
        end: '2024-01-15T01:00:00Z'
      };

      const uiEvent = transformApiEvent(midnightEvent);
      expect(uiEvent.time).toMatch(/12:00.*AM/);
    });

    it('handles noon correctly', () => {
      const noonEvent = {
        id: 'noon',
        title: 'Noon Event',
        start: '2024-01-15T12:00:00Z',
        end: '2024-01-15T13:00:00Z'
      };

      const uiEvent = transformApiEvent(noonEvent);
      expect(uiEvent.time).toMatch(/12:00.*PM/);
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
      const traditionalAllDay = {
        id: 'traditional',
        title: 'Traditional All Day',
        start: '2024-01-15T00:00:00Z',
        end: '2024-01-15T23:59:00Z'
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

      try {
        await createCalendarEvent(eventData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(consoleSpy.error).toHaveBeenCalled();
      }
    });

    it('handles API errors gracefully in updateCalendarEvent', async () => {
      try {
        await updateCalendarEvent('event-1', { title: 'Updated' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(consoleSpy.error).toHaveBeenCalled();
      }
    });

    it('handles API errors gracefully in deleteCalendarEvent', async () => {
      try {
        await deleteCalendarEvent('event-1');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(consoleSpy.error).toHaveBeenCalled();
      }
    });
  });
});