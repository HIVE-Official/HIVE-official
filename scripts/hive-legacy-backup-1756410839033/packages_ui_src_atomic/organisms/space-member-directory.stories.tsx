import type { Meta, StoryObj } from '@storybook/react';
import { SpaceMemberDirectory, SpaceMember } from './space-member-directory';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof SpaceMemberDirectory> = {
  title: 'HIVE/Spaces/Organisms/SpaceMemberDirectory',
  component: SpaceMemberDirectory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete member management system for spaces with search, filtering, role management, and member actions. Handles different user permissions and space types.',
      },
    },
  },
  argTypes: {
    currentUserRole: {
      control: { type: 'select' },
      options: ['leader', 'co_leader', 'member', 'pending'],
    },
    spaceType: {
      control: { type: 'select' },
      options: ['university', 'residential', 'greek', 'student'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceMemberDirectory>;

const mockMembers: SpaceMember[] = [
  {
    id: '1',
    handle: 'sarah_cs',
    displayName: 'Sarah Chen',
    avatar: undefined,
    role: 'leader',
    status: 'active',
    joinedAt: '2024-01-10T00:00:00Z',
    lastActive: '2024-01-20T15:30:00Z',
    bio: 'CS major passionate about algorithms and AI',
    major: 'Computer Science',
    year: 'Junior',
    postsCount: 42,
    eventsAttended: 8,
    toolsUsed: 15,
    canManageMembers: true,
    canManageTools: true,
    canCreateEvents: true,
    canModerate: true,
    email: 'sarah.chen@university.edu',
    isOnline: true,
  },
  {
    id: '2',
    handle: 'mike_physics',
    displayName: 'Michael Rodriguez',
    role: 'co_leader',
    status: 'active',
    joinedAt: '2024-01-12T00:00:00Z',
    lastActive: '2024-01-20T14:15:00Z',
    major: 'Physics',
    year: 'Senior',
    postsCount: 28,
    eventsAttended: 12,
    toolsUsed: 9,
    canManageMembers: true,
    canManageTools: false,
    canCreateEvents: true,
    canModerate: true,
    isOnline: false,
  },
  {
    id: '3',
    handle: 'jenny_design',
    displayName: 'Jennifer Wu',
    role: 'member',
    status: 'active',
    joinedAt: '2024-01-15T00:00:00Z',
    lastActive: '2024-01-20T16:00:00Z',
    major: 'Graphic Design',
    year: 'Sophomore',
    postsCount: 15,
    eventsAttended: 5,
    toolsUsed: 7,
    canManageMembers: false,
    canManageTools: false,
    canCreateEvents: false,
    canModerate: false,
    isOnline: true,
  },
  {
    id: '4',
    handle: 'alex_math',
    displayName: 'Alex Thompson',
    role: 'member',
    status: 'active',
    joinedAt: '2024-01-18T00:00:00Z',
    lastActive: '2024-01-19T09:30:00Z',
    major: 'Mathematics',
    year: 'Freshman',
    postsCount: 8,
    eventsAttended: 3,
    toolsUsed: 4,
    canManageMembers: false,
    canManageTools: false,
    canCreateEvents: false,
    canModerate: false,
    isOnline: false,
  },
  {
    id: '5',
    handle: 'maria_bio',
    displayName: 'Maria Santos',
    role: 'pending',
    status: 'pending',
    joinedAt: '2024-01-20T00:00:00Z',
    major: 'Biology',
    year: 'Junior',
    postsCount: 0,
    eventsAttended: 0,
    toolsUsed: 0,
    canManageMembers: false,
    canManageTools: false,
    canCreateEvents: false,
    canModerate: false,
    isOnline: false,
  },
  {
    id: '6',
    handle: 'david_eng',
    displayName: 'David Kim',
    role: 'member',
    status: 'active',
    joinedAt: '2024-01-14T00:00:00Z',
    lastActive: '2024-01-20T11:45:00Z',
    major: 'Engineering',
    year: 'Senior',
    postsCount: 31,
    eventsAttended: 7,
    toolsUsed: 12,
    canManageMembers: false,
    canManageTools: false,
    canCreateEvents: false,
    canModerate: false,
    isOnline: true,
  },
  {
    id: '7',
    handle: 'lisa_art',
    displayName: 'Lisa Johnson',
    role: 'member',
    status: 'inactive',
    joinedAt: '2024-01-11T00:00:00Z',
    lastActive: '2024-01-16T14:20:00Z',
    major: 'Fine Arts',
    year: 'Sophomore',
    postsCount: 12,
    eventsAttended: 2,
    toolsUsed: 3,
    canManageMembers: false,
    canManageTools: false,
    canCreateEvents: false,
    canModerate: false,
    isOnline: false,
  },
];

export const AsLeader: Story = {
  args: {
    members: mockMembers,
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory as viewed by a space leader with full management permissions.',
      },
    },
  },
};

export const AsMember: Story = {
  args: {
    members: mockMembers,
    currentUserRole: 'member',
    spaceType: 'university',
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory as viewed by a regular member with limited permissions.',
      },
    },
  },
};

export const ResidentialSpace: Story = {
  args: {
    members: mockMembers.map(m => ({
      ...m,
      major: undefined,
      year: m.year ? `Floor ${Math.floor(Math.random() * 10) + 1}` : undefined,
    })),
    currentUserRole: 'co_leader',
    spaceType: 'residential',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a residential space (dorm/floor) with floor information instead of majors.',
      },
    },
  },
};

export const GreekSpace: Story = {
  args: {
    members: mockMembers.map(m => ({
      ...m,
      year: m.year ? `Pledge Class ${Math.floor(Math.random() * 5) + 2020}` : undefined,
    })),
    currentUserRole: 'leader',
    spaceType: 'greek',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a Greek life space with pledge class information.',
      },
    },
  },
};

export const PendingMembers: Story = {
  args: {
    members: [
      ...mockMembers,
      {
        id: '8',
        handle: 'new_user1',
        displayName: 'Emma Wilson',
        role: 'pending',
        status: 'pending',
        joinedAt: '2024-01-20T10:00:00Z',
        major: 'Psychology',
        year: 'Freshman',
        postsCount: 0,
        eventsAttended: 0,
        toolsUsed: 0,
        canManageMembers: false,
        canManageTools: false,
        canCreateEvents: false,
        canModerate: false,
        isOnline: true,
      },
      {
        id: '9',
        handle: 'new_user2',
        displayName: 'Ryan Garcia',
        role: 'pending',
        status: 'pending',
        joinedAt: '2024-01-20T11:30:00Z',
        major: 'Business',
        year: 'Junior',
        postsCount: 0,
        eventsAttended: 0,
        toolsUsed: 0,
        canManageMembers: false,
        canManageTools: false,
        canCreateEvents: false,
        canModerate: false,
        isOnline: false,
      },
    ],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory with pending member requests requiring approval.',
      },
    },
  },
};

export const SmallSpace: Story = {
  args: {
    members: mockMembers.slice(0, 3),
    currentUserRole: 'leader',
    spaceType: 'student',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory for a smaller student space with fewer members.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    members: [],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no members match the current filters.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [members, setMembers] = useState<SpaceMember[]>(mockMembers);

    const handleManageMember = async (memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMembers(prevMembers => {
        switch (action) {
          case 'promote':
            return prevMembers.map(m => 
              m.id === memberId ? { ...m, role: 'co_leader' as const } : m
            );
          case 'demote':
            return prevMembers.map(m => 
              m.id === memberId ? { ...m, role: 'member' as const } : m
            );
          case 'remove':
            return prevMembers.filter(m => m.id !== memberId);
          default:
            return prevMembers;
        }
      });
      
      action('manage-member')(memberId, action);
    };

    const handleApproveMember = async (memberId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMembers(prevMembers =>
        prevMembers.map(m => 
          m.id === memberId ? { ...m, status: 'active' as const, role: 'member' as const } : m
        )
      );
      
      action('approve-member')(memberId);
    };

    const handleRejectMember = async (memberId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMembers(prevMembers => prevMembers.filter(m => m.id !== memberId));
      
      action('reject-member')(memberId);
    };

    return (
      <div className="h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-4xl mx-auto h-full">
          <SpaceMemberDirectory
            members={members}
            currentUserRole="leader"
            spaceType="university"
            onInviteMembers={action('invite-members')}
            onManageMember={handleManageMember}
            onViewMemberProfile={action('view-profile')}
            onMessageMember={action('message-member')}
            onApproveMember={handleApproveMember}
            onRejectMember={handleRejectMember}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state management for member actions.',
      },
    },
  },
};

export const SearchAndFilter: Story = {
  args: {
    members: [
      ...mockMembers,
      {
        id: '10',
        handle: 'cs_student',
        displayName: 'Computer Science Student',
        role: 'member',
        status: 'active',
        joinedAt: '2024-01-16T00:00:00Z',
        lastActive: '2024-01-20T13:00:00Z',
        major: 'Computer Science',
        year: 'Sophomore',
        postsCount: 5,
        eventsAttended: 1,
        toolsUsed: 2,
        canManageMembers: false,
        canManageTools: false,
        canCreateEvents: false,
        canModerate: false,
        isOnline: true,
      },
      {
        id: '11',
        handle: 'another_cs',
        displayName: 'Another CS Major',
        role: 'member',
        status: 'active',
        joinedAt: '2024-01-17T00:00:00Z',
        lastActive: '2024-01-20T12:30:00Z',
        major: 'Computer Science',
        year: 'Junior',
        postsCount: 18,
        eventsAttended: 4,
        toolsUsed: 8,
        canManageMembers: false,
        canManageTools: false,
        canCreateEvents: false,
        canModerate: false,
        isOnline: false,
      },
    ],
    currentUserRole: 'leader',
    spaceType: 'university',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member directory with expanded member list to demonstrate search and filtering capabilities.',
      },
    },
  },
};

export const MobileLayout: Story = {
  args: {
    members: mockMembers.slice(0, 5),
    currentUserRole: 'co_leader',
    spaceType: 'residential',
    onInviteMembers: action('invite-members'),
    onManageMember: action('manage-member'),
    onViewMemberProfile: action('view-profile'),
    onMessageMember: action('message-member'),
    onApproveMember: action('approve-member'),
    onRejectMember: action('reject-member'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Member directory optimized for mobile screens with responsive layout.',
      },
    },
  },
};