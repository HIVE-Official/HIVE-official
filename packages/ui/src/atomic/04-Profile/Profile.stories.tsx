'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProfileBentoGrid } from './molecules/profile-bento-grid';
import { ProfileIdentityWidget } from './organisms/profile-identity-widget';
import { ProfileSpacesWidget } from './organisms/profile-spaces-widget';
import { ProfileConnectionsWidget } from './organisms/profile-connections-widget';
import { ProfileActivityWidget } from './organisms/profile-activity-widget';
import { ProfileCompletionCard } from './organisms/profile-completion-card';
import { ProfileViewLayout } from './templates/profile-view-layout';

const meta = {
  title: '04-Profile/Profile System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Campus identity system with bento grid layout. Profiles show "Who are you on this campus?" not "How famous are you?" - Major, clubs, contributions, not follower count.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MOCK DATA =====

const mockProfile = {
  id: 'user-alex',
  name: 'Alex Chen',
  handle: 'alex_chen',
  email: 'alexchen@buffalo.edu',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  bio: 'CS Junior @ UB | Building tools for campus life | Coffee enthusiast ☕',
  campusId: 'ub-buffalo',

  // Campus identity
  major: 'Computer Science',
  minor: 'Mathematics',
  gradYear: 2025,
  interests: ['Web Development', 'Machine Learning', 'Hackathons', 'Ultimate Frisbee'],

  // Stats
  stats: {
    spacesJoined: 12,
    connectionsCount: 47,
    postsCreated: 23,
    toolsBuilt: 3,
  },

  // Completion
  completionPercentage: 85,
  missingFields: ['minor', 'profile photo'],

  // Privacy
  ghostMode: false,
  visibility: 'campus' as const,

  // Metadata
  createdAt: new Date('2024-09-01'),
  lastActive: new Date(),
};

const mockSpaces = [
  {
    id: 'space-1',
    name: 'UB CS Department',
    icon: '💻',
    color: '#FFD700',
    role: 'Member',
    joinedAt: new Date('2024-09-05'),
  },
  {
    id: 'space-2',
    name: 'UB Dance Club',
    icon: '💃',
    color: '#FF69B4',
    role: 'Leader',
    joinedAt: new Date('2024-09-10'),
  },
  {
    id: 'space-3',
    name: 'Hackathon Team',
    icon: '🚀',
    color: '#00D9FF',
    role: 'Member',
    joinedAt: new Date('2024-10-01'),
  },
  {
    id: 'space-4',
    name: 'Ultimate Frisbee',
    icon: '🥏',
    color: '#7CFF00',
    role: 'Member',
    joinedAt: new Date('2024-09-15'),
  },
];

const mockConnections = [
  {
    id: 'conn-1',
    user: {
      id: 'user-1',
      name: 'Jordan Lee',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
      major: 'Mechanical Engineering',
      gradYear: 2025,
    },
    sharedSpaces: 2,
    connectedAt: new Date('2024-09-20'),
  },
  {
    id: 'conn-2',
    user: {
      id: 'user-2',
      name: 'Sam Taylor',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
      major: 'Computer Science',
      gradYear: 2026,
    },
    sharedSpaces: 3,
    connectedAt: new Date('2024-10-05'),
  },
  {
    id: 'conn-3',
    user: {
      id: 'user-3',
      name: 'Morgan Davis',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=morgan',
      major: 'Business',
      gradYear: 2025,
    },
    sharedSpaces: 1,
    connectedAt: new Date('2024-09-30'),
  },
];

const mockActivity = [
  {
    id: 'activity-1',
    type: 'post' as const,
    content: 'Shared a post in UB CS Department',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15m ago
    spaceId: 'space-1',
  },
  {
    id: 'activity-2',
    type: 'join' as const,
    content: 'Joined Hackathon Team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
    spaceId: 'space-3',
  },
  {
    id: 'activity-3',
    type: 'upvote' as const,
    content: 'Upvoted a post in UB Dance Club',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
    spaceId: 'space-2',
  },
];

// ===== WIDGET STORIES =====

export const Widget_Identity: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileIdentityWidget
        profile={{
          name: mockProfile.name,
          handle: mockProfile.handle,
          email: mockProfile.email,
          avatarUrl: mockProfile.avatarUrl,
          bio: mockProfile.bio,
          major: mockProfile.major,
          minor: mockProfile.minor,
          gradYear: mockProfile.gradYear,
          verified: true,
        }}
        isOwnProfile={false}
        onConnect={() => console.log('Connect clicked')}
        onMessage={() => console.log('Message clicked')}
      />
    </div>
  ),
};

export const Widget_Identity_OwnProfile: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileIdentityWidget
        profile={{
          name: mockProfile.name,
          handle: mockProfile.handle,
          email: mockProfile.email,
          avatarUrl: mockProfile.avatarUrl,
          bio: mockProfile.bio,
          major: mockProfile.major,
          gradYear: mockProfile.gradYear,
        }}
        isOwnProfile={true}
        onEdit={() => console.log('Edit clicked')}
      />
    </div>
  ),
};

export const Widget_Spaces: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileSpacesWidget
        spaces={mockSpaces}
        onSpaceClick={(id) => console.log('Space clicked:', id)}
        onViewAll={() => console.log('View all spaces')}
      />
    </div>
  ),
};

export const Widget_Connections: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileConnectionsWidget
        connections={mockConnections}
        totalCount={mockProfile.stats.connectionsCount}
        onConnectionClick={(id) => console.log('Connection clicked:', id)}
        onViewAll={() => console.log('View all connections')}
      />
    </div>
  ),
};

export const Widget_Activity: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileActivityWidget
        activities={mockActivity}
        onActivityClick={(id) => console.log('Activity clicked:', id)}
        onViewAll={() => console.log('View all activity')}
      />
    </div>
  ),
};

export const Widget_Completion: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileCompletionCard
        percentage={mockProfile.completionPercentage}
        missingFields={mockProfile.missingFields}
        onComplete={() => console.log('Complete profile clicked')}
      />
    </div>
  ),
};

export const Widget_Completion_Low: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileCompletionCard
        percentage={45}
        missingFields={['bio', 'major', 'interests', 'profile photo', 'cover photo']}
        onComplete={() => console.log('Complete profile clicked')}
      />
    </div>
  ),
};

export const Widget_Completion_Perfect: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <ProfileCompletionCard
        percentage={100}
        missingFields={[]}
        onComplete={() => console.log('Complete profile clicked')}
      />
    </div>
  ),
};

// ===== BENTO GRID STORIES =====

export const BentoGrid_Default: Story = {
  render: () => (
    <div className="p-6">
      <ProfileBentoGrid
        profile={mockProfile as any}
        editable={false}
      />
    </div>
  ),
};

export const BentoGrid_Editable: Story = {
  render: () => (
    <div className="p-6">
      <ProfileBentoGrid
        profile={mockProfile as any}
        editable={true}
        onLayoutChange={(layout) => console.log('Layout changed:', layout)}
      />
    </div>
  ),
};

// ===== FULL PROFILE LAYOUT =====

export const ProfileLayout_OtherUser: Story = {
  render: () => (
    <ProfileViewLayout
      profile={mockProfile as any}
      spaces={mockSpaces}
      connections={mockConnections}
      activity={mockActivity}
      isOwnProfile={false}
      onConnect={() => console.log('Connect clicked')}
      onMessage={() => console.log('Message clicked')}
      onSpaceClick={(id) => console.log('Space clicked:', id)}
      onConnectionClick={(id) => console.log('Connection clicked:', id)}
    />
  ),
};

export const ProfileLayout_OwnProfile: Story = {
  render: () => (
    <ProfileViewLayout
      profile={mockProfile as any}
      spaces={mockSpaces}
      connections={mockConnections}
      activity={mockActivity}
      isOwnProfile={true}
      onEdit={() => console.log('Edit clicked')}
      onSpaceClick={(id) => console.log('Space clicked:', id)}
      onConnectionClick={(id) => console.log('Connection clicked:', id)}
    />
  ),
};

export const ProfileLayout_Incomplete: Story = {
  render: () => (
    <ProfileViewLayout
      profile={{
        ...mockProfile,
        completionPercentage: 60,
        missingFields: ['bio', 'interests', 'cover photo'],
        bio: undefined,
        interests: [],
      } as any}
      spaces={mockSpaces.slice(0, 2)}
      connections={mockConnections.slice(0, 3)}
      activity={mockActivity.slice(0, 2)}
      isOwnProfile={true}
      onEdit={() => console.log('Edit clicked')}
    />
  ),
};

// ===== MOBILE PROFILE =====

export const ProfileLayout_Mobile: Story = {
  render: () => (
    <div className="max-w-[375px] mx-auto">
      <ProfileViewLayout
        profile={mockProfile as any}
        spaces={mockSpaces}
        connections={mockConnections}
        activity={mockActivity}
        isOwnProfile={false}
        onConnect={() => console.log('Connect clicked')}
        onMessage={() => console.log('Message clicked')}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// ===== CAMPUS IDENTITY DEMO =====

export const Profile_CampusIdentityFocus: Story = {
  render: () => (
    <ProfileViewLayout
      profile={mockProfile as any}
      spaces={mockSpaces}
      connections={mockConnections}
      activity={mockActivity}
      isOwnProfile={false}
      onConnect={() => console.log('Connect clicked')}
      onMessage={() => console.log('Message clicked')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile focused on campus identity: Major, grad year, clubs joined, campus contributions. NOT follower count, likes, or global metrics. Shows "Who are you on this campus?"',
      },
    },
  },
};

// ===== COMPLETION PSYCHOLOGY =====

export const Profile_CompletionPsychology: Story = {
  render: () => {
    const [completion, setCompletion] = React.useState(60);
    const [missing, setMissing] = React.useState(['bio', 'interests', 'cover photo']);

    const handleComplete = () => {
      if (missing.length > 0) {
        const nextMissing = missing.slice(1);
        setMissing(nextMissing);
        setCompletion(Math.min(100, completion + 15));
      }
    };

    return (
      <div>
        <ProfileViewLayout
          profile={{
            ...mockProfile,
            completionPercentage: completion,
            missingFields: missing,
          } as any}
          spaces={mockSpaces}
          connections={mockConnections}
          activity={mockActivity}
          isOwnProfile={true}
          onEdit={handleComplete}
        />
        <div className="fixed bottom-4 right-4 p-4 bg-muted/90 rounded-lg backdrop-blur max-w-[300px]">
          <p className="text-sm font-semibold mb-2">Completion Psychology Demo</p>
          <p className="text-xs text-muted-foreground mb-2">
            Profile: {completion}% complete
          </p>
          <p className="text-xs text-muted-foreground">
            Click "Edit Profile" to complete next field. This drives engagement through progress visibility.
          </p>
        </div>
      </div>
    );
  },
};

// ===== GHOST MODE =====

export const Profile_GhostMode: Story = {
  render: () => (
    <ProfileViewLayout
      profile={{
        ...mockProfile,
        ghostMode: true,
        bio: 'Profile hidden from course stalking. Limited visibility mode active.',
      } as any}
      spaces={mockSpaces.slice(0, 2)} // Show fewer spaces in ghost mode
      connections={[]} // Hide connections in ghost mode
      activity={[]} // Hide activity in ghost mode
      isOwnProfile={false}
      onConnect={() => console.log('Connect clicked')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ghost Mode: Privacy control for course stalking protection. Limited profile visibility - connections and activity hidden.',
      },
    },
  },
};
