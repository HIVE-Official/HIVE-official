'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Search, Bell, Settings, Command } from 'lucide-react';
import { Button } from './button';
import { Avatar } from './avatar';

export interface NavBarProps {
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
  } | null;
  showSearch?: boolean;
  showNotifications?: boolean;
  unreadCount?: number;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onUserClick?: () => void;
  className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  user,
  showSearch = true,
  showNotifications = true,
  unreadCount = 0,
  onSearchClick,
  onNotificationsClick,
  onSettingsClick,
  onUserClick,
  className,
}) => {
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';

  return (
    <nav className={cn(
      'flex items-center justify-between h-14 px-6',
      'bg-[var(--hive-background-primary)]',
      'border-b border-[var(--hive-border-primary)]',
      'backdrop-blur-xl',
      className
    )}>
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg 
              className="w-8 h-8"
              viewBox="0 0 1500 1500" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="var(--hive-brand-secondary)"
                d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
              />
            </svg>
          </div>
          <span className="font-bold text-lg text-[var(--hive-text-primary)] tracking-tight">
            HIVE
          </span>
        </div>
      </div>

      {/* Search Section */}
      {showSearch && (
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]" />
            <input
              type="text"
              placeholder="Search spaces, people, tools..."
              onClick={onSearchClick}
              readOnly
              className={cn(
                'w-full h-10 pl-10 pr-12',
                'bg-[var(--hive-background-secondary)]',
                'border border-[var(--hive-border-primary)]',
                'rounded-2xl',
                'text-sm text-[var(--hive-text-primary)]',
                'placeholder-[var(--hive-text-muted)]',
                'cursor-pointer',
                'transition-all duration-200',
                'hover:border-[var(--hive-brand-secondary)]',
                'focus:outline-none focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20'
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] border border-[var(--hive-border-primary)]">
                <Command className="h-2.5 w-2.5 mr-1" />
                K
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Actions Section */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        {showNotifications && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationsClick}
            className="h-10 w-10 p-0 relative"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-[var(--hive-text-inverse)]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </div>
            )}
          </Button>
        )}

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="h-10 w-10 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Avatar */}
        {user ? (
          <div 
            onClick={onUserClick} 
            className="cursor-pointer w-8 h-8 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-primary)] rounded-xl flex items-center justify-center text-sm font-medium text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-secondary)] transition-colors"
          >
            {initials}
          </div>
        ) : (
          <Button
            variant="accent"
            size="sm"
            className="font-medium"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};