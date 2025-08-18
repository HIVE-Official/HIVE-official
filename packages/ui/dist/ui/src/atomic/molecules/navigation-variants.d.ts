import React from 'react';
export interface NavigationProps {
    currentPath?: string;
    onItemClick?: (href: string) => void;
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
    } | null;
    className?: string;
}
export declare const MinimalFloatingSidebar: React.FC<NavigationProps>;
export declare const CleanVerticalSidebar: React.FC<NavigationProps>;
export declare const TopHorizontalNav: React.FC<NavigationProps>;
export declare const BottomTabNav: React.FC<NavigationProps>;
export declare const CompactIconRail: React.FC<NavigationProps>;
//# sourceMappingURL=navigation-variants.d.ts.map