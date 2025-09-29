'use client';

import React, { lazy, Suspense } from 'react';

// Lazy load page components for better performance
// const LazyProfilePage = lazy(() => import('../app/(dashboard)/profile/page')); // Deleted in refactor
// const LazySpacesPage = lazy(() => import('../app/(dashboard)/spaces/page'));
// const LazySpaceDetailsPage = lazy(() => import('../app/(dashboard)/spaces/[spaceId]/page'));
// const LazyToolsPage = lazy(() => import('../app/(dashboard)/tools/page'));
// const LazyToolDetailsPage = lazy(() => import('../app/(dashboard)/tools/[toolId]/run/page'));
// const LazyFeedPage = lazy(() => import('../app/(dashboard)/feed/page'));
// const LazyCalendarPage = lazy(() => import('../app/(dashboard)/calendar/page'));
// const LazySettingsPage = lazy(() => import('../app/(dashboard)/settings/page'));

// Loading fallback component
const LoadingFallback = ({ pageName }: { pageName: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-8 h-8 border-2 border-hive-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-hive-text-secondary">Loading {pageName}...</p>
    </div>
  </div>
);

// Lazy page components with React Suspense
// Commented out - profile page deleted in refactor
// export const LazyProfilePageWithSuspense = ({ userId, userName }: { userId?: string; userName?: string }) => (
//   <Suspense fallback={<LoadingFallback pageName="Profile" />}>
//     <LazyProfilePage />
//   </Suspense>
// );

// Commented out - these pages have been removed
// export const LazySpacesPageWithSuspense = () => (
//   <Suspense fallback={<LoadingFallback pageName="Spaces" />}>
//     <LazySpacesPage />
//   </Suspense>
// );

// export const LazySpaceDetailsPageWithSuspense = ({ spaceId }: { spaceId: string }) => (
//   <Suspense fallback={<LoadingFallback pageName="Space Details" />}>
//     <LazySpaceDetailsPage params={Promise.resolve({ spaceId })} />
//   </Suspense>
// );

// export const LazyToolsPageWithSuspense = () => (
//   <Suspense fallback={<LoadingFallback pageName="Tools" />}>
//     <LazyToolsPage />
//   </Suspense>
// );

// export const LazyToolDetailsPageWithSuspense = ({ toolId }: { toolId: string }) => (
//   <Suspense fallback={<LoadingFallback pageName="Tool" />}>
//     <LazyToolDetailsPage />
//   </Suspense>
// );

// export const LazyFeedPageWithSuspense = () => (
//   <Suspense fallback={<LoadingFallback pageName="Feed" />}>
//     <LazyFeedPage />
//   </Suspense>
// );

// export const LazyCalendarPageWithSuspense = () => (
//   <Suspense fallback={<LoadingFallback pageName="Calendar" />}>
//     <LazyCalendarPage />
//   </Suspense>
// );

// export const LazySettingsPageWithSuspense = () => (
//   <Suspense fallback={<LoadingFallback pageName="Settings" />}>
//     <LazySettingsPage />
//   </Suspense>
// );

// Generic lazy loader with context
interface LazyPageLoaderProps {
  pageType: 'profile' | 'spaces' | 'space-details' | 'tools' | 'tool-details' | 'feed' | 'calendar' | 'settings';
  context?: {
    userId?: string;
    userName?: string;
    spaceId?: string;
    toolId?: string;
  };
}

export function LazyPageLoader({ pageType, context }: LazyPageLoaderProps) {
  switch (pageType) {
    case 'profile':
      return <LoadingFallback pageName="Profile" />; // Profile page was deleted
    case 'spaces':
    case 'space-details':
    case 'tools':
    case 'tool-details':
    case 'feed':
    case 'calendar':
    case 'settings':
      // These pages have been removed - fallback to profile
      return <LoadingFallback pageName="Page Unavailable" />;
    default:
      return <LoadingFallback pageName="Profile" />; // Profile page was deleted
  }
}

export default LazyPageLoader;