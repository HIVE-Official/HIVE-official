import React, { Component, type ReactNode, type ErrorInfo } from "react";
interface UserFriendlyError {
    message: string;
    code: string;
    severity: "error" | "warning" | "info";
    isRetryable: boolean;
    action?: "retry" | "contact-support" | "sign-in" | "sign-up" | "check-email";
}
interface Props {
    children: ReactNode;
    fallback?: (error: UserFriendlyError, retry: () => void) => ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
interface State {
    hasError: boolean;
    error: Error | null;
    errorId: string;
}
export declare class FirebaseErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleRetry: () => void;
    render(): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element;
}
export declare function useFirebaseErrorBoundary(): {
    ErrorBoundary: typeof FirebaseErrorBoundary;
    throwError: (error: Error) => never;
};
export default FirebaseErrorBoundary;
//# sourceMappingURL=error-boundary.d.ts.map