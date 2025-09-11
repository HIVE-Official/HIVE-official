'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  FileX, 
  Search, 
  Users, 
  Calendar,
  MessageSquare,
  Beaker,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@hive/ui';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  variant?: 'default' | 'search' | 'error' | 'no-data';
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const variantIcons = {
  default: FileX,
  search: Search,
  error: FileX,
  'no-data': FileX
};

/**
 * Standardized empty state component for consistent empty/error states
 */
export function EmptyState({
  title,
  description,
  icon,
  variant = 'default',
  action,
  className
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant];

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      role="status"
      aria-label={title}
    >
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-neutral-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-neutral-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          variant="outline"
          size="sm"
          onClick={action.onClick}
          className="border-white/20"
          asChild={!!action.href}
        >
          {action.href ? (
            <a href={action.href}>
              {action.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <>
              {action.label}
              <Plus className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}

/**
 * Preset empty states for common scenarios
 */
export function NoSpacesEmpty({ onCreateSpace }: { onCreateSpace?: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="No spaces yet"
      description="Join or create a space to start connecting with your campus community"
      action={{
        label: "Browse Spaces",
        href: "/spaces"
      }}
    />
  );
}

export function NoPostsEmpty({ onCreatePost }: { onCreatePost?: () => void }) {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No posts yet"
      description="Be the first to share something with this community"
      action={onCreatePost ? {
        label: "Create Post",
        onClick: onCreatePost
      } : undefined}
    />
  );
}

export function NoEventsEmpty({ onCreateEvent }: { onCreateEvent?: () => void }) {
  return (
    <EmptyState
      icon={Calendar}
      title="No upcoming events"
      description="No events scheduled at the moment. Check back later or create one!"
      action={onCreateEvent ? {
        label: "Create Event",
        onClick: onCreateEvent
      } : undefined}
    />
  );
}

export function NoToolsEmpty() {
  return (
    <EmptyState
      icon={Beaker}
      title="No tools installed"
      description="Explore the HiveLab to discover and install useful tools"
      action={{
        label: "Browse Tools",
        href: "/tools/browse"
      }}
    />
  );
}

export function SearchEmpty({ query }: { query?: string }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={query ? `No results for "${query}". Try different keywords or filters.` : "Try searching with different keywords"}
    />
  );
}

export function ErrorState({ 
  error,
  onRetry 
}: { 
  error?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      variant="error"
      title="Something went wrong"
      description={error || "An error occurred while loading this content"}
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry
      } : undefined}
    />
  );
}