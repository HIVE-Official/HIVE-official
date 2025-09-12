'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';
export class SpaceSurfaceErrorBoundary extends Component {
    state = {
        hasError: false
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        // Log error to monitoring service
        console.error('Space surface error:', error, errorInfo);
        // In production, send to error tracking service
        if (process.env.NODE_ENV === 'production') {
            // TODO: Send to error tracking service (Sentry, etc.)
        }
    }
    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };
    handleGoHome = () => {
        window.location.href = '/';
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "flex flex-col items-center justify-center p-8 bg-red-500/5 border border-red-500/20 rounded-xl", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6", children: _jsx(AlertTriangle, { className: "h-8 w-8 text-red-400" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-inverse)] mb-2", children: this.props.surfaceName ? `${this.props.surfaceName} Error` : 'Something went wrong' }), _jsx("p", { className: "text-sm text-neutral-400 text-center mb-6 max-w-md", children: this.props.surfaceName
                            ? `There was a problem loading the ${this.props.surfaceName.toLowerCase()} section.`
                            : 'An unexpected error occurred. Please try refreshing or contact support if the problem persists.' }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs("details", { className: "mb-6 w-full max-w-md", children: [_jsx("summary", { className: "text-xs text-neutral-500 cursor-pointer hover:text-neutral-400", children: "Error Details (Development Only)" }), _jsxs("pre", { className: "text-xs text-red-400 bg-red-900/10 p-3 rounded-lg mt-2 overflow-auto", children: [this.state.error instanceof Error ? this.state.error.message : String(this.state.error), this.state.errorInfo?.componentStack && (_jsxs(_Fragment, { children: ['\n\nComponent Stack:', this.state.errorInfo.componentStack] }))] })] })), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(motion.button, { onClick: this.handleRetry, className: "flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Try Again"] }), _jsxs(motion.button, { onClick: this.handleGoHome, className: "flex items-center gap-2 px-4 py-2 bg-white/5 text-neutral-400 border border-white/10 rounded-lg hover:bg-white/10 transition-colors", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Home, { className: "h-4 w-4" }), "Go Home"] })] })] }));
        }
        return this.props.children;
    }
}
// Hook version for functional components
export function useSpaceSurfaceErrorHandler(surfaceName) {
    return React.useCallback((error, errorInfo) => {
        console.error(`${surfaceName || 'Space surface'} error:`, error, errorInfo);
        // In production, send to error tracking service
        if (process.env.NODE_ENV === 'production') {
            // TODO: Send to error tracking service (Sentry, etc.)
        }
    }, [surfaceName]);
}
export default SpaceSurfaceErrorBoundary;
//# sourceMappingURL=space-surface-error-boundary.js.map