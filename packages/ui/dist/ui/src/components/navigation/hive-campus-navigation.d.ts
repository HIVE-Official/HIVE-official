import React from 'react';
export declare function CampusBar(): import("react/jsx-runtime").JSX.Element;
interface BreadcrumbItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
}
interface ContextBreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare function ContextBreadcrumbs({ items, className }: ContextBreadcrumbsProps): import("react/jsx-runtime").JSX.Element;
interface Surface {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    count?: number;
    isActive?: boolean;
}
interface SixSurfacesTabBarProps {
    surfaces: Surface[];
    onSurfaceChange?: (surfaceId: string) => void;
    className?: string;
}
export declare function SixSurfacesTabBar({ surfaces, onSurfaceChange, className }: SixSurfacesTabBarProps): import("react/jsx-runtime").JSX.Element;
interface CampusLayoutShellProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    surfaces?: Surface[];
    onSurfaceChange?: (surfaceId: string) => void;
    className?: string;
}
export declare function CampusLayoutShell({ children, breadcrumbs, surfaces, onSurfaceChange, className }: CampusLayoutShellProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-campus-navigation.d.ts.map