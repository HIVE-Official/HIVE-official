import React from 'react';
interface PullToRefreshProps {
    children: React.ReactNode;
    onRefresh: () => Promise<void>;
    refreshThreshold?: number;
    disabled?: boolean;
    className?: string;
}
export declare function PullToRefresh({ children, onRefresh, refreshThreshold, disabled, className }: PullToRefreshProps): import("react/jsx-runtime").JSX.Element;
export declare function RefreshButton({ onRefresh, isRefreshing, className, children }: {
    onRefresh: () => Promise<void>;
    isRefreshing?: boolean;
    className?: string;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=pull-to-refresh.d.ts.map