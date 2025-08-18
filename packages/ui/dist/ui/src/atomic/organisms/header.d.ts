import React from 'react';
export interface HeaderProps {
    logo?: React.ReactNode;
    title?: string;
    navigation?: Array<{
        label: string;
        href: string;
        active?: boolean;
        badge?: number;
    }>;
    user?: {
        name: string;
        avatar?: string;
        status?: 'online' | 'offline' | 'away' | 'busy';
    };
    actions?: React.ReactNode;
    notifications?: number;
    variant?: 'default' | 'minimal' | 'glass';
    sticky?: boolean;
    className?: string;
    onUserClick?: () => void;
    onNotificationsClick?: () => void;
}
export declare const Header: React.FC<HeaderProps>;
//# sourceMappingURL=header.d.ts.map