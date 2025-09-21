import type { Meta, StoryObj } from '@storybook/react';
import { CampusSpacesCard } from './campus-spaces-card';

const meta: Meta<typeof CampusSpacesCard> = {
  title: 'HIVE/Spaces/Molecules/CampusSpacesCard',
  component: CampusSpacesCard,
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
        component: 'Campus Spaces Card with sophisticated BentoGrid aesthetic. Shows user\'s joined campus spaces with elegant hover states and social-first information hierarchy.',
      },
    },
  },
  argTypes: {
    onSpaceClick: { action: 'space clicked' },
    onJoinSpace: { action: 'join space clicked' },
    onViewAll: { action: 'view all clicked' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    showQuickActions: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampusSpacesCard>;

// Mock spaces data;
const mockSpaces = [
  {
    id: '1',
    name: 'CS 101: Intro to Programming',
    type: 'course' as const,
    memberCount: 847,
    unreadCount: 3,
    lastActivity: '2024-01-15T10:30:00Z',
    isPinned: true,
    recentActivity: {
      type: 'announcement' as const,
      preview: 'Midterm exam scheduled for next Friday',
      timestamp: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    name: 'West Campus Residents',
    type: 'housing' as const,
    memberCount: 234,
    unreadCount: 12,
    lastActivity: '2024-01-15T09:15:00Z',
    isFavorite: true,
    recentActivity: {
      type: 'message' as const,
      preview: 'Anyone want to grab dinner tonight?',
      timestamp: '2024-01-15T09:15:00Z'
    }
  },
  {
    id: '3',
    name: 'Robotics Club',
    type: 'club' as const,
    memberCount: 156,
    lastActivity: '2024-01-14T16:45:00Z',
    recentActivity: {
      type: 'event' as const,
      preview: 'Weekly meeting moved to Thursday',
      timestamp: '2024-01-14T16:45:00Z'
    }
  },
  {
    id: '4',
    name: 'Study Abroad Alumni',
    type: 'community' as const,
    memberCount: 89,
    unreadCount: 1,
    lastActivity: '2024-01-13T14:20:00Z',
    recentActivity: {
      type: 'message' as const,
      preview: 'Share your favorite study abroad memories!',
      timestamp: '2024-01-13T14:20:00Z'
    }
  },
  {
    id: '5',
    name: 'Engineering Peer Mentors',
    type: 'mentoring' as const,
    memberCount: 45,
    lastActivity: '2024-01-12T11:30:00Z',
    isPrivate: true,
    recentActivity: {
      type: 'announcement' as const,
      preview: 'New mentee applications are now open',
      timestamp: '2024-01-12T11:30:00Z'
    }
  },
  {
    id: '6',
    name: 'Class of 2026',
    type: 'graduation' as const,
    memberCount: 1203,
    unreadCount: 24,
    lastActivity: '2024-01-15T08:00:00Z',
    recentActivity: {
      type: 'announcement' as const,
      preview: 'Senior year course registration opens Monday',
      timestamp: '2024-01-15T08:00:00Z'
    }
  },
  {
    id: '7',
    name: 'Hackathon Team Alpha',
    type: 'academic' as const,
    memberCount: 12,
    lastActivity: '2024-01-14T20:15:00Z',
    recentActivity: {
      type: 'message' as const,
      preview: 'Great work on the prototype everyone!',
      timestamp: '2024-01-14T20:15:00Z'
    }
  }
];

// Default Story - Active Student;
export const Default: Story = {
  args: {
    spaces: mockSpaces.slice(0, 5),
    showQuickActions: true,
  },
};

// Many Spaces - Shows pagination;
export const ManySpaces: Story = {
  args: {
    spaces: mockSpaces,
    showQuickActions: true,
  },
};

// Few Spaces;
export const FewSpaces: Story = {
  args: {
    spaces: mockSpaces.slice(0, 2),
    showQuickActions: true,
  },
};

// Empty State;
export const Empty: Story = {
  args: {
    spaces: [],
    showQuickActions: true,
  },
};

// Loading State;
export const Loading: Story = {
  args: {
    spaces: [],
    isLoading: true,
  },
};

// Without Quick Actions;
export const NoQuickActions: Story = {
  args: {
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: false,
  },
};

// High Activity Spaces;
export const HighActivity: Story = {
  args: {
    spaces: [
      {
        ...mockSpaces[0],
        unreadCount: 99,
        isPinned: true,
      },
      {
        ...mockSpaces[1],
        unreadCount: 156,
        isFavorite: true,
      },
      {
        ...mockSpaces[2],
        unreadCount: 42,
      },
    ],
    showQuickActions: true,
  },
};

// BentoGrid Layout Demo;
export const BentoGridLayout: Story = {
  args: {
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: true,
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campus Spaces - Takes 1 column */}
            <div className="lg:col-span-1">
              <Story />
            </div>
            
            {/* Main Content Area - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Campus Activity Feed</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center">
                      <span className="text-xs">📚</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">New assignment posted in CS 101</p>
                      <p className="text-steel text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                      <span className="text-xs">🏠</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">Dorm meeting tonight at 7 PM</p>
                      <p className="text-steel text-xs">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gold">5</div>
                    <div className="text-xs text-mercury">Active Spaces</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald">24</div>
                    <div className="text-xs text-mercury">Unread Messages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-platinum">12</div>
                    <div className="text-xs text-mercury">This Week</div>
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
    spaces: mockSpaces.slice(0, 4),
    showQuickActions: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};