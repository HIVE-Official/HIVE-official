import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';
const meta = {
    title: '07-Spaces/Navigation',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Space Navigation & Routing

Navigation patterns and routing behaviors within and between HIVE spaces. These stories demonstrate how users move through the space ecosystem and maintain context during navigation.

## Navigation Patterns

1. **Space-to-Space Navigation** - Moving between different spaces
2. **Surface Navigation** - Moving between surfaces within a space
3. **Breadcrumb Navigation** - Showing navigation hierarchy
4. **Deep Linking** - Direct links to specific content or surfaces
5. **State Preservation** - Maintaining context during navigation

## Navigation Components

- **Space Switcher** - Quick access to user's spaces
- **Surface Tabs** - Navigate between space surfaces
- **Breadcrumb Trail** - Show current location in hierarchy
- **Navigation Sidebar** - Persistent navigation menu
- **Quick Actions** - Contextual navigation shortcuts

## When to Use

- **Space Interior** - Navigation within space layout
- **Multi-Space Workflows** - Users managing multiple spaces
- **Deep Content Access** - Direct links to specific content
- **Mobile Navigation** - Responsive navigation patterns
- **State Management** - Preserving user context and preferences
        `,
            },
        },
    },
};
export default meta;
// Mock data for navigation
const mockSpaces = [
    {
        id: 'space1',
        name: 'Stanford CS Study Group',
        type: 'academic',
        memberCount: 156,
        isActive: true,
        color: 'var(--hive-status-info)',
        icon: '💻',
        unreadCount: 3,
    },
    {
        id: 'space2',
        name: 'Wilbur Hall Community',
        type: 'residential',
        memberCount: 89,
        isActive: false,
        color: 'var(--hive-status-success)',
        icon: '🏠',
        unreadCount: 1,
    },
    {
        id: 'space3',
        name: 'Entrepreneurship Club',
        type: 'social',
        memberCount: 234,
        isActive: false,
        color: 'var(--hive-status-info)',
        icon: '🚀',
        unreadCount: 0,
    },
    {
        id: 'space4',
        name: 'CS106B TAs',
        type: 'academic',
        memberCount: 12,
        isActive: false,
        color: 'var(--hive-status-warning)',
        icon: '🎓',
        unreadCount: 7,
    },
];
const mockSurfaces = [
    { id: 'pinned', name: 'Pinned', icon: '📌', count: 3 },
    { id: 'posts', name: 'Posts', icon: '💬', count: 24 },
    { id: 'events', name: 'Events', icon: '📅', count: 3 },
    { id: 'tools', name: 'Tools', icon: '🔧', count: 4 },
    { id: 'members', name: 'Members', icon: '👥', count: 156 },
    { id: 'chat', name: 'Chat', icon: '💬', count: 0, disabled: true },
];
const mockBreadcrumbs = [
    { id: 'spaces', name: 'Spaces', href: '/spaces' },
    { id: 'space', name: 'Stanford CS Study Group', href: '/spaces/cs-study-group' },
    { id: 'surface', name: 'Posts', href: '/spaces/cs-study-group/posts' },
];
const mockUser = {
    id: 'user123',
    name: 'Alex Chen',
    avatar: '/api/placeholder/32/32',
    role: 'builder',
};
// Space Switcher Component
const SpaceSwitcher = ({ spaces, activeSpace, onSpaceChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const currentSpace = spaces.find(s => s.id === activeSpace);
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowDropdown(!showDropdown), className: "flex items-center gap-2 px-3 py-2 bg-[var(--hive-text-primary)] border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { className: "text-lg", children: currentSpace?.icon }), _jsx("span", { className: "font-medium", children: currentSpace?.name }), _jsx("span", { className: "text-gray-400", children: "\u2304" })] }), showDropdown && (_jsxs("div", { className: "absolute top-full left-0 mt-2 w-80 bg-[var(--hive-text-primary)] border rounded-lg shadow-lg z-10", children: [_jsxs("div", { className: "p-2", children: [_jsx("div", { className: "text-sm font-medium text-gray-700 px-3 py-2", children: "Your Spaces" }), _jsx("div", { className: "space-y-1", children: spaces.map((space) => (_jsxs("button", { onClick: () => {
                                        onSpaceChange(space.id);
                                        setShowDropdown(false);
                                    }, className: `
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${space.id === activeSpace
                                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                        : 'hover:bg-gray-50'}
                  `, children: [_jsx("span", { className: "text-lg", children: space.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: space.name }), _jsxs("div", { className: "text-sm text-gray-500 truncate", children: [space.memberCount, " members"] })] }), space.unreadCount > 0 && (_jsx("div", { className: "w-5 h-5 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center", children: space.unreadCount }))] }, space.id))) })] }), _jsx("div", { className: "border-t p-2", children: _jsxs("button", { className: "w-full flex items-center gap-2 px-3 py-2 text-left text-[var(--hive-brand-secondary)] hover:bg-gray-50 rounded-lg", children: [_jsx("span", { children: "+" }), _jsx("span", { children: "Create New Space" })] }) })] }))] }));
};
// Surface Navigation Component
const SurfaceNavigation = ({ surfaces, activeSurface, onSurfaceChange }) => (_jsx("div", { className: "flex gap-1 bg-gray-100 p-1 rounded-lg", children: surfaces.map((surface) => (_jsxs("button", { onClick: () => onSurfaceChange(surface.id), disabled: surface.disabled, className: `
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${surface.disabled
            ? 'text-gray-400 cursor-not-allowed'
            : activeSurface === surface.id
                ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'}
        `, children: [_jsx("span", { children: surface.icon }), _jsx("span", { children: surface.name }), surface.count > 0 && (_jsx("span", { className: "text-xs bg-gray-200 px-1.5 py-0.5 rounded-full", children: surface.count }))] }, surface.id))) }));
// Breadcrumb Component
const Breadcrumbs = ({ breadcrumbs, onNavigate }) => (_jsx("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: breadcrumbs.map((crumb, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [index > 0 && _jsx("span", { children: "/" }), _jsx("button", { onClick: () => onNavigate(crumb.href), className: `
            hover:text-gray-900 transition-colors
            ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}
          `, children: crumb.name })] }, crumb.id))) }));
// Navigation Sidebar Component
const NavigationSidebar = ({ spaces, activeSpace, activeSurface, onSpaceChange, onSurfaceChange }) => {
    const currentSpace = spaces.find(s => s.id === activeSpace);
    return (_jsxs("div", { className: "w-64 bg-[var(--hive-text-primary)] border-r flex flex-col", children: [_jsx("div", { className: "p-4 border-b", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-sm font-bold text-[var(--hive-background-primary)]", children: mockUser.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: mockUser.name }), _jsx("div", { className: "text-sm text-gray-600", children: mockUser.role })] })] }) }), _jsxs("div", { className: "p-4 border-b", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "text-lg", children: currentSpace?.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: currentSpace?.name }), _jsxs("div", { className: "text-sm text-gray-600", children: [currentSpace?.memberCount, " members"] })] })] }), _jsx("div", { className: "space-y-1", children: mockSurfaces.map((surface) => (_jsxs("button", { onClick: () => onSurfaceChange(surface.id), disabled: surface.disabled, className: `
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                ${surface.disabled
                                ? 'text-gray-400 cursor-not-allowed'
                                : activeSurface === surface.id
                                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                    : 'text-gray-600 hover:bg-gray-100'}
              `, children: [_jsx("span", { children: surface.icon }), _jsx("span", { className: "font-medium", children: surface.name }), surface.count > 0 && (_jsx("span", { className: "text-xs bg-gray-200 px-1.5 py-0.5 rounded-full ml-auto", children: surface.count }))] }, surface.id))) })] }), _jsxs("div", { className: "p-4 flex-1", children: [_jsx("div", { className: "text-sm font-medium text-gray-700 mb-3", children: "Other Spaces" }), _jsx("div", { className: "space-y-1", children: spaces.filter(s => s.id !== activeSpace).map((space) => (_jsxs("button", { onClick: () => onSpaceChange(space.id), className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors", children: [_jsx("span", { children: space.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: space.name }), _jsxs("div", { className: "text-sm text-gray-500 truncate", children: [space.memberCount, " members"] })] }), space.unreadCount > 0 && (_jsx("div", { className: "w-4 h-4 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center", children: space.unreadCount }))] }, space.id))) })] }), _jsx("div", { className: "p-4 border-t", children: _jsxs("div", { className: "space-y-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", className: "w-full", children: "Create Space" }), _jsx(HiveButton, { variant: "outline", size: "sm", className: "w-full", children: "Browse Spaces" })] }) })] }));
};
export const SpaceToSpaceNavigation = {
    render: () => {
        const [activeSpace, setActiveSpace] = useState('space1');
        const [activeSurface, setActiveSurface] = useState('posts');
        const currentSpace = mockSpaces.find(s => s.id === activeSpace);
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(SpaceSwitcher, { spaces: mockSpaces, activeSpace: activeSpace, onSpaceChange: setActiveSpace }), _jsx("div", { className: "h-6 w-px bg-gray-300" }), _jsx(Breadcrumbs, { breadcrumbs: mockBreadcrumbs, onNavigate: (href) => console.log('Navigate to:', href) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Browse All Spaces" }), _jsx(HiveButton, { size: "sm", children: "Create Space" })] })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-lg flex items-center justify-center text-2xl", style: { backgroundColor: currentSpace?.color + '20' }, children: currentSpace?.icon }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: currentSpace?.name }), _jsxs("div", { className: "flex items-center gap-4 text-gray-600", children: [_jsxs("span", { children: [currentSpace?.memberCount, " members"] }), _jsx(HiveBadge, { variant: "outline", className: "capitalize", children: currentSpace?.type }), currentSpace?.unreadCount > 0 && (_jsxs(HiveBadge, { variant: "default", className: "bg-red-500", children: [currentSpace?.unreadCount, " unread"] }))] })] })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx(SurfaceNavigation, { surfaces: mockSurfaces, activeSurface: activeSurface, onSurfaceChange: setActiveSurface }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "md:col-span-2", children: _jsxs(HiveCard, { className: "p-6", children: [_jsxs("h2", { className: "text-xl font-semibold mb-4", children: [mockSurfaces.find(s => s.id === activeSurface)?.name, " Surface"] }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["This is the content area for the ", activeSurface, " surface in ", currentSpace?.name, "."] }), _jsx("div", { className: "grid grid-cols-1 gap-4", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("h3", { className: "font-medium mb-2", children: ["Sample Content ", i] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["This represents content that would appear in the ", activeSurface, " surface."] })] }, i))) })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Quick Stats" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Total Members" }), _jsx("span", { className: "font-medium", children: currentSpace?.memberCount })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Active Today" }), _jsx("span", { className: "font-medium", children: "23" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Posts This Week" }), _jsx("span", { className: "font-medium", children: "45" })] })] })] }), _jsxs(HiveCard, { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "font-medium", children: ["Member ", i, " posted"] }), _jsxs("div", { className: "text-gray-500", children: [i * 2, " hours ago"] })] })] }, i))) })] })] })] }) })] }) }));
    },
};
export const SurfaceNavigationStory = {
    render: () => {
        const [activeSurface, setActiveSurface] = useState('posts');
        const [viewMode, setViewMode] = useState('tabs');
        const currentSurface = mockSurfaces.find(s => s.id === activeSurface);
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Stanford CS Study Group" }), _jsx("p", { className: "text-gray-600", children: "Surface navigation patterns" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setViewMode('tabs'), className: `
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === 'tabs' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-gray-600 hover:text-gray-900'}
                  `, children: "Tab View" }), _jsx("button", { onClick: () => setViewMode('sidebar'), className: `
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === 'sidebar' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-gray-600 hover:text-gray-900'}
                  `, children: "Sidebar View" })] })] }) }), viewMode === 'tabs' ? (_jsxs("div", { children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx("div", { className: "flex gap-1 bg-gray-100 p-1 rounded-lg", children: mockSurfaces.map((surface) => (_jsxs("button", { onClick: () => setActiveSurface(surface.id), disabled: surface.disabled, className: `
                        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                        ${surface.disabled
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : activeSurface === surface.id
                                                ? 'bg-[var(--hive-text-primary)] text-[var(--hive-brand-secondary)] shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'}
                      `, children: [_jsx("span", { children: surface.icon }), _jsx("span", { children: surface.name }), surface.count > 0 && (_jsx("span", { className: "text-xs bg-gray-200 px-1.5 py-0.5 rounded-full", children: surface.count }))] }, surface.id))) }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] p-6", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("span", { className: "text-2xl", children: currentSurface?.icon }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: currentSurface?.name }), _jsxs("p", { className: "text-gray-600", children: [currentSurface?.count, " items in this surface"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => (_jsxs(HiveCard, { className: "p-4", children: [_jsxs("h3", { className: "font-medium mb-2", children: [currentSurface?.name, " Item ", i] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Sample content for the ", currentSurface?.name, " surface."] })] }, i))) })] }, activeSurface) }) })] })) : (_jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-64 bg-[var(--hive-text-primary)] border-r", children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Space Surfaces" }), _jsx("div", { className: "space-y-1", children: mockSurfaces.map((surface) => (_jsxs("button", { onClick: () => setActiveSurface(surface.id), disabled: surface.disabled, className: `
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                          ${surface.disabled
                                                    ? 'text-gray-400 cursor-not-allowed'
                                                    : activeSurface === surface.id
                                                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                                        : 'text-gray-600 hover:bg-gray-100'}
                        `, children: [_jsx("span", { children: surface.icon }), _jsx("span", { className: "font-medium", children: surface.name }), surface.count > 0 && (_jsx("span", { className: "text-xs bg-gray-200 px-1.5 py-0.5 rounded-full ml-auto", children: surface.count }))] }, surface.id))) })] }) }), _jsx("div", { className: "flex-1 bg-[var(--hive-text-primary)] p-6", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.2 }, children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("span", { className: "text-2xl", children: currentSurface?.icon }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: currentSurface?.name }), _jsxs("p", { className: "text-gray-600", children: [currentSurface?.count, " items in this surface"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => (_jsxs(HiveCard, { className: "p-4", children: [_jsxs("h3", { className: "font-medium mb-2", children: [currentSurface?.name, " Item ", i] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Sample content for the ", currentSurface?.name, " surface."] })] }, i))) })] }, activeSurface) }) })] }))] }) }));
    },
};
export const BreadcrumbNavigation = {
    render: () => {
        const [currentPath, setCurrentPath] = useState(['spaces', 'cs-study-group', 'posts']);
        const pathMappings = {
            spaces: { name: 'Spaces', icon: '🏠' },
            'cs-study-group': { name: 'Stanford CS Study Group', icon: '💻' },
            posts: { name: 'Posts', icon: '💬' },
            events: { name: 'Events', icon: '📅' },
            members: { name: 'Members', icon: '👥' },
            tools: { name: 'Tools', icon: '🔧' },
            settings: { name: 'Settings', icon: '⚙️' },
        };
        const generateBreadcrumbs = (path) => {
            return path.map((segment, index) => ({
                id: segment,
                name: pathMappings[segment]?.name || segment,
                icon: pathMappings[segment]?.icon,
                href: '/' + path.slice(0, index + 1).join('/'),
                isLast: index === path.length - 1,
            }));
        };
        const navigateTo = (href) => {
            const newPath = href.split('/').filter(Boolean);
            setCurrentPath(newPath);
        };
        const breadcrumbs = generateBreadcrumbs(currentPath);
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Breadcrumb Navigation" }), _jsx("p", { className: "text-gray-600", children: "Navigation hierarchy and deep linking" })] }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Current path: /", currentPath.join('/')] })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsx("div", { className: "flex items-center gap-2 text-sm", children: breadcrumbs.map((crumb, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [index > 0 && (_jsx("span", { className: "text-gray-400", children: "/" })), _jsxs("button", { onClick: () => navigateTo(crumb.href), className: `
                      flex items-center gap-2 px-2 py-1 rounded-md transition-colors
                      ${crumb.isLast
                                            ? 'text-gray-900 font-medium bg-gray-100'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                    `, children: [crumb.icon && _jsx("span", { children: crumb.icon }), _jsx("span", { children: crumb.name })] })] }, crumb.id))) }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Current Location" }), _jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("span", { className: "text-2xl", children: pathMappings[currentPath[currentPath.length - 1]]?.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: pathMappings[currentPath[currentPath.length - 1]]?.name }), _jsx("p", { className: "text-gray-600 text-sm", children: "You are currently viewing this section" })] })] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("div", { children: ["Path: /", currentPath.join('/')] }), _jsxs("div", { children: ["Depth: ", currentPath.length, " levels"] })] })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Quick Navigation" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("button", { onClick: () => navigateTo('/spaces'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83C\uDFE0" }), _jsx("span", { children: "Back to Spaces" })] }), currentPath.length > 1 && (_jsxs("button", { onClick: () => navigateTo('/spaces/cs-study-group'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCBB" }), _jsx("span", { children: "Space Home" })] })), _jsxs("button", { onClick: () => navigateTo('/spaces/cs-study-group/posts'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCAC" }), _jsx("span", { children: "Posts" })] }), _jsxs("button", { onClick: () => navigateTo('/spaces/cs-study-group/events'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCC5" }), _jsx("span", { children: "Events" })] }), _jsxs("button", { onClick: () => navigateTo('/spaces/cs-study-group/members'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDC65" }), _jsx("span", { children: "Members" })] }), _jsxs("button", { onClick: () => navigateTo('/spaces/cs-study-group/settings'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\u2699\uFE0F" }), _jsx("span", { children: "Settings" })] })] })] })] }) })] }) }));
    },
};
export const DeepLinkingBehavior = {
    render: () => {
        const [currentUrl, setCurrentUrl] = useState('/spaces/cs-study-group/posts/post-123');
        const [showShareModal, setShowShareModal] = useState(false);
        const parseUrl = (url) => {
            const parts = url.split('/').filter(Boolean);
            return {
                sections: parts,
                isSpace: parts.length >= 2 && parts[0] === 'spaces',
                spaceId: parts[1],
                surface: parts[2],
                contentId: parts[3],
            };
        };
        const generateShareableLinks = () => {
            const base = 'https://hive.stanford.edu';
            return [
                {
                    name: 'Space Home',
                    url: `${base}/spaces/cs-study-group`,
                    description: 'Link to the space homepage'
                },
                {
                    name: 'Posts Surface',
                    url: `${base}/spaces/cs-study-group/posts`,
                    description: 'Link to the posts surface'
                },
                {
                    name: 'Specific Post',
                    url: `${base}/spaces/cs-study-group/posts/post-123`,
                    description: 'Link to a specific post'
                },
                {
                    name: 'Events Surface',
                    url: `${base}/spaces/cs-study-group/events`,
                    description: 'Link to the events surface'
                },
                {
                    name: 'Members Directory',
                    url: `${base}/spaces/cs-study-group/members`,
                    description: 'Link to the members directory'
                },
            ];
        };
        const urlInfo = parseUrl(currentUrl);
        const shareableLinks = generateShareableLinks();
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Deep Linking & URL Handling" }), _jsx("p", { className: "text-gray-600", children: "Direct links to specific content and surfaces" })] }), _jsx(HiveButton, { onClick: () => setShowShareModal(true), children: "Share Links" })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Current URL:" }), _jsx("code", { className: "px-3 py-1 bg-gray-100 rounded text-sm font-mono", children: currentUrl })] }) }), _jsx("div", { className: "bg-[var(--hive-text-primary)] p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "URL Structure" }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "URL Segments:" }), _jsx("span", { className: "text-sm text-gray-600", children: urlInfo.sections.join(' → ') })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Space ID:" }), _jsx("span", { className: "text-sm text-gray-600", children: urlInfo.spaceId || 'N/A' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Surface:" }), _jsx("span", { className: "text-sm text-gray-600", children: urlInfo.surface || 'N/A' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Content ID:" }), _jsx("span", { className: "text-sm text-gray-600", children: urlInfo.contentId || 'N/A' })] })] }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-medium mb-2", children: "URL Patterns" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "p-2 bg-gray-50 rounded", children: [_jsx("code", { children: "/spaces" }), " - All spaces directory"] }), _jsxs("div", { className: "p-2 bg-gray-50 rounded", children: [_jsx("code", { children: "/spaces/[id]" }), " - Space homepage"] }), _jsxs("div", { className: "p-2 bg-gray-50 rounded", children: [_jsx("code", { children: "/spaces/[id]/[surface]" }), " - Specific surface"] }), _jsxs("div", { className: "p-2 bg-gray-50 rounded", children: [_jsx("code", { children: "/spaces/[id]/[surface]/[content]" }), " - Specific content"] })] })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Navigation Examples" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("button", { onClick: () => setCurrentUrl('/spaces'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83C\uDFE0" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: "Spaces Directory" }), _jsx("div", { className: "text-sm text-gray-600", children: "/spaces" })] })] }), _jsxs("button", { onClick: () => setCurrentUrl('/spaces/cs-study-group'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCBB" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: "Space Home" }), _jsx("div", { className: "text-sm text-gray-600", children: "/spaces/cs-study-group" })] })] }), _jsxs("button", { onClick: () => setCurrentUrl('/spaces/cs-study-group/posts'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCAC" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: "Posts Surface" }), _jsx("div", { className: "text-sm text-gray-600", children: "/spaces/cs-study-group/posts" })] })] }), _jsxs("button", { onClick: () => setCurrentUrl('/spaces/cs-study-group/posts/post-123'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCC4" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: "Specific Post" }), _jsx("div", { className: "text-sm text-gray-600", children: "/spaces/cs-study-group/posts/post-123" })] })] }), _jsxs("button", { onClick: () => setCurrentUrl('/spaces/cs-study-group/events/event-456'), className: "w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCC5" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-medium", children: "Specific Event" }), _jsx("div", { className: "text-sm text-gray-600", children: "/spaces/cs-study-group/events/event-456" })] })] })] })] })] }) }), showShareModal && (_jsx("div", { className: "fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "bg-[var(--hive-text-primary)] rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Shareable Links" }), _jsx("button", { onClick: () => setShowShareModal(false), className: "text-gray-500 hover:text-gray-700", children: "\u00D7" })] }), _jsx("div", { className: "space-y-3", children: shareableLinks.map((link, index) => (_jsxs("div", { className: "p-3 border rounded-lg", children: [_jsx("div", { className: "font-medium text-sm mb-1", children: link.name }), _jsx("div", { className: "text-xs text-gray-600 mb-2", children: link.description }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: link.url, readOnly: true, className: "flex-1 px-2 py-1 bg-gray-50 border rounded text-xs font-mono" }), _jsx("button", { onClick: () => navigator.clipboard.writeText(link.url), className: "px-2 py-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded text-xs", children: "Copy" })] })] }, index))) }), _jsxs("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-1", children: "Deep Linking Features" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Direct links to specific content" }), _jsx("li", { children: "\u2022 Preserve user context and state" }), _jsx("li", { children: "\u2022 SEO-friendly URLs" }), _jsx("li", { children: "\u2022 Social media sharing optimization" })] })] })] }) }))] }) }));
    },
};
export const NavigationWithState = {
    render: () => {
        const [activeSpace, setActiveSpace] = useState('space1');
        const [activeSurface, setActiveSurface] = useState('posts');
        const [viewPreferences, setViewPreferences] = useState({
            sidebarCollapsed: false,
            sortBy: 'recent',
            filterBy: 'all',
        });
        const [navigationHistory, setNavigationHistory] = useState([
            { path: '/spaces', timestamp: new Date(Date.now() - 300000) },
            { path: '/spaces/cs-study-group', timestamp: new Date(Date.now() - 180000) },
            { path: '/spaces/cs-study-group/posts', timestamp: new Date(Date.now() - 60000) },
        ]);
        const handleNavigation = (path) => {
            setNavigationHistory([...navigationHistory, { path, timestamp: new Date() }]);
        };
        const handleSpaceChange = (spaceId) => {
            setActiveSpace(spaceId);
            handleNavigation(`/spaces/${spaceId}`);
        };
        const handleSurfaceChange = (surfaceId) => {
            setActiveSurface(surfaceId);
            handleNavigation(`/spaces/${activeSpace}/${surfaceId}`);
        };
        return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Navigation with State Management" }), _jsx("p", { className: "text-gray-600", children: "Context preservation and user preferences" })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("button", { onClick: () => setViewPreferences({
                                            ...viewPreferences,
                                            sidebarCollapsed: !viewPreferences.sidebarCollapsed
                                        }), className: "p-2 text-gray-600 hover:text-gray-900 transition-colors", children: viewPreferences.sidebarCollapsed ? '→' : '←' }) })] }) }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: `
              transition-all duration-300 bg-[var(--hive-text-primary)] border-r
              ${viewPreferences.sidebarCollapsed ? 'w-16' : 'w-64'}
            `, children: _jsx(NavigationSidebar, { spaces: mockSpaces, activeSpace: activeSpace, activeSurface: activeSurface, onSpaceChange: handleSpaceChange, onSurfaceChange: handleSurfaceChange }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold", children: mockSurfaces.find(s => s.id === activeSurface)?.name }), _jsx("p", { className: "text-gray-600", children: mockSpaces.find(s => s.id === activeSpace)?.name })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("select", { value: viewPreferences.sortBy, onChange: (e) => setViewPreferences({
                                                                ...viewPreferences,
                                                                sortBy: e.target.value
                                                            }), className: "px-3 py-2 border border-gray-300 rounded-md text-sm", children: [_jsx("option", { value: "recent", children: "Most Recent" }), _jsx("option", { value: "popular", children: "Most Popular" }), _jsx("option", { value: "alphabetical", children: "Alphabetical" })] }), _jsxs("select", { value: viewPreferences.filterBy, onChange: (e) => setViewPreferences({
                                                                ...viewPreferences,
                                                                filterBy: e.target.value
                                                            }), className: "px-3 py-2 border border-gray-300 rounded-md text-sm", children: [_jsx("option", { value: "all", children: "All Content" }), _jsx("option", { value: "unread", children: "Unread" }), _jsx("option", { value: "favorites", children: "Favorites" })] })] })] }) }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Current State" }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Active Space:" }), _jsx("span", { className: "text-sm text-gray-600", children: mockSpaces.find(s => s.id === activeSpace)?.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Active Surface:" }), _jsx("span", { className: "text-sm text-gray-600", children: mockSurfaces.find(s => s.id === activeSurface)?.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Sidebar:" }), _jsx("span", { className: "text-sm text-gray-600", children: viewPreferences.sidebarCollapsed ? 'Collapsed' : 'Expanded' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Sort By:" }), _jsx("span", { className: "text-sm text-gray-600", children: viewPreferences.sortBy })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Filter:" }), _jsx("span", { className: "text-sm text-gray-600", children: viewPreferences.filterBy })] })] }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "User Preferences" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: viewPreferences.sidebarCollapsed, onChange: (e) => setViewPreferences({
                                                                                        ...viewPreferences,
                                                                                        sidebarCollapsed: e.target.checked
                                                                                    }), className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm", children: "Collapse sidebar by default" })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", defaultChecked: true, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm", children: "Remember last visited surface" })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", defaultChecked: true, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm", children: "Preserve scroll position" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-3", children: "Navigation History" }), _jsx(HiveCard, { className: "p-4", children: _jsx("div", { className: "space-y-3", children: navigationHistory.slice(-5).reverse().map((item, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-mono", children: item.path }), _jsx("span", { className: "text-xs text-gray-500", children: item.timestamp.toLocaleTimeString() })] }, index))) }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("button", { onClick: () => handleNavigation('/spaces'), className: "w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83C\uDFE0" }), _jsx("span", { className: "text-sm", children: "Back to Spaces" })] }), _jsxs("button", { onClick: () => handleNavigation('/spaces/cs-study-group'), className: "w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDCBB" }), _jsx("span", { className: "text-sm", children: "Space Home" })] }), _jsxs("button", { onClick: () => handleNavigation('/profile'), className: "w-full flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("span", { children: "\uD83D\uDC64" }), _jsx("span", { className: "text-sm", children: "My Profile" })] })] })] })] })] }) })] })] })] }) }));
    },
};
//# sourceMappingURL=navigation.stories.js.map