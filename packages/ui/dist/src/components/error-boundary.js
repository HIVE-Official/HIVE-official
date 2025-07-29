"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
// Simplified error handler for UI package
class SimpleErrorHandler {
    static handleError(error) {
        // Basic error handling for UI components
        return {
            message: error.message || "An unexpected error occurred",
            code: error.name || "UNKNOWN_ERROR",
            severity: "error",
            isRetryable: true,
            action: "retry"
        };
    }
    static getActionButtonText(error) {
        switch (error.action) {
            case "retry": return "Try Again";
            case "contact-support": return "Contact Support";
            case "sign-in": return "Sign In";
            case "sign-up": return "Sign Up";
            case "check-email": return "Check Email";
            default: return "Continue";
        }
    }
}
export class FirebaseErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleRetry = () => {
            this.setState({
                hasError: false,
                error: null,
                errorId: "",
            });
        };
        this.state = {
            hasError: false,
            error: null,
            errorId: "",
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
    }
    componentDidCatch(error, errorInfo) {
        // Log the error to Firebase Analytics or your error reporting service
        console.error("Firebase Error Boundary caught an error:", error, errorInfo);
        // Call the optional onError prop
        this.props.onError?.(error, errorInfo);
        // In a real app, you might want to send this to an error reporting service
        // logErrorToService(error, errorInfo, this.state.errorId);
    }
    render() {
        if (this.state.hasError && this.state.error) {
            const userFriendlyError = SimpleErrorHandler.handleError(this.state.error);
            if (this.props.fallback) {
                return this.props.fallback(userFriendlyError, this.handleRetry);
            }
            return (_jsx(DefaultErrorFallback, { error: userFriendlyError, onRetry: this.handleRetry, errorId: this.state.errorId }));
        }
        return this.props.children;
    }
}
function DefaultErrorFallback({ error, onRetry, errorId, }) {
    const getIconForSeverity = (severity) => {
        switch (severity) {
            case "error":
                return "⚠️";
            case "warning":
                return "⚡";
            case "info":
                return "ℹ️";
            default:
                return "❌";
        }
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "error":
                return "text-red-600 border-red-200 bg-red-50";
            case "warning":
                return "text-amber-600 border-amber-200 bg-amber-50";
            case "info":
                return "text-blue-600 border-blue-200 bg-blue-50";
            default:
                return "text-gray-600 border-gray-200 bg-gray-50";
        }
    };
    return (_jsx("div", { className: "min-h-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "max-w-md w-full bg-[var(--hive-background-primary)]/20 backdrop-blur-xl border border-red-500/20 rounded-xl p-6 text-center space-y-4", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-red-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-red-500/30 mb-4", children: _jsx("span", { className: "text-2xl", children: getIconForSeverity(error.severity) }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Something went wrong" }), _jsx("p", { className: "text-sm leading-relaxed text-[var(--hive-text-primary)]/70", children: error.message }), _jsxs("div", { className: "space-y-2 pt-2", children: [error.action === "retry" && error.isRetryable && (_jsx("button", { onClick: onRetry, className: "w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]", children: SimpleErrorHandler.getActionButtonText(error) })), error.action === "contact-support" && (_jsx("button", { onClick: () => {
                                console.log("Contact support clicked", {
                                    errorId,
                                    errorCode: error.code,
                                });
                            }, className: "w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]", children: SimpleErrorHandler.getActionButtonText(error) })), error.action === "sign-in" && (_jsx("button", { onClick: () => {
                                window.location.href = "/schools";
                            }, className: "w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]", children: SimpleErrorHandler.getActionButtonText(error) })), error.action === "sign-up" && (_jsx("button", { onClick: () => {
                                window.location.href = "/schools";
                            }, className: "w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]", children: SimpleErrorHandler.getActionButtonText(error) })), error.action === "check-email" && (_jsxs("div", { className: "text-xs space-y-2", children: [_jsx("p", { className: "text-[var(--hive-text-primary)]/60", children: "Please check your email and click the verification link." }), _jsx("button", { onClick: onRetry, className: "w-full px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-[var(--hive-text-primary)]", children: "I've verified my email" })] }))] }), process.env.NODE_ENV === "development" && (_jsxs("details", { className: "text-xs text-left", children: [_jsx("summary", { className: "cursor-pointer font-medium text-[var(--hive-text-primary)]/80", children: "Debug Info" }), _jsxs("div", { className: "mt-2 p-2 bg-[var(--hive-background-primary)]/40 rounded border border-white/10 font-mono text-[var(--hive-text-primary)]/60", children: [_jsxs("div", { children: ["Error ID: ", errorId] }), _jsxs("div", { children: ["Code: ", error.code] }), _jsxs("div", { children: ["Retryable: ", error.isRetryable ? "Yes" : "No"] }), _jsxs("div", { children: ["Action: ", error.action || "None"] })] })] }))] }) }));
}
// Hook for using error boundary in functional components
export function useFirebaseErrorBoundary() {
    return {
        ErrorBoundary: FirebaseErrorBoundary,
        throwError: (error) => {
            throw error;
        },
    };
}
export default FirebaseErrorBoundary;
//# sourceMappingURL=error-boundary.js.map