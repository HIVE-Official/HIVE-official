'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Home, Compass, Zap, Calendar, BookOpen, User, Settings, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { Avatar } from './avatar';

export interface SidebarProps {
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string
  } | null;
  currentPath?: string;
  collapsed?: boolean;
  onItemClick?: (href: string) => void;
  onToggle?: () => void;
  breadcrumbs?: { label: string; href?: string }[];
  currentSection?: string;
  className?: string
}

interface NavigationItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  matchPaths?: string[];
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  { 
    id: 'feed',
    icon: Home, 
    label: 'Feed', 
    href: '/feed', 
    matchPaths: ['/feed']
  },
  { 
    id: 'profile',
    icon: User, 
    label: 'Profile', 
    href: '/profile', 
    matchPaths: ['/profile']
  },
  { 
    id: 'spaces',
    icon: Compass, 
    label: 'Spaces', 
    href: '/spaces', 
    matchPaths: ['/spaces'],
    children: [
      { id: 'spaces-my', icon: User, label: 'My Spaces', href: '/spaces/my' },
      { id: 'spaces-browse', icon: Compass, label: 'Browse', href: '/spaces/browse' },
      { id: 'spaces-activate', icon: Zap, label: 'Activate', href: '/spaces/activate' }
    ]
  },
  { 
    id: 'tools',
    icon: Zap, 
    label: 'Tools', 
    href: '/tools', 
    matchPaths: ['/tools'],
    children: [
      { id: 'tools-personal', icon: User, label: 'Personal', href: '/tools/personal' },
      { id: 'tools-browse', icon: Compass, label: 'Browse', href: '/tools/browse' }
    ]
  },
  { 
    id: 'calendar',
    icon: Calendar, 
    label: 'Calendar', 
    href: '/calendar', 
    matchPaths: ['/calendar']
  },
  { 
    id: 'events',
    icon: Calendar, 
    label: 'Events', 
    href: '/events', 
    matchPaths: ['/events']
  }
];

const bottomItems: NavigationItem[] = [
  { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  currentPath = '/',
  collapsed = false,
  onItemClick,
  onToggle,
  breadcrumbs = [],
  currentSection,
  className,
}) => {
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isItemActive = (item: NavigationItem): boolean => {
    if (currentPath === item.href) return true;
    if (item.matchPaths) {
      return item.matchPaths.some(path => 
        currentPath === path || currentPath.startsWith(path + '/')
      )
    }
    return false
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      // Toggle expansion for items with children
      setExpandedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      )
    } else {
      onItemClick?.(item.href)
    }
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  return (
    <aside className={cn(
      'h-screen flex-shrink-0 flex flex-col',
      'bg-[var(--hive-background-primary)]',
      'border-r border-[var(--hive-border-default)]',
      'transition-all duration-300 ease-out',
      collapsed ? 'w-16' : 'w-72',
      className
    )}>
      {/* Breadcrumbs Section */}
      {!collapsed && breadcrumbs.length > 0 && (
        <div className="px-4 py-3 border-b border-[var(--hive-border-default)]">
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 text-[var(--hive-text-tertiary)]" />
                )}
                <button
                  onClick={() => crumb.href && onItemClick?.(crumb.href)}
                  className={cn(
                    'text-sm transition-colors hover:text-[var(--hive-text-primary)]',
                    crumb.href 
                      ? 'text-[var(--hive-text-secondary)] cursor-pointer' 
                      : 'text-[var(--hive-text-primary)] font-medium'
                  )}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* User Profile Section */}
      {!collapsed && user && (
        <div className="px-4 py-4 border-b border-[var(--hive-border-default)]">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--hive-background-tertiary)] to-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-2xl flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[var(--hive-text-primary)] truncate">
                {user.name}
              </div>
              <div className="text-xs text-[var(--hive-text-secondary)] truncate">
                @{user.handle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);
            const hasChildren = item.children && item.children.length > 0;
            const isItemExpanded = isExpanded(item.id);

            return (
              <div key={item.id}>
                {/* Parent Item */}
                <Button
                  variant="ghost"
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    'w-full transition-all duration-300 relative group',
                    collapsed ? 'h-12 px-0 justify-center' : 'h-12 px-3 justify-start',
                    'rounded-xl',
                    isActive ? [
                      'bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5',
                      'border border-[var(--hive-brand-secondary)]/20'
                    ].join(' ') : [
                      'hover:bg-[var(--hive-background-secondary)]',
                      'border border-transparent'
                    ].join(' ')
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300',
                    !collapsed && 'mr-3',
                    isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'
                  )}>
                    <Icon className={cn(
                      'h-4 w-4 transition-colors duration-300',
                      isActive 
                        ? 'text-[var(--hive-text-inverse)]' 
                        : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                    )} />
                  </div>
                  {!collapsed && (
                    <>
                      <span className={cn(
                        'text-sm font-medium truncate transition-colors duration-300 flex-1 text-left',
                        isActive 
                          ? 'text-[var(--hive-brand-secondary)]' 
                          : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                      )}>
                        {item.label}
                      </span>
                      {hasChildren && (
                        <div className="w-5 h-5 flex items-center justify-center">
                          {isItemExpanded ? (
                            <ChevronDown className="h-3 w-3 text-[var(--hive-text-tertiary)]" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-[var(--hive-text-tertiary)]" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {isActive && !collapsed && !hasChildren && (
                    <div className="absolute right-3 w-1.5 h-6 bg-[var(--hive-brand-secondary)] rounded-full" />
                  )}
                </Button>

                {/* Child Items */}
                {!collapsed && hasChildren && isItemExpanded && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-[var(--hive-border-default)] pl-4">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = isItemActive(child);

                      return (
                        <Button
                          key={child.id}
                          variant="ghost"
                          onClick={() => onItemClick?.(child.href)}
                          className={cn(
                            'w-full h-10 px-3 justify-start rounded-lg transition-all duration-300 group',
                            isChildActive ? [
                              'bg-[var(--hive-brand-secondary)]/5',
                              'border border-[var(--hive-brand-secondary)]/15'
                            ].join(' ') : [
                              'hover:bg-[var(--hive-background-secondary)]',
                              'border border-transparent'
                            ].join(' ')
                          )}
                        >
                          <div className={cn(
                            'w-6 h-6 rounded-md flex items-center justify-center mr-3 transition-all duration-300',
                            isChildActive ? 'bg-[var(--hive-brand-secondary)]/20' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'
                          )}>
                            <ChildIcon className={cn(
                              'h-3 w-3 transition-colors duration-300',
                              isChildActive 
                                ? 'text-[var(--hive-brand-secondary)]' 
                                : 'text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]'
                            )} />
                          </div>
                          <span className={cn(
                            'text-sm font-medium truncate transition-colors duration-300',
                            isChildActive 
                              ? 'text-[var(--hive-brand-secondary)]' 
                              : 'text-[var(--hive-text-tertiary)] group-hover:text-[var(--hive-text-secondary)]'
                          )}>
                            {child.label}
                          </span>
                          {isChildActive && (
                            <div className="absolute right-3 w-1 h-4 bg-[var(--hive-brand-secondary)] rounded-full" />
                          )}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[var(--hive-border-default)]">
        <div className="space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item);

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleItemClick(item)}
                className={cn(
                  'w-full transition-all duration-300 relative group',
                  collapsed ? 'h-12 px-0 justify-center' : 'h-12 px-4 justify-start',
                  'rounded-2xl',
                  isActive ? [
                    'bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5',
                    'border border-[var(--hive-brand-secondary)]/20'
                  ].join(' ') : [
                    'hover:bg-[var(--hive-background-secondary)]',
                    'border border-transparent'
                  ].join(' ')
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300',
                  !collapsed && 'mr-3',
                  isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'
                )}>
                  <Icon className={cn(
                    'h-4 w-4 transition-colors duration-300',
                    isActive 
                      ? 'text-[var(--hive-text-inverse)]' 
                      : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                  )} />
                </div>
                {!collapsed && (
                  <span className={cn(
                    'text-sm font-medium truncate transition-colors duration-300',
                    isActive 
                      ? 'text-[var(--hive-brand-secondary)]' 
                      : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                  )}>
                    {item.label}
                  </span>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </aside>
  )
};