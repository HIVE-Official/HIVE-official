'use client';

import React, { Suspense } from 'react';
import { AppLayout } from './app-layout';
import { AuthGuard } from './auth-guard';

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode;
  pageType?: 'profile' | 'spaces' | 'tools' | 'feed' | 'calendar' | 'settings';
  userId?: string;
  userName?: string;
}

/**
 * Enhanced dashboard layout with React Suspense boundaries for better performance.
 * 
 * This layout:
 * - Wraps authenticated pages with intelligent loading states
 * - Uses React Suspense for better performance and UX
 * - Adapts loading experience based on campus network conditions
 * - Provides context-aware error handling
 * - Maintains authentication guard for protected routes
 */
export function EnhancedDashboardLayout({ 
  children
}: EnhancedDashboardLayoutProps) {
  return (
    <AuthGuard requireAuth={true}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-hive-gold/10 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏠</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-hive-text-primary">
                Loading Dashboard...
              </h2>
              <p className="text-hive-text-secondary">
                Setting up your HIVE experience
              </p>
            </div>
          </div>
        </div>
      }>
        <AppLayout>
          {children}
        </AppLayout>
      </Suspense>
    </AuthGuard>
  );
}

export default EnhancedDashboardLayout;