export interface ShellContextType {
    /** Sidebar open state */
    isSidebarOpen: boolean;
    /** Toggle sidebar */
    toggleSidebar: () => void;
    /** Mobile detection (< 1024px) */
    isMobile: boolean;
    /** Current app slice (feed, spaces, profile, etc.) */
    currentSlice: string;
    /** Shell mounted and ready */
    shellReady: boolean;
    /** Dark mode state */
    isDarkMode: boolean;
    /** Toggle dark mode */
    toggleDarkMode: () => void;
    /** Notification count */
    notificationCount: number;
    /** Message count */
    messageCount: number;
    /** Sidebar collapsed state */
    isSidebarCollapsed: boolean;
    /** Set sidebar collapsed */
    setSidebarCollapsed: (collapsed: boolean) => void;
}
export declare const ShellContext: import("react").Context<ShellContextType>;
/**
 * Hook to access shell context
 * Must be used within a ShellContext.Provider
 */
export declare const useShell: () => ShellContextType;
/**
 * Hook to initialize shell state
 * Call this in the UniversalShell component
 */
export declare function useShellState(notificationCountProp?: number, messageCountProp?: number): {
    contextValue: ShellContextType;
    handleNavigate: (path?: string) => void;
    currentSidebarWidth: number;
};
//# sourceMappingURL=useShellState.d.ts.map