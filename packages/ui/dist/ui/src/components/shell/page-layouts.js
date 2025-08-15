"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { HiveBentoGrid, HiveBentoCard, HiveStack } from '../../layout/hive-layout';
export function ProfileLayout({ children, header, quickActions, calendar, personalTools, spaceMemberships, activityFeed, className }) {
    return (_jsxs("div", { className: cn("w-full", className), children: [header && (_jsx("div", { className: "mb-8", children: header })), quickActions && (_jsx("div", { className: "mb-6", children: quickActions })), _jsxs(HiveBentoGrid, { cols: 4, gap: "lg", cascade: true, children: [calendar && (_jsx(HiveBentoCard, { span: 2, aspect: "wide", elevated: true, interactive: true, children: calendar })), personalTools && (_jsx(HiveBentoCard, { span: 2, elevated: true, interactive: true, children: personalTools })), spaceMemberships && (_jsx(HiveBentoCard, { span: 2, aspect: "tall", elevated: true, interactive: true, children: spaceMemberships })), activityFeed && (_jsx(HiveBentoCard, { span: 2, aspect: "tall", elevated: true, children: activityFeed })), children] })] }));
}
export function SpaceLayout({ children, spaceHeader, pinned, posts, events, toolsStack, chat, members, surfaceLayout = '6-grid', className }) {
    if (surfaceLayout === 'tabbed') {
        return (_jsxs("div", { className: cn("w-full", className), children: [spaceHeader, _jsx("div", { className: "mt-6", children: children })] }));
    }
    if (surfaceLayout === 'sidebar') {
        return (_jsxs("div", { className: cn("w-full flex gap-6", className), children: [_jsxs("div", { className: "flex-1", children: [spaceHeader, children] }), _jsxs("div", { className: "w-80 space-y-4", children: [toolsStack && (_jsx("div", { className: "glass rounded-2xl p-4", children: toolsStack })), members && (_jsx("div", { className: "glass rounded-2xl p-4", children: members }))] })] }));
    }
    // Default 6-grid layout
    return (_jsxs("div", { className: cn("w-full", className), children: [spaceHeader && (_jsx("div", { className: "mb-8", children: spaceHeader })), _jsxs(HiveBentoGrid, { cols: 3, gap: "lg", cascade: true, children: [pinned && (_jsx(HiveBentoCard, { span: 3, elevated: true, interactive: true, children: pinned })), posts && (_jsx(HiveBentoCard, { span: 2, aspect: "tall", elevated: true, children: posts })), toolsStack && (_jsx(HiveBentoCard, { elevated: true, interactive: true, children: toolsStack })), events && (_jsx(HiveBentoCard, { elevated: true, interactive: true, children: events })), chat && (_jsx(HiveBentoCard, { elevated: true, children: chat })), members && (_jsx(HiveBentoCard, { elevated: true, interactive: true, children: members })), children] })] }));
}
export function FeedLayout({ children, feedHeader, feedFilters, feedContent, feedSidebar, className }) {
    return (_jsxs("div", { className: cn("w-full max-w-4xl mx-auto", className), children: [feedHeader && (_jsx("div", { className: "mb-6", children: feedHeader })), feedFilters && (_jsx("div", { className: "mb-6", children: feedFilters })), _jsxs("div", { className: "flex gap-6", children: [_jsxs("div", { className: "flex-1", children: [feedContent && (_jsx(HiveStack, { spacing: "lg", children: feedContent })), children] }), feedSidebar && (_jsx("div", { className: "w-80 hidden lg:block", children: _jsx("div", { className: "sticky top-24", children: feedSidebar }) }))] })] }));
}
export function HiveLabLayout({ children, builderHeader, elementLibrary, designCanvas, propertiesPanel, previewArea, className }) {
    return (_jsxs("div", { className: cn("w-full h-full flex flex-col bg-[var(--hive-background-secondary)]/30", className), children: [builderHeader && (_jsx("div", { className: "border-b border-[var(--hive-border-primary)] p-4", children: builderHeader })), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [elementLibrary && (_jsx("div", { className: "w-64 border-r border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/50 p-4", children: _jsx("div", { className: "h-full overflow-y-auto", children: elementLibrary }) })), _jsxs("div", { className: "flex-1 flex flex-col", children: [designCanvas && (_jsx("div", { className: "flex-1 p-6 overflow-auto", children: designCanvas })), previewArea && (_jsx("div", { className: "h-48 border-t border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/30 p-4", children: previewArea }))] }), propertiesPanel && (_jsx("div", { className: "w-80 border-l border-[var(--hive-border-primary)] bg-[var(--hive-background-primary)]/50 p-4", children: _jsx("div", { className: "h-full overflow-y-auto", children: propertiesPanel }) }))] }), children] }));
}
export function RitualLayout({ children, ritualBackground = 'gradient', centered = true, maxWidth = '4xl', className }) {
    const backgroundStyles = {
        gradient: 'bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]',
        particles: 'bg-[var(--hive-background-primary)] relative overflow-hidden',
        glow: 'bg-[var(--hive-background-primary)] relative',
        minimal: 'bg-[var(--hive-background-primary)]',
    };
    const maxWidthClasses = {
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        'full': 'max-w-full',
    };
    return (_jsxs("div", { className: cn("min-h-screen w-full flex flex-col", backgroundStyles[ritualBackground], className), children: [ritualBackground === 'glow' && (_jsx("div", { className: "absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/10 via-transparent to-transparent opacity-50" })), ritualBackground === 'particles' && (_jsx("div", { className: "absolute inset-0 opacity-20" })), _jsx("div", { className: cn("flex-1 flex flex-col", centered && "items-center justify-center text-center", "p-8"), children: _jsx("div", { className: cn("w-full", maxWidthClasses[maxWidth]), children: children }) })] }));
}
export function SplitLayout({ leftPanel, rightPanel, splitRatio = '1:1', resizable = false, className }) {
    const ratioClasses = {
        '1:1': 'grid-cols-2',
        '1:2': 'grid-cols-[1fr_2fr]',
        '2:1': 'grid-cols-[2fr_1fr]',
        '1:3': 'grid-cols-[1fr_3fr]',
        '3:1': 'grid-cols-[3fr_1fr]',
    };
    return (_jsxs("div", { className: cn("h-full grid gap-6", ratioClasses[splitRatio], className), children: [_jsx("div", { className: "glass rounded-2xl p-6 overflow-auto", children: leftPanel }), _jsx("div", { className: "glass rounded-2xl p-6 overflow-auto", children: rightPanel })] }));
}
export function ModalLayout({ children, isOpen, onClose, size = 'md', backdrop = 'blur', className }) {
    if (!isOpen)
        return null;
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full h-full',
    };
    const backdropClasses = {
        blur: 'backdrop-blur-md bg-[var(--hive-background-primary)]/60',
        dark: 'bg-[var(--hive-background-primary)]/80',
        none: 'bg-transparent',
    };
    return (_jsx("div", { className: cn("fixed inset-0 z-50 flex items-center justify-center p-4", backdropClasses[backdrop]), onClick: onClose, children: _jsx("div", { className: cn("glass rounded-3xl p-6 w-full", sizeClasses[size], "transform transition-all duration-300 ease-out", className), onClick: (e) => e.stopPropagation(), children: children }) }));
}
//# sourceMappingURL=page-layouts.js.map