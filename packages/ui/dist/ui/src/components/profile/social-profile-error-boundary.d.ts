/**
 * Social Profile Error Boundary
 * Provides comprehensive error handling for social profile components
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';
import '../../styles/social-profile.css';
interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    isolateError?: boolean;
    context?: string;
}
interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    retryCount: number;
}
export declare class SocialProfileErrorBoundary extends Component<Props, State> {
    private maxRetries;
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): Partial<State>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleRetry: () => void;
    handleReset: () => void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | import("react/jsx-runtime").JSX.Element;
}
export declare function withSocialProfileErrorBoundary<P extends object>(Component: React.ComponentType<P>, context?: string, fallback?: ReactNode): {
    (props: P): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default SocialProfileErrorBoundary;
//# sourceMappingURL=social-profile-error-boundary.d.ts.map