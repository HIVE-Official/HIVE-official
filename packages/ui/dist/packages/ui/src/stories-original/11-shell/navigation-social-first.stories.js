import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveNavigationShell, createHiveNavigationSections, mobileBottomTabs } from '../../components/navigation';
import { useState } from 'react';
import { Users, MessageCircle, Star, TrendingUp } from 'lucide-react';
const meta = {
    title: '11-Shell/Navigation Social-First',
    component: HiveNavigationShell,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Social-First Navigation System

HIVE's navigation system is designed for **social consumption first** with utility depth when needed.

## Key Principles
- **Feed as gravity well** - users always return to the social stream
- **Short URLs for sharing** - optimized for GroupMe/Discord (/s/cs-majors)
- **Social proof everywhere** - member counts, friend activity, FOMO
- **Mobile bottom tabs** - Feed | Spaces | Profile | Lab

## URL Structure
- \`/feed\` - Social consumption home base
- \`/s/[space-id]\` - Short space URLs (/s/cs-majors)
- \`/u/[handle]\` - User profiles (/u/sarah)
- \`/lab\` - Builder empowerment console

## Navigation Mental Model
**Feed-based with space depth** - Like Instagram but with meaningful utility.
        `
            }
        }
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['sidebar', 'topbar', 'minimal'],
            description: 'Navigation layout variant'
        },
        size: {
            control: 'radio',
            options: ['compact', 'standard', 'expanded'],
            description: 'Navigation size'
        }
    }
};
export default meta;
// Mock user data
const mockUser = {
    id: 'user-sarah-chen',
    name: 'Sarah Chen',
    handle: 'sarah.chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1e5640a?w=400&h=400&fit=crop&crop=face',
    role: 'CS Senior',
    status: 'online'
};
// Feed-centric navigation sections with social proof
const socialNavigationSections = createHiveNavigationSections(mockUser);
// Demo content component
function NavigationDemoContent({ currentRoute }) {
    const getRouteDescription = (route) => {
        if (route === '/feed')
            return 'Social consumption home base - campus pulse and activity';
        if (route.startsWith('/s/'))
            return `Space: ${route.split('/')[2]} - community hub with tools and members`;
        if (route.startsWith('/u/'))
            return `Profile: ${route.split('/')[2]} - personal command center`;
        if (route === '/lab')
            return 'HiveLAB - builder empowerment console';
        if (route === '/spaces')
            return 'Space discovery with social proof and FOMO';
        return `Route: ${route}`;
    };
    return (_jsxs("div", { className: "p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "HIVE Navigation Demo" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Social-first campus platform with feed-centric navigation" })] }), _jsxs("div", { className: "bg-blue-50 p-6 rounded-2xl border border-blue-200", children: [_jsxs("h2", { className: "text-xl font-semibold text-blue-900 mb-3", children: ["Current Route: ", _jsx("code", { className: "bg-blue-100 px-2 py-1 rounded text-sm", children: currentRoute })] }), _jsx("p", { className: "text-blue-800", children: getRouteDescription(currentRoute) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "URL Strategy" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Feed:" }), " ", _jsx("code", { children: "/feed" }), " - Social gravity well"] }), _jsxs("div", { children: [_jsx("strong", { children: "Spaces:" }), " ", _jsx("code", { children: "/s/cs-majors" }), " - Short for sharing"] }), _jsxs("div", { children: [_jsx("strong", { children: "Users:" }), " ", _jsx("code", { children: "/u/sarah" }), " - Clean profiles"] }), _jsxs("div", { children: [_jsx("strong", { children: "Tools:" }), " ", _jsx("code", { children: "/t/gpa-calc" }), " - Shareable tools"] }), _jsxs("div", { children: [_jsx("strong", { children: "Lab:" }), " ", _jsx("code", { children: "/lab" }), " - Builder console"] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Social Features" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-green-600" }), _jsx("span", { children: "Member counts for social proof" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageCircle, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { children: "Activity indicators and badges" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-600" }), _jsx("span", { children: "Friend connections visible" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-purple-600" }), _jsx("span", { children: "Trending spaces and content" })] })] })] })] }), _jsxs("div", { className: "bg-yellow-50 p-6 rounded-2xl border border-yellow-200", children: [_jsx("h3", { className: "text-lg font-semibold text-yellow-900 mb-3", children: "Mobile Bottom Tabs" }), _jsx("div", { className: "grid grid-cols-4 gap-4", children: mobileBottomTabs.map((tab) => (_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto", children: _jsx(tab.icon, { className: "w-5 h-5 text-yellow-700" }) }), _jsx("div", { className: "text-sm font-medium text-yellow-800", children: tab.label }), tab.badge && (_jsx("div", { className: "text-xs bg-red-500 text-[var(--hive-text-primary)] rounded-full w-5 h-5 flex items-center justify-center mx-auto", children: tab.badge }))] }, tab.id))) })] })] }));
}
export const SocialFirstDesktop = {
    args: {
        variant: 'sidebar',
        size: 'standard',
        user: mockUser,
        sections: socialNavigationSections,
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        collapsible: true,
        keyboardShortcuts: true
    },
    render: (args) => {
        const [currentRoute, setCurrentRoute] = useState('/feed');
        return (_jsx(HiveNavigationShell, { ...args, onNavigate: (item) => {
                if (item.href) {
                    setCurrentRoute(item.href);
                }
            }, children: _jsx(NavigationDemoContent, { currentRoute: currentRoute }) }));
    }
};
export const MobileFeedFirst = {
    args: {
        variant: 'topbar',
        size: 'compact',
        user: mockUser,
        sections: socialNavigationSections,
        showSearch: false,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        mobileBreakpoint: 768
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: (args) => {
        const [currentRoute, setCurrentRoute] = useState('/feed');
        return (_jsx(HiveNavigationShell, { ...args, onNavigate: (item) => {
                if (item.href) {
                    setCurrentRoute(item.href);
                }
            }, children: _jsx(NavigationDemoContent, { currentRoute: currentRoute }) }));
    }
};
export const SpaceDiscoveryWithSocialProof = {
    args: {
        variant: 'sidebar',
        size: 'expanded',
        user: mockUser,
        sections: socialNavigationSections,
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true,
        collapsible: false
    },
    render: (args) => {
        const [currentRoute, setCurrentRoute] = useState('/spaces');
        return (_jsx(HiveNavigationShell, { ...args, onNavigate: (item) => {
                if (item.href) {
                    setCurrentRoute(item.href);
                }
            }, children: _jsxs("div", { className: "p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Space Discovery" }), _jsx("p", { className: "text-lg text-gray-600", children: "Social proof drives engagement and FOMO" })] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "bg-green-50 p-4 rounded-xl border border-green-200", children: [_jsx("h3", { className: "font-semibold text-green-900", children: "CS Majors" }), _jsx("p", { className: "text-green-800 text-sm", children: "127 members \u2022 Your friends: Mike, Alex, Emma" }), _jsx("div", { className: "text-xs text-green-700 mt-1", children: "\uD83D\uDD25 Most active space this week" })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-xl border border-blue-200", children: [_jsx("h3", { className: "font-semibold text-blue-900", children: "West Campus" }), _jsx("p", { className: "text-blue-800 text-sm", children: "234 residents \u2022 12 new members this week" }), _jsx("div", { className: "text-xs text-blue-700 mt-1", children: "\uD83D\uDCCD Your dorm community" })] }), _jsxs("div", { className: "bg-purple-50 p-4 rounded-xl border border-purple-200", children: [_jsx("h3", { className: "font-semibold text-purple-900", children: "Events Board" }), _jsx("p", { className: "text-purple-800 text-sm", children: "1,247 members \u2022 15 events this week" }), _jsx("div", { className: "text-xs text-purple-700 mt-1", children: "\uD83C\uDF89 Campus-wide announcements" })] })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-xl", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Social Proof Strategy" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-700", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Member counts" }), " visible on all spaces"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Friend connections" }), " shown prominently"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Activity indicators" }), " (most active, trending)"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "FOMO messaging" }), " (\"127 CS majors are already here\")"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Growth signals" }), " (\"12 new members this week\")"] })] })] })] }) }));
    }
};
export const ProfileCommandCenter = {
    args: {
        variant: 'minimal',
        size: 'compact',
        user: mockUser,
        sections: socialNavigationSections,
        showSearch: true,
        showNotifications: true,
        showUserMenu: true,
        showBranding: true
    },
    render: (args) => {
        const [currentRoute, setCurrentRoute] = useState('/profile');
        return (_jsx(HiveNavigationShell, { ...args, onNavigate: (item) => {
                if (item.href) {
                    setCurrentRoute(item.href);
                }
            }, children: _jsxs("div", { className: "p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Profile Command Center" }), _jsx("p", { className: "text-lg text-gray-600", children: "Personal utilities with privacy controls" })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-xl", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Privacy Strategy" }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)] rounded-lg", children: [_jsx("span", { children: "Profile visibility" }), _jsx("span", { className: "text-yellow-600 font-medium", children: "Private (vBETA)" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)] rounded-lg", children: [_jsx("span", { children: "Tool sharing" }), _jsx("span", { className: "text-green-600 font-medium", children: "Selective" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)] rounded-lg", children: [_jsx("span", { children: "Ghost mode" }), _jsx("span", { className: "text-red-600 font-medium", children: "Available" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)] rounded-lg", children: [_jsx("span", { children: "Social features" }), _jsx("span", { className: "text-blue-600 font-medium", children: "Unlock in V1" })] })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-xl", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "Personal Tools" }), _jsx("p", { className: "text-sm text-blue-700", children: "GPA Calculator, Schedule Builder, Citation Manager" })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded-xl", children: [_jsx("h4", { className: "font-medium text-green-900 mb-2", children: "Activity Tracking" }), _jsx("p", { className: "text-sm text-green-700", children: "Private by default, selective sharing" })] })] })] }) }));
    }
};
//# sourceMappingURL=navigation-social-first.stories.js.map