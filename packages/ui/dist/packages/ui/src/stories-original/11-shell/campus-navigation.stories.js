import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CampusBar, ContextBreadcrumbs, SixSurfacesTabBar, CampusLayoutShell, NavigationProvider } from '../../components/navigation';
import { Home, Users, BookOpen, Calendar, Zap, MessageSquare, Building, Coffee, FlaskConical, User } from 'lucide-react';
const meta = {
    title: '11. Shell/Campus Navigation',
    component: CampusLayoutShell,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# HIVE Campus Navigation

The HIVE Campus Navigation system implements a spatial metaphor where the platform feels like a university campus. This creates intuitive navigation that mirrors real-world spatial understanding.

## Navigation Philosophy

**"Think of HIVE as a Campus"**

- **Feed**: The quad where everyone gathers - social, discovery, general activity
- **Spaces**: Buildings you enter for focused work - organized by purpose/topic  
- **Profile**: Your dorm room - personal space for reflection and management
- **HiveLAB**: The maker space - where tools are built and creativity happens

## Components

### CampusBar
Top navigation with the three main campus areas and HiveLAB builder toggle.

### ContextBreadcrumbs
Spatial awareness - shows where you are in the campus hierarchy.

### SixSurfacesTabBar
Within each Space, navigate between the six surfaces (Posts, Chat, Members, Events, Tools, Pinned).

### CampusLayoutShell
Complete layout wrapper that combines all campus navigation elements.
        `
            }
        }
    },
    argTypes: {
        children: { control: false },
    },
};
export default meta;
// Mock data
const mockUser = {
    id: '1',
    name: 'Jacob Wilson',
    handle: '@jacob',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'Founder',
    status: 'online'
};
const mockNavigationConfig = {
    variant: 'topbar',
    size: 'standard',
    position: 'sticky',
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
};
const mockBreadcrumbs = [
    { id: 'campus', label: 'Campus', icon: Home },
    { id: 'spaces', label: 'Spaces', icon: Building },
    { id: 'design-system', label: 'Design System Space', icon: Zap },
];
const mockSurfaces = [
    { id: 'posts', label: 'Posts', icon: BookOpen, count: 24, isActive: true },
    { id: 'chat', label: 'Chat', icon: MessageSquare, count: 5 },
    { id: 'members', label: 'Members', icon: Users, count: 12 },
    { id: 'events', label: 'Events', icon: Calendar, count: 3 },
    { id: 'tools', label: 'Tools', icon: Zap, count: 8 },
    { id: 'pinned', label: 'Pinned', icon: Coffee, count: 2 },
];
const CampusNavigationWrapper = ({ children, ...props }) => (_jsx(NavigationProvider, { config: mockNavigationConfig, user: mockUser, sections: [], children: _jsx(CampusLayoutShell, { ...props, children: children }) }));
export const CampusOverview = {
    render: (args) => (_jsx(CampusNavigationWrapper, { ...args, children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Campus Navigation Demo" }), _jsx("p", { className: "text-gray-600 mb-4", children: "This demonstrates the HIVE campus metaphor in action. The navigation follows spatial understanding patterns that mirror real university campus navigation." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-xl", children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "\uD83C\uDFDB\uFE0F Campus Areas" }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "Feed" }), " (The Quad) - Social gathering space", _jsx("br", {}), _jsx("strong", { children: "Spaces" }), " (Buildings) - Focused work environments", _jsx("br", {}), _jsx("strong", { children: "Profile" }), " (Dorm Room) - Personal management space"] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-xl", children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "\uD83D\uDD2C HiveLAB" }), _jsx("p", { className: "text-sm text-gray-600", children: "The maker space where tools are built. Toggle shows entry into creator mode with pulsing gold accent when tools are available to build." })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-xl", children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "\uD83D\uDDFA\uFE0F Spatial Awareness" }), _jsx("p", { className: "text-sm text-gray-600", children: "Breadcrumbs show your location in the campus hierarchy. Six Surfaces provide focused navigation within each Space." })] })] })] }) }), _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h3", { className: "font-medium mb-4", children: "Navigation State" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { children: ["Current Area: ", _jsx("span", { className: "font-medium", children: "Spaces" })] }), _jsxs("div", { children: ["Location: ", _jsx("span", { className: "font-medium", children: "Design System Space" })] }), _jsxs("div", { children: ["Surface: ", _jsx("span", { className: "font-medium", children: "Posts" })] }), _jsxs("div", { children: ["HiveLAB: ", _jsx("span", { className: "font-medium", children: "Available" })] })] })] }) })] }) }) })),
    args: {
        breadcrumbs: mockBreadcrumbs,
        surfaces: mockSurfaces,
    },
};
export const CampusBarOnly = {
    render: () => (_jsx(NavigationProvider, { config: mockNavigationConfig, user: mockUser, sections: [], children: _jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(CampusBar, {}), _jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Campus Bar Component" }), _jsx("p", { className: "text-gray-600 mb-6", children: "The main navigation bar that provides access to the three core campus areas and the HiveLAB builder toggle." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl", children: [_jsx(Coffee, { className: "w-8 h-8 mx-auto mb-2 text-amber-600" }), _jsx("h3", { className: "font-medium", children: "Feed" }), _jsx("p", { className: "text-sm text-gray-600", children: "The campus quad" })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl", children: [_jsx(Building, { className: "w-8 h-8 mx-auto mb-2 text-blue-600" }), _jsx("h3", { className: "font-medium", children: "Spaces" }), _jsx("p", { className: "text-sm text-gray-600", children: "Academic buildings" })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl", children: [_jsx(User, { className: "w-8 h-8 mx-auto mb-2 text-green-600" }), _jsx("h3", { className: "font-medium", children: "Profile" }), _jsx("p", { className: "text-sm text-gray-600", children: "Your dorm room" })] })] }), _jsxs("div", { className: "mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(FlaskConical, { className: "w-5 h-5 mr-2 text-yellow-600" }), _jsx("h4", { className: "font-medium", children: "HiveLAB Maker Space" })] }), _jsx("p", { className: "text-sm text-yellow-700 mt-1", children: "The builder toggle with pulsing indicator shows when tools are available to create." })] })] }) })] }) })),
};
export const SixSurfacesDemo = {
    render: () => (_jsx("div", { className: "p-8 bg-gray-50 min-h-screen", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Six Surfaces Navigation" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Within each Space, navigate between the six core surfaces that organize all content and functionality." }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx(SixSurfacesTabBar, { surfaces: mockSurfaces, onSurfaceChange: (surfaceId) => console.log('Surface changed to:', surfaceId) }), _jsx("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-3 gap-4", children: mockSurfaces.map((surface) => {
                                const Icon = surface.icon;
                                return (_jsxs("div", { className: "p-4 bg-gray-50 rounded-xl", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Icon, { className: "w-5 h-5 mr-2" }), _jsx("h3", { className: "font-medium", children: surface.label })] }), _jsx("p", { className: "text-sm text-gray-600", children: surface.count ? `${surface.count} items` : 'No items' })] }, surface.id));
                            }) })] })] }) })),
};
export const BreadcrumbsDemo = {
    render: () => (_jsx("div", { className: "p-8 bg-gray-50 min-h-screen", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Context Breadcrumbs" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Spatial awareness navigation that shows your current location in the campus hierarchy." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h3", { className: "font-medium mb-4", children: "Campus Level" }), _jsx(ContextBreadcrumbs, { items: [
                                        { id: 'campus', label: 'Campus', icon: Home }
                                    ] })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h3", { className: "font-medium mb-4", children: "Area Level" }), _jsx(ContextBreadcrumbs, { items: [
                                        { id: 'campus', label: 'Campus', icon: Home },
                                        { id: 'spaces', label: 'Spaces', icon: Building }
                                    ] })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h3", { className: "font-medium mb-4", children: "Space Level" }), _jsx(ContextBreadcrumbs, { items: mockBreadcrumbs })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)] rounded-2xl border border-gray-200 p-6", children: [_jsx("h3", { className: "font-medium mb-4", children: "Deep Navigation" }), _jsx(ContextBreadcrumbs, { items: [
                                        { id: 'campus', label: 'Campus', icon: Home },
                                        { id: 'spaces', label: 'Spaces', icon: Building },
                                        { id: 'design-system', label: 'Design System Space', icon: Zap },
                                        { id: 'posts', label: 'Posts', icon: BookOpen },
                                        { id: 'post-123', label: 'Component Guidelines' }
                                    ] })] })] })] }) })),
};
//# sourceMappingURL=campus-navigation.stories.js.map