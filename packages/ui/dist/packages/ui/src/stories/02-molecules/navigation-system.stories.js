import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton } from '../../components/hive-button';
const meta = {
    title: '02-Molecules/Navigation System',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# Navigation System Molecules

Complete navigation system for the HIVE platform with multiple variants and responsive behavior.

## Navigation Features

- **Responsive Design**: Adapts to all screen sizes
- **Active States**: Clear indication of current page
- **Badge Support**: Notification counts and status indicators
- **User Context**: Profile and settings access

## Implementation

Navigation components are integrated throughout the HIVE platform providing consistent
user experience across all pages and features.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const NavigationDemo = {
    render: () => {
        const [activeTab, setActiveTab] = useState('dashboard');
        const navigationItems = [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'spaces', label: 'Spaces' },
            { id: 'tools', label: 'Tools' },
            { id: 'profile', label: 'Profile' },
        ];
        return (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Navigation System Demo" }), _jsxs("div", { className: "border rounded-lg overflow-hidden", children: [_jsx("div", { className: "p-4 bg-[var(--hive-surface-primary)] border-b", children: _jsx("div", { className: "flex gap-2", children: navigationItems.map((item) => (_jsx(HiveButton, { variant: activeTab === item.id ? 'primary' : 'ghost', onClick: () => setActiveTab(item.id), children: item.label }, item.id))) }) }), _jsxs("div", { className: "p-8 bg-[var(--hive-background-secondary)]", children: [_jsxs("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: [navigationItems.find(item => item.id === activeTab)?.label, " Page"] }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Content for the ", activeTab, " section would appear here."] })] })] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Navigation system demonstration using HIVE components.',
            },
        },
    },
};
//# sourceMappingURL=navigation-system.stories.js.map