import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const ShellContext = createContext(undefined);
export function ShellProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [navigationMode, setNavigationMode] = useState('sidebar');
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    return (_jsx(ShellContext.Provider, { value: {
            isSidebarOpen,
            toggleSidebar,
            navigationMode,
            setNavigationMode,
        }, children: children }));
}
export function useShell() {
    const context = useContext(ShellContext);
    if (context === undefined) {
        throw new Error('useShell must be used within a ShellProvider');
    }
    return context;
}
//# sourceMappingURL=shell-context.js.map