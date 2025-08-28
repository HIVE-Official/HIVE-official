import React from 'react';
export interface EmptyStateProps {
    variant?: 'default' | 'no-data' | 'search' | 'error' | 'offline' | 'loading';
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: React.ReactNode;
}
export declare function EmptyState({ variant, icon, title, description, action, secondaryAction, size, className, children }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export declare function EmptyStateCard(props: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export declare const EmptyStatePresets: {
    NoData: (props: Omit<EmptyStateProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
    SearchResults: (props: Omit<EmptyStateProps, "variant" | "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    NoSpaces: (props: Omit<EmptyStateProps, "variant" | "icon" | "title">) => import("react/jsx-runtime").JSX.Element;
    EmptyFeed: (props: Omit<EmptyStateProps, "variant" | "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    Error: (props: Omit<EmptyStateProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Offline: (props: Omit<EmptyStateProps, "variant" | "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    Loading: (props: Omit<EmptyStateProps, "variant" | "title">) => import("react/jsx-runtime").JSX.Element;
    NoCampusEvents: (props: Omit<EmptyStateProps, "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    NoBuiltTools: (props: Omit<EmptyStateProps, "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    NoActivityYet: (props: Omit<EmptyStateProps, "title" | "description">) => import("react/jsx-runtime").JSX.Element;
    NoConnectionsYet: (props: Omit<EmptyStateProps, "title" | "description">) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=empty-state.d.ts.map