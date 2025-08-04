'use client';

import React, { lazy } from 'react';
import { 
  SuspenseBoundary, 
  ProfileSuspenseBoundary,
  SpacesSuspenseBoundary,
  ToolsSuspenseBoundary,
  FeedSuspenseBoundary
} from '@hive/ui';

// Lazy load page components for better performance
const LazyProfilePage = lazy(() => import('../app/(dashboard)/profile/page'));
const LazySpacesPage = lazy(() => import('../app/(dashboard)/spaces/page'));
const LazySpaceDetailsPage = lazy(() => import('../app/(dashboard)/spaces/[spaceId]/page'));
const LazyToolsPage = lazy(() => import('../app/(dashboard)/tools/page'));
const LazyToolDetailsPage = lazy(() => import('../app/(dashboard)/tools/[toolId]/run/page'));
const LazyFeedPage = lazy(() => import('../app/(dashboard)/feed/page'));
const LazyCalendarPage = lazy(() => import('../app/(dashboard)/calendar/page'));
const LazySettingsPage = lazy(() => import('../app/(dashboard)/settings/page'));

// Lazy page components with intelligent Suspense boundaries
export const LazyProfilePageWithSuspense = ({ userId, userName }: { userId?: string; userName?: string }) => (
  <ProfileSuspenseBoundary userId={userId} userName={userName}>
    <LazyProfilePage />
  </ProfileSuspenseBoundary>
);

export const LazySpacesPageWithSuspense = () => (
  <SpacesSuspenseBoundary>
    <LazySpacesPage />
  </SpacesSuspenseBoundary>
);

export const LazySpaceDetailsPageWithSuspense = ({ spaceId }: { spaceId: string }) => (
  <SpacesSuspenseBoundary spaceId={spaceId}>
    <LazySpaceDetailsPage />
  </SpacesSuspenseBoundary>
);

export const LazyToolsPageWithSuspense = () => (
  <ToolsSuspenseBoundary>
    <LazyToolsPage />
  </ToolsSuspenseBoundary>
);

export const LazyToolDetailsPageWithSuspense = ({ toolId }: { toolId: string }) => (
  <ToolsSuspenseBoundary toolId={toolId}>
    <LazyToolDetailsPage />
  </ToolsSuspenseBoundary>
);

export const LazyFeedPageWithSuspense = () => (
  <FeedSuspenseBoundary>
    <LazyFeedPage />
  </FeedSuspenseBoundary>
);

export const LazyCalendarPageWithSuspense = () => (
  <SuspenseBoundary
    context={{ pageType: 'calendar', feature: 'calendar-view' }}
    loadingStrategy="detailed"
    loadingResources={[
      {
        id: 'calendar-data',
        name: 'Loading your calendar',
        priority: 'critical',
        estimatedTime: 600,
      },
      {
        id: 'events',
        name: 'Loading events',
        priority: 'high',
        estimatedTime: 400,
        dependencies: ['calendar-data'],
      },
      {
        id: 'reminders',
        name: 'Loading reminders',
        priority: 'medium',
        estimatedTime: 300,
        dependencies: ['events'],
        skipOnSlowNetwork: true,
      }
    ]}
  >
    <LazyCalendarPage />
  </SuspenseBoundary>
);

export const LazySettingsPageWithSuspense = () => (
  <SuspenseBoundary
    context={{ pageType: 'settings', feature: 'user-settings' }}
    loadingStrategy="minimal"
    loadingResources={[
      {
        id: 'user-preferences',
        name: 'Loading your preferences',
        priority: 'critical',
        estimatedTime: 300,
      },
      {
        id: 'campus-settings',
        name: 'Loading campus settings',
        priority: 'medium',
        estimatedTime: 200,
        dependencies: ['user-preferences'],
      }
    ]}
  >
    <LazySettingsPage />
  </SuspenseBoundary>
);

// Generic lazy loader with custom Suspense boundary
export function LazyPageLoader<T extends Record<string, any>>({
  pageImport,
  boundaryType = 'default',
  context,
  ...props
}: {
  pageImport: () => Promise<{ default: React.ComponentType<T> }>;
  boundaryType?: 'default' | 'profile' | 'spaces' | 'tools' | 'feed';
  context?: {
    pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
    feature?: string;
    userId?: string;
    userName?: string;
    spaceId?: string;
    toolId?: string;
  };
} & T) {
  const LazyComponent = lazy(pageImport);
  
  const getBoundary = () => {
    switch (boundaryType) {
      case 'profile':
        return (
          <ProfileSuspenseBoundary userId={context?.userId} userName={context?.userName}>
            <LazyComponent {...props} />
          </ProfileSuspenseBoundary>
        );
      case 'spaces':
        return (
          <SpacesSuspenseBoundary spaceId={context?.spaceId}>
            <LazyComponent {...props} />
          </SpacesSuspenseBoundary>
        );
      case 'tools':
        return (
          <ToolsSuspenseBoundary toolId={context?.toolId}>
            <LazyComponent {...props} />
          </ToolsSuspenseBoundary>
        );
      case 'feed':
        return (
          <FeedSuspenseBoundary>
            <LazyComponent {...props} />
          </FeedSuspenseBoundary>
        );
      default:
        return (
          <SuspenseBoundary context={context}>
            <LazyComponent {...props} />
          </SuspenseBoundary>
        );
    }
  };
  
  return getBoundary();
}

// HOC for adding Suspense boundaries to existing components
export function withSuspenseBoundary<P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  boundaryProps?: {
    loadingStrategy?: 'minimal' | 'detailed' | 'branded' | 'progressive';
    context?: {
      pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
      feature?: string;
    };
    timeout?: number;
  }
) {
  const WrappedComponent = (props: P) => (
    <SuspenseBoundary
      loadingStrategy={boundaryProps?.loadingStrategy || 'detailed'}
      context={boundaryProps?.context}
      timeout={boundaryProps?.timeout}
    >
      <Component {...props} />
    </SuspenseBoundary>
  );
  
  WrappedComponent.displayName = `withSuspenseBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

export default LazyPageLoader;