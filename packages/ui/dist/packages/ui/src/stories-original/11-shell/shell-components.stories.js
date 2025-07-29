import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
// Use specific imports to avoid conflicts
import { AppShell, EnhancedAppShell, NavigationHeader, NavigationSidebar, BreadcrumbNavigation, CommandPalette, UserMenu, ShellProvider } from '../../components/shell';
import { PageContainer } from '../../atomic/atoms/container';
import { Home, Folder } from 'lucide-react';
const meta = {
    title: '11-Shell/Application Shell',
    parameters: {
        docs: {
            description: {
                component: 'HIVE Application Shell components for layout, navigation, and user interaction',
            },
        },
    },
};
export default meta;
// Mock data for stories
const mockUser = {
    name: 'Jacob Smith',
    email: 'jacob@hive.com',
    avatar: '/placeholder-avatar.jpg',
    role: 'Founder'
};
const mockNotifications = [
    { id: '1', title: 'New space created', message: 'Development team space is ready', time: '2m ago', unread: true },
    { id: '2', title: 'Tool published', message: 'Your design tool is now live', time: '1h ago', unread: true },
    { id: '3', title: 'Member joined', message: 'Sarah joined your space', time: '3h ago', unread: false },
];
const mockBreadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Spaces', href: '/spaces', icon: Folder },
    { label: 'Design Team', href: '/spaces/design' },
    { label: 'Tools', href: '/spaces/design/tools' },
];
// Basic App Shell
export const BasicAppShell = {
    render: () => (_jsx("div", { className: "h-screen bg-obsidian", children: _jsx(ShellProvider, { children: _jsx(AppShell, { user: {
                    id: '1',
                    name: mockUser.name,
                    handle: 'jacob_smith',
                    avatar: mockUser.avatar,
                    builderStatus: 'active'
                }, currentSection: "spaces", layoutType: "dashboard", children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Basic App Shell" }), _jsx("p", { className: "text-silver", children: "This is the basic HIVE application shell with header, sidebar, and main content area." })] }) }) }) })),
};
// Enhanced App Shell
export const EnhancedShell = {
    render: () => (_jsx("div", { className: "h-screen bg-obsidian", children: _jsx(ShellProvider, { children: _jsx(EnhancedAppShell, { user: {
                    id: '1',
                    name: mockUser.name,
                    handle: 'jacob_smith',
                    avatar: mockUser.avatar,
                    builderStatus: 'active'
                }, notifications: mockNotifications, breadcrumbs: mockBreadcrumbs, searchEnabled: true, commandPaletteEnabled: true, children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Enhanced App Shell" }), _jsx("p", { className: "text-silver mb-6", children: "Enhanced shell with command palette, breadcrumbs, and advanced features." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Feature 1" }), _jsx("p", { className: "text-silver text-sm", children: "Enhanced shell features and functionality" })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Feature 2" }), _jsx("p", { className: "text-silver text-sm", children: "Advanced navigation and user experience" })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Feature 3" }), _jsx("p", { className: "text-silver text-sm", children: "Seamless integration and performance" })] })] })] }) }) }) })),
};
// Navigation Header
export const HeaderComponent = {
    render: () => {
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        return (_jsxs("div", { className: "bg-obsidian min-h-screen", children: [_jsx("div", { className: "border-b border-steel", children: _jsx(NavigationHeader, { user: {
                            id: '1',
                            name: mockUser.name,
                            handle: 'jacob_smith',
                            avatar: mockUser.avatar,
                            builderStatus: 'active'
                        }, currentSection: "spaces", onToggleSidebar: () => setSidebarCollapsed(!sidebarCollapsed), sidebarCollapsed: sidebarCollapsed, showGlobalSearch: true, showNotifications: true, showBuilderAccess: true, onOpenNotifications: () => console.log('Open notifications'), onOpenCommandPalette: () => console.log('Open command palette'), unreadNotificationCount: 3, height: "standard" }) }), _jsxs("div", { className: "p-8 mt-16", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Navigation Header" }), _jsx("p", { className: "text-silver", children: "HIVE navigation header with logo, search, notifications, and user menu." })] })] }));
    },
};
// Navigation Sidebar
export const SidebarComponent = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen flex", children: [_jsx("div", { className: "w-64 border-r border-steel", children: _jsx(NavigationSidebar, { collapsed: false, user: {
                        id: '1',
                        name: mockUser.name,
                        handle: 'jacob_smith',
                        avatar: mockUser.avatar,
                        builderStatus: 'active'
                    }, currentSection: "spaces" }) }), _jsxs("div", { className: "flex-1 p-8 mt-16", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Navigation Sidebar" }), _jsx("p", { className: "text-silver", children: "HIVE navigation sidebar with collapsible menu items and active states." })] })] })),
};
// Collapsed Sidebar
export const CollapsedSidebar = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen flex", children: [_jsx("div", { className: "w-16 border-r border-steel", children: _jsx(NavigationSidebar, { collapsed: true, user: {
                        id: '1',
                        name: mockUser.name,
                        handle: 'jacob_smith',
                        avatar: mockUser.avatar,
                        builderStatus: 'active'
                    }, currentSection: "spaces" }) }), _jsxs("div", { className: "flex-1 p-8 mt-16", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Collapsed Sidebar" }), _jsx("p", { className: "text-silver", children: "HIVE navigation sidebar in collapsed state with icon-only display." })] })] })),
};
// Breadcrumb Navigation
export const BreadcrumbComponent = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen", children: [_jsx("div", { className: "border-b border-steel p-4", children: _jsx(BreadcrumbNavigation, { items: mockBreadcrumbs }) }), _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Breadcrumb Navigation" }), _jsx("p", { className: "text-silver mb-8", children: "HIVE breadcrumb navigation for hierarchical navigation and context." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Simple Breadcrumbs" }), _jsx("div", { className: "bg-charcoal p-4 rounded-lg border border-steel", children: _jsx(BreadcrumbNavigation, { items: [
                                                { label: 'Home', href: '/' },
                                                { label: 'Spaces', href: '/spaces' },
                                                { label: 'Current Page' },
                                            ] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "With Icons" }), _jsx("div", { className: "bg-charcoal p-4 rounded-lg border border-steel", children: _jsx(BreadcrumbNavigation, { items: mockBreadcrumbs }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Long Path" }), _jsx("div", { className: "bg-charcoal p-4 rounded-lg border border-steel", children: _jsx(BreadcrumbNavigation, { items: [
                                                { label: 'Home', href: '/' },
                                                { label: 'Organization', href: '/org' },
                                                { label: 'Team', href: '/org/team' },
                                                { label: 'Projects', href: '/org/team/projects' },
                                                { label: 'Design System', href: '/org/team/projects/design' },
                                                { label: 'Components', href: '/org/team/projects/design/components' },
                                                { label: 'Button Component' },
                                            ] }) })] })] })] })] })),
};
// Command Palette
export const CommandPaletteComponent = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Command Palette" }), _jsx("p", { className: "text-silver mb-8", children: "HIVE command palette for quick navigation and actions. Press Cmd+K to open." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Demo (Always Open)" }), _jsx("div", { className: "max-w-lg", children: _jsx(CommandPalette, { isOpen: true, onClose: () => console.log('Close command palette') }) })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Features" }), _jsxs("ul", { className: "text-silver space-y-2", children: [_jsx("li", { children: "\u2022 Fuzzy search for commands and navigation" }), _jsx("li", { children: "\u2022 Keyboard shortcuts (Cmd+K to open)" }), _jsx("li", { children: "\u2022 Categorized commands with icons" }), _jsx("li", { children: "\u2022 Recent actions and suggestions" }), _jsx("li", { children: "\u2022 Dark luxury theme with glass morphism" })] })] })] })] })),
};
// Notification Center
export const NotificationComponent = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Notification Center" }), _jsx("p", { className: "text-silver mb-8", children: "HIVE notification center for alerts, updates, and user messages." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Notification Panel" }), _jsx("div", { className: "max-w-sm", children: _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-4", children: "Notification Center" }), _jsx("p", { className: "text-silver text-sm", children: "Notifications would appear here in the actual implementation." })] }) })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Notification Types" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-info)] rounded-full" }), _jsx("span", { className: "text-silver", children: "Info - General updates and information" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-success)] rounded-full" }), _jsx("span", { className: "text-silver", children: "Success - Achievements and completions" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-warning)] rounded-full" }), _jsx("span", { className: "text-silver", children: "Warning - Important notices" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-[var(--hive-status-error)] rounded-full" }), _jsx("span", { className: "text-silver", children: "Error - Issues requiring attention" })] })] })] })] })] })),
};
// User Menu
export const UserMenuComponent = {
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "User Menu" }), _jsx("p", { className: "text-silver mb-8", children: "HIVE user menu with profile, settings, and account management." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "User Menu (Open)" }), _jsx("div", { className: "max-w-xs", children: _jsx(UserMenu, { user: {
                                        id: '1',
                                        name: mockUser.name,
                                        handle: 'jacob_smith',
                                        avatar: mockUser.avatar
                                    } }) })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "User Info Display" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gold rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-background-primary)] font-semibold", children: "JS" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-platinum font-medium", children: mockUser.name }), _jsx("div", { className: "text-mercury text-sm", children: mockUser.email }), _jsx("div", { className: "text-[var(--hive-brand-secondary)] text-xs", children: mockUser.role })] })] })] })] })] })),
};
// Page Container
export const PageContainerComponent = {
    render: () => (_jsx("div", { className: "bg-obsidian min-h-screen", children: _jsx(PageContainer, { children: _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-4", children: "Page Container" }), _jsx("p", { className: "text-silver mb-8", children: "HIVE page container provides consistent layout and spacing for content." }), _jsxs("div", { className: "space-y-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-4", children: "Standard Layout" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Card 1" }), _jsx("p", { className: "text-silver text-sm", children: "Content within page container" })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Card 2" }), _jsx("p", { className: "text-silver text-sm", children: "Consistent spacing and layout" })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-platinum font-semibold mb-2", children: "Card 3" }), _jsx("p", { className: "text-silver text-sm", children: "Professional presentation" })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-4", children: "Features" }), _jsx("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: _jsxs("ul", { className: "text-silver space-y-2", children: [_jsx("li", { children: "\u2022 Responsive layout with max-width constraints" }), _jsx("li", { children: "\u2022 Consistent padding and margins" }), _jsx("li", { children: "\u2022 Mobile-first responsive design" }), _jsx("li", { children: "\u2022 Integration with HIVE shell components" }), _jsx("li", { children: "\u2022 Accessibility-focused structure" })] }) })] })] })] }) }) })),
};
//# sourceMappingURL=shell-components.stories.js.map