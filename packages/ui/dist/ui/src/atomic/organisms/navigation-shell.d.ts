import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const navigationShellVariants: (props?: {
    variant?: "default" | "glass" | "solid" | "floating";
    blur?: "none" | "sm" | "lg" | "xl" | "md";
} & import("class-variance-authority/types").ClassProp) => string;
declare const navigationContentVariants: (props?: {
    maxWidth?: "sm" | "lg" | "xl" | "2xl" | "md" | "full";
    spacing?: "normal" | "tight" | "loose";
} & import("class-variance-authority/types").ClassProp) => string;
export interface NavigationItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
    badge?: string | number;
    tier: 1 | 2 | 3;
}
export interface NavigationShellProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navigationShellVariants> {
    items: NavigationItem[];
    currentPath?: string;
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    maxWidth?: VariantProps<typeof navigationContentVariants>["maxWidth"];
    spacing?: VariantProps<typeof navigationContentVariants>["spacing"];
    showSearch?: boolean;
    showNotifications?: boolean;
    showMessages?: boolean;
    notificationCount?: number;
    messageCount?: number;
    onNotificationsClick?: () => void;
    onMessagesClick?: () => void;
    logoVariant?: "default" | "white" | "dark" | "gradient" | "monochrome";
    logoSize?: "sm" | "default" | "lg" | "xl" | "2xl";
    showLogoText?: boolean;
    showLogoIcon?: boolean;
}
declare const NavigationShell: React.ForwardRefExoticComponent<NavigationShellProps & React.RefAttributes<HTMLElement>>;
export { NavigationShell, navigationShellVariants, navigationContentVariants };
//# sourceMappingURL=navigation-shell.d.ts.map