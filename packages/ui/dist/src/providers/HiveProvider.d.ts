/**
 * HIVE Provider
 * Main application provider that wraps all other providers
 * This is the root provider for the entire HIVE platform
 */
import React from 'react';
export interface HiveConfig {
    environment: 'development' | 'staging' | 'production';
    campusId: string;
    features: {
        rituals: boolean;
        tools: boolean;
        events: boolean;
        messaging: boolean;
    };
    theme: {
        primaryColor: string;
        mode: 'light' | 'dark';
    };
}
interface HiveContextType {
    config: HiveConfig;
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    updateConfig: (updates: Partial<HiveConfig>) => void;
}
export declare const useHive: () => HiveContextType;
export declare const HiveProvider: React.FC<{
    children: React.ReactNode;
    config?: Partial<HiveConfig>;
    withShell?: boolean;
    shellProps?: any;
}>;
export declare const PageWrapper: React.FC<{
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: boolean;
}>;
export declare const SectionWrapper: React.FC<{
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
}>;
export declare const GridWrapper: React.FC<{
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    gap?: 'sm' | 'md' | 'lg';
    responsive?: boolean;
    className?: string;
}>;
export declare const FlexWrapper: React.FC<{
    children: React.ReactNode;
    direction?: 'row' | 'col';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    align?: 'start' | 'center' | 'end' | 'stretch';
    gap?: 'none' | 'sm' | 'md' | 'lg';
    wrap?: boolean;
    className?: string;
}>;
export declare const LoadingWrapper: React.FC<{
    isLoading: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}>;
export declare class ErrorBoundary extends React.Component<{
    children: React.ReactNode;
    fallback?: React.ReactNode;
}, {
    hasError: boolean;
    error?: Error;
}> {
    constructor(props: any);
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | import("react/jsx-runtime").JSX.Element;
}
declare const _default: {
    HiveProvider: React.FC<{
        children: React.ReactNode;
        config?: Partial<HiveConfig>;
        withShell?: boolean;
        shellProps?: any;
    }>;
    PageWrapper: React.FC<{
        children: React.ReactNode;
        className?: string;
        maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
        padding?: boolean;
    }>;
    SectionWrapper: React.FC<{
        children: React.ReactNode;
        className?: string;
        title?: string;
        description?: string;
        actions?: React.ReactNode;
    }>;
    GridWrapper: React.FC<{
        children: React.ReactNode;
        columns?: 1 | 2 | 3 | 4 | 5 | 6;
        gap?: "sm" | "md" | "lg";
        responsive?: boolean;
        className?: string;
    }>;
    FlexWrapper: React.FC<{
        children: React.ReactNode;
        direction?: "row" | "col";
        justify?: "start" | "center" | "end" | "between" | "around";
        align?: "start" | "center" | "end" | "stretch";
        gap?: "none" | "sm" | "md" | "lg";
        wrap?: boolean;
        className?: string;
    }>;
    LoadingWrapper: React.FC<{
        isLoading: boolean;
        children: React.ReactNode;
        fallback?: React.ReactNode;
        className?: string;
    }>;
    ErrorBoundary: typeof ErrorBoundary;
    useHive: () => HiveContextType;
};
export default _default;
//# sourceMappingURL=HiveProvider.d.ts.map