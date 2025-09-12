'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
// HIVE Alert Component - Campus-Ready Feedback System
// Designed for mobile-first student experience with HIVE brand tokens
const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
        variant: {
            // Default informational alert
            default: [
                "border-[var(--hive-border-primary)]",
                "bg-[var(--hive-background-secondary)]",
                "text-[var(--hive-text-primary)]",
                "[&>svg]:text-[var(--hive-text-secondary)]"
            ],
            // Success alerts for achievements, completions
            success: [
                "border-[var(--hive-status-success)]",
                "bg-[color-mix(in_srgb,var(--hive-status-success)_5%,var(--hive-background-secondary))]",
                "text-[var(--hive-status-success)]",
                "[&>svg]:text-[var(--hive-status-success)]"
            ],
            // Warning alerts for important notices
            warning: [
                "border-[var(--hive-status-warning)]",
                "bg-[color-mix(in_srgb,var(--hive-status-warning)_5%,var(--hive-background-secondary))]",
                "text-[var(--hive-status-warning)]",
                "[&>svg]:text-[var(--hive-status-warning)]"
            ],
            // Error alerts for failures, conflicts
            error: [
                "border-[var(--hive-status-error)]",
                "bg-[color-mix(in_srgb,var(--hive-status-error)_5%,var(--hive-background-secondary))]",
                "text-[var(--hive-status-error)]",
                "[&>svg]:text-[var(--hive-status-error)]"
            ],
            // Info alerts for neutral information
            info: [
                "border-[var(--hive-status-info)]",
                "bg-[color-mix(in_srgb,var(--hive-status-info)_5%,var(--hive-background-secondary))]",
                "text-[var(--hive-status-info)]",
                "[&>svg]:text-[var(--hive-status-info)]"
            ],
            // HIVE brand alerts for special features
            hive: [
                "border-[var(--hive-brand-primary)]",
                "bg-[color-mix(in_srgb,var(--hive-brand-primary)_5%,var(--hive-background-secondary))]",
                "text-[var(--hive-brand-primary)]",
                "[&>svg]:text-[var(--hive-brand-primary)]",
                "shadow-[0_0_20px_var(--hive-overlay-orange-subtle)]"
            ]
        },
        size: {
            sm: "px-3 py-2 text-xs",
            default: "px-4 py-3 text-sm",
            lg: "px-6 py-4 text-base"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Alert = React.forwardRef(({ className, variant, size, dismissible, onDismiss, icon, children, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, role: "alert", className: cn(alertVariants({ variant, size }), className), ...props, children: [icon, _jsx("div", { className: "flex-1", children: children }), dismissible && (_jsx("button", { type: "button", onClick: onDismiss, className: "absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", "aria-label": "Close alert", children: _jsx(CloseIcon, {}) }))] }));
});
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h5", { ref: ref, className: cn("mb-1 font-semibold leading-none tracking-tight", className), ...props })));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("text-sm [&_p]:leading-relaxed opacity-90", className), ...props })));
AlertDescription.displayName = "AlertDescription";
// Icon Components for Different Alert Types
export const AlertIcons = {
    Success: () => (_jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })),
    Warning: () => (_jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" }) })),
    Error: () => (_jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" }) })),
    Info: () => (_jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" }) })),
    HIVE: () => (_jsxs("svg", { className: "h-4 w-4", fill: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" }), _jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" })] }))
};
// Close Icon Component
const CloseIcon = () => (_jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }));
// Preset Alert Components for Common Campus Use Cases
export const CampusAlerts = {
    // For academic achievements
    AchievementAlert: ({ children, ...props }) => (_jsx(Alert, { variant: "success", icon: _jsx(AlertIcons.Success, {}), ...props, children: children })),
    // For course deadlines and important dates
    DeadlineAlert: ({ children, ...props }) => (_jsx(Alert, { variant: "warning", icon: _jsx(AlertIcons.Warning, {}), ...props, children: children })),
    // For system issues or errors
    SystemAlert: ({ children, ...props }) => (_jsx(Alert, { variant: "error", icon: _jsx(AlertIcons.Error, {}), ...props, children: children })),
    // For general information
    InfoAlert: ({ children, ...props }) => (_jsx(Alert, { variant: "info", icon: _jsx(AlertIcons.Info, {}), ...props, children: children })),
    // For HIVE-specific features and updates
    HIVEAlert: ({ children, ...props }) => (_jsx(Alert, { variant: "hive", icon: _jsx(AlertIcons.HIVE, {}), ...props, children: children }))
};
export { Alert, AlertTitle, AlertDescription, alertVariants };
//# sourceMappingURL=alert.js.map