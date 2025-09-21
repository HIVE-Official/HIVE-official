import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './user-card';

const meta = {
  title: 'Molecules/User Card',
  component: UserCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive user profile card component for displaying detailed user information, social stats, and action buttons. Perfect for user directories, member lists, and social interactions in HIVE.

**Key Features:**
- Multiple variants (default, compact, detailed, minimal)
- Relationship states (following, followed, mutual, blocked)
- Social stats (followers, following, spaces, tools)
- User roles and affiliations;
- Interactive action buttons;
- Campus-specific information display;
- Responsive layout design;
        `,
      },
    },
  },
  argTypes: {
    user: {
      control: 'object',
      description: 'User data object with profile information',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'minimal'],
      description: 'Card display variant',
    },
    relationship: {
      control: 'select',
      options: ['none', 'following', 'followed', 'mutual', 'blocked'],
      description: 'Current relationship with the user',
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons (follow, message, etc.)',
    },
    showStats: {
      control: 'boolean',
      description: 'Show social statistics',
    },
    showBio: {
      control: 'boolean',
      description: 'Show user bio text',
    },
    showDetails: {
      control: 'boolean',
      description: 'Show detailed profile information',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover states and click interactions',
    },
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data;
const sampleUser = {
  id: '1',
  name: 'Sarah Chen',
  handle: 'sarahc',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  bio: 'CS Major passionate about AI and machine learning. Building tools to help students succeed. Always down for a good study session! 🤖📚',
  status: 'online' as const,
  role: 'builder' as const,
  affiliation: 'university' as const,
  privacy: 'public' as const,
  university: 'Stanford University',
  graduationYear: 2025,
  major: 'Computer Science',
  location: 'Palo Alto, CA',
  joinedDate: 'September 2021',
  website: 'https://sarahchen.dev',
  followers: 1234,
  following: 567,
  spaces: 12,
  tools: 8,
};

const studentUser = {
  id: '2',
  name: 'Alex Rodriguez',
  handle: 'alexr',
  bio: 'Math major, tutor, and problem solver. Love helping classmates with calculus and statistics.',
  status: 'away' as const,
  role: 'student' as const,
  university: 'UC Berkeley',
  graduationYear: 2026,
  major: 'Mathematics',
  followers: 456,
  following: 234,
  spaces: 8,
  tools: 3,
};

const leaderUser = {
  id: '3',
  name: 'Emily Watson',
  handle: 'emilyw',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  bio: 'Psychology major and Debate Club President. Passionate about mental health advocacy and public speaking.',
  status: 'online' as const,
  role: 'leader' as const,
  university: 'Harvard University',
  graduationYear: 2024,
  major: 'Psychology',
  location: 'Cambridge, MA',
  joinedDate: 'August 2020',
  followers: 2345,
  following: 1234,
  spaces: 15,
  tools: 5,
};

const verifiedUser = {
  id: '4',
  name: 'Dr. Michael Foster',
  handle: 'profmike',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  bio: 'Computer Science Professor specializing in distributed systems and databases. Office hours: MW 2-4pm.',
  status: 'busy' as const,
  role: 'verified' as const,
  university: 'MIT',
  major: 'Computer Science Faculty',
  location: 'Cambridge, MA',
  joinedDate: 'January 2019',
  website: 'https://cs.mit.edu/~foster',
  followers: 5678,
  following: 123,
  spaces: 25,
  tools: 15,
};

// Basic Examples;
export const Default: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
  },
};

export const WithoutAvatar: Story = {
  args: {
    user: {
      ...sampleUser,
      avatar: undefined,
    },
    relationship: 'none',
  },
};

export const Interactive: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
    interactive: true,
    onFollow: (userId) => console.log('Follow user:', userId),
    onMessage: (userId) => console.log('Message user:', userId),
    onViewProfile: (userId) => console.log('View profile:', userId),
  },
};

// Variant Examples;
export const MinimalVariant: Story = {
  args: {
    user: sampleUser,
    variant: 'minimal',
    relationship: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact display showing only essential information.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    user: sampleUser,
    variant: 'compact',
    relationship: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Balanced display with key information and basic stats.',
      },
    },
  },
};

export const DetailedVariant: Story = {
  args: {
    user: sampleUser,
    variant: 'detailed',
    relationship: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full display with all available information including profile details.',
      },
    },
  },
};

// Relationship States;
export const NotFollowing: Story = {
  args: {
    user: studentUser,
    relationship: 'none',
  },
};

export const Following: Story = {
  args: {
    user: studentUser,
    relationship: 'following',
  },
};

export const FollowedByUser: Story = {
  args: {
    user: studentUser,
    relationship: 'followed',
  },
};

export const MutualFollowing: Story = {
  args: {
    user: studentUser,
    relationship: 'mutual',
  },
};

export const BlockedUser: Story = {
  args: {
    user: {
      ...studentUser,
      bio: 'This user has been blocked.',
    },
    relationship: 'blocked',
  },
};

// User Role Examples;
export const StudentRole: Story = {
  args: {
    user: studentUser,
    relationship: 'none',
  },
};

export const BuilderRole: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
  },
};

export const LeaderRole: Story = {
  args: {
    user: leaderUser,
    relationship: 'none',
  },
};

export const VerifiedRole: Story = {
  args: {
    user: verifiedUser,
    relationship: 'none',
  },
};

// Display Options;
export const NoActions: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
    showActions: false,
  },
};

export const NoStats: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
    showStats: false,
  },
};

export const NoBio: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
    showBio: false,
  },
};

export const BasicInfo: Story = {
  args: {
    user: sampleUser,
    relationship: 'none',
    showStats: false,
    showBio: false,
    showDetails: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal information display with just name, handle, and role.',
      },
    },
  },
};

// Campus Scenarios;
export const StudyGroupMember: Story = {
  args: {
    user: {
      id: '5',
      name: 'Maya Patel',
      handle: 'mayap',
      bio: 'Biology major focusing on genetics research. Lab TA for Bio 101.',
      role: 'student' as const,
      university: 'UC Davis',
      graduationYear: 2025,
      major: 'Biology',
      followers: 234,
      following: 156,
      spaces: 6,
      tools: 2,
    },
    variant: 'compact',
    relationship: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a study group member profile.',
      },
    },
  },
};

export const ToolCollaborator: Story = {
  args: {
    user: {
      id: '6',
      name: 'Jordan Kim',
      handle: 'jordank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Full-stack developer and CS senior. Love building tools that make campus life easier!',
      role: 'builder' as const,
      university: 'Carnegie Mellon',
      graduationYear: 2024,
      major: 'Computer Science',
      followers: 890,
      following: 345,
      spaces: 18,
      tools: 22,
    },
    variant: 'detailed',
    relationship: 'mutual',
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of an active tool builder and collaborator.',
      },
    },
  },
};

export const SpaceLeader: Story = {
  args: {
    user: {
      id: '7',
      name: 'Taylor Davis',
      handle: 'taylord',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Business major and entrepreneur. Leading the Startup Club and organizing pitch competitions.',
      role: 'leader' as const,
      university: 'Wharton School',
      graduationYear: 2024,
      major: 'Business Administration',
      location: 'Philadelphia, PA',
      followers: 1876,
      following: 567,
      spaces: 12,
      tools: 8,
    },
    relationship: 'following',
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of a space leader and community organizer.',
      },
    },
  },
};

export const ResidentialAssistant: Story = {
  args: {
    user: {
      id: '8',
      name: 'Chris Thompson',
      handle: 'christ',
      bio: 'RA for West Hall, Psychology major. Here to help with any dorm life questions!',
      role: 'leader' as const,
      affiliation: 'residential' as const,
      university: 'NYU',
      graduationYear: 2025,
      major: 'Psychology',
      location: 'New York, NY',
      followers: 567,
      following: 234,
      spaces: 8,
      tools: 4,
    },
    variant: 'compact',
    relationship: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile of a residential assistant with leadership role.',
      },
    },
  },
};

// Collection Examples;
export const UserDirectory: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        CS Study Group Members;
      </h3>
      <UserCard;
        user={{
          id: '1',
          name: 'Sarah Chen',
          handle: 'sarahc',
          role: 'builder',
          university: 'Stanford',
          major: 'Computer Science',
          followers: 1234,
          following: 567,
          spaces: 12,
          tools: 8,
          }}
        variant="minimal"
        relationship="mutual"
        showStats={false}
      />
      <UserCard;
        user={{
          id: '2',
          name: 'Alex Rodriguez',
          handle: 'alexr',
          role: 'student',
          university: 'UC Berkeley',
          major: 'Mathematics',
          followers: 456,
          following: 234,
          spaces: 8,
          tools: 3,
          }}
        variant="minimal"
        relationship="following"
        showStats={false}
      />
      <UserCard;
        user={{
          id: '3',
          name: 'Maya Patel',
          handle: 'mayap',
          role: 'student',
          university: 'UC Davis',
          major: 'Biology',
          followers: 234,
          following: 156,
          spaces: 6,
          tools: 2,
          }}
        variant="minimal"
        relationship="none"
        showStats={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of user cards in a directory or member list.',
      },
    },
  },
};

export const SuggestedConnections: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <UserCard;
        user={{
          id: '1',
          name: 'Jordan Kim',
          handle: 'jordank',
          bio: 'CS senior building productivity tools for students',
          role: 'builder',
          university: 'Carnegie Mellon',
          major: 'Computer Science',
          followers: 890,
          following: 345,
          spaces: 18,
          tools: 22,
          }}
        variant="compact"
        relationship="none"
      />
      <UserCard;
        user={{
          id: '2',
          name: 'Taylor Davis',
          handle: 'taylord',
          bio: 'Business major leading startup initiatives on campus',
          role: 'leader',
          university: 'Wharton',
          major: 'Business',
          followers: 1876,
          following: 567,
          spaces: 12,
          tools: 8,
          }}
        variant="compact"
        relationship="none"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of suggested connections or recommendations layout.',
      },
    },
  },
};