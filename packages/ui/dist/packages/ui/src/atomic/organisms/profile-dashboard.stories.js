import { jsx as _jsx } from "react/jsx-runtime";
import { ProfileDashboard } from './profile-dashboard';
const meta = {
    title: 'HIVE/Organisms/ProfileDashboard',
    component: ProfileDashboard,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'hive-dark',
            values: [
                { name: 'hive-dark', value: 'var(--hive-background-primary)' },
                { name: 'hive-obsidian', value: 'var(--hive-background-primary)' },
            ],
        },
        docs: {
            description: {
                component: 'Complete Profile Dashboard organism combining Campus Identity Header, Spaces Card, Activity Feed, and Builder Tools into sophisticated BentoGrid layouts. Adapts beautifully across desktop, tablet, and mobile with campus-first social hierarchy.',
            },
        },
    },
    argTypes: {
        onAvatarClick: { action: 'avatar clicked' },
        onEditProfile: { action: 'edit profile clicked' },
        onSpaceClick: { action: 'space clicked' },
        onActivityClick: { action: 'activity clicked' },
        onToolClick: { action: 'tool clicked' },
        onCreateTool: { action: 'create tool clicked' },
        onBecomeBuilder: { action: 'become builder clicked' },
        onJoinSpace: { action: 'join space clicked' },
        onViewAllSpaces: { action: 'view all spaces clicked' },
        onViewAllActivities: { action: 'view all activities clicked' },
        layout: {
            control: { type: 'select' },
            options: ['desktop', 'tablet', 'mobile'],
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'focused'],
        },
        showBuilder: {
            control: { type: 'boolean' },
        },
    },
    decorators: [
        (Story) => (_jsx("div", { style: { minHeight: '100vh' }, children: _jsx(Story, {}) })),
    ],
};
export default meta;
// Mock data
const mockUser = {
    name: 'Sarah Chen',
    handle: 'sarahc_cs',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
    year: '2026',
    major: 'Computer Science',
    dorm: 'West Campus',
    isOnline: true,
    isBuilder: true,
    completionPercentage: 85,
};
const mockSpaces = [
    {
        id: '1',
        name: 'CS 101: Intro to Programming',
        type: 'course',
        memberCount: 847,
        unreadCount: 3,
        lastActivity: '2024-01-15T10:30:00Z',
        isPinned: true,
        recentActivity: {
            type: 'announcement',
            preview: 'Midterm exam scheduled for next Friday',
            timestamp: '2024-01-15T10:30:00Z'
        }
    },
    {
        id: '2',
        name: 'West Campus Residents',
        type: 'housing',
        memberCount: 234,
        unreadCount: 12,
        lastActivity: '2024-01-15T09:15:00Z',
        isFavorite: true,
        recentActivity: {
            type: 'message',
            preview: 'Anyone want to grab dinner tonight?',
            timestamp: '2024-01-15T09:15:00Z'
        }
    },
    {
        id: '3',
        name: 'Robotics Club',
        type: 'club',
        memberCount: 156,
        lastActivity: '2024-01-14T16:45:00Z',
        recentActivity: {
            type: 'event',
            preview: 'Weekly meeting moved to Thursday',
            timestamp: '2024-01-14T16:45:00Z'
        }
    },
    {
        id: '4',
        name: 'Study Abroad Alumni',
        type: 'community',
        memberCount: 89,
        unreadCount: 1,
        lastActivity: '2024-01-13T14:20:00Z',
        recentActivity: {
            type: 'message',
            preview: 'Share your favorite study abroad memories!',
            timestamp: '2024-01-13T14:20:00Z'
        }
    },
    {
        id: '5',
        name: 'Class of 2026',
        type: 'graduation',
        memberCount: 1203,
        unreadCount: 24,
        lastActivity: '2024-01-15T08:00:00Z',
        recentActivity: {
            type: 'announcement',
            preview: 'Senior year course registration opens Monday',
            timestamp: '2024-01-15T08:00:00Z'
        }
    }
];
const mockActivities = [
    {
        id: '1',
        type: 'announcement',
        title: 'Midterm Exam Schedule Released',
        content: 'Your Computer Science 101 midterm has been scheduled for Friday, January 26th at 10:00 AM in the main lecture hall.',
        author: {
            name: 'Prof. Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=32&h=32&fit=crop&crop=face',
            handle: 'prof_chen'
        },
        space: {
            id: 'cs101',
            name: 'CS 101: Intro to Programming',
            type: 'course'
        },
        timestamp: '2024-01-15T14:30:00Z',
        priority: 'high',
        isUnread: true,
        metadata: {
            likes: 12,
            replyCount: 8,
            eventDate: '2024-01-26T10:00:00Z'
        }
    },
    {
        id: '2',
        type: 'message',
        title: 'Study Group Formation',
        content: 'Hey everyone! Looking to form a study group for the upcoming midterm. We can meet in the library every Tuesday and Thursday.',
        author: {
            name: 'Marcus Thompson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            handle: 'marcus_builds'
        },
        space: {
            id: 'cs101',
            name: 'CS 101: Intro to Programming',
            type: 'course'
        },
        timestamp: '2024-01-15T13:45:00Z',
        priority: 'medium',
        isUnread: true,
        metadata: {
            likes: 5,
            replyCount: 3
        }
    },
    {
        id: '3',
        type: 'social',
        title: 'Dorm Game Night Tonight!',
        content: 'Join us in the common room at 8 PM for board games and pizza. All West Campus residents welcome!',
        author: {
            name: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            handle: 'alex_r'
        },
        space: {
            id: 'west-campus',
            name: 'West Campus Residents',
            type: 'housing'
        },
        timestamp: '2024-01-15T12:15:00Z',
        priority: 'medium',
        metadata: {
            likes: 18,
            replyCount: 12,
            eventDate: '2024-01-15T20:00:00Z'
        }
    },
    {
        id: '4',
        type: 'assignment',
        title: 'Programming Assignment 3 Posted',
        content: 'New assignment focusing on data structures and algorithms. Due next Friday.',
        author: {
            name: 'TA Jordan Kim',
            handle: 'jordan_ta'
        },
        space: {
            id: 'cs101',
            name: 'CS 101: Intro to Programming',
            type: 'course'
        },
        timestamp: '2024-01-15T11:00:00Z',
        priority: 'high',
        isUnread: false,
        metadata: {
            attachmentCount: 2,
            dueDate: '2024-01-22T23:59:00Z'
        }
    },
    {
        id: '5',
        type: 'achievement',
        title: 'Congratulations! Tool Featured',
        content: 'Your study planner tool has been featured in the HIVE showcase and gained 50+ users this week!',
        timestamp: '2024-01-15T09:30:00Z',
        priority: 'medium',
        metadata: {
            likes: 24
        }
    },
    {
        id: '6',
        type: 'event',
        title: 'Robotics Club Meeting',
        content: 'Weekly meeting to discuss the upcoming competition. New members welcome!',
        author: {
            name: 'Priya Patel',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face',
            handle: 'priya_robotics'
        },
        space: {
            id: 'robotics',
            name: 'Robotics Club',
            type: 'club'
        },
        timestamp: '2024-01-14T16:45:00Z',
        priority: 'medium',
        metadata: {
            eventDate: '2024-01-18T19:00:00Z',
            replyCount: 6
        }
    }
];
const mockAvailableTools = [
    {
        id: '1',
        name: 'Study Schedule Template',
        type: 'template',
        category: 'productivity',
        description: 'Create personalized study schedules that adapt to your class times',
        icon: '📅',
        difficulty: 'beginner',
        timeToCreate: '5 min',
        popularity: 5,
        usageCount: 1247
    },
    {
        id: '2',
        name: 'Grade Tracker Widget',
        type: 'widget',
        category: 'academic',
        description: 'Track your grades and GPA across all courses with visual insights',
        icon: '📊',
        difficulty: 'intermediate',
        timeToCreate: '10 min',
        popularity: 4,
        usageCount: 892
    },
    {
        id: '3',
        name: 'Dorm Event Automation',
        type: 'automation',
        category: 'social',
        description: 'Automatically notify dorm mates about upcoming events and activities',
        icon: '🎉',
        difficulty: 'advanced',
        timeToCreate: '20 min',
        popularity: 4,
        usageCount: 567,
        isPremium: true
    },
    {
        id: '4',
        name: 'Calendar Integration',
        type: 'integration',
        category: 'utility',
        description: 'Sync your class schedule with Google Calendar and other apps',
        icon: '🔗',
        difficulty: 'intermediate',
        timeToCreate: '15 min',
        popularity: 5,
        usageCount: 1056
    }
];
const mockCreatedTools = [
    {
        id: 'c1',
        name: 'My Study Planner',
        type: 'template',
        category: 'productivity',
        description: 'Personalized study schedule for CS courses',
        icon: '📚',
        createdAt: '2024-01-10T14:30:00Z',
        usageCount: 45,
        isPublic: true,
        likes: 12,
        isStarred: true
    },
    {
        id: 'c2',
        name: 'Dorm Chore Tracker',
        type: 'widget',
        category: 'utility',
        description: 'Track shared chores with roommates',
        icon: '🏠',
        createdAt: '2024-01-08T09:15:00Z',
        usageCount: 23,
        isPublic: false,
        likes: 0
    },
    {
        id: 'c3',
        name: 'Club Meeting Reminder',
        type: 'automation',
        category: 'social',
        description: 'Automated reminders for robotics club meetings',
        icon: '🤖',
        createdAt: '2024-01-05T16:45:00Z',
        usageCount: 67,
        isPublic: true,
        likes: 8
    }
];
// Default Desktop Layout - Builder User
export const Default = {
    args: {
        user: mockUser,
        spaces: mockSpaces,
        activities: mockActivities,
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        layout: 'desktop',
        showBuilder: true,
    },
};
// Non-Builder User - Shows subtle builder invitation
export const NonBuilder = {
    args: {
        user: { ...mockUser, isBuilder: false },
        spaces: mockSpaces,
        activities: mockActivities,
        availableTools: mockAvailableTools,
        createdTools: [],
        layout: 'desktop',
        showBuilder: true,
    },
};
// Tablet Layout
export const Tablet = {
    args: {
        user: mockUser,
        spaces: mockSpaces.slice(0, 3),
        activities: mockActivities.slice(0, 4),
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        layout: 'tablet',
        showBuilder: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};
// Mobile Layout - Campus social priority
export const Mobile = {
    args: {
        user: mockUser,
        spaces: mockSpaces.slice(0, 3),
        activities: mockActivities.slice(0, 3),
        availableTools: mockAvailableTools.slice(0, 2),
        createdTools: mockCreatedTools.slice(0, 1),
        layout: 'mobile',
        showBuilder: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
// Loading States
export const Loading = {
    args: {
        user: mockUser,
        spaces: [],
        activities: [],
        availableTools: [],
        createdTools: [],
        layout: 'desktop',
        showBuilder: true,
        isLoading: {
            profile: false,
            spaces: true,
            activities: true,
            tools: true,
        },
    },
};
// New Student - Minimal data
export const NewStudent = {
    args: {
        user: {
            ...mockUser,
            name: 'Alex Rivera',
            handle: 'alex_r',
            year: '2027',
            major: 'Biology',
            dorm: 'Freshman Quad',
            isOnline: false,
            isBuilder: false,
            completionPercentage: 25,
        },
        spaces: mockSpaces.slice(0, 2),
        activities: mockActivities.slice(0, 2),
        availableTools: mockAvailableTools,
        createdTools: [],
        layout: 'desktop',
        showBuilder: true,
    },
};
// Focused Layout - No builder tools
export const Focused = {
    args: {
        user: mockUser,
        spaces: mockSpaces,
        activities: mockActivities,
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        layout: 'desktop',
        variant: 'focused',
        showBuilder: false,
    },
};
// Compact Variant
export const Compact = {
    args: {
        user: mockUser,
        spaces: mockSpaces.slice(0, 3),
        activities: mockActivities.slice(0, 4),
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        layout: 'desktop',
        variant: 'compact',
        showBuilder: true,
    },
};
// High Activity - Lots of unread content
export const HighActivity = {
    args: {
        user: mockUser,
        spaces: mockSpaces.map(space => ({
            ...space,
            unreadCount: Math.floor(Math.random() * 50) + 1
        })),
        activities: mockActivities.map((activity, index) => ({
            ...activity,
            isUnread: index < 4
        })),
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        layout: 'desktop',
        showBuilder: true,
    },
};
// Empty States - New user experience
export const EmptyStates = {
    args: {
        user: {
            ...mockUser,
            isBuilder: false,
            completionPercentage: 0,
        },
        spaces: [],
        activities: [],
        availableTools: mockAvailableTools,
        createdTools: [],
        layout: 'desktop',
        showBuilder: true,
    },
};
//# sourceMappingURL=profile-dashboard.stories.js.map