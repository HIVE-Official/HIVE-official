import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Layout System - Systematic Layout & IA Implementation
 * Production-ready layout components implementing IA patterns
 * Built for University at Buffalo campus social platform
 */
import * as React from 'react';
import { cn } from '../../lib/utils';
// === CARD LAYOUT SYSTEM ===
export const HiveCard = React.forwardRef(({ children, className, variant = 'comfortable', padding = true }, ref) => {
    const variantClasses = {
        compact: 'p-4 gap-3 rounded-lg max-w-[320px] min-h-[120px]',
        comfortable: 'p-5 gap-4 rounded-xl max-w-[480px] min-h-[200px]',
        spacious: 'p-6 gap-5 rounded-xl max-w-[640px] min-h-[280px]'
    };
    return (_jsx("div", { ref: ref, className: cn('bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] shadow-lg backdrop-blur-sm overflow-hidden', variantClasses[variant], !padding && 'p-0', className), children: children }));
});
HiveCard.displayName = 'HiveCard';
// === GRID LAYOUT SYSTEM ===
export const HiveGrid = React.forwardRef(({ children, className, columns = 2, gap = 'md', responsive = true }, ref) => {
    const columnClasses = responsive ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-4'
    } : {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4'
    };
    const gapClasses = {
        sm: 'gap-3',
        md: 'gap-4 md:gap-6',
        lg: 'gap-6 lg:gap-8'
    };
    return (_jsx("div", { ref: ref, className: cn('grid', columnClasses[columns], gapClasses[gap], className), children: children }));
});
HiveGrid.displayName = 'HiveGrid';
// === STACK LAYOUT SYSTEM ===
export const HiveStack = React.forwardRef(({ children, className, direction = 'vertical', align = 'start', justify = 'start', gap = 'md', wrap = false, responsive = false }, ref) => {
    const directionClasses = responsive ? {
        vertical: 'flex flex-col',
        horizontal: 'flex flex-col sm:flex-row'
    } : {
        vertical: 'flex flex-col',
        horizontal: 'flex flex-row'
    };
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    };
    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around'
    };
    const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6'
    };
    return (_jsx("div", { ref: ref, className: cn(directionClasses[direction], alignClasses[align], justifyClasses[justify], gapClasses[gap], wrap && 'flex-wrap', className), children: children }));
});
HiveStack.displayName = 'HiveStack';
// === COMPONENT IA LAYOUT SYSTEM ===
export const HiveComponentIA = React.forwardRef(({ children, className, identity, context, content, metrics, actions, layout = 'profile', responsive = true }, ref) => {
    // Layout patterns based on IA system
    const layoutPatterns = {
        profile: {
            container: responsive
                ? 'flex flex-col sm:flex-row items-start gap-4'
                : 'flex items-start gap-4',
            identityArea: 'flex-shrink-0 sm:w-auto w-full flex justify-center sm:justify-start',
            contentArea: 'flex-1 min-w-0 w-full overflow-hidden space-y-3',
            actionsArea: 'flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0',
            metricsArea: 'w-full border-t border-[var(--hive-border-subtle)] pt-4 mt-4'
        },
        space: {
            container: 'flex flex-col gap-4',
            identityArea: 'flex items-start justify-between gap-4',
            contentArea: 'flex-1 space-y-3',
            actionsArea: 'flex items-center gap-2 flex-wrap',
            metricsArea: 'flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]'
        },
        tool: {
            container: 'flex flex-col gap-4',
            identityArea: 'flex items-center gap-3',
            contentArea: 'flex-1 space-y-2',
            actionsArea: 'flex items-center gap-2',
            metricsArea: 'flex items-center justify-between text-sm'
        },
        feed: {
            container: 'flex flex-col gap-3',
            identityArea: 'flex items-center justify-between',
            contentArea: 'flex-1',
            actionsArea: 'flex items-center gap-4 pt-3 border-t border-[var(--hive-border-subtle)]',
            metricsArea: 'flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]'
        }
    };
    const pattern = layoutPatterns[layout];
    return (_jsxs("div", { ref: ref, className: cn(pattern.container, className), children: [identity && (_jsx("div", { className: pattern.identityArea, children: identity })), _jsxs("div", { className: pattern.contentArea, children: [context && (_jsx("div", { className: "space-y-2", children: context })), content && (_jsx("div", { className: "space-y-3", children: content })), metrics && (_jsx("div", { className: pattern.metricsArea, children: metrics }))] }), actions && (_jsx("div", { className: pattern.actionsArea, children: actions })), children] }));
});
HiveComponentIA.displayName = 'HiveComponentIA';
// === SPECIALIZED LAYOUT COMPONENTS ===
// Profile-specific layout
export const HiveProfileLayout = React.forwardRef(({ avatar, name, handle, context, bio, metrics, actions, className }, ref) => {
    return (_jsx(HiveComponentIA, { ref: ref, layout: "profile", className: className, identity: _jsxs(HiveStack, { direction: "horizontal", align: "center", gap: "md", children: [avatar, _jsxs(HiveStack, { direction: "vertical", gap: "sm", children: [name, handle] })] }), context: context, content: bio, metrics: metrics, actions: actions }));
});
HiveProfileLayout.displayName = 'HiveProfileLayout';
// Space-specific layout  
export const HiveSpaceLayout = React.forwardRef(({ name, category, memberCount, status, description, activity, actions, className }, ref) => {
    return (_jsx(HiveComponentIA, { ref: ref, layout: "space", className: className, identity: _jsxs(HiveStack, { direction: "horizontal", align: "center", justify: "between", className: "w-full", children: [_jsxs(HiveStack, { direction: "vertical", gap: "sm", children: [name, category] }), _jsxs(HiveStack, { direction: "horizontal", align: "center", gap: "sm", children: [memberCount, status] })] }), content: _jsxs(HiveStack, { direction: "vertical", gap: "md", children: [description, activity] }), actions: actions }));
});
HiveSpaceLayout.displayName = 'HiveSpaceLayout';
// Tool-specific layout
export const HiveToolLayout = React.forwardRef(({ icon, name, creator, description, usage, actions, className }, ref) => {
    return (_jsx(HiveComponentIA, { ref: ref, layout: "tool", className: className, identity: _jsxs(HiveStack, { direction: "horizontal", align: "center", gap: "md", children: [icon, _jsxs(HiveStack, { direction: "vertical", gap: "sm", children: [name, creator] })] }), content: description, metrics: usage, actions: actions }));
});
HiveToolLayout.displayName = 'HiveToolLayout';
//# sourceMappingURL=hive-layout-system.js.map