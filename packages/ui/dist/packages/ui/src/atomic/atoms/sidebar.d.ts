import React from 'react';
export interface SidebarProps {
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
    } | null;
    currentPath?: string;
    collapsed?: boolean;
    onItemClick?: (href: string) => void;
    onToggle?: () => void;
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    currentSection?: string;
    className?: string;
}
export declare const Sidebar: React.FC<SidebarProps>;
//# sourceMappingURL=sidebar.d.ts.map