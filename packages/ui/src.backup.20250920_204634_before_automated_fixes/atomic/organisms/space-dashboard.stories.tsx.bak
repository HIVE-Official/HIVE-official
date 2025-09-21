import type { Meta, StoryObj } from '@storybook/react';
import { SpaceDashboard } from './space-dashboard';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SpaceDashboard> = {
  title: 'HIVE/Spaces/Organisms/SpaceDashboard',
  component: SpaceDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main Space Dashboard with 60/40 layout featuring Post Board and Tool Grid. This is the core interface users see when inside a space.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
    },
    showToolGrid: {
      control: { type: 'boolean' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceDashboard>;

const sampleUniversitySpace = {
  id: 'cs101',
  name: 'CS 101: Introduction to Programming',
  description: 'Learn the fundamentals of computer programming with Python',
  memberCount: 247,
  type: 'university' as const,
  status: 'active' as const,
  logoUrl: '',
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: '2024-01-20T15:30:00Z',
  academic: {
    department: 'Computer Science',
    courseCode: 'CS 101',
    credits: 3,
    semester: 'Spring 2024',
    professor: 'Dr. Sarah Chen',
    schedule: 'MWF 10:00-11:00',
    isOfficial: true,
  },
  enrollment: {
    capacity: 300,
    enrolled: 247,
    waitlist: 12,
    status: 'open' as const,
  },
};

const samplePosts = [
  {
    id: '1',
    type: 'announcement' as const,
    content: 'Welcome to CS 101! Please complete the setup instructions in your course packet before our first lab session.',
    author: {
      id: 'prof1',
      name: 'Dr. Sarah Chen',
      role: 'leader' as const,
    },
    timestamp: '2024-01-20T14:30:00Z',
    reactions: [
      { emoji: '👍', count: 23, userReacted: false },
      { emoji: '❤️', count: 8, userReacted: true },
    ],
  },
  {
    id: '2',
    type: 'event' as const,
    content: 'Reminder: Lab session tomorrow in the computer lab. We\'ll be covering variables and basic input/output.',
    author: {
      id: 'ta1',
      name: 'Alex Rodriguez',
      role: 'co_leader' as const,
    },
    timestamp: '2024-01-19T16:45:00Z',
    metadata: {
      eventDate: 'Tomorrow at 2:00 PM',
    },
    reactions: [
      { emoji: '👍', count: 15, userReacted: false },
    ],
  },
  {
    id: '3',
    type: 'text' as const,
    content: 'Has anyone else had trouble with the Python installation? I\'m getting an error when trying to run the hello world program.',
    author: {
      id: 'student1',
      name: 'Maya Patel',
      role: 'member' as const,
    },
    timestamp: '2024-01-19T11:20:00Z',
    reactions: [
      { emoji: '👍', count: 7, userReacted: false },
      { emoji: '🤔', count: 3, userReacted: false },
    ],
  },
];

const sampleTools = [
  {
    id: 'event-system',
    name: 'Event Management',
    description: 'Create and manage class events, lab sessions, and office hours',
    icon: '📅',
    status: 'active' as const,
    category: 'coordination' as const,
    outputs: 3,
    usageCount: 15,
    lastUsed: '2024-01-20T10:00:00Z',
  },
  {
    id: 'assignment-tracker',
    name: 'Assignment Tracker',
    description: 'Track assignments, due dates, and submission status',
    icon: '📝',
    status: 'configured' as const,
    category: 'academic' as const,
    outputs: 8,
    usageCount: 42,
    lastUsed: '2024-01-19T14:30:00Z',
  },
  {
    id: 'study-groups',
    name: 'Study Groups',
    description: 'Form and coordinate study groups for exams and projects',
    icon: '👥',
    status: 'needs_setup' as const,
    category: 'social' as const,
    outputs: 0,
  },
];

export const UniversitySpaceAsLeader: Story = {
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'prof1',
      role: 'leader',
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
};

export const UniversitySpaceAsMember: Story = {
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'student1',
      role: 'member',
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
};

export const UniversitySpaceAsNonMember: Story = {
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts.slice(0, 1), // Non-members see limited content
    plantedTools: sampleTools,
    currentUser: {
      id: 'visitor1',
      role: 'non_member',
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
};

const sampleResidentialSpace = {
  id: 'ellicott-3rd',
  name: 'Ellicott Complex - 3rd Floor',
  description: 'Connect with your floormates and coordinate floor activities',
  memberCount: 42,
  type: 'residential' as const,
  status: 'active' as const,
  createdAt: '2024-01-10T08:00:00Z',
  updatedAt: '2024-01-20T15:30:00Z',
  housing: {
    buildingName: 'Ellicott Complex',
    floor: 3,
    wing: 'East',
    buildingType: 'dorm' as const,
    capacity: 50,
  },
  community: {
    residents: 42,
    ra: {
      name: 'Jordan Smith',
      contact: 'jordan.smith@university.edu',
    },
    amenities: ['Study Lounge', 'Kitchen', 'Laundry'],
  },
};

const residentialPosts = [
  {
    id: '1',
    type: 'announcement' as const,
    content: 'Floor meeting tonight at 7 PM in the study lounge. We\'ll be discussing upcoming events and floor rules.',
    author: {
      id: 'ra1',
      name: 'Jordan Smith',
      role: 'leader' as const,
    },
    timestamp: '2024-01-20T12:00:00Z',
    reactions: [
      { emoji: '👍', count: 18, userReacted: true },
    ],
  },
  {
    id: '2',
    type: 'text' as const,
    content: 'Anyone want to order pizza for the Super Bowl watch party tomorrow? I\'m thinking we get a few large pizzas to share.',
    author: {
      id: 'resident1',
      name: 'Sam Wilson',
      role: 'member' as const,
    },
    timestamp: '2024-01-19T18:30:00Z',
    reactions: [
      { emoji: '🍕', count: 12, userReacted: false },
      { emoji: '👍', count: 8, userReacted: true },
    ],
  },
];

const residentialTools = [
  {
    id: 'laundry-tracker',
    name: 'Laundry Tracker',
    description: 'Check washer and dryer availability in real-time',
    icon: '👕',
    status: 'active' as const,
    category: 'coordination' as const,
    outputs: 5,
    usageCount: 67,
  },
  {
    id: 'floor-events',
    name: 'Floor Events',
    description: 'Plan and coordinate floor activities and social events',
    icon: '🎉',
    status: 'active' as const,
    category: 'social' as const,
    outputs: 12,
    usageCount: 28,
  },
];

export const ResidentialSpace: Story = {
  args: {
    space: sampleResidentialSpace,
    posts: residentialPosts,
    plantedTools: residentialTools,
    currentUser: {
      id: 'resident1',
      role: 'member',
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
};

export const EmptySpace: Story = {
  args: {
    space: {
      ...sampleUniversitySpace,
      name: 'New Study Group',
      memberCount: 1,
      type: 'student' as const,
    },
    posts: [],
    plantedTools: [],
    currentUser: {
      id: 'creator1',
      role: 'leader',
    },
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty space with no posts or tools - typical for newly created spaces.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    space: sampleUniversitySpace,
    posts: samplePosts,
    plantedTools: sampleTools,
    currentUser: {
      id: 'student1',
      role: 'member',
    },
    variant: 'compact',
    showToolGrid: false,
    onJoinSpace: action('join-space'),
    onLeaveSpace: action('leave-space'),
    onPlantTool: action('plant-tool'),
    onConfigureTool: action('configure-tool'),
    onRemoveTool: action('remove-tool'),
    onCreatePost: action('create-post'),
    onPostReaction: action('post-reaction'),
    onShareSpace: action('share-space'),
    onManageSpace: action('manage-space'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant without tool grid - useful for mobile or focused post viewing.',
      },
    },
  },
};