import type { Meta, StoryObj } from '@storybook/react';
import { CampusBuilderTools } from './campus-builder-tools';

const meta: Meta<typeof CampusBuilderTools> = {
  title: 'HIVE/Profile/CampusBuilderTools',
  component: CampusBuilderTools,
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
        component: 'Campus Builder Tools with subtle, elegant treatment. Provides sophisticated building functionality without dominating the campus social experience.',
      },
    },
  },
  argTypes: {
    onToolClick: { action: 'tool clicked' },
    onCreateTool: { action: 'create tool clicked' },
    onViewTool: { action: 'view tool clicked' },
    onBecomeBuilder: { action: 'become builder clicked' },
    onViewAllCreated: { action: 'view all created clicked' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'subtle'],
    },
    isBuilder: {
      control: { type: 'boolean' },
    },
    showBecomeBuilder: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story: any) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampusBuilderTools>;

// Mock data
const mockAvailableTools = [
  {
    id: '1',
    name: 'Study Schedule Template',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Create personalized study schedules that adapt to your class times',
    icon: '📅',
    difficulty: 'beginner' as const,
    timeToCreate: '5 min',
    popularity: 5,
    usageCount: 1247
  },
  {
    id: '2',
    name: 'Grade Tracker Widget',
    type: 'widget' as const,
    category: 'academic' as const,
    description: 'Track your grades and GPA across all courses with visual insights',
    icon: '📊',
    difficulty: 'intermediate' as const,
    timeToCreate: '10 min',
    popularity: 4,
    usageCount: 892
  },
  {
    id: '3',
    name: 'Dorm Event Automation',
    type: 'automation' as const,
    category: 'social' as const,
    description: 'Automatically notify dorm mates about upcoming events and activities',
    icon: '🎉',
    difficulty: 'advanced' as const,
    timeToCreate: '20 min',
    popularity: 4,
    usageCount: 567,
    isPremium: true
  },
  {
    id: '4',
    name: 'Calendar Integration',
    type: 'integration' as const,
    category: 'utility' as const,
    description: 'Sync your class schedule with Google Calendar and other apps',
    icon: '🔗',
    difficulty: 'intermediate' as const,
    timeToCreate: '15 min',
    popularity: 5,
    usageCount: 1056
  },
  {
    id: '5',
    name: 'Custom Dashboard',
    type: 'custom' as const,
    category: 'productivity' as const,
    description: 'Build a personalized dashboard with widgets you choose',
    icon: '🎛️',
    difficulty: 'advanced' as const,
    timeToCreate: '30 min',
    popularity: 3,
    usageCount: 234,
    isLocked: true
  },
  {
    id: '6',
    name: 'Group Study Finder',
    type: 'template' as const,
    category: 'social' as const,
    description: 'Find and organize study groups with classmates',
    icon: '👥',
    difficulty: 'beginner' as const,
    timeToCreate: '8 min',
    popularity: 4,
    usageCount: 789
  }
];

const mockCreatedTools = [
  {
    id: 'c1',
    name: 'My Study Planner',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Personalized study schedule for CS courses',
    icon: '📚',
    createdAt: '2024-01-10T14:30:00Z',
    usageCount: 45,
    isPublic: true,
    likes: 12,
    isStarred: true
  },
  {
    id: 'c2',
    name: 'Dorm Chore Tracker',
    type: 'widget' as const,
    category: 'utility' as const,
    description: 'Track shared chores with roommates',
    icon: '🏠',
    createdAt: '2024-01-08T09:15:00Z',
    usageCount: 23,
    isPublic: false,
    likes: 0
  },
  {
    id: 'c3',
    name: 'Club Meeting Reminder',
    type: 'automation' as const,
    category: 'social' as const,
    description: 'Automated reminders for robotics club meetings',
    icon: '🤖',
    createdAt: '2024-01-05T16:45:00Z',
    usageCount: 67,
    isPublic: true,
    likes: 8
  },
  {
    id: 'c4',
    name: 'Grade Calculator Pro',
    type: 'custom' as const,
    category: 'academic' as const,
    description: 'Advanced grade calculations with weighted categories',
    icon: '🧮',
    createdAt: '2024-01-03T11:20:00Z',
    usageCount: 156,
    isPublic: true,
    likes: 34,
    isStarred: true
  }
];

// Non-Builder Stories - Subtle Invitation
export const NonBuilderInvitation: Story = {
  args: {
    availableTools: mockAvailableTools,
    createdTools: [],
    isBuilder: false,
    showBecomeBuilder: true,
  },
};

// Builder Stories - Full Functionality
export const BuilderDefault: Story = {
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true,
  },
};

export const BuilderWithManyTools: Story = {
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true,
  },
};

export const BuilderNewUser: Story = {
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: [],
    isBuilder: true,
  },
};

export const BuilderActiveCreator: Story = {
  args: {
    availableTools: mockAvailableTools,
    createdTools: mockCreatedTools,
    isBuilder: true,
  },
};

// Loading State
export const Loading: Story = {
  args: {
    availableTools: [],
    createdTools: [],
    isBuilder: true,
    isLoading: true,
  },
};

// Compact Variant
export const Compact: Story = {
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
    variant: 'compact',
  },
};

// Subtle Variant (for non-prominent placement)
export const Subtle: Story = {
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
    variant: 'subtle',
  },
};

// BentoGrid Layout Demo - Showing Subtle Integration
export const BentoGridLayout: Story = {
  args: {
    availableTools: mockAvailableTools.slice(0, 4),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
  },
  decorators: [
    (Story: any) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Profile Content - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Campus Identity Header */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 flex items-center justify-center">
                    <span className="text-platinum text-xl font-bold">SC</span>
                  </div>
                  <div>
                    <h2 className="text-platinum font-bold text-xl">Sarah Chen</h2>
                    <p className="text-mercury text-sm">Computer Science • Class of '26</p>
                    <p className="text-mercury text-sm">West Campus</p>
                  </div>
                </div>
              </div>

              {/* Campus Activity */}
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center">
                      <span className="text-sm">📢</span>
                    </div>
                    <div>
                      <p className="text-mercury text-sm">Midterm schedule posted in CS 101</p>
                      <p className="text-steel text-xs">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Builder Tools - Subtle Sidebar Treatment */}
            <div className="lg:col-span-1">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

// Non-Builder in Context (Shows subtle invitation alongside main profile)
export const NonBuilderInContext: Story = {
  args: {
    availableTools: mockAvailableTools,
    createdTools: [],
    isBuilder: false,
    showBecomeBuilder: true,
  },
  decorators: [
    (Story: any) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main campus content dominates */}
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
                <h3 className="text-platinum font-semibold mb-4">Your Campus Spaces</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📚</span>
                    <div>
                      <p className="text-platinum text-sm font-medium">CS 101: Intro to Programming</p>
                      <p className="text-mercury text-xs">847 members • 3 unread</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🏠</span>
                    <div>
                      <p className="text-platinum text-sm font-medium">West Campus Residents</p>
                      <p className="text-mercury text-xs">234 members • 12 unread</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle builder invitation - doesn't dominate */}
            <div className="lg:col-span-1">
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

// Mobile Layout Test
export const Mobile: Story = {
  args: {
    availableTools: mockAvailableTools.slice(0, 3),
    createdTools: mockCreatedTools.slice(0, 2),
    isBuilder: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};