import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveProvider, useResponsive, ResponsiveShow, ResponsiveContainer, ResponsiveGrid, MobileBottomTabs } from '../../components/responsive';
import { HiveCard } from '../../components/hive-card';
import { HiveButton } from '../../components/hive-button';
import { Home, Users, User, Sparkles, Smartphone, Tablet, Monitor, Tv, Grid3X3, Layout, Eye } from 'lucide-react';
const meta = {
    title: '11-Shell/Responsive Breakpoints',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# HIVE Responsive Breakpoint Strategy

Mobile-first responsive system designed for social consumption and campus device usage patterns.

## Breakpoint Strategy
- **Mobile (320-768px)**: Bottom tab navigation, single column, compact cards
- **Tablet (768-1024px)**: Hybrid sidebar, 2-column grid, touch-optimized
- **Desktop (1024-1440px)**: Full sidebar, 3-column grid, productivity focus
- **Wide (1440px+)**: Multi-column layouts, advanced features

## Social-First Design Decisions
- **Mobile priority**: Most campus usage happens on phones
- **Bottom tabs**: Feed | Spaces | Profile | Lab for quick access
- **Feed optimization**: Layouts prioritize social consumption
- **Progressive enhancement**: Features unlock as screen size increases
        `
            }
        }
    }
};
export default meta;
// ============================================================================
// DEMO COMPONENTS
// ============================================================================
function DeviceIndicator() {
    const { deviceType, layoutMode, windowSize, layoutConfig } = useResponsive();
    const deviceIcons = {
        mobile: Smartphone,
        tablet: Tablet,
        desktop: Monitor,
        wide: Tv
    };
    const deviceColors = {
        mobile: 'text-green-600 bg-green-100',
        tablet: 'text-blue-600 bg-blue-100',
        desktop: 'text-purple-600 bg-purple-100',
        wide: 'text-gold-600 bg-gold-100'
    };
    const DeviceIcon = deviceIcons[deviceType];
    return (_jsx(HiveCard, { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-lg ${deviceColors[deviceType]}`, children: _jsx(DeviceIcon, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsxs("h3", { className: "font-semibold capitalize", children: [deviceType, " Layout"] }), _jsx("p", { className: "text-sm text-gray-600", children: layoutMode.replace('-', ' ') })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-medium", children: [windowSize.width, " \u00D7 ", windowSize.height] }), _jsxs("div", { className: "text-xs text-gray-600", children: [layoutConfig.content.columns, " columns \u2022 ", layoutConfig.feed.itemsPerPage, " feed items"] })] })] }) }));
}
function NavigationDemo() {
    const { layoutConfig, isMobile } = useResponsive();
    const navigationConfig = layoutConfig.navigation;
    const mockTabs = [
        { id: 'feed', label: 'Feed', icon: Home, href: '/feed', isActive: true },
        { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: 3 },
        { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
        { id: 'lab', label: 'Lab', icon: Sparkles, href: '/lab', badge: 1 }
    ];
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Layout, { className: "w-5 h-5" }), "Navigation Layout"] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Variant:" }), " ", navigationConfig.variant] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Sidebar:" }), " ", navigationConfig.showSidebar ? '✅' : '❌'] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Bottom Tabs:" }), " ", navigationConfig.showBottomTabs ? '✅' : '❌'] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Collapsible:" }), " ", navigationConfig.sidebarCollapsible ? '✅' : '❌'] })] }), isMobile && (_jsxs("div", { className: "mt-4", children: [_jsx("h4", { className: "font-medium mb-2", children: "Mobile Bottom Tabs Preview" }), _jsx("div", { className: "bg-gray-100 rounded-lg p-4", children: _jsx("div", { className: "flex justify-around", children: mockTabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (_jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsxs("div", { className: "relative mb-1", children: [_jsx(Icon, { className: `w-5 h-5 ${tab.isActive ? 'text-blue-600' : 'text-gray-500'}` }), tab.badge && (_jsx("div", { className: "absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center", children: tab.badge }))] }), _jsx("span", { className: `text-xs ${tab.isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`, children: tab.label })] }, tab.id));
                                }) }) })] }))] }) }));
}
function LayoutConfigDemo() {
    const { layoutConfig, deviceType } = useResponsive();
    const configSections = [
        {
            title: 'Content Layout',
            config: layoutConfig.content,
            icon: Grid3X3
        },
        {
            title: 'Feed Settings',
            config: layoutConfig.feed,
            icon: Home
        },
        {
            title: 'Bento Grid',
            config: layoutConfig.bentoGrid,
            icon: Layout
        },
        {
            title: 'Space Layout',
            config: layoutConfig.spaceLayout,
            icon: Users
        }
    ];
    return (_jsx("div", { className: "grid gap-4", children: configSections.map((section) => {
            const Icon = section.icon;
            return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(Icon, { className: "w-4 h-4" }), section.title] }), _jsx("div", { className: "space-y-2 text-sm", children: Object.entries(section.config).map(([key, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-gray-600 capitalize", children: [key.replace(/([A-Z])/g, ' $1'), ":"] }), _jsx("span", { className: "font-medium", children: typeof value === 'boolean' ? (value ? '✅' : '❌') : String(value) })] }, key))) })] }) }, section.title));
        }) }));
}
function ResponsiveShowDemo() {
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Eye, { className: "w-5 h-5" }), "Responsive Visibility"] }), _jsxs("div", { className: "space-y-3", children: [_jsx(ResponsiveShow, { on: ['mobile'], children: _jsx("div", { className: "p-3 bg-green-100 text-green-800 rounded-lg", children: "\uD83D\uDCF1 This content only shows on mobile devices" }) }), _jsx(ResponsiveShow, { on: ['tablet'], children: _jsx("div", { className: "p-3 bg-blue-100 text-blue-800 rounded-lg", children: "\uD83D\uDCF1 This content only shows on tablet devices" }) }), _jsx(ResponsiveShow, { on: ['desktop', 'wide'], children: _jsx("div", { className: "p-3 bg-purple-100 text-purple-800 rounded-lg", children: "\uD83D\uDDA5\uFE0F This content shows on desktop and wide screens" }) }), _jsx(ResponsiveShow, { above: "tablet", children: _jsx("div", { className: "p-3 bg-orange-100 text-orange-800 rounded-lg", children: "\u2B06\uFE0F This content shows on tablet and above" }) }), _jsx(ResponsiveShow, { below: "desktop", children: _jsx("div", { className: "p-3 bg-pink-100 text-pink-800 rounded-lg", children: "\u2B07\uFE0F This content shows on tablet and below" }) })] })] }) }));
}
function ResponsiveGridDemo() {
    const gridItems = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
        description: 'This card adapts to the responsive grid system'
    }));
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Responsive Grid System" }), _jsx(ResponsiveGrid, { children: gridItems.map((item) => (_jsx(HiveCard, { className: "h-32", children: _jsxs("div", { className: "h-full flex flex-col justify-center items-center text-center", children: [_jsx("h4", { className: "font-medium", children: item.title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: item.description })] }) }, item.id))) })] }));
}
function BreakpointTestControls() {
    const { windowSize } = useResponsive();
    const breakpoints = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1024, height: 768 },
        { name: 'Wide', width: 1440, height: 900 }
    ];
    const resizeWindow = (width, height) => {
        // This is just for demo - in real usage, window resizing would be handled by browser
        console.log(`Simulating resize to ${width}x${height}`);
    };
    return (_jsx(HiveCard, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-semibold", children: "Breakpoint Testing" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Current window: ", windowSize.width, " \u00D7 ", windowSize.height, "px"] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: breakpoints.map((bp) => (_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: () => resizeWindow(bp.width, bp.height), children: [bp.name, " (", bp.width, "px)"] }, bp.name))) }), _jsx("p", { className: "text-xs text-gray-500", children: "Note: In real usage, resize your browser window to test breakpoints" })] }) }));
}
// ============================================================================
// MAIN DEMO COMPONENT
// ============================================================================
function ResponsiveBreakpointsDemo() {
    return (_jsx(ResponsiveContainer, { children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold", children: "HIVE Responsive System" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Mobile-first responsive breakpoint strategy optimized for social consumption and campus device usage patterns." })] }), _jsx(DeviceIndicator, {}), _jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [_jsx(NavigationDemo, {}), _jsx(ResponsiveShowDemo, {})] }), _jsx(ResponsiveGrid, { customColumns: { mobile: 1, tablet: 2, desktop: 3, wide: 4 }, children: _jsx(LayoutConfigDemo, {}) }), _jsx(ResponsiveGridDemo, {}), _jsx(BreakpointTestControls, {}), _jsxs("div", { className: "bg-blue-50 p-6 rounded-2xl border border-blue-200", children: [_jsx("h3", { className: "text-lg font-semibold text-blue-900 mb-3", children: "Mobile-First Strategy" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4 text-sm text-blue-800", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Design Principles" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Social consumption prioritized" }), _jsx("li", { children: "\u2022 Bottom tabs for thumb navigation" }), _jsx("li", { children: "\u2022 Feed-centric layouts" }), _jsx("li", { children: "\u2022 Progressive feature enhancement" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Breakpoint Strategy" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: "\u2022 Mobile: 320-768px (primary experience)" }), _jsx("li", { children: "\u2022 Tablet: 768-1024px (hybrid layouts)" }), _jsx("li", { children: "\u2022 Desktop: 1024-1440px (productivity focus)" }), _jsx("li", { children: "\u2022 Wide: 1440px+ (advanced features)" })] })] })] })] })] }) }));
}
export const Default = {
    render: () => (_jsx(ResponsiveProvider, { children: _jsx(ResponsiveBreakpointsDemo, {}) }))
};
export const MobileFirst = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: () => (_jsxs(ResponsiveProvider, { children: [_jsx(ResponsiveBreakpointsDemo, {}), _jsx(MobileBottomTabs, { tabs: [
                    { id: 'feed', label: 'Feed', icon: Home, href: '/feed', isActive: true },
                    { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: 3 },
                    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
                    { id: 'lab', label: 'Lab', icon: Sparkles, href: '/lab', badge: 1 }
                ], onTabClick: (tabId) => console.log(`Tab clicked: ${tabId}`) })] }))
};
export const TabletHybrid = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    },
    render: () => (_jsx(ResponsiveProvider, { children: _jsx(ResponsiveBreakpointsDemo, {}) }))
};
export const DesktopFull = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop'
        }
    },
    render: () => (_jsx(ResponsiveProvider, { children: _jsx(ResponsiveBreakpointsDemo, {}) }))
};
//# sourceMappingURL=responsive-breakpoints.stories.js.map