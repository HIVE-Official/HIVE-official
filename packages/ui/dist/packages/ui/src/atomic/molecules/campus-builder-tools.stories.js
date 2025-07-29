import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CampusBuilderTools } from './campus-builder-tools';
const meta = {
    title: 'HIVE/Profile/CampusBuilderTools',
    component: CampusBuilderTools,
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
                component: 'Campus Builder Tools with subtle, elegant treatment. Provides sophisticated building functionality without dominating the campus social experience.',
            },
        },
    },
    argTypes: {
        onToolClick: { action: 'tool clicked' },
        onCreateTool: { action: 'create tool clicked' },
        onViewTool: { action: 'view tool clicked' },
        onBecomeBuilder: { action: 'become builder clicked' },
        onViewAllCreated: { action: 'view all created clicked' },
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'subtle'],
        },
        isBuilder: {
            control: { type: 'boolean' },
        },
        showBecomeBuilder: {
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
// Mock data
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
    },
    {
        id: '5',
        name: 'Custom Dashboard',
        type: 'custom',
        category: 'productivity',
        description: 'Build a personalized dashboard with widgets you choose',
        icon: '🎛️',
        difficulty: 'advanced',
        timeToCreate: '30 min',
        popularity: 3,
        usageCount: 234,
        isLocked: true
    },
    {
        id: '6',
        name: 'Group Study Finder',
        type: 'template',
        category: 'social',
        description: 'Find and organize study groups with classmates',
        icon: '👥',
        difficulty: 'beginner',
        timeToCreate: '8 min',
        popularity: 4,
        usageCount: 789
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
    },
    {
        id: 'c4',
        name: 'Grade Calculator Pro',
        type: 'custom',
        category: 'academic',
        description: 'Advanced grade calculations with weighted categories',
        icon: '🧮',
        createdAt: '2024-01-03T11:20:00Z',
        usageCount: 156,
        isPublic: true,
        likes: 34,
        isStarred: true
    }
];
// Non-Builder Stories - Subtle Invitation
export const NonBuilderInvitation = {
    args: {
        availableTools: mockAvailableTools,
        createdTools: [],
        isBuilder: false,
        showBecomeBuilder: true,
    },
};
// Builder Stories - Full Functionality
export const BuilderDefault = {
    args: {
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        isBuilder: true,
    },
};
export const BuilderWithManyTools = {
    args: {
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        isBuilder: true,
    },
};
export const BuilderNewUser = {
    args: {
        availableTools: mockAvailableTools.slice(0, 3),
        createdTools: [],
        isBuilder: true,
    },
};
export const BuilderActiveCreator = {
    args: {
        availableTools: mockAvailableTools,
        createdTools: mockCreatedTools,
        isBuilder: true,
    },
};
// Loading State
export const Loading = {
    args: {
        availableTools: [],
        createdTools: [],
        isBuilder: true,
        isLoading: true,
    },
};
// Compact Variant
export const Compact = {
    args: {
        availableTools: mockAvailableTools.slice(0, 3),
        createdTools: mockCreatedTools.slice(0, 2),
        isBuilder: true,
        variant: 'compact',
    },
};
// Subtle Variant (for non-prominent placement)
export const Subtle = {
    args: {
        availableTools: mockAvailableTools.slice(0, 3),
        createdTools: mockCreatedTools.slice(0, 2),
        isBuilder: true,
        variant: 'subtle',
    },
};
// BentoGrid Layout Demo - Showing Subtle Integration
export const BentoGridLayout = {
    args: {
        availableTools: mockAvailableTools.slice(0, 4),
        createdTools: mockCreatedTools.slice(0, 2),
        isBuilder: true,
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-3 space-y-6", children: [_jsx("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 flex items-center justify-center", children: _jsx("span", { className: "text-platinum text-xl font-bold", children: "SC" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-platinum font-bold text-xl", children: "Sarah Chen" }), _jsx("p", { className: "text-mercury text-sm", children: "Computer Science \u2022 Class of '26" }), _jsx("p", { className: "text-mercury text-sm", children: "West Campus" })] })] }) }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "\uD83D\uDCE2" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-mercury text-sm", children: "Midterm schedule posted in CS 101" }), _jsx("p", { className: "text-steel text-xs", children: "2 hours ago" })] })] }) })] })] }), _jsx("div", { className: "lg:col-span-1", children: _jsx(Story, {}) })] }) }) })),
    ],
};
// Non-Builder in Context (Shows subtle invitation alongside main profile)
export const NonBuilderInContext = {
    args: {
        availableTools: mockAvailableTools,
        createdTools: [],
        isBuilder: false,
        showBecomeBuilder: true,
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-3 space-y-6", children: _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Your Campus Spaces" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDCDA" }), _jsxs("div", { children: [_jsx("p", { className: "text-platinum text-sm font-medium", children: "CS 101: Intro to Programming" }), _jsx("p", { className: "text-mercury text-xs", children: "847 members \u2022 3 unread" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-lg", children: "\uD83C\uDFE0" }), _jsxs("div", { children: [_jsx("p", { className: "text-platinum text-sm font-medium", children: "West Campus Residents" }), _jsx("p", { className: "text-mercury text-xs", children: "234 members \u2022 12 unread" })] })] })] })] }) }), _jsx("div", { className: "lg:col-span-1", children: _jsx(Story, {}) })] }) }) })),
    ],
};
// Mobile Layout Test
export const Mobile = {
    args: {
        availableTools: mockAvailableTools.slice(0, 3),
        createdTools: mockCreatedTools.slice(0, 2),
        isBuilder: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
//# sourceMappingURL=campus-builder-tools.stories.js.map