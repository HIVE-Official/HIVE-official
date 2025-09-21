"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavigationContainer, type NavigationUser } from '../../navigation';
import { EnhancedHiveCommandPalette, comprehensiveSearchCategories, defaultSearchItems, type SearchableItem } from '../enhanced-hive-command-palette';
import { NotificationCenter } from './notification-center';
import { NotificationProvider, useNotifications } from './notification-service';
import { PageTransition } from '../page-transition';
import { cn } from '../../lib/utils';

interface User {id: string;
  name: string;
  handle: string;
  avatar?: string;
  builderStatus?: 'none' | 'pending' | 'active';
  role?: 'student' | 'faculty' | 'admin'}

interface EnhancedAppShellProps {children: React.ReactNode;
  user?: User | null;
  className?: string;}

function AppShellContent({ 
  children, 
  user, 
  className;
}: {
  children: React.ReactNode;
  user?: User | null;
  className?: string;
}) {
  const { notifications, unreadCount } = useNotifications();
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = React.useState(false);

  // Convert user to NavigationUser format;
  const navigationUser: NavigationUser = user ? {
    id: user.id,
    name: user.name,
    handle: user.handle,
    avatar: user.avatar,
    builderStatus: user.builderStatus || 'none',
    role: user.role || 'student',
    preferences: {
      layout: 'auto',
      sidebarCollapsed: false,
      enableKeyboardShortcuts: true,
      enableAnimations: true,
      theme: 'system'
    }
  } : {
    id: 'guest',
    name: 'Guest User',
    handle: 'guest',
    builderStatus: 'none',
    role: 'student',
    preferences: {
      layout: 'auto',
      sidebarCollapsed: false,
      enableKeyboardShortcuts: true,
      enableAnimations: true,
      theme: 'system'
    }
  };

  // Setup keyboard shortcuts;
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command palette shortcut;
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }}
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, []);

  return (
    <div;
      className={cn("min-h-screen", className)}
      style={{
        backgroundColor: 'var(--hive-background-primary)',
        color: 'var(--hive-text-primary)',
          }}
    >
      {/* New Navigation System with Content */}
      <NavigationContainer;
        user={navigationUser}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenNotifications={() => setNotificationCenterOpen(true)}
        unreadNotificationCount={unreadCount}
      >
        {/* Main Content Area */}
        <PageTransition className="min-h-full p-4 sm:p-5 hive-spacing-responsive">
          {children}
        </PageTransition>
      </NavigationContainer>

      {/* Enhanced Command Palette */}
      <EnhancedHiveCommandPalette;
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        staticItems={defaultSearchItems}
        categories={comprehensiveSearchCategories}
        onSearch={async (query: string, category?: string): Promise<SearchableItem[]> => {
          // This would be replaced with actual search API calls;
          // For now, return filtered default items;
          return defaultSearchItems.filter(item =>
            (!category || item.category === category) &&
            (item.title.toLowerCase().includes(query.toLowerCase()) ||
             item.description?.toLowerCase().includes(query.toLowerCase()) ||
             item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())))
          )
          }}
        recentItems={[]}
        maxResults={8}
        enableLiveSearch={true}
      />

      {/* Notification Center */}
      <NotificationCenter;
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications}
      />
    </div>
  )
}

export function EnhancedAppShell({
  children,
  user,
  className;
}: EnhancedAppShellProps) {
  return (
    <NotificationProvider>
      <AppShellContent user={user} className={className}>
        {children}
      </AppShellContent>
    </NotificationProvider>
  )
}