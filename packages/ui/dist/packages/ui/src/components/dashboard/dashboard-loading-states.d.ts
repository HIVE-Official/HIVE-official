import React from 'react';
export interface LoadingState {
    isLoading: boolean;
    progress?: number;
    message?: string;
    stage?: string;
}
export interface ErrorState {
    hasError: boolean;
    error?: Error | string;
    errorCode?: string;
    isRecoverable?: boolean;
    retryCount?: number;
}
export interface ConnectionState {
    isOnline: boolean;
    isConnected: boolean;
    lastSync?: Date;
    syncStatus: 'synced' | 'syncing' | 'error' | 'offline';
}
export declare function DashboardSkeleton({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function WidgetSkeleton({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DashboardError({ error, onRetry, className }: {
    error: ErrorState;
    onRetry?: () => void;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function LoadingProgress({ state, className }: {
    state: LoadingState;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function ConnectionStatus({ state, onReconnect, className }: {
    state: ConnectionState;
    onReconnect?: () => void;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function AccessibilityAnnouncer({ message, type }: {
    message: string;
    type?: 'polite' | 'assertive';
}): import("react/jsx-runtime").JSX.Element;
export declare function EmptyState({ icon: Icon, title, description, action, className }: {
    icon: React.ComponentType<{
        className?: string;
    }>;
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: {
    DashboardSkeleton: typeof DashboardSkeleton;
    WidgetSkeleton: typeof WidgetSkeleton;
    DashboardError: typeof DashboardError;
    LoadingProgress: typeof LoadingProgress;
    ConnectionStatus: typeof ConnectionStatus;
    AccessibilityAnnouncer: typeof AccessibilityAnnouncer;
    EmptyState: typeof EmptyState;
};
export default _default;
//# sourceMappingURL=dashboard-loading-states.d.ts.map