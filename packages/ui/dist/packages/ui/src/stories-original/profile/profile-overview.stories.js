import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileSystem } from '../../components/profile/profile-system';
const meta = {
    title: 'Profile/📋 System Overview',
    component: ProfileSystem,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Comprehensive overview of the Profile System architecture, design patterns, and component ecosystem. This collection demonstrates the complete scope and interconnection of profile components.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
// Profile System Showcase
export const ProfileSystemShowcase = {
    name: '🌟 Complete Profile System',
    args: {
        user: {
            id: 'showcase-user',
            fullName: 'HIVE System Showcase',
            handle: 'hivesystem',
            email: 'showcase@hive.university',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            major: 'System Architecture & Design',
            graduationYear: 2024,
            school: 'HIVE University',
            isBuilder: true,
            isPublic: true,
            memberSince: '2023-01-01',
            onlineStatus: 'online',
            bio: 'Showcasing the complete HIVE Profile System with all components, interactions, and features in harmony 🌟',
            interests: ['System Design', 'Component Architecture', 'User Experience', 'Accessibility'],
            stats: {
                totalSpaces: 42,
                activeSpaces: 12,
                toolsCreated: 25,
                connectionsCount: 156,
                streakDays: 89,
                totalActivity: 2847
            }
        },
        spaces: [
            {
                id: 'design-system',
                name: 'HIVE Design System',
                type: 'design',
                memberCount: 234,
                unreadCount: 15,
                lastActivity: '5 minutes ago',
                recentPosts: [
                    {
                        id: 'system-1',
                        author: 'Design Team',
                        content: '🎨 New component patterns released: Enhanced Calendar integration with ProfileSystem',
                        timestamp: '5 minutes ago',
                        type: 'announcement'
                    }
                ]
            },
            {
                id: 'user-research',
                name: 'User Research & Testing',
                type: 'research',
                memberCount: 89,
                unreadCount: 7,
                lastActivity: '20 minutes ago'
            },
            {
                id: 'accessibility',
                name: 'Accessibility Standards',
                type: 'standards',
                memberCount: 67,
                unreadCount: 3,
                lastActivity: '1 hour ago'
            }
        ],
        events: [
            {
                id: 'system-demo',
                title: '🌟 System Showcase Demo',
                time: '30 minutes',
                type: 'demo',
                location: 'Design Studio',
                attendees: ['Design team', 'Developers', 'Stakeholders'],
                metadata: {
                    purpose: 'Complete system demonstration',
                    features: 'All components and interactions'
                }
            },
            {
                id: 'component-review',
                title: '🔍 Component Architecture Review',
                time: '2 hours',
                type: 'review',
                location: 'Architecture Room',
                attendees: ['System architects', 'Component library team']
            },
            {
                id: 'user-testing',
                title: '👥 User Testing Session',
                time: 'Tomorrow 2:00 PM',
                type: 'testing',
                location: 'UX Research Lab',
                attendees: ['UX researchers', 'Test participants']
            }
        ],
        connections: [
            {
                id: 'design-community',
                type: 'design_system',
                message: 'Your component patterns are being adopted across 15 university systems',
                people: ['Design system community'],
                action: 'View adoption metrics'
            },
            {
                id: 'accessibility-network',
                type: 'accessibility',
                message: 'A11y testing reveals 98% WCAG 2.1 compliance across all profile components',
                people: ['Accessibility experts'],
                action: 'View detailed report'
            }
        ],
        hiveLab: {
            isLocked: false,
            availableTools: [
                'Component Generator',
                'Accessibility Scanner',
                'Performance Analyzer',
                'Design Token Manager'
            ],
            createdTools: [
                'Profile System Builder',
                'Calendar Integration Kit',
                'Responsive Design Tester',
                'Accessibility Validator',
                'Component Documentation Generator'
            ],
            comingSoon: [
                'AI-Powered Component Suggestions',
                'Cross-Platform Component Export',
                'Real-time Collaboration Tools'
            ]
        }
    }
};
// Component Architecture Overview
export const ComponentArchitectureOverview = {
    name: '🏗️ Architecture Overview',
    render: () => {
        return (_jsxs("div", { className: "p-8 space-y-8 bg-hive-background-primary min-h-screen", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-brand-secondary)]", children: "\uD83C\uDFD7\uFE0F HIVE Profile System Architecture" }), _jsx("p", { className: "text-xl text-gray-300 max-w-4xl mx-auto", children: "A comprehensive, interconnected component ecosystem designed for scalability, accessibility, and evolutionary growth" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-hive-gold/20", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--hive-brand-secondary)] mb-4", children: "\uD83C\uDFAF Core Components" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 ProfileSystem (Main orchestrator)" }), _jsx("li", { children: "\u2022 ProfileHeader (Identity & status)" }), _jsx("li", { children: "\u2022 CalendarCard (Schedule integration)" }), _jsx("li", { children: "\u2022 MySpacesFeed (Social connections)" }), _jsx("li", { children: "\u2022 CampusConnections (Network)" }), _jsx("li", { children: "\u2022 HiveLabSection (Tools & creation)" }), _jsx("li", { children: "\u2022 ProfileStats (Analytics)" }), _jsx("li", { children: "\u2022 SmartCalendar (Advanced scheduling)" })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-blue-500/20", children: [_jsx("h2", { className: "text-xl font-bold text-blue-400 mb-4", children: "\uD83D\uDC65 User Personas" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 \uD83E\uDE7A Pre-Med Overachiever" }), _jsx("li", { children: "\u2022 \uD83D\uDCBB Tech Startup Founder" }), _jsx("li", { children: "\u2022 \uD83D\uDCDA Community College Transfer" }), _jsx("li", { children: "\u2022 \uD83C\uDFDB\uFE0F Greek Life President" }), _jsx("li", { children: "\u2022 \uD83C\uDF93 PhD Researcher" }), _jsx("li", { children: "\u2022 \uD83C\uDF0D International Student" }), _jsx("li", { children: "\u2022 \u267F Accessibility-First User" }), _jsx("li", { children: "\u2022 \uD83D\uDCF1 Mobile-Only Student" })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-green-500/20", children: [_jsx("h2", { className: "text-xl font-bold text-green-400 mb-4", children: "\uD83C\uDFAE Interactive Features" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 \u23F0 Real-time calendar updates" }), _jsx("li", { children: "\u2022 \uD83D\uDD14 Live notification flow" }), _jsx("li", { children: "\u2022 \u26A1 Progressive loading states" }), _jsx("li", { children: "\u2022 \uD83D\uDCF1 Responsive breakpoints" }), _jsx("li", { children: "\u2022 \uD83D\uDC46 Touch-first interactions" }), _jsx("li", { children: "\u2022 \uD83D\uDD04 Cross-device synchronization" }), _jsx("li", { children: "\u2022 \uD83D\uDCF5 Offline functionality" }), _jsx("li", { children: "\u2022 \uD83D\uDCF2 PWA capabilities" })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-purple-500/20", children: [_jsx("h2", { className: "text-xl font-bold text-purple-400 mb-4", children: "\u267F Accessibility" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 \uD83D\uDD0A Screen reader support" }), _jsx("li", { children: "\u2022 \u2328\uFE0F Keyboard navigation" }), _jsx("li", { children: "\u2022 \uD83C\uDFA8 High contrast mode" }), _jsx("li", { children: "\u2022 \uD83C\uDF08 Color blind accessibility" }), _jsx("li", { children: "\u2022 \uD83D\uDCCF WCAG 2.1 compliance" }), _jsx("li", { children: "\u2022 \uD83C\uDFAF Focus management" }), _jsx("li", { children: "\u2022 \uD83D\uDCF1 Touch target sizing" }), _jsx("li", { children: "\u2022 \uD83C\uDFF7\uFE0F Semantic HTML structure" })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-orange-500/20", children: [_jsx("h2", { className: "text-xl font-bold text-orange-400 mb-4", children: "\uD83D\uDEA8 Edge Cases" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 \uD83C\uDF10 Network error handling" }), _jsx("li", { children: "\u2022 \uD83D\uDC0C Slow network performance" }), _jsx("li", { children: "\u2022 \uD83D\uDE80 Extreme data scenarios" }), _jsx("li", { children: "\u2022 \uD83D\uDCA5 Calendar sync failures" }), _jsx("li", { children: "\u2022 \uD83D\uDCCA Performance at scale" }), _jsx("li", { children: "\u2022 \uD83D\uDD04 State management stress" }), _jsx("li", { children: "\u2022 \uD83D\uDCF1 Device compatibility" }), _jsx("li", { children: "\u2022 \uD83C\uDF0D Internationalization" })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg border-2 border-pink-500/20", children: [_jsx("h2", { className: "text-xl font-bold text-pink-400 mb-4", children: "\uD83C\uDFA8 Design System" }), _jsxs("ul", { className: "space-y-2 text-gray-300", children: [_jsx("li", { children: "\u2022 \uD83C\uDFAF Component interconnection" }), _jsx("li", { children: "\u2022 \uD83C\uDFD7\uFE0F Evolutionary architecture" }), _jsx("li", { children: "\u2022 \uD83D\uDD04 Kitchen sink philosophy" }), _jsx("li", { children: "\u2022 \uD83D\uDCD0 Consistent spacing system" }), _jsx("li", { children: "\u2022 \uD83C\uDFAD Brand system integration" }), _jsx("li", { children: "\u2022 \uD83C\uDF1F Motion and animations" }), _jsx("li", { children: "\u2022 \uD83D\uDCE6 Reusable component library" }), _jsx("li", { children: "\u2022 \uD83D\uDCDA Comprehensive documentation" })] })] })] }), _jsxs("div", { className: "bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/30 p-6 rounded-lg text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)] mb-4", children: "\uD83C\uDF1F Design System Evolution" }), _jsx("p", { className: "text-lg text-gray-300 max-w-4xl mx-auto", children: "Every component enhances and evolves our existing design system. New components work beautifully with existing ones and establish patterns for future development. This evolutionary approach ensures that each addition makes the entire HIVE design system better, not just adds to it." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "\uD83D\uDCCA Story Coverage" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "User Scenarios" }), _jsx("span", { className: "text-[var(--hive-brand-secondary)] font-medium", children: "8+ personas" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Interactive Demos" }), _jsx("span", { className: "text-blue-400 font-medium", children: "6 dynamic stories" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Accessibility Tests" }), _jsx("span", { className: "text-green-400 font-medium", children: "5 a11y scenarios" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Mobile/Responsive" }), _jsx("span", { className: "text-purple-400 font-medium", children: "6 breakpoint tests" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Edge Cases" }), _jsx("span", { className: "text-orange-400 font-medium", children: "8 error states" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Calendar Scenarios" }), _jsx("span", { className: "text-pink-400 font-medium", children: "12+ variations" })] })] })] }), _jsxs("div", { className: "bg-hive-background-secondary p-6 rounded-lg", children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-4", children: "\uD83D\uDEE0\uFE0F Technical Features" }), _jsxs("div", { className: "space-y-2 text-gray-300", children: [_jsx("div", { children: "\u2705 TypeScript with comprehensive types" }), _jsx("div", { children: "\u2705 React 18+ with modern patterns" }), _jsx("div", { children: "\u2705 Tailwind CSS with design tokens" }), _jsx("div", { children: "\u2705 Framer Motion animations" }), _jsx("div", { children: "\u2705 Storybook 8.4+ documentation" }), _jsx("div", { children: "\u2705 Accessibility testing integration" }), _jsx("div", { children: "\u2705 Responsive design utilities" }), _jsx("div", { children: "\u2705 Performance optimizations" }), _jsx("div", { children: "\u2705 Error boundary handling" }), _jsx("div", { children: "\u2705 PWA-ready components" })] })] })] })] }));
    }
};
// Kitchen Sink Demo
export const KitchenSinkDemo = {
    name: '🔧 Kitchen Sink (Everything)',
    args: {
        ...ProfileSystemShowcase.args,
        // Enable all possible features and states
        showAllFeatures: true,
        showExperimentalFeatures: true,
        enableAdvancedInteractions: true,
        showDebugInfo: true,
        kitchenSinkMode: true
    }
};
//# sourceMappingURL=profile-overview.stories.js.map