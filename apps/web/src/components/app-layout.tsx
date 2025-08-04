"use client";

import React from 'react';
import { useSession } from '../hooks/use-session';
import { SidebarLayout } from './navigation/sidebar-layout';
import { ErrorBoundary } from './error-boundary';

interface AppLayoutProps {
  children: React.ReactNode;
  hideShell?: boolean;
}

/**
 * Main application layout wrapper that provides the HIVE product shell
 * for authenticated pages. This includes sidebar navigation, user menu, 
 * search functionality, and notification center.
 * 
 * Uses the SidebarLayout for tech-sleek navigation experience.
 */
export function AppLayout({ children, hideShell = false }: AppLayoutProps) {
  const { isLoading } = useSession();

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

  // Use SidebarLayout for tech-sleek navigation experience with error boundary
  return (
    <ErrorBoundary>
      <SidebarLayout>{children}</SidebarLayout>
    </ErrorBoundary>
  );
}