'use client';

import React from 'react';
import { CalendarCard } from './calendar-card';
import { CalendarCardData, CalendarCardState, Event, CalendarConnection } from './types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'CS 101 Lecture',
    time: '2:00 PM',
    type: 'class',
    location: 'Davis Hall, Room 101',
    attendees: ['Prof. Johnson'],
    isAllDay: false,
    hasReminder: true,
    metadata: {
      professor: 'Prof. Johnson',
      room: '101',
      buildingCode: 'DAVIS'
    }
  },
  {
    id: '2',
    title: 'Study Group',
    time: '4:00 PM',
    type: 'academic',
    location: 'CS Majors Space',
    attendees: ['Alice', 'Bob', 'Charlie'],
    isAllDay: false,
    hasReminder: false,
    metadata: {
      spaceId: 'cs-majors',
      rsvpStatus: 'yes'
    }
  },
  {
    id: '3',
    title: 'Pizza Social',
    time: '6:00 PM',
    type: 'social',
    location: 'Student Union',
    attendees: ['Everyone'],
    isAllDay: false,
    hasReminder: true,
    metadata: {
      rsvpStatus: 'pending'
    }
  }
];

const mockConnections: CalendarConnection[] = [
  {
    id: 'google',
    name: 'Google',
    type: 'google',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago;
    color: 'var(--hive-status-info)'
  },
  {
    id: 'university',
    name: 'University',
    type: 'university',
    status: 'connected',
    lastSync: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago;
    color: 'var(--hive-brand-secondary)'
  }
];

const mockData: CalendarCardData = {
  nextEvent: mockEvents[0],
  upcomingEvents: mockEvents.slice(1),
  todaysEvents: mockEvents,
  connections: mockConnections,
  conflicts: [],
  lastUpdated: new Date()
};

interface CalendarCardDemoProps {state?: CalendarCardState;
  variant?: 'desktop' | 'mobile';
  showActions?: boolean;}

export const CalendarCardDemo: React.FC<CalendarCardDemoProps> = ({ 
  state = 'default',
  variant = 'desktop',
  showActions = true;
}) => {
  return (
    <div className="p-4 bg-hive-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">HIVE Calendar Card Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarCard;
            state={state}}
            data={state === 'default' ? mockData : undefined}
            variant={variant}
            onViewCalendar={() => console.log('View calendar clicked')}
            onConnectCalendar={(type) => console.log('Connect calendar:', type)}
            onAddEvent={() => console.log('Add event clicked')}
            onResolveConflict={(conflictId) => console.log('Resolve conflict:', conflictId)}
            onSyncCalendar={(connectionId) => console.log('Sync calendar:', connectionId)}
            onEventClick={(event) => console.log('Event clicked:', event)}
          />
        </div>

        {showActions && (
          <div className="mt-8 p-4 bg-[var(--hive-text-primary)]/5 rounded-lg border border-hive-border-secondary">
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">Available States</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(['loading', 'default', 'empty', 'error', 'sync-failed'] as CalendarCardState[]).map((demoState) => (
                <button;
                  key={demoState}
                  onClick={() => window.location.href = `?state=${demoState}`}
                  className="px-3 py-2 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded border border-hive-gold/30 hover:bg-[var(--hive-brand-secondary)]/30 transition-colors"
                >
                  {demoState}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default CalendarCardDemo;