"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
export const Alert = ({ children, variant = 'default', className }) => {
    return (_jsx("div", { className: cn('relative w-full rounded-lg border p-4', variant === 'default' && 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-primary)]', variant === 'destructive' && 'bg-[var(--hive-status-error)]/10 border-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]', className), children: children }));
};
export const AlertTitle = ({ children, className }) => {
    return (_jsx("h5", { className: cn('mb-1 font-medium leading-none tracking-tight', className), children: children }));
};
export const AlertDescription = ({ children, className }) => {
    return (_jsx("div", { className: cn('text-sm [&_p]:leading-relaxed', className), children: children }));
};
//# sourceMappingURL=alert.js.map