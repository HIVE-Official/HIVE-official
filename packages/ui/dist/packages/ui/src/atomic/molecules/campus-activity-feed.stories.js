import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CampusActivityFeed } from './campus-activity-feed';
const meta = {
    title: 'HIVE/Profile/CampusActivityFeed',
    component: CampusActivityFeed,
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
                component: 'Campus Activity Feed with sophisticated timeline aesthetic. Shows real-time campus life with elegant hover states and social-first information hierarchy.',
            },
        },
    },
    argTypes: {
        onActivityClick: { action: 'activity clicked' },
        onViewAll: { action: 'view all clicked' },
        onFilterChange: { action: 'filter changed' },
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'detailed'],
        },
        showFilters: {
            control: { type: 'boolean' },
        },
        isLoading: {
            control: { type: 'boolean' },
        },
        maxItems: {
            control: { type: 'number', min: 1, max: 20 },
        },
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-2xl mx-auto", children: _jsx(Story, {}) }) })),
    ],
};
export default meta;
// Mock activities data
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
    },
    {
        id: '7',
        type: 'space_join',
        title: 'New Member Joined',
        content: 'David Park has joined your Study Abroad Alumni space',
        author: {
            name: 'David Park',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face',
            handle: 'dpark_music'
        },
        space: {
            id: 'study-abroad',
            name: 'Study Abroad Alumni',
            type: 'community'
        },
        timestamp: '2024-01-14T14:20:00Z',
        priority: 'low'
    },
    {
        id: '8',
        type: 'tool_created',
        title: 'New Tool: Class Schedule Optimizer',
        content: 'Emily created a smart tool to help optimize your class schedule based on your preferences and requirements.',
        author: {
            name: 'Dr. Emily Watson',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face',
            handle: 'ewatson_phd'
        },
        timestamp: '2024-01-14T10:15:00Z',
        priority: 'medium',
        metadata: {
            likes: 15,
            replyCount: 4
        }
    }
];
// Default Story - Active Feed
export const Default = {
    args: {
        activities: mockActivities.slice(0, 6),
        maxItems: 6,
    },
};
// Full Activity Feed
export const FullFeed = {
    args: {
        activities: mockActivities,
        maxItems: 8,
    },
};
// High Priority Activities
export const HighPriority = {
    args: {
        activities: mockActivities.filter(a => a.priority === 'high').concat(mockActivities.filter(a => a.priority !== 'high').slice(0, 3)),
        maxItems: 6,
    },
};
// Recent Unread Activities
export const WithUnread = {
    args: {
        activities: mockActivities.map((activity, index) => ({
            ...activity,
            isUnread: index < 3
        })),
        maxItems: 6,
    },
};
// Compact Variant
export const Compact = {
    args: {
        activities: mockActivities.slice(0, 4),
        variant: 'compact',
        maxItems: 4,
    },
};
// Loading State
export const Loading = {
    args: {
        activities: [],
        isLoading: true,
    },
};
// Empty State
export const Empty = {
    args: {
        activities: [],
    },
};
// Few Activities
export const FewActivities = {
    args: {
        activities: mockActivities.slice(0, 2),
        maxItems: 4,
    },
};
// BentoGrid Layout Demo
export const BentoGridLayout = {
    args: {
        activities: mockActivities.slice(0, 5),
        maxItems: 5,
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(Story, {}) }), _jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Today's Summary" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "New Messages" }), _jsx("span", { className: "text-gold font-medium", children: "12" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "Upcoming Events" }), _jsx("span", { className: "text-emerald font-medium", children: "3" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "Assignments Due" }), _jsx("span", { className: "text-red-400 font-medium", children: "2" })] })] })] }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Upcoming Events" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-purple-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-mercury text-sm", children: "Robotics Meeting" }), _jsx("p", { className: "text-steel text-xs", children: "Thursday 7:00 PM" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-gold" }), _jsxs("div", { children: [_jsx("p", { className: "text-mercury text-sm", children: "CS 101 Midterm" }), _jsx("p", { className: "text-steel text-xs", children: "Friday 10:00 AM" })] })] })] })] })] })] }) }) })),
    ],
};
// Mobile Layout Test
export const Mobile = {
    args: {
        activities: mockActivities.slice(0, 4),
        maxItems: 4,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
//# sourceMappingURL=campus-activity-feed.stories.js.map