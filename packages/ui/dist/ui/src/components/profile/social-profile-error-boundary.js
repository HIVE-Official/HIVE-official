/**
 * Social Profile Error Boundary
 * Provides comprehensive error handling for social profile components
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { motion } from '../../lib/motion';
import { butterClasses } from '../../lib/motion';
import '../../styles/social-profile.css';
export class SocialProfileErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.maxRetries = 3;
        this.handleRetry = () => {
            if (this.state.retryCount < this.maxRetries) {
                this.setState(prevState => ({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                    retryCount: prevState.retryCount + 1
                }));
            }
        };
        this.handleReset = () => {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
                retryCount: 0
            });
        };
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            retryCount: 0
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        // Call error callback if provided
        this.props.onError?.(error, errorInfo);
        // Log error for monitoring (in production, this would go to your error tracking service)
        console.error('Social Profile Error Boundary caught an error:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            context: this.props.context
        });
    }
    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }
            const canRetry = this.state.retryCount < this.maxRetries;
            const contextName = this.props.context || 'Profile Component';
            return (_jsx(motion.div, { className: cn("social-profile-card error-boundary-card", butterClasses.card), initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, children: _jsxs("div", { className: "flex flex-col items-center justify-center text-center p-8", children: [_jsx(motion.div, { initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }, children: _jsx(AlertCircle, { size: 48, className: "text-red-400 mb-4" }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2, duration: 0.3 }, children: [_jsx("h3", { className: "profile-heading text-primary mb-2", children: "Something went wrong" }), _jsxs("p", { className: "profile-body text-secondary mb-6", children: [contextName, " encountered an unexpected error"] })] }), _jsxs(motion.div, { className: "space-y-3 w-full max-w-xs", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.3 }, children: [canRetry && (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { onClick: this.handleRetry, className: cn("social-action-button w-full", butterClasses.button), children: [_jsx(RefreshCw, { size: 16 }), "Try Again (", this.maxRetries - this.state.retryCount, " left)"] }) })), _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { onClick: this.handleReset, variant: "outline", className: cn("social-action-button secondary w-full", butterClasses.button), children: [_jsx(Home, { size: 16 }), "Reset Component"] }) })] }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs(motion.details, { className: "mt-6 w-full text-left", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4, duration: 0.3 }, children: [_jsx("summary", { className: "cursor-pointer text-xs text-tertiary hover:text-secondary", children: "Developer Info (click to expand)" }), _jsxs("div", { className: "mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-xs font-mono text-red-400 overflow-auto max-h-32", children: [_jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: "Error:" }), " ", this.state.error.message] }), this.state.errorInfo && (_jsxs("div", { children: [_jsx("strong", { children: "Component Stack:" }), _jsx("pre", { className: "whitespace-pre-wrap text-xs", children: this.state.errorInfo.componentStack })] }))] })] }))] }) }));
        }
        return this.props.children;
    }
}
// Higher-order component for easy wrapping
export function withSocialProfileErrorBoundary(Component, context, fallback) {
    const WrappedComponent = (props) => (_jsx(SocialProfileErrorBoundary, { context: context, fallback: fallback, children: _jsx(Component, { ...props }) }));
    WrappedComponent.displayName = `withSocialProfileErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}
export default SocialProfileErrorBoundary;
//# sourceMappingURL=social-profile-error-boundary.js.map