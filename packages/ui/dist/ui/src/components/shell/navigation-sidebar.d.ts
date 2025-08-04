import React from 'react';
export interface NavigationSidebarProps {
    collapsed?: boolean;
    user?: {
        id: string;
        name: string;
        handle?: string;
        avatar?: string;
        builderStatus?: 'none' | 'active' | 'pending';
    };
    currentSection?: 'profile' | 'spaces' | 'feed' | 'hivelab' | 'rituals' | 'calendar' | 'settings';
    currentPath?: any;
    onToggleCollapse?: () => void;
    onSectionChange?: (section: string) => void;
    className?: string;
}
export declare const NavigationSidebar: React.FC<NavigationSidebarProps>;
export default NavigationSidebar;
//# sourceMappingURL=navigation-sidebar.d.ts.map