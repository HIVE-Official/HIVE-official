import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCategoryBrowser, SpacePreview } from './space-category-browser';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof SpaceCategoryBrowser> = {
  title: 'HIVE/Spaces/Organisms/SpaceCategoryBrowser',
  component: SpaceCategoryBrowser,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive space discovery browser with category filtering, search, sorting, and space management actions. Supports grid and list view modes.',
      },
    },
  },
  argTypes: {
    selectedCategory: {
      control: { type: 'select' },
      options: ['university', 'residential', 'greek', 'student'],
    },
    initialViewMode: {
      control: { type: 'select' },
      options: ['grid', 'list'],
    },
    showCategoryFilter: { control: { type: 'boolean' } },
    showJoinActions: { control: { type: 'boolean' } },
    currentUserRole: {
      control: { type: 'select' },
      options: ['leader', 'co_leader', 'member'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceCategoryBrowser>;

const mockSpaces: SpacePreview[] = [
  {
    id: '1',
    name: 'Computer Science Department',
    description: 'Official space for CS students, faculty, and staff. Share resources, announcements, and connect with the CS community.',
    category: 'university',
    status: 'active',
    memberCount: 342,
    postCount: 156,
    toolCount: 8,
    createdAt: '2024-01-10T00:00:00Z',
    lastActivity: '2024-01-20T15:30:00Z',
    isJoined: true,
    isBookmarked: false,
    userRole: 'member',
    weeklyActivity: 45,
    monthlyGrowth: 12,
    engagementScore: 87,
    isRecommended: true,
    isTrending: false,
    isPrivate: false,
    requiresApproval: false,
    location: 'Engineering Building',
    tags: ['programming', 'algorithms', 'career', 'research'],
    recentPosts: [
      { id: '1', content: 'New internship opportunities posted!', author: 'Prof. Smith', timestamp: '2024-01-20T14:00:00Z' },
    ],
    activeTools: [
      { id: '1', name: 'Assignment Tracker', icon: '📝' },
      { id: '2', name: 'Code Review', icon: '💻' },
    ],
  },
  {
    id: '2',
    name: 'Cummings Hall - Floor 3',
    description: 'Community space for all residents of Cummings Hall 3rd floor. Coordinate events, share resources, and stay connected.',
    category: 'residential',
    status: 'active',
    memberCount: 28,
    postCount: 89,
    toolCount: 5,
    createdAt: '2024-01-12T00:00:00Z',
    lastActivity: '2024-01-20T16:00:00Z',
    isJoined: false,
    isBookmarked: true,
    weeklyActivity: 23,
    monthlyGrowth: 8,
    engagementScore: 92,
    isRecommended: false,
    isTrending: true,
    isPrivate: false,
    requiresApproval: true,
    location: 'Cummings Hall, Floor 3',
    building: 'Cummings Hall',
    floor: 3,
    tags: ['community', 'events', 'study-groups', 'floor-life'],
    activeTools: [
      { id: '3', name: 'Laundry Tracker', icon: '👕' },
      { id: '4', name: 'Event Planner', icon: '📅' },
    ],
  },
  {
    id: '3',
    name: 'Alpha Beta Gamma',
    description: 'Brotherhood activities, events, and chapter communication. Active members and pledges welcome.',
    category: 'greek',
    status: 'active',
    memberCount: 67,
    postCount: 203,
    toolCount: 12,
    createdAt: '2024-01-08T00:00:00Z',
    lastActivity: '2024-01-20T14:45:00Z',
    isJoined: true,
    isBookmarked: true,
    userRole: 'co_leader',
    weeklyActivity: 78,
    monthlyGrowth: 5,
    engagementScore: 95,
    isRecommended: false,
    isTrending: false,
    isPrivate: true,
    requiresApproval: true,
    location: 'Greek Row',
    tags: ['brotherhood', 'philanthropy', 'social', 'alumni'],
    activeTools: [
      { id: '5', name: 'Chapter Management', icon: '🏛️' },
      { id: '6', name: 'Event Calendar', icon: '📅' },
    ],
  },
  {
    id: '4',
    name: 'Robotics Club',
    description: 'Build, program, and compete with robots. Weekly meetings, workshops, and competitions. All skill levels welcome!',
    category: 'student',
    status: 'active',
    memberCount: 45,
    postCount: 67,
    toolCount: 6,
    createdAt: '2024-01-15T00:00:00Z',
    lastActivity: '2024-01-20T12:30:00Z',
    isJoined: false,
    isBookmarked: false,
    weeklyActivity: 34,
    monthlyGrowth: 25,
    engagementScore: 78,
    isRecommended: true,
    isTrending: true,
    isPrivate: false,
    requiresApproval: false,
    location: 'Engineering Labs',
    tags: ['robotics', 'engineering', 'competition', 'programming', 'innovation'],
    activeTools: [
      { id: '7', name: 'Project Tracker', icon: '🔧' },
      { id: '8', name: 'Workshop Scheduler', icon: '🛠️' },
    ],
  },
  {
    id: '5',
    name: 'Study Abroad Program',
    description: 'Connect with other students planning to study abroad. Share experiences, tips, and resources.',
    category: 'university',
    status: 'active',
    memberCount: 123,
    postCount: 234,
    toolCount: 4,
    createdAt: '2024-01-05T00:00:00Z',
    lastActivity: '2024-01-19T18:20:00Z',
    isJoined: true,
    isBookmarked: false,
    userRole: 'member',
    weeklyActivity: 56,
    monthlyGrowth: 18,
    engagementScore: 83,
    isRecommended: false,
    isTrending: false,
    isPrivate: false,
    requiresApproval: false,
    tags: ['study-abroad', 'travel', 'culture', 'languages'],
    activeTools: [
      { id: '9', name: 'Travel Planner', icon: '✈️' },
      { id: '10', name: 'Document Tracker', icon: '📋' },
    ],
  },
  {
    id: '6',
    name: 'Photography Society',
    description: 'Share your photos, learn new techniques, and participate in photo walks and workshops.',
    category: 'student',
    status: 'active',
    memberCount: 89,
    postCount: 445,
    toolCount: 3,
    createdAt: '2024-01-03T00:00:00Z',
    lastActivity: '2024-01-20T11:15:00Z',
    isJoined: false,
    isBookmarked: true,
    weeklyActivity: 67,
    monthlyGrowth: 15,
    engagementScore: 88,
    isRecommended: true,
    isTrending: false,
    isPrivate: false,
    requiresApproval: false,
    tags: ['photography', 'art', 'workshops', 'creativity'],
    activeTools: [
      { id: '11', name: 'Photo Gallery', icon: '📸' },
      { id: '12', name: 'Event Scheduler', icon: '📅' },
    ],
  },
  {
    id: '7',
    name: 'Delta Epsilon Zeta',
    description: 'Sisterhood, scholarship, and service. Empowering women through lifelong bonds and community engagement.',
    category: 'greek',
    status: 'active',
    memberCount: 52,
    postCount: 178,
    toolCount: 9,
    createdAt: '2024-01-07T00:00:00Z',
    lastActivity: '2024-01-20T13:45:00Z',
    isJoined: false,
    isBookmarked: false,
    weeklyActivity: 41,
    monthlyGrowth: 7,
    engagementScore: 91,
    isRecommended: false,
    isTrending: false,
    isPrivate: true,
    requiresApproval: true,
    location: 'Sorority Row',
    tags: ['sisterhood', 'service', 'leadership', 'philanthropy'],
  },
  {
    id: '8',
    name: 'Baker Hall - Floor 2',
    description: 'Floor community for Baker Hall 2nd floor residents. Study sessions, social events, and floor bonding.',
    category: 'residential',
    status: 'active',
    memberCount: 24,
    postCount: 156,
    toolCount: 4,
    createdAt: '2024-01-14T00:00:00Z',
    lastActivity: '2024-01-20T09:30:00Z',
    isJoined: false,
    isBookmarked: false,
    weeklyActivity: 19,
    monthlyGrowth: 12,
    engagementScore: 75,
    isRecommended: false,
    isTrending: false,
    isPrivate: false,
    requiresApproval: false,
    location: 'Baker Hall, Floor 2',
    building: 'Baker Hall',
    floor: 2,
    tags: ['floor-community', 'study', 'social', 'residents'],
  },
];

export const AllCategories: Story = {
  args: {
    spaces: mockSpaces,
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete space browser showing all categories with filtering and search capabilities.',
      },
    },
  },
};

export const UniversitySpaces: Story = {
  args: {
    spaces: mockSpaces.filter(s => s.category === 'university'),
    selectedCategory: 'university',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'University spaces category view with academic departments and programs.',
      },
    },
  },
};

export const ResidentialSpaces: Story = {
  args: {
    spaces: mockSpaces.filter(s => s.category === 'residential'),
    selectedCategory: 'residential',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Residential spaces for dorms and floor communities.',
      },
    },
  },
};

export const GreekSpaces: Story = {
  args: {
    spaces: mockSpaces.filter(s => s.category === 'greek'),
    selectedCategory: 'greek',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'co_leader',
  },
  parameters: {
    docs: {
      description: {
        story: 'Greek life spaces for fraternities and sororities.',
      },
    },
  },
};

export const StudentGroups: Story = {
  args: {
    spaces: mockSpaces.filter(s => s.category === 'student'),
    selectedCategory: 'student',
    showCategoryFilter: false,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Student organizations, clubs, and interest groups.',
      },
    },
  },
};

export const ListView: Story = {
  args: {
    spaces: mockSpaces,
    initialViewMode: 'list',
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Space browser in list view mode for compact display.',
      },
    },
  },
};

export const ReadOnlyMode: Story = {
  args: {
    spaces: mockSpaces,
    showCategoryFilter: true,
    showJoinActions: false,
    onSpaceClick: action('space-click'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only view without join/leave actions for browsing only.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    spaces: [],
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no spaces are available.',
      },
    },
  },
};

export const SearchResults: Story = {
  args: {
    spaces: mockSpaces.filter(s => 
      s.name.toLowerCase().includes('photo') || 
      s.tags.some(tag => tag.includes('photo'))
    ),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtered search results showing photography-related spaces.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [spaces, setSpaces] = useState<SpacePreview[]>(mockSpaces);

    const handleJoinSpace = async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSpaces(prevSpaces =>
        prevSpaces.map(space => 
          space.id === spaceId 
            ? { ...space, isJoined: true, memberCount: space.memberCount + 1 }
            : space
        )
      );
      
      action('join-space')(spaceId)
    };

    const handleLeaveSpace = async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSpaces(prevSpaces =>
        prevSpaces.map(space => 
          space.id === spaceId 
            ? { ...space, isJoined: false, memberCount: Math.max(0, space.memberCount - 1) }
            : space
        )
      );
      
      action('leave-space')(spaceId)
    };

    const handleBookmarkSpace = async (spaceId: string, bookmarked: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSpaces(prevSpaces =>
        prevSpaces.map(space => 
          space.id === spaceId 
            ? { ...space, isBookmarked: bookmarked }
            : space
        )
      );
      
      action('bookmark-space')(spaceId, bookmarked)
    };

    return (
      <div className="h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-7xl mx-auto h-full">
          <SpaceCategoryBrowser
            spaces={spaces}
            showCategoryFilter={true}
            showJoinActions={true}
            onSpaceClick={action('space-click')}
            onJoinSpace={handleJoinSpace}
            onLeaveSpace={handleLeaveSpace}
            onBookmarkSpace={handleBookmarkSpace}
            onCreateSpace={action('create-space')}
            currentUserRole="member"
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with live state updates for space actions.',
      },
    },
  },
};

export const TrendingSpaces: Story = {
  args: {
    spaces: mockSpaces.map(space => ({
      ...space,
      isTrending: Math.random() > 0.6,
      isRecommended: Math.random() > 0.7,
    })}),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spaces with trending and recommended badges highlighted.',
      },
    },
  },
};

export const UserAsLeader: Story = {
  args: {
    spaces: mockSpaces.map(space => ({
      ...space,
      isJoined: Math.random() > 0.5,
      userRole: space.isJoined ? (['leader', 'co_leader', 'member'][Math.floor(Math.random() * 3)] as any) : undefined,
    })}),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'leader',
  },
  parameters: {
    docs: {
      description: {
        story: 'Space browser as viewed by a user with leader permissions.',
      },
    },
  },
};

export const MobileLayout: Story = {
  args: {
    spaces: mockSpaces.slice(0, 6),
    showCategoryFilter: true,
    showJoinActions: true,
    onSpaceClick: action('space-click'),
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onBookmarkSpace: action('bookmark-space'),
    onCreateSpace: action('create-space'),
    currentUserRole: 'member',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Space browser optimized for mobile screens with responsive layout.',
      },
    },
  },
};