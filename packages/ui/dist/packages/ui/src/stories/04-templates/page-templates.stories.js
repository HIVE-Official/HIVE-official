import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
const meta = {
    title: '04-Templates/Page Templates',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Page Templates

Complete page layout templates that demonstrate how HIVE components work together to create cohesive user experiences.

## Template Types

### Base Templates
- **Page Layout**: Foundation layout with header, navigation, content, and footer
- **Profile Page**: Complete profile page with dashboard and customization options
- **Dashboard Page**: Platform dashboard with widgets and tools

### Design Principles

- **Consistent Structure**: Predictable layout patterns across all pages
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Accessibility First**: Keyboard navigation and screen reader support
- **Performance Optimized**: Efficient loading and rendering
- **Brand Consistency**: HIVE design system throughout
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const PageLayoutDemo = {
    render: () => {
        const [activeSection, setActiveSection] = useState('dashboard');
        const navigationItems = [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'spaces', label: 'Spaces' },
            { id: 'tools', label: 'Tools' },
            { id: 'profile', label: 'Profile' },
        ];
        return (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Desktop Page Layout Template" }), _jsxs("div", { className: "border rounded-lg overflow-hidden", style: { height: '600px' }, children: [_jsx("div", { className: "bg-[var(--hive-surface-primary)] border-b p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-primary)] rounded-full" }), _jsx("span", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: "HIVE Platform" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex items-center bg-[var(--hive-background-primary)] rounded-lg px-3 py-2 min-w-[200px]", children: _jsx("input", { type: "text", placeholder: "Search...", className: "flex-1 bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] focus:outline-none" }) }), _jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full" })] })] }) }), _jsxs("div", { className: "flex h-full", children: [_jsx("div", { className: "w-64 bg-[var(--hive-surface-primary)] border-r", children: _jsx("div", { className: "p-4", children: _jsx("div", { className: "space-y-2", children: navigationItems.map((item) => (_jsx("button", { onClick: () => setActiveSection(item.id), className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === item.id
                                                        ? 'bg-[var(--hive-brand-primary)] text-white'
                                                        : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]'}`, children: _jsx("span", { className: "font-medium", children: item.label }) }, item.id))) }) }) }), _jsxs("div", { className: "flex-1 p-6 bg-[var(--hive-background-secondary)]", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: navigationItems.find(item => item.id === activeSection)?.label }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Welcome to the ", activeSection, " section of HIVE Platform"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Quick Stats" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Active Items" }), _jsx("span", { className: "font-semibold text-[var(--hive-brand-primary)]", children: "8" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Total Created" }), _jsx("span", { className: "font-semibold text-[var(--hive-brand-secondary)]", children: "3" })] })] })] }), _jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "text-[var(--hive-text-primary)]", children: "Recent Action" }), _jsx("div", { className: "text-[var(--hive-text-secondary)]", children: "2 hours ago" })] }) })] }), _jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsx(HiveButton, { variant: "primary", size: "sm", fullWidth: true, children: "Primary Action" }), _jsx(HiveButton, { variant: "ghost", size: "sm", fullWidth: true, children: "Secondary Action" })] })] })] })] })] })] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Complete page layout template with header, navigation, content area demonstration.',
            },
        },
    },
};
export const ProfilePageDemo = {
    render: () => {
        const [viewMode, setViewMode] = useState('grid');
        return (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Profile Page Template" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: viewMode === 'grid' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('grid'), children: "Grid" }), _jsx(HiveButton, { variant: viewMode === 'list' ? 'primary' : 'ghost', size: "sm", onClick: () => setViewMode('list'), children: "List" })] })] }), _jsxs("div", { className: "border rounded-lg overflow-hidden", style: { height: '500px' }, children: [_jsx("div", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] h-32" }), _jsx("div", { className: "relative -mt-16 p-6", children: _jsxs("div", { className: "flex items-end gap-4", children: [_jsx("div", { className: "w-24 h-24 bg-[var(--hive-surface-primary)] rounded-full border-4 border-white" }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Jordan Smith" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Computer Science \u2022 Junior" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "primary", children: "Connect" }), _jsx(HiveButton, { variant: "ghost", children: "Message" })] })] }) }), _jsx("div", { className: "px-6 pb-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "md:col-span-2", children: _jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-3", children: "About" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Passionate about artificial intelligence and machine learning. Currently working on research projects involving neural networks." })] }) }), _jsx("div", { children: _jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-3", children: "Stats" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "GPA" }), _jsx("span", { className: "font-semibold", children: "3.87" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Connections" }), _jsx("span", { className: "font-semibold", children: "156" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Tools Created" }), _jsx("span", { className: "font-semibold", children: "5" })] })] })] }) })] }) })] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Profile page template with user information and stats.',
            },
        },
    },
};
//# sourceMappingURL=page-templates.stories.js.map