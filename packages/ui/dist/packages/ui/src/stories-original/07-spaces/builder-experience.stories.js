import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';
const meta = {
    title: '07-Spaces/Builder Experience',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Space Builder Experience

Complete builder tools and workflows for space administration and community management. These stories demonstrate the advanced capabilities available to space builders.

## Builder Tools

1. **Builder Onboarding** - First-time setup and orientation
2. **Space Configuration** - Advanced space settings and customization
3. **Content Management** - Creation, curation, and moderation tools
4. **Member Management** - Advanced member administration
5. **Analytics & Insights** - Performance tracking and reporting

## Builder Capabilities

- **Advanced Permissions** - Full administrative access
- **Tool Deployment** - Add and configure space tools
- **Surface Customization** - Configure space layout and features
- **Analytics Access** - Detailed performance insights
- **Community Leadership** - Guide and moderate discussions

## When to Use

- **Space Administration** - Managing space settings and configuration
- **Community Moderation** - Maintaining healthy discussions
- **Growth Management** - Scaling space membership and engagement
- **Performance Optimization** - Improving space effectiveness
- **Leadership Development** - Training new builders
        `,
            },
        },
    },
};
export default meta;
// Mock data for builder experience
const mockBuilderData = {
    id: 'builder123',
    name: 'Alex Chen',
    email: 'alex.chen@stanford.edu',
    role: 'builder',
    spaces: [
        { id: 'space1', name: 'Stanford CS Study Group', role: 'founder' },
        { id: 'space2', name: 'AI Research Lab', role: 'co-builder' },
    ],
    experience: {
        builderSince: new Date('2024-01-15'),
        spacesManaged: 2,
        membersHelped: 156,
        contentModerated: 24,
        toolsDeployed: 8,
    },
};
const mockOnboardingSteps = [
    {
        id: 'welcome',
        title: 'Welcome to Builder Tools',
        description: 'Learn about your new capabilities and responsibilities',
        completed: true,
    },
    {
        id: 'space-settings',
        title: 'Configure Your Space',
        description: 'Set up basic space settings and privacy options',
        completed: true,
    },
    {
        id: 'surface-setup',
        title: 'Customize Surfaces',
        description: 'Enable and configure the 6-surface architecture',
        completed: true,
    },
    {
        id: 'member-management',
        title: 'Member Management',
        description: 'Learn to invite and manage community members',
        completed: false,
    },
    {
        id: 'content-moderation',
        title: 'Content Moderation',
        description: 'Understand content policies and moderation tools',
        completed: false,
    },
    {
        id: 'analytics',
        title: 'Analytics & Insights',
        description: 'Access and interpret space performance data',
        completed: false,
    },
];
const mockTools = [
    {
        id: 'tool1',
        name: 'Study Schedule Coordinator',
        description: 'Helps members coordinate study sessions',
        status: 'active',
        users: 45,
        satisfaction: 4.8,
    },
    {
        id: 'tool2',
        name: 'Grade Calculator',
        description: 'Calculate GPA and track academic progress',
        status: 'active',
        users: 32,
        satisfaction: 4.6,
    },
    {
        id: 'tool3',
        name: 'Resource Library',
        description: 'Curated collection of study materials',
        status: 'draft',
        users: 0,
        satisfaction: 0,
    },
];
const mockAnalytics = {
    memberGrowth: {
        thisWeek: 12,
        lastWeek: 8,
        trend: 'up',
    },
    engagement: {
        postsThisWeek: 24,
        commentsThisWeek: 156,
        averageDaily: 3.4,
    },
    topContent: [
        { title: 'CS106B Study Guide', engagement: 89, type: 'resource' },
        { title: 'Algorithm Workshop', engagement: 67, type: 'event' },
        { title: 'Debug Help Thread', engagement: 45, type: 'discussion' },
    ],
};
export const BuilderOnboarding = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(0);
        const [completedSteps, setCompletedSteps] = useState(new Set([0, 1, 2]));
        const handleStepComplete = (stepIndex) => {
            setCompletedSteps(new Set([...completedSteps, stepIndex]));
            if (stepIndex === currentStep && stepIndex < mockOnboardingSteps.length - 1) {
                setCurrentStep(stepIndex + 1);
            }
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Builder Onboarding" }), _jsx("p", { className: "text-gray-600", children: "Welcome to your builder journey! Let's get you set up with everything you need." })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Onboarding Progress" }), _jsxs("div", { className: "text-sm text-gray-600", children: [completedSteps.size, " of ", mockOnboardingSteps.length, " completed"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-4", children: _jsx("div", { className: "bg-[var(--hive-brand-secondary)] h-2 rounded-full transition-all duration-300", style: { width: `${(completedSteps.size / mockOnboardingSteps.length) * 100}%` } }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mockOnboardingSteps.map((step, index) => (_jsx("div", { className: `
                    p-4 rounded-lg border cursor-pointer transition-colors
                    ${completedSteps.has(index)
                                        ? 'bg-green-50 border-green-200'
                                        : index === currentStep
                                            ? 'bg-[var(--hive-brand-secondary)]/10 border-hive-gold'
                                            : 'bg-gray-50 border-gray-200'}
                  `, onClick: () => setCurrentStep(index), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `
                      w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                      ${completedSteps.has(index)
                                                    ? 'bg-green-500 text-[var(--hive-text-primary)]'
                                                    : index === currentStep
                                                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                                        : 'bg-gray-300 text-gray-600'}
                    `, children: completedSteps.has(index) ? '✓' : index + 1 }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: step.title }), _jsx("p", { className: "text-sm text-gray-600", children: step.description })] })] }) }, step.id))) })] }), _jsx("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: mockOnboardingSteps[currentStep]?.title }), currentStep === 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gradient-to-r from-hive-gold/20 to-yellow-100 rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uD83C\uDF89 Congratulations!" }), _jsx("p", { className: "text-gray-700", children: "You've been promoted to a builder role. This means you now have advanced capabilities to help shape and grow your space community." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "What's New" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Content moderation tools" }), _jsx("li", { children: "\u2022 Member management access" }), _jsx("li", { children: "\u2022 Space configuration options" }), _jsx("li", { children: "\u2022 Analytics and insights" })] })] }), _jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-green-900 mb-2", children: "Your Responsibilities" }), _jsxs("ul", { className: "text-sm text-green-800 space-y-1", children: [_jsx("li", { children: "\u2022 Foster positive community culture" }), _jsx("li", { children: "\u2022 Moderate content appropriately" }), _jsx("li", { children: "\u2022 Help new members get oriented" }), _jsx("li", { children: "\u2022 Keep space settings up to date" })] })] })] })] })), currentStep === 3 && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "Learn how to effectively manage your space members, handle invitations, and promote community engagement." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "\uD83D\uDC65 Member Management" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [_jsx("li", { children: "\u2022 Send invitations to new members" }), _jsx("li", { children: "\u2022 Approve or decline join requests" }), _jsx("li", { children: "\u2022 Promote members to builder status" }), _jsx("li", { children: "\u2022 Remove members if necessary" })] })] }), _jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "\uD83E\uDD1D Community Building" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [_jsx("li", { children: "\u2022 Welcome new members personally" }), _jsx("li", { children: "\u2022 Facilitate introductions" }), _jsx("li", { children: "\u2022 Encourage participation" }), _jsx("li", { children: "\u2022 Recognize valuable contributions" })] })] })] })] })), currentStep === 4 && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "Master the art of content moderation to maintain a healthy, productive community environment." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "\uD83D\uDCDD Content Guidelines" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [_jsx("li", { children: "\u2022 Keep discussions relevant and helpful" }), _jsx("li", { children: "\u2022 Ensure respectful communication" }), _jsx("li", { children: "\u2022 Remove spam or inappropriate content" }), _jsx("li", { children: "\u2022 Pin important announcements" })] })] }), _jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "\u2696\uFE0F Moderation Tools" }), _jsxs("ul", { className: "text-sm text-gray-600 space-y-1", children: [_jsx("li", { children: "\u2022 Pin/unpin posts" }), _jsx("li", { children: "\u2022 Delete inappropriate content" }), _jsx("li", { children: "\u2022 Handle reported content" }), _jsx("li", { children: "\u2022 Communicate with members" })] })] })] })] })), currentStep === 5 && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: "Learn to use analytics to understand your space's performance and make data-driven decisions." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 border rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: "156" }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Members" })] }), _jsxs("div", { className: "p-4 border rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: "89%" }), _jsx("div", { className: "text-sm text-gray-600", children: "Engagement Rate" })] }), _jsxs("div", { className: "p-4 border rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: "24" }), _jsx("div", { className: "text-sm text-gray-600", children: "Posts This Week" })] })] })] })), _jsxs("div", { className: "flex justify-between mt-6", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setCurrentStep(Math.max(0, currentStep - 1)), disabled: currentStep === 0, children: "Previous" }), _jsx(HiveButton, { onClick: () => {
                                                    if (!completedSteps.has(currentStep)) {
                                                        handleStepComplete(currentStep);
                                                    }
                                                    else if (currentStep < mockOnboardingSteps.length - 1) {
                                                        setCurrentStep(currentStep + 1);
                                                    }
                                                }, children: completedSteps.has(currentStep)
                                                    ? (currentStep === mockOnboardingSteps.length - 1 ? 'Finish' : 'Next')
                                                    : 'Complete Step' })] })] }, currentStep) }) })] }) }));
    },
};
export const SpaceConfigurationTools = {
    render: () => {
        const [activeTab, setActiveTab] = useState('surfaces');
        const [spaceSettings, setSpaceSettings] = useState({
            surfaces: {
                pinned: { enabled: true, order: 1 },
                posts: { enabled: true, order: 2 },
                events: { enabled: true, order: 3 },
                tools: { enabled: true, order: 4 },
                members: { enabled: true, order: 5 },
                chat: { enabled: false, order: 6 },
            },
            privacy: {
                visibility: 'public',
                joinRequests: true,
                memberDirectory: 'public',
            },
            features: {
                allowEvents: true,
                allowTools: true,
                postModeration: false,
                autoWelcome: true,
            },
        });
        const tabs = ['Surfaces', 'Privacy', 'Features', 'Integrations'];
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Space Configuration Tools" }), _jsx("p", { className: "text-gray-600", children: "Advanced settings and customization options for your space" })] }), _jsx("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border mb-6", children: _jsx("div", { className: "flex gap-1 p-1 bg-gray-100 rounded-lg", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.toLowerCase()), className: `
                    flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab.toLowerCase()
                                    ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'}
                  `, children: tab }, tab))) }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'surfaces' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Surface Configuration" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Configure which surfaces are available and their display order" }), _jsx("div", { className: "space-y-4", children: Object.entries(spaceSettings.surfaces).map(([surfaceId, config]) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-bold", children: config.order }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium capitalize", children: surfaceId }), _jsxs("p", { className: "text-sm text-gray-600", children: [surfaceId === 'pinned' && 'Important announcements and resources', surfaceId === 'posts' && 'Main discussion feed', surfaceId === 'events' && 'Events and activities', surfaceId === 'tools' && 'Collaborative tools', surfaceId === 'members' && 'Member directory', surfaceId === 'chat' && 'Real-time chat (coming soon)'] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: config.enabled, onChange: (e) => setSpaceSettings({
                                                                            ...spaceSettings,
                                                                            surfaces: {
                                                                                ...spaceSettings.surfaces,
                                                                                [surfaceId]: { ...config, enabled: e.target.checked }
                                                                            }
                                                                        }), disabled: surfaceId === 'posts' || surfaceId === 'members' || surfaceId === 'chat', className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm", children: "Enabled" })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("button", { className: "text-xs text-gray-500 hover:text-gray-700", children: "\u2191" }), _jsx("button", { className: "text-xs text-gray-500 hover:text-gray-700", children: "\u2193" })] })] })] }, surfaceId))) })] }, "surfaces")), activeTab === 'privacy' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Privacy Settings" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-3", children: "Space Visibility" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "visibility", value: "public", checked: spaceSettings.privacy.visibility === 'public', onChange: (e) => setSpaceSettings({
                                                                                ...spaceSettings,
                                                                                privacy: { ...spaceSettings.privacy, visibility: e.target.value }
                                                                            }), className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Public" }), _jsx("div", { className: "text-sm text-gray-600", children: "Anyone can find and join" })] })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50", children: [_jsx("input", { type: "radio", name: "visibility", value: "private", checked: spaceSettings.privacy.visibility === 'private', onChange: (e) => setSpaceSettings({
                                                                                ...spaceSettings,
                                                                                privacy: { ...spaceSettings.privacy, visibility: e.target.value }
                                                                            }), className: "text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Private" }), _jsx("div", { className: "text-sm text-gray-600", children: "Invitation only" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-3", children: "Member Settings" }), _jsx("div", { className: "space-y-3", children: _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow Join Requests" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can request to join" })] }), _jsx("input", { type: "checkbox", checked: spaceSettings.privacy.joinRequests, onChange: (e) => setSpaceSettings({
                                                                            ...spaceSettings,
                                                                            privacy: { ...spaceSettings.privacy, joinRequests: e.target.checked }
                                                                        }), className: "text-[var(--hive-brand-secondary)]" })] }) })] })] })] }, "privacy")), activeTab === 'features' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Feature Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow Events" }), _jsx("div", { className: "text-sm text-gray-600", children: "Members can create events" })] }), _jsx("input", { type: "checkbox", checked: spaceSettings.features.allowEvents, onChange: (e) => setSpaceSettings({
                                                                ...spaceSettings,
                                                                features: { ...spaceSettings.features, allowEvents: e.target.checked }
                                                            }), className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Allow Tools" }), _jsx("div", { className: "text-sm text-gray-600", children: "Enable tool deployment" })] }), _jsx("input", { type: "checkbox", checked: spaceSettings.features.allowTools, onChange: (e) => setSpaceSettings({
                                                                ...spaceSettings,
                                                                features: { ...spaceSettings.features, allowTools: e.target.checked }
                                                            }), className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Post Moderation" }), _jsx("div", { className: "text-sm text-gray-600", children: "Require approval for posts" })] }), _jsx("input", { type: "checkbox", checked: spaceSettings.features.postModeration, onChange: (e) => setSpaceSettings({
                                                                ...spaceSettings,
                                                                features: { ...spaceSettings.features, postModeration: e.target.checked }
                                                            }), className: "text-[var(--hive-brand-secondary)]" })] }), _jsxs("label", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Auto Welcome" }), _jsx("div", { className: "text-sm text-gray-600", children: "Send welcome message to new members" })] }), _jsx("input", { type: "checkbox", checked: spaceSettings.features.autoWelcome, onChange: (e) => setSpaceSettings({
                                                                ...spaceSettings,
                                                                features: { ...spaceSettings.features, autoWelcome: e.target.checked }
                                                            }), className: "text-[var(--hive-brand-secondary)]" })] })] })] }, "features")), activeTab === 'integrations' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Integrations" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h3", { className: "font-medium mb-2", children: "Canvas Integration" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Connect with Canvas to sync assignments and grades" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Connect Canvas" })] }), _jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h3", { className: "font-medium mb-2", children: "Google Calendar" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Sync space events with Google Calendar" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Connect Google Calendar" })] }), _jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h3", { className: "font-medium mb-2", children: "Slack Notifications" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Send notifications to Slack channels" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Connect Slack" })] })] })] }, "integrations"))] }) }), _jsx("div", { className: "flex justify-end mt-6", children: _jsx(HiveButton, { children: "Save Configuration" }) })] }) }));
    },
};
export const ContentManagementTools = {
    render: () => {
        const [activeTab, setActiveTab] = useState('create');
        const [contentForm, setContentForm] = useState({
            type: 'announcement',
            title: '',
            content: '',
            pinned: false,
            schedule: '',
        });
        const tabs = ['Create', 'Manage', 'Templates', 'Schedule'];
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Content Management Tools" }), _jsx("p", { className: "text-gray-600", children: "Create, manage, and schedule content for your space" })] }), _jsx("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border mb-6", children: _jsx("div", { className: "flex gap-1 p-1 bg-gray-100 rounded-lg", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.toLowerCase()), className: `
                    flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab.toLowerCase()
                                    ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'}
                  `, children: tab }, tab))) }) }), activeTab === 'create' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Create Content" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Content Type" }), _jsxs("select", { value: contentForm.type, onChange: (e) => setContentForm({ ...contentForm, type: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", children: [_jsx("option", { value: "announcement", children: "Announcement" }), _jsx("option", { value: "resource", children: "Resource" }), _jsx("option", { value: "discussion", children: "Discussion Starter" }), _jsx("option", { value: "poll", children: "Poll" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Title" }), _jsx("input", { type: "text", value: contentForm.title, onChange: (e) => setContentForm({ ...contentForm, title: e.target.value }), placeholder: "Enter a compelling title", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Content" }), _jsx("textarea", { value: contentForm.content, onChange: (e) => setContentForm({ ...contentForm, content: e.target.value }), placeholder: "Write your content here...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-gold", rows: 6 })] }), _jsx("div", { className: "flex items-center gap-4", children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: contentForm.pinned, onChange: (e) => setContentForm({ ...contentForm, pinned: e.target.checked }), className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm", children: "Pin to top of feed" })] }) }), _jsxs("div", { className: "flex gap-3", children: [_jsx(HiveButton, { children: "Publish Now" }), _jsx(HiveButton, { variant: "outline", children: "Save Draft" }), _jsx(HiveButton, { variant: "outline", children: "Schedule" })] })] })] })), activeTab === 'manage' && (_jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-lg shadow-sm border p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Manage Content" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Welcome to CS Study Group" }), _jsx("p", { className: "text-sm text-gray-600", children: "Pinned announcement \u2022 2 days ago" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Edit" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Unpin" })] })] }), _jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: "Study Session Guidelines" }), _jsx("p", { className: "text-sm text-gray-600", children: "Resource \u2022 1 week ago" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Edit" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Pin" })] })] })] })] }))] }) }));
    },
};
export const BuilderAnalyticsTools = {
    render: () => {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Builder Analytics Dashboard" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive insights into your space's performance" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: mockAnalytics.memberGrowth.thisWeek }), _jsx("div", { className: "text-sm text-gray-600", children: "New Members" }), _jsxs("div", { className: "text-xs text-green-600", children: ["\u2197 +", mockAnalytics.memberGrowth.thisWeek - mockAnalytics.memberGrowth.lastWeek] })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: mockAnalytics.engagement.postsThisWeek }), _jsx("div", { className: "text-sm text-gray-600", children: "Posts This Week" }), _jsxs("div", { className: "text-xs text-blue-600", children: ["Avg: ", mockAnalytics.engagement.averageDaily, "/day"] })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: mockAnalytics.engagement.commentsThisWeek }), _jsx("div", { className: "text-sm text-gray-600", children: "Comments" }), _jsx("div", { className: "text-xs text-green-600", children: "High engagement" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: mockTools.filter(t => t.status === 'active').length }), _jsx("div", { className: "text-sm text-gray-600", children: "Active Tools" }), _jsxs("div", { className: "text-xs text-purple-600", children: [mockTools.reduce((sum, t) => sum + t.users, 0), " users"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Top Performing Content" }), _jsx("div", { className: "space-y-3", children: mockAnalytics.topContent.map((content, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: content.title }), _jsx("div", { className: "text-xs text-gray-600 capitalize", children: content.type })] }), _jsxs("div", { className: "text-sm font-medium text-[var(--hive-brand-secondary)]", children: [content.engagement, "% engagement"] })] }, index))) })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Tool Performance" }), _jsx("div", { className: "space-y-3", children: mockTools.filter(t => t.status === 'active').map((tool) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: tool.name }), _jsxs("div", { className: "text-xs text-gray-600", children: [tool.users, " active users"] })] }), _jsxs("div", { className: "text-sm font-medium text-green-600", children: ["\u2B50 ", tool.satisfaction] })] }, tool.id))) })] })] })] }) }));
    },
};
//# sourceMappingURL=builder-experience.stories.js.map