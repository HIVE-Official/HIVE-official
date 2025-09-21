export interface ShellState {
    isLoading: boolean;
    error: string | null;
    sidebarOpen: boolean;
    commandPaletteOpen: boolean;
    notifications: ShellNotification[];
    theme: 'light' | 'dark' | 'system';
    user: any | null;
}
export interface ShellNotification {
    id: string;
    title: string;
    message?: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
    actions?: Array<{
        label: string;
        action: () => void;
        variant?: 'default' | 'destructive';
    }>;
}
export interface ShellActions {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSidebarOpen: (open: boolean) => void;
    setCommandPaletteOpen: (open: boolean) => void;
    addNotification: (notification: Omit<ShellNotification, 'id' | 'timestamp' | 'read'>) => void;
    removeNotification: (id: string) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setUser: (user: any | null) => void;
}
export interface ShellContextType extends ShellState, ShellActions {
}
export declare function useShell(): ShellContextType;
export declare const ShellProvider: import("react").Provider<ShellContextType>;
export declare function createShellValue(): ShellContextType;
//# sourceMappingURL=use-shell.d.ts.map