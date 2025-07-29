"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShellProvider, useShell } from './shell-provider';
import { NavigationHeader } from './navigation-header';
import { NavigationSidebar } from './navigation-sidebar';
import { EnhancedHiveCommandPalette, comprehensiveSearchCategories, defaultSearchItems, type SearchableItem } from '../enhanced-hive-command-palette';
import { NotificationCenter } from './notification-center';
import { NotificationProvider, useNotifications } from './notification-service';
import { EnhancedNavigationBar } from '../navigation/enhanced-navigation-bar';
import { UniversalBottomNav, useUniversalBottomNav } from '../navigation/universal-bottom-nav';
import { MobileNavigationMenu } from '../navigation/mobile-navigation-menu';
import { NotificationSystem, NotificationBell, useNotifications as useNotificationSystem } from '../notifications/notification-system';
import { PageTransition } from '../page-transition';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Search, Bell, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useKeyboardNavigation } from '../../hooks/use-navigation-context';
// Using HIVE PRD-aligned design tokens instead of legacy luxury theme

interface User {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  builderStatus?: 'none' | 'pending' | 'active';
  role?: 'student' | 'faculty' | 'admin';
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
    navigationMode,
    setNavigationMode,
  } = useShell();

  const { notifications, unreadCount } = useNotifications();
  const pathname = usePathname();
  const { handleKeyboardShortcut } = useKeyboardNavigation();

  // Setup keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command palette shortcut
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }
      
      // Handle other navigation shortcuts
      handleKeyboardShortcut(event);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyboardShortcut, setCommandPaletteOpen]);

  if (navigationMode === 'topbar') {
    return (
      <div 
        className={cn("min-h-screen", className)}
        style={{
          backgroundColor: 'var(--hive-bg-primary)',
          color: 'var(--hive-text-primary)',
        }}
      >
        {/* Enhanced Navigation Bar Mode */}
        <EnhancedNavigationBar 
          user={user}
          onToggleSidebar={() => {}} // Not used in topbar mode
          sidebarCollapsed={false}
          onOpenNotifications={() => setNotificationCenterOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          unreadNotificationCount={unreadCount}
          showGlobalSearch={true}
          showNotifications={true}
          onToggleNavigationMode={() => setNavigationMode('sidebar')}
        />
        
        {/* Main Content Area */}
        <main className="pt-12 sm:pt-14 min-h-screen">
          <PageTransition className="min-h-full p-4 sm:p-5 hive-spacing-responsive">
            {children}
          </PageTransition>
        </main>

        {/* Command Palette */}
        <EnhancedHiveCommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          categories={comprehensiveSearchCategories}
          staticItems={defaultSearchItems}
        />

        {/* Notification Center */}
        <NotificationCenter
          isOpen={notificationCenterOpen}
          onClose={() => setNotificationCenterOpen(false)}
          notifications={notifications}
        />
      </div>
    );
  }

  // Default: Sidebar Mode
  return (
    <div 
      className={cn("min-h-screen flex", className)}
      style={{
        backgroundColor: 'var(--hive-bg-primary)',
        color: 'var(--hive-text-primary)',
      }}
    >
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        collapsed={sidebarCollapsed}
        user={user}
        currentPath={pathname}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleNavigationMode={() => setNavigationMode('topbar')}
      />
      
      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-out",
          "min-h-screen"
        )}
      >
        <PageTransition className="min-h-full p-4 sm:p-5 hive-spacing-responsive">
          {children}
        </PageTransition>
      </main>

      {/* Enhanced Command Palette */}
      <EnhancedHiveCommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        staticItems={defaultSearchItems}
        categories={comprehensiveSearchCategories}
        onSearch={async (query: string, category?: string): Promise<SearchableItem[]> => {
          // This would be replaced with actual search API calls
          // For now, return filtered default items
          return defaultSearchItems.filter(item =>
            (!category || item.category === category) &&
            (item.title.toLowerCase().includes(query.toLowerCase()) ||
             item.description?.toLowerCase().includes(query.toLowerCase()) ||
             item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())))
          );
        }}
        recentItems={[]}
        maxResults={8}
        enableLiveSearch={true}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications}
      />

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && navigationMode === 'sidebar' && (
        <div 
          className="fixed inset-0 z-30 bg-[var(--hive-background-primary)]/50 md:hidden"
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
  initialSidebarCollapsed = true,
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