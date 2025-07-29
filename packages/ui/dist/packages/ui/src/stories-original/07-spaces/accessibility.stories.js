import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';
const meta = {
    title: 'Spaces/Accessibility',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Comprehensive accessibility features for HIVE spaces including screen reader support, keyboard navigation, high contrast modes, and inclusive design patterns.',
            },
        },
    },
};
export default meta;
// Mock data for accessibility features
const accessibilityFeatures = [
    {
        id: 'screen-reader',
        name: 'Screen Reader Support',
        description: 'Full ARIA labels and semantic HTML',
        icon: '👁️',
        status: 'active',
        coverage: '95%'
    },
    {
        id: 'keyboard-nav',
        name: 'Keyboard Navigation',
        description: 'Complete keyboard-only navigation',
        icon: '⌨️',
        status: 'active',
        coverage: '100%'
    },
    {
        id: 'high-contrast',
        name: 'High Contrast Mode',
        description: 'Enhanced contrast for better visibility',
        icon: '🌗',
        status: 'active',
        coverage: '90%'
    },
    {
        id: 'focus-indicators',
        name: 'Focus Indicators',
        description: 'Clear visual focus indicators',
        icon: '🎯',
        status: 'active',
        coverage: '100%'
    },
    {
        id: 'text-scaling',
        name: 'Text Scaling',
        description: 'Supports up to 200% text scaling',
        icon: '📏',
        status: 'active',
        coverage: '85%'
    },
    {
        id: 'color-blind',
        name: 'Color Blind Support',
        description: 'Color-blind friendly design',
        icon: '🌈',
        status: 'active',
        coverage: '80%'
    }
];
export const AccessibilityOverview = {
    render: () => {
        const [selectedFeature, setSelectedFeature] = useState(null);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Accessibility Features" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive accessibility support for inclusive HIVE spaces" })] }), _jsx(HiveButton, { variant: "outline", children: "Accessibility Guide" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: accessibilityFeatures.map((feature) => (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { className: "h-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none", onClick: () => setSelectedFeature(feature.id), onKeyPress: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelectedFeature(feature.id);
                                    }
                                }, tabIndex: 0, role: "button", "aria-label": `View details for ${feature.name}`, children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "text-2xl", "aria-hidden": "true", children: feature.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: feature.name }), _jsx("p", { className: "text-sm text-gray-600", children: feature.description })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(HiveBadge, { variant: "success", children: feature.status }), _jsxs("div", { className: "text-sm text-gray-500", children: [feature.coverage, " coverage"] })] })] }) }) }, feature.id))) }), selectedFeature && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-6", role: "region", "aria-label": "Feature details", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsxs("h3", { className: "text-lg font-semibold mb-4", children: [accessibilityFeatures.find(f => f.id === selectedFeature)?.name, " Details"] }), _jsx("p", { className: "text-gray-600 mb-4", children: accessibilityFeatures.find(f => f.id === selectedFeature)?.description }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "primary", children: "Learn More" }), _jsx(HiveButton, { variant: "outline", onClick: () => setSelectedFeature(null), children: "Close" })] })] }) }) }))] }) }));
    },
};
export const KeyboardNavigation = {
    render: () => {
        const [currentFocus, setCurrentFocus] = useState(null);
        const [keyboardHints, setKeyboardHints] = useState(true);
        const navItems = [
            { id: 'spaces', label: 'Spaces', shortcut: 'Alt+S' },
            { id: 'feed', label: 'Feed', shortcut: 'Alt+F' },
            { id: 'profile', label: 'Profile', shortcut: 'Alt+P' },
            { id: 'settings', label: 'Settings', shortcut: 'Alt+T' }
        ];
        const spaceActions = [
            { id: 'create-post', label: 'Create Post', shortcut: 'Ctrl+N' },
            { id: 'search', label: 'Search', shortcut: 'Ctrl+K' },
            { id: 'notifications', label: 'Notifications', shortcut: 'Ctrl+I' },
            { id: 'help', label: 'Help', shortcut: 'Ctrl+?' }
        ];
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Keyboard Navigation" }), _jsx("p", { className: "text-gray-600", children: "Complete keyboard-only navigation for all space features" })] }), _jsxs(HiveButton, { variant: "outline", onClick: () => setKeyboardHints(!keyboardHints), "aria-label": `${keyboardHints ? 'Hide' : 'Show'} keyboard hints`, children: [keyboardHints ? 'Hide' : 'Show', " Hints"] })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Keyboard Shortcuts" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Navigation" }), _jsx("div", { className: "space-y-1", children: navItems.map((item) => (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: item.label }), _jsx("kbd", { className: "px-2 py-1 bg-gray-100 rounded text-xs", children: item.shortcut })] }, item.id))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Actions" }), _jsx("div", { className: "space-y-1", children: spaceActions.map((action) => (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: action.label }), _jsx("kbd", { className: "px-2 py-1 bg-gray-100 rounded text-xs", children: action.shortcut })] }, action.id))) })] })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Focus Indicators Demo" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Use Tab to navigate through these elements and see focus indicators" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (_jsxs(HiveButton, { variant: i % 2 === 0 ? 'primary' : 'outline', className: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", onFocus: () => setCurrentFocus(`button-${i}`), onBlur: () => setCurrentFocus(null), "aria-describedby": keyboardHints ? `hint-${i}` : undefined, children: ["Button ", i + 1, keyboardHints && currentFocus === `button-${i}` && (_jsxs("span", { id: `hint-${i}`, className: "sr-only", "aria-live": "polite", children: ["Currently focused on Button ", i + 1] }))] }, i))) })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Skip Links" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Press Tab from the top of the page to see skip links" }), _jsxs("div", { className: "space-y-2", children: [_jsx("a", { href: "#main-content", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-[var(--hive-text-primary)] px-4 py-2 rounded z-50", children: "Skip to main content" }), _jsx("a", { href: "#navigation", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-[var(--hive-text-primary)] px-4 py-2 rounded z-50", children: "Skip to navigation" }), _jsx("a", { href: "#footer", className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 bg-blue-600 text-[var(--hive-text-primary)] px-4 py-2 rounded z-50", children: "Skip to footer" })] })] }) })] }) }));
    },
};
export const ScreenReaderSupport = {
    render: () => {
        const [announcements, setAnnouncements] = useState([]);
        const [currentAction, setCurrentAction] = useState(null);
        const addAnnouncement = (message) => {
            setAnnouncements(prev => [...prev, message]);
            setTimeout(() => {
                setAnnouncements(prev => prev.slice(1));
            }, 5000);
        };
        const handleAction = (action) => {
            setCurrentAction(action);
            addAnnouncement(`${action} activated`);
            setTimeout(() => setCurrentAction(null), 2000);
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Screen Reader Support" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive ARIA labels and semantic HTML for screen readers" })] }), _jsx(HiveButton, { variant: "outline", children: "ARIA Guide" })] }), _jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", role: "status", children: announcements.map((announcement, index) => (_jsx("div", { children: announcement }, index))) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold mb-3", children: "Semantic Structure" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Properly structured content with headings, lists, and landmarks" }), _jsxs("nav", { "aria-label": "Space navigation", children: [_jsx("h3", { className: "font-medium mb-2", children: "Navigation" }), _jsxs("ul", { className: "space-y-1", children: [_jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Posts" }) }), _jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Events" }) }), _jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-600 hover:underline", children: "Tools" }) })] })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold mb-3", children: "Interactive Elements" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "All interactive elements have proper ARIA labels and roles" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "space-search", className: "block text-sm font-medium mb-1", children: "Search Spaces" }), _jsx(HiveInput, { id: "space-search", placeholder: "Type to search...", "aria-describedby": "search-help", className: "w-full" }), _jsx("div", { id: "search-help", className: "text-sm text-gray-500 mt-1", children: "Search across all your spaces and content" })] }), _jsx("div", { children: _jsxs("fieldset", { children: [_jsx("legend", { className: "text-sm font-medium mb-2", children: "Space Visibility" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", name: "visibility", value: "public", className: "mr-2", "aria-describedby": "public-help" }), _jsx("span", { children: "Public" })] }), _jsx("div", { id: "public-help", className: "text-sm text-gray-500 ml-6", children: "Anyone can discover and join this space" }), _jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", name: "visibility", value: "private", className: "mr-2", "aria-describedby": "private-help" }), _jsx("span", { children: "Private" })] }), _jsx("div", { id: "private-help", className: "text-sm text-gray-500 ml-6", children: "Only invited members can access this space" })] })] }) }), _jsxs("div", { children: [_jsx("button", { onClick: () => handleAction('Create space'), className: "bg-blue-600 text-[var(--hive-text-primary)] px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500", "aria-describedby": "create-status", children: "Create Space" }), _jsx("div", { id: "create-status", className: "text-sm text-gray-500 mt-1", "aria-live": "polite", children: currentAction === 'Create space' ? 'Creating space...' : 'Ready to create space' })] })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold mb-3", children: "Accessible Data Tables" }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Properly structured tables with headers and descriptions" }), _jsxs("table", { className: "w-full border-collapse border border-gray-300", role: "table", children: [_jsx("caption", { className: "text-sm text-gray-600 mb-2", children: "Space membership statistics" }), _jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "border border-gray-300 p-2 text-left", scope: "col", children: "Space Name" }), _jsx("th", { className: "border border-gray-300 p-2 text-left", scope: "col", children: "Members" }), _jsx("th", { className: "border border-gray-300 p-2 text-left", scope: "col", children: "Status" }), _jsx("th", { className: "border border-gray-300 p-2 text-left", scope: "col", children: "Actions" })] }) }), _jsx("tbody", { children: Array.from({ length: 3 }).map((_, i) => (_jsxs("tr", { children: [_jsxs("td", { className: "border border-gray-300 p-2", children: ["Space ", i + 1] }), _jsx("td", { className: "border border-gray-300 p-2", children: 20 + i * 5 }), _jsx("td", { className: "border border-gray-300 p-2", children: _jsx(HiveBadge, { variant: "success", children: "Active" }) }), _jsx("td", { className: "border border-gray-300 p-2", children: _jsx("button", { onClick: () => handleAction(`View Space ${i + 1}`), className: "text-blue-600 hover:underline", "aria-label": `View details for Space ${i + 1}`, children: "View" }) })] }, i))) })] })] }) })] }) }));
    },
};
export const HighContrastMode = {
    render: () => {
        const [highContrast, setHighContrast] = useState(false);
        const [contrastRatio, setContrastRatio] = useState('4.5:1');
        const toggleHighContrast = () => {
            setHighContrast(!highContrast);
            setContrastRatio(highContrast ? '4.5:1' : '7:1');
        };
        return (_jsx("div", { className: highContrast ? 'bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]' : 'bg-gray-50', children: _jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "High Contrast Mode" }), _jsx("p", { className: `${highContrast ? 'text-gray-300' : 'text-gray-600'}`, children: "Enhanced contrast for better visibility and accessibility" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-sm", children: ["Contrast: ", contrastRatio] }), _jsx(HiveButton, { variant: highContrast ? 'outline' : 'primary', onClick: toggleHighContrast, className: highContrast ? 'border-white text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)] hover:text-[var(--hive-background-primary)]' : '', children: highContrast ? 'Normal' : 'High Contrast' })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(HiveCard, { className: highContrast ? 'bg-gray-900 border-[var(--hive-border-default)]' : '', children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Text Elements" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-lg", children: "Large text (18px)" }), _jsx("p", { className: "text-base", children: "Normal text (16px)" }), _jsx("p", { className: "text-sm", children: "Small text (14px)" }), _jsx("p", { className: `text-xs ${highContrast ? 'text-gray-400' : 'text-gray-500'}`, children: "Extra small text (3)" })] })] }) }), _jsx(HiveCard, { className: highContrast ? 'bg-gray-900 border-[var(--hive-border-default)]' : '', children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Interactive Elements" }), _jsxs("div", { className: "space-y-3", children: [_jsx(HiveButton, { variant: "primary", className: highContrast ? 'bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:bg-gray-200' : '', children: "Primary Button" }), _jsx(HiveButton, { variant: "outline", className: highContrast ? 'border-white text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)] hover:text-[var(--hive-background-primary)]' : '', children: "Outline Button" }), _jsx(HiveInput, { placeholder: "Input field", className: highContrast ? 'bg-gray-800 border-gray-600 text-[var(--hive-text-primary)] placeholder-gray-400' : '' })] })] }) }), _jsx(HiveCard, { className: highContrast ? 'bg-gray-900 border-[var(--hive-border-default)]' : '', children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Status Indicators" }), _jsxs("div", { className: "space-y-2", children: [_jsx(HiveBadge, { variant: "success", className: highContrast ? 'bg-green-800 text-green-100' : '', children: "Success" }), _jsx(HiveBadge, { variant: "warning", className: highContrast ? 'bg-yellow-800 text-yellow-100' : '', children: "Warning" }), _jsx(HiveBadge, { variant: "destructive", className: highContrast ? 'bg-red-800 text-red-100' : '', children: "Error" })] })] }) }), _jsx(HiveCard, { className: highContrast ? 'bg-gray-900 border-[var(--hive-border-default)]' : '', children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Links & Navigation" }), _jsxs("div", { className: "space-y-2", children: [_jsx("a", { href: "#", className: `${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline`, children: "Regular Link" }), _jsx("a", { href: "#", className: `${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline visited:text-purple-600`, children: "Visited Link" }), _jsx("button", { className: `${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline`, children: "Button Link" })] })] }) })] }), _jsx(HiveCard, { className: highContrast ? 'bg-gray-900 border-[var(--hive-border-default)]' : '', children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Focus Indicators" }), _jsx("p", { className: `text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'} mb-4`, children: "Use Tab to navigate and see enhanced focus indicators" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs(HiveButton, { variant: "outline", className: `focus:ring-2 focus:ring-offset-2 ${highContrast
                                                ? 'border-white text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)] hover:text-[var(--hive-background-primary)] focus:ring-white'
                                                : 'focus:ring-blue-500'}`, children: ["Focus Test ", i + 1] }, i))) })] }) })] }) }) }));
    },
};
export const InclusiveDesignPatterns = {
    render: () => {
        const [fontSize, setFontSize] = useState(16);
        const [reducedMotion, setReducedMotion] = useState(false);
        const [colorBlindMode, setColorBlindMode] = useState('normal');
        const colorBlindModes = [
            { value: 'normal', label: 'Normal Vision' },
            { value: 'protanopia', label: 'Protanopia' },
            { value: 'deuteranopia', label: 'Deuteranopia' },
            { value: 'tritanopia', label: 'Tritanopia' }
        ];
        return (_jsx("div", { style: { fontSize: `${fontSize}px` }, children: _jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Inclusive Design Patterns" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive accessibility features for all users" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm", children: "A11Y" }), _jsx(HiveBadge, { variant: "success", children: "WCAG 2.1 AA" })] })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Accessibility Controls" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Font Size: ", fontSize, "px"] }), _jsx("input", { type: "range", min: "12", max: "24", value: fontSize, onChange: (e) => setFontSize(Number(e.target.value)), className: "w-full", "aria-label": "Adjust font size" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Color Blind Support" }), _jsx("select", { value: colorBlindMode, onChange: (e) => setColorBlindMode(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md", "aria-label": "Select color blind mode", children: colorBlindModes.map((mode) => (_jsx("option", { value: mode.value, children: mode.label }, mode.value))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: reducedMotion, onChange: (e) => setReducedMotion(e.target.checked), "aria-describedby": "motion-help" }), _jsx("span", { className: "text-sm font-medium", children: "Reduce Motion" })] }), _jsx("div", { id: "motion-help", className: "text-sm text-gray-500 mt-1", children: "Minimizes animations and transitions" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Text Scaling Demo" }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { children: "This text scales with the font size control above. The layout remains usable at all sizes." }), _jsx("p", { className: "text-sm", children: "Small text remains readable even when scaled up." }), _jsx(HiveButton, { variant: "primary", children: "Button text scales too" })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Color Accessibility" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-red-500 rounded" }), _jsx("span", { children: "Error state" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-yellow-500 rounded" }), _jsx("span", { children: "Warning state" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-green-500 rounded" }), _jsx("span", { children: "Success state" })] }), _jsx("p", { className: "text-sm text-gray-600 mt-2", children: "Colors are paired with icons and text for clarity" })] })] }) })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Motion Preferences" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs(motion.div, { whileHover: reducedMotion ? {} : { scale: 1.02 }, transition: reducedMotion ? { duration: 0 } : { duration: 0.2 }, className: "p-4 bg-gray-100 rounded-lg cursor-pointer", children: [_jsxs("h4", { className: "font-medium", children: ["Card ", i + 1] }), _jsx("p", { className: "text-sm text-gray-600", children: reducedMotion ? 'Motion reduced' : 'Hover for animation' })] }, i))) })] }) })] }) }) }));
    },
};
//# sourceMappingURL=accessibility.stories.js.map