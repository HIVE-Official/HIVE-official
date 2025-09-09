import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    surfaceName?: string;
}
interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}
export declare class SpaceSurfaceErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    private handleRetry;
    private handleGoHome;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export declare function useSpaceSurfaceErrorHandler(surfaceName?: string): (error: Error, errorInfo: ErrorInfo) => void;
export default SpaceSurfaceErrorBoundary;
//# sourceMappingURL=space-surface-error-boundary.d.ts.map