'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SpaceHeader } from './molecules/space-header';
import { SpaceAboutWidget } from './molecules/space-about-widget';
import { SpaceToolsWidget } from './molecules/space-tools-widget';
import { SpacePostComposer } from './organisms/space-post-composer';
import { SpaceBoardLayout } from './organisms/space-board-layout';

const meta = {
  title: '03-Spaces/Spaces System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Community hubs where coordination happens. Feed-first minimalism (no tab navigation, vertical scroll like Instagram). Pre-seeded from campus RSS feeds.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MOCK DATA =====

const mockSpace = {
  id: 'space-cs-dept',
  name: 'UB CS Department',
  iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=cs',
  handle: '@ub-cs',
  category: 'Academic',
  description: 'Official space for UB Computer Science students. Announcements, events, study groups, and job postings.',
  isPublic: true,
};

const mockLeaders = [
  {
    id: 'leader-1',
    name: 'Dr. Sarah Johnson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'Faculty Advisor',
  },
  {
    id: 'leader-2',
    name: 'Alex Chen',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    role: 'Student President',
  },
];

const mockTools = [
  {
    id: 'tool-1',
    name: 'Room Finder',
    description: 'Find available study rooms in Davis Hall',
    icon: '📍',
    usageCount: 342,
    createdBy: {
      id: 'user-1',
      name: 'Alex Chen',
    },
  },
  {
    id: 'tool-2',
    name: 'Anonymous Feedback',
    description: 'Submit anonymous course feedback',
    icon: '💬',
    usageCount: 156,
    createdBy: {
      id: 'user-2',
      name: 'Jordan Lee',
    },
  },
];

// ===== SPACE HEADER STORIES =====

export const SpaceHeader_NotJoined: Story = {
  render: () => (
    <div className="p-6">
      <SpaceHeader
        space={mockSpace}
        memberCount={847}
        onlineCount={23}
        membershipState="not_joined"
        isLeader={false}
        onJoin={() => console.log('Join clicked')}
        onShare={() => console.log('Share clicked')}
      />
    </div>
  ),
};

export const SpaceHeader_Joined: Story = {
  render: () => (
    <div className="p-6">
      <SpaceHeader
        space={mockSpace}
        memberCount={848}
        onlineCount={23}
        membershipState="joined"
        isLeader={false}
        onLeave={() => console.log('Leave clicked')}
        onShare={() => console.log('Share clicked')}
      />
    </div>
  ),
};

export const SpaceHeader_Leader: Story = {
  render: () => (
    <div className="p-6">
      <SpaceHeader
        space={mockSpace}
        memberCount={848}
        onlineCount={23}
        membershipState="joined"
        isLeader={true}
        onSettings={() => console.log('Settings clicked')}
        onShare={() => console.log('Share clicked')}
      />
    </div>
  ),
};

export const SpaceHeader_Loading: Story = {
  render: () => (
    <div className="p-6">
      <SpaceHeader
        space={mockSpace}
        memberCount={847}
        onlineCount={23}
        membershipState="loading"
        isLeader={false}
      />
    </div>
  ),
};

export const SpaceHeader_Compact: Story = {
  render: () => (
    <div className="max-w-[375px] mx-auto">
      <SpaceHeader
        space={mockSpace}
        memberCount={848}
        onlineCount={23}
        membershipState="joined"
        isLeader={false}
        compact={true}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// ===== ABOUT WIDGET =====

export const AboutWidget_Default: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <SpaceAboutWidget
        data={{
          spaceId: mockSpace.id,
          description: mockSpace.description,
          memberCount: 847,
          leaders: mockLeaders,
          category: mockSpace.category,
          createdDate: 'Sept 2024',
          isPublic: true,
          isMember: false,
        }}
        onJoin={(id) => console.log('Join:', id)}
        onLeaderClick={(id) => console.log('Leader clicked:', id)}
      />
    </div>
  ),
};

export const AboutWidget_Member: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <SpaceAboutWidget
        data={{
          spaceId: mockSpace.id,
          description: mockSpace.description,
          memberCount: 848,
          leaders: mockLeaders,
          category: mockSpace.category,
          createdDate: 'Sept 2024',
          isPublic: true,
          isMember: true,
        }}
        onLeave={(id) => console.log('Leave:', id)}
        onLeaderClick={(id) => console.log('Leader clicked:', id)}
      />
    </div>
  ),
};

// ===== TOOLS WIDGET =====

export const ToolsWidget_Default: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <SpaceToolsWidget
        spaceId={mockSpace.id}
        tools={mockTools}
        onToolClick={(id) => console.log('Tool clicked:', id)}
        onCreateTool={() => console.log('Create tool')}
        onViewAll={() => console.log('View all tools')}
      />
    </div>
  ),
};

export const ToolsWidget_Empty: Story = {
  render: () => (
    <div className="max-w-[400px] p-6">
      <SpaceToolsWidget
        spaceId={mockSpace.id}
        tools={[]}
        onToolClick={(id) => console.log('Tool clicked:', id)}
        onCreateTool={() => console.log('Create tool')}
        onViewAll={() => console.log('View all tools')}
      />
    </div>
  ),
};

// ===== POST COMPOSER =====

export const PostComposer_Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-6">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Open Post Composer
        </button>
        <SpacePostComposer
          spaceId={mockSpace.id}
          spaceName={mockSpace.name}
          spaceIcon={mockSpace.iconUrl}
          spaceColor="#FFD700"
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log('Post submitted:', data);
            setOpen(false);
          }}
          allowMedia={true}
          maxLength={500}
        />
      </div>
    );
  },
};

export const PostComposer_Anonymous: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-6">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Open Anonymous Composer
        </button>
        <SpacePostComposer
          spaceId={mockSpace.id}
          spaceName={mockSpace.name}
          spaceIcon={mockSpace.iconUrl}
          spaceColor="#FFD700"
          open={open}
          onOpenChange={setOpen}
          onSubmit={(data) => {
            console.log('Anonymous post submitted:', data);
            setOpen(false);
          }}
          allowAnonymous={true}
          defaultAnonymous={true}
          allowMedia={true}
          maxLength={500}
        />
      </div>
    );
  },
};

// ===== FULL SPACE BOARD =====

export const SpaceBoard_Member: Story = {
  render: () => (
    <SpaceBoardLayout
      space={{
        ...mockSpace,
        memberCount: 848,
        onlineCount: 23,
      }}
      userIsMember={true}
      userIsLeader={false}
      onJoin={() => console.log('Join')}
      onLeave={() => console.log('Leave')}
      onSettings={() => console.log('Settings')}
      onShare={() => console.log('Share')}
    />
  ),
};

export const SpaceBoard_NonMember: Story = {
  render: () => (
    <SpaceBoardLayout
      space={{
        ...mockSpace,
        memberCount: 847,
        onlineCount: 23,
      }}
      userIsMember={false}
      userIsLeader={false}
      onJoin={() => console.log('Join')}
      onShare={() => console.log('Share')}
    />
  ),
};

export const SpaceBoard_Leader: Story = {
  render: () => (
    <SpaceBoardLayout
      space={{
        ...mockSpace,
        memberCount: 848,
        onlineCount: 23,
      }}
      userIsMember={true}
      userIsLeader={true}
      onLeave={() => console.log('Leave')}
      onSettings={() => console.log('Settings')}
      onShare={() => console.log('Share')}
    />
  ),
};

// ===== MOBILE VIEW =====

export const SpaceBoard_Mobile: Story = {
  render: () => (
    <div className="max-w-[375px] mx-auto">
      <SpaceBoardLayout
        space={{
          ...mockSpace,
          memberCount: 848,
          onlineCount: 23,
        }}
        userIsMember={true}
        userIsLeader={false}
        onLeave={() => console.log('Leave')}
        onShare={() => console.log('Share')}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// ===== FEED-FIRST MINIMALISM CONCEPT =====

export const Concept_FeedFirstMinimalism: Story = {
  render: () => (
    <div className="max-w-[800px] mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Feed-First Minimalism</h1>
          <p className="text-muted-foreground">
            600px → 280px vertical space reduction (-53% clutter)
          </p>
        </div>

        <SpaceHeader
          space={mockSpace}
          memberCount={848}
          onlineCount={23}
          membershipState="joined"
          isLeader={true}
        />

        <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-3">Design Philosophy</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>No tab navigation - Just vertical scroll (Instagram-style)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Composer at top with minimal UI - No avatar, consolidated controls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Pinned posts as vertical stack - Gold left border only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Chronological feed - Simple, predictable content flow</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong>✅ All space components are now available!</strong> This includes full space board layouts, post composers, widgets, and feed integration.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Spaces follow feed-first minimalism principles: vertical scroll, minimal chrome, content-first design. This creates familiarity for Instagram users while adding powerful coordination tools.',
      },
    },
  },
};
