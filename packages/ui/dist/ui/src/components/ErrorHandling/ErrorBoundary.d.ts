import React, { Component, type ReactNode, type ErrorInfo } from 'react';
interface HiveError {
    message: string;
    code: string;
    severity: 'critical' | 'error' | 'warning' | 'info';
    category: 'network' | 'auth' | 'permission' | 'validation' | 'system' | 'campus' | 'unknown';
    context?: {
        userId?: string;
        campusId?: string;
        pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
        userAgent?: string;
        timestamp?: Date;
    };
    recovery: {
        isRetryable: boolean;
        action?: 'retry' | 'refresh' | 'navigate' | 'contact-support' | 'sign-in' | 'join-waitlist';
        actionUrl?: string;
        customMessage?: string;
    };
    studentFriendly: {
        title: string;
        description: string;
        encouragement?: string;
        nextSteps?: string[];
    };
}
declare class HiveErrorHandler {
    private static campusMessages;
    static handleError(error: Error, errorInfo?: ErrorInfo, context?: any): HiveError;
    static getErrorIcon(category: HiveError['category'], severity: HiveError['severity']): {
        emoji: string;
        color: string;
    };
}
interface Props {
    children: ReactNode;
    fallback?: (error: HiveError, retry: () => void, context?: any) => ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo, hiveError: HiveError) => void;
    context?: {
        user?: {
            id: string;
            name?: string;
            email?: string;
        };
        campus?: {
            id: string;
            name?: string;
        };
        pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
    };
    enableErrorReporting?: boolean;
    showDebugInfo?: boolean;
}
interface State {
    hasError: boolean;
    error: Error | null;
    hiveError: HiveError | null;
    errorId: string;
    retryCount: number;
}
export declare class HiveErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): Partial<State>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    private reportError;
    handleRetry: () => void;
    handleAction: (action: HiveError["recovery"]["action"], actionUrl?: string) => void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export declare function useHiveErrorBoundary(): {
    ErrorBoundary: typeof HiveErrorBoundary;
    throwError: (error: Error) => never;
};
export declare function reportHiveError(error: Error, context?: any): void;
export default HiveErrorBoundary;
export { HiveErrorHandler };
export type { HiveError, Props as HiveErrorBoundaryProps };
//# sourceMappingURL=ErrorBoundary.d.ts.map