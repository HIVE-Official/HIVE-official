import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Profile Layout System - Brand Consistent
 * Campus Command Center layout with HIVE's gold/black branding
 * Built for University at Buffalo students
 */
import * as React from 'react';
import { cn } from '../../lib/utils.js';
// === HIVE PROFILE LAYOUT ===
export const SimpleProfileLayout = React.forwardRef(({ variant = 'header', children, className }, ref) => {
    const variantClasses = {
        header: 'space-y-6',
        card: 'bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-subtle)] p-6 shadow-lg backdrop-blur-sm',
        dashboard: 'space-y-8 p-6 bg-[var(--hive-bg-primary)] rounded-xl'
    };
    return (_jsx("div", { ref: ref, className: cn(variantClasses[variant], className), children: children }));
});
SimpleProfileLayout.displayName = 'SimpleProfileLayout';
// === SIMPLE PROFILE CONTENT ===
export const SimpleProfileContent = React.forwardRef(({ children, className }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex-1 min-w-0 overflow-hidden space-y-3', className), children: children }));
});
SimpleProfileContent.displayName = 'SimpleProfileContent';
// === SIMPLE PROFILE ACTIONS ===
export const SimpleProfileActions = React.forwardRef(({ children, className }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex-shrink-0 w-full sm:w-auto', className), children: children }));
});
SimpleProfileActions.displayName = 'SimpleProfileActions';
// === SIMPLE PROFILE GRID ===
export const SimpleProfileGrid = React.forwardRef(({ columns = 2, children, className }, ref) => {
    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-4'
    };
    return (_jsx("div", { ref: ref, className: cn('grid gap-3 sm:gap-4 md:gap-6', gridClasses[columns], className), children: children }));
});
SimpleProfileGrid.displayName = 'SimpleProfileGrid';
// === SIMPLE IDENTITY LAYOUT ===
export const SimpleProfileIdentity = React.forwardRef(({ avatar, info, actions, layout = 'horizontal', className }, ref) => {
    const layoutClasses = layout === 'horizontal'
        ? 'flex flex-col sm:flex-row items-start gap-4'
        : 'flex flex-col items-center text-center gap-3';
    return (_jsxs("div", { ref: ref, className: cn(layoutClasses, className), children: [_jsx("div", { className: "flex-shrink-0 sm:w-auto w-full flex justify-center sm:justify-start", children: avatar }), _jsx("div", { className: "flex-1 min-w-0 w-full overflow-hidden", children: info }), actions && (_jsx("div", { className: "flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0", children: actions }))] }));
});
SimpleProfileIdentity.displayName = 'SimpleProfileIdentity';
//# sourceMappingURL=simple-layout-system.js.map