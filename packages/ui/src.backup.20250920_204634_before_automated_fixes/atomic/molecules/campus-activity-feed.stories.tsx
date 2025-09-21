import type { Meta, StoryObj } from '@storybook/react';
import { CampusActivityFeed } from './campus-activity-feed';

const meta: Meta<typeof CampusActivityFeed> = {
  title: 'HIVE/Profile/CampusActivityFeed',
  component: CampusActivityFeed,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'hive-dark',
      values: [
        { name: 'hive-dark', value: 'var(--hive-background-primary)' },
        { name: 'hive-obsidian', value: 'var(--hive-background-primary)' },
      ],
    },
    docs: {
      description: {
        component: 'Campus Activity Feed with sophisticated timeline aesthetic. Shows real-time campus life with elegant hover states and social-first information hierarchy.',
      },
    },
  },
  argTypes: {
    onActivityClick: { action: 'activity clicked' },
    onViewAll: { action: 'view all clicked' },
    onFilterChange: { action: 'filter changed' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    showFilters: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    maxItems: {
      control: { type: 'number', min: 1, max: 20 },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-2xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampusActivityFeed>;

// Mock activities data;
const mockActivities = [
  {
    id: '1',
    type: 'announcement' as const,
    title: 'Midterm Exam Schedule Released',
    content: 'Your Computer Science 101 midterm has been scheduled for Friday, January 26th at 10:00 AM in the main lecture hall.',
    author: {
      name: 'Prof. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=32&h=32&fit=crop&crop=face',
      handle: 'prof_chen'
    },
    space: {
      id: 'cs101',
      name: 'CS 101: Intro to Programming',
      type: 'course' as const;
    },
    timestamp: '2024-01-15T14:30:00Z',
    priority: 'high' as const,
    isUnread: true,
    metadata: {
      likes: 12,
      replyCount: 8,
      eventDate: '2024-01-26T10:00:00Z'
    }
  },
  {
    id: '2',
    type: 'message' as const,
    title: 'Study Group Formation',
    content: 'Hey everyone! Looking to form a study group for the upcoming midterm. We can meet in the library every Tuesday and Thursday.',
    author: {
      name: 'Marcus Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      handle: 'marcus_builds'
    },
    space: {
      id: 'cs101',
      name: 'CS 101: Intro to Programming',
      type: 'course' as const;
    },
    timestamp: '2024-01-15T13:45:00Z',
    priority: 'medium' as const,
    isUnread: true,
    metadata: {
      likes: 5,
      replyCount: 3
    }
  },
  {
    id: '3',
    type: 'social' as const,
    title: 'Dorm Game Night Tonight!',
    content: 'Join us in the common room at 8 PM for board games and pizza. All West Campus residents welcome!',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      handle: 'alex_r'
    },
    space: {
      id: 'west-campus',
      name: 'West Campus Residents',
      type: 'housing' as const;
    },
    timestamp: '2024-01-15T12:15:00Z',
    priority: 'medium' as const,
    metadata: {
      likes: 18,
      replyCount: 12,
      eventDate: '2024-01-15T20:00:00Z'
    }
  },
  {
    id: '4',
    type: 'assignment' as const,
    title: 'Programming Assignment 3 Posted',
    content: 'New assignment focusing on data structures and algorithms. Due next Friday.',
    author: {
      name: 'TA Jordan Kim',
      handle: 'jordan_ta'
    },
    space: {
      id: 'cs101',
      name: 'CS 101: Intro to Programming',
      type: 'course' as const;
    },
    timestamp: '2024-01-15T11:00:00Z',
    priority: 'high' as const,
    isUnread: false,
    metadata: {
      attachmentCount: 2,
      dueDate: '2024-01-22T23:59:00Z'
    }
  },
  {
    id: '5',
    type: 'achievement' as const,
    title: 'Congratulations! Tool Featured',
    content: 'Your study planner tool has been featured in the HIVE showcase and gained 50+ users this week!',
    timestamp: '2024-01-15T09:30:00Z',
    priority: 'medium' as const,
    metadata: {
      likes: 24
    }
  },
  {
    id: '6',
    type: 'event' as const,
    title: 'Robotics Club Meeting',
    content: 'Weekly meeting to discuss the upcoming competition. New members welcome!',
    author: {
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face',
      handle: 'priya_robotics'
    },
    space: {
      id: 'robotics',
      name: 'Robotics Club',
      type: 'club' as const;
    },
    timestamp: '2024-01-14T16:45:00Z',
    priority: 'medium' as const,
    metadata: {
      eventDate: '2024-01-18T19:00:00Z',
      replyCount: 6
    }
  },
  {
    id: '7',
    type: 'space_join' as const,
    title: 'New Member Joined',
    content: 'David Park has joined your Study Abroad Alumni space',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face',
      handle: 'dpark_music'
    },
    space: {
      id: 'study-abroad',
      name: 'Study Abroad Alumni',
      type: 'community' as const;
    },
    timestamp: '2024-01-14T14:20:00Z',
    priority: 'low' as const;
  },
  {
    id: '8',
    type: 'tool_created' as const,
    title: 'New Tool: Class Schedule Optimizer',
    content: 'Emily created a smart tool to help optimize your class schedule based on your preferences and requirements.',
    author: {
      name: 'Dr. Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face',
      handle: 'ewatson_phd'
    },
    timestamp: '2024-01-14T10:15:00Z',
    priority: 'medium' as const,
    metadata: {
      likes: 15,
      replyCount: 4
    }
  }
];

// Default Story - Active Feed;
export const Default: Story = {
  args: {
    activities: mockActivities.slice(0, 6),
    maxItems: 6,
  },
};

// Full Activity Feed;
export const FullFeed: Story = {
  args: {
    activities: mockActivities,
    maxItems: 8,
  },
};

// High Priority Activities;
export const HighPriority: Story = {
  args: {
    activities: mockActivities.filter(a => a.priority === 'high').concat(
      mockActivities.filter(a => a.priority !== 'high').slice(0, 3)
    ),
    maxItems: 6,
  },
};

// Recent Unread Activities;
export const WithUnread: Story = {
  args: {
    activities: mockActivities.map((activity, index) => ({
      ...activity,
      isUnread: index < 3
    })}}),
    maxItems: 6,
  },
};

// Compact Variant;
export const Compact: Story = {
  args: {
    activities: mockActivities.slice(0, 4),
    variant: 'compact',
    maxItems: 4,
  },
};

// Loading State;
export const Loading: Story = {
  args: {
    activities: [],
    isLoading: true,
  },
};

// Empty State;
export const Empty: Story = {
  args: {
    activities: [],
  },
};

// Few Activities;
export const FewActivities: Story = {
  args: {
    activities: mockActivities.slice(0, 2),
    maxItems: 4,
  },
};

// BentoGrid Layout Demo;
export const BentoGridLayout: Story = {
  args: {
    activities: mockActivities.slice(0, 5),
    maxItems: 5,
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed - Takes 1 column */}
            <div className="lg:col-span-1">
              <Story />
            </div>
            
            {/* Sidebar Content - 1 column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Today's Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-mercury text-sm">New Messages</span>
                    <span className="text-gold font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mercury text-sm">Upcoming Events</span>
                    <span className="text-emerald font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-mercury text-sm">Assignments Due</span>
                    <span className="text-red-400 font-medium">2</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <div>
                      <p className="text-mercury text-sm">Robotics Meeting</p>
                      <p className="text-steel text-xs">Thursday 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <div>
                      <p className="text-mercury text-sm">CS 101 Midterm</p>
                      <p className="text-steel text-xs">Friday 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

// Mobile Layout Test;
export const Mobile: Story = {
  args: {
    activities: mockActivities.slice(0, 4),
    maxItems: 4,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};