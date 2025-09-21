import type { Meta, StoryObj } from '@storybook/react';
import { CampusIdentityHeader } from './campus-identity-header';

const meta: Meta<typeof CampusIdentityHeader> = {
  title: 'HIVE/Profile/CampusIdentityHeader',
  component: CampusIdentityHeader,
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
        component: 'Campus Identity Header with sophisticated BentoGrid aesthetic. Prioritizes campus social identity over productivity features, with subtle builder treatment.',
      },
    },
  },
  argTypes: {
    onAvatarClick: { action: 'avatar clicked' },
    onEditClick: { action: 'edit clicked' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
    showStatus: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CampusIdentityHeader>;

// Default Story - Typical Student;
export const Default: Story = {
  args: {
    user: {
      name: 'Sarah Chen',
      handle: 'sarahc_cs',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
      year: '2026',
      major: 'Computer Science',
      dorm: 'West Campus',
      isOnline: true,
      isBuilder: false,
      completionPercentage: 85,
    },
    showStatus: true,
  },
};

// Builder Student;
export const Builder: Story = {
  args: {
    user: {
      name: 'Marcus Thompson',
      handle: 'marcus_builds',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
      year: '2025',
      major: 'Engineering',
      dorm: 'North Hall',
      isOnline: true,
      isBuilder: true,
      completionPercentage: 100,
    },
    showStatus: true,
  },
};

// New Student - Low Completion;
export const NewStudent: Story = {
  args: {
    user: {
      name: 'Alex Rivera',
      handle: 'alex_r',
      year: '2027',
      major: 'Biology',
      dorm: 'Freshman Quad',
      isOnline: false,
      isBuilder: false,
      completionPercentage: 25,
    },
    showStatus: true,
  },
};

// Without Avatar (Generated Initials)
export const WithoutAvatar: Story = {
  args: {
    user: {
      name: 'Jordan Kim',
      handle: 'jkim_design',
      year: '2025',
      major: 'Graphic Design',
      isOnline: true,
      isBuilder: false,
      completionPercentage: 60,
    },
    showStatus: true,
  },
};

// Graduate Student;
export const Graduate: Story = {
  args: {
    user: {
      name: 'Dr. Emily Watson',
      handle: 'ewatson_phd',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=face',
      year: 'PhD',
      major: 'Neuroscience',
      isOnline: true,
      isBuilder: true,
      completionPercentage: 95,
    },
    showStatus: true,
  },
};

// Mobile Layout Test;
export const Mobile: Story = {
  args: {
    user: {
      name: 'Tyler Jackson',
      handle: 'tjack_sports',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
      year: '2026',
      major: 'Kinesiology',
      dorm: 'Athletic Village',
      isOnline: true,
      isBuilder: false,
      completionPercentage: 70,
    },
    showStatus: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Without Status Indicators;
export const Minimal: Story = {
  args: {
    user: {
      name: 'Priya Patel',
      handle: 'priya_pre_med',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face',
      year: '2025',
      major: 'Pre-Medicine',
      dorm: 'Science House',
      isOnline: true,
      isBuilder: false,
      completionPercentage: 80,
    },
    showStatus: false,
  },
};

// Compact Variant;
export const Compact: Story = {
  args: {
    user: {
      name: 'David Park',
      handle: 'dpark_music',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop&crop=face',
      year: '2026',
      major: 'Music Production',
      isOnline: true,
      isBuilder: false,
      completionPercentage: 90,
    },
    variant: 'compact',
    showStatus: true,
  },
};

// BentoGrid Layout Demo;
export const BentoGridLayout: Story = {
  args: {
    user: {
      name: 'Sarah Chen',
      handle: 'sarahc_cs',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
      year: '2026',
      major: 'Computer Science',
      dorm: 'West Campus',
      isOnline: true,
      isBuilder: true,
      completionPercentage: 85,
    },
    showStatus: true,
  },
  decorators: [
    (Story) => (
      <div className="p-8 min-h-screen bg-obsidian">
        <div className="max-w-4xl mx-auto">
          {/* BentoGrid Layout Context */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Header - Spans 2 columns */}
            <div className="lg:col-span-2">
              <Story />
            </div>
            
            {/* Quick Stats Card */}
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
              <h3 className="text-platinum font-semibold mb-4">Campus Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-mercury text-sm">Spaces Joined</span>
                  <span className="text-platinum font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mercury text-sm">Tools Created</span>
                  <span className="text-gold font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mercury text-sm">Campus Streak</span>
                  <span className="text-emerald font-medium">12 days</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional BentoGrid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
              <h4 className="text-platinum font-medium mb-2">Your Spaces</h4>
              <p className="text-mercury text-sm">CS Study Group, Dorm Council, Hackathon Team</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
              <h4 className="text-platinum font-medium mb-2">Recent Activity</h4>
              <p className="text-mercury text-sm">Created study planner tool • 2 hours ago</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6">
              <h4 className="text-platinum font-medium mb-2">Campus Calendar</h4>
              <p className="text-mercury text-sm">CS101 Midterm • Tomorrow 9:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};