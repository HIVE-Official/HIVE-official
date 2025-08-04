'use client';

import React from 'react';
import { SuspenseBoundary } from "@hive/ui";
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
  children, 
  pageType = 'profile',
  userId,
  userName
}: EnhancedDashboardLayoutProps) {
  return (
    <AuthGuard requireAuth={true}>
      <SuspenseBoundary
        loadingStrategy="progressive"
        context={{
          user: userId ? { id: userId, name: userName } : undefined,
          pageType,
          feature: `${pageType}-page`
        }}
        enablePreloading={true}
        timeout={12000} // 12 seconds timeout for dashboard loads
        // Custom loading resources based on page type
        loadingResources={getPageLoadingResources(pageType)}
        // Enhanced error handling for dashboard context
        errorFallback={(error, retry) => (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-hive-gold/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-hive-text-primary">
                  {error.studentFriendly.title}
                </h2>
                <p className="text-hive-text-secondary">
                  {error.studentFriendly.description}
                </p>
                {error.studentFriendly.encouragement && (
                  <p className="text-sm text-hive-gold italic">
                    {error.studentFriendly.encouragement}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                {error.recovery.isRetryable && (
                  <button
                    onClick={retry}
                    className="w-full px-4 py-2 bg-hive-gold text-hive-text-primary rounded-lg hover:bg-hive-gold/90 transition-colors"
                  >
                    Try loading dashboard again
                  </button>
                )}
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full px-4 py-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors"
                >
                  Go to HIVE home
                </button>
              </div>
            </div>
          </div>
        )}
      >
        <AppLayout>
          {children}
        </AppLayout>
      </SuspenseBoundary>
    </AuthGuard>
  );
}

// Get loading resources specific to each page type
function getPageLoadingResources(pageType: EnhancedDashboardLayoutProps['pageType']) {
  const baseResources = [
    {
      id: 'auth-check',
      name: 'Verifying your session',
      priority: 'critical' as const,
      estimatedTime: 200,
    },
    {
      id: 'app-shell',
      name: 'Loading HIVE interface',
      priority: 'critical' as const,
      estimatedTime: 300,
      dependencies: ['auth-check'],
    },
    {
      id: 'navigation',
      name: 'Setting up navigation',
      priority: 'high' as const,
      estimatedTime: 150,
      dependencies: ['app-shell'],
    }
  ];

  const pageSpecificResources = {
    profile: [
      {
        id: 'profile-data',
        name: 'Loading your profile',
        priority: 'high' as const,
        estimatedTime: 500,
        dependencies: ['navigation'],
      },
      {
        id: 'profile-spaces',
        name: 'Loading your spaces',
        priority: 'medium' as const,
        estimatedTime: 400,
        dependencies: ['profile-data'],
      },
      {
        id: 'profile-tools',
        name: 'Loading your tools',
        priority: 'medium' as const,
        estimatedTime: 350,
        dependencies: ['profile-data'],
      }
    ],
    spaces: [
      {
        id: 'spaces-list',
        name: 'Loading campus spaces',
        priority: 'high' as const,
        estimatedTime: 600,
        dependencies: ['navigation'],
      },
      {
        id: 'spaces-recommendations',
        name: 'Finding spaces for you',
        priority: 'medium' as const,
        estimatedTime: 450,
        dependencies: ['spaces-list'],
        skipOnSlowNetwork: true,
      }
    ],
    tools: [
      {
        id: 'tools-library',
        name: 'Loading tool library',
        priority: 'high' as const,
        estimatedTime: 550,
        dependencies: ['navigation'],
      },
      {
        id: 'user-tools',
        name: 'Loading your tools',
        priority: 'medium' as const,
        estimatedTime: 400,
        dependencies: ['tools-library'],
      }
    ],
    feed: [
      {
        id: 'feed-posts',
        name: 'Loading latest posts',
        priority: 'high' as const,
        estimatedTime: 700,
        dependencies: ['navigation'],
      },
      {
        id: 'feed-connections',
        name: 'Loading your connections',
        priority: 'medium' as const,
        estimatedTime: 350,
        dependencies: ['feed-posts'],
      }
    ],
    calendar: [
      {
        id: 'calendar-events',
        name: 'Loading your calendar',
        priority: 'high' as const,
        estimatedTime: 500,
        dependencies: ['navigation'],
      },
      {
        id: 'campus-events',
        name: 'Loading campus events',
        priority: 'medium' as const,
        estimatedTime: 450,
        dependencies: ['calendar-events'],
        skipOnSlowNetwork: true,
      }
    ],
    settings: [
      {
        id: 'user-settings',
        name: 'Loading your settings',
        priority: 'high' as const,
        estimatedTime: 300,
        dependencies: ['navigation'],
      },
      {
        id: 'preferences',
        name: 'Loading preferences',
        priority: 'medium' as const,
        estimatedTime: 250,
        dependencies: ['user-settings'],
      }
    ]
  };

  return [
    ...baseResources,
    ...(pageSpecificResources[pageType || 'profile'] || pageSpecificResources.profile)
  ];
}

export default EnhancedDashboardLayout;