import React from 'react';
interface BottomNavBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    variant?: 'pill' | 'chip' | 'minimal' | 'bubble';
    showLabel?: boolean;
    badge?: number;
    enableMotion?: boolean;
}
export declare const BottomNavBar: {
    Root: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        variant?: "fixed" | "floating" | "dock";
        hideOnScroll?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        itemCount?: number;
    } & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<BottomNavBarItemProps & React.RefAttributes<HTMLButtonElement>>;
    Icon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        size?: "sm" | "default" | "lg";
    } & React.RefAttributes<HTMLDivElement>>;
    Label: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
        size?: "xs" | "sm" | "default";
    } & React.RefAttributes<HTMLSpanElement>>;
    Indicator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        variant?: "dot" | "line" | "glow";
    } & React.RefAttributes<HTMLDivElement>>;
};
export {};
//# sourceMappingURL=BottomNavBar.d.ts.map