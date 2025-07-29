import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EnhancedNavigationBar } from '../../components/navigation/enhanced-navigation-bar';
const meta = {
    title: '11-Shell/Enhanced Navigation Bar',
    component: EnhancedNavigationBar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Enhanced Navigation Bar

A sophisticated navigation bar with nested dropdowns, designed for the HIVE platform. Features:

## Key Features
- **Multi-level Dropdowns**: Support for nested navigation with smooth animations
- **Contextual Menus**: Rich descriptions and featured items
- **Global Search**: Integrated command palette trigger
- **User Menu**: Comprehensive account management
- **Builder Tools**: Quick access to HiveLab features
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation support

## Navigation Structure
- **Spaces**: Discover, create, and manage campus spaces
- **HiveLab**: Builder console and tool creation
- **Feed**: Activity streams and trending content  
- **Resources**: Help, community, and guides

## Dropdown Features
- **Featured Items**: Highlighted important actions
- **Descriptions**: Contextual help text
- **Icons**: Visual navigation cues
- **Badges**: Notification counts and status
- **Nested Menus**: Multi-level organization
- **Hover Interactions**: Smooth micro-animations
        `
            }
        }
    },
    argTypes: {
        showGlobalSearch: {
            control: 'boolean',
            description: 'Show the global search input'
        },
        showNotifications: {
            control: 'boolean',
            description: 'Show notification bell'
        },
        unreadNotificationCount: {
            control: 'number',
            description: 'Number of unread notifications'
        }
    }
};
export default meta;
// Mock user data
const mockUser = {
    id: 'user-1',
    name: 'Sarah Chen',
    handle: 'sarahc',
    builderStatus: 'active',
    role: 'student'
};
const mockUserFaculty = {
    id: 'user-2',
    name: 'Dr. Smith',
    handle: 'drsmith',
    builderStatus: 'none',
    role: 'faculty'
};
export const Default = {
    args: {
        user: mockUser,
        showGlobalSearch: true,
        showNotifications: true,
        unreadNotificationCount: 3
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Enhanced Navigation Demo" }), _jsxs("div", { className: "bg-[var(--hive-text-primary)]/5 rounded-xl p-6 space-y-4", children: [_jsx("p", { className: "text-[var(--hive-text-primary)]/80", children: "This enhanced navigation bar features multi-level dropdowns with rich content and smooth animations." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Navigation Features:" }), _jsxs("ul", { className: "text-[var(--hive-text-primary)]/70 space-y-1", children: [_jsx("li", { children: "\u2022 Nested dropdown menus" }), _jsx("li", { children: "\u2022 Featured items highlighting" }), _jsx("li", { children: "\u2022 Contextual descriptions" }), _jsx("li", { children: "\u2022 Smooth hover animations" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Interactions:" }), _jsxs("ul", { className: "text-[var(--hive-text-primary)]/70 space-y-1", children: [_jsx("li", { children: "\u2022 Click main nav items to open dropdowns" }), _jsx("li", { children: "\u2022 Hover over submenu items" }), _jsx("li", { children: "\u2022 Try the global search (Cmd+K)" }), _jsx("li", { children: "\u2022 Explore the user menu" })] })] })] })] })] }) })] }))
};
export const StudentUser = {
    args: {
        user: mockUser,
        showGlobalSearch: true,
        showNotifications: true,
        unreadNotificationCount: 5
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Student Navigation" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/70", children: "Student view with builder access and full navigation" })] }) })] }))
};
export const FacultyUser = {
    args: {
        user: mockUserFaculty,
        showGlobalSearch: true,
        showNotifications: true,
        unreadNotificationCount: 1
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Faculty Navigation" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/70", children: "Faculty view with restricted builder access" })] }) })] }))
};
export const WithManyNotifications = {
    args: {
        user: mockUser,
        showGlobalSearch: true,
        showNotifications: true,
        unreadNotificationCount: 15
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "High Activity" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/70", children: "Navigation with many unread notifications (shows 9+)" })] }) })] }))
};
export const NoSearchNoNotifications = {
    args: {
        user: mockUser,
        showGlobalSearch: false,
        showNotifications: false,
        unreadNotificationCount: 0
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Minimal Navigation" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/70", children: "Simplified navigation without search or notifications" })] }) })] }))
};
export const LoggedOut = {
    args: {
        user: null,
        showGlobalSearch: true,
        showNotifications: false,
        unreadNotificationCount: 0
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Public Navigation" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/70", children: "Navigation for logged-out users" })] }) })] }))
};
export const InteractivePlayground = {
    args: {
        user: mockUser,
        showGlobalSearch: true,
        showNotifications: true,
        unreadNotificationCount: 3
    },
    render: (args) => (_jsxs("div", { className: "min-h-screen bg-gray-900", children: [_jsx(EnhancedNavigationBar, { ...args }), _jsx("div", { className: "pt-16 p-8", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-6", children: "Interactive Navigation Playground" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-[var(--hive-text-primary)]/5 rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Dropdown Features" }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 bg-yellow-400 rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-primary)]/80", children: "Featured items (highlighted in gold)" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 bg-blue-400 rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-primary)]/80", children: "Nested submenu navigation" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 bg-green-400 rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-primary)]/80", children: "Contextual descriptions" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-3 h-3 bg-purple-400 rounded-full" }), _jsx("span", { className: "text-[var(--hive-text-primary)]/80", children: "Smooth hover animations" })] })] })] }), _jsxs("div", { className: "bg-[var(--hive-text-primary)]/5 rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Navigation Structure" }), _jsxs("div", { className: "space-y-2 text-sm text-[var(--hive-text-primary)]/70", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Spaces" }), _jsx("div", { className: "ml-4", children: "\u2192 My Spaces, Discover, Create, Categories" }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "HiveLab" }), _jsx("div", { className: "ml-4", children: "\u2192 Console, Templates, Analytics, Builder Tools" }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Feed" }), _jsx("div", { className: "ml-4", children: "\u2192 Home, Trending, Bookmarks, Discussions" }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Resources" }), _jsx("div", { className: "ml-4", children: "\u2192 Help Center, Community, Campus Guide" })] })] })] }), _jsxs("div", { className: "mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-yellow-400 mb-2", children: "Try These Interactions" }), _jsxs("ul", { className: "text-yellow-200 space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Hover over \"Spaces\" \u2192 \"Categories\" to see the nested submenu" }), _jsx("li", { children: "\u2022 Click \"HiveLab\" to see builder tools and featured items" }), _jsx("li", { children: "\u2022 Try the global search bar or press Cmd+K" }), _jsx("li", { children: "\u2022 Click your user avatar to access account settings" }), _jsx("li", { children: "\u2022 Notice the builder status indicator (\u26A1) for active builders" })] })] })] }) })] }))
};
//# sourceMappingURL=enhanced-navigation-bar.stories.js.map