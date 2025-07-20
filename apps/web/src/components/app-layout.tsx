"use client";

import React from 'react';
import { EnhancedAppShell } from '@hive/ui';
import { useSession } from '../hooks/use-session';
import { TopNavLayout } from './navigation/top-nav-layout';
import { CommandNavLayout } from './navigation/command-nav-layout';
// import { darkLuxury, luxuryRadius, luxurySpacing } from '@hive/ui/src/theme/dark-luxury';

interface AppLayoutProps {
  children: React.ReactNode;
  hideShell?: boolean;
}

/**
 * Main application layout wrapper that provides the HIVE product shell
 * for authenticated pages. This includes navigation, user menu, command palette,
 * and notification center.
 * 
 * Automatically integrates with the existing useAuth hook to provide
 * user context to the shell.
 */
export function AppLayout({ children, hideShell = false }: AppLayoutProps) {
  const { user, isLoading, isAuthenticated } = useSession();

  // Pages that should not show the shell (auth, onboarding, etc.)
  if (hideShell) {
    return <>{children}</>;
  }

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div 
          className="flex items-center"
          style={{ 
            gap: '16px',
            color: '#e5e5e5',
          }}
        >
          <div 
            className="w-6 h-6 animate-pulse"
            style={{
              backgroundColor: '#fbbf24',
              borderRadius: '8px',
            }}
          />
          <span 
            className="font-medium"
            style={{ color: '#e5e5e5' }}
          >
            Loading HIVE...
          </span>
        </div>
      </div>
    );
  }

  // Default to enhanced app shell
  const shellUser = user ? {
    id: user.id,
    name: user.fullName || user.email?.split('@')[0] || 'User',
    handle: user.handle || user.email?.split('@')[0] || 'user',
    avatar: user.avatarUrl
  } : null;

  return (
    <EnhancedAppShell user={shellUser}>
      {children}
    </EnhancedAppShell>
  );
}