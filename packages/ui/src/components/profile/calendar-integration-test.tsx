'use client';

import React from 'react';
import { CalendarCard } from './calendar-card';
import { adaptSmartCalendarProps } from './calendar-data-adapter';
import { Event } from './types';

// Test component to verify the calendar integration works
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'CS 101 Lecture',
    time: '2:00 PM',
    type: 'academic',
    location: 'Davis Hall, Room 101',
    attendees: ['Prof. Johnson'],
    isAllDay: false,
    hasReminder: true,
    metadata: {
      professor: 'Prof. Johnson',
      room: '101',
      buildingCode: 'DAVIS'
    }
  }
];

export const CalendarIntegrationTest: React.FC = () => {
  const handleEventClick = (eventId: string) => {
    console.log('Event clicked:', eventId)
  };

  return (
    <div className="p-4">
      <h2 className="text-[var(--hive-text-primary)] text-lg mb-4">Calendar Integration Test</h2>
      
      {/* Test desktop variant */}
      <div className="mb-6">
        <h3 className="text-gray-300 text-sm mb-2">Desktop Calendar Card</h3>
        <CalendarCard
          {...adaptSmartCalendarProps(
            mockEvents,
            false,
            undefined,
            handleEventClick,
            undefined,
            'desktop'
          )}
        />
      </div>

      {/* Test mobile variant */}
      <div className="mb-6">
        <h3 className="text-gray-300 text-sm mb-2">Mobile Calendar Card</h3>
        <CalendarCard
          {...adaptSmartCalendarProps(
            mockEvents,
            false,
            undefined,
            handleEventClick,
            undefined,
            'mobile'
          )}
        />
      </div>

      {/* Test loading state */}
      <div className="mb-6">
        <h3 className="text-gray-300 text-sm mb-2">Loading State</h3>
        <CalendarCard
          {...adaptSmartCalendarProps(
            [],
            true,
            undefined,
            handleEventClick,
            undefined,
            'desktop'
          )}
        />
      </div>

      {/* Test empty state */}
      <div className="mb-6">
        <h3 className="text-gray-300 text-sm mb-2">Empty State</h3>
        <CalendarCard
          {...adaptSmartCalendarProps(
            [],
            false,
            undefined,
            handleEventClick,
            undefined,
            'desktop'
          )}
        />
      </div>

      {/* Test error state */}
      <div className="mb-6">
        <h3 className="text-gray-300 text-sm mb-2">Error State</h3>
        <CalendarCard
          {...adaptSmartCalendarProps(
            [],
            false,
            'Failed to load calendar events',
            handleEventClick,
            undefined,
            'desktop'
          )}
        />
      </div>
    </div>
  )
};

export default CalendarIntegrationTest;