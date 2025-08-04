import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from '../../atomic/pages/dashboard-page';

// Mock data for realistic dashboard content
const mockUser = {
  id: 'user-123',
  name: 'Alex Rodriguez',
  handle: 'alexr',
  email: 'alex.rodriguez@university.edu',
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isBuilder: true,
  userType: 'student' as const,
  major: 'Computer Science',
  year: 'Junior',
  university: 'Tech University',
  stats: {
    spacesJoined: 12,
    toolsUsed: 8,
    connectionsCount: 47,
    currentStreak: 15,
  },
};

const mockSpaces = [
  {
    id: 'space-1',
    name: 'CS Study Group',
    description: 'Weekly study sessions for computer science courses',
    memberCount: 24,
    type: 'study' as const,
    isActive: true,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'space-2', 
    name: 'Dorm Floor 3B',
    description: 'Our floor community for events and coordination',
    memberCount: 18,
    type: 'residential' as const,
    isActive: true,
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'space-3',
    name: 'Tech Entrepreneurship Club',
    description: 'Building the next generation of startup founders',
    memberCount: 156,
    type: 'club' as const,
    isActive: false,
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockEvents = [
  {
    id: 'event-1',
    title: 'Data Structures Study Session',
    time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Library Room 201',
    spaceId: 'space-1',
    spaceName: 'CS Study Group',
    attendeeCount: 8,
  },
  {
    id: 'event-2',
    title: 'Floor Movie Night',
    time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    location: 'Floor 3B Lounge',
    spaceId: 'space-2',
    spaceName: 'Dorm Floor 3B',
    attendeeCount: 12,
  },
  {
    id: 'event-3',
    title: 'Startup Pitch Competition',
    time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Innovation Center',
    spaceId: 'space-3',
    spaceName: 'Tech Entrepreneurship Club',
    attendeeCount: 45,
  },
];

const mockNotifications = [
  {
    id: 'notif-1',
    type: 'event' as const,
    title: 'Study session starting in 30 minutes',
    message: 'Data Structures Study Session in Library Room 201',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'space' as const,
    title: 'New member joined CS Study Group',
    message: 'Sarah Chen joined the space',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'tool' as const,
    title: 'GPA Calculator updated',
    message: 'New features available in your GPA Calculator',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

const meta: Meta<typeof DashboardPage> = {
  title: '05-Pages/Dashboard Page',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main dashboard page showing user\'s spaces, upcoming events, and activity feed.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'Current user data',
    },
    spaces: {
      description: 'User\'s joined spaces',
    },
    upcomingEvents: {
      description: 'Upcoming events from user\'s spaces',
    },
    notifications: {
      description: 'Recent notifications',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state for the entire dashboard',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default dashboard state
export const Default: Story = {
  args: {
    user: mockUser,
    spaces: mockSpaces,
    upcomingEvents: mockEvents,
    notifications: mockNotifications,
    isLoading: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    user: mockUser,
    spaces: [],
    upcomingEvents: [],
    notifications: [],
    isLoading: true,
  },
};

// New user with minimal data
export const NewUser: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Jamie New',
      handle: 'jamien',
      isBuilder: false,
      stats: {
        spacesJoined: 0,
        toolsUsed: 0,
        connectionsCount: 0,
        currentStreak: 0,
      },
    },
    spaces: [],
    upcomingEvents: [],
    notifications: [],
    isLoading: false,
  },
};

// Power user with lots of activity
export const PowerUser: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Maria Power',
      handle: 'mariapower',
      isBuilder: true,
      stats: {
        spacesJoined: 28,
        toolsUsed: 15,
        connectionsCount: 234,
        currentStreak: 47,
      },
    },
    spaces: [
      ...mockSpaces,
      {
        id: 'space-4',
        name: 'Engineering Honors Society',
        description: 'Academic excellence in engineering',
        memberCount: 89,
        type: 'academic' as const,
        isActive: true,
        lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'space-5',
        name: 'Robotics Team',
        description: 'Building autonomous robots for competition',
        memberCount: 32,
        type: 'club' as const,
        isActive: true,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ],
    upcomingEvents: [
      ...mockEvents,
      {
        id: 'event-4',
        title: 'Honors Society Meeting',
        time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        location: 'Engineering Building 205',
        spaceId: 'space-4',
        spaceName: 'Engineering Honors Society',
        attendeeCount: 25,
      },
      {
        id: 'event-5',
        title: 'Robot Testing Session',
        time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        location: 'Robotics Lab',
        spaceId: 'space-5',
        spaceName: 'Robotics Team',
        attendeeCount: 15,
      },
    ],
    notifications: [
      ...mockNotifications,
      {
        id: 'notif-4',
        type: 'achievement' as const,
        title: 'Streak milestone reached!',
        message: 'You\'ve maintained a 45-day activity streak',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: false,
      },
    ],
    isLoading: false,
  },
};

// Builder user focused on tools
export const BuilderUser: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Dev Builder',
      handle: 'devbuilder',
      isBuilder: true,
      userType: 'builder' as const,
      stats: {
        spacesJoined: 8,
        toolsUsed: 25,
        connectionsCount: 89,
        currentStreak: 32,
      },
    },
    spaces: mockSpaces.filter(s => s.type === 'study' || s.type === 'club'),
    upcomingEvents: mockEvents.slice(0, 2),
    notifications: [
      {
        id: 'notif-builder-1',
        type: 'tool' as const,
        title: 'Your tool has 50+ users!',
        message: 'Schedule Optimizer is gaining popularity',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false,
      },
      {
        id: 'notif-builder-2',
        type: 'tool' as const,
        title: 'New tool review',
        message: 'Someone left a 5-star review on GPA Tracker',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
      },
    ],
    isLoading: false,
  },
};

// Grad student perspective
export const GradStudent: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Dr. Research',
      handle: 'drresearch',
      isBuilder: false,
      userType: 'graduate' as const,
      major: 'Computer Science PhD',
      year: 'PhD Candidate',
      stats: {
        spacesJoined: 6,
        toolsUsed: 12,
        connectionsCount: 156,
        currentStreak: 28,
      },
    },
    spaces: [
      {
        id: 'grad-space-1',
        name: 'CS Graduate Students',
        description: 'PhD and Masters students in Computer Science',
        memberCount: 67,
        type: 'academic' as const,
        isActive: true,
        lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'grad-space-2',
        name: 'Research Group - AI/ML',
        description: 'Dr. Smith\'s artificial intelligence research group',
        memberCount: 12,
        type: 'research' as const,
        isActive: true,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ],
    upcomingEvents: [
      {
        id: 'grad-event-1',
        title: 'Thesis Defense Practice',
        time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        location: 'Graduate Conference Room',
        spaceId: 'grad-space-2',
        spaceName: 'Research Group - AI/ML',
        attendeeCount: 8,
      },
    ],
    notifications: [
      {
        id: 'grad-notif-1',
        type: 'academic' as const,
        title: 'Conference paper accepted',
        message: 'Your ICML submission has been accepted!',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: false,
      },
    ],
    isLoading: false,
  },
};

// Mobile responsive view
export const Mobile: Story = {
  args: {
    user: mockUser,
    spaces: mockSpaces.slice(0, 2),
    upcomingEvents: mockEvents.slice(0, 2),
    notifications: mockNotifications.slice(0, 3),
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    user: mockUser,
    spaces: [],
    upcomingEvents: [],
    notifications: [],
    isLoading: false,
    error: 'Failed to load dashboard data. Please try again.',
  },
};