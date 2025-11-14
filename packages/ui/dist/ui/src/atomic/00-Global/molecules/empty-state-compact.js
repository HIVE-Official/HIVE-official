'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/lib/utils';
import { SparklesIcon } from '../../00-Global/atoms/icon-library.js';
import { Button } from '../../00-Global/atoms/button.js';
export const EmptyStateCompact = React.forwardRef(({ icon, title, description, actionLabel, onAction, className }, ref) => {
    const contentIcon = React.useMemo(() => {
        if (icon === null)
            return null;
        if (icon)
            return icon;
        return _jsx(SparklesIcon, { className: "h-6 w-6 text-[var(--hive-brand-primary)]", "aria-hidden": "true" });
    }, [icon]);
    return (_jsxs("div", { ref: ref, className: cn('flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-6 py-8 text-center shadow-lg shadow-black/10', className), children: [contentIcon ? (_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-[var(--hive-brand-primary)]/10", children: contentIcon })) : null, _jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-base font-semibold text-[var(--hive-text-primary)]", children: title }), description ? (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed", children: description })) : null] }), actionLabel ? (_jsx(Button, { size: "md", variant: "secondary", onClick: onAction, children: actionLabel })) : null] }));
});
EmptyStateCompact.displayName = 'EmptyStateCompact';
//# sourceMappingURL=empty-state-compact.js.map