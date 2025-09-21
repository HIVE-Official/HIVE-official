'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Avatar } from '../atoms/avatar';
import { Text } from '../atoms/text';
import { Link } from '../atoms/link';
import { Badge } from '../atoms/badge';

export interface HeaderProps {logo?: React.ReactNode;
  title?: string;
  navigation?: Array<{
    label: string;
    href: string;
    active?: boolean;
    badge?: number;}>;
  user?: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away' | 'busy'
  };
  actions?: React.ReactNode;
  notifications?: number;
  variant?: 'default' | 'minimal' | 'glass';
  sticky?: boolean;
  className?: string;
  onUserClick?: () => void;
  onNotificationsClick?: () => void;
}

const headerVariants = {
  default: [
    'bg-hive-background-primary',
    'border-b border-hive-border-default'
  ].join(' '),
  minimal: [
    'bg-transparent'
  ].join(' '),
  glass: [
    'bg-hive-background-overlay/80',
    'backdrop-blur-md',
    'border-b border-hive-border-default/50'
  ].join(' ')
};

export const Header: React.FC<HeaderProps> = ({
  logo,
  title,
  navigation = [],
  user,
  actions,
  notifications,
  variant = 'default',
  sticky = true,
  className,
  onUserClick,
  onNotificationsClick;
}) => {
  const baseClasses = [
    'w-full z-50',
    sticky && 'sticky top-0',
    headerVariants[variant]
  ].filter(Boolean).join(' ');

  return (
    <header className={cn(baseClasses, className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Title */}
          <div className="flex items-center gap-4">
            {logo && (
              <div className="flex-shrink-0">
                {logo}
              </div>
            )}
            {title && (
              <Text variant="heading-lg" color="primary">
                {title}
              </Text>
            )}
          </div>

          {/* Center Section - Navigation */}
          {navigation.length > 0 && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.href} className="relative flex items-center">
                  <Link;
                    href={item.href}
                    variant={item.active ? 'default' : 'ghost'}
                    className={cn(
                      'px-3 py-2 rounded-lg',
                      item.active && 'bg-hive-background-interactive'
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.badge && item.badge > 0 && (
                    <Badge;
                      count={item.badge}
                      size="sm"
                      variant="error"
                      className="absolute -top-1 -right-1"
                    />
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-3">
            {/* Custom Actions */}
            {actions}

            {/* Notifications */}
            {notifications !== undefined && (
              <div className="relative">
                <Button;
                  variant="ghost"
                  size="icon"
                  onClick={onNotificationsClick}
                  aria-label={`${notifications} notifications`}
                >
                  <svg;
                    className="h-5 w-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path;
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                  </svg>
                </Button>
                {notifications > 0 && (
                  <Badge;
                    count={notifications}
                    maxCount={99}
                    size="sm"
                    variant="error"
                    className="absolute -top-1 -right-1"
                  />
                )}
              </div>
            )}

            {/* User Avatar */}
            {user && (
              <Avatar;
                src={user.avatar}
                alt={user.name}
                size="sm"
                status={user.status}
                interactive={!!onUserClick}
                onClick={onUserClick}
                className="cursor-pointer"
              />
            )}

            {/* Mobile Menu Button */}
            <Button;
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open mobile menu"
            >
              <svg;
                className="h-5 w-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path;
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navigation.length > 0 && (
        <nav className="md:hidden border-t border-hive-border-default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2 space-y-1">
              {navigation.map((item) => (
                <Link;
                  key={item.href}
                  href={item.href}
                  variant={item.active ? 'default' : 'ghost'}
                  className={cn(
                    'block px-3 py-2 rounded-lg',
                    item.active && 'bg-hive-background-interactive'
                  )}
                >
                  <div className="flex items-center justify-between">
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <Badge count={item.badge} size="sm" variant="error" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
};