import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { type HiveError } from './ErrorBoundary';
interface ErrorAnalytics {
    errorCount: number;
    errorTypes: Record<string, number>;
    userPatterns: {
        hasMultipleErrors: boolean;
        errorSequence: string[];
        timeSpent: number;
    };
    campusIssues: {
        networkProblems: number;
        authIssues: number;
        campusSystemErrors: number;
    };
}
declare class GlobalErrorTracker {
    private static instance;
    private analytics;
    private sessionStart;
    static getInstance(): GlobalErrorTracker;
    trackError(error: HiveError, context?: any): void;
    private sendToAnalytics;
    getAnalytics(): ErrorAnalytics;
    reset(): void;
}
interface GlobalErrorBoundaryProps {
    children: ReactNode;
    enableAnalytics?: boolean;
    enableAutoRecovery?: boolean;
    maxRetryAttempts?: number;
    context?: {
        user?: {
            id: string;
            name?: string;
            email?: string;
            isAdmin?: boolean;
        };
        campus?: {
            id: string;
            name?: string;
        };
        session?: {
            startTime: Date;
            userAgent: string;
        };
    };
}
interface GlobalErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    hiveError: HiveError | null;
    errorId: string;
    retryCount: number;
    autoRecoveryAttempted: boolean;
    isRecovering: boolean;
}
export declare class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
    private errorTracker;
    private recoveryTimer;
    constructor(props: GlobalErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<GlobalErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    private shouldAttemptAutoRecovery;
    private attemptAutoRecovery;
    private refreshAuthAndRetry;
    private reportCriticalError;
    handleRetry: () => void;
    componentWillUnmount(): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element;
}
export declare function useGlobalErrorBoundary(): {
    trackError: (error: Error, context?: any) => void;
    getAnalytics: () => ErrorAnalytics;
    reset: () => void;
};
export { GlobalErrorTracker };
export default GlobalErrorBoundary;
//# sourceMappingURL=GlobalErrorBoundary.d.ts.map