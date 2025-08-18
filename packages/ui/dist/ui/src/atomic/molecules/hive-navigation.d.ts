import React from 'react';
export interface HiveNavigationProps {
    variant?: 'full' | 'compact';
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
export declare const HiveNavigation: React.FC<HiveNavigationProps>;
//# sourceMappingURL=hive-navigation.d.ts.map