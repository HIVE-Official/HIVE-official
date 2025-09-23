/**
 * Universal Shell Component
 * The foundational wrapper for the entire HIVE platform
 * Provides consistent layout, navigation, and context across all pages
 */
import React from 'react';
interface ShellContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
    currentSlice: string;
    shellReady: boolean;
}
export declare const useShell: () => ShellContextType;
export declare const UniversalShell: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: 'full' | 'minimal';
}>;
export default UniversalShell;
//# sourceMappingURL=UniversalShell.d.ts.map