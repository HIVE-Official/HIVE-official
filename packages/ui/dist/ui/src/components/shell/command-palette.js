"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Search, Zap, Users, User, Settings, Compass, Home, Calendar, BookOpen } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { cn } from '../../lib/utils.js';
export function CommandPalette({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    // Create navigation function
    const navigate = (path) => {
        window.location.href = path;
    };
    const commands = [
        // Navigation
        {
            id: 'nav-feed',
            label: 'Go to Feed',
            icon: Home,
            category: 'navigation',
            action: () => navigate('/'),
            keywords: ['home', 'timeline', 'dashboard']
        },
        {
            id: 'nav-discover',
            label: 'Discover Spaces',
            icon: Compass,
            category: 'navigation',
            action: () => navigate('/spaces'),
            keywords: ['explore', 'find', 'browse', 'communities']
        },
        {
            id: 'nav-build',
            label: 'Build Tool',
            icon: Zap,
            category: 'navigation',
            action: () => navigate('/build'),
            keywords: ['create', 'maker', 'tool', 'hivelab']
        },
        {
            id: 'nav-spaces',
            label: 'My Spaces',
            icon: Users,
            category: 'navigation',
            action: () => navigate('/profile?tab=spaces'),
            keywords: ['communities', 'groups', 'my']
        },
        {
            id: 'nav-profile',
            label: 'Profile',
            icon: User,
            category: 'navigation',
            action: () => navigate('/profile'),
            keywords: ['account', 'me', 'user']
        },
        {
            id: 'nav-events',
            label: 'Events',
            icon: Calendar,
            category: 'navigation',
            action: () => navigate('/events'),
            keywords: ['calendar', 'meetings', 'schedule', 'upcoming']
        },
        {
            id: 'nav-resources',
            label: 'Resources',
            icon: BookOpen,
            category: 'navigation',
            action: () => navigate('/resources'),
            keywords: ['docs', 'help', 'guides', 'documentation']
        },
        {
            id: 'nav-settings',
            label: 'Settings',
            icon: Settings,
            category: 'navigation',
            action: () => navigate('/settings'),
            keywords: ['preferences', 'config', 'account']
        },
        // Actions
        {
            id: 'action-create-tool',
            label: 'Create New Tool',
            description: 'Start building a new tool in HiveLab',
            icon: Zap,
            category: 'actions',
            action: () => navigate('/build'),
            keywords: ['new', 'build', 'make', 'create']
        },
        {
            id: 'action-join-space',
            label: 'Join a Space',
            description: 'Discover and join new communities',
            icon: Users,
            category: 'actions',
            action: () => navigate('/spaces'),
            keywords: ['join', 'community', 'discover']
        },
        {
            id: 'action-create-event',
            label: 'Create Event',
            description: 'Create a new event for your community',
            icon: Calendar,
            category: 'actions',
            action: () => navigate('/events'),
            keywords: ['event', 'create', 'schedule']
        },
    ];
    const filteredCommands = commands.filter(command => {
        if (!query)
            return true;
        const searchText = query.toLowerCase();
        return (command.label.toLowerCase().includes(searchText) ||
            command.description?.toLowerCase().includes(searchText) ||
            command.keywords?.some(keyword => keyword.includes(searchText)));
    });
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);
    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (!isOpen)
                return;
            switch (event.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedIndex(i => Math.max(i - 1, 0));
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        filteredCommands[selectedIndex].action();
                        onClose();
                    }
                    break;
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, filteredCommands, onClose]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-24 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm", children: _jsx("div", { className: "w-full max-w-lg mx-4", children: _jsxs("div", { className: "bg-[color-mix(in_srgb,var(--hive-background-primary)_95%,transparent)] backdrop-blur-xl border border-[color-mix(in_srgb,var(--hive-border-hover)_60%,transparent)] rounded-xl shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "flex items-center px-4 py-3 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Search, { className: "h-4 w-4 text-[var(--hive-text-tertiary)] mr-3" }), _jsx("input", { type: "text", placeholder: "Search commands...", value: query, onChange: (e) => setQuery(e.target.value), className: "flex-1 bg-transparent outline-none text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]", autoFocus: true })] }), _jsx("div", { className: "max-h-80 overflow-y-auto", children: filteredCommands.length === 0 ? (_jsxs("div", { className: "px-4 py-8 text-center text-[var(--hive-text-tertiary)]", children: ["No commands found for \"", query, "\""] })) : (_jsx("div", { className: "py-2", children: filteredCommands.map((command, index) => {
                                const Icon = command.icon;
                                const isSelected = index === selectedIndex;
                                return (_jsxs(Button, { variant: "ghost", className: cn("w-full justify-start px-4 py-3 h-auto text-left rounded-none", "hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)]", isSelected && "bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)] text-[var(--hive-brand-secondary)]"), onClick: () => {
                                        command.action();
                                        onClose();
                                    }, children: [_jsx(Icon, { className: "h-4 w-4 mr-3 flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium", children: command.label }), command.description && (_jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)] mt-0.5", children: command.description }))] })] }, command.id));
                            }) })) }), _jsxs("div", { className: "px-4 py-2 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] text-xs text-[var(--hive-text-tertiary)] flex items-center justify-between", children: [_jsx("span", { children: "Use \u2191\u2193 to navigate, \u21B5 to select" }), _jsx("span", { children: "ESC to close" })] })] }) }) }));
}
//# sourceMappingURL=command-palette.js.map