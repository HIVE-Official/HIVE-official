import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testEnvSetup, mockFirestore, mockAuth, mockUser, createMockRequest } from '../setup';

const mockCalendarEvent = {
  id: 'event-123',
  title: 'CS 101 Lecture',
  description: 'Introduction to Computer Science',
  startTime: '2024-08-01T10:00:00Z',
  endTime: '2024-08-01T11:30:00Z',
  location: 'Room 101, Engineering Building',
  type: 'class',
  course: {
    id: 'cs-101',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    credits: 3
  },
  attendees: ['user-123', 'user-456'],
  recurrence: {
    pattern: 'weekly',
    daysOfWeek: ['monday', 'wednesday', 'friday'],
    endDate: '2024-12-15T00:00:00Z'
  },
  reminders: [
    { type: 'notification', minutesBefore: 15 },
    { type: 'email', minutesBefore: 60 }
  ]
};

const mockExternalCalendar = {
  provider: 'google',
  calendarId: 'primary',
  syncEnabled: true,
  lastSync: '2024-07-30T12:00:00Z',
  events: ['event-123', 'event-456']
};

vi.mock('../../lib/firebase', () => mockFirestore);
vi.mock('../../lib/auth', () => mockAuth);
vi.mock('../../lib/calendar-api', () => ({
  GoogleCalendarAPI: {
    listEvents: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn()
  },
  OutlookCalendarAPI: {
    listEvents: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn()
  }
}));

describe('Calendar Integration Tests', () => {
  beforeEach(() => {
    testEnvSetup();
    vi.clearAllMocks();
  });

  describe('Calendar Data API Integration', () => {
    it('fetches comprehensive calendar data', async () => {
      const { useCalendarData } = await import('../../hooks/use-calendar-data');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'event-123', data: () => mockCalendarEvent },
          { id: 'event-456', data: () => ({ ...mockCalendarEvent, id: 'event-456' }) }
        ]
      } as any);

      const { data, isLoading, error } = useCalendarData({
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        includeRecurring: true
      });

      expect(data).toBeDefined();
      expect(isLoading).toBe(false);
      expect(error).toBeNull();
    });

    it('handles calendar event creation with validation', async () => {
      const { POST: calendarPOST } = await import('../../app/api/calendar/events/route');
      
      const eventData = {
        title: 'Study Group Session',
        description: 'CS 101 study group',
        startTime: '2024-08-05T14:00:00Z',
        endTime: '2024-08-05T16:00:00Z',
        type: 'study',
        attendees: ['user-456']
      };

      const request = createMockRequest('POST', '/api/calendar/events', eventData);
      const response = await calendarPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.event.title).toBe('Study Group Session');
      expect(data.event.createdBy).toBe(mockUser.uid);
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(eventData)
      );
    });

    it('validates event time conflicts', async () => {
      const { POST: calendarPOST } = await import('../../app/api/calendar/events/route');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'conflict-event', data: () => mockCalendarEvent }]
      } as any);

      const conflictingEvent = {
        title: 'Conflicting Event',
        startTime: '2024-08-01T10:30:00Z',
        endTime: '2024-08-01T11:00:00Z'
      };

      const request = createMockRequest('POST', '/api/calendar/events', conflictingEvent);
      const response = await calendarPOST(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toContain('Time conflict');
      expect(data.conflictingEvents).toHaveLength(1);
    });
  });

  describe('External Calendar Sync Integration', () => {
    it('syncs with Google Calendar', async () => {
      const { POST: syncPOST } = await import('../../app/api/calendar/sync/route');
      
      const { GoogleCalendarAPI } = await import('../../lib/calendar-api');
      vi.mocked(GoogleCalendarAPI.listEvents).mockResolvedValueOnce([
        {
          id: 'google-event-1',
          summary: 'CS 201 Lecture',
          start: { dateTime: '2024-08-02T09:00:00Z' },
          end: { dateTime: '2024-08-02T10:30:00Z' }
        }
      ] as any);

      const syncData = {
        provider: 'google',
        calendarId: 'primary',
        accessToken: 'mock-access-token'
      };

      const request = createMockRequest('POST', '/api/calendar/sync', syncData);
      const response = await syncPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.syncStatus).toBe('completed');
      expect(data.eventsImported).toBeGreaterThan(0);
      expect(vi.mocked(GoogleCalendarAPI.listEvents)).toHaveBeenCalledWith(
        'primary',
        'mock-access-token'
      );
    });

    it('handles sync conflicts and duplicates', async () => {
      const { POST: syncPOST } = await import('../../app/api/calendar/sync/route');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'existing-event', data: () => ({ externalId: 'google-event-1' }) }]
      } as any);

      const { GoogleCalendarAPI } = await import('../../lib/calendar-api');
      vi.mocked(GoogleCalendarAPI.listEvents).mockResolvedValueOnce([
        {
          id: 'google-event-1',
          summary: 'Updated Lecture',
          start: { dateTime: '2024-08-02T09:00:00Z' },
          end: { dateTime: '2024-08-02T10:30:00Z' }
        }
      ] as any);

      const syncData = {
        provider: 'google',
        calendarId: 'primary',
        accessToken: 'mock-access-token'
      };

      const request = createMockRequest('POST', '/api/calendar/sync', syncData);
      const response = await syncPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.eventsUpdated).toBe(1);
      expect(data.duplicatesSkipped).toBe(0);
    });

    it('exports HIVE events to external calendar', async () => {
      const { POST: exportPOST } = await import('../../app/api/calendar/export/route');
      
      const { GoogleCalendarAPI } = await import('../../lib/calendar-api');
      vi.mocked(GoogleCalendarAPI.createEvent).mockResolvedValueOnce({
        id: 'exported-event-1'
      } as any);

      const exportData = {
        provider: 'google',
        calendarId: 'primary',
        eventIds: ['event-123'],
        accessToken: 'mock-access-token'
      };

      const request = createMockRequest('POST', '/api/calendar/export', exportData);
      const response = await exportPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.exportStatus).toBe('completed');
      expect(data.eventsExported).toBe(1);
      expect(vi.mocked(GoogleCalendarAPI.createEvent)).toHaveBeenCalled();
    });
  });

  describe('Recurring Events Integration', () => {
    it('creates recurring event series', async () => {
      const { POST: recurringPOST } = await import('../../app/api/calendar/recurring/route');
      
      const recurringData = {
        title: 'Weekly CS 101 Lab',
        startTime: '2024-08-05T14:00:00Z',
        endTime: '2024-08-05T17:00:00Z',
        recurrence: {
          pattern: 'weekly',
          daysOfWeek: ['monday'],
          endDate: '2024-12-09T00:00:00Z'
        }
      };

      const request = createMockRequest('POST', '/api/calendar/recurring', recurringData);
      const response = await recurringPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.series.eventCount).toBeGreaterThan(10);
      expect(data.series.pattern).toBe('weekly');
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledTimes(1); // Series document
    });

    it('handles recurring event exceptions', async () => {
      const { POST: exceptionPOST } = await import('../../app/api/calendar/recurring/exceptions/route');
      
      const exceptionData = {
        seriesId: 'series-123',
        exceptionDate: '2024-08-12T14:00:00Z',
        action: 'reschedule',
        newStartTime: '2024-08-12T15:00:00Z',
        newEndTime: '2024-08-12T18:00:00Z'
      };

      const request = createMockRequest('POST', '/api/calendar/recurring/exceptions', exceptionData);
      const response = await exceptionPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.exception.action).toBe('reschedule');
      expect(data.exception.originalDate).toBe('2024-08-12T14:00:00Z');
    });

    it('updates entire recurring series', async () => {
      const { PUT: seriesPUT } = await import('../../app/api/calendar/recurring/[seriesId]/route');
      
      const updateData = {
        title: 'Updated Lab Session',
        location: 'New Computer Lab'
      };

      const request = createMockRequest('PUT', '/api/calendar/recurring/series-123', updateData);
      const response = await seriesPUT(request, { params: { seriesId: 'series-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.series.title).toBe('Updated Lab Session');
      expect(data.futureEventsUpdated).toBeGreaterThan(0);
    });
  });

  describe('Calendar Sharing Integration', () => {
    it('shares calendar with other users', async () => {
      const { POST: sharePOST } = await import('../../app/api/calendar/share/route');
      
      const shareData = {
        calendarId: 'calendar-123',
        shareWith: ['user-456', 'user-789'],
        permissions: 'view',
        message: 'Check out my class schedule!'
      };

      const request = createMockRequest('POST', '/api/calendar/share', shareData);
      const response = await sharePOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.shares).toHaveLength(2);
      expect(data.shares[0].permissions).toBe('view');
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledTimes(2);
    });

    it('manages calendar permissions', async () => {
      const { PUT: permissionsPUT } = await import('../../app/api/calendar/share/[shareId]/route');
      
      const permissionsData = {
        permissions: 'edit',
        allowEventCreation: true
      };

      const request = createMockRequest('PUT', '/api/calendar/share/share-123', permissionsData);
      const response = await permissionsPUT(request, { params: { shareId: 'share-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.share.permissions).toBe('edit');
      expect(data.share.allowEventCreation).toBe(true);
    });

    it('creates shared study session events', async () => {
      const { POST: studySessionPOST } = await import('../../app/api/calendar/study-sessions/route');
      
      const sessionData = {
        title: 'Midterm Study Group',
        course: 'CS 101',
        startTime: '2024-08-10T19:00:00Z',
        endTime: '2024-08-10T22:00:00Z',
        location: 'Library Study Room 3',
        maxAttendees: 6,
        studyTopics: ['Algorithms', 'Data Structures']
      };

      const request = createMockRequest('POST', '/api/calendar/study-sessions', sessionData);
      const response = await studySessionPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.session.title).toBe('Midterm Study Group');
      expect(data.session.attendees).toContain(mockUser.uid);
      expect(data.session.maxAttendees).toBe(6);
    });
  });

  describe('Calendar Notifications Integration', () => {
    it('sets up event reminders', async () => {
      const { POST: reminderPOST } = await import('../../app/api/calendar/reminders/route');
      
      const reminderData = {
        eventId: 'event-123',
        reminders: [
          { type: 'push', minutesBefore: 15 },
          { type: 'email', minutesBefore: 60 },
          { type: 'sms', minutesBefore: 1440 } // 24 hours
        ]
      };

      const request = createMockRequest('POST', '/api/calendar/reminders', reminderData);
      const response = await reminderPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reminders).toHaveLength(3);
      expect(data.scheduled).toBe(true);
    });

    it('processes reminder notifications', async () => {
      const { POST: processReminders } = await import('../../app/api/calendar/process-reminders/route');
      
      const processData = {
        currentTime: '2024-08-01T09:45:00Z' // 15 minutes before mock event
      };

      const request = createMockRequest('POST', '/api/calendar/process-reminders', processData);
      const response = await processReminders(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.remindersProcessed).toBeGreaterThan(0);
      expect(data.notificationsSent).toBeGreaterThan(0);
    });

    it('handles notification delivery preferences', async () => {
      const { PUT: preferencesPUT } = await import('../../app/api/calendar/notification-preferences/route');
      
      const preferencesData = {
        defaultReminders: [
          { type: 'push', minutesBefore: 15 }
        ],
        quietHours: {
          start: '22:00',
          end: '08:00'
        },
        eventTypes: {
          class: { reminders: [{ type: 'push', minutesBefore: 10 }] },
          study: { reminders: [{ type: 'push', minutesBefore: 30 }] }
        }
      };

      const request = createMockRequest('PUT', '/api/calendar/notification-preferences', preferencesData);
      const response = await preferencesPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.preferences.defaultReminders).toHaveLength(1);
      expect(data.preferences.quietHours.start).toBe('22:00');
    });
  });

  describe('Cross-Platform Calendar Integration', () => {
    it('integrates calendar with space events', async () => {
      const spaceEventData = {
        spaceId: 'space-123',
        eventTitle: 'CS Club Meeting',
        startTime: '2024-08-07T18:00:00Z',
        endTime: '2024-08-07T19:30:00Z',
        addToCalendar: true
      };

      vi.mocked(mockFirestore.addDoc).mockResolvedValueOnce({
        id: 'space-event-123'
      } as any);

      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: 'CS Club Meeting',
          type: 'space_event',
          spaceId: 'space-123'
        })
      );
    });

    it('syncs tool deadlines with calendar', async () => {
      const toolDeadlineData = {
        toolId: 'tool-123',
        deadline: '2024-08-15T23:59:00Z',
        title: 'Project Submission',
        reminderSettings: {
          daysBefore: [7, 3, 1],
          hoursBefore: [24, 6, 1]
        }
      };

      vi.mocked(mockFirestore.addDoc).mockResolvedValueOnce({
        id: 'deadline-event-123'
      } as any);

      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: 'Project Submission',
          type: 'deadline',
          toolId: 'tool-123'
        })
      );
    });

    it('creates calendar events from feed activities', async () => {
      const feedActivityData = {
        activityId: 'activity-123',
        type: 'study_group_invitation',
        eventDetails: {
          title: 'Statistics Study Group',
          startTime: '2024-08-08T16:00:00Z',
          endTime: '2024-08-08T18:00:00Z',
          location: 'Math Building Room 205'
        }
      };

      vi.mocked(mockFirestore.addDoc).mockResolvedValueOnce({
        id: 'feed-event-123'
      } as any);

      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: 'Statistics Study Group',
          type: 'study_group',
          sourceActivity: 'activity-123'
        })
      );
    });
  });
});