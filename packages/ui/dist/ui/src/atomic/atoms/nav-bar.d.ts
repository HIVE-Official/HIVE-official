import React from 'react';
export interface NavBarProps {
    user?: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
    } | null;
    showSearch?: boolean;
    showNotifications?: boolean;
    unreadCount?: number;
    onSearchClick?: () => void;
    onNotificationsClick?: () => void;
    onSettingsClick?: () => void;
    onUserClick?: () => void;
    className?: string;
}
export declare const NavBar: React.FC<NavBarProps>;
//# sourceMappingURL=nav-bar.d.ts.map