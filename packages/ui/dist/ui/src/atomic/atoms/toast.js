'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Toast - Notification toast primitive
 *
 * Features:
 * - Auto-dismiss after 4 seconds
 * - 4 variants: default, success, error, warning
 * - White glow focus states
 * - Framer Motion animations
 * - Max 3 toasts visible at once (managed by ToastProvider)
 *
 * Based on Radix UI Toast + HIVE design system
 *
 * Usage:
 * ```tsx
 * import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, useToast } from '@hive/ui';
 *
 * // In your app layout
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // In a component
 * const { toast } = useToast();
 *
 * toast({
 *   title: "Space joined!",
 *   description: "You're now a member of CS Study Group",
 *   variant: "success"
 * });
 * ```
 */
import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { XIcon, CheckIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon } from './icon-library.js';
// Toast viewport (container positioned in top-right)
export const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Viewport, { ref: ref, className: cn('fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-0 sm:right-0 sm:max-w-[420px] sm:flex-col', className), ...props })));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
// Toast variants
const toastVariants = cva('group pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-4 py-3 shadow-2xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full', {
    variants: {
        variant: {
            default: 'border-[var(--hive-border-default)]',
            success: 'border-[var(--hive-status-success)]/30 bg-[var(--hive-status-success)]/10',
            error: 'border-[var(--hive-status-error)]/30 bg-[var(--hive-status-error)]/10',
            warning: 'border-[var(--hive-status-warning)]/30 bg-[var(--hive-status-warning)]/10',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
// Toast component
export const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
    return (_jsx(ToastPrimitives.Root, { ref: ref, className: cn(toastVariants({ variant }), className), duration: 4000, ...props }));
});
Toast.displayName = ToastPrimitives.Root.displayName;
// Toast icon (renders based on variant)
export const ToastIcon = React.forwardRef(({ className, variant, ...props }, ref) => {
    const Icon = {
        default: InfoIcon,
        success: CheckIcon,
        error: AlertCircleIcon,
        warning: AlertTriangleIcon,
    }[variant || 'default'];
    const iconColor = {
        default: 'text-[var(--hive-text-secondary)]',
        success: 'text-[var(--hive-status-success)]',
        error: 'text-[var(--hive-status-error)]',
        warning: 'text-[var(--hive-status-warning)]',
    }[variant || 'default'];
    return (_jsx("div", { ref: ref, className: cn('flex-shrink-0', className), ...props, children: _jsx(Icon, { className: cn('h-5 w-5', iconColor) }) }));
});
ToastIcon.displayName = 'ToastIcon';
// Toast action (for interactive toasts)
export const ToastAction = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Action, { ref: ref, className: cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-[var(--hive-border-default)] bg-transparent px-3 text-sm font-medium transition-colors hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] disabled:pointer-events-none disabled:opacity-50', className), ...props })));
ToastAction.displayName = ToastPrimitives.Action.displayName;
// Toast close button
export const ToastClose = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Close, { ref: ref, className: cn('absolute right-2 top-2 rounded-md p-1 text-[var(--hive-text-tertiary)] opacity-0 transition-opacity hover:text-[var(--hive-text-primary)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] group-hover:opacity-100', className), "toast-close": "", ...props, children: _jsx(XIcon, { className: "h-4 w-4" }) })));
ToastClose.displayName = ToastPrimitives.Close.displayName;
// Toast title
export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Title, { ref: ref, className: cn('text-sm font-semibold text-[var(--hive-text-primary)]', className), ...props })));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
// Toast description
export const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(ToastPrimitives.Description, { ref: ref, className: cn('text-sm text-[var(--hive-text-secondary)]', className), ...props })));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
// Toast provider (wraps app)
export const ToastProvider = ToastPrimitives.Provider;
//# sourceMappingURL=toast.js.map