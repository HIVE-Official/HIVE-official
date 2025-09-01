import React, { createContext, useContext, useState } from 'react';

interface ShellContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  navigationMode: 'sidebar' | 'topbar' | 'command';
  setNavigationMode: (mode: 'sidebar' | 'topbar' | 'command') => void;
}

const ShellContext = createContext<ShellContextValue | undefined>(undefined);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [navigationMode, setNavigationMode] = useState<'sidebar' | 'topbar' | 'command'>('sidebar');

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <ShellContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        navigationMode,
        setNavigationMode,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);
  if (context === undefined) {
    throw new Error('useShell must be used within a ShellProvider');
  }
  return context;
}