/**
 * React hooks for activity tracking in HIVE
 */

import { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  trackPageView, 
  trackButtonClick, 
  trackSearch,
  trackContentCreation,
  trackToolUsage
} from '@/lib/activity-tracking';
import { useRouter } from 'next/navigation';

/**
 * Hook to track page views automatically
 */
export function usePageTracking(spaceId?: string) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.id) return;

    // Track initial page view
    const pathname = window.location.pathname;
    trackPageView(session.user.id, pathname, spaceId);

    // Track navigation changes
    const handleRouteChange = () => {
      const newPathname = window.location.pathname;
      trackPageView(session.user.id, newPathname, spaceId);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [session, spaceId]);
}

/**
 * Hook to get activity tracking functions
 */
export function useActivityTracking() {
  const { data: session } = useSession();

  const trackButton = useCallback((buttonId: string, spaceId?: string) => {
    if (!session?.user?.id) return;
    trackButtonClick(session.user.id, buttonId, spaceId);
  }, [session]);

  const trackSearchQuery = useCallback((query: string, spaceId?: string) => {
    if (!session?.user?.id) return;
    trackSearch(session.user.id, query, spaceId);
  }, [session]);

  const trackContent = useCallback((
    contentType: string,
    contentId: string,
    spaceId?: string
  ) => {
    if (!session?.user?.id) return;
    trackContentCreation(session.user.id, contentType, contentId, spaceId);
  }, [session]);

  const trackTool = useCallback((
    toolId: string,
    toolName: string,
    spaceId?: string
  ) => {
    if (!session?.user?.id) return;
    trackToolUsage(session.user.id, toolId, toolName, spaceId);
  }, [session]);

  return {
    trackButton,
    trackSearch: trackSearchQuery,
    trackContent,
    trackTool
  };
}

/**
 * Hook to track time spent on a page
 */
export function useTimeTracking(pageName: string, spaceId?: string) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime) / 60000); // Convert to minutes

      if (duration > 0) {
        // Track the visit with duration
        import('@/lib/activity-tracking').then(({ trackActivity }) => {
          trackActivity({
            userId: session.user.id,
            type: 'space_visit',
            spaceId,
            spaceName: pageName,
            duration,
            metadata: {
              page: pageName
            }
          });
        });
      }
    };
  }, [session, pageName, spaceId]);
}