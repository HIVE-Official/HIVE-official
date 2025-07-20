"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ShellContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  notificationCenterOpen: boolean;
  setNotificationCenterOpen: (open: boolean) => void;
  unreadNotificationCount: number;
  setUnreadNotificationCount: (count: number) => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function useShell() {
  const context = useContext(ShellContext);
  if (!context) {
    throw new Error('useShell must be used within a ShellProvider');
  }
  return context;
}

interface ShellProviderProps {
  children: React.ReactNode;
  initialSidebarCollapsed?: boolean;
  initialUnreadCount?: number;
}

export function ShellProvider({ 
  children, 
  initialSidebarCollapsed = false,
  initialUnreadCount = 0
}: ShellProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebarCollapsed);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(initialUnreadCount);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Command/Ctrl + K for command palette
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }

      // Command/Ctrl + Shift + N for notifications
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'N') {
        event.preventDefault();
        setNotificationCenterOpen(!notificationCenterOpen);
      }

      // Command/Ctrl + B for sidebar toggle
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed);
      }

      // Escape to close overlays
      if (event.key === 'Escape') {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false);
        } else if (notificationCenterOpen) {
          setNotificationCenterOpen(false);
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, notificationCenterOpen, sidebarCollapsed]);

  // Responsive sidebar behavior
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value: ShellContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    commandPaletteOpen,
    setCommandPaletteOpen,
    notificationCenterOpen,
    setNotificationCenterOpen,
    unreadNotificationCount,
    setUnreadNotificationCount,
  };

  return (
    <ShellContext.Provider value={value}>
      {children}
    </ShellContext.Provider>
  );
}