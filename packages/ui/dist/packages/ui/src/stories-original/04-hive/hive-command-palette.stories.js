import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCommandPalette, HiveButton } from '../../components';
const meta = {
    title: '04-Hive/Command Palette',
    component: HiveCommandPalette,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Command Palette - Advanced search and command interface with intelligent filtering, keyboard navigation, and instant results. Built for power users.',
            },
        },
    },
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Controls palette visibility',
        },
        placeholder: {
            control: 'text',
            description: 'Search input placeholder text',
        },
        showCategories: {
            control: 'boolean',
            description: 'Show command categories',
        },
        showKeyboardShortcuts: {
            control: 'boolean',
            description: 'Display keyboard shortcuts',
        },
        maxResults: {
            control: 'number',
            description: 'Maximum number of results to show',
        },
    },
    tags: ['autodocs'],
};
export default meta;
// Mock data for demonstrations
const mockSpaces = [
    { id: '1', name: 'Computer Science Hub', type: 'academic', memberCount: 245, description: 'CS students and faculty collaboration' },
    { id: '2', name: 'Design Studio', type: 'creative', memberCount: 89, description: 'Creative minds and design thinking' },
    { id: '3', name: 'Entrepreneurship', type: 'business', memberCount: 156, description: 'Startup ideas and business development' },
    { id: '4', name: 'Research Lab', type: 'academic', memberCount: 67, description: 'Scientific research and discoveries' },
    { id: '5', name: 'Gaming Community', type: 'social', memberCount: 312, description: 'Gamers and esports enthusiasts' },
];
const mockCommands = [
    { id: 'create-space', name: 'Create New Space', category: 'Actions', shortcut: '⌘N', icon: '🏗️' },
    { id: 'join-space', name: 'Join Space', category: 'Actions', shortcut: '⌘J', icon: '🚪' },
    { id: 'settings', name: 'Settings', category: 'Navigation', shortcut: '⌘,', icon: '⚙️' },
    { id: 'profile', name: 'My Profile', category: 'Navigation', shortcut: '⌘P', icon: '👤' },
    { id: 'notifications', name: 'Notifications', category: 'Navigation', shortcut: '⌘B', icon: '🔔' },
    { id: 'help', name: 'Help & Support', category: 'Support', shortcut: '⌘?', icon: '❓' },
    { id: 'logout', name: 'Sign Out', category: 'Account', shortcut: '⌘⇧Q', icon: '🚪' },
];
const mockRecentActions = [
    { id: 'r1', name: 'Computer Science Hub', type: 'space', timestamp: '2 minutes ago' },
    { id: 'r2', name: 'Updated profile photo', type: 'action', timestamp: '1 hour ago' },
    { id: 'r3', name: 'Design Studio', type: 'space', timestamp: '3 hours ago' },
];
// Command Palette Trigger Component
const CommandPaletteTrigger = ({ children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-4 text-center", children: [_jsx(HiveButton, { onClick: () => setIsOpen(true), children: "Open Command Palette" }), _jsx("p", { className: "text-sm text-gray-400", children: "Try: \u2318K or Click the button above" })] }), _jsx(HiveCommandPalette, { ...props, isOpen: isOpen, onClose: () => setIsOpen(false), spaces: mockSpaces, commands: mockCommands, recentActions: mockRecentActions })] }));
};
export const Default = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args })),
    args: {
        placeholder: 'Search spaces, commands, or actions...',
        showCategories: true,
        showKeyboardShortcuts: true,
        maxResults: 8,
    },
};
export const SpaceSearch = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args, initialQuery: "design", initialFilter: "spaces" })),
    args: {
        placeholder: 'Find spaces...',
        showCategories: false,
        maxResults: 5,
    },
};
export const CommandsOnly = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args, initialFilter: "commands" })),
    args: {
        placeholder: 'Quick actions...',
        showCategories: true,
        showKeyboardShortcuts: true,
    },
};
export const MinimalMode = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args })),
    args: {
        placeholder: 'Search...',
        showCategories: false,
        showKeyboardShortcuts: false,
        maxResults: 4,
    },
};
export const WithRecentActions = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args })),
    args: {
        placeholder: 'Search or continue recent actions...',
        showRecentActions: true,
        showCategories: true,
        maxResults: 6,
    },
};
export const PowerUserMode = {
    render: (args) => (_jsx(CommandPaletteTrigger, { ...args })),
    args: {
        placeholder: 'Advanced search with filters and shortcuts...',
        showCategories: true,
        showKeyboardShortcuts: true,
        showRecentActions: true,
        showAdvancedFilters: true,
        maxResults: 10,
    },
};
// Interactive Showcase
export const InteractiveShowcase = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedCommand, setSelectedCommand] = useState('');
        const handleCommand = (command) => {
            setSelectedCommand(`Executed: ${command.name} (${command.category})`);
            setIsOpen(false);
        };
        const handleSpaceSelect = (space) => {
            setSelectedCommand(`Navigating to: ${space.name} (${space.type})`);
            setIsOpen(false);
        };
        return (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Interactive Command Palette" }), _jsx("p", { className: "text-sm text-gray-400", children: "Try searching for spaces, commands, or use keyboard shortcuts" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(HiveButton, { onClick: () => setIsOpen(true), children: "Open Palette" }), _jsx(HiveButton, { variant: "outline", onClick: () => {
                                        setIsOpen(true);
                                        // Pre-populate with 'create' query
                                    }, children: "Quick Create" })] }), selectedCommand && (_jsx("div", { className: "p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm", children: selectedCommand }))] }), _jsxs("div", { className: "space-y-2 text-xs text-gray-500", children: [_jsx("div", { className: "font-medium", children: "Keyboard Shortcuts:" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("div", { children: "\u2318K - Open palette" }), _jsx("div", { children: "\u2318N - Create space" }), _jsx("div", { children: "\u2318J - Join space" }), _jsx("div", { children: "\u2318P - Profile" }), _jsx("div", { children: "\u2191/\u2193 - Navigate" }), _jsx("div", { children: "\u23CE - Select" })] })] }), _jsx(HiveCommandPalette, { isOpen: isOpen, onClose: () => setIsOpen(false), spaces: mockSpaces, commands: mockCommands, recentActions: mockRecentActions, onCommandSelect: handleCommand, onSpaceSelect: handleSpaceSelect, placeholder: "Search everything...", showCategories: true, showKeyboardShortcuts: true, showRecentActions: true, maxResults: 8 })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Fully interactive command palette with real command execution and space navigation. Test all features and keyboard shortcuts.',
            },
        },
    },
};
//# sourceMappingURL=hive-command-palette.stories.js.map