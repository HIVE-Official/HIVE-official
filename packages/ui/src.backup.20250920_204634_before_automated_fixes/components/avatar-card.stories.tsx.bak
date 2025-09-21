import type { Meta, StoryObj } from '@storybook/react';
import { AvatarCard } from './avatar-card';

const meta = {
  title: 'Molecules/Avatar Card',
  component: AvatarCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible avatar card component that combines an avatar with user information, status indicators, and role badges. Perfect for user profiles, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple sizes (sm, md, lg)
- Various user roles (student, builder, leader, verified)  
- Status indicators (online, offline, away, busy, ghost)
- Privacy modes (public, ghost, anonymous)
- Layout options (horizontal, vertical)
- Interactive hover states
- Campus-specific roles and affiliations
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'User\'s full name',
    },
    subtitle: {
      control: 'text',
      description: 'Additional information like major, year, or role',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size variant',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'ghost'],
      description: 'User\'s current activity status',
    },
    role: {
      control: 'select',
      options: ['student', 'builder', 'leader', 'verified'],
      description: 'User\'s role or verification status',
    },
    affiliation: {
      control: 'select',
      options: ['university', 'residential', 'greek'],
      description: 'Campus affiliation type',
    },
    privacy: {
      control: 'select',
      options: ['public', 'ghost', 'anonymous'],
      description: 'Privacy mode affecting avatar display',
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction for content',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover states and cursor pointer',
    },
    src: {
      control: 'text',
      description: 'Avatar image URL',
    },
  },
} satisfies Meta<typeof AvatarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Examples
export const Default: Story = {
  args: {
    name: 'Sarah Chen',
    subtitle: 'Computer Science • Junior',
    status: 'online',
    role: 'student',
  },
};

export const WithAvatar: Story = {
  args: {
    name: 'Alex Rodriguez',
    subtitle: 'Mathematics • Senior',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    role: 'builder',
  },
};

export const Interactive: Story = {
  args: {
    name: 'Emily Watson',
    subtitle: 'Psychology • Sophomore',
    status: 'online',
    role: 'verified',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards show hover effects and can be clicked.',
      },
    },
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    name: 'Maya Patel',
    subtitle: 'Biology',
    size: 'sm',
    status: 'online',
    role: 'student',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'Jordan Kim',
    subtitle: 'Engineering • Graduate Student',
    size: 'lg',
    status: 'away',
    role: 'leader',
    interactive: true,
  },
};

// Role Variants
export const StudentRole: Story = {
  args: {
    name: 'Chris Thompson',
    subtitle: 'History • Freshman',
    role: 'student',
    status: 'online',
  },
};

export const BuilderRole: Story = {
  args: {
    name: 'Sam Liu',
    subtitle: 'CS • Senior • Tool Creator',
    role: 'builder',
    status: 'online',
  },
};

export const LeaderRole: Story = {
  args: {
    name: 'Taylor Davis',
    subtitle: 'Space Leader • Business',
    role: 'leader',
    status: 'away',
  },
};

export const VerifiedRole: Story = {
  args: {
    name: 'Dr. Amanda Foster',
    subtitle: 'Faculty • Computer Science',
    role: 'verified',
    status: 'online',
  },
};

// Status Variants
export const OnlineStatus: Story = {
  args: {
    name: 'Ryan Mitchell',
    subtitle: 'Physics • Junior',
    status: 'online',
    role: 'student',
  },
};

export const AwayStatus: Story = {
  args: {
    name: 'Zoe Adams',
    subtitle: 'Art • Sophomore',
    status: 'away',
    role: 'builder',
  },
};

export const BusyStatus: Story = {
  args: {
    name: 'Marcus Johnson',
    subtitle: 'Engineering • Senior',
    status: 'busy',
    role: 'leader',
  },
};

export const GhostStatus: Story = {
  args: {
    name: 'Anonymous User',
    subtitle: 'Ghost Mode Active',
    status: 'ghost',
    privacy: 'ghost',
  },
};

// Layout Variants
export const HorizontalLayout: Story = {
  args: {
    name: 'Olivia Brown',
    subtitle: 'Literature • Junior',
    layout: 'horizontal',
    status: 'online',
    role: 'student',
  },
};

export const VerticalLayout: Story = {
  args: {
    name: 'Noah Wilson',
    subtitle: 'Chemistry • Senior',
    layout: 'vertical',
    status: 'online',
    role: 'builder',
    interactive: true,
  },
};

// Privacy Modes
export const PublicProfile: Story = {
  args: {
    name: 'Isabella Garcia',
    subtitle: 'Sociology • Junior',
    privacy: 'public',
    status: 'online',
    role: 'student',
  },
};

export const GhostMode: Story = {
  args: {
    name: 'Ghost User',
    subtitle: 'Privacy Mode Enabled',
    privacy: 'ghost',
    status: 'ghost',
  },
};

export const AnonymousMode: Story = {
  args: {
    name: 'Anonymous',
    subtitle: 'Hidden Identity',
    privacy: 'anonymous',
  },
};

// Campus Scenarios
export const StudyGroupMember: Story = {
  args: {
    name: 'Lucas Martinez',
    subtitle: 'CS 101 Study Group • Freshman',
    status: 'online',
    role: 'student',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Representing a member in a study group or academic space.',
      },
    },
  },
};

export const ResidentialAssistant: Story = {
  args: {
    name: 'Grace Lee',
    subtitle: 'RA • Smith Hall • Senior',
    status: 'online',
    role: 'leader',
    affiliation: 'residential',
    interactive: true,
  },
};

export const ToolCreator: Story = {
  args: {
    name: 'Daniel Park',
    subtitle: 'GPA Calculator Creator • CS',
    status: 'away',
    role: 'builder',
    interactive: true,
  },
};

export const SpaceLeader: Story = {
  args: {
    name: 'Sophia Rodriguez',
    subtitle: 'Debate Club President • Politics',
    status: 'online',
    role: 'leader',
    interactive: true,
  },
};

// Collection Examples
export const MembersList: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        Study Group Members
      </h3>
      <AvatarCard
        name="Sarah Chen"
        subtitle="CS • Group Leader"
        status="online"
        role="leader"
        interactive
      />
      <AvatarCard
        name="Alex Rodriguez"
        subtitle="CS • Active Member"
        status="online"
        role="builder"
        interactive
      />
      <AvatarCard
        name="Emily Watson"
        subtitle="Math • New Member"
        status="away"
        role="student"
        interactive
      />
      <AvatarCard
        name="Jordan Kim"
        subtitle="CS • Verified"
        status="online"
        role="verified"
        interactive
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of avatar cards in a member list layout.',
      },
    },
  },
};

export const QuickActions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-80">
      <AvatarCard
        name="Recent Chat"
        subtitle="Study Group"
        size="sm"
        status="online"
        interactive
      />
      <AvatarCard
        name="Maya Patel"
        subtitle="Lab Partner"
        size="sm"
        status="away"
        role="student"
        interactive
      />
      <AvatarCard
        name="Tool Collab"
        subtitle="GPA Calc Team"
        size="sm"
        status="online"
        role="builder"
        interactive
      />
      <AvatarCard
        name="Office Hours"
        subtitle="Prof. Smith"
        size="sm"
        status="busy"
        role="verified"
        interactive
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact avatar cards for quick access or dashboard widgets.',
      },
    },
  },
};