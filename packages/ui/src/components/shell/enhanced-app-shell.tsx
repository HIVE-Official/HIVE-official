"use client";

import React from 'react';
import { ShellProvider, useShell } from './shell-provider';
import { NavigationHeader } from './navigation-header';
import { NavigationSidebar } from './navigation-sidebar';
import { CommandPalette } from './command-palette';
import { NotificationCenter } from './notification-center';
import { NotificationProvider, useNotifications } from './notification-service';
import { cn } from '../../lib/utils';
import { darkLuxury } from '../../theme/dark-luxury';

interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
}

interface EnhancedAppShellProps {
  children: React.ReactNode;
  user?: User | null;
  className?: string;
  initialSidebarCollapsed?: boolean;
  notifications?: any[];
}

function AppShellContent({ 
  children, 
  user, 
  className 
}: {
  children: React.ReactNode;
  user?: User | null;
  className?: string;
}) {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    commandPaletteOpen,
    setCommandPaletteOpen,
    notificationCenterOpen,
    setNotificationCenterOpen,
  } = useShell();

  const { notifications, unreadCount } = useNotifications();

  return (
    <div 
      className={cn("min-h-screen", className)}
      style={{
        backgroundColor: darkLuxury.obsidian,
        color: darkLuxury.platinum,
      }}
    >
      {/* Navigation Header */}
      <NavigationHeader 
        user={user}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
        onOpenNotifications={() => setNotificationCenterOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        unreadNotificationCount={unreadCount}
      />
      
      <div className="flex">
        {/* Navigation Sidebar */}
        <NavigationSidebar 
          collapsed={sidebarCollapsed}
          user={user}
        />
        
        {/* Main Content Area */}
        <main 
          className={cn(
            "flex-1 transition-all duration-200 ease-out",
            "pt-16", // Account for fixed header
            "min-h-screen",
            // Responsive sidebar spacing
            sidebarCollapsed 
              ? "ml-0 md:ml-16" 
              : "ml-0 md:ml-64"
          )}
        >
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications}
      />

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
}

export function EnhancedAppShell({
  children,
  user,
  className,
  initialSidebarCollapsed = false,
  notifications = []
}: EnhancedAppShellProps) {
  return (
    <NotificationProvider>
      <ShellProvider 
        initialSidebarCollapsed={initialSidebarCollapsed}
        initialUnreadCount={0} // Will be managed by NotificationProvider
      >
        <AppShellContent user={user} className={className}>
          {children}
        </AppShellContent>
      </ShellProvider>
    </NotificationProvider>
  );
}