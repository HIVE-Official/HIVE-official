import type { Meta, StoryObj } from '@storybook/react';
import { ProfileDashboard } from '../../atomic/organisms/profile-dashboard';

// Mock comprehensive profile data
const mockUserProfile = {
  identity: {
    id: 'user-123',
    name: 'Alexandra Rodriguez',
    handle: 'alexr',
    email: 'alex.rodriguez@techuniversity.edu',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face',
    bio: 'Computer Science major passionate about AI/ML and building tools that help students succeed. Always looking to collaborate!',
    pronouns: 'she/her',
    isVerified: true,
  },
  academic: {
    university: 'Tech University',
    major: 'Computer Science',
    minor: 'Mathematics',
    year: 'Junior',
    expectedGraduation: '2025-05',
    gpa: 3.85,
    academicYear: '2024-2025',
    enrollmentStatus: 'full-time',
  },
  personal: {
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    interests: ['Machine Learning', 'Web Development', 'Photography', 'Rock Climbing'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexr',
      github: 'https://github.com/alexr',
      portfolio: 'https://alexr.dev',
    },
  },
  privacy: {
    profileVisibility: 'public' as const,
    showEmail: false,
    showLocation: true,
    showAcademicInfo: true,
    ghostMode: false,
  },
  builder: {
    isBuilder: true,
    builderLevel: 'advanced',
    toolsCreated: 3,
    totalToolUsers: 127,
    builderRating: 4.8,
    specializations: ['Academic Tools', 'Productivity Apps'],
  },
  stats: {
    spacesJoined: 12,
    spacesActive: 8,
    spacesLed: 2,
    toolsUsed: 15,
    connectionsCount: 89,
    totalActivity: 456,
    currentStreak: 23,
    longestStreak: 45,
    reputation: 892,
    achievements: 8,
  },
  timestamps: {
    createdAt: new Date('2023-09-01').toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  verification: {
    isEmailVerified: true,
    isStudentVerified: true,
    isBuilderVerified: true,
    verificationBadges: ['student', 'builder', 'contributor'],
  },
};

const mockActivities = [
  {
    id: 'activity-1',
    type: 'space_join' as const,
    title: 'Joined CS Study Group',
    description: 'Started participating in weekly algorithm practice sessions',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    spaceId: 'space-1',
    spaceName: 'CS Study Group',
  },
  {
    id: 'activity-2',
    type: 'tool_create' as const,
    title: 'Published GPA Calculator v2.0',
    description: 'Added semester planning and grade prediction features',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    toolId: 'tool-gpa-calc',
    toolName: 'GPA Calculator',
  },
  {
    id: 'activity-3',
    type: 'achievement' as const,
    title: 'Earned "Helpful Builder" badge',
    description: 'Tools helped 100+ students this month',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    badgeId: 'helpful-builder',
  },
  {
    id: 'activity-4',
    type: 'collaboration' as const,
    title: 'Collaborated on Study Schedule Optimizer',
    description: 'Worked with @mikej to improve calendar integration',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    collaboratorHandle: 'mikej',
    toolId: 'schedule-optimizer',
  },
];

const mockSpaces = [
  {
    id: 'space-1',
    name: 'CS Study Group',
    description: 'Weekly algorithm and data structure practice',
    role: 'member' as const,
    memberCount: 24,
    isActive: true,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'space-2',
    name: 'Women in Tech',
    description: 'Empowering women in technology fields',
    role: 'leader' as const,
    memberCount: 67,
    isActive: true,
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'space-3',
    name: 'Dorm Floor 5A',
    description: 'Our floor community',
    role: 'admin' as const,
    memberCount: 18,
    isActive: true,
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

const mockTools = [
  {
    id: 'tool-1',
    name: 'GPA Calculator',
    description: 'Calculate and track your semester and cumulative GPA',
    category: 'academic',
    users: 89,
    rating: 4.9,
    isCreated: true,
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tool-2',
    name: 'Study Schedule Optimizer',
    description: 'AI-powered study schedule based on your courses and preferences',
    category: 'productivity',
    users: 34,
    rating: 4.7,
    isCreated: true,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tool-3',
    name: 'Campus Food Tracker',
    description: 'Track dining hall hours, menus, and meal plan usage',
    category: 'campus-life',
    users: 156,
    rating: 4.5,
    isCreated: false,
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

const meta: Meta<typeof ProfileDashboard> = {
  title: '05-Pages/Profile Page',
  component: ProfileDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete profile dashboard showing user identity, stats, activities, spaces, and tools.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    profile: {
      description: 'Complete user profile data',
    },
    activities: {
      description: 'Recent user activities',
    },
    spaces: {
      description: 'User\'s spaces with role information',
    },
    tools: {
      description: 'User\'s created and used tools',
    },
    isOwnProfile: {
      control: 'boolean',
      description: 'Whether this is the current user\'s own profile',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default profile view (own profile)
export const OwnProfile: Story = {
  args: {
    profile: mockUserProfile,
    activities: mockActivities,
    spaces: mockSpaces,
    tools: mockTools,
    isOwnProfile: true,
    isLoading: false,
  },
};

// Public profile view (viewing someone else's profile)
export const PublicProfile: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      identity: {
        ...mockUserProfile.identity,
        name: 'Michael Chen',
        handle: 'mikec',
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Senior in Electrical Engineering. Building the future of renewable energy systems.',
      },
      academic: {
        ...mockUserProfile.academic,
        major: 'Electrical Engineering',
        year: 'Senior',
        gpa: 3.92,
      },
      privacy: {
        ...mockUserProfile.privacy,
        showEmail: false, // Hidden for public view
      },
    },
    activities: mockActivities.slice(0, 3), // Limited activities for public view
    spaces: mockSpaces.slice(0, 2), // Limited spaces for public view
    tools: mockTools.filter(t => t.isCreated), // Only show created tools
    isOwnProfile: false,
    isLoading: false,
  },
};

// New user profile
export const NewUser: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      identity: {
        ...mockUserProfile.identity,
        name: 'Jamie New',
        handle: 'jamienew',
        bio: '',
        isVerified: false,
      },
      builder: {
        ...mockUserProfile.builder,
        isBuilder: false,
        toolsCreated: 0,
        totalToolUsers: 0,
        builderRating: 0,
      },
      stats: {
        spacesJoined: 1,
        spacesActive: 1,
        spacesLed: 0,
        toolsUsed: 0,
        connectionsCount: 2,
        totalActivity: 5,
        currentStreak: 0,
        longestStreak: 0,
        reputation: 0,
        achievements: 0,
      },
      timestamps: {
        ...mockUserProfile.timestamps,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    activities: [
      {
        id: 'new-activity-1',
        type: 'profile_create' as const,
        title: 'Joined HIVE',
        description: 'Welcome to the community!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    spaces: [
      {
        id: 'welcome-space',
        name: 'New Student Orientation',
        description: 'Getting started at Tech University',
        role: 'member' as const,
        memberCount: 234,
        isActive: true,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tools: [],
    isOwnProfile: true,
    isLoading: false,
  },
};

// Builder profile focused on tools
export const BuilderProfile: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      identity: {
        ...mockUserProfile.identity,
        name: 'Sarah Builder',
        handle: 'sarahbuilds',
        bio: 'Full-stack developer and tool creator. I love building solutions that make campus life easier for everyone!',
      },
      builder: {
        ...mockUserProfile.builder,
        builderLevel: 'expert',
        toolsCreated: 8,
        totalToolUsers: 1247,
        builderRating: 4.9,
        specializations: ['Academic Tools', 'Campus Life', 'Productivity Apps', 'Study Aids'],
      },
      stats: {
        ...mockUserProfile.stats,
        toolsUsed: 25,
        achievements: 15,
        reputation: 2456,
      },
    },
    activities: [
      {
        id: 'builder-activity-1',
        type: 'tool_create' as const,
        title: 'Published Meal Plan Optimizer v3.0',
        description: 'Added dietary restrictions and budget tracking',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        toolId: 'meal-optimizer',
        toolName: 'Meal Plan Optimizer',
      },
      {
        id: 'builder-activity-2',
        type: 'achievement' as const,
        title: 'Reached 1000+ tool users milestone',
        description: 'Your tools are helping the entire campus community',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        badgeId: 'community-builder',
      },
      ...mockActivities.slice(1),
    ],
    spaces: mockSpaces,
    tools: [
      ...mockTools,
      {
        id: 'tool-4',
        name: 'Meal Plan Optimizer',
        description: 'Optimize your dining plan based on eating habits and budget',
        category: 'campus-life',
        users: 234,
        rating: 4.8,
        isCreated: true,
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'tool-5',
        name: 'Course Review Aggregator',
        description: 'Aggregate course reviews from multiple platforms',
        category: 'academic',
        users: 567,
        rating: 4.6,
        isCreated: true,
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    isOwnProfile: true,
    isLoading: false,
  },
};

// Graduate student profile
export const GradStudentProfile: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      identity: {
        ...mockUserProfile.identity,
        name: 'Dr. Research Scholar',
        handle: 'drscholar',
        bio: 'PhD candidate in Computer Science researching machine learning applications in education. Passionate about making learning more accessible.',
      },
      academic: {
        ...mockUserProfile.academic,
        major: 'Computer Science PhD',
        year: 'PhD Candidate',
        expectedGraduation: '2025-12',
        gpa: 3.98,
        enrollmentStatus: 'graduate',
      },
      builder: {
        ...mockUserProfile.builder,
        isBuilder: true,
        specializations: ['Research Tools', 'Data Analysis', 'Academic Publishing'],
        toolsCreated: 5,
        totalToolUsers: 89,
      },
      stats: {
        ...mockUserProfile.stats,
        spacesJoined: 6,
        connectionsCount: 156,
        reputation: 1234,
      },
    },
    activities: [
      {
        id: 'grad-activity-1',
        type: 'research' as const,
        title: 'Published paper in ICML 2024',
        description: 'Machine Learning Applications in Educational Technology',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        publicationId: 'icml-2024-paper',
      },
      {
        id: 'grad-activity-2',
        type: 'tool_create' as const,
        title: 'Released Research Data Analyzer',
        description: 'Statistical analysis tool for educational research data',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        toolId: 'research-analyzer',
        toolName: 'Research Data Analyzer',
      },
    ],
    spaces: [
      {
        id: 'research-space-1',
        name: 'AI in Education Research Group',
        description: 'Dr. Johnson\'s research group',
        role: 'leader' as const,
        memberCount: 8,
        isActive: true,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'research-space-2',
        name: 'Graduate Student Association',
        description: 'CS department graduate students',
        role: 'member' as const,
        memberCount: 45,
        isActive: true,
        lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
    ],
    tools: [
      {
        id: 'research-tool-1',
        name: 'Research Data Analyzer',
        description: 'Statistical analysis for educational research',
        category: 'research',
        users: 23,
        rating: 4.9,
        isCreated: true,
        lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'research-tool-2',
        name: 'Citation Manager Pro',
        description: 'Advanced citation management for academic papers',
        category: 'academic',
        users: 67,
        rating: 4.7,
        isCreated: true,
        lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    isOwnProfile: true,
    isLoading: false,
  },
};

// Private profile (ghost mode)
export const PrivateProfile: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      identity: {
        ...mockUserProfile.identity,
        name: 'Private User',
        handle: 'privateuser',
        bio: 'This user prefers to keep their profile private.',
      },
      privacy: {
        ...mockUserProfile.privacy,
        profileVisibility: 'private',
        showEmail: false,
        showLocation: false,
        showAcademicInfo: false,
        ghostMode: true,
      },
    },
    activities: [], // No activities shown for private profiles
    spaces: [], // No spaces shown
    tools: [], // No tools shown
    isOwnProfile: false,
    isLoading: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    profile: null,
    activities: [],
    spaces: [],
    tools: [],
    isOwnProfile: true,
    isLoading: true,
  },
};

// Mobile view
export const Mobile: Story = {
  args: {
    profile: mockUserProfile,
    activities: mockActivities.slice(0, 3),
    spaces: mockSpaces.slice(0, 2),
    tools: mockTools.slice(0, 2),
    isOwnProfile: true,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

// Profile with all achievements and badges
export const AchievementShowcase: Story = {
  args: {
    profile: {
      ...mockUserProfile,
      stats: {
        ...mockUserProfile.stats,
        achievements: 25,
        reputation: 5000,
        currentStreak: 100,
        longestStreak: 150,
      },
      verification: {
        ...mockUserProfile.verification,
        verificationBadges: [
          'student', 'builder', 'contributor', 'mentor', 
          'community-leader', 'helpful-builder', 'streak-master'
        ],
      },
    },
    activities: mockActivities,
    spaces: mockSpaces,
    tools: mockTools,
    isOwnProfile: true,
    isLoading: false,
  },
};