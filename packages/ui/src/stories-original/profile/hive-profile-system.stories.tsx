import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileSystem } from '../../components/profile/profile-system';
import { User, Space, Event, Connection, HiveLabSection } from '../../components/profile/types';

// HIVE Profile System - Tech Sleek Social Platform
const meta: Meta<typeof ProfileSystem> = {
  title: 'Profile/🌟 HIVE Profile System',
  component: ProfileSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**HIVE Profile System** - Tech sleek social platform for the modern campus

The complete profile experience for HIVE's dark luxury aesthetic. Built with obsidian backgrounds, gold accents, and sophisticated interactions that reflect our premium brand positioning in the campus social space.

## HIVE Brand Alignment
- **Dark Luxury Aesthetic**: Obsidian (var(--hive-background-primary)) backgrounds with graphite (#1A1A1C) cards
- **Gold Accent System**: Strategic use of HIVE gold (var(--hive-brand-secondary)) for premium highlights
- **Glass Morphism**: Subtle overlays with 'glass-medium' effects for depth
- **Tech Sleek Typography**: Platinum (#E5E5E7) primary text with silver (var(--hive-text-secondary)) secondary

## Campus Social Features
- **My Spaces**: Course communities, housing groups, clubs, and academic spaces
- **Smart Calendar**: Class schedules, events, and academic deadlines
- **Campus Connections**: Dorm classmates, study partners, and social recommendations
- **HIVE Lab**: Student-built tools and campus productivity enhancements

## Design System Integration
- Uses HIVE design tokens throughout
- Leverages motion system (गति) for liquid interactions
- Follows component interconnection principles
- Evolutionary approach that enhances existing patterns
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ProfileSystem>;

// HIVE Brand Users
const createHiveBuilder = (): User => ({
  id: 'hive-builder',
  fullName: 'Alex Chen',
  handle: 'alexc_builds',
  email: 'alex.chen@stanford.edu',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  major: 'Computer Science',
  graduationYear: 2025,
  school: 'Stanford University',
  isBuilder: true,
  isPublic: true,
  builderLevel: 'Expert',
  memberSince: '2023-08-01',
  onlineStatus: 'online',
  timezone: 'America/Los_Angeles',
  location: 'Palo Alto, CA',
  bio: 'Building the future of campus tech with HIVE. CS major passionate about creating tools that connect students and enhance the university experience.',
  interests: ['React', 'TypeScript', 'Campus Tech', 'Design Systems', 'Student Tools', 'Social Platforms'],
  stats: {
    totalSpaces: 18,
    activeSpaces: 12,
    toolsCreated: 8,
    connectionsCount: 156,
    streakDays: 89,
    totalActivity: 2847
  },
  privacy: {
    ghostMode: false,
    showActivity: true,
    showSpaces: true,
    showConnections: true
  }
});

const createHiveStudent = (): User => ({
  id: 'hive-student',
  fullName: 'Sarah Kim',
  handle: 'sarahk_hive',
  email: 'sarah.kim@berkeley.edu',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=150&h=150&fit=crop&crop=face',
  major: 'Business Administration',
  graduationYear: 2024,
  school: 'UC Berkeley',
  isBuilder: false,
  isPublic: true,
  builderLevel: 'Beginner',
  memberSince: '2023-09-15',
  onlineStatus: 'online',
  timezone: 'America/Los_Angeles',
  location: 'Berkeley, CA',
  bio: 'Connecting with my campus community through HIVE. Love discovering new study groups and campus events!',
  interests: ['Business', 'Networking', 'Study Groups', 'Campus Events', 'Career Development'],
  stats: {
    totalSpaces: 9,
    activeSpaces: 7,
    toolsCreated: 1,
    connectionsCount: 43,
    streakDays: 67,
    totalActivity: 892
  },
  privacy: {
    ghostMode: false,
    showActivity: true,
    showSpaces: true,
    showConnections: true
  }
});

// HIVE Spaces - Campus Communities
const createHiveSpaces = (): Space[] => [
  {
    id: 'cs142-web-dev',
    name: 'CS 142: Web Applications',
    type: 'course',
    memberCount: 89,
    unreadCount: 12,
    lastActivity: '8 minutes ago',
    isPrivate: false,
    isFavorite: true,
    isPinned: true,
    recentPosts: [
      {
        id: 'post1',
        author: 'Professor Rodriguez',
        content: 'Assignment 3 (React Components) is now live. Remember to use the HIVE design system patterns we discussed in class!',
        timestamp: '8 minutes ago',
        type: 'announcement',
        replies: 23,
        reactions: { likes: 45, helpful: 18 }
      }
    ]
  },
  {
    id: 'stern-4th-floor',
    name: 'Stern Hall 4th Floor',
    type: 'housing',
    memberCount: 34,
    unreadCount: 7,
    lastActivity: '23 minutes ago',
    isPrivate: false,
    isFavorite: true,
    recentPosts: [
      {
        id: 'post2',
        author: 'Jordan Lee',
        content: 'Late night study session in the lounge! Join us for CS midterm prep 📚',
        timestamp: '23 minutes ago',
        type: 'discussion',
        replies: 8,
        reactions: { likes: 12, helpful: 5 }
      }
    ]
  },
  {
    id: 'startup-founders',
    name: 'Campus Startup Founders',
    type: 'club',
    memberCount: 156,
    unreadCount: 5,
    lastActivity: '1 hour ago',
    isPrivate: false,
    isFavorite: false,
    recentPosts: [
      {
        id: 'post3',
        author: 'Startup Club',
        content: 'YC Partner office hours this Friday! Sign up through HIVE tools.',
        timestamp: '1 hour ago',
        type: 'announcement',
        replies: 34,
        reactions: { likes: 89, helpful: 23 }
      }
    ]
  }
];

// HIVE Events - Campus Schedule
const createHiveEvents = (): Event[] => [
  {
    id: 'cs142-lecture',
    title: 'CS 142: React Architecture',
    time: '25 minutes',
    type: 'class',
    location: 'Gates Building B01',
    attendees: ['Prof. Rodriguez', '89 students'],
    isRecurring: true,
    hasReminder: true,
    reminderMinutes: 15,
    metadata: {
      professor: 'Prof. Rodriguez',
      room: 'B01',
      buildingCode: 'GATES'
    }
  },
  {
    id: 'study-group',
    title: 'HIVE Study Group: Algorithms',
    time: '2 hours',
    type: 'academic',
    location: 'Green Library, Room 125',
    attendees: ['Study group members'],
    hasReminder: true,
    reminderMinutes: 30,
    metadata: {
      spaceId: 'cs161-algorithms',
      rsvpStatus: 'yes'
    }
  },
  {
    id: 'office-hours',
    title: 'HIVE Builder Office Hours',
    time: 'Tomorrow 2:00 PM',
    type: 'meeting',
    location: 'Design Lab',
    attendees: ['HIVE builders', 'Students'],
    description: 'Get help building your campus tools and learn about HIVE development'
  }  
];

// HIVE Connections - Campus Social
const createHiveConnections = (): Connection[] => [
  {
    id: 'dorm-classmates',
    type: 'dorm_classmate',
    message: 'Found 3 people in Stern Hall who are also in CS 142',
    people: ['Emma Rodriguez', 'Marcus Liu', 'Priya Patel'],
    action: 'Connect with classmates',
    priority: 'high'
  },
  {
    id: 'hive-tools',
    type: 'tool_usage',
    message: '12 students are using your Grade Calculator tool - they love it!',
    people: ['Tool users community'],
    action: 'View feedback and iterate',
    priority: 'medium'
  },
  {
    id: 'study-partners',
    type: 'multi_overlap',
    message: 'Perfect study partners found: same classes, similar schedules',
    people: ['Jordan Kim', 'Taylor Wong'],
    action: 'Form study group',
    priority: 'high'
  }
];

// HIVE Lab - Campus Tool Building
const createHiveLab = (): HiveLabSection => ({
  isLocked: false,
  availableTools: [
    'Course Schedule Optimizer',
    'Study Group Matcher',
    'Campus Event Finder',
    'Grade Calculator',
    'Room Booking Assistant',
    'Textbook Exchange'
  ],
  createdTools: [
    'HIVE Grade Tracker',
    'Campus Dining Optimizer',
    'Study Spot Finder',
    'Event RSVP Manager',
    'Class Reminder System',
    'Roommate Compatibility Quiz',
    'Campus Navigation Helper',
    'Assignment Due Date Tracker'
  ],
  comingSoon: [
    'AI Study Assistant',
    'Campus Social Graph Analyzer',
    'Smart Calendar Integration',
    'Peer Tutoring Marketplace'
  ]
});

// Main HIVE Profile Stories
export const HIVEBuilder: Story = {
  name: '🚀 HIVE Builder Profile',
  args: {
    user: createHiveBuilder(),
    spaces: createHiveSpaces(),
    events: createHiveEvents(),
    connections: createHiveConnections(),
    hiveLab: createHiveLab(),
    completionStatus: {
      percentage: 95,
      missing: ['Add more interests']
    }
  }
};

export const HIVEStudent: Story = {
  name: '🎓 HIVE Student Profile',
  args: {
    user: createHiveStudent(),
    spaces: createHiveSpaces().slice(0, 2), // Fewer spaces for regular student
    events: createHiveEvents().slice(0, 2),
    connections: createHiveConnections().slice(0, 2),
    hiveLab: {
      isLocked: false,
      availableTools: [
        'Study Schedule Planner',
        'Campus Event Finder',
        'Grade Calculator',
        'Study Group Matcher'
      ],
      createdTools: [
        'Personal Study Timer'
      ],
      comingSoon: [
        'AI Study Assistant',
        'Peer Tutoring Network'
      ]
    },
    completionStatus: {
      percentage: 78,
      missing: ['Connect more social accounts', 'Join more campus communities']
    }
  }
};

export const HIVENewUser: Story = {
  name: '✨ New HIVE User Experience',
  args: {
    user: {
      id: 'new-user',
      fullName: 'Jordan Taylor',
      handle: 'jordant_new',
      email: 'jordan.taylor@stanford.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      major: 'Psychology',
      graduationYear: 2027,
      school: 'Stanford University',
      isBuilder: false,
      isPublic: true,
      memberSince: '2024-01-15',
      onlineStatus: 'online',
      bio: 'Just joined HIVE! Excited to connect with my campus community.',
      interests: ['Psychology', 'Mental Health'],
      stats: {
        totalSpaces: 1,
        activeSpaces: 1,
        toolsCreated: 0,
        connectionsCount: 3,
        streakDays: 5,
        totalActivity: 28
      },
      privacy: {
        ghostMode: false,
        showActivity: true,
        showSpaces: true,
        showConnections: true
      }
    },
    spaces: [
      {
        id: 'psych-101',
        name: 'PSYC 101: Introduction to Psychology',
        type: 'course',
        memberCount: 234,
        unreadCount: 3,
        lastActivity: '2 hours ago',
        isPrivate: false,
        isFavorite: true
      }
    ],
    events: [
      {
        id: 'psych-lecture',
        title: 'PSYC 101: Cognitive Psychology',
        time: '45 minutes',
        type: 'class',
        location: 'Psychology Building 120',
        attendees: ['Prof. Johnson', '234 students']
      }
    ],
    connections: [
      {
        id: 'welcome-connections',
        type: 'dorm_classmate',
        message: 'Welcome to HIVE! Found 8 students in your dorm and classes',
        people: ['Nearby students'],
        action: 'Discover your community',
        priority: 'high'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: [
        'Study Schedule Planner',
        'Campus Map Navigator',
        'Class Reminder System'
      ],
      createdTools: [],
      comingSoon: [
        'Study Group Matcher',
        'Campus Event Finder'
      ]
    },
    showOnboarding: true,
    completionStatus: {
      percentage: 35,
      missing: [
        'Add profile photo',
        'Complete bio',
        'Add more interests',
        'Join campus communities',
        'Connect your calendar'
      ]
    }
  }
};

export const HIVEMobileExperience: Story = {
  name: '📱 HIVE Mobile Experience',
  args: {
    ...HIVEBuilder.args,
    isMobile: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
};

export const HIVELoadingState: Story = {
  name: '⏳ HIVE Loading Experience',
  args: {
    user: null,
    spaces: [],
    events: [],
    connections: [],
    hiveLab: null,
    isLoading: true,
    loadingStates: {
      profile: true,
      spaces: true,
      events: true,
      connections: true,
      hiveLab: true
    }
  }
};

export const HIVEErrorState: Story = {
  name: '🚨 HIVE Network Error',
  args: {
    user: createHiveStudent(),
    spaces: [],
    events: [],
    connections: [],
    hiveLab: null,
    showErrors: true,
    errors: {
      apiError: 'Unable to connect to HIVE servers. Check your connection and try again.',
      spacesError: 'Failed to load your campus communities',
      eventsError: 'Calendar sync unavailable',
      connectionsError: 'Connection suggestions temporarily unavailable'
    }
  }
};