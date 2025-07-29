import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { motion, AnimatePresence } from 'framer-motion';
const meta = {
    title: '07-Spaces/Space Management',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Space Management & Administration

Complete workflows for space creation, management, and administration. These stories demonstrate the full builder experience from creating a space to managing an active community.

## Management Areas

1. **Space Creation** - Step-by-step space setup and configuration
2. **Settings Management** - Privacy, permissions, and space details
3. **Member Management** - Invite, remove, and manage member roles
4. **Content Moderation** - Moderate posts, pin content, manage discussions
5. **Analytics Dashboard** - Track space performance and member engagement
6. **Event Management** - Create and manage space events and activities

## Builder Capabilities

- **Space Configuration** - Set up surfaces, privacy, and basic settings
- **Member Operations** - Full member lifecycle management
- **Content Control** - Moderate and curate space content
- **Analytics Access** - Detailed insights and performance metrics
- **Event Creation** - Organize and manage space activities
- **Tool Deployment** - Add and configure space tools

## When to Use

- **New Space Creation** - Setting up a new community space
- **Administrative Tasks** - Day-to-day space management
- **Community Growth** - Strategies for member engagement
- **Content Curation** - Maintaining quality discussions
- **Performance Monitoring** - Tracking space health and activity
        `,
            },
        },
    },
};
export default meta;
// Mock data for space management
const mockSpaceData = {
    id: 'space123',
    name: 'Stanford CS Study Group',
    description: 'Collaborative study space for Computer Science students at Stanford University',
    memberCount: 156,
    type: 'academic',
    status: 'activated',
    privacy: 'public',
    bannerUrl: '/api/placeholder/800/200',
    tags: ['computer-science', 'study-group', 'collaboration'],
    createdAt: new Date('2024-01-15'),
    surfaces: {
        posts: { enabled: true, order: 1 },
        events: { enabled: true, order: 2 },
        members: { enabled: true, order: 3 },
        tools: { enabled: true, order: 4 },
        pinned: { enabled: true, order: 5 },
        chat: { enabled: false, order: 6 },
    },
    settings: {
        autoJoin: true,
        joinRequests: false,
        memberVisibility: 'public',
        postModeration: false,
        allowEvents: true,
        allowTools: true,
    },
};
const mockMembers = [
    {
        id: 'member1',
        name: 'Alex Chen',
        email: 'alex.chen@stanford.edu',
        role: 'builder',
        joinedAt: new Date('2024-01-15'),
        lastActive: new Date('2024-01-20'),
        avatar: '/api/placeholder/40/40',
        contributions: 24,
        status: 'active',
    },
    {
        id: 'member2',
        name: 'Sarah Miller',
        email: 'sarah.miller@stanford.edu',
        role: 'builder',
        joinedAt: new Date('2024-01-16'),
        lastActive: new Date('2024-01-19'),
        avatar: '/api/placeholder/40/40',
        contributions: 18,
        status: 'active',
    },
    {
        id: 'member3',
        name: 'Mike Johnson',
        email: 'mike.johnson@stanford.edu',
        role: 'member',
        joinedAt: new Date('2024-01-18'),
        lastActive: new Date('2024-01-20'),
        avatar: '/api/placeholder/40/40',
        contributions: 12,
        status: 'active',
    },
    {
        id: 'member4',
        name: 'Emily Davis',
        email: 'emily.davis@stanford.edu',
        role: 'member',
        joinedAt: new Date('2024-01-19'),
        lastActive: new Date('2024-01-19'),
        avatar: '/api/placeholder/40/40',
        contributions: 8,
        status: 'active',
    },
    {
        id: 'member5',
        name: 'David Wilson',
        email: 'david.wilson@stanford.edu',
        role: 'requested_builder',
        joinedAt: new Date('2024-01-20'),
        lastActive: new Date('2024-01-20'),
        avatar: '/api/placeholder/40/40',
        contributions: 5,
        status: 'active',
    },
];
const mockAnalytics = {
    overview: {
        totalMembers: 156,
        activeMembers: 89,
        weeklyGrowth: 12,
        engagementRate: 0.78,
    },
    posts: {
        totalPosts: 234,
        thisWeek: 18,
        avgPerDay: 2.6,
        topContributors: ['Alex Chen', 'Sarah Miller', 'Mike Johnson'],
    },
    events: {
        totalEvents: 12,
        upcoming: 3,
        avgAttendance: 23,
        completionRate: 0.85,
    },
    tools: {
        deployed: 4,
        totalUses: 156,
        mostUsed: 'Study Schedule Coordinator',
        satisfaction: 4.7,
    },
};
const mockRecentActivity = [
    {
        id: '1',
        type: 'member_join',
        user: 'John Smith',
        timestamp: new Date('2024-01-20T14:30:00'),
        details: 'joined the space',
    },
    {
        id: '2',
        type: 'post_created',
        user: 'Emily Davis',
        timestamp: new Date('2024-01-20T13:45:00'),
        details: 'created a post about Algorithm study sessions',
    },
    {
        id: '3',
        type: 'event_created',
        user: 'Alex Chen',
        timestamp: new Date('2024-01-20T12:15:00'),
        details: 'created event "CS106B Review Session"',
    },
    {
        id: '4',
        type: 'tool_deployed',
        user: 'Sarah Miller',
        timestamp: new Date('2024-01-20T11:30:00'),
        details: 'deployed tool "Grade Calculator"',
    },
];
// Tab Navigation Component
const TabNavigation = ({ tabs, activeTab, onTabChange }) => (_jsx("div", { className: "flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg", children: tabs.map((tab) => (_jsx("button", { onClick: () => onTabChange(tab), className: `
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${activeTab === tab
            ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
            : 'text-gray-600 hover:text-gray-900'}
        `, children: tab }, tab))) }));
// Metric Card Component
const MetricCard = ({ title, value, subtitle, trend, icon }) => (_jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-600", children: title }), icon && _jsx("span", { className: "text-lg", children: icon })] }), _jsx("div", { className: "text-2xl font-bold text-gray-900 mb-1", children: value }), subtitle && (_jsxs("div", { className: "flex items-center gap-1 text-sm", children: [trend && (_jsx("span", { className: `
            ${trend === 'up' ? 'text-green-500' :
                        trend === 'down' ? 'text-red-500' : 'text-gray-500'}
          `, children: trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→' })), _jsx("span", { className: "text-gray-600", children: subtitle })] }))] }));
export const SpaceCreationWizard = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(0);
        const [spaceData, setSpaceData] = useState({
            name: '',
            description: '',
            type: '',
            privacy: 'public',
            tags: [],
            surfaces: {
                posts: true,
                events: true,
                members: true,
                tools: true,
                pinned: true,
                chat: false,
            },
            settings: {
                autoJoin: true,
                joinRequests: false,
                memberVisibility: 'public',
                postModeration: false,
            },
        });
        const steps = [
            'Basic Information',
            'Space Type & Privacy',
            'Surface Configuration',
            'Initial Settings',
            'Review & Create'
        ];
        const spaceTypes = [
            { id: 'academic', name: 'Academic', description: 'Study groups, course discussions, research' },
            { id: 'residential', name: 'Residential', description: 'Dorm communities, residential programs' },
            { id: 'social', name: 'Social', description: 'Clubs, interest groups, social activities' },
            { id: 'professional', name: 'Professional', description: 'Career development, networking' },
            { id: 'creative', name: 'Creative', description: 'Art, music, writing, creative projects' },
        ];
        const surfaceOptions = [
            { id: 'posts', name: 'Posts & Discussions', description: 'Main feed for conversations', required: true },
            { id: 'events', name: 'Events & Calendar', description: 'Space events and activities', required: false },
            { id: 'members', name: 'Members Directory', description: 'Member profiles and directory', required: true },
            { id: 'tools', name: 'Tools & Resources', description: 'Collaborative tools and resources', required: false },
            { id: 'pinned', name: 'Pinned Content', description: 'Important announcements and resources', required: false },
            { id: 'chat', name: 'Real-time Chat', description: 'Live messaging (coming soon)', required: false, disabled: true },
        ];
        const handleNext = () => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        };
        const handleBack = () => {
            if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
            }
        };
        const handleTagAdd = (tag) => {
            if (tag && !spaceData.tags.includes(tag)) {
                setSpaceData({
                    ...spaceData,
                    tags: [...spaceData.tags, tag]
                });
            }
        };
        const handleTagRemove = (tagToRemove) => {
            setSpaceData({
                ...spaceData,
                tags: spaceData.tags.filter(tag => tag !== tagToRemove)
            });
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Create New Space" }), _jsx("p", { className: "text-gray-600", children: "Set up a new community space for your members" })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Step ", currentStep + 1, " of ", steps.length] }), _jsxs("span", { className: "text-sm text-gray-600", children: [Math.round((currentStep + 1) / steps.length * 100), "% Complete"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300", style: { width: `${(currentStep + 1) / steps.length * 100}%` } }) }), _jsx("div", { className: "flex justify-between mt-2 text-xs text-gray-500", children: steps.map((step, index) => (_jsx("span", { className: index <= currentStep ? 'text-[var(--hive-brand-secondary)]' : '', children: step }, step))) })] }), _jsxs(AnimatePresence, { mode: "wait", children: [currentStep === 0 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Basic Information" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Space Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: "text", value: spaceData.name, onChange: (e) => setSpaceData({ ...spaceData, name: e.target.value }), placeholder: "Enter a descriptive name for your space", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Choose a clear, searchable name that describes your community" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Description ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: spaceData.description, onChange: (e) => setSpaceData({ ...spaceData, description: e.target.value }), placeholder: "Describe what this space is for and who should join", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", rows: 4 }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Help potential members understand the purpose and value of this space" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: spaceData.tags.map((tag) => (_jsxs(HiveBadge, { variant: "default", className: "cursor-pointer", onClick: () => handleTagRemove(tag), children: [tag, " \u00D7"] }, tag))) }), _jsx("input", { type: "text", placeholder: "Add tags (press Enter to add)", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", onKeyPress: (e) => {
                                                            if (e.key === 'Enter') {
                                                                handleTagAdd(e.target.value);
                                                                e.target.value = '';
                                                            }
                                                        } }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Tags help members discover your space through search" })] })] })] }, "basic-info")), currentStep === 1 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Space Type & Privacy" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-3", children: ["Space Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: spaceTypes.map((type) => (_jsxs("div", { onClick: () => setSpaceData({ ...spaceData, type: type.id }), className: `
                            p-4 border rounded-lg cursor-pointer transition-colors
                            ${spaceData.type === type.id
                                                                ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10'
                                                                : 'border-gray-200 hover:border-gray-300'}
                          `, children: [_jsx("h3", { className: "font-semibold mb-1", children: type.name }), _jsx("p", { className: "text-sm text-gray-600", children: type.description })] }, type.id))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Privacy Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "privacy", value: "public", checked: spaceData.privacy === 'public', onChange: (e) => setSpaceData({ ...spaceData, privacy: e.target.value }), className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Public Space" }), _jsx("div", { className: "text-sm text-gray-600", children: "Anyone can find and join this space" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "privacy", value: "private", checked: spaceData.privacy === 'private', onChange: (e) => setSpaceData({ ...spaceData, privacy: e.target.value }), className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Private Space" }), _jsx("div", { className: "text-sm text-gray-600", children: "Only invited members can join" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "privacy", value: "invite-only", checked: spaceData.privacy === 'invite-only', onChange: (e) => setSpaceData({ ...spaceData, privacy: e.target.value }), className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Invite-Only Space" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can request to join, but need approval" })] })] })] })] })] })] }, "type-privacy")), currentStep === 2 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Surface Configuration" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Choose which surfaces to enable for your space. You can change these later." }), _jsx("div", { className: "space-y-4", children: surfaceOptions.map((surface) => (_jsx("div", { className: `
                        p-4 border rounded-lg 
                        ${surface.disabled
                                                ? 'bg-gray-50 border-gray-200'
                                                : 'border-gray-200 hover:border-gray-300'}
                      `, children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: spaceData.surfaces[surface.id], onChange: (e) => setSpaceData({
                                                                ...spaceData,
                                                                surfaces: {
                                                                    ...spaceData.surfaces,
                                                                    [surface.id]: e.target.checked
                                                                }
                                                            }), disabled: surface.required || surface.disabled, className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium flex items-center gap-2", children: [surface.name, surface.required && (_jsx(HiveBadge, { variant: "outline", size: "sm", children: "Required" })), surface.disabled && (_jsx(HiveBadge, { variant: "outline", size: "sm", children: "Coming Soon" }))] }), _jsx("div", { className: "text-sm text-gray-600", children: surface.description })] })] }) }) }, surface.id))) }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "\uD83D\uDCA1 Surface Tips" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Start with essential surfaces and add more as your community grows" }), _jsx("li", { children: "\u2022 Posts & Members are required for all spaces" }), _jsx("li", { children: "\u2022 Events surface is great for active communities" }), _jsx("li", { children: "\u2022 Tools surface enables collaborative workflows" })] })] })] }, "surfaces")), currentStep === 3 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Initial Settings" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Membership Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Auto-join eligible members" }), _jsx("div", { className: "text-sm text-gray-600", children: "Automatically add members who meet your criteria" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.autoJoin, onChange: (e) => setSpaceData({
                                                                            ...spaceData,
                                                                            settings: { ...spaceData.settings, autoJoin: e.target.checked }
                                                                        }), className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow join requests" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can request to join your space" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.joinRequests, onChange: (e) => setSpaceData({
                                                                            ...spaceData,
                                                                            settings: { ...spaceData.settings, joinRequests: e.target.checked }
                                                                        }), className: "text-[var(--hive-brand-secondary)]" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Content Settings" }), _jsx("div", { className: "space-y-3", children: _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Post moderation" }), _jsx("div", { className: "text-sm text-gray-600", children: "Require approval for new posts" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.postModeration, onChange: (e) => setSpaceData({
                                                                        ...spaceData,
                                                                        settings: { ...spaceData.settings, postModeration: e.target.checked }
                                                                    }), className: "text-[var(--hive-brand-secondary)]" })] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Visibility Settings" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Member directory visibility" }), _jsxs("select", { value: spaceData.settings.memberVisibility, onChange: (e) => setSpaceData({
                                                                        ...spaceData,
                                                                        settings: { ...spaceData.settings, memberVisibility: e.target.value }
                                                                    }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "public", children: "Public - Anyone can see members" }), _jsx("option", { value: "members", children: "Members only - Only space members can see directory" }), _jsx("option", { value: "builders", children: "Builders only - Only builders can see full directory" })] })] }) })] })] })] }, "settings")), currentStep === 4 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Review & Create" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Preview" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Name:" }), " ", spaceData.name] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Description:" }), " ", spaceData.description] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Type:" }), " ", spaceTypes.find(t => t.id === spaceData.type)?.name] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Privacy:" }), " ", spaceData.privacy] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Tags:" }), _jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: spaceData.tags.map((tag) => (_jsx(HiveBadge, { variant: "outline", size: "sm", children: tag }, tag))) })] })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Enabled Surfaces" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.entries(spaceData.surfaces)
                                                            .filter(([_, enabled]) => enabled)
                                                            .map(([surfaceId, _]) => {
                                                            const surface = surfaceOptions.find(s => s.id === surfaceId);
                                                            return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { className: "text-sm", children: surface?.name })] }, surfaceId));
                                                        }) })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "\uD83C\uDF89 Ready to Create!" }), _jsx("p", { className: "text-sm text-blue-800", children: "Your space is configured and ready to go. You'll be able to customize all settings after creation and start inviting members." })] }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-yellow-900 mb-2", children: "\uD83D\uDCCB Next Steps" }), _jsxs("ul", { className: "text-sm text-yellow-800 space-y-1", children: [_jsx("li", { children: "\u2022 Customize your space banner and branding" }), _jsx("li", { children: "\u2022 Create your first pinned post with guidelines" }), _jsx("li", { children: "\u2022 Invite initial members to get started" }), _jsx("li", { children: "\u2022 Set up your first event or activity" })] })] })] })] }, "review"))] }), _jsxs("div", { className: "flex justify-between mt-8", children: [_jsx(HiveButton, { variant: "outline", onClick: handleBack, disabled: currentStep === 0, children: "Back" }), _jsx(HiveButton, { onClick: currentStep === steps.length - 1 ? () => alert('Space created!') : handleNext, disabled: (currentStep === 0 && (!spaceData.name || !spaceData.description)) ||
                                    (currentStep === 1 && !spaceData.type), children: currentStep === steps.length - 1 ? 'Create Space' : 'Next' })] })] }) }));
    },
};
export const SpaceSettingsManagement = {
    render: () => {
        const [activeTab, setActiveTab] = useState('General');
        const [spaceData, setSpaceData] = useState(mockSpaceData);
        const [hasChanges, setHasChanges] = useState(false);
        const tabs = ['General', 'Privacy', 'Surfaces', 'Advanced'];
        const handleSave = () => {
            setHasChanges(false);
            alert('Settings saved successfully!');
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Space Settings" }), _jsx("p", { className: "text-gray-600", children: "Manage your space configuration and preferences" })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: spaceData.name }), _jsxs("p", { className: "text-gray-600", children: [spaceData.memberCount, " members"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveBadge, { variant: "default", className: "capitalize", children: spaceData.status }), _jsx(HiveBadge, { variant: "outline", className: "capitalize", children: spaceData.privacy })] })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabNavigation, { tabs: tabs, activeTab: activeTab, onTabChange: setActiveTab }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'General' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Basic Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Space Name" }), _jsx("input", { type: "text", value: spaceData.name, onChange: (e) => {
                                                                                    setSpaceData({ ...spaceData, name: e.target.value });
                                                                                    setHasChanges(true);
                                                                                }, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Space Type" }), _jsxs("select", { value: spaceData.type, onChange: (e) => {
                                                                                    setSpaceData({ ...spaceData, type: e.target.value });
                                                                                    setHasChanges(true);
                                                                                }, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "academic", children: "Academic" }), _jsx("option", { value: "social", children: "Social" }), _jsx("option", { value: "residential", children: "Residential" }), _jsx("option", { value: "professional", children: "Professional" })] })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Description" }), _jsx("textarea", { value: spaceData.description, onChange: (e) => {
                                                                    setSpaceData({ ...spaceData, description: e.target.value });
                                                                    setHasChanges(true);
                                                                }, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", rows: 4 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: spaceData.tags.map((tag) => (_jsx(HiveBadge, { variant: "outline", children: tag }, tag))) }), _jsx("input", { type: "text", placeholder: "Add new tag (press Enter)", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", onKeyPress: (e) => {
                                                                    if (e.key === 'Enter' && e.target.value) {
                                                                        setSpaceData({
                                                                            ...spaceData,
                                                                            tags: [...spaceData.tags, e.target.value]
                                                                        });
                                                                        e.target.value = '';
                                                                        setHasChanges(true);
                                                                    }
                                                                } })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Banner Image" }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [_jsx("div", { className: "text-gray-500 mb-2", children: "\uD83D\uDCF8" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Upload a banner image for your space" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Choose Image" })] })] })] }, "general")), activeTab === 'Privacy' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Visibility" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "privacy", value: "public", checked: spaceData.privacy === 'public', onChange: (e) => {
                                                                                    setSpaceData({ ...spaceData, privacy: e.target.value });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Public" }), _jsx("div", { className: "text-sm text-gray-600", children: "Anyone can find and join" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "privacy", value: "private", checked: spaceData.privacy === 'private', onChange: (e) => {
                                                                                    setSpaceData({ ...spaceData, privacy: e.target.value });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Private" }), _jsx("div", { className: "text-sm text-gray-600", children: "Invite only" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Member Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Auto-join eligible members" }), _jsx("div", { className: "text-sm text-gray-600", children: "Automatically add members who meet criteria" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.autoJoin, onChange: (e) => {
                                                                                    setSpaceData({
                                                                                        ...spaceData,
                                                                                        settings: { ...spaceData.settings, autoJoin: e.target.checked }
                                                                                    });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow join requests" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can request to join" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.joinRequests, onChange: (e) => {
                                                                                    setSpaceData({
                                                                                        ...spaceData,
                                                                                        settings: { ...spaceData.settings, joinRequests: e.target.checked }
                                                                                    });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Content Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Post moderation" }), _jsx("div", { className: "text-sm text-gray-600", children: "Require approval for new posts" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.postModeration, onChange: (e) => {
                                                                                    setSpaceData({
                                                                                        ...spaceData,
                                                                                        settings: { ...spaceData.settings, postModeration: e.target.checked }
                                                                                    });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow events" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can create events" })] }), _jsx("input", { type: "checkbox", checked: spaceData.settings.allowEvents, onChange: (e) => {
                                                                                    setSpaceData({
                                                                                        ...spaceData,
                                                                                        settings: { ...spaceData.settings, allowEvents: e.target.checked }
                                                                                    });
                                                                                    setHasChanges(true);
                                                                                }, className: "text-[var(--hive-brand-secondary)]" })] })] })] })] }, "privacy")), activeTab === 'Surfaces' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Surface Configuration" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Configure which surfaces are available in your space and their display order." }), _jsx("div", { className: "space-y-3", children: Object.entries(spaceData.surfaces).map(([surfaceId, config]) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium", children: config.order }), _jsxs("div", { children: [_jsx("div", { className: "font-medium capitalize", children: surfaceId }), _jsxs("div", { className: "text-sm text-gray-600", children: [surfaceId === 'posts' && 'Main discussion feed', surfaceId === 'events' && 'Events and activities', surfaceId === 'members' && 'Member directory', surfaceId === 'tools' && 'Collaborative tools', surfaceId === 'pinned' && 'Pinned content', surfaceId === 'chat' && 'Real-time chat (coming soon)'] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: config.enabled, onChange: (e) => {
                                                                                        setSpaceData({
                                                                                            ...spaceData,
                                                                                            surfaces: {
                                                                                                ...spaceData.surfaces,
                                                                                                [surfaceId]: { ...config, enabled: e.target.checked }
                                                                                            }
                                                                                        });
                                                                                        setHasChanges(true);
                                                                                    }, disabled: surfaceId === 'posts' || surfaceId === 'members' || surfaceId === 'chat', className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("button", { className: "text-xs text-gray-500 hover:text-gray-700", children: "\u2191" }), _jsx("button", { className: "text-xs text-gray-500 hover:text-gray-700", children: "\u2193" })] })] })] }, surfaceId))) })] }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "Surface Tips" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Posts and Members surfaces are always enabled" }), _jsx("li", { children: "\u2022 Drag surfaces to reorder them" }), _jsx("li", { children: "\u2022 Chat surface is coming soon" }), _jsx("li", { children: "\u2022 Consider your community's needs when choosing surfaces" })] })] })] }, "surfaces")), activeTab === 'Advanced' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Status" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Space Status" }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Current status: ", _jsx("span", { className: "capitalize font-medium", children: spaceData.status })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Freeze Space" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Archive Space" })] })] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Data Management" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Export Space Data" }), _jsx("div", { className: "text-sm text-gray-600", children: "Download all space content and member data" })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Export" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Analytics Data" }), _jsx("div", { className: "text-sm text-gray-600", children: "Export usage analytics and member activity" })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Export Analytics" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Integrations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Webhook URL" }), _jsx("div", { className: "text-sm text-gray-600", children: "Receive notifications about space events" })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Configure" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "API Access" }), _jsx("div", { className: "text-sm text-gray-600", children: "Generate API tokens for external integrations" })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Manage" })] })] })] }), _jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-red-900 mb-3", children: "\u26A0\uFE0F Danger Zone" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-red-900", children: "Delete Space" }), _jsx("div", { className: "text-sm text-red-700", children: "Permanently delete this space and all its data" })] }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "border-red-300 text-red-700 hover:bg-red-50", children: "Delete" })] }) })] })] }, "advanced"))] }), hasChanges && (_jsxs("div", { className: "flex justify-between items-center mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("div", { className: "text-sm text-blue-800", children: "You have unsaved changes" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => {
                                                            setSpaceData(mockSpaceData);
                                                            setHasChanges(false);
                                                        }, children: "Discard" }), _jsx(HiveButton, { size: "sm", onClick: handleSave, children: "Save Changes" })] })] }))] })] })] }) }));
    },
};
export const MemberManagementFlow = {
    render: () => {
        const [activeTab, setActiveTab] = useState('Members');
        const [members, setMembers] = useState(mockMembers);
        const [selectedMembers, setSelectedMembers] = useState([]);
        const [showInviteModal, setShowInviteModal] = useState(false);
        const [inviteEmail, setInviteEmail] = useState('');
        const tabs = ['Members', 'Invitations', 'Requests', 'Builders'];
        const handleRoleChange = (memberId, newRole) => {
            setMembers(members.map(member => member.id === memberId ? { ...member, role: newRole } : member));
        };
        const handleRemoveMember = (memberId) => {
            setMembers(members.filter(member => member.id !== memberId));
        };
        const handleInviteMember = () => {
            if (inviteEmail) {
                // Add invite logic here
                setInviteEmail('');
                setShowInviteModal(false);
                alert(`Invitation sent to ${inviteEmail}`);
            }
        };
        const membersByRole = {
            builders: members.filter(m => m.role === 'builder'),
            members: members.filter(m => m.role === 'member'),
            requested: members.filter(m => m.role === 'requested_builder'),
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Member Management" }), _jsx("p", { className: "text-gray-600", children: "Manage space members, roles, and permissions" })] }), _jsx(HiveButton, { onClick: () => setShowInviteModal(true), children: "Invite Members" })] }) }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "Total Members", value: members.length, icon: "\uD83D\uDC65", subtitle: "Active community" }), _jsx(MetricCard, { title: "Builders", value: membersByRole.builders.length, icon: "\uD83D\uDEE0\uFE0F", subtitle: "Space administrators" }), _jsx(MetricCard, { title: "Pending Requests", value: membersByRole.requested.length, icon: "\uD83D\uDCCB", subtitle: "Builder applications" }), _jsx(MetricCard, { title: "Growth Rate", value: "+12%", icon: "\uD83D\uDCC8", subtitle: "This month", trend: "up" })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabNavigation, { tabs: tabs, activeTab: activeTab, onTabChange: setActiveTab }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'Members' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("input", { type: "text", placeholder: "Search members...", className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" }), _jsxs("select", { className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { children: "All Roles" }), _jsx("option", { children: "Builders" }), _jsx("option", { children: "Members" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Export List" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Bulk Actions" })] })] }), _jsx("div", { className: "space-y-3", children: members.map((member) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("input", { type: "checkbox", checked: selectedMembers.includes(member.id), onChange: (e) => {
                                                                                if (e.target.checked) {
                                                                                    setSelectedMembers([...selectedMembers, member.id]);
                                                                                }
                                                                                else {
                                                                                    setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                                                                                }
                                                                            }, className: "text-[var(--hive-brand-secondary)]" }), _jsx("div", { className: "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium", children: member.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: member.name }), _jsx("div", { className: "text-sm text-gray-600", children: member.email })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("div", { children: ["Joined ", member.joinedAt.toLocaleDateString()] }), _jsxs("div", { children: [member.contributions, " contributions"] })] }), _jsx(HiveBadge, { variant: member.role === 'builder' ? 'default' : 'outline', className: "capitalize", children: member.role.replace('_', ' ') }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("select", { value: member.role, onChange: (e) => handleRoleChange(member.id, e.target.value), className: "text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-hive-gold", children: [_jsx("option", { value: "member", children: "Member" }), _jsx("option", { value: "builder", children: "Builder" })] }), _jsx("button", { onClick: () => handleRemoveMember(member.id), className: "text-red-600 hover:text-red-700 text-sm", children: "Remove" })] })] })] }, member.id))) })] }, "members")), activeTab === 'Invitations' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold", children: "Pending Invitations" }), _jsx(HiveButton, { onClick: () => setShowInviteModal(true), children: "Send Invitation" })] }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm", children: "\uD83D\uDCE7" }) }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: ["user", i, "@stanford.edu"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Invited 2 days ago by Alex Chen" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveBadge, { variant: "outline", className: "text-yellow-600", children: "Pending" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Resend" }), _jsx("button", { className: "text-red-600 hover:text-red-700 text-sm", children: "Cancel" })] })] }, i))) })] }, "invitations")), activeTab === 'Requests' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsx("h3", { className: "font-semibold", children: "Builder Requests" }), _jsx("div", { className: "space-y-3", children: membersByRole.requested.map((member) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium", children: member.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: member.name }), _jsx("div", { className: "text-sm text-gray-600", children: member.email })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { size: "sm", onClick: () => handleRoleChange(member.id, 'builder'), children: "Approve" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handleRoleChange(member.id, 'member'), children: "Decline" })] })] }), _jsxs("div", { className: "text-sm text-gray-600 mb-2", children: [_jsx("strong", { children: "Request reason:" }), " \"I've been actively contributing to the space and would love to help moderate discussions and organize study sessions.\""] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "Activity:" }), " ", member.contributions, " contributions, joined ", member.joinedAt.toLocaleDateString()] })] }, member.id))) })] }, "requests")), activeTab === 'Builders' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold", children: "Space Builders" }), _jsx(HiveButton, { onClick: () => setShowInviteModal(true), children: "Invite Builder" })] }), _jsx("div", { className: "space-y-3", children: membersByRole.builders.map((builder) => (_jsx("div", { className: "p-4 border rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-medium text-[var(--hive-background-primary)]", children: builder.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: builder.name }), _jsx("div", { className: "text-sm text-gray-600", children: builder.email })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("div", { children: ["Builder since ", builder.joinedAt.toLocaleDateString()] }), _jsxs("div", { children: [builder.contributions, " contributions"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Permissions" }), _jsx("button", { onClick: () => handleRoleChange(builder.id, 'member'), className: "text-red-600 hover:text-red-700 text-sm", children: "Remove Builder" })] })] })] }) }, builder.id))) }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "Builder Responsibilities" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Moderate posts and discussions" }), _jsx("li", { children: "\u2022 Manage member invitations and requests" }), _jsx("li", { children: "\u2022 Organize events and activities" }), _jsx("li", { children: "\u2022 Configure space settings and surfaces" }), _jsx("li", { children: "\u2022 Deploy and manage tools" })] })] })] }, "builders"))] })] })] }), showInviteModal && (_jsx("div", { className: "fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Invite Members" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email Address" }), _jsx("input", { type: "email", value: inviteEmail, onChange: (e) => setInviteEmail(e.target.value), placeholder: "Enter email address", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Role" }), _jsxs("select", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { children: "Member" }), _jsx("option", { children: "Builder" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Personal Message (Optional)" }), _jsx("textarea", { placeholder: "Add a personal message to the invitation...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", rows: 3 })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setShowInviteModal(false), children: "Cancel" }), _jsx(HiveButton, { onClick: handleInviteMember, children: "Send Invitation" })] })] }) }))] }) }));
    },
};
export const ContentModerationTools = {
    render: () => {
        const [activeTab, setActiveTab] = useState('Recent Posts');
        const [posts, setPosts] = useState([
            {
                id: '1',
                author: 'John Smith',
                content: 'Anyone working on the algorithms assignment? I need help with the dynamic programming section.',
                timestamp: new Date('2024-01-20T14:30:00'),
                status: 'published',
                reports: 0,
                reactions: 5,
                comments: 3,
                isPinned: false,
            },
            {
                id: '2',
                author: 'Emily Davis',
                content: 'Check out this amazing resource for CS106B: https://example.com/cs106b-guide',
                timestamp: new Date('2024-01-20T13:45:00'),
                status: 'published',
                reports: 0,
                reactions: 12,
                comments: 7,
                isPinned: true,
            },
            {
                id: '3',
                author: 'Anonymous User',
                content: 'This class is stupid and the professor doesn\'t know what they\'re talking about.',
                timestamp: new Date('2024-01-20T12:15:00'),
                status: 'flagged',
                reports: 2,
                reactions: 0,
                comments: 1,
                isPinned: false,
            },
        ]);
        const tabs = ['Recent Posts', 'Flagged Content', 'Pinned Posts', 'Analytics'];
        const handlePostAction = (postId, action) => {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    switch (action) {
                        case 'pin':
                            return { ...post, isPinned: !post.isPinned };
                        case 'approve':
                            return { ...post, status: 'published' };
                        case 'hide':
                            return { ...post, status: 'hidden' };
                        case 'delete':
                            return { ...post, status: 'deleted' };
                        default:
                            return post;
                    }
                }
                return post;
            }));
        };
        const postsByStatus = {
            published: posts.filter(p => p.status === 'published'),
            flagged: posts.filter(p => p.status === 'flagged'),
            pinned: posts.filter(p => p.isPinned),
            hidden: posts.filter(p => p.status === 'hidden'),
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Content Moderation" }), _jsx("p", { className: "text-gray-600", children: "Manage and moderate space content to maintain quality discussions" })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "Total Posts", value: posts.length, icon: "\uD83D\uDCDD", subtitle: "All time" }), _jsx(MetricCard, { title: "Flagged Content", value: postsByStatus.flagged.length, icon: "\uD83D\uDEA9", subtitle: "Needs review" }), _jsx(MetricCard, { title: "Pinned Posts", value: postsByStatus.pinned.length, icon: "\uD83D\uDCCC", subtitle: "Important content" }), _jsx(MetricCard, { title: "This Week", value: 18, icon: "\uD83D\uDCC8", subtitle: "New posts", trend: "up" })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabNavigation, { tabs: tabs, activeTab: activeTab, onTabChange: setActiveTab }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'Recent Posts' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("input", { type: "text", placeholder: "Search posts...", className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" }), _jsxs("select", { className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { children: "All Posts" }), _jsx("option", { children: "Published" }), _jsx("option", { children: "Flagged" }), _jsx("option", { children: "Hidden" })] })] }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Bulk Actions" })] }), _jsx("div", { className: "space-y-3", children: posts.map((post) => (_jsxs("div", { className: `
                            p-4 border rounded-lg 
                            ${post.status === 'flagged' ? 'border-red-200 bg-red-50' : 'border-gray-200'}
                          `, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium", children: post.author.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: post.author }), _jsx("div", { className: "text-sm text-gray-600", children: post.timestamp.toLocaleString() })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [post.isPinned && (_jsx(HiveBadge, { variant: "default", size: "sm", children: "\uD83D\uDCCC Pinned" })), _jsx(HiveBadge, { variant: post.status === 'flagged' ? 'default' : 'outline', size: "sm", className: post.status === 'flagged' ? 'bg-red-500 text-[var(--hive-text-primary)]' : '', children: post.status })] })] }), _jsx("div", { className: "mb-3", children: _jsx("p", { className: "text-gray-900", children: post.content }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("span", { children: ["\u2764\uFE0F ", post.reactions] }), _jsxs("span", { children: ["\uD83D\uDCAC ", post.comments] }), post.reports > 0 && (_jsxs("span", { className: "text-red-600", children: ["\uD83D\uDEA9 ", post.reports, " reports"] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handlePostAction(post.id, 'pin'), children: post.isPinned ? 'Unpin' : 'Pin' }), post.status === 'flagged' && (_jsxs(_Fragment, { children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handlePostAction(post.id, 'approve'), children: "Approve" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handlePostAction(post.id, 'hide'), children: "Hide" })] })), _jsx("button", { onClick: () => handlePostAction(post.id, 'delete'), className: "text-red-600 hover:text-red-700 text-sm", children: "Delete" })] })] })] }, post.id))) })] }, "recent")), activeTab === 'Flagged Content' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-red-900 mb-2", children: "\u26A0\uFE0F Content Requiring Review" }), _jsx("p", { className: "text-sm text-red-800", children: "These posts have been flagged by community members and need your attention." })] }), _jsx("div", { className: "space-y-3", children: postsByStatus.flagged.map((post) => (_jsxs("div", { className: "p-4 border-2 border-red-200 bg-red-50 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-red-300 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-red-800", children: post.author.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-red-900", children: post.author }), _jsx("div", { className: "text-sm text-red-700", children: post.timestamp.toLocaleString() })] })] }), _jsxs(HiveBadge, { variant: "default", className: "bg-red-500 text-[var(--hive-text-primary)]", children: ["\uD83D\uDEA9 ", post.reports, " reports"] })] }), _jsx("div", { className: "mb-3", children: _jsx("p", { className: "text-red-900", children: post.content }) }), _jsxs("div", { className: "bg-red-100 border border-red-200 rounded-lg p-3 mb-3", children: [_jsx("h4", { className: "font-semibold text-red-900 mb-2", children: "Report Reasons:" }), _jsxs("ul", { className: "text-sm text-red-800 space-y-1", children: [_jsx("li", { children: "\u2022 Inappropriate language" }), _jsx("li", { children: "\u2022 Disrespectful to instructor" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { size: "sm", onClick: () => handlePostAction(post.id, 'approve'), children: "Approve Post" }), _jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handlePostAction(post.id, 'hide'), children: "Hide Post" }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "border-red-300 text-red-700", onClick: () => handlePostAction(post.id, 'delete'), children: "Delete Post" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Contact Author" })] })] }, post.id))) }), postsByStatus.flagged.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83C\uDF89" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No flagged content!" }), _jsx("p", { className: "text-gray-600", children: "All posts are in good standing with community guidelines." })] }))] }, "flagged")), activeTab === 'Pinned Posts' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold", children: "Pinned Posts" }), _jsx(HiveButton, { children: "Create Pinned Post" })] }), _jsx("div", { className: "space-y-3", children: postsByStatus.pinned.map((post) => (_jsxs("div", { className: "p-4 border-2 border-hive-gold bg-[var(--hive-brand-secondary)]/5 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-background-primary)]", children: post.author.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: post.author }), _jsx("div", { className: "text-sm text-gray-600", children: post.timestamp.toLocaleString() })] })] }), _jsx(HiveBadge, { variant: "default", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: "\uD83D\uDCCC Pinned" })] }), _jsx("div", { className: "mb-3", children: _jsx("p", { className: "text-gray-900", children: post.content }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("span", { children: ["\u2764\uFE0F ", post.reactions] }), _jsxs("span", { children: ["\uD83D\uDCAC ", post.comments] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handlePostAction(post.id, 'pin'), children: "Unpin" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Edit" })] })] })] }, post.id))) }), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-2", children: "\uD83D\uDCA1 Pinned Post Tips" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Use pinned posts for important announcements" }), _jsx("li", { children: "\u2022 Include community guidelines and resources" }), _jsx("li", { children: "\u2022 Keep pinned posts current and relevant" }), _jsx("li", { children: "\u2022 Limit to 2-3 pinned posts for visibility" })] })] })] }, "pinned")), activeTab === 'Analytics' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(MetricCard, { title: "Content Quality Score", value: "8.7/10", icon: "\u2B50", subtitle: "Based on member feedback" }), _jsx(MetricCard, { title: "Moderation Actions", value: "12", icon: "\uD83D\uDEE0\uFE0F", subtitle: "This month" }), _jsx(MetricCard, { title: "Community Health", value: "Excellent", icon: "\uD83D\uDC9A", subtitle: "Low report rate" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Content Activity" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Posts this week" }), _jsx("span", { className: "font-semibold", children: "18" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Average engagement" }), _jsx("span", { className: "font-semibold", children: "85%" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Positive feedback" }), _jsx("span", { className: "font-semibold", children: "94%" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Moderation Stats" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Reports resolved" }), _jsx("span", { className: "font-semibold", children: "8" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Average response time" }), _jsx("span", { className: "font-semibold", children: "2.3 hours" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Content removed" }), _jsx("span", { className: "font-semibold", children: "1" })] })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: mockRecentActivity.map((activity) => (_jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { className: "font-medium", children: activity.user }), _jsx("span", { className: "text-gray-600", children: activity.details }), _jsx("span", { className: "text-gray-500 ml-auto", children: activity.timestamp.toLocaleTimeString() })] }, activity.id))) })] })] }, "analytics"))] })] })] })] }) }));
    },
};
export const SpaceAnalyticsDashboard = {
    render: () => {
        const [activeTab, setActiveTab] = useState('Overview');
        const [timeRange, setTimeRange] = useState('7d');
        const tabs = ['Overview', 'Members', 'Content', 'Engagement'];
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Space Analytics" }), _jsx("p", { className: "text-gray-600", children: "Track your space performance and member engagement" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" }), _jsx("option", { value: "1y", children: "Last year" })] }), _jsx(HiveButton, { variant: "outline", children: "Export Report" })] })] }) }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "Total Members", value: mockAnalytics.overview.totalMembers, icon: "\uD83D\uDC65", subtitle: `${mockAnalytics.overview.activeMembers} active`, trend: "up" }), _jsx(MetricCard, { title: "Growth Rate", value: `+${mockAnalytics.overview.weeklyGrowth}%`, icon: "\uD83D\uDCC8", subtitle: "This week", trend: "up" }), _jsx(MetricCard, { title: "Engagement", value: `${Math.round(mockAnalytics.overview.engagementRate * 100)}%`, icon: "\uD83D\uDCAC", subtitle: "Member participation", trend: "up" }), _jsx(MetricCard, { title: "Content Quality", value: "8.7/10", icon: "\u2B50", subtitle: "Community rating", trend: "stable" })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabNavigation, { tabs: tabs, activeTab: activeTab, onTabChange: setActiveTab }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'Overview' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Member Activity" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Daily active members" }), _jsx("span", { className: "font-semibold text-green-600", children: mockAnalytics.overview.activeMembers })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "New members this week" }), _jsx("span", { className: "font-semibold text-blue-600", children: mockAnalytics.overview.weeklyGrowth })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Member retention" }), _jsx("span", { className: "font-semibold text-purple-600", children: "92%" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Content Performance" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Posts this week" }), _jsx("span", { className: "font-semibold text-green-600", children: mockAnalytics.posts.thisWeek })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Average engagement" }), _jsxs("span", { className: "font-semibold text-blue-600", children: [Math.round(mockAnalytics.overview.engagementRate * 100), "%"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Response rate" }), _jsx("span", { className: "font-semibold text-purple-600", children: "87%" })] })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Recent Highlights" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 bg-green-50 rounded-lg", children: [_jsx("div", { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm", children: "\uD83C\uDF89" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "New member milestone reached!" }), _jsx("div", { className: "text-sm text-gray-600", children: "Your space now has over 150 members" })] })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm", children: "\uD83D\uDCC8" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Engagement increased by 25%" }), _jsx("div", { className: "text-sm text-gray-600", children: "Compared to last week" })] })] })] })] })] }, "overview")), activeTab === 'Members' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(MetricCard, { title: "New Members", value: mockAnalytics.overview.weeklyGrowth, icon: "\uD83D\uDC4B", subtitle: "This week", trend: "up" }), _jsx(MetricCard, { title: "Active Members", value: mockAnalytics.overview.activeMembers, icon: "\uD83D\uDD25", subtitle: "Weekly active", trend: "up" }), _jsx(MetricCard, { title: "Member Retention", value: "92%", icon: "\uD83C\uDFAF", subtitle: "30-day retention", trend: "stable" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Top Contributors" }), _jsx("div", { className: "space-y-3", children: mockAnalytics.posts.topContributors.map((contributor, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--hive-background-primary)]", children: index + 1 }), _jsx("span", { className: "font-medium", children: contributor })] }), _jsxs("span", { className: "text-sm text-gray-600", children: [24 - index * 6, " posts"] })] }, contributor))) })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Member Growth" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "January" }), _jsx("span", { className: "font-semibold", children: "+12 members" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "February" }), _jsx("span", { className: "font-semibold", children: "+18 members" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "March" }), _jsx("span", { className: "font-semibold", children: "+25 members" })] })] })] })] })] }, "members")), activeTab === 'Content' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(MetricCard, { title: "Total Posts", value: mockAnalytics.posts.totalPosts, icon: "\uD83D\uDCDD", subtitle: "All time" }), _jsx(MetricCard, { title: "This Week", value: mockAnalytics.posts.thisWeek, icon: "\uD83C\uDD95", subtitle: "New posts", trend: "up" }), _jsx(MetricCard, { title: "Daily Average", value: mockAnalytics.posts.avgPerDay, icon: "\uD83D\uDCCA", subtitle: "Posts per day" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Content Types" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Text posts" }), _jsx("span", { className: "font-semibold", children: "156 (67%)" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Questions" }), _jsx("span", { className: "font-semibold", children: "45 (19%)" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Resources" }), _jsx("span", { className: "font-semibold", children: "23 (10%)" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Announcements" }), _jsx("span", { className: "font-semibold", children: "10 (4%)" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Popular Topics" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Algorithms" }), _jsx("span", { className: "font-semibold", children: "34 posts" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Data Structures" }), _jsx("span", { className: "font-semibold", children: "28 posts" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Study Groups" }), _jsx("span", { className: "font-semibold", children: "22 posts" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Assignments" }), _jsx("span", { className: "font-semibold", children: "18 posts" })] })] })] })] })] }, "content")), activeTab === 'Engagement' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(MetricCard, { title: "Engagement Rate", value: `${Math.round(mockAnalytics.overview.engagementRate * 100)}%`, icon: "\uD83D\uDCAC", subtitle: "Member participation", trend: "up" }), _jsx(MetricCard, { title: "Response Time", value: "2.3 hours", icon: "\u23F1\uFE0F", subtitle: "Average response", trend: "stable" }), _jsx(MetricCard, { title: "Discussion Quality", value: "8.7/10", icon: "\u2B50", subtitle: "Community rating", trend: "up" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Most Engaged Posts" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-1", children: "\"Algorithm study session this Friday\"" }), _jsx("div", { className: "text-xs text-gray-600", children: "23 reactions \u2022 18 comments" })] }), _jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-1", children: "\"CS106B final exam tips and tricks\"" }), _jsx("div", { className: "text-xs text-gray-600", children: "19 reactions \u2022 15 comments" })] }), _jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-1", children: "\"Great resources for dynamic programming\"" }), _jsx("div", { className: "text-xs text-gray-600", children: "16 reactions \u2022 12 comments" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Event Participation" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Total events" }), _jsx("span", { className: "font-semibold", children: mockAnalytics.events.totalEvents })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Upcoming events" }), _jsx("span", { className: "font-semibold", children: mockAnalytics.events.upcoming })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Average attendance" }), _jsx("span", { className: "font-semibold", children: mockAnalytics.events.avgAttendance })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Completion rate" }), _jsxs("span", { className: "font-semibold", children: [Math.round(mockAnalytics.events.completionRate * 100), "%"] })] })] })] })] })] }, "engagement"))] })] })] })] }) }));
    },
};
//# sourceMappingURL=space-management.stories.js.map