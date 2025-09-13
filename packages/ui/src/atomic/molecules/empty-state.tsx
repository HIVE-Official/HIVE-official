'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button-enhanced';
import { Card } from '../../atomic/ui/card';
import { Text } from '../atoms/text';
import { Inbox, Search, Users, FileX, Wifi, RefreshCw } from 'lucide-react';

export interface EmptyStateProps {
  variant?: 'default' | 'no-data' | 'search' | 'error' | 'offline' | 'loading';
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  variant = 'default',
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className,
  children
}: EmptyStateProps) {
  const getDefaultIcon = (variant: string) => {
    switch (variant) {
      case 'no-data':
        return <Inbox className="h-12 w-12 text-[var(--hive-text-tertiary)]" />;
      case 'search':
        return <Search className="h-12 w-12 text-[var(--hive-text-tertiary)]" />;
      case 'error':
        return <FileX className="h-12 w-12 text-[var(--hive-status-error)]" />;
      case 'offline':
        return <Wifi className="h-12 w-12 text-[var(--hive-text-tertiary)]" />;
      case 'loading':
        return <RefreshCw className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />;
      default:
        return <Inbox className="h-12 w-12 text-[var(--hive-text-tertiary)]" />;
    }
  };

  const sizeClasses = {
    sm: {
      container: 'py-8 px-4',
      icon: 'h-8 w-8',
      title: 'heading-sm',
      description: 'body-sm'
    },
    md: {
      container: 'py-12 px-6',
      icon: 'h-12 w-12',
      title: 'heading-md',
      description: 'body-md'
    },
    lg: {
      container: 'py-16 px-8',
      icon: 'h-16 w-16',
      title: 'heading-lg',
      description: 'body-lg'
    }
  };

  const iconWithSize = icon ? 
    React.cloneElement(icon as React.ReactElement, { 
      className: cn(sizeClasses[size].icon, (icon as React.ReactElement).props?.className)
    }) : 
    getDefaultIcon(variant);

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      sizeClasses[size].container,
      className
    )}>
      <div className="mb-4">
        {iconWithSize}
      </div>
      
      <div className="space-y-2 mb-6">
        <Text variant={sizeClasses[size].title as "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm" | "heading-xl" | "heading-lg" | "heading-md" | "heading-sm" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "body-2xs" | undefined} className="font-semibold text-[var(--hive-text-primary)]">
          {title}
        </Text>
        {description && (
          <Text variant={sizeClasses[size].description as "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm" | "heading-xl" | "heading-lg" | "heading-md" | "heading-sm" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "body-2xs" | undefined} className="text-[var(--hive-text-secondary)] max-w-md">
            {description}
          </Text>
        )}
      </div>

      {children && (
        <div className="mb-6">
          {children}
        </div>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              onClick={secondaryAction.onClick}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Empty state with card wrapper
export function EmptyStateCard(props: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <EmptyState {...props} />
    </Card>
  );
}

// Preset configurations for common use cases
export const EmptyStatePresets = {
  // No data available
  NoData: (props: Omit<EmptyStateProps, 'variant' | 'icon'>) => (
    <EmptyState 
      variant="no-data" 
      icon={<Inbox className="h-12 w-12 text-[var(--hive-text-tertiary)]" />}
      {...props} 
    />
  ),

  // Search results empty
  SearchResults: (props: Omit<EmptyStateProps, 'variant' | 'title' | 'description'>) => (
    <EmptyState 
      variant="search"
      title="No results found"
      description="Try adjusting your search terms or filters"
      {...props}
    />
  ),

  // No spaces joined yet
  NoSpaces: (props: Omit<EmptyStateProps, 'variant' | 'icon' | 'title'>) => (
    <EmptyState
      variant="no-data"
      icon={<Users className="h-12 w-12 text-[var(--hive-text-tertiary)]" />}
      title="No spaces yet"
      {...props}
    />
  ),

  // Feed empty state
  EmptyFeed: (props: Omit<EmptyStateProps, 'variant' | 'title' | 'description'>) => (
    <EmptyState
      variant="no-data"
      title="Your feed is empty"
      description="Follow spaces and join communities to see content here"
      {...props}
    />
  ),

  // Error state
  Error: (props: Omit<EmptyStateProps, 'variant'>) => (
    <EmptyState variant="error" {...props} />
  ),

  // Offline state
  Offline: (props: Omit<EmptyStateProps, 'variant' | 'title' | 'description'>) => (
    <EmptyState
      variant="offline"
      title="You're offline"
      description="Check your connection and try again"
      {...props}
    />
  ),

  // Loading state
  Loading: (props: Omit<EmptyStateProps, 'variant' | 'title'>) => (
    <EmptyState
      variant="loading"
      title="Loading..."
      {...props}
    />
  ),

  // Campus-specific empty states
  NoCampusEvents: (props: Omit<EmptyStateProps, 'title' | 'description'>) => (
    <EmptyState
      title="No events scheduled"
      description="Be the first to create an event for your campus community"
      {...props}
    />
  ),

  NoBuiltTools: (props: Omit<EmptyStateProps, 'title' | 'description'>) => (
    <EmptyState
      title="No tools built yet"
      description="Start building tools to help your campus community"
      {...props}
    />
  ),

  // Profile-specific empty states
  NoActivityYet: (props: Omit<EmptyStateProps, 'title' | 'description'>) => (
    <EmptyState
      title="No activity yet"
      description="Join spaces and start participating to see your activity here"
      {...props}
    />
  ),

  NoConnectionsYet: (props: Omit<EmptyStateProps, 'title' | 'description'>) => (
    <EmptyState
      title="No connections yet"
      description="Participate in spaces and rituals to build your campus network"
      {...props}
    />
  )
};

// Type already exported inline above