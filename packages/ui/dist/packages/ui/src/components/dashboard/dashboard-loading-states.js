"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../hive-button';
// Simple loading skeleton
export function DashboardSkeleton({ className = "" }) {
    return (_jsxs("div", { className: `dashboard-skeleton space-y-6 ${className}`, role: "status", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded animate-pulse" }), _jsx("div", { className: "h-32 bg-gray-200 rounded animate-pulse" }), _jsx("div", { className: "h-64 bg-gray-200 rounded animate-pulse" })] }));
}
// Widget skeleton
export function WidgetSkeleton({ className = "" }) {
    return (_jsx(Card, { className: `widget-skeleton ${className}`, children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse mb-2" }), _jsx("div", { className: "h-8 bg-gray-200 rounded animate-pulse" })] }) }));
}
// Error component
export function DashboardError({ error, onRetry, className = "" }) {
    return (_jsx(Card, { className: `dashboard-error ${className}`, children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(AlertTriangle, { className: "h-8 w-8 text-red-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-gray-600 mb-4", children: typeof error.error === 'string' ? error.error : 'An unexpected error occurred' }), onRetry && (_jsxs(Button, { onClick: onRetry, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Try Again"] }))] }) }));
}
// Loading progress
export function LoadingProgress({ state, className = "" }) {
    return (_jsx(Card, { className: `loading-progress ${className}`, children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(RefreshCw, { className: "h-6 w-6 animate-spin" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium", children: state.message || 'Loading...' }), state.progress && (_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mt-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all duration-300", style: { width: `${state.progress}%` } }) }))] })] }) }) }));
}
// Connection status
export function ConnectionStatus({ state, onReconnect, className = "" }) {
    return (_jsx(Card, { className: `connection-status ${className}`, children: _jsx(CardContent, { className: "p-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [state.isOnline ? (_jsx(Wifi, { className: "h-4 w-4 text-green-400" })) : (_jsx(WifiOff, { className: "h-4 w-4 text-red-400" })), _jsx("span", { className: "text-sm", children: state.isOnline ? 'Connected' : 'Offline' })] }), !state.isConnected && onReconnect && (_jsx(Button, { variant: "outline", size: "sm", onClick: onReconnect, children: "Reconnect" }))] }) }) }));
}
// Accessibility announcer
export function AccessibilityAnnouncer({ message, type = 'polite' }) {
    return (_jsx("div", { role: "status", "aria-live": type, "aria-atomic": "true", className: "sr-only", children: message }));
}
// Empty state
export function EmptyState({ icon: Icon, title, description, action, className = "" }) {
    return (_jsx(Card, { className: `empty-state ${className}`, children: _jsxs(CardContent, { className: "p-12 text-center", children: [_jsx(Icon, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: title }), _jsx("p", { className: "text-gray-600 mb-6", children: description }), action && _jsx("div", { children: action })] }) }));
}
export default {
    DashboardSkeleton,
    WidgetSkeleton,
    DashboardError,
    LoadingProgress,
    ConnectionStatus,
    AccessibilityAnnouncer,
    EmptyState
};
//# sourceMappingURL=dashboard-loading-states.js.map