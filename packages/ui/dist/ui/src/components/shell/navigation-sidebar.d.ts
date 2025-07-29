interface NavigationSidebarProps {
    collapsed: boolean;
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        builderStatus?: 'none' | 'pending' | 'active';
    } | null;
    currentPath?: string;
    width?: 'compact' | 'wide' | 'standard';
    layoutType?: string;
    className?: string;
    onToggle?: () => void;
    onToggleNavigationMode?: () => void;
}
export declare function NavigationSidebar({ collapsed, user, currentPath, className, onToggle, onToggleNavigationMode }: NavigationSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=navigation-sidebar.d.ts.map