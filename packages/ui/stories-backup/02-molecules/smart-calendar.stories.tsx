import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SmartCalendar } from '../../components/profile/smart-calendar';
import { Event } from '../../components/profile/types';

/**
 * # SmartCalendar - Campus Schedule Intelligence
 * 
 * The SmartCalendar molecule is an intelligent campus scheduling system that combines social media
 * discovery with academic utility. It surfaces upcoming events, detects social overlaps, and helps
 * students coordinate their campus activities with premium liquid metal aesthetics.
 * 
 * ## Social Media Features
 * - Social event discovery and overlap detection
 * - Classmate coordination and attendance tracking
 * - Community event suggestions and invitations
 * - Social proof through attendee displays
 * 
 * ## Utility Features  
 * - Academic schedule management (classes, deadlines, meetings)
 * - Smart event categorization and color coding
 * - Recurring event handling and optimization
 * - Calendar synchronization and integration
 * 
 * ## Campus Integration
 * Designed for molecule-level interactions that help students manage their campus schedule
 * while discovering social opportunities and maintaining academic productivity.
 */

// Sample event data for demonstration
const sampleEvents: Event[] = [
  {
    id: 'cs-lecture',
    title: 'CS 106A - Programming Methodology',
    time: 'Today, 10:00 AM - 11:20 AM',
    type: 'class',
    location: 'Gates B01',
    attendees: ['Prof. Mehran Sahami'],
    isRecurring: true,
    overlap: {
      count: 8,
      message: '8 classmates also attending'
    },
    metadata: {
      professor: 'Prof. Mehran Sahami',
      room: 'B01',
      buildingCode: 'Gates',
      recurring: true
    }
  },
  {
    id: 'study-group',
    title: 'Physics Study Group',
    time: 'Today, 2:00 PM - 4:00 PM',
    type: 'meeting',
    location: 'Library Room 204',
    attendees: ['Sarah Chen', 'Alex Rodriguez', 'Maya Patel'],
    overlap: {
      count: 3,
      message: 'Study group with 3 friends'
    },
    metadata: {
      spaceId: 'physics-group',
      rsvpStatus: 'yes'
    }
  },
  {
    id: 'campus-event',
    title: 'Spring Carnival Planning',
    time: 'Tomorrow, 7:00 PM - 9:00 PM',
    type: 'social',
    location: 'Student Union',
    attendees: ['Event Committee', '15+ volunteers'],
    overlap: {
      count: 23,
      message: '23 students interested'
    },
    metadata: {
      spaceId: 'events-committee',
      rsvpStatus: 'maybe'
    }
  },
  {
    id: 'assignment-due',
    title: 'CS 106A - Assignment 3 Due',
    time: 'Friday, 11:59 PM',
    type: 'deadline',
    location: 'Online Submission',
    attendees: [],
    hasReminder: true,
    reminderMinutes: 60,
    metadata: {
      spaceId: 'cs-106a'
    }
  },
  {
    id: 'office-hours',
    title: 'Math Office Hours',
    time: 'Thursday, 3:00 PM - 5:00 PM',
    type: 'academic',
    location: 'Building 380, Room 381T',
    attendees: ['Prof. Williams'],
    isRecurring: true,
    metadata: {
      professor: 'Prof. Williams',
      room: '381T',
      buildingCode: '380',
      recurring: true
    }
  },
  {
    id: 'graduation-milestone',
    title: 'Course Registration Opens',
    time: 'Next Monday, 9:00 AM',
    type: 'milestone',
    location: 'Online',
    attendees: [],
    hasReminder: true,
    reminderMinutes: 1440,
    metadata: {
      recurring: false
    }
  }
];

const meta: Meta<typeof SmartCalendar> = {
  title: '02-Molecules/SmartCalendar',
  component: SmartCalendar,
  parameters: {
    docs: {
      description: {
        component: `
# SmartCalendar - Campus Schedule Intelligence

This molecule component exemplifies HIVE's social media + utility platform approach for campus scheduling:

## Social Media Integration
- Social event discovery and overlap detection
- Classmate coordination and attendance tracking
- Community event suggestions based on interests
- Social proof through attendee displays

## Campus Utility Features
- Academic schedule management and organization
- Smart event categorization with visual coding
- Recurring event handling and optimization
- Calendar synchronization with university systems

## Student Engagement Patterns
- Intelligent social overlap detection for networking
- Academic deadline tracking and reminders
- Community event discovery and participation
- Cross-platform calendar integration

The SmartCalendar ensures students never miss important academic or social events while discovering new opportunities.
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Loading state for events data'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[400px]">
        <div className="max-w-2xl mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Student's active schedule
export const Default: Story = {
  args: {
    events: sampleEvents,
    isLoading: false,
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onAddEvent: () => console.log('Add event clicked')
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    events: sampleEvents,
    isLoading: false,
    error: undefined,
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onAddEvent: () => console.log('Add event clicked')
  }
};

// 3. LOADING STATE STORY - Loading experience
export const LoadingState: Story = {
  args: {
    events: [],
    isLoading: true,
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onAddEvent: () => console.log('Add event clicked')
  }
};

// 4. ERROR STATE STORY - Error handling
export const ErrorState: Story = {
  args: {
    events: [],
    isLoading: false,
    error: 'Unable to sync with university calendar system. Please try again later.',
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onAddEvent: () => console.log('Add event clicked')
  }
};

// 5. EMPTY STATE STORY - New student or break period
export const EmptyState: Story = {
  args: {
    events: [],
    isLoading: false,
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onAddEvent: () => console.log('Add event clicked')
  }
};

// 6. EVENT TYPES STORY - Different event categories
export const EventTypes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Event Types
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different categories of events students manage in their schedules
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Academic Events</h3>
          <SmartCalendar 
            events={sampleEvents.filter(event => ['class', 'academic', 'deadline'].includes(event.type))}
            onEventClick={(eventId) => console.log('Academic event:', eventId)}
            onAddEvent={() => console.log('Add academic event')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social Events</h3>
          <SmartCalendar 
            events={sampleEvents.filter(event => ['social', 'meeting', 'milestone'].includes(event.type))}
            onEventClick={(eventId) => console.log('Social event:', eventId)}
            onAddEvent={() => console.log('Add social event')}
          />
        </div>
      </div>
    </div>
  )
};

// 7. SOCIAL DISCOVERY STORY - High overlap scenarios
export const SocialDiscovery: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Discovery Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How the calendar helps students discover social opportunities and coordinate with peers
        </p>
      </div>
      
      <SmartCalendar 
        events={[
          {
            id: 'high-overlap-class',
            title: 'Psychology 1 - Introduction',
            time: 'Today, 11:00 AM - 12:30 PM',
            type: 'class',
            location: 'Memorial Auditorium',
            attendees: ['Prof. Johnson'],
            overlap: {
              count: 47,
              message: '47 classmates attending - great networking opportunity!'
            },
            isRecurring: true
          },
          {
            id: 'study-coordination',
            title: 'Group Study Session',
            time: 'Tomorrow, 6:00 PM - 8:00 PM',
            type: 'meeting',
            location: 'Green Library',
            attendees: ['Emma Wilson', 'David Park', 'Lisa Zhang'],
            overlap: {
              count: 12,
              message: 'Study group formed with 3 close friends + 9 classmates interested'
            }
          },
          {
            id: 'social-event',
            title: 'Dorm Floor Movie Night',
            time: 'Friday, 8:00 PM - 11:00 PM',
            type: 'social',
            location: 'Dorm Common Room',
            attendees: ['Floor 3B Residents'],
            overlap: {
              count: 18,
              message: '18 floor mates confirmed - perfect for making new friends!'
            }
          }
        ]}
        onEventClick={(eventId) => console.log('Social discovery event:', eventId)}
        onAddEvent={() => console.log('Add social event')}
      />
    </div>
  )
};

// 8. CAMPUS SCENARIOS STORY - Different student schedules
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Schedule Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How different types of students use their smart calendar
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Busy Sophomore</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Jake balances demanding coursework with active social participation
          </p>
          <SmartCalendar 
            events={[
              {
                id: 'calc-class',
                title: 'Calculus II',
                time: 'Today, 9:00 AM - 10:20 AM',
                type: 'class',
                location: 'Math Building 51',
                attendees: ['Prof. Chen'],
                isRecurring: true,
                overlap: { count: 23, message: '23 classmates in this section' }
              },
              {
                id: 'lab-work',
                title: 'Chemistry Lab',
                time: 'Today, 2:00 PM - 5:00 PM',
                type: 'class',
                location: 'Mudd Chemistry',
                attendees: ['Lab Partner: Maria'],
                overlap: { count: 2, message: 'Lab with partner Maria' }
              },
              {
                id: 'club-meeting',
                title: 'Debate Team Practice',
                time: 'Tomorrow, 7:00 PM - 9:00 PM',
                type: 'social',
                location: 'Building 200',
                attendees: ['Debate Team'],
                overlap: { count: 15, message: '15 team members expected' }
              }
            ]}
            onEventClick={(eventId) => console.log('Busy student event:', eventId)}
            onAddEvent={() => console.log('Add event')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Graduate Researcher</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Dr. Patel focuses on research milestones with selective social engagement
          </p>
          <SmartCalendar 
            events={[
              {
                id: 'advisor-meeting',
                title: 'Advisor Meeting - Research Progress',
                time: 'Today, 3:00 PM - 4:00 PM',
                type: 'meeting',
                location: 'Clark Center S362',
                attendees: ['Prof. Williams'],
                isRecurring: true
              },
              {
                id: 'thesis-defense',
                title: 'Thesis Defense Deadline',
                time: 'March 15, All Day',
                type: 'milestone',
                location: 'Graduate School',
                attendees: [],
                hasReminder: true
              },
              {
                id: 'research-seminar',
                title: 'CS Research Seminar',
                time: 'Friday, 4:15 PM - 5:15 PM',
                type: 'academic',
                location: 'Gates 463A',
                attendees: ['Research Community'],
                overlap: { count: 8, message: '8 researchers from your field attending' }
              }
            ]}
            onEventClick={(eventId) => console.log('Graduate event:', eventId)}
            onAddEvent={() => console.log('Add research event')}
          />
        </div>
      </div>
    </div>
  )
};

// 9. DEADLINE MANAGEMENT STORY - Academic pressure periods
export const DeadlineManagement: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Deadline Management
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How the calendar helps students manage academic deadlines and milestones
        </p>
      </div>
      
      <SmartCalendar 
        events={[
          {
            id: 'midterm-exam',
            title: 'Physics Midterm Exam',
            time: 'Tomorrow, 2:00 PM - 4:00 PM',
            type: 'class',
            location: 'Hewlett 200',
            attendees: ['Class Section A'],
            hasReminder: true,
            reminderMinutes: 60,
            overlap: { count: 45, message: '45 classmates taking the same exam' }
          },
          {
            id: 'project-due',
            title: 'CS Project Final Submission',
            time: 'Friday, 11:59 PM',
            type: 'deadline',
            location: 'Online Submission',
            attendees: [],
            hasReminder: true,
            reminderMinutes: 120
          },
          {
            id: 'presentation',
            title: 'Research Presentation',
            time: 'Monday, 10:00 AM - 10:30 AM',
            type: 'academic',
            location: 'Conference Room B',
            attendees: ['Research Committee'],
            hasReminder: true,
            reminderMinutes: 30
          },
          {
            id: 'registration',
            title: 'Course Registration Opens',
            time: 'Next Week, 8:00 AM',
            type: 'milestone',
            location: 'Online',
            attendees: [],
            hasReminder: true,
            reminderMinutes: 1440
          }
        ]}
        onEventClick={(eventId) => console.log('Deadline event:', eventId)}
        onAddEvent={() => console.log('Add deadline')}
      />
    </div>
  )
};

// 10. SOCIAL vs UTILITY STORY - Different usage patterns
export const SocialVsUtility: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social vs Utility Usage
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How the calendar serves both social coordination and academic utility
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social-Focused Usage</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Emphasizes event discovery, peer coordination, and community building
          </p>
          <SmartCalendar 
            events={[
              {
                id: 'social-1',
                title: 'Campus Festival Committee',
                time: 'Today, 6:00 PM - 8:00 PM',
                type: 'social',
                location: 'Student Union',
                attendees: ['Festival Team'],
                overlap: { count: 25, message: '25 volunteers coordinating together' }
              },
              {
                id: 'social-2',
                title: 'International Students Dinner',
                time: 'Saturday, 7:00 PM - 10:00 PM',
                type: 'social',
                location: 'Dining Hall',
                attendees: ['International Community'],
                overlap: { count: 67, message: '67 international students confirmed' }
              },
              {
                id: 'social-3',
                title: 'Study Group Social Hour',
                time: 'Sunday, 4:00 PM - 6:00 PM',
                type: 'meeting',
                location: 'Coffee Shop',
                attendees: ['Study Friends'],
                overlap: { count: 8, message: 'Casual hangout with 8 study buddies' }
              }
            ]}
            onEventClick={(eventId) => console.log('Social event:', eventId)}
            onAddEvent={() => console.log('Add social event')}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Utility-Focused Usage</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Emphasizes academic scheduling, deadline tracking, and productivity
          </p>
          <SmartCalendar 
            events={[
              {
                id: 'utility-1',
                title: 'Advanced Algorithms Final',
                time: 'Wednesday, 3:30 PM - 6:30 PM',
                type: 'class',
                location: 'Exam Hall',
                attendees: [],
                hasReminder: true,
                reminderMinutes: 180
              },
              {
                id: 'utility-2',
                title: 'Research Paper Deadline',
                time: 'Friday, 11:59 PM',
                type: 'deadline',
                location: 'Online Submission',
                attendees: [],
                hasReminder: true,
                reminderMinutes: 240
              },
              {
                id: 'utility-3',
                title: 'PhD Qualifying Exam Prep',
                time: 'Daily, 9:00 AM - 11:00 AM',
                type: 'academic',
                location: 'Library Study Room',
                attendees: [],
                isRecurring: true
              }
            ]}
            onEventClick={(eventId) => console.log('Utility event:', eventId)}
            onAddEvent={() => console.log('Add academic event')}
          />
        </div>
      </div>
    </div>
  )
};