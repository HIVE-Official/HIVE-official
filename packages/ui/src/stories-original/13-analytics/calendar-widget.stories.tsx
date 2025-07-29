import type { Meta, StoryObj } from '@storybook/react';
import { CalendarWidget, mockCalendarData } from '../../components/dashboard/calendar-widget';
import type { CalendarWidgetData } from '../../components/dashboard/calendar-widget';

const meta: Meta<typeof CalendarWidget> = {
  title: 'Dashboard/CalendarWidget',
  component: CalendarWidget,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Calendar Widget Component

The Calendar Widget provides a comprehensive view of upcoming events, deadlines, and schedule management for students. Features include:

- **Today's Schedule**: Current day events with time, location, and attendee information
- **Upcoming Deadlines**: Assignment and project due dates with priority indicators
- **Weekly View**: Navigate through weeks to see upcoming events
- **Event Management**: Quick access to view, edit, and create new events
- **Multi-type Events**: Support for academic, personal, space, and social events

## Event Types

- **Academic**: Classes, lectures, office hours
- **Personal**: Personal appointments and reminders
- **Space**: Events within specific HIVE spaces
- **Social**: Campus social events and activities

## Design System

Built with HIVE's liquid metal motion system and color-coded event types for easy visual organization.
        `
      }
    }
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Shows skeleton loading state'
    },
    viewMode: {
      control: 'select',
      options: ['month', 'week', 'agenda'],
      description: 'Default view mode for the calendar'
    },
    onEventClick: {
      action: 'event-clicked',
      description: 'Callback when an event is clicked'
    },
    onDateSelect: {
      action: 'date-selected',
      description: 'Callback when a date is selected'
    },
    onAddEvent: {
      action: 'add-event',
      description: 'Callback when add event button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof CalendarWidget>;

// Default story with comprehensive calendar data
export const Default: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false,
    viewMode: 'agenda'
  }
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true
  }
};

// Error state (no data)
export const NoData: Story = {
  args: {
    data: undefined,
    isLoading: false
  }
};

// Busy schedule with many events
export const BusySchedule: Story = {
  args: {
    data: {
      events: [
        {
          id: 'event_1',
          title: 'CS 101 Lecture',
          description: 'Introduction to Computer Science',
          startTime: '09:00',
          endTime: '10:30',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Room 204',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          color: 'blue',
          reminderSet: true
        },
        {
          id: 'event_2',
          title: 'Study Group',
          description: 'Algorithms and Data Structures',
          startTime: '11:00',
          endTime: '12:30',
          date: new Date().toISOString().split('T')[0],
          type: 'space',
          location: 'Library',
          spaceId: 'study_groups',
          spaceName: 'Study Groups',
          attendeeCount: 5,
          color: 'purple',
          reminderSet: true
        },
        {
          id: 'event_3',
          title: 'Lunch Meeting',
          startTime: '12:30',
          endTime: '13:30',
          date: new Date().toISOString().split('T')[0],
          type: 'social',
          location: 'Campus Cafe',
          attendeeCount: 3,
          color: 'orange'
        },
        {
          id: 'event_4',
          title: 'CS Lab Session',
          startTime: '14:00',
          endTime: '16:00',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Computer Lab A',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          color: 'blue',
          reminderSet: true
        },
        {
          id: 'event_5',
          title: 'Office Hours',
          startTime: '16:30',
          endTime: '17:30',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Professor Office',
          color: 'blue'
        }
      ],
      upcomingDeadlines: [
        {
          id: 'deadline_1',
          title: 'Math Assignment 3',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          type: 'assignment',
          spaceId: 'math_study',
          spaceName: 'Math Study Group',
          priority: 'high'
        },
        {
          id: 'deadline_2',
          title: 'CS Project Proposal',
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
          type: 'project',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          priority: 'medium'
        },
        {
          id: 'deadline_3',
          title: 'Essay First Draft',
          dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
          type: 'assignment',
          priority: 'medium'
        },
        {
          id: 'deadline_4',
          title: 'Final Exam',
          dueDate: new Date(Date.now() + 604800000).toISOString().split('T')[0], // 1 week
          type: 'exam',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          priority: 'high'
        }
      ]
    },
    isLoading: false
  }
};

// Light schedule with few events
export const LightSchedule: Story = {
  args: {
    data: {
      events: [
        {
          id: 'event_1',
          title: 'Morning Lecture',
          startTime: '10:00',
          endTime: '11:30',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Room 101',
          color: 'blue'
        }
      ],
      upcomingDeadlines: [
        {
          id: 'deadline_1',
          title: 'Reading Assignment',
          dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days
          type: 'assignment',
          priority: 'low'
        }
      ]
    },
    isLoading: false
  }
};

// Empty schedule
export const EmptySchedule: Story = {
  args: {
    data: {
      events: [],
      upcomingDeadlines: []
    },
    isLoading: false
  }
};

// Academic-focused schedule
export const AcademicFocus: Story = {
  args: {
    data: {
      events: [
        {
          id: 'event_1',
          title: 'Linear Algebra Lecture',
          startTime: '09:00',
          endTime: '10:30',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Math Building 302',
          color: 'blue',
          reminderSet: true
        },
        {
          id: 'event_2',
          title: 'Algorithm Design Seminar',
          startTime: '14:00',
          endTime: '15:30',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'CS Building 101',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          color: 'blue',
          reminderSet: true
        },
        {
          id: 'event_3',
          title: 'Research Meeting',
          startTime: '16:00',
          endTime: '17:00',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Professor Office',
          color: 'blue'
        }
      ],
      upcomingDeadlines: [
        {
          id: 'deadline_1',
          title: 'Calculus Problem Set 8',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          type: 'assignment',
          priority: 'high'
        },
        {
          id: 'deadline_2',
          title: 'CS Research Paper',
          dueDate: new Date(Date.now() + 604800000).toISOString().split('T')[0],
          type: 'project',
          spaceId: 'cs_majors',
          spaceName: 'CS Majors',
          priority: 'high'
        }
      ]
    },
    isLoading: false
  }
};

// Social-focused schedule
export const SocialFocus: Story = {
  args: {
    data: {
      events: [
        {
          id: 'event_1',
          title: 'Coffee Chat',
          startTime: '10:00',
          endTime: '11:00',
          date: new Date().toISOString().split('T')[0],
          type: 'social',
          location: 'Campus Cafe',
          attendeeCount: 3,
          color: 'orange'
        },
        {
          id: 'event_2',
          title: 'Club Meeting',
          startTime: '18:00',
          endTime: '19:30',
          date: new Date().toISOString().split('T')[0],
          type: 'social',
          location: 'Student Center',
          spaceId: 'tech_club',
          spaceName: 'Tech Club',
          attendeeCount: 15,
          color: 'orange',
          reminderSet: true
        },
        {
          id: 'event_3',
          title: 'Study Party',
          startTime: '19:00',
          endTime: '21:00',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          type: 'social',
          location: 'Dorm Common Room',
          attendeeCount: 8,
          color: 'orange'
        }
      ],
      upcomingDeadlines: []
    },
    isLoading: false
  }
};

// Mixed event types
export const MixedEvents: Story = {
  args: {
    data: {
      events: [
        {
          id: 'event_1',
          title: 'All Day Conference',
          startTime: '00:00',
          endTime: '23:59',
          date: new Date().toISOString().split('T')[0],
          type: 'academic',
          location: 'Convention Center',
          isAllDay: true,
          color: 'blue',
          reminderSet: true
        },
        {
          id: 'event_2',
          title: 'Doctor Appointment',
          startTime: '15:00',
          endTime: '16:00',
          date: new Date().toISOString().split('T')[0],
          type: 'personal',
          location: 'Health Center',
          color: 'green',
          reminderSet: true
        },
        {
          id: 'event_3',
          title: 'Space Hackathon',
          startTime: '18:00',
          endTime: '22:00',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          type: 'space',
          location: 'Maker Space',
          spaceId: 'makers',
          spaceName: 'Maker Space',
          attendeeCount: 20,
          color: 'purple',
          reminderSet: true
        }
      ],
      upcomingDeadlines: [
        {
          id: 'deadline_1',
          title: 'Mixed Priority Assignment',
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          type: 'assignment',
          priority: 'medium'
        }
      ]
    },
    isLoading: false
  }
};

// Mobile viewport
export const Mobile: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Dark mode variant
export const DarkMode: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

// Interactive demo with all actions
export const InteractiveDemo: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false,
    onEventClick: (eventId: string) => {
      console.log(`Event clicked: ${eventId}`);
    },
    onDateSelect: (date: Date) => {
      console.log(`Date selected: ${date.toDateString()}`);
    },
    onAddEvent: () => {
      console.log('Add event requested');
    }
  }
};

// Week view mode
export const WeekView: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false,
    viewMode: 'week'
  }
};

// Month view mode
export const MonthView: Story = {
  args: {
    data: mockCalendarData,
    isLoading: false,
    viewMode: 'month'
  }
};