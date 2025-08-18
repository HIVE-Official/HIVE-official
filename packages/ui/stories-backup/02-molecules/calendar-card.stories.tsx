import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CalendarCard } from '../../components/profile/calendar-card';
import type { CalendarCardProps, Event } from '../../components/profile/types';

/**
 * # CalendarCard - Smart Campus Scheduling
 * 
 * The CalendarCard molecule is a sophisticated calendar integration component in the HIVE Design System.
 * It combines social and utility features to help students manage their campus schedules with
 * intelligent conflict detection and multi-calendar integration.
 * 
 * ## Social Media Features
 * - Event sharing and collaboration
 * - Study group coordination
 * - Campus event discovery
 * 
 * ## Utility Features  
 * - Multi-calendar integration (Google, Outlook, University)
 * - Intelligent conflict detection
 * - Schedule optimization suggestions
 * - Academic milestone tracking
 * 
 * ## Campus Integration
 * Designed for molecule level interactions that blend social scheduling
 * with academic utility, making campus time management more connected and productive.
 */

const meta: Meta<typeof CalendarCard> = {
  title: '02-Molecules/CalendarCard',
  component: CalendarCard,
  parameters: {
    docs: {
      description: {
        component: `
# CalendarCard - Campus Smart Scheduling

This molecule component exemplifies HIVE's social media + utility platform approach for calendar management:

## Social Media Integration
- Event sharing and collaboration
- Study group coordination  
- Campus event discovery
- Social scheduling patterns

## Campus Utility Features
- Multi-calendar integration
- Intelligent conflict detection
- Schedule optimization
- Academic milestone tracking

## Student Engagement Patterns
- Collaborative study session planning
- Campus event participation
- Academic deadline management
- Social and academic balance

The CalendarCard ensures every scheduling interaction serves both social connection and academic success.
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['loading', 'default', 'empty', 'error', 'sync-failed'],
      description: 'Current state of the calendar card'
    },
    variant: {
      control: { type: 'select' },
      options: ['desktop', 'mobile'],
      description: 'Display variant for different screen sizes'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[400px]">
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events data for stories
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'CS 101 Lecture',
    time: '10:00 AM',
    type: 'class',
    location: 'Science Building Room 205',
    attendees: ['Prof. Johnson', '45 students'],
    metadata: {
      professor: 'Prof. Johnson',
      room: 'Room 205',
      buildingCode: 'SCI',
      recurring: true
    }
  },
  {
    id: '2', 
    title: 'Study Group - Algorithms',
    time: '2:00 PM',
    type: 'academic',
    location: 'Library Study Room 3',
    attendees: ['Alex', 'Sam', 'Jordan', 'Maya'],
    metadata: {
      spaceId: 'study-group-algorithms',
      rsvpStatus: 'yes'
    }
  },
  {
    id: '3',
    title: 'Dorm Floor Movie Night',
    time: '8:00 PM', 
    type: 'social',
    location: 'Dorm Common Room',
    attendees: ['Floor 3B residents'],
    metadata: {
      spaceId: 'dorm-floor-3b',
      rsvpStatus: 'maybe'
    }
  }
];

const sampleCalendarData = {
  nextEvent: sampleEvents[0],
  upcomingEvents: sampleEvents,
  todaysEvents: sampleEvents.slice(0, 2),
  connections: [
    {
      id: 'google',
      name: 'Google Calendar',
      type: 'google' as const,
      status: 'connected' as const,
      lastSync: new Date(),
      color: '#4285f4'
    },
    {
      id: 'university',
      name: 'University Calendar',
      type: 'university' as const,
      status: 'connected' as const,
      lastSync: new Date(),
      color: '#34a853'
    }
  ],
  conflicts: [],
  lastUpdated: new Date()
};

// 1. DEFAULT STORY - Active calendar with events
export const Default: Story = {
  args: {
    state: 'default',
    variant: 'desktop',
    data: sampleCalendarData
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    state: 'default',
    variant: 'desktop',
    data: sampleCalendarData,
    onViewCalendar: () => console.log('View calendar clicked'),
    onAddEvent: () => console.log('Add event clicked'),
    onEventClick: (event) => console.log('Event clicked:', event)
  }
};

// 3. LOADING STATE STORY
export const Loading: Story = {
  args: {
    state: 'loading',
    variant: 'desktop'
  }
};

// 4. EMPTY STATE STORY - No events scheduled
export const Empty: Story = {
  args: {
    state: 'empty',
    variant: 'desktop',
    data: {
      ...sampleCalendarData,
      nextEvent: undefined,
      upcomingEvents: [],
      todaysEvents: []
    }
  }
};

// 5. ERROR STATE STORY - Calendar sync issues
export const Error: Story = {
  args: {
    state: 'error',
    variant: 'desktop'
  }
};

// 6. SYNC FAILED STORY - Connection problems
export const SyncFailed: Story = {
  args: {
    state: 'sync-failed',
    variant: 'desktop',
    data: {
      ...sampleCalendarData,
      connections: [
        {
          id: 'google',
          name: 'Google Calendar',
          type: 'google' as const,
          status: 'error' as const,
          color: '#4285f4'
        }
      ]
    }
  }
};

// 7. WITH CONFLICTS STORY - Schedule conflicts detected
export const WithConflicts: Story = {
  args: {
    state: 'default',
    variant: 'desktop',
    data: {
      ...sampleCalendarData,
      conflicts: [
        {
          id: 'conflict-1',
          events: [sampleEvents[0], sampleEvents[1]],
          severity: 'minor' as const,
          suggestion: 'Consider moving study group to 3:00 PM',
          canAutoResolve: true
        }
      ]
    }
  }
};

// 8. MOBILE VARIANT STORY - Optimized for mobile
export const Mobile: Story = {
  args: {
    state: 'default',
    variant: 'mobile', 
    data: sampleCalendarData
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-[var(--hive-background-primary)] min-h-[400px]">
        <div className="max-w-sm mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

// 9. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How students use the calendar card in real campus situations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Busy Student Schedule</h3>
          <CalendarCard 
            state="default"
            variant="desktop"
            data={{
              ...sampleCalendarData,
              upcomingEvents: [
                {
                  id: '1',
                  title: 'Calculus Exam',
                  time: '9:00 AM',
                  type: 'academic',
                  location: 'Math Building 150',
                  attendees: ['Class roster']
                },
                {
                  id: '2',
                  title: 'Physics Lab',
                  time: '1:00 PM',
                  type: 'class',
                  location: 'Physics Lab 201',
                  attendees: ['Lab partners']
                },
                {
                  id: '3',
                  title: 'Study Group',
                  time: '4:00 PM',
                  type: 'academic',
                  location: 'Library',
                  attendees: ['Study buddies']
                },
                {
                  id: '4',
                  title: 'Dinner with Friends',
                  time: '7:00 PM',
                  type: 'social',
                  location: 'Campus Dining',
                  attendees: ['Friend group']
                }
              ]
            }}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Light Day Schedule</h3>
          <CalendarCard 
            state="default"
            variant="desktop"
            data={{
              ...sampleCalendarData,
              nextEvent: {
                id: '1',
                title: 'Office Hours - Prof. Smith',
                time: '2:00 PM',
                type: 'academic',
                location: 'Faculty Office 312',
                attendees: ['Prof. Smith']
              },
              upcomingEvents: [
                {
                  id: '1',
                  title: 'Office Hours - Prof. Smith',
                  time: '2:00 PM',
                  type: 'academic',
                  location: 'Faculty Office 312',
                  attendees: ['Prof. Smith']
                }
              ]
            }}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">First-Time Setup</h3>
          <CalendarCard 
            state="empty"
            variant="desktop"
            data={{
              ...sampleCalendarData,
              nextEvent: undefined,
              upcomingEvents: [],
              todaysEvents: [],
              connections: []
            }}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Sync Issues</h3>
          <CalendarCard 
            state="sync-failed"
            variant="desktop"
            data={{
              ...sampleCalendarData,
              connections: [
                {
                  id: 'university',
                  name: 'University Calendar',
                  type: 'university' as const,
                  status: 'error' as const,
                  color: '#34a853'
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  )
};

// 10. ACCESSIBILITY STORY - A11y features
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant calendar interactions
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <CalendarCard 
          state="default"
          variant="desktop"
          data={sampleCalendarData}
          onViewCalendar={() => console.log('Accessible calendar view')}
          onAddEvent={() => console.log('Accessible event creation')}
          onEventClick={(event) => console.log('Accessible event interaction:', event.title)}
        />
      </div>
      
      <div className="text-sm text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
        <h3 className="font-medium mb-2">Accessibility Features:</h3>
        <ul className="space-y-1 list-disc list-inside">
          <li>Keyboard navigation support (Tab, Enter, Escape)</li>
          <li>Screen reader announcements for events and states</li>
          <li>High contrast focus indicators</li>
          <li>Semantic ARIA labels and roles</li>
          <li>Time-based content announcements</li>
          <li>Error state messaging for assistive technology</li>
        </ul>
      </div>
    </div>
  )
};