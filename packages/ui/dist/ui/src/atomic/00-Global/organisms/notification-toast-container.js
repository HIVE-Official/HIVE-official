'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/lib/utils';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { CheckCircleIcon, AlertTriangleIcon, InfoIcon, XIcon, } from '../../00-Global/atoms/index.js';
const getToastIcon = (type) => {
    switch (type) {
        case 'success':
            return _jsx(CheckCircleIcon, { className: "h-5 w-5 text-emerald-400" });
        case 'error':
            return _jsx(AlertTriangleIcon, { className: "h-5 w-5 text-red-400" });
        case 'warning':
            return _jsx(AlertTriangleIcon, { className: "h-5 w-5 text-yellow-400" });
        case 'info':
            return _jsx(InfoIcon, { className: "h-5 w-5 text-blue-400" });
    }
};
const getToastStyles = (type) => {
    switch (type) {
        case 'success':
            return 'border-emerald-500/40 bg-emerald-500/10';
        case 'error':
            return 'border-red-500/40 bg-red-500/10';
        case 'warning':
            return 'border-yellow-500/40 bg-yellow-500/10';
        case 'info':
            return 'border-blue-500/40 bg-blue-500/10';
    }
};
const getPositionStyles = (position) => {
    switch (position) {
        case 'top-left':
            return 'top-0 left-0 flex-col';
        case 'top-center':
            return 'top-0 left-1/2 -translate-x-1/2 flex-col';
        case 'top-right':
            return 'top-0 right-0 flex-col';
        case 'bottom-left':
            return 'bottom-0 left-0 flex-col-reverse';
        case 'bottom-center':
            return 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse';
        case 'bottom-right':
            return 'bottom-0 right-0 flex-col-reverse';
        default:
            return 'top-0 right-0 flex-col';
    }
};
export const NotificationToastContainer = React.forwardRef(({ notifications, onClose, maxVisible = 3, position = 'top-right' }, ref) => {
    const visibleNotifications = notifications.slice(0, maxVisible);
    return (_jsxs(ToastPrimitive.Provider, { swipeDirection: "right", children: [_jsx("div", { ref: ref, className: cn('fixed z-[100] flex gap-3 p-6', getPositionStyles(position)), children: visibleNotifications.map((notification) => (_jsxs(ToastPrimitive.Root, { duration: notification.duration || 4000, onOpenChange: (open) => {
                        if (!open) {
                            onClose?.(notification.id);
                        }
                    }, className: cn('group pointer-events-auto relative flex w-full max-w-md items-start gap-3 overflow-hidden rounded-2xl border p-4 shadow-lg transition-all', 'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full', 'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full', 'backdrop-blur-md', getToastStyles(notification.type)), children: [_jsx("div", { className: "shrink-0 pt-0.5", children: getToastIcon(notification.type) }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsx(ToastPrimitive.Title, { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: notification.title }), notification.description && (_jsx(ToastPrimitive.Description, { className: "text-sm text-[var(--hive-text-secondary)]", children: notification.description }))] }), _jsxs(ToastPrimitive.Close, { className: "shrink-0 rounded-lg p-1 text-[var(--hive-text-tertiary)] opacity-0 transition-opacity hover:text-[var(--hive-text-primary)] group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)]", onClick: () => onClose?.(notification.id), children: [_jsx(XIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close" })] })] }, notification.id))) }), _jsx(ToastPrimitive.Viewport, {})] }));
});
NotificationToastContainer.displayName = 'NotificationToastContainer';
//# sourceMappingURL=notification-toast-container.js.map