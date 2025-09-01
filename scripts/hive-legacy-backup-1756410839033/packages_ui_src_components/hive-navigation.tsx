'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, User, Layers, Cpu } from 'lucide-react';

export interface HiveNavigationProps {
  variant?: 'full' | 'compact';
  currentPath?: string;
  onItemClick?: (href: string) => void;
  user?: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
  } | null;
  className?: string;
}

const coreItems = [
  { id: 'feed', icon: TrendingUp, label: 'Feed', href: '/' },
  { id: 'spaces', icon: Layers, label: 'Spaces', href: '/spaces' },
  { id: 'hivelab', icon: Cpu, label: 'HiveLab', href: '/hivelab' },
  { id: 'profile', icon: User, label: 'Profile', href: '/profile' }
];

export const HiveNavigation: React.FC<HiveNavigationProps> = ({
  variant = 'full',
  currentPath = '/',
  onItemClick,
  user,
  className
}) => {
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '';

  const isItemActive = (href: string) => {
    return currentPath === href || (href !== '/' && currentPath.startsWith(href + '/'));
  };

  if (variant === 'compact') {
    return (
      <aside className={cn(
        'w-20 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]',
        'flex flex-col items-center py-6',
        className
      )}>
        {/* User Avatar */}
        {user && (
          <div className="w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)] mb-8">
            {initials}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-3">
          {coreItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.href);
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.href)}
                className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center relative group',
                  'transition-all duration-300 ease-out',
                  'hover:scale-105 active:scale-95',
                  isActive
                    ? [
                        'bg-transparent',
                        'border-2 border-[var(--hive-brand-secondary)]',
                        'shadow-lg shadow-[var(--hive-brand-secondary)]/10'
                      ].join(' ')
                    : [
                        'bg-[var(--hive-background-secondary)]',
                        'border border-[var(--hive-border-default)]',
                        'hover:bg-[var(--hive-background-tertiary)]',
                        'hover:border-[var(--hive-border-secondary)]'
                      ].join(' ')
                )}
              >
                <Icon className={cn(
                  'h-5 w-5 transition-all duration-300',
                  isActive 
                    ? 'text-[var(--hive-brand-secondary)]' 
                    : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                )} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-xl text-sm font-medium text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  {item.label}
                </div>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  // Full variant
  return (
    <aside className={cn(
      'w-64 h-screen bg-[var(--hive-background-primary)] border-r border-[var(--hive-border-default)]',
      className
    )}>
      <div className="flex flex-col h-full">
        {/* User Section */}
        {user && (
          <div className="p-6 border-b border-[var(--hive-border-default)]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] flex items-center justify-center text-sm font-bold text-[var(--hive-text-primary)]">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[var(--hive-text-primary)] truncate">{user.name}</div>
                <div className="text-sm text-[var(--hive-text-secondary)] truncate">@{user.handle}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {coreItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.href);
              
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick?.(item.href)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-2xl',
                    'transition-all duration-300 ease-out group relative',
                    'hover:scale-[1.02] active:scale-[0.98]',
                    isActive
                      ? [
                          'bg-transparent',
                          'border border-[var(--hive-brand-secondary)]',
                          'shadow-lg shadow-[var(--hive-brand-secondary)]/10'
                        ].join(' ')
                      : [
                          'bg-transparent',
                          'border border-transparent',
                          'hover:bg-[var(--hive-background-secondary)]',
                          'hover:border-[var(--hive-border-default)]'
                        ].join(' ')
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center',
                    'transition-all duration-300',
                    isActive
                      ? 'bg-[var(--hive-brand-secondary)]/10'
                      : 'bg-[var(--hive-background-tertiary)] group-hover:bg-[var(--hive-background-secondary)]'
                  )}>
                    <Icon className={cn(
                      'h-5 w-5 transition-all duration-300',
                      isActive 
                        ? 'text-[var(--hive-brand-secondary)]' 
                        : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                    )} />
                  </div>
                  <span className={cn(
                    'font-medium transition-all duration-300 flex-1 text-left',
                    isActive 
                      ? 'text-[var(--hive-brand-secondary)]' 
                      : 'text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-text-primary)]'
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-2 h-8 bg-[var(--hive-brand-secondary)] rounded-full opacity-80" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};