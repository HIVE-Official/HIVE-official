"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '@hive/auth-logic';
import {
  Home,
  Users,
  User,
  Wrench,
  Calendar,
  Sparkles,
} from 'lucide-react';

// Dynamically import the UniversalShell to avoid SSR issues
const UniversalShell = dynamic(
  () => import('@hive/ui').then(mod => mod.UniversalShell || mod.default),
  {
    ssr: false,
    loading: () => <ShellLoader />
  }
);

// Routes that should NOT have the shell (auth pages, landing, etc.)
const NO_SHELL_ROUTES = [
  '/auth/login',
  '/auth/verify',
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
  const { user } = useAuth();

  // Define navigation items based on HIVE's structure (migrated from NavigationLayout)
  const navigationItems = [
    // Tier 1: Primary Navigation (always visible in top bar)
    {
      id: 'feed',
      label: 'Feed',
      icon: <Home className="h-4 w-4" />,
      href: '/feed',
      tier: 1
    },
    {
      id: 'spaces',
      label: 'Spaces',
      icon: <Users className="h-4 w-4" />,
      href: '/spaces',
      tier: 1
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      href: '/profile',
      tier: 1
    },
    // Tier 3: Secondary Navigation (hamburger menu)
    {
      id: 'hivelab',
      label: 'HiveLab',
      icon: <Wrench className="h-4 w-4" />,
      href: '/hivelab',
      tier: 3
    },
    {
      id: 'events',
      label: 'Events',
      icon: <Calendar className="h-4 w-4" />,
      href: '/events',
      tier: 3
    },
    {
      id: 'rituals',
      label: 'Rituals',
      icon: <Sparkles className="h-4 w-4" />,
      href: '/rituals',
      tier: 3
    }
  ];

  // Mock notification and message counts (in production, these would come from hooks)
  const [notificationCount, setNotificationCount] = React.useState(5);
  const [messageCount, setMessageCount] = React.useState(3);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
    setNotificationCount(0);
  };

  const handleMessagesClick = () => {
    console.log('Messages clicked');
    setMessageCount(0);
  };

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
      <UniversalShell variant="minimal">
        {children}
      </UniversalShell>
    );
  }

  // For dashboard routes, use full shell with navigation
  // TODO: Extend UniversalShell to accept navigation props or create NavigationProvider
  return (
    <UniversalShell variant="full">
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