"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AlignJustify, Search, Bell, Command, Zap, Settings, Hash } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced';
import { UserMenu } from './user-menu';
import { cn } from '../lib/utils';

interface NavigationHeaderProps {
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    builderStatus?: 'none' | 'pending' | 'active';
  } | null;
  currentSection?: 'profile' | 'spaces' | 'feed' | 'hivelab' | 'rituals';
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  showGlobalSearch?: boolean;
  showNotifications?: boolean;
  showBuilderAccess?: boolean;
  onOpenNotifications?: () => void;
  onOpenCommandPalette?: () => void;
  unreadNotificationCount?: number;
  height?: 'compact' | 'standard' | 'tall';
  className?: string;
}

export function NavigationHeader({ 
  user, 
  currentSection = 'profile',
  onToggleSidebar, 
  sidebarCollapsed,
  showGlobalSearch = true,
  showNotifications = true,
  showBuilderAccess = true,
  onOpenNotifications,
  onOpenCommandPalette,
  unreadNotificationCount = 0,
  height = 'compact',
  className 
}: NavigationHeaderProps) {
  const pathname = usePathname();

  // Get current section from pathname
  const getCurrentSection = () => {
    if (pathname === '/') return 'feed';
    if (pathname.startsWith('/spaces')) return 'spaces';
    if (pathname.startsWith('/profile')) return 'profile';
    if (pathname.startsWith('/build')) return 'hivelab';
    return currentSection;
  };

  const activeSection = getCurrentSection();
  // Dynamic header heights (mobile-optimized)
  const headerHeights = {
    compact: 'h-10',
    standard: 'h-12',
    tall: 'h-16',
  };

  // Section-specific contextual info
  const sectionContext = {
    profile: { title: 'Profile', subtitle: 'Your command center' },
    spaces: { title: 'Spaces', subtitle: 'Campus containers' },
    feed: { title: 'Feed', subtitle: 'Campus pulse' },
    hivelab: { title: 'HiveLAB', subtitle: 'Builder console' },
    rituals: { title: 'Rituals', subtitle: 'Platform experiences' },
  };

  const currentContext = sectionContext[activeSection];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        headerHeights[height],
        "backdrop-blur-xl border-b",
        "flex items-center justify-between",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        background: 'color-mix(in_srgb,var(--hive-background-primary)_80%,transparent)',
        backdropFilter: 'blur(4) saturate(180%)',
        borderColor: 'var(--hive-border-primary)',
        padding: `0 var(--hive-spacing-4)`,
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle */}
        <ButtonEnhanced
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
        >
          <AlignJustify className="h-4 w-4" />
        </ButtonEnhanced>

        {/* HIVE Logo & Section Context */}
        <div className="flex items-center gap-2">
          {/* HIVE Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--hive-brand-secondary)] rounded-md flex items-center justify-center">
              <Hash className="w-4 h-4 text-[var(--hive-text-inverse)]" />
            </div>
            <span className="font-semibold text-base tracking-tight text-[var(--hive-text-primary)]">
              HIVE
            </span>
          </div>

          {/* Section Separator & Context */}
          <div className="hidden md:flex items-center gap-2 text-[var(--hive-text-muted)]">
            <div className="w-1 h-4 bg-[var(--hive-border-primary)] rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[var(--hive-text-primary)]">
                {currentContext.title}
              </span>
              {height !== 'compact' && (
                <span className="text-xs text-[var(--hive-text-muted)]">
                  {currentContext.subtitle}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Global Search */}
      {showGlobalSearch && (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-[var(--hive-text-muted)]" 
            />
            <input
              type="text"
              placeholder="Search spaces, people, tools..."
              onClick={onOpenCommandPalette}
              readOnly
              className="w-full h-8 pl-8 pr-12 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm border border-[var(--hive-border-primary)] rounded-xl text-xs text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)]/50 focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all duration-200 cursor-pointer hover:border-[var(--hive-border-secondary)]"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <kbd className="inline-flex items-center px-1 py-0.5 rounded text-xs bg-[var(--hive-background-primary)]/60 text-[var(--hive-text-muted)] border border-[var(--hive-border-subtle)]">
                <Command className="h-2 w-2 mr-0.5" />
                K
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Builder Access (HiveLAB) */}
        {showBuilderAccess && user?.builderStatus !== 'none' && (
          <ButtonEnhanced
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
          >
            <Zap className="h-4 w-4" />
            {user?.builderStatus === 'active' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--hive-brand-primary)] rounded-full animate-pulse" />
            )}
          </ButtonEnhanced>
        )}

        {/* Notifications */}
        {showNotifications && (
          <ButtonEnhanced
            variant="ghost"
            size="sm"
            onClick={onOpenNotifications}
            className="h-9 w-9 p-0 relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full font-medium bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]">
                {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
              </div>
            )}
          </ButtonEnhanced>
        )}

        {/* Settings */}
        <ButtonEnhanced
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
        >
          <Settings className="h-4 w-4" />
        </ButtonEnhanced>

        {/* User Menu */}
        {user ? (
          <UserMenu user={user} />
        ) : (
          <ButtonEnhanced
            size="sm"
            variant="primary"
            className="font-medium"
          >
            Sign In
          </ButtonEnhanced>
        )}
      </div>
    </header>
  );
}