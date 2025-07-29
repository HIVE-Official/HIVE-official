import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Search, Bell, MessageSquare, Users, Calendar, BookOpen, Settings, Plus, Menu, Home, ChevronRight, User, Bookmark, Star } from 'lucide-react';
// HIVE Navigation Molecules - Dense Mobile-First Design
const meta = {
    title: 'Molecules/🧭 Navigation',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**HIVE Navigation Molecules** - Mobile-first social navigation with dense responsive layouts

Brand-compliant navigation patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that pack content intelligently across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for active states and primary actions
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for text
- **Zero Non-Brand Colors**: No blues, greens, reds, or other colors

## Dense Navigation Patterns
- **Mobile-First**: Touch-friendly navigation that scales up
- **Compact Spacing**: Minimal gaps with intelligent content packing
- **Quick Access**: Frequently used actions prominently placed
- **Campus Context**: Navigation tailored for university social needs

## Campus Social Features
- Spaces navigation (courses, housing, clubs)
- Real-time notifications and messages
- Quick actions for campus life
- Tool creation and management access
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Mobile Navigation Bar - Primary Campus Navigation
const MobileNavigationBar = ({ activeTab = 'spaces', notificationCount = 3, messageCount = 7, onTabChange = () => { } }) => {
    const tabs = [
        { id: 'spaces', label: 'Spaces', icon: Users },
        { id: 'calendar', label: 'Schedule', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messageCount },
        { id: 'tools', label: 'Tools', icon: BookOpen },
        { id: 'profile', label: 'Profile', icon: User }
    ];
    return (_jsx("div", { className: "bg-obsidian border-t border-steel", children: _jsx("div", { className: "flex items-center justify-around py-2", children: tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (_jsxs("button", { onClick: () => onTabChange(tab.id), className: `relative flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${isActive
                        ? 'text-gold'
                        : 'text-silver hover:text-platinum'}`, children: [_jsxs("div", { className: "relative", children: [_jsx(Icon, { className: `h-5 w-5 ${isActive ? 'text-gold' : ''}` }), tab.badge && (_jsx("div", { className: "absolute -top-2 -right-2 bg-gold text-obsidian text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center", children: tab.badge > 99 ? '99+' : tab.badge }))] }), _jsx("span", { className: `text-xs mt-1 font-medium ${isActive ? 'text-gold' : ''}`, children: tab.label }), isActive && (_jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full" }))] }, tab.id));
            }) }) }));
};
// Campus Navigation Header - Quick Actions & Search
const CampusNavigationHeader = ({ currentSpace = 'CS 106B: Programming Abstractions', hasNotifications = true, notificationCount = 5, onSearch = () => { }, onNotifications = () => { }, onProfile = () => { } }) => {
    return (_jsx("div", { className: "bg-obsidian border-b border-steel", children: _jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [_jsx("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(BookOpen, { className: "h-5 w-5 text-gold flex-shrink-0" }), _jsx("span", { className: "text-platinum font-medium truncate text-sm", children: currentSpace })] }) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: onSearch, className: "p-2 rounded-lg hover:bg-charcoal transition-colors", children: _jsx(Search, { className: "h-5 w-5 text-silver hover:text-platinum" }) }), _jsxs("button", { onClick: onNotifications, className: "relative p-2 rounded-lg hover:bg-charcoal transition-colors", children: [_jsx(Bell, { className: "h-5 w-5 text-silver hover:text-platinum" }), hasNotifications && (_jsx("div", { className: "absolute -top-1 -right-1 bg-gold text-obsidian text-xs font-bold rounded-full min-w-4 h-4 flex items-center justify-center", children: notificationCount > 9 ? '9+' : notificationCount }))] }), _jsx("button", { onClick: onProfile, className: "w-8 h-8 bg-charcoal rounded-full border-2 border-steel hover:border-gold transition-colors flex items-center justify-center", children: _jsx(User, { className: "h-4 w-4 text-silver" }) })] })] }) }));
};
// Spaces Quick Access Navigation - Dense Campus Communities
const SpacesQuickAccess = ({ spaces = [
    { id: 'cs106b', name: 'CS 106B', type: 'course', unreadCount: 8, isPinned: true },
    { id: 'wilbur-3rd', name: 'Wilbur 3rd', type: 'housing', unreadCount: 3, isPinned: true },
    { id: 'hci-club', name: 'HCI Club', type: 'club', unreadCount: 2 },
    { id: 'cs161', name: 'CS 161', type: 'course', unreadCount: 12 },
    { id: 'dorm-study', name: 'Study Group', type: 'club', unreadCount: 1 }
], onSpaceClick = () => { } }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'course': return BookOpen;
            case 'housing': return Home;
            case 'club': return Users;
            default: return Users;
        }
    };
    return (_jsx("div", { className: "bg-charcoal border-b border-steel", children: _jsxs("div", { className: "px-4 py-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "text-sm font-semibold text-platinum", children: "Quick Access" }), _jsx("button", { className: "text-xs text-silver hover:text-gold transition-colors", children: "See All" })] }), _jsx("div", { className: "flex space-x-2 overflow-x-auto pb-2", children: spaces.map((space) => {
                        const Icon = getTypeIcon(space.type);
                        return (_jsxs("button", { onClick: () => onSpaceClick(space.id), className: "relative flex-shrink-0 flex items-center space-x-2 bg-graphite hover:bg-slate border border-steel hover:border-gold/50 rounded-lg py-2 px-3 transition-all duration-200", children: [space.isPinned && (_jsx(Star, { className: "h-3 w-3 text-gold absolute -top-1 -right-1", fill: "currentColor" })), _jsx(Icon, { className: "h-4 w-4 text-silver" }), _jsx("span", { className: "text-sm font-medium text-platinum whitespace-nowrap", children: space.name }), space.unreadCount && space.unreadCount > 0 && (_jsx("div", { className: "bg-gold text-obsidian text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center", children: space.unreadCount > 99 ? '99+' : space.unreadCount }))] }, space.id));
                    }) })] }) }));
};
// Navigation Breadcrumb - Campus Context Trail
const CampusNavigationBreadcrumb = ({ breadcrumbs = [
    { id: 'spaces', label: 'Spaces', path: '/spaces' },
    { id: 'cs106b', label: 'CS 106B', path: '/spaces/cs106b' },
    { id: 'discussion', label: 'Assignment 4 Discussion', path: '/spaces/cs106b/discussion/123' }
], onBreadcrumbClick = () => { } }) => {
    return (_jsx("div", { className: "bg-charcoal border-b border-steel px-4 py-2", children: _jsx("div", { className: "flex items-center space-x-2 overflow-x-auto", children: breadcrumbs.map((crumb, index) => (_jsxs("div", { className: "flex items-center space-x-2 flex-shrink-0", children: [_jsx("button", { onClick: () => onBreadcrumbClick(crumb.path), className: `text-sm transition-colors ${index === breadcrumbs.length - 1
                            ? 'text-platinum font-medium cursor-default'
                            : 'text-silver hover:text-gold'}`, children: crumb.label }), index < breadcrumbs.length - 1 && (_jsx(ChevronRight, { className: "h-3 w-3 text-pewter" }))] }, crumb.id))) }) }));
};
// Campus Tools Navigation - HIVE Lab Quick Access
const CampusToolsNavigation = ({ tools = [
    { id: 'grade-tracker', name: 'Grade Tracker', icon: '📊', category: 'created' },
    { id: 'study-timer', name: 'Study Timer', icon: '⏱️', category: 'favorite' },
    { id: 'room-finder', name: 'Room Finder', icon: '🏛️', category: 'recent', isNew: true },
    { id: 'schedule-optimizer', name: 'Schedule Helper', icon: '📅', category: 'favorite' }
], onToolClick = () => { }, onCreateTool = () => { } }) => {
    return (_jsx("div", { className: "bg-charcoal border-b border-steel", children: _jsxs("div", { className: "px-4 py-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(BookOpen, { className: "h-4 w-4 text-gold mr-2" }), "HIVE Tools"] }), _jsxs("button", { onClick: onCreateTool, className: "flex items-center space-x-1 bg-gold text-obsidian px-3 py-1 rounded-md text-xs font-semibold hover:bg-champagne transition-colors", children: [_jsx(Plus, { className: "h-3 w-3" }), _jsx("span", { children: "Create" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: tools.map((tool) => (_jsxs("button", { onClick: () => onToolClick(tool.id), className: "relative flex items-center space-x-2 bg-graphite hover:bg-slate border border-steel hover:border-gold/50 rounded-lg p-3 transition-all duration-200 text-left", children: [tool.isNew && (_jsx("div", { className: "absolute -top-1 -right-1 bg-gold text-obsidian text-xs font-bold px-1 rounded", children: "NEW" })), _jsx("span", { className: "text-lg", children: tool.icon }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-platinum truncate", children: tool.name }), _jsx("div", { className: "text-xs text-silver capitalize", children: tool.category })] })] }, tool.id))) })] }) }));
};
// Dense Sidebar Navigation - Desktop Campus Navigation
const DenseCampusSidebar = ({ isCollapsed = false, activeSection = 'spaces', onToggleCollapse = () => { }, onSectionChange = () => { } }) => {
    const navigationSections = [
        { id: 'spaces', label: 'My Spaces', icon: Users, badge: 12 },
        { id: 'calendar', label: 'Schedule', icon: Calendar, badge: 3 },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 7 },
        { id: 'tools', label: 'HIVE Tools', icon: BookOpen, badge: 2 },
        { id: 'bookmarks', label: 'Saved', icon: Bookmark },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];
    return (_jsx("div", { className: `bg-obsidian border-r border-steel transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`, children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "p-4 border-b border-steel", children: _jsxs("div", { className: "flex items-center justify-between", children: [!isCollapsed && (_jsx("h2", { className: "text-lg font-bold text-gold", children: "HIVE" })), _jsx("button", { onClick: onToggleCollapse, className: "p-2 rounded-lg hover:bg-charcoal transition-colors", children: isCollapsed ? (_jsx(ChevronRight, { className: "h-4 w-4 text-silver" })) : (_jsx(Menu, { className: "h-4 w-4 text-silver" })) })] }) }), _jsx("div", { className: "flex-1 py-4", children: _jsx("div", { className: "space-y-1 px-2", children: navigationSections.map((section) => {
                            const isActive = activeSection === section.id;
                            const Icon = section.icon;
                            return (_jsxs("button", { onClick: () => onSectionChange(section.id), className: `w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-gold/10 border border-gold/30 text-gold'
                                    : 'hover:bg-charcoal text-silver hover:text-platinum'}`, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Icon, { className: `h-5 w-5 ${isActive ? 'text-gold' : ''}` }), !isCollapsed && (_jsx("span", { className: `font-medium ${isActive ? 'text-gold' : ''}`, children: section.label }))] }), !isCollapsed && section.badge && (_jsx("div", { className: `text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center ${isActive
                                            ? 'bg-gold text-obsidian'
                                            : 'bg-steel text-silver'}`, children: section.badge > 99 ? '99+' : section.badge }))] }, section.id));
                        }) }) }), _jsx("div", { className: "p-4 border-t border-steel", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-charcoal rounded-full border-2 border-steel flex items-center justify-center", children: _jsx(User, { className: "h-4 w-4 text-silver" }) }), !isCollapsed && (_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-platinum truncate", children: "Maya Patel" }), _jsx("div", { className: "text-xs text-silver", children: "Stanford CS" })] }))] }) })] }) }));
};
// Stories
export const MobileCampusNavigation = {
    name: '📱 Mobile Campus Navigation',
    render: () => (_jsxs("div", { className: "h-screen bg-obsidian flex flex-col", children: [_jsx(CampusNavigationHeader, {}), _jsx(SpacesQuickAccess, {}), _jsx("div", { className: "flex-1 bg-charcoal p-4", children: _jsxs("div", { className: "text-center text-silver mt-8", children: [_jsx(Users, { className: "h-12 w-12 mx-auto mb-4 text-gold" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Campus Navigation" }), _jsx("p", { className: "text-sm", children: "Navigate your university community with ease" })] }) }), _jsx(MobileNavigationBar, {})] })),
    parameters: {
        viewport: { defaultViewport: 'mobile2' }
    }
};
export const DenseSpacesQuickAccess = {
    name: '🏛️ Dense Spaces Navigation',
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen", children: [_jsx(SpacesQuickAccess, {}), _jsx("div", { className: "p-4", children: _jsxs("div", { className: "bg-charcoal rounded-lg p-6 text-center", children: [_jsx(BookOpen, { className: "h-8 w-8 text-gold mx-auto mb-3" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Quick Space Access" }), _jsx("p", { className: "text-sm text-silver", children: "Pinned and recent campus communities for fast navigation" })] }) })] }))
};
export const HIVEToolsNavigation = {
    name: '🛠️ HIVE Tools Navigation',
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen", children: [_jsx(CampusToolsNavigation, {}), _jsx("div", { className: "p-4", children: _jsxs("div", { className: "bg-charcoal rounded-lg p-6 text-center", children: [_jsx(BookOpen, { className: "h-8 w-8 text-gold mx-auto mb-3" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Campus Tools" }), _jsx("p", { className: "text-sm text-silver", children: "Quick access to your created and favorite HIVE tools" })] }) })] }))
};
export const CampusBreadcrumbNavigation = {
    name: '🧭 Campus Breadcrumb Trail',
    render: () => (_jsxs("div", { className: "bg-obsidian min-h-screen", children: [_jsx(CampusNavigationBreadcrumb, {}), _jsx("div", { className: "p-4", children: _jsxs("div", { className: "bg-charcoal rounded-lg p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-4", children: "Context Navigation" }), _jsxs("div", { className: "space-y-3 text-sm text-silver", children: [_jsx("div", { children: "\u2022 Track your location within campus communities" }), _jsx("div", { children: "\u2022 Navigate back to parent spaces easily" }), _jsx("div", { children: "\u2022 Maintain context across deep discussions" }), _jsx("div", { children: "\u2022 Mobile-optimized horizontal scrolling" })] })] }) })] }))
};
export const DesktopCampusSidebar = {
    name: '💻 Desktop Campus Sidebar',
    render: () => {
        const [isCollapsed, setIsCollapsed] = React.useState(false);
        return (_jsxs("div", { className: "h-screen bg-obsidian flex", children: [_jsx(DenseCampusSidebar, { isCollapsed: isCollapsed, onToggleCollapse: () => setIsCollapsed(!isCollapsed) }), _jsx("div", { className: "flex-1 bg-charcoal p-8", children: _jsxs("div", { className: "text-center", children: [_jsx(Users, { className: "h-16 w-16 text-gold mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-platinum mb-4", children: "Campus Navigation" }), _jsx("p", { className: "text-silver", children: "Dense sidebar navigation with collapsible design for desktop campus experience" })] }) })] }));
    }
};
export const ResponsiveCampusNavigation = {
    name: '📐 Responsive Campus Navigation',
    render: () => {
        const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
        React.useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return (_jsx("div", { className: "h-screen bg-obsidian", children: isMobile ? (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx(CampusNavigationHeader, {}), _jsx(SpacesQuickAccess, {}), _jsx("div", { className: "flex-1 bg-charcoal p-4", children: _jsxs("div", { className: "text-center text-silver mt-8", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Mobile View" }), _jsx("p", { className: "text-sm", children: "Optimized for touch navigation" })] }) }), _jsx(MobileNavigationBar, {})] })) : (_jsxs("div", { className: "flex h-full", children: [_jsx(DenseCampusSidebar, {}), _jsx("div", { className: "flex-1 bg-charcoal p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-platinum mb-4", children: "Desktop View" }), _jsx("p", { className: "text-silver", children: "Sidebar navigation for larger screens" })] }) })] })) }));
    }
};
//# sourceMappingURL=hive-navigation-molecules.stories.js.map