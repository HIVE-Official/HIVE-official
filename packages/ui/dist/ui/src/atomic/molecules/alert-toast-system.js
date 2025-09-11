'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button-enhanced';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Card } from '../ui/card';
// Alert Component
export function Alert({ variant = 'default', size = 'md', title, description, icon, dismissible = false, onDismiss, actions, className, children }) {
    const getVariantStyles = (variant) => {
        switch (variant) {
            case 'success':
                return 'bg-[var(--hive-status-success)]/10 border-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]';
            case 'warning':
                return 'bg-[var(--hive-status-warning)]/10 border-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]';
            case 'error':
                return 'bg-[var(--hive-status-error)]/10 border-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]';
            case 'info':
                return 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]';
            default:
                return 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-primary)]';
        }
    };
    const getDefaultIcon = (variant) => {
        switch (variant) {
            case 'success':
                return _jsx(CheckCircle, { className: "h-4 w-4" });
            case 'warning':
                return _jsx(AlertTriangle, { className: "h-4 w-4" });
            case 'error':
                return _jsx(AlertCircle, { className: "h-4 w-4" });
            case 'info':
                return _jsx(Info, { className: "h-4 w-4" });
            default:
                return null;
        }
    };
    const sizeClasses = {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg'
    };
    return (_jsx(Card, { className: cn('border rounded-lg', getVariantStyles(variant), sizeClasses[size], className), children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: icon || getDefaultIcon(variant) }), _jsxs("div", { className: "ml-3 flex-1", children: [title && (_jsx("h3", { className: "text-sm font-medium mb-1", children: title })), description && (_jsx("div", { className: "text-sm opacity-90 mb-2", children: description })), children && (_jsx("div", { className: "mt-2", children: children })), actions && (_jsx("div", { className: "mt-3", children: actions }))] }), dismissible && onDismiss && (_jsx("div", { className: "flex-shrink-0 ml-4", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: onDismiss, "aria-label": "Dismiss", children: _jsx(X, { className: "h-4 w-4" }) }) }))] }) }));
}
// Toast Context
const ToastContext = createContext(undefined);
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
// Toast Provider
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };
        setToasts(current => [...current, newToast]);
        // Auto remove toast after duration
        if (toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }
    }, []);
    const removeToast = useCallback((id) => {
        setToasts(current => current.filter(toast => toast.id !== id));
    }, []);
    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);
    return (_jsxs(ToastContext.Provider, { value: { toasts, addToast, removeToast, clearAll }, children: [children, _jsx(ToastContainer, {})] }));
}
// Individual Toast Component
function Toast({ id, variant = 'default', title, description, icon, dismissible = true, action }) {
    const { removeToast } = useToast();
    const getVariantStyles = (variant) => {
        switch (variant) {
            case 'success':
                return 'bg-[var(--hive-status-success)] text-[var(--hive-text-inverse)]';
            case 'warning':
                return 'bg-[var(--hive-status-warning)] text-[var(--hive-text-inverse)]';
            case 'error':
                return 'bg-[var(--hive-status-error)] text-[var(--hive-text-inverse)]';
            case 'info':
                return 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]';
            default:
                return 'bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] border border-[var(--hive-border-default)]';
        }
    };
    const getDefaultIcon = (variant) => {
        switch (variant) {
            case 'success':
                return _jsx(CheckCircle, { className: "h-5 w-5" });
            case 'warning':
                return _jsx(AlertTriangle, { className: "h-5 w-5" });
            case 'error':
                return _jsx(AlertCircle, { className: "h-5 w-5" });
            case 'info':
                return _jsx(Info, { className: "h-5 w-5" });
            default:
                return null;
        }
    };
    return (_jsx(Card, { className: cn('p-4 shadow-lg animate-in slide-in-from-right-full', getVariantStyles(variant)), children: _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex-shrink-0", children: icon || getDefaultIcon(variant) }), _jsxs("div", { className: "ml-3 flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: title }), description && (_jsx("p", { className: "mt-1 text-sm opacity-90", children: description })), action && (_jsx("div", { className: "mt-3", children: _jsx(Button, { variant: "secondary", size: "sm", onClick: action.onClick, children: action.label }) }))] }), dismissible && (_jsx("div", { className: "flex-shrink-0 ml-4", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeToast(id), "aria-label": "Dismiss", children: _jsx(X, { className: "h-4 w-4" }) }) }))] }) }));
}
// Toast Container
function ToastContainer() {
    const { toasts } = useToast();
    if (toasts.length === 0)
        return null;
    return (_jsx("div", { className: "fixed top-0 right-0 z-50 w-full max-w-sm p-4 space-y-2 pointer-events-none", children: toasts.map((toast) => (_jsx("div", { className: "pointer-events-auto", children: _jsx(Toast, { ...toast }) }, toast.id))) }));
}
// Helper functions for common toast patterns
export const toast = {
    success: (title, description, options) => ({
        variant: 'success',
        title,
        description,
        ...options
    }),
    error: (title, description, options) => ({
        variant: 'error',
        title,
        description,
        ...options
    }),
    warning: (title, description, options) => ({
        variant: 'warning',
        title,
        description,
        ...options
    }),
    info: (title, description, options) => ({
        variant: 'info',
        title,
        description,
        ...options
    }),
    default: (title, description, options) => ({
        variant: 'default',
        title,
        description,
        ...options
    })
};
// Alert presets for common use cases
export const AlertPresets = {
    // Error boundary alert
    ErrorBoundary: (props) => (_jsx(Alert, { variant: "error", dismissible: false, ...props })),
    // Success confirmation
    Success: (props) => (_jsx(Alert, { variant: "success", ...props })),
    // Warning notification
    Warning: (props) => (_jsx(Alert, { variant: "warning", ...props })),
    // Information notice
    Info: (props) => (_jsx(Alert, { variant: "info", ...props }))
};
//# sourceMappingURL=alert-toast-system.js.map