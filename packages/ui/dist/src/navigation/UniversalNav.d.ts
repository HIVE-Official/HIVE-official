import React from 'react';
export interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode | string;
    path: string;
    badge?: number | string;
    children?: NavItem[];
    requiresAuth?: boolean;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
}
export declare const UniversalNavBar: React.FC<{
    items: NavItem[];
    orientation?: 'horizontal' | 'vertical';
    variant?: 'default' | 'compact' | 'mobile';
    className?: string;
}>;
export declare const CommandPalette: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}>;
export declare const Breadcrumbs: React.FC<{
    items: Array<{
        label: string;
        path?: string;
    }>;
    className?: string;
}>;
export declare const TabNav: React.FC<{
    tabs: Array<{
        id: string;
        label: string;
        count?: number;
    }>;
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}>;
declare const _default: {
    UniversalNavBar: React.FC<{
        items: NavItem[];
        orientation?: "horizontal" | "vertical";
        variant?: "default" | "compact" | "mobile";
        className?: string;
    }>;
    CommandPalette: React.FC<{
        open: boolean;
        onOpenChange: (open: boolean) => void;
    }>;
    Breadcrumbs: React.FC<{
        items: Array<{
            label: string;
            path?: string;
        }>;
        className?: string;
    }>;
    TabNav: React.FC<{
        tabs: Array<{
            id: string;
            label: string;
            count?: number;
        }>;
        activeTab: string;
        onChange: (tabId: string) => void;
        className?: string;
    }>;
};
export default _default;
//# sourceMappingURL=UniversalNav.d.ts.map