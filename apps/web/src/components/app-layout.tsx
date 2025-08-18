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
      <div className="min-h-screen flex items-center justify-center bg-hive-background-primary">
        <div className="flex items-center gap-4 text-hive-text-secondary">
          <div className="w-6 h-6 animate-pulse bg-hive-brand-primary rounded-lg" />
          <span className="font-medium text-hive-text-secondary">
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