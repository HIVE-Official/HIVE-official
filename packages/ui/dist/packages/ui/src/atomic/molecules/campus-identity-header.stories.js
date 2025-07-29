import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CampusIdentityHeader } from './campus-identity-header';
const meta = {
    title: 'HIVE/Profile/CampusIdentityHeader',
    component: CampusIdentityHeader,
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
                component: 'Campus Identity Header with sophisticated BentoGrid aesthetic. Prioritizes campus social identity over productivity features, with subtle builder treatment.',
            },
        },
    },
    argTypes: {
        onAvatarClick: { action: 'avatar clicked' },
        onEditClick: { action: 'edit clicked' },
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'detailed'],
        },
        showStatus: {
            control: { type: 'boolean' },
        },
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsx(Story, {}) })),
    ],
};
export default meta;
// Default Story - Typical Student
export const Default = {
    args: {
        user: {
            name: 'Sarah Chen',
            handle: 'sarahc_cs',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
            year: '2026',
            major: 'Computer Science',
            dorm: 'West Campus',
            isOnline: true,
            isBuilder: false,
            completionPercentage: 85,
        },
        showStatus: true,
    },
};
// Builder Student
export const Builder = {
    args: {
        user: {
            name: 'Marcus Thompson',
            handle: 'marcus_builds',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
            year: '2025',
            major: 'Engineering',
            dorm: 'North Hall',
            isOnline: true,
            isBuilder: true,
            completionPercentage: 100,
        },
        showStatus: true,
    },
};
// New Student - Low Completion
export const NewStudent = {
    args: {
        user: {
            name: 'Alex Rivera',
            handle: 'alex_r',
            year: '2027',
            major: 'Biology',
            dorm: 'Freshman Quad',
            isOnline: false,
            isBuilder: false,
            completionPercentage: 25,
        },
        showStatus: true,
    },
};
// Without Avatar (Generated Initials)
export const WithoutAvatar = {
    args: {
        user: {
            name: 'Jordan Kim',
            handle: 'jkim_design',
            year: '2025',
            major: 'Graphic Design',
            isOnline: true,
            isBuilder: false,
            completionPercentage: 60,
        },
        showStatus: true,
    },
};
// Graduate Student
export const Graduate = {
    args: {
        user: {
            name: 'Dr. Emily Watson',
            handle: 'ewatson_phd',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=face',
            year: 'PhD',
            major: 'Neuroscience',
            isOnline: true,
            isBuilder: true,
            completionPercentage: 95,
        },
        showStatus: true,
    },
};
// Mobile Layout Test
export const Mobile = {
    args: {
        user: {
            name: 'Tyler Jackson',
            handle: 'tjack_sports',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
            year: '2026',
            major: 'Kinesiology',
            dorm: 'Athletic Village',
            isOnline: true,
            isBuilder: false,
            completionPercentage: 70,
        },
        showStatus: true,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
// Without Status Indicators
export const Minimal = {
    args: {
        user: {
            name: 'Priya Patel',
            handle: 'priya_pre_med',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face',
            year: '2025',
            major: 'Pre-Medicine',
            dorm: 'Science House',
            isOnline: true,
            isBuilder: false,
            completionPercentage: 80,
        },
        showStatus: false,
    },
};
// Compact Variant
export const Compact = {
    args: {
        user: {
            name: 'David Park',
            handle: 'dpark_music',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop&crop=face',
            year: '2026',
            major: 'Music Production',
            isOnline: true,
            isBuilder: false,
            completionPercentage: 90,
        },
        variant: 'compact',
        showStatus: true,
    },
};
// BentoGrid Layout Demo
export const BentoGridLayout = {
    args: {
        user: {
            name: 'Sarah Chen',
            handle: 'sarahc_cs',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
            year: '2026',
            major: 'Computer Science',
            dorm: 'West Campus',
            isOnline: true,
            isBuilder: true,
            completionPercentage: 85,
        },
        showStatus: true,
    },
    decorators: [
        (Story) => (_jsx("div", { className: "p-8 min-h-screen bg-obsidian", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(Story, {}) }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Campus Activity" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "Spaces Joined" }), _jsx("span", { className: "text-platinum font-medium", children: "8" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "Tools Created" }), _jsx("span", { className: "text-gold font-medium", children: "3" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-mercury text-sm", children: "Campus Streak" }), _jsx("span", { className: "text-emerald font-medium", children: "12 days" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6", children: [_jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h4", { className: "text-platinum font-medium mb-2", children: "Your Spaces" }), _jsx("p", { className: "text-mercury text-sm", children: "CS Study Group, Dorm Council, Hackathon Team" })] }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h4", { className: "text-platinum font-medium mb-2", children: "Recent Activity" }), _jsx("p", { className: "text-mercury text-sm", children: "Created study planner tool \u2022 2 hours ago" })] }), _jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 p-6", children: [_jsx("h4", { className: "text-platinum font-medium mb-2", children: "Campus Calendar" }), _jsx("p", { className: "text-mercury text-sm", children: "CS101 Midterm \u2022 Tomorrow 9:00 AM" })] })] })] }) })),
    ],
};
//# sourceMappingURL=campus-identity-header.stories.js.map