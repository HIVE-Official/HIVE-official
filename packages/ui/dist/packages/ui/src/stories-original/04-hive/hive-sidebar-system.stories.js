import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveSidebar } from '../../components';
const meta = {
    title: '04-Hive/Sidebar System',
    component: HiveSidebar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'HIVE Sidebar System - Advanced navigation sidebar with collapsible sections, search, and premium styling.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'premium', 'minimal'],
            description: 'Sidebar visual style',
        },
        position: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Sidebar position',
        },
        collapsible: {
            control: 'boolean',
            description: 'Enable collapse/expand',
        },
        defaultExpanded: {
            control: 'boolean',
            description: 'Default expanded state',
        },
        showSearch: {
            control: 'boolean',
            description: 'Show search functionality',
        },
    },
    tags: ['autodocs'],
};
export default meta;
const mockNavItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        href: '/dashboard',
        badge: '3',
    },
    {
        id: 'spaces',
        label: 'My Spaces',
        icon: '🏗️',
        children: [
            { id: 'cs-hub', label: 'Computer Science Hub', href: '/spaces/cs-hub', active: true },
            { id: 'design-studio', label: 'Design Studio', href: '/spaces/design-studio' },
            { id: 'research-lab', label: 'Research Lab', href: '/spaces/research-lab' },
        ],
    },
    {
        id: 'discover',
        label: 'Discover',
        icon: '🔍',
        href: '/discover',
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: '🔔',
        href: '/notifications',
        badge: '12',
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: '📈',
        href: '/analytics',
        premium: true,
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: '⚙️',
        children: [
            { id: 'profile', label: 'Profile', href: '/settings/profile' },
            { id: 'privacy', label: 'Privacy', href: '/settings/privacy' },
            { id: 'notifications-settings', label: 'Notifications', href: '/settings/notifications' },
            { id: 'billing', label: 'Billing', href: '/settings/billing', premium: true },
        ],
    },
];
const SidebarWrapper = ({ children, ...props }) => {
    const [isExpanded, setIsExpanded] = useState(props.defaultExpanded ?? true);
    return (_jsxs("div", { className: "flex h-screen bg-gray-900", children: [_jsx(HiveSidebar, { ...props, isExpanded: isExpanded, onToggle: () => setIsExpanded(!isExpanded), navItems: mockNavItems }), _jsx("div", { className: "flex-1 p-8 overflow-auto", children: _jsxs("div", { className: "max-w-4xl", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Main Content Area" }), _jsx("p", { className: "text-gray-400 mb-6", children: "This is the main content area. The sidebar navigation adapts to different states and provides smooth transitions between expanded and collapsed modes." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Content Section 1" }), _jsx("p", { className: "text-gray-400", children: "Sample content to demonstrate the layout behavior." })] }), _jsxs("div", { className: "p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Content Section 2" }), _jsx("p", { className: "text-gray-400", children: "More content to show responsive behavior." })] })] })] }) })] }));
};
export const Default = {
    render: (args) => _jsx(SidebarWrapper, { ...args }),
    args: {
        variant: 'default',
        position: 'left',
        collapsible: true,
        defaultExpanded: true,
        showSearch: true,
    },
};
export const Premium = {
    render: (args) => _jsx(SidebarWrapper, { ...args }),
    args: {
        variant: 'premium',
        position: 'left',
        collapsible: true,
        defaultExpanded: true,
        showSearch: true,
        showUserProfile: true,
        showQuickActions: true,
    },
};
export const Minimal = {
    render: (args) => _jsx(SidebarWrapper, { ...args }),
    args: {
        variant: 'minimal',
        position: 'left',
        collapsible: true,
        defaultExpanded: false,
        showSearch: false,
    },
};
export const RightSidebar = {
    render: (args) => _jsx(SidebarWrapper, { ...args }),
    args: {
        variant: 'default',
        position: 'right',
        collapsible: true,
        defaultExpanded: true,
        showSearch: true,
    },
};
export const CollapsedByDefault = {
    render: (args) => _jsx(SidebarWrapper, { ...args }),
    args: {
        variant: 'default',
        position: 'left',
        collapsible: true,
        defaultExpanded: false,
        showSearch: true,
    },
};
export const InteractiveDemo = {
    render: () => {
        const [variant, setVariant] = useState('default');
        const [position, setPosition] = useState('left');
        const [isExpanded, setIsExpanded] = useState(true);
        const [features, setFeatures] = useState({
            showSearch: true,
            showUserProfile: true,
            showQuickActions: false,
        });
        return (_jsxs("div", { className: "h-screen bg-gray-900", children: [_jsx("div", { className: "absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm rounded-lg p-4 border border-white/10", children: _jsxs("div", { className: "flex items-center space-x-4 text-sm", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx("span", { className: "text-gray-400", children: "Variant:" }), ['default', 'premium', 'minimal'].map((v) => (_jsx("button", { onClick: () => setVariant(v), className: `px-2 py-1 rounded text-xs ${variant === v ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: v }, v)))] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("span", { className: "text-gray-400", children: "Position:" }), ['left', 'right'].map((p) => (_jsx("button", { onClick: () => setPosition(p), className: `px-2 py-1 rounded text-xs ${position === p ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: p }, p)))] }), _jsx("button", { onClick: () => setIsExpanded(!isExpanded), className: "px-2 py-1 rounded text-xs bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/20", children: isExpanded ? 'Collapse' : 'Expand' })] }) }), _jsxs("div", { className: "flex h-full", children: [position === 'left' && (_jsx(HiveSidebar, { variant: variant, position: position, isExpanded: isExpanded, onToggle: () => setIsExpanded(!isExpanded), navItems: mockNavItems, collapsible: true, ...features })), _jsx("div", { className: "flex-1 p-8 overflow-auto", children: _jsxs("div", { className: "max-w-4xl", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Interactive Sidebar Demo" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Use the controls above to test different sidebar configurations. The sidebar adapts smoothly to different variants and states." }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.entries(features).map(([key, value]) => (_jsxs("label", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] capitalize", children: key.replace(/([A-Z])/g, ' $1') }), _jsx("input", { type: "checkbox", checked: value, onChange: (e) => setFeatures({ ...features, [key]: e.target.checked }), className: "text-yellow-500" })] }, key))) }), _jsxs("div", { className: "p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Navigation Features" }), _jsxs("ul", { className: "space-y-2 text-gray-400", children: [_jsx("li", { children: "\u2022 Collapsible sections with smooth animations" }), _jsx("li", { children: "\u2022 Search functionality for quick navigation" }), _jsx("li", { children: "\u2022 Badge indicators for notifications and counts" }), _jsx("li", { children: "\u2022 Premium item highlighting" }), _jsx("li", { children: "\u2022 Active state management" }), _jsx("li", { children: "\u2022 Responsive design for different screen sizes" })] })] })] })] }) }), position === 'right' && (_jsx(HiveSidebar, { variant: variant, position: position, isExpanded: isExpanded, onToggle: () => setIsExpanded(!isExpanded), navItems: mockNavItems, collapsible: true, ...features }))] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Fully interactive sidebar demo. Test different variants, positions, and features using the controls.',
            },
        },
    },
};
//# sourceMappingURL=hive-sidebar-system.stories.js.map