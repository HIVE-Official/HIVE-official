/**
 * HIVE Profile Layout System - Brand Consistent
 * Campus Command Center layout with HIVE's gold/black branding
 * Built for University at Buffalo students
 */

import * as React from 'react';
import { cn } from '../lib/utils';

// HIVE Foundation Systems
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === SIMPLE LAYOUT TYPES ===
export interface SimpleProfileLayoutProps {
  variant?: 'header' | 'card' | 'dashboard';
  children: React.ReactNode;
  className?: string;
}

export interface SimpleProfileGridProps {
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

// === HIVE PROFILE LAYOUT ===
export const SimpleProfileLayout = React.forwardRef<HTMLDivElement, SimpleProfileLayoutProps>(
  ({ variant = 'header', children, className }, ref) => {
    const variantClasses = {
      header: 'space-y-6',
      card: 'bg-[var(--hive-bg-secondary)] rounded-xl border border-[var(--hive-border-subtle)] p-6 shadow-lg backdrop-blur-sm',
      dashboard: 'space-y-8 p-6 bg-[var(--hive-bg-primary)] rounded-xl'
    };
    
    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], className)}
      >
        {children}
      </div>
    );
  }
);

SimpleProfileLayout.displayName = 'SimpleProfileLayout';

// === SIMPLE PROFILE CONTENT ===
export const SimpleProfileContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 min-w-0 overflow-hidden space-y-3', className)}
      >
        {children}
      </div>
    );
  }
);

SimpleProfileContent.displayName = 'SimpleProfileContent';

// === SIMPLE PROFILE ACTIONS ===
export const SimpleProfileActions = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-shrink-0 w-full sm:w-auto', className)}
      >
        {children}
      </div>
    );
  }
);

SimpleProfileActions.displayName = 'SimpleProfileActions';

// === SIMPLE PROFILE GRID ===
export const SimpleProfileGrid = React.forwardRef<HTMLDivElement, SimpleProfileGridProps>(
  ({ columns = 2, children, className }, ref) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4'
    };
    
    return (
      <div
        ref={ref}
        className={cn('grid gap-3 sm:gap-4 md:gap-6', gridClasses[columns], className)}
      >
        {children}
      </div>
    );
  }
);

SimpleProfileGrid.displayName = 'SimpleProfileGrid';

// === SIMPLE IDENTITY LAYOUT ===
export const SimpleProfileIdentity = React.forwardRef<HTMLDivElement, { 
  avatar: React.ReactNode; 
  info: React.ReactNode; 
  actions?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  className?: string; 
}>(
  ({ avatar, info, actions, layout = 'horizontal', className }, ref) => {
    const layoutClasses = layout === 'horizontal' 
      ? 'flex flex-col sm:flex-row items-start gap-4'
      : 'flex flex-col items-center text-center gap-3';
    
    return (
      <div
        ref={ref}
        className={cn(layoutClasses, className)}
      >
        {/* Avatar Section - Fixed width to prevent shrinking */}
        <div className="flex-shrink-0 sm:w-auto w-full flex justify-center sm:justify-start">
          {avatar}
        </div>
        
        {/* Content Section - Allow growth but prevent overflow */}
        <div className="flex-1 min-w-0 w-full overflow-hidden">
          {info}
        </div>
        
        {/* Actions Section - Stack on mobile, side on desktop */}
        {actions && (
          <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

SimpleProfileIdentity.displayName = 'SimpleProfileIdentity';