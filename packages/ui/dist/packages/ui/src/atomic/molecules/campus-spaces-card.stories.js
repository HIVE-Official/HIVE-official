import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CampusSpacesCard } from './campus-spaces-card';
const meta = {
    title: 'HIVE/Profile/CampusSpacesCard',
    component: CampusSpacesCard,
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
                component: 'Campus Spaces Card with sophisticated BentoGrid aesthetic. Shows user\'s joined campus spaces with elegant hover states and social-first information hierarchy.',
            },
        },
    },
    argTypes: {
        onSpaceClick: { action: 'space clicked' },
        onJoinSpace: { action: 'join space clicked' },
        onViewAll: { action: 'view all clicked' },
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'detailed'],
        },
        showQuickActions: {
            control: { type: 'boolean' },
        },
        isLoading: {
            control: { type: 'boolean' },
        },
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(Story, {}) }) })),
    ],
};
export default meta;
// Mock spaces data
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
        name: 'Engineering Peer Mentors',
        type: 'mentoring',
        memberCount: 45,
        lastActivity: '2024-01-12T11:30:00Z',
        isPrivate: true,
        recentActivity: {
            type: 'announcement',
            preview: 'New mentee applications are now open',
            timestamp: '2024-01-12T11:30:00Z'
        }
    },
    {
        id: '6',
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
    },
    {
        id: '7',
        name: 'Hackathon Team Alpha',
        type: 'academic',
        memberCount: 12,
        lastActivity: '2024-01-14T20:15:00Z',
        recentActivity: {
            type: 'message',
            preview: 'Great work on the prototype everyone!',
            timestamp: '2024-01-14T20:15:00Z'
        }
    }
];
// Default Story - Active Student
export const Default = {
    args: {
        spaces: mockSpaces.slice(0, 5),
        showQuickActions: true,
    },
};
// Many Spaces - Shows pagination
export const ManySpaces = {
    args: {
        spaces: mockSpaces,
        showQuickActions: true,
    },
};
// Few Spaces
export const FewSpaces = {
    args: {
        spaces: mockSpaces.slice(0, 2),
        showQuickActions: true,
    },
};
// Empty State
export const Empty = {
    args: {
        spaces: [],
        showQuickActions: true,
    },
};
// Loading State
export const Loading = {
    args: {
        spaces: [],
        isLoading: true,
    },
};
// Without Quick Actions
export const NoQuickActions = {
    args: {
        spaces: mockSpaces.slice(0, 4),
        showQuickActions: false,
    },
};
// High Activity Spaces
export const HighActivity = {
    args: {
        spaces: [
            {
                ...mockSpaces[0],
                unreadCount: 99,
                isPinned: true,
            },
            {
                ...mockSpaces[1],
                unreadCount: 156,
                isFavorite: true,
            },
            {
                ...mockSpaces[2],
                unreadCount: 42,
            },
        ],
        showQuickActions: true,
    },
};
// BentoGrid Layout Demo
export const BentoGridLayout = {
    args: {
        spaces: mockSpaces.slice(0, 4),
        showQuickActions: true,
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(Story, {}) }), _jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Campus Activity Feed" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center", children: _jsx("span", { className: "text-xs", children: "\uD83D\uDCDA" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-mercury text-sm", children: "New assignment posted in CS 101" }), _jsx("p", { className: "text-steel text-xs", children: "2 hours ago" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center", children: _jsx("span", { className: "text-xs", children: "\uD83C\uDFE0" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-mercury text-sm", children: "Dorm meeting tonight at 7 PM" }), _jsx("p", { className: "text-steel text-xs", children: "4 hours ago" })] })] })] })] }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Quick Stats" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-gold", children: "5" }), _jsx("div", { className: "text-xs text-mercury", children: "Active Spaces" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-emerald", children: "24" }), _jsx("div", { className: "text-xs text-mercury", children: "Unread Messages" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-platinum", children: "12" }), _jsx("div", { className: "text-xs text-mercury", children: "This Week" })] })] })] })] })] }) }) })),
    ],
};
// Mobile Layout Test
export const Mobile = {
    args: {
        spaces: mockSpaces.slice(0, 4),
        showQuickActions: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
//# sourceMappingURL=campus-spaces-card.stories.js.map