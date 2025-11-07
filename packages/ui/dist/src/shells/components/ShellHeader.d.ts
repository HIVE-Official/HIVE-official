export interface NotificationData {
    items?: Array<Record<string, unknown>>;
    loading?: boolean;
    error?: string | null;
    onNavigate?: (url: string) => void;
}
export interface ShellHeaderProps {
    /** Mobile menu toggle handler */
    onMenuToggle?: () => void;
    /** Command palette handler (⌘K) */
    onSearch?: () => void;
    /** Consolidated notification data */
    notifications?: NotificationData;
    /** Show mobile menu button */
    showMobileMenu?: boolean;
    /** Show search */
    showSearch?: boolean;
}
export declare function ShellHeader({ onMenuToggle, onSearch, notifications, showMobileMenu, showSearch, }: ShellHeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ShellHeader.d.ts.map