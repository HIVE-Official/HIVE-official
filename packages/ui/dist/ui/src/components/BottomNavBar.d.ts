import React from 'react';
interface NavItem {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    active?: boolean;
}
interface BottomNavBarProps extends React.HTMLAttributes<HTMLElement> {
    items?: NavItem[];
}
export declare const BottomNavBar: React.FC<BottomNavBarProps>;
export {};
//# sourceMappingURL=BottomNavBar.d.ts.map