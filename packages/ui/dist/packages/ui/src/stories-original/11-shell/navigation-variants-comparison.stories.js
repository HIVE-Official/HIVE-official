import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { HiveNavigationShell } from '../../components/navigation/hive-navigation-shell';
import { Home, Users, Zap, Calendar, BookOpen, Settings, User, TrendingUp, Hash, Shield, FileText } from 'lucide-react';
const meta = {
    title: '11-Shell/Navigation Variants Comparison',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Navigation Variants Comparison

This story showcases all navigation variants side by side to help you choose the best one for your use case.

## When to Use Each Variant

### Sidebar Navigation
**Best for:** Desktop applications, admin panels, complex workflows
- **Pros:** Space for many navigation items, clear hierarchy, familiar pattern
- **Cons:** Takes up horizontal space, may not work well on narrow screens

### Topbar Navigation
**Best for:** Content-heavy apps, marketing sites, simple workflows
- **Pros:** Maximizes content space, mobile-friendly, modern look
- **Cons:** Limited space for navigation items, may need dropdown menus

### Command Navigation
**Best for:** Power users, developer tools, productivity apps
- **Pros:** Keyboard-driven, minimal UI, very fast navigation
- **Cons:** Learning curve, not suitable for casual users

### Minimal Navigation
**Best for:** Immersive experiences, creative tools, focused work
- **Pros:** Maximum content space, beautiful aesthetic, non-intrusive
- **Cons:** Limited functionality, may hide important actions

## Design Considerations

- **Screen Size:** Sidebar works best on desktop, topbar on mobile
- **User Type:** Command palette for power users, topbar for casual users
- **Content Type:** Minimal for content consumption, sidebar for complex UIs
- **Brand:** All variants maintain HIVE design consistency
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Mock data
const mockUser = {
    id: 'user-1',
    name: 'Alex Rivera',
    handle: 'alexr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Student',
    status: 'online'
};
const mockSections = [
    {
        id: 'main',
        label: 'Main',
        items: [
            { id: 'feed', label: 'Feed', icon: Home, href: '/', isActive: true },
            { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: { count: 5 } },
            { id: 'build', label: 'Build', icon: Zap, href: '/build' },
            { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
            { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' }
        ]
    },
    {
        id: 'tools',
        label: 'Tools',
        items: [
            { id: 'gpa-calc', label: 'GPA Calculator', icon: Hash, href: '/tools/gpa' },
            { id: 'grade-tracker', label: 'Grade Tracker', icon: TrendingUp, href: '/tools/grades' }
        ]
    },
    {
        id: 'personal',
        label: 'Personal',
        items: [
            { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
            { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' }
        ]
    }
];
const SampleContent = ({ variant }) => (_jsxs("div", { className: "p-8 max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("h1", { className: "text-3xl font-bold mb-4", style: { color: 'var(--hive-text-primary)' }, children: [variant.charAt(0).toUpperCase() + variant.slice(1), " Navigation"] }), _jsxs("p", { className: "text-lg mb-6", style: { color: 'var(--hive-text-secondary)' }, children: ["This demonstrates the ", variant, " navigation variant with sample content."] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
                { title: 'Active Spaces', value: '12', icon: Users },
                { title: 'Tools Built', value: '8', icon: Zap },
                { title: 'Events This Week', value: '5', icon: Calendar }
            ].map((metric) => (_jsxs("div", { className: "p-6 rounded-lg border", style: {
                    backgroundColor: 'var(--hive-background-secondary)',
                    borderColor: 'var(--hive-border-primary)'
                }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(metric.icon, { className: "w-5 h-5", style: { color: 'var(--hive-brand-primary)' } }), _jsx("h3", { className: "font-semibold", style: { color: 'var(--hive-text-primary)' }, children: metric.title })] }), _jsx("p", { className: "text-2xl font-bold", style: { color: 'var(--hive-text-primary)' }, children: metric.value })] }, metric.title))) }), _jsxs("div", { className: "prose prose-invert max-w-none", children: [_jsxs("h2", { style: { color: 'var(--hive-text-primary)' }, children: ["About ", variant, " Navigation"] }), _jsx("div", { className: "space-y-4", children: _jsx("div", { className: "p-4 rounded-lg border", style: {
                            backgroundColor: 'var(--hive-background-secondary)',
                            borderColor: 'var(--hive-border-primary)'
                        }, children: _jsxs("p", { style: { color: 'var(--hive-text-primary)' }, children: ["The ", variant, " navigation provides a ", variant === 'sidebar' ? 'traditional left-side' :
                                    variant === 'topbar' ? 'horizontal top-bar' :
                                        variant === 'command' ? 'command palette-driven' : 'minimal floating', " approach to navigation."] }) }) })] })] }));
// ============================================================================
// COMPARISON STORIES
// ============================================================================
export const SidebarVariant = {
    render: () => (_jsx(HiveNavigationShell, { variant: "sidebar", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, collapsible: true, keyboardShortcuts: true, children: _jsx(SampleContent, { variant: "sidebar" }) }))
};
export const TopbarVariant = {
    render: () => (_jsx(HiveNavigationShell, { variant: "topbar", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: true, children: _jsx(SampleContent, { variant: "topbar" }) }))
};
export const CommandVariant = {
    render: () => (_jsx(HiveNavigationShell, { variant: "command", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: true, children: _jsx(SampleContent, { variant: "command" }) }))
};
export const MinimalVariant = {
    render: () => (_jsx(HiveNavigationShell, { variant: "minimal", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: true, children: _jsx(SampleContent, { variant: "minimal" }) }))
};
// ============================================================================
// USAGE SCENARIOS
// ============================================================================
export const StudentDashboard = {
    render: () => (_jsx(HiveNavigationShell, { variant: "sidebar", size: "standard", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, collapsible: true, keyboardShortcuts: true, children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", style: { color: 'var(--hive-text-primary)' }, children: "Student Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "p-6 rounded-lg border", style: {
                                backgroundColor: 'var(--hive-background-secondary)',
                                borderColor: 'var(--hive-border-primary)'
                            }, children: [_jsx("h3", { className: "font-semibold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "Calculate GPA" }), _jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "Join Study Group" }), _jsx("button", { className: "w-full text-left p-2 rounded hover:bg-gray-700 transition-colors", children: "Create Tool" })] })] }), _jsxs("div", { className: "p-6 rounded-lg border", style: {
                                backgroundColor: 'var(--hive-background-secondary)',
                                borderColor: 'var(--hive-border-primary)'
                            }, children: [_jsx("h3", { className: "font-semibold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Recent Activity" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsx("div", { children: "Built GPA calculator" }), _jsx("div", { children: "Joined CS Study Group" }), _jsx("div", { children: "Updated profile" })] })] }), _jsxs("div", { className: "p-6 rounded-lg border", style: {
                                backgroundColor: 'var(--hive-background-secondary)',
                                borderColor: 'var(--hive-border-primary)'
                            }, children: [_jsx("h3", { className: "font-semibold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Upcoming Events" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsx("div", { children: "Study session - Tomorrow" }), _jsx("div", { children: "Project deadline - Friday" }), _jsx("div", { children: "Career fair - Next week" })] })] })] })] }) }))
};
export const AdminPanel = {
    render: () => (_jsx(HiveNavigationShell, { variant: "sidebar", size: "expanded", user: { ...mockUser, name: 'Jordan Admin', role: 'Administrator' }, sections: [
            {
                id: 'admin',
                label: 'Administration',
                items: [
                    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin', isActive: true },
                    { id: 'users', label: 'User Management', icon: Users, href: '/admin/users', badge: { count: 1247 } },
                    { id: 'content', label: 'Content Moderation', icon: Shield, href: '/admin/content', badge: { count: 8, variant: 'warning' } },
                    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/admin/analytics' },
                    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
                    { id: 'logs', label: 'Activity Logs', icon: FileText, href: '/admin/logs' }
                ]
            }
        ], showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, collapsible: true, keyboardShortcuts: true, children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", style: { color: 'var(--hive-text-primary)' }, children: "Admin Dashboard" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                        { title: 'Total Users', value: '1,247', change: '+12%' },
                        { title: 'Active Spaces', value: '89', change: '+5%' },
                        { title: 'Tools Created', value: '234', change: '+18%' },
                        { title: 'Daily Active', value: '456', change: '+3%' }
                    ].map((stat) => (_jsxs("div", { className: "p-6 rounded-lg border", style: {
                            backgroundColor: 'var(--hive-background-secondary)',
                            borderColor: 'var(--hive-border-primary)'
                        }, children: [_jsx("h3", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-secondary)' }, children: stat.title }), _jsx("p", { className: "text-2xl font-bold mb-1", style: { color: 'var(--hive-text-primary)' }, children: stat.value }), _jsx("p", { className: "text-sm", style: { color: 'var(--hive-brand-primary)' }, children: stat.change })] }, stat.title))) })] }) }))
};
export const MobileExperience = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: () => (_jsx(HiveNavigationShell, { variant: "topbar", user: mockUser, sections: mockSections, showSearch: false, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: false, mobileBreakpoint: 768, children: _jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Mobile Experience" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 rounded-lg border", style: {
                                backgroundColor: 'var(--hive-background-secondary)',
                                borderColor: 'var(--hive-border-primary)'
                            }, children: [_jsx("h3", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-primary)' }, children: "Today's Schedule" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsx("div", { children: "9:00 AM - Calculus" }), _jsx("div", { children: "11:00 AM - Physics Lab" }), _jsx("div", { children: "2:00 PM - Study Group" })] })] }), _jsxs("div", { className: "p-4 rounded-lg border", style: {
                                backgroundColor: 'var(--hive-background-secondary)',
                                borderColor: 'var(--hive-border-primary)'
                            }, children: [_jsx("h3", { className: "font-semibold mb-2", style: { color: 'var(--hive-text-primary)' }, children: "Quick Tools" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { className: "p-3 rounded-lg border text-center", children: "GPA Calc" }), _jsx("button", { className: "p-3 rounded-lg border text-center", children: "Grades" }), _jsx("button", { className: "p-3 rounded-lg border text-center", children: "Schedule" }), _jsx("button", { className: "p-3 rounded-lg border text-center", children: "Notes" })] })] })] })] }) }))
};
export const PowerUserWorkflow = {
    render: () => (_jsx(HiveNavigationShell, { variant: "command", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: true, children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", style: { color: 'var(--hive-text-primary)' }, children: "Power User Workflow" }), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Keyboard Shortcuts" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u2318K" }), _jsx("span", { children: "Open command palette" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u2318B" }), _jsx("span", { children: "Toggle sidebar" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u2318/" }), _jsx("span", { children: "Search tools" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u23181" }), _jsx("span", { children: "Go to feed" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u23182" }), _jsx("span", { children: "Go to spaces" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u23183" }), _jsx("span", { children: "Go to build" })] })] })] })] }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-lg mb-4", style: { color: 'var(--hive-text-secondary)' }, children: ["Press ", _jsx("kbd", { className: "px-2 py-1 bg-gray-700 rounded text-sm", children: "\u2318K" }), " to open the command palette"] }), _jsx("p", { style: { color: 'var(--hive-text-muted)' }, children: "Navigate entirely with your keyboard for maximum productivity" })] })] }) }))
};
export const ContentFocusedExperience = {
    render: () => (_jsx(HiveNavigationShell, { variant: "minimal", user: mockUser, sections: mockSections, showSearch: true, showNotifications: true, showUserMenu: true, showBranding: true, keyboardShortcuts: true, children: _jsx("div", { className: "p-8 max-w-4xl mx-auto", children: _jsxs("article", { className: "prose prose-invert max-w-none", children: [_jsx("h1", { style: { color: 'var(--hive-text-primary)' }, children: "Content-Focused Experience" }), _jsx("p", { style: { color: 'var(--hive-text-secondary)' }, children: "The minimal navigation variant provides maximum space for content while keeping essential navigation accessible when needed." }), _jsx("h2", { style: { color: 'var(--hive-text-primary)' }, children: "Perfect for Reading" }), _jsx("p", { style: { color: 'var(--hive-text-secondary)' }, children: "This layout is ideal for documentation, articles, tutorials, and other content that benefits from a distraction-free reading experience." }), _jsx("h2", { style: { color: 'var(--hive-text-primary)' }, children: "Immersive Learning" }), _jsx("p", { style: { color: 'var(--hive-text-secondary)' }, children: "Students can focus on learning materials without visual clutter, while still having quick access to tools and navigation when needed." }), _jsxs("div", { className: "not-prose p-6 rounded-lg border mt-8", style: {
                            backgroundColor: 'var(--hive-background-secondary)',
                            borderColor: 'var(--hive-border-primary)'
                        }, children: [_jsx("h3", { className: "font-semibold mb-4", style: { color: 'var(--hive-text-primary)' }, children: "Key Benefits" }), _jsxs("ul", { className: "space-y-2", style: { color: 'var(--hive-text-secondary)' }, children: [_jsx("li", { children: "\u2022 Maximum content space" }), _jsx("li", { children: "\u2022 Minimal visual distraction" }), _jsx("li", { children: "\u2022 Beautiful, modern aesthetic" }), _jsx("li", { children: "\u2022 Quick access to navigation" }), _jsx("li", { children: "\u2022 Keyboard shortcuts available" })] })] })] }) }) }))
};
//# sourceMappingURL=navigation-variants-comparison.stories.js.map