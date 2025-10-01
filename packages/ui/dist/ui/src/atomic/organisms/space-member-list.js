'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Space Member List
 *
 * List of space members with filters
 */
const spacememberlistVariants = cva('relative w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]', {
    variants: {
        variant: {
            default: 'border-[var(--hive-border-default)]',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
export const SpaceMemberList = React.forwardRef(({ className, variant, isLoading = false, error, ...props }, ref) => {
    if (isLoading) {
        return (_jsx("div", { ref: ref, className: cn(spacememberlistVariants({ variant }), className), ...props, children: _jsxs("div", { className: "animate-pulse space-y-3", children: [_jsx("div", { className: "h-4 bg-[var(--hive-surface-secondary)] rounded" }), _jsx("div", { className: "h-4 bg-[var(--hive-surface-secondary)] rounded w-3/4" })] }) }));
    }
    if (error) {
        return (_jsx("div", { ref: ref, className: cn(spacememberlistVariants({ variant }), 'border-[var(--hive-error)]', className), ...props, children: _jsxs("p", { className: "text-[var(--hive-error)]", children: ["Error: ", error] }) }));
    }
    return (_jsx("div", { ref: ref, className: cn(spacememberlistVariants({ variant }), className), ...props, children: _jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-2xl mb-2", children: "\uD83C\uDFA8" }), _jsx("p", { className: "text-[var(--hive-text-primary)] font-semibold mb-1", children: "Space Member List" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: "List of space members with filters" }), _jsx("div", { className: "p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]", children: "\u26A0\uFE0F SKELETON: UI/UX to be designed in Storybook review" })] }) }));
});
SpaceMemberList.displayName = 'SpaceMemberList';
//# sourceMappingURL=space-member-list.js.map