/**
 * Profile Layout System - Unified layout architecture for Profile components
 * Prevents overlapping and ensures proper component positioning
 */

import * as React from 'react';
import { cn } from '../lib/utils';

// === LAYOUT TYPES ===
export interface ProfileLayoutProps {
  variant?: 'header' | 'card' | 'dashboard' | 'sidebar';
  size?: 'compact' | 'comfortable' | 'spacious';
  children: React.ReactNode;
  className?: string;
}

export interface ProfileGridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'none' | 'sm' | 'base' | 'lg';
  breakpoints?: 'mobile' | 'tablet' | 'desktop' | 'responsive';
  children: React.ReactNode;
  className?: string;
}

export interface ProfileSectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

// === LAYOUT VARIANTS ===
const layoutVariants = {
  header: {
    container: 'flex flex-col space-y-4',
    content: 'flex flex-col lg:flex-row lg:items-start gap-6',
    actions: 'flex flex-col sm:flex-row gap-2 lg:ml-auto'
  },
  card: {
    container: 'bg-white rounded-lg border border-gray-200 overflow-hidden',
    content: 'p-6',
    actions: 'flex justify-end gap-2 px-6 py-4 bg-gray-50 border-t'
  },
  dashboard: {
    container: 'grid gap-6',
    content: 'space-y-6',
    actions: 'sticky top-4 space-y-2'
  },
  sidebar: {
    container: 'flex flex-col space-y-4',
    content: 'flex-1',
    actions: 'mt-auto pt-4 border-t'
  }
};

// === SIZE VARIANTS ===
const sizeVariants = {
  compact: {
    spacing: 'space-y-2',
    padding: 'p-3',
    gap: 'gap-3'
  },
  comfortable: {
    spacing: 'space-y-4',
    padding: 'p-4',
    gap: 'gap-4'
  },
  spacious: {
    spacing: 'space-y-6',
    padding: 'p-6',
    gap: 'gap-6'
  }
};

// === GRID SYSTEM ===
const gridVariants = {
  columns: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  },
  gaps: {
    none: 'gap-0',
    sm: 'gap-2',
    base: 'gap-4',
    lg: 'gap-6'
  }
};

// === PROFILE LAYOUT CONTAINER ===
export const ProfileLayout = React.forwardRef<HTMLDivElement, ProfileLayoutProps>(
  ({ variant = 'header', size = 'comfortable', children, className }, ref) => {
    const layout = layoutVariants[variant];
    const sizing = sizeVariants[size];
    
    return (
      <div
        ref={ref}
        className={cn(
          layout.container,
          sizing.spacing,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ProfileLayout.displayName = 'ProfileLayout';

// === PROFILE CONTENT AREA ===
export const ProfileContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 min-w-0', // Prevent overflow
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ProfileContent.displayName = 'ProfileContent';

// === PROFILE ACTIONS AREA ===
export const ProfileActions = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-shrink-0', // Prevent shrinking
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ProfileActions.displayName = 'ProfileActions';

// === PROFILE GRID SYSTEM ===
export const ProfileGrid = React.forwardRef<HTMLDivElement, ProfileGridProps>(
  ({ columns = 2, gap = 'base', children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          gridVariants.columns[columns],
          gridVariants.gaps[gap],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ProfileGrid.displayName = 'ProfileGrid';

// === PROFILE SECTION ===  
export const ProfileSection = React.forwardRef<HTMLDivElement, ProfileSectionProps>(
  ({ title, description, actions, collapsible = false, defaultExpanded = true, children, className }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    
    return (
      <div
        ref={ref}
        className={cn(
          'space-y-3',
          className
        )}
      >
        {/* Section Header */}
        {(title || description || actions) && (
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {title}
                  </h3>
                  {collapsible && (
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="p-1 hover:bg-[var(--hive-background-secondary)] rounded transition-colors"
                      aria-label={expanded ? 'Collapse section' : 'Expand section'}
                    >
                      <svg
                        className={cn(
                          'w-4 h-4 transition-transform',
                          expanded ? 'rotate-180' : ''
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {description && (
                <p className="text-sm text-[var(--hive-text-muted)] mt-1">
                  {description}
                </p>
              )}
            </div>
            
            {actions && (
              <div className="flex-shrink-0 ml-4">
                {actions}
              </div>
            )}
          </div>
        )}
        
        {/* Section Content */}
        {(!collapsible || expanded) && (
          <div className="space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ProfileSection.displayName = 'ProfileSection';

// === RESPONSIVE PROFILE WRAPPER ===
export const ResponsiveProfileWrapper = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Mobile-first responsive container
          'w-full max-w-none',
          'mx-auto',
          // Tablet and up
          'sm:max-w-2xl',
          // Desktop
          'lg:max-w-4xl',
          // Large screens
          'xl:max-w-6xl',
          // Padding
          'px-4 sm:px-6 lg:px-8',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ResponsiveProfileWrapper.displayName = 'ResponsiveProfileWrapper';

// === UTILITY COMPONENTS FOR COMMON PATTERNS ===

// Avatar + Info layout
export const ProfileIdentityLayout = React.forwardRef<HTMLDivElement, { 
  avatar: React.ReactNode; 
  info: React.ReactNode; 
  actions?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  className?: string; 
}>(
  ({ avatar, info, actions, layout = 'horizontal', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          layout === 'horizontal' 
            ? 'flex items-start gap-4'
            : 'flex flex-col items-center text-center gap-3',
          className
        )}
      >
        <div className="flex-shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          {info}
        </div>
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

ProfileIdentityLayout.displayName = 'ProfileIdentityLayout';

// Stats grid layout
export const ProfileStatsLayout = React.forwardRef<HTMLDivElement, { 
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}>(
  ({ children, columns = 4, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-4',
          columns === 2 ? 'grid-cols-2' : '',
          columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : '',
          columns === 4 ? 'grid-cols-2 md:grid-cols-4' : '',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ProfileStatsLayout.displayName = 'ProfileStatsLayout';

export type {
  ProfileLayoutProps,
  ProfileGridProps,
  ProfileSectionProps
};