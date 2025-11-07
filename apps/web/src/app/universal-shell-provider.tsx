"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '@hive/auth-logic';
import {
  DEFAULT_MOBILE_NAV_ITEMS,
  DEFAULT_SIDEBAR_NAV_ITEMS,
  type ShellMobileNavItem,
  type ShellNavItem,
  type ShellSpaceLink,
  type ShellSpaceSection,
} from '@hive/ui';
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications';
import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';

// Import UniversalShell with SSR support for better performance
const UniversalShell = dynamic(
  () => import('@hive/ui').then(mod => mod.UniversalShell || mod.default),
  {
    ssr: true, // Enable SSR for better initial load performance
    loading: () => <ShellLoader />
  }
);

// Routes that should NOT have the shell (auth pages, landing, etc.)
const NO_SHELL_ROUTES = [
  '/auth/login',
  '/auth/verify',
  '/signin',
  '/onboarding',
  '/landing',
  '/waitlist',
  '/schools',
  '/debug-auth',
];

// Routes that should have a minimal shell (public profiles)
const MINIMAL_SHELL_ROUTES = [
  '/profile/', // Public profile pages
];

export function UniversalShellProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const auth = useAuth(); // Ensure auth is initialized even if user data isn't required yet
  const router = useRouter();
  const {
    notifications: realtimeNotifications,
    unreadCount: realtimeUnreadCount,
    loading: notificationsLoading,
    error: notificationsError,
  } = useRealtimeNotifications();

  const notificationsPayload = React.useMemo(
    () =>
      realtimeNotifications.map(notification => ({
        ...notification,
        timestamp: {
          toDate: () => notification.timestamp.toDate(),
        },
      })) as Array<Record<string, unknown>>,
    [realtimeNotifications]
  );

  const notificationCount = realtimeUnreadCount;

  const emptySections = React.useMemo<ShellSpaceSection[]>(() => [
    {
      id: 'residential',
      label: 'Residential',
      description: 'Dorm & living communities',
      spaces: [],
      actionLabel: 'Update hall',
      actionHref: '/profile',
      emptyCopy: 'Add your hall so neighbors can find you.',
    },
    {
      id: 'greek',
      label: 'Greek Life',
      description: 'Chapters & councils',
      spaces: [],
      emptyCopy: 'Rush is paused. Check back before the spring window.',
    },
    {
      id: 'student_org',
      label: 'Student Org',
      description: 'Clubs & builders',
      spaces: [],
      actionLabel: 'Browse orgs',
      actionHref: '/spaces?tab=discover',
      emptyCopy: 'Join a squad or launch one from scratch.',
    },
    {
      id: 'university_org',
      label: 'University Org',
      description: 'Official campus teams',
      spaces: [],
      actionLabel: 'View directory',
      actionHref: '/spaces?tab=discover&filter=university',
      emptyCopy: 'Track the official campus teams you work with.',
    },
  ], []);

  const [mySpaces, setMySpaces] = React.useState<ShellSpaceSection[]>(emptySections);

  React.useEffect(() => {
    let cancelled = false;

    const resolveJoinedAt = (value: any): Date | undefined => {
      if (!value) return undefined;
      if (typeof value.toDate === 'function') return value.toDate();
      if (typeof value.toMillis === 'function') return new Date(value.toMillis());
      if (value instanceof Date) return value;
      if (typeof value === 'string') {
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
      }
      if (typeof value.seconds === 'number') {
        return new Date(value.seconds * 1000);
      }
      return undefined;
    };

    const determineStatus = (space: any): ShellSpaceLink['status'] => {
      const joinedAt = resolveJoinedAt(space?.membership?.joinedAt);
      if (joinedAt) {
        const hoursSinceJoin = (Date.now() - joinedAt.getTime()) / 36e5;
        if (hoursSinceJoin < 120) {
          return 'new';
        }
      }

      if (space?.membership?.isOwner || space?.membership?.isAdmin || ['owner', 'admin'].includes(space?.membership?.role)) {
        return 'live';
      }

      const memberCount = typeof space?.metrics?.memberCount === 'number' ? space.metrics.memberCount : 0;
      if (memberCount >= 40) {
        return 'live';
      }

      return 'quiet';
    };

    const resolveTimestamp = (value: any): number => {
      if (!value) return 0;
      if (typeof value.toMillis === 'function') return value.toMillis();
      if (typeof value.toDate === 'function') return value.toDate().getTime();
      if (value instanceof Date) return value.getTime();
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = Date.parse(value);
        return Number.isNaN(parsed) ? 0 : parsed;
      }
      if (typeof value.seconds === 'number') return value.seconds * 1000;
      return 0;
    };

    const normalizeTokens = (...values: Array<string | null | undefined | string[]>) => {
      return values
        .flatMap((value) => {
          if (!value) return [];
          if (Array.isArray(value)) {
            return value.flatMap((item) => String(item ?? '').toLowerCase());
          }
          return [String(value).toLowerCase()];
        })
        .filter(Boolean);
    };

    const categorizeSpace = (space: any): 'residential' | 'greek' | 'student_org' | 'university_org' => {
      const tokens = normalizeTokens(
        space?.category,
        space?.type,
        ...(Array.isArray(space?.tags) ? space.tags : []),
        space?.name,
        space?.description
      );

      const includesAny = (keywords: string[]) => keywords.some(keyword => tokens.some(token => token.includes(keyword)));

      if (includesAny(['residential', 'housing', 'residence', 'dorm', 'hall', 'living'])) {
        return 'residential';
      }

      if (includesAny(['greek', 'fraternity', 'sorority', 'chapter', 'panhellenic', 'ifc'])) {
        return 'greek';
      }

      if (includesAny(['university', 'campus', 'department', 'office', 'administration', 'services', 'admissions'])) {
        return 'university_org';
      }

      return 'student_org';
    };

    const formatMeta = (space: any) => {
      const membership = space?.membership ?? {};
      const role = membership.role;
      const isPinned = membership.isPinned;
      const isFavorite = membership.isFavorite;
      const memberCount =
        typeof space?.metrics?.memberCount === 'number'
          ? space.metrics.memberCount
          : typeof space?.memberCount === 'number'
            ? space.memberCount
            : undefined;

      const flags: string[] = [];

      if (role === 'owner') flags.push('You lead');
      else if (role === 'admin') flags.push('Admin');
      else if (role && role !== 'member') flags.push(role.charAt(0).toUpperCase() + role.slice(1));

      if (isPinned) flags.push('Pinned');
      if (isFavorite) flags.push('Favorite');

      if (typeof memberCount === 'number' && memberCount > 0) {
        flags.push(`${memberCount} members`);
      }

      return flags.join(' · ');
    };

    const loadMySpaces = async () => {
      try {
        const response = await apiClient.get('/api/profile/my-spaces?limit=12', { suppressToast: true });
        if (!response.ok) {
          logger.warn('shell: failed to fetch my-spaces', {
            status: response.status,
            statusText: response.statusText,
            component: 'UniversalShellProvider',
          });
          return;
        }

        const payload = await response.json();
        if (cancelled) return;

        const candidateLists = [
          payload?.spaces,
          payload?.categorized?.recent,
          payload?.categorized?.owned,
          payload?.categorized?.adminned,
          payload?.categorized?.favorited,
          payload?.categorized?.joined,
        ].filter((list: unknown): list is any[] => Array.isArray(list));

        const spaceIndex = new Map<string, any>();
        candidateLists.forEach((list) => {
          list.forEach((item) => {
            if (item?.id && !spaceIndex.has(item.id)) {
              spaceIndex.set(item.id, item);
            } else if (item?.id) {
              // Merge membership data if missing on existing record
              const existing = spaceIndex.get(item.id);
              spaceIndex.set(item.id, {
                ...item,
                ...existing,
                membership: { ...(existing?.membership ?? {}), ...(item.membership ?? {}) },
              });
            }
          });
        });

        const sections: ShellSpaceSection[] = emptySections.map((section) => ({
          ...section,
          spaces: [],
        }));

        const sectionEntries: Record<string, Array<{ link: ShellSpaceLink; priority: number; lastActive: number }>> = {
          residential: [],
          greek: [],
          student_org: [],
          university_org: [],
        };

        const makeLink = (space: any): ShellSpaceLink => ({
          id: space.id,
          label: space.name ?? 'Untitled Space',
          href: `/spaces/${space.id}`,
          status: determineStatus(space),
          meta: formatMeta(space),
        });

        spaceIndex.forEach((space) => {
          if (!space?.id) return;
          const sectionId = categorizeSpace(space);
          const membership = space?.membership ?? {};
          const priority =
            membership.role === 'owner'
              ? 0
              : membership.role === 'admin'
                ? 1
                : membership.isPinned
                  ? 2
                  : membership.isFavorite
                    ? 3
                    : 4;
          const lastActive = resolveTimestamp(
            membership.lastVisited ?? membership.joinedAt ?? space.updatedAt ?? space.createdAt
          );

          const bucket = sectionEntries[sectionId] ?? sectionEntries.student_org;
          bucket.push({
            link: makeLink(space),
            priority,
            lastActive,
          });
        });

        // Ensure sections preserve order and trimmed duplicates
        sections.forEach((section) => {
          const seen = new Set<string>();
          const entries = sectionEntries[section.id] ?? [];
          section.spaces = entries
            .sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.lastActive - a.lastActive;
            })
            .map((entry) => entry.link)
            .filter((space) => {
              if (seen.has(space.id)) return false;
              seen.add(space.id);
              return true;
            })
            .slice(0, 6);
        });

        if (cancelled) return;
        setMySpaces(sections);
      } catch (error) {
        logger.error('shell: error loading my-spaces', error as Error, {
          component: 'UniversalShellProvider',
        });
      }
    };

    loadMySpaces();

    return () => {
      cancelled = true;
    };
  }, [emptySections]);

  const isLeader = auth.user?.isBuilder ?? auth.user?.builderOptIn ?? false;

  const desktopNavItems: ShellNavItem[] = React.useMemo(() => {
    const cloneItems = (items: ShellNavItem[]): ShellNavItem[] =>
      items.map((item) => ({
        ...item,
        children: item.children ? cloneItems(item.children) : undefined,
      }));

    const items = cloneItems(DEFAULT_SIDEBAR_NAV_ITEMS);
    return isLeader ? items : items.filter((item) => item.id !== 'hivelab');
  }, [isLeader]);

  const mobileNavItems: ShellMobileNavItem[] = React.useMemo(() => {
    const items = DEFAULT_MOBILE_NAV_ITEMS.map((item) => ({ ...item }));
    return isLeader ? items : items.filter((item) => item.id !== 'hivelab');
  }, [isLeader]);

  // Check if current route should have no shell
  const shouldHaveNoShell = NO_SHELL_ROUTES.some(route =>
    pathname?.startsWith(route) || pathname === '/'
  );

  // Check if current route should have minimal shell
  const shouldHaveMinimalShell = MINIMAL_SHELL_ROUTES.some(route =>
    pathname?.includes(route) && !pathname?.startsWith('/(dashboard)')
  );

  // For routes without shell, render children directly
  if (shouldHaveNoShell) {
    return <>{children}</>;
  }

  // For routes with minimal shell (public pages)
  if (shouldHaveMinimalShell) {
    return (
      <UniversalShell
        variant="minimal"
        navItems={desktopNavItems}
        mobileNavItems={mobileNavItems}
        notificationCount={notificationCount}
        messageCount={0}
        notifications={notificationsPayload}
        notificationsLoading={notificationsLoading}
        notificationsError={notificationsError}
        mySpaces={mySpaces}
        onNotificationNavigate={(url) => router.push(url)}
      >
        {children}
      </UniversalShell>
    );
  }

  // Determine if we should hide the global context rail on deep Spaces views
  const hideContextRail = React.useMemo(() => {
    if (!pathname) return false;
    if (!pathname.startsWith('/spaces/')) return false;
    // Keep rail on directory-style routes
    if (/^\/spaces\/(browse|search|create)(\/|$)/.test(pathname)) return false;
    // Hide for actual Space details (id or slug paths)
    return true;
  }, [pathname]);

  // For dashboard routes, use full shell with navigation
  // TODO: Extend UniversalShell to accept navigation props or create NavigationProvider
  return (
    <UniversalShell
      variant="full"
      sidebarStyle="sleek"
      headerStyle="minimal"
      navItems={desktopNavItems}
      mobileNavItems={mobileNavItems}
      notificationCount={notificationCount}
      messageCount={0}
      notifications={notificationsPayload}
      notificationsLoading={notificationsLoading}
      notificationsError={notificationsError}
      mySpaces={mySpaces}
      showContextRail={false}
      showBreadcrumbs={false}
      onNotificationNavigate={(url) => router.push(url)}
    >
      {children}
    </UniversalShell>
  );
}

// Loading component while shell loads
function ShellLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-[var(--hive-brand-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60 animate-pulse">Loading HIVE...</p>
      </div>
    </div>
  );
}
