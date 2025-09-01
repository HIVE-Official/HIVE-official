import React from 'react';
interface ShellContextValue {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    navigationMode: 'sidebar' | 'topbar' | 'command';
    setNavigationMode: (mode: 'sidebar' | 'topbar' | 'command') => void;
}
export declare function ShellProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useShell(): ShellContextValue;
export {};
//# sourceMappingURL=shell-context.d.ts.map