import React from 'react';
interface NavigationContextType {
    currentPath: string;
    isActive: (path: string, matchPaths?: string[]) => boolean;
    navigate: (path: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;
    generateBreadcrumbs: () => BreadcrumbItem[];
    getPageTitle: () => string;
    getPageDescription: () => string;
}
interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ElementType;
}
export declare function useNavigationContext(): NavigationContextType;
export declare function useNavigation(): {
    currentPath: string;
    isActive: (path: string, matchPaths?: string[]) => boolean;
    navigate: (path: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;
    generateBreadcrumbs: () => BreadcrumbItem[];
    getPageTitle: () => string;
    getPageDescription: () => string;
};
export declare function useKeyboardNavigation(): {
    handleKeyboardShortcut: (event: KeyboardEvent) => void;
};
export declare function useRouteTransitions(): {
    isNavigating: boolean;
    navigationError: string;
    navigate: (path: string) => Promise<void>;
};
export {};
//# sourceMappingURL=use-navigation-context.d.ts.map