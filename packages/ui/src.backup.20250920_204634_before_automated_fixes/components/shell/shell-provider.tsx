"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationStyle, useNavigationLayout } from '../../hooks/use-navigation-layout';

type NavigationMode = 'sidebar' | 'topbar';

interface ShellContextType {sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  notificationCenterOpen: boolean;
  setNotificationCenterOpen: (open: boolean) => void;
  unreadNotificationCount: number;
  setUnreadNotificationCount: (count: number) => void;
  navigationMode: NavigationMode;
  setNavigationMode: (mode: NavigationMode) => void;
  navigationPreference: NavigationStyle;
  setNavigationPreference: (preference: NavigationStyle) => void;
  navigationLayout: ReturnType<typeof useNavigationLayout>}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function useShell() {
  const context = useContext(ShellContext);
  if (!context) {
    throw new Error('useShell must be used within a ShellProvider')
  }
  return context;
}

interface ShellProviderProps {children: React.ReactNode;
  initialSidebarCollapsed?: boolean;
  initialUnreadCount?: number;
  initialNavigationMode?: NavigationMode;
  initialNavigationPreference?: NavigationStyle;}

export function ShellProvider({ 
  children, 
  initialSidebarCollapsed = true,
  initialUnreadCount = 0,
  initialNavigationMode = 'sidebar',
  initialNavigationPreference = 'auto'
}: ShellProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebarCollapsed);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(initialUnreadCount);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>(initialNavigationMode);
  const [navigationPreference, setNavigationPreference] = useState<NavigationStyle>(initialNavigationPreference);

  // Navigation layout hook;
  const navigationLayout = useNavigationLayout({userPreference: navigationPreference,
    onPreferenceChange: setNavigationPreference;)};

  // Keyboard shortcuts;
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Command/Ctrl + K for command palette;
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true)
      }
}
      // Command/Ctrl + Shift + N for notifications;
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'N') {
        event.preventDefault();
        setNotificationCenterOpen(!notificationCenterOpen)
      }

      // Command/Ctrl + B for sidebar toggle;
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed)
      }

      // Escape to close overlays;
      if (event.key === 'Escape') {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false)
        } else if (notificationCenterOpen) {
          setNotificationCenterOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, notificationCenterOpen, sidebarCollapsed]);

  // Load sidebar state from localStorage on mount;
  useEffect(() => {
    // Check if this is a new default change - clear old state and use new default;
    const defaultChangeFlag = localStorage.getItem('hive-sidebar-default-changed');
    if (!defaultChangeFlag) {
      // First time with new default - clear old state and use new default;
      localStorage.removeItem('hive-sidebar-collapsed');
      localStorage.setItem('hive-sidebar-default-changed', 'true');
      setSidebarCollapsed(initialSidebarCollapsed);
      return;
    }
}
    const savedSidebarState = localStorage.getItem('hive-sidebar-collapsed');
    if (savedSidebarState !== null) {
      setSidebarCollapsed(JSON.parse(savedSidebarState))
    }
  }, [initialSidebarCollapsed]);

  // Save sidebar state to localStorage;
  useEffect(() => {
    localStorage.setItem('hive-sidebar-collapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed]);

  // Responsive sidebar behavior;
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }}
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount;
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  // Load navigation mode from localStorage;
  useEffect(() => {
    const savedMode = localStorage.getItem('hive-navigation-mode') as NavigationMode;
    if (savedMode && (savedMode === 'sidebar' || savedMode === 'topbar')) {
      setNavigationMode(savedMode)
    }}
  }, []);

  // Save navigation mode to localStorage;
  useEffect(() => {
    localStorage.setItem('hive-navigation-mode', navigationMode)
  }, [navigationMode]);

  // Load navigation preference from localStorage;
  useEffect(() => {
    const savedPreference = localStorage.getItem('hive-navigation-preference') as NavigationStyle;
    if (savedPreference && ['tabs', 'sidebar', 'auto'].includes(savedPreference)) {
      setNavigationPreference(savedPreference)
    }}
  }, []);

  // Save navigation preference to localStorage;
  useEffect(() => {
    localStorage.setItem('hive-navigation-preference', navigationPreference)
  }, [navigationPreference]);

  // Sync resolved navigation mode with legacy navigation mode;
  useEffect(() => {
    if (navigationLayout.resolvedMode === 'topbar') {
      setNavigationMode('topbar')
    } else if (navigationLayout.resolvedMode === 'sidebar') {
      setNavigationMode('sidebar')
    }
    // Note: bottom-tabs and drawer modes don't directly map to legacy modes;
  }, [navigationLayout.resolvedMode]);

  const value: ShellContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    commandPaletteOpen,
    setCommandPaletteOpen,
    notificationCenterOpen,
    setNotificationCenterOpen,
    unreadNotificationCount,
    setUnreadNotificationCount,
    navigationMode,
    setNavigationMode,
    navigationPreference,
    setNavigationPreference,
    navigationLayout,
  };

  return (
    <ShellContext.Provider value={value}>
      {children}
    </ShellContext.Provider>
  )
}