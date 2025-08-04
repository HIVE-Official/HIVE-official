import type { Meta, StoryObj } from '@storybook/react';
import { 
  ProfileSystem,
  type ProfileSpace,
  type ProfileTool
} from '../../atomic/organisms/profile-system';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Star, 
  Heart, 
  MessageCircle, 
  Award,
  TrendingUp,
  Code,
  Palette,
  Coffee,
  Music,
  Camera,
  Gamepad2
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof ProfileSystem> = {
  title: '03-Organisms/Profile System',
  component: ProfileSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE profile system organism providing comprehensive user profile management with tabs for overview, spaces, and tools. Features profile completion tracking, stats integration, and responsive layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOwnProfile: {
      control: 'boolean',
      description: 'Whether viewing own profile vs another user',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state for the entire system',
    },
    layout: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Layout variant',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between elements',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUser = {
  id: 'user-1',
  name: 'Alex Rodriguez',
  handle: 'alexr',
  avatar: '',
  bio: 'Computer Science junior passionate about building tools that help students succeed. Love organizing study groups and making campus life better through technology.',
  location: 'San Francisco, CA',
  website: 'https://alexr.dev',
  school: 'University of California',
  major: 'Computer Science',
  gradYear: '2025',
  joinedAt: '2022-09-15T00:00:00Z',
  isBuilder: true,
  isVerified: true,
  ghostMode: false,
  onlineStatus: 'online' as const,
};

const sampleStats = {
  spacesJoined: 24,
  spacesActive: 8,
  spacesLed: 3,
  toolsUsed: 12,
  connectionsCount: 156,
  totalActivity: 847,
  currentStreak: 15,
  longestStreak: 42,
  reputation: 2847,
  achievements: 8,
};

const sampleSpaces: ProfileSpace[] = [
  {
    id: '1',
    name: 'CS 101: Data Structures',
    type: 'course',
    role: 'member',
    memberCount: 245,
    lastActivity: '2024-01-15T10:30:00Z',
    isPrivate: false,
    color: 'blue',
    icon: '💻'
  },
  {
    id: '2',
    name: 'Robotics Club',
    type: 'club',
    role: 'leader',
    memberCount: 89,
    lastActivity: '2024-01-15T09:15:00Z',
    isPrivate: false,
    color: 'purple',
    icon: '🤖'
  },
  {
    id: '3',
    name: 'Engineering Study Group',
    type: 'academic',
    role: 'moderator',
    memberCount: 34,
    lastActivity: '2024-01-14T16:45:00Z',
    isPrivate: true,
    color: 'green',
    icon: '⚙️'
  },
  {
    id: '4',
    name: 'West Hall Floor 3',
    type: 'housing',
    role: 'member',
    memberCount: 48,
    lastActivity: '2024-01-14T14:20:00Z',
    isPrivate: false,
    color: 'orange',
    icon: '🏠'
  },
  {
    id: '5',
    name: 'Tech Entrepreneurs',
    type: 'community',
    role: 'member',
    memberCount: 167,
    lastActivity: '2024-01-13T12:00:00Z',
    isPrivate: false,
    color: 'red',
    icon: '🚀'
  },
  {
    id: '6',
    name: 'Photography Club',
    type: 'club',
    role: 'member',
    memberCount: 78,
    lastActivity: '2024-01-12T15:30:00Z',
    isPrivate: false,
    color: 'pink',
    icon: '📸'
  }
];

const sampleTools: ProfileTool[] = [
  {
    id: '1',
    name: 'GPA Calculator Pro',
    description: 'Advanced GPA calculator with semester planning and grade projections',
    category: 'Academic',
    icon: '📊',
    lastUsed: '2024-01-15T09:00:00Z',
    usageCount: 234,
    isCreated: true,
    isFavorite: true,
    rating: 4.8,
    tags: ['grades', 'planning', 'academic']
  },
  {
    id: '2',
    name: 'Study Schedule Builder',
    description: 'Create optimized study schedules based on your class timetable',
    category: 'Productivity',
    icon: '📅',
    lastUsed: '2024-01-14T14:30:00Z',
    usageCount: 189,
    isCreated: true,
    isFavorite: true,
    rating: 4.6,
    tags: ['scheduling', 'study', 'productivity']
  },
  {
    id: '3',
    name: 'Campus Event Finder',
    description: 'Discover events happening around campus based on your interests',
    category: 'Social',
    icon: '🎉',
    lastUsed: '2024-01-13T16:00:00Z',
    usageCount: 145,
    isCreated: false,
    isFavorite: true,
    rating: 4.4,
    tags: ['events', 'social', 'discovery']
  },
  {
    id: '4',
    name: 'Room Booking Assistant',
    description: 'Find and book available study rooms across campus',
    category: 'Utility',
    icon: '🏢',
    lastUsed: '2024-01-12T11:15:00Z',
    usageCount: 67,
    isCreated: false,
    isFavorite: false,
    rating: 4.2,
    tags: ['booking', 'study rooms', 'utility']
  },
  {
    id: '5',
    name: 'Meal Plan Optimizer',
    description: 'Track your meal plan usage and get dining recommendations',
    category: 'Lifestyle',
    icon: '🍽️',
    lastUsed: '2024-01-11T18:45:00Z',
    usageCount: 89,
    isCreated: true,
    isFavorite: false,
    rating: 4.1,
    tags: ['dining', 'meal plan', 'optimization']
  },
  {
    id: '6',
    name: 'Course Review Aggregator',
    description: 'Aggregate reviews and ratings for courses and professors',
    category: 'Academic',
    icon: '⭐',
    lastUsed: '2024-01-10T13:20:00Z',
    usageCount: 156,
    isCreated: false,
    isFavorite: true,
    rating: 4.7,
    tags: ['reviews', 'courses', 'professors']
  }
];

const sampleActivity = [
  {
    id: '1',
    title: 'Created new tool: GPA Calculator Pro',
    description: 'Built an advanced GPA calculator with semester planning features',
    timestamp: '2024-01-15T10:30:00Z',
    type: 'tool_created' as const
  },
  {
    id: '2',
    title: 'Joined CS 101: Data Structures',
    description: 'Became a member of the course discussion space',
    timestamp: '2024-01-14T15:20:00Z',
    type: 'space_joined' as const
  },
  {
    id: '3',
    title: 'Led study session in Engineering Study Group',
    description: 'Helped 12 students with algorithm problems',
    timestamp: '2024-01-13T19:00:00Z',
    type: 'activity' as const
  },
  {
    id: '4',
    title: 'Received 5-star rating on Study Schedule Builder',
    description: 'Users praised the intuitive interface and helpful features',
    timestamp: '2024-01-12T14:45:00Z',
    type: 'achievement' as const
  },
  {
    id: '5',
    title: 'Connected with 8 new students',
    description: 'Expanded network through Robotics Club activities',
    timestamp: '2024-01-11T16:30:00Z',
    type: 'social' as const
  },
  {
    id: '6',
    title: 'Completed 15-day study streak',
    description: 'Maintained consistent daily learning activity',
    timestamp: '2024-01-10T20:15:00Z',
    type: 'milestone' as const
  }
];

// Basic examples
export const Default: Story = {
  args: {
    user: sampleUser,
    stats: sampleStats,
    spaces: sampleSpaces,
    tools: sampleTools,
    recentActivity: sampleActivity,
    isOwnProfile: true,
    loading: false,
    layout: 'desktop',
    spacing: 'normal',
  },
};

export const OtherUserProfile: Story = {
  args: {
    user: {
      ...sampleUser,
      name: 'Sarah Chen',
      handle: 'sarahc',
      bio: 'Computer Science senior and tool creator. Built 15+ tools used by thousands of students.',
      major: 'Electrical Engineering & Computer Science',
      school: 'MIT',
    },
    stats: {
      ...sampleStats,
      toolsUsed: 23,
      spacesLed: 5,
      reputation: 4250,
    },
    spaces: sampleSpaces,
    tools: sampleTools,
    recentActivity: sampleActivity,
    isOwnProfile: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    user: sampleUser,
    stats: sampleStats,
    spaces: [],
    tools: [],
    recentActivity: [],
    isOwnProfile: true,
    loading: true,
  },
};

export const MobileLayout: Story = {
  args: {
    user: sampleUser,
    stats: sampleStats,
    spaces: sampleSpaces.slice(0, 4),
    tools: sampleTools.slice(0, 4),
    recentActivity: sampleActivity.slice(0, 4),
    isOwnProfile: true,
    loading: false,
    layout: 'mobile',
    spacing: 'tight',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Campus profile scenarios
export const CampusProfileScenarios: Story = {
  render: () => {
    const [selectedProfile, setSelectedProfile] = useState('student');

    const profiles = {
      student: {
        user: {
          ...sampleUser,
          name: 'Marcus Johnson',
          handle: 'marcusj',
          bio: 'Mathematics major and study group enthusiast. Leading 3 active study groups and helping fellow students excel.',
          major: 'Mathematics',
          school: 'University of Texas at Austin',
          isBuilder: false,
          onlineStatus: 'online' as const,
        },
        stats: {
          spacesJoined: 18,
          spacesActive: 6,
          spacesLed: 3,
          toolsUsed: 8,
          connectionsCount: 89,
          totalActivity: 456,
          currentStreak: 12,
          longestStreak: 28,
          reputation: 1567,
          achievements: 5,
        },
        spaces: [
          {
            id: '1',
            name: 'Calculus II Study Group',
            type: 'academic' as const,
            role: 'leader' as const,
            memberCount: 24,
            lastActivity: '2024-01-15T10:30:00Z',
            isPrivate: false,
            icon: '∫'
          },
          {
            id: '2',
            name: 'Math Tutoring Center',
            type: 'academic' as const,
            role: 'moderator' as const,
            memberCount: 67,
            lastActivity: '2024-01-14T16:45:00Z',
            isPrivate: false,
            icon: '📐'
          },
          {
            id: '3',
            name: 'Statistics Help Forum',
            type: 'academic' as const,
            role: 'leader' as const,
            memberCount: 43,
            lastActivity: '2024-01-14T14:20:00Z',
            isPrivate: false,
            icon: '📊'
          }
        ],
        tools: [
          {
            id: '1',
            name: 'Graphing Calculator',
            description: 'Advanced graphing tool for calculus problems',
            category: 'Academic',
            icon: '📈',
            lastUsed: '2024-01-15T09:00:00Z',
            usageCount: 45,
            isCreated: false,
            isFavorite: true,
            rating: 4.5,
            tags: ['math', 'graphing', 'calculus']
          },
          {
            id: '2',
            name: 'Study Timer',
            description: 'Pomodoro timer with study session tracking',
            category: 'Productivity',
            icon: '⏱️',
            lastUsed: '2024-01-14T14:30:00Z',
            usageCount: 89,
            isCreated: false,
            isFavorite: true,
            rating: 4.3,
            tags: ['productivity', 'timer', 'focus']
          }
        ]
      },
      builder: {
        user: {
          ...sampleUser,
          name: 'Emma Davis',
          handle: 'emmad',
          bio: 'UI/UX designer turned full-stack developer. Creating beautiful and functional tools for campus communities.',
          major: 'Design & Computer Science',
          school: 'Stanford University',
          isBuilder: true,
          isVerified: true,
        },
        stats: {
          spacesJoined: 15,
          spacesActive: 9,
          spacesLed: 4,
          toolsUsed: 28,
          connectionsCount: 234,
          totalActivity: 892,
          currentStreak: 23,
          longestStreak: 56,
          reputation: 3456,
          achievements: 12,
        },
        spaces: [
          {
            id: '1',
            name: 'Design Systems Community',
            type: 'community' as const,
            role: 'leader' as const,
            memberCount: 156,
            lastActivity: '2024-01-15T10:30:00Z',
            isPrivate: false,
            icon: '🎨'
          },
          {
            id: '2',
            name: 'Tech Builders Collective',
            type: 'community' as const,
            role: 'moderator' as const,
            memberCount: 89,
            lastActivity: '2024-01-14T16:45:00Z',
            isPrivate: false,
            icon: '⚡'
          }
        ],
        tools: [
          {
            id: '1',
            name: 'Campus Event Planner',
            description: 'Comprehensive event planning tool for student organizations',
            category: 'Social',
            icon: '📅',
            lastUsed: '2024-01-15T09:00:00Z',
            usageCount: 1234,
            isCreated: true,
            isFavorite: true,
            rating: 4.9,
            tags: ['events', 'planning', 'organizations']
          },
          {
            id: '2',
            name: 'Study Room Finder',
            description: 'Find and book available study spaces across campus',
            category: 'Utility',
            icon: '🏢',
            lastUsed: '2024-01-14T14:30:00Z',
            usageCount: 890,
            isCreated: true,
            isFavorite: true,
            rating: 4.7,
            tags: ['study rooms', 'booking', 'campus']
          },
          {
            id: '3',
            name: 'Course Planner Pro',
            description: 'Advanced course planning with prerequisites and scheduling',
            category: 'Academic',
            icon: '📚',
            lastUsed: '2024-01-13T16:00:00Z',
            usageCount: 756,
            isCreated: true,
            isFavorite: true,
            rating: 4.8,
            tags: ['courses', 'planning', 'academic']
          }
        ]
      },
      freshman: {
        user: {
          ...sampleUser,
          name: 'Jordan Kim',
          handle: 'jordank',
          bio: 'Freshman excited to explore campus life and make new connections. Interested in biology and pre-med track.',
          major: 'Biology',
          gradYear: '2027',
          school: 'UCLA',
          isBuilder: false,
          isVerified: false,
        },
        stats: {
          spacesJoined: 5,
          spacesActive: 3,
          spacesLed: 0,
          toolsUsed: 4,
          connectionsCount: 12,
          totalActivity: 89,
          currentStreak: 3,
          longestStreak: 7,
          reputation: 234,
          achievements: 2,
        },
        spaces: [
          {
            id: '1',
            name: 'Biology 101',
            type: 'course' as const,
            role: 'member' as const,
            memberCount: 234,
            lastActivity: '2024-01-15T10:30:00Z',
            isPrivate: false,
            icon: '🧬'
          },
          {
            id: '2',
            name: 'Freshman Floor Community',
            type: 'housing' as const,
            role: 'member' as const,
            memberCount: 48,
            lastActivity: '2024-01-14T20:15:00Z',
            isPrivate: false,
            icon: '🏠'
          }
        ],
        tools: [
          {
            id: '1',
            name: 'Campus Map',
            description: 'Interactive campus map with building locations',
            category: 'Utility',
            icon: '🗺️',
            lastUsed: '2024-01-15T08:30:00Z',
            usageCount: 23,
            isCreated: false,
            isFavorite: true,
            rating: 4.2,
            tags: ['campus', 'navigation', 'map']
          },
          {
            id: '2',
            name: 'Dining Hall Menu',
            description: 'Check daily menus and nutritional information',
            category: 'Lifestyle',
            icon: '🍽️',
            lastUsed: '2024-01-14T12:00:00Z',
            usageCount: 34,
            isCreated: false,
            isFavorite: true,
            rating: 4.0,
            tags: ['dining', 'food', 'nutrition']
          }
        ]
      }
    };

    const currentProfile = profiles[selectedProfile as keyof typeof profiles];

    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="p-6">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Campus Profile Examples</h2>
            
            <div className="flex space-x-4 mb-8">
              {Object.entries(profiles).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => setSelectedProfile(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedProfile === key
                      ? 'bg-hive-gold text-hive-background-primary'
                      : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                  }`}
                >
                  {profile.user.name} ({key})
                </button>
              ))}
            </div>
          </div>
        </div>

        <ProfileSystem
          user={currentProfile.user}
          stats={currentProfile.stats}
          spaces={currentProfile.spaces}
          tools={currentProfile.tools}
          recentActivity={sampleActivity}
          isOwnProfile={true}
          spacing="normal"
        />
      </div>
    );
  },
};

// Profile states
export const IncompleteProfile: Story = {
  args: {
    user: {
      ...sampleUser,
      bio: '',
      website: '',
      location: '',
    },
    stats: {
      spacesJoined: 2,
      spacesActive: 1,
      toolsUsed: 1,
      connectionsCount: 3,
      totalActivity: 24,
      currentStreak: 1,
      reputation: 89,
      achievements: 0,
    },
    spaces: sampleSpaces.slice(0, 2),
    tools: sampleTools.slice(0, 1),
    recentActivity: sampleActivity.slice(0, 2),
    isOwnProfile: true,
    loading: false,
  },
};

export const NonBuilderProfile: Story = {
  args: {
    user: {
      ...sampleUser,
      isBuilder: false,
      bio: 'Psychology major interested in understanding human behavior and social dynamics. Active in campus mental health advocacy.',
      major: 'Psychology'
    },
    stats: {
      spacesJoined: 12,
      spacesActive: 5,
      spacesLed: 1,
      toolsUsed: 6,
      connectionsCount: 78,
      totalActivity: 345,
      currentStreak: 8,
      longestStreak: 21,
      reputation: 1234,
      achievements: 4,
    },
    spaces: sampleSpaces.filter(space => !space.type.includes('club')),
    tools: sampleTools.filter(tool => !tool.isCreated),
    recentActivity: sampleActivity,
    isOwnProfile: true,
    loading: false,
  },
};

// Interactive profile system
export const InteractiveProfileSystem: Story = {
  render: () => {
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [loading, setLoading] = useState(false);
    const [layout, setLayout] = useState<'desktop' | 'mobile'>('desktop');

    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="p-6">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Interactive Profile System</h2>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setIsOwnProfile(!isOwnProfile)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isOwnProfile
                    ? 'bg-hive-gold text-hive-background-primary'
                    : 'border border-hive-border-default text-hive-text-primary hover:bg-hive-interactive-hover'
                }`}
              >
                {isOwnProfile ? 'Own Profile' : 'Other Profile'}
              </button>
              
              <button
                onClick={() => setLayout(layout === 'desktop' ? 'mobile' : 'desktop')}
                className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors"
              >
                {layout === 'desktop' ? 'Desktop' : 'Mobile'} Layout
              </button>
              
              <button
                onClick={simulateLoading}
                className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors"
              >
                Simulate Loading
              </button>
            </div>
          </div>
        </div>

        <ProfileSystem
          user={sampleUser}
          stats={sampleStats}
          spaces={sampleSpaces}
          tools={sampleTools}
          recentActivity={sampleActivity}
          isOwnProfile={isOwnProfile}
          loading={loading}
          layout={layout}
          spacing="normal"
          onEditProfile={() => alert('Edit profile clicked')}
          onEditAvatar={() => alert('Edit avatar clicked')}
          onShareProfile={() => alert('Share profile clicked')}
          onMessageUser={() => alert('Message user clicked')}
          onFollowUser={() => alert('Follow user clicked')}
          onPrivacySettings={() => alert('Privacy settings clicked')}
        />
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    user: sampleUser,
    stats: sampleStats,
    spaces: sampleSpaces,
    tools: sampleTools,
    recentActivity: sampleActivity,
    isOwnProfile: true,
    loading: false,
    layout: 'desktop',
    spacing: 'normal',
    onEditProfile: () => alert('Edit profile clicked'),
    onEditAvatar: () => alert('Edit avatar clicked'),
    onShareProfile: () => alert('Share profile clicked'),
  },
};