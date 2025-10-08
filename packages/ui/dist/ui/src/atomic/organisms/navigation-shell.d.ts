import * as React from "react";
import { NotificationItem } from "../molecules/notification-item";
export interface NavigationLink {
    label: string;
    href: string;
    isActive?: boolean;
    badge?: number;
}
export interface NavigationShellProps extends React.HTMLAttributes<HTMLDivElement> {
    currentUserName?: string;
    currentUserAvatar?: string;
    currentUserHandle?: string;
    links?: NavigationLink[];
    notificationCount?: number;
    notifications?: React.ComponentProps<typeof NotificationItem>[];
    onSearch?: (query: string) => void;
    onNotificationClick?: (notification: React.ComponentProps<typeof NotificationItem>) => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onSignOutClick?: () => void;
    showSearch?: boolean;
    /** Layout mode: header or sidebar */
    layout?: "header" | "sidebar";
    /** Whether sidebar is collapsed */
    isCollapsed?: boolean;
    /** Callback to toggle layout */
    onToggleLayout?: () => void;
}
declare const NavigationShell: React.ForwardRefExoticComponent<NavigationShellProps & React.RefAttributes<HTMLDivElement>>;
export { NavigationShell };
//# sourceMappingURL=navigation-shell.d.ts.map