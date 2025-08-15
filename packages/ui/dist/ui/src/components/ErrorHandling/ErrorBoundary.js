'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../../atomic/atoms/button';
// Campus-aware error handler with empathetic messaging
class HiveErrorHandler {
    static handleError(error, errorInfo, context) {
        const timestamp = new Date();
        const isNetworkError = error.message.toLowerCase().includes('network') ||
            error.message.toLowerCase().includes('fetch');
        const isAuthError = error.message.toLowerCase().includes('auth') ||
            error.message.toLowerCase().includes('unauthorized');
        // Determine error category and generate student-friendly messaging
        let category = 'unknown';
        let severity = 'error';
        let studentFriendly;
        let recovery;
        if (isNetworkError) {
            category = 'network';
            severity = 'warning';
            studentFriendly = {
                title: "Connection hiccup!",
                description: this.campusMessages.network.poor,
                encouragement: "These things happen on campus - let's try again!",
                nextSteps: [
                    "Check if you're connected to campus Wi-Fi",
                    "Try refreshing the page",
                    "Switch to mobile data if available"
                ]
            };
            recovery = {
                isRetryable: true,
                action: 'retry',
                customMessage: "Retry connection"
            };
        }
        else if (isAuthError) {
            category = 'auth';
            severity = 'warning';
            studentFriendly = {
                title: "Quick sign-in needed",
                description: this.campusMessages.auth.expired,
                encouragement: "Your data is safe - just need to verify it's you!"
            };
            recovery = {
                isRetryable: true,
                action: 'sign-in',
                actionUrl: '/auth/login'
            };
        }
        else {
            // Generic error with encouraging tone
            studentFriendly = {
                title: "Something unexpected happened",
                description: "Don't worry - this isn't your fault! Our team gets notified about these issues automatically.",
                encouragement: "HIVE is built for students like you, and we're always working to make it better.",
                nextSteps: [
                    "Try refreshing the page",
                    "Check back in a few minutes",
                    "Reach out if this keeps happening"
                ]
            };
            recovery = {
                isRetryable: true,
                action: 'retry'
            };
        }
        return {
            message: error.message,
            code: error.name || 'UNKNOWN_ERROR',
            severity,
            category,
            context: {
                userId: context?.user?.id,
                campusId: context?.campus?.id,
                pageType: context?.pageType,
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
                timestamp
            },
            recovery,
            studentFriendly
        };
    }
    static getErrorIcon(category, severity) {
        const iconMap = {
            network: { emoji: '📶', color: 'text-hive-gold' },
            auth: { emoji: '🔐', color: 'text-hive-emerald' },
            permission: { emoji: '🚧', color: 'text-hive-amber' },
            validation: { emoji: '✨', color: 'text-hive-purple' },
            system: { emoji: '🔧', color: 'text-hive-blue' },
            campus: { emoji: '🏢', color: 'text-hive-green' },
            unknown: { emoji: '🤔', color: 'text-hive-text-secondary' }
        };
        return iconMap[category] || iconMap.unknown;
    }
}
HiveErrorHandler.campusMessages = {
    network: {
        poor: "Looks like the campus Wi-Fi is having a moment 😅",
        timeout: "The connection timed out - campus networks can be tricky!",
        offline: "You're offline right now, but don't worry - some features still work!"
    },
    auth: {
        expired: "Your session expired - happens to the best of us!",
        invalid: "Let's get you signed back in to your HIVE account",
        permissions: "You don't have access to this yet - but you can request it!"
    },
    campus: {
        maintenance: "The campus systems are getting some love right now",
        capacity: "Lots of students are using HIVE right now - that's awesome!",
        integration: "We're having trouble connecting to your campus systems"
    }
};
export class HiveErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.reportError = async (error, errorInfo, hiveError) => {
            try {
                // This would integrate with your error reporting service
                // await errorReportingService.report({
                //   error,
                //   errorInfo,
                //   hiveError,
                //   errorId: this.state.errorId,
                //   context: this.props.context
                // });
                console.log('Error reported to tracking service');
            }
            catch (reportingError) {
                console.warn('Failed to report error:', reportingError);
            }
        };
        this.handleRetry = () => {
            this.setState(prevState => ({
                hasError: false,
                error: null,
                hiveError: null,
                errorId: '',
                retryCount: prevState.retryCount + 1
            }));
        };
        this.handleAction = (action, actionUrl) => {
            switch (action) {
                case 'retry':
                    this.handleRetry();
                    break;
                case 'refresh':
                    window.location.reload();
                    break;
                case 'navigate':
                    if (actionUrl) {
                        window.location.href = actionUrl;
                    }
                    break;
                case 'sign-in':
                    window.location.href = actionUrl || '/auth/login';
                    break;
                case 'join-waitlist':
                    window.location.href = actionUrl || '/waitlist';
                    break;
                case 'contact-support':
                    // Could open a modal or navigate to support page
                    console.log('Contact support requested', { errorId: this.state.errorId });
                    break;
            }
        };
        this.state = {
            hasError: false,
            error: null,
            hiveError: null,
            errorId: '',
            retryCount: 0
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorId: `hive-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
    }
    componentDidCatch(error, errorInfo) {
        const hiveError = HiveErrorHandler.handleError(error, errorInfo, this.props.context);
        this.setState({ hiveError });
        // Log to console with context
        console.group('🐝 HIVE Error Boundary');
        console.error('Original Error:', error);
        console.error('Error Info:', errorInfo);
        console.log('HIVE Error Analysis:', hiveError);
        console.log('Error ID:', this.state.errorId);
        console.groupEnd();
        // Call the optional onError prop
        this.props.onError?.(error, errorInfo, hiveError);
        // Report to error tracking service (if enabled)
        if (this.props.enableErrorReporting) {
            this.reportError(error, errorInfo, hiveError);
        }
    }
    render() {
        if (this.state.hasError && this.state.hiveError) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.hiveError, this.handleRetry, this.props.context);
            }
            return (_jsx(HiveErrorFallback, { error: this.state.hiveError, errorId: this.state.errorId, retryCount: this.state.retryCount, onAction: this.handleAction, showDebugInfo: this.props.showDebugInfo || process.env.NODE_ENV === 'development', context: this.props.context }));
        }
        return this.props.children;
    }
}
function HiveErrorFallback({ error, errorId, retryCount, onAction, showDebugInfo = false, context }) {
    const { emoji, color } = HiveErrorHandler.getErrorIcon(error.category, error.severity);
    const severityColors = {
        critical: 'border-red-500/30 bg-red-500/5',
        error: 'border-orange-500/30 bg-orange-500/5',
        warning: 'border-hive-gold/30 bg-hive-gold/5',
        info: 'border-hive-blue/30 bg-hive-blue/5'
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-hive-background-primary", children: _jsxs("div", { className: cn('max-w-md w-full border rounded-xl p-8 text-center space-y-6', 'backdrop-blur-xl bg-hive-background-primary/90', severityColors[error.severity]), children: [_jsx("div", { className: "mx-auto w-20 h-20 rounded-full bg-hive-background-secondary/50 flex items-center justify-center border border-hive-border-default/20", children: _jsx("span", { className: "text-4xl", role: "img", "aria-label": "Error icon", children: emoji }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "heading-lg", color: "primary", className: "font-semibold", children: error.studentFriendly.title }), _jsx(Text, { variant: "body-md", color: "secondary", className: "leading-relaxed", children: error.studentFriendly.description }), error.studentFriendly.encouragement && (_jsx(Text, { variant: "body-sm", color: "secondary", className: "italic text-hive-gold", children: error.studentFriendly.encouragement }))] }), _jsxs("div", { className: "space-y-3", children: [error.recovery.isRetryable && (_jsxs(Button, { variant: "primary", onClick: () => onAction(error.recovery.action || 'retry', error.recovery.actionUrl), className: "w-full", disabled: retryCount >= 3, children: [error.recovery.customMessage || {
                                    retry: 'Try Again',
                                    refresh: 'Refresh Page',
                                    navigate: 'Go Back',
                                    'sign-in': 'Sign In',
                                    'join-waitlist': 'Join Waitlist',
                                    'contact-support': 'Get Help'
                                }[error.recovery.action || 'retry'], retryCount > 0 && ` (${retryCount + 1})`] })), retryCount >= 3 && (_jsx(Button, { variant: "ghost", onClick: () => onAction('contact-support'), className: "w-full text-hive-text-secondary", children: "This keeps happening - Get Help" })), _jsx(Button, { variant: "ghost", onClick: () => window.location.href = '/', className: "w-full text-hive-text-secondary", children: "Take me home" })] }), error.studentFriendly.nextSteps && error.studentFriendly.nextSteps.length > 0 && (_jsxs("div", { className: "text-left space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium", children: "What you can try:" }), _jsx("ul", { className: "space-y-1", children: error.studentFriendly.nextSteps.map((step, index) => (_jsxs("li", { className: "flex items-start text-sm text-hive-text-secondary", children: [_jsx("span", { className: "mr-2 text-hive-gold", children: "\u2022" }), step] }, index))) })] })), context?.user && (_jsx("div", { className: "text-xs text-hive-text-secondary border-t border-hive-border-default/10 pt-4", children: _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Hey ", context.user.name?.split(' ')[0] || 'there', "! If this keeps happening, screenshot this and reach out to support."] }) })), showDebugInfo && (_jsxs("details", { className: "text-left text-xs border-t border-hive-border-default/10 pt-4", children: [_jsx("summary", { className: "cursor-pointer font-medium text-hive-text-secondary mb-2", children: "Debug Info (for developers)" }), _jsxs("div", { className: "bg-hive-background-secondary/30 rounded p-3 font-mono space-y-1 text-hive-text-secondary", children: [_jsxs("div", { children: [_jsx("strong", { children: "Error ID:" }), " ", errorId] }), _jsxs("div", { children: [_jsx("strong", { children: "Code:" }), " ", error.code] }), _jsxs("div", { children: [_jsx("strong", { children: "Category:" }), " ", error.category] }), _jsxs("div", { children: [_jsx("strong", { children: "Severity:" }), " ", error.severity] }), _jsxs("div", { children: [_jsx("strong", { children: "Retry Count:" }), " ", retryCount] }), _jsxs("div", { children: [_jsx("strong", { children: "Timestamp:" }), " ", error.context?.timestamp?.toISOString()] }), context?.pageType && (_jsxs("div", { children: [_jsx("strong", { children: "Page Type:" }), " ", context.pageType] })), context?.campus && (_jsxs("div", { children: [_jsx("strong", { children: "Campus:" }), " ", context.campus.name || context.campus.id] }))] })] }))] }) }));
}
// Hook for using error boundary in functional components
export function useHiveErrorBoundary() {
    return {
        ErrorBoundary: HiveErrorBoundary,
        throwError: (error) => {
            throw error;
        }
    };
}
// Utility for manual error reporting
export function reportHiveError(error, context) {
    const hiveError = HiveErrorHandler.handleError(error, undefined, context);
    console.error('Manual HIVE error report:', hiveError);
    // Could also send to error reporting service
}
export default HiveErrorBoundary;
export { HiveErrorHandler };
//# sourceMappingURL=ErrorBoundary.js.map