/**
 * HIVE Layout System - Systematic Layout & IA Implementation
 * Production-ready layout components implementing IA patterns
 * Built for University at Buffalo campus social platform
 */

import * as React from 'react';
import { cn } from '../lib/utils';

// HIVE Foundation Systems
import { componentIASystem } from '../../atomic/foundations/component-ia-system';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === LAYOUT SYSTEM TYPES ===
export interface HiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface HiveCardLayoutProps extends HiveLayoutProps {
  variant?: 'compact' | 'comfortable' | 'spacious';
  padding?: boolean;
}

export interface HiveGridLayoutProps extends HiveLayoutProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

export interface HiveStackLayoutProps extends HiveLayoutProps {
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
  responsive?: boolean;
}

export interface HiveComponentIAProps extends HiveLayoutProps {
  identity?: React.ReactNode;
  context?: React.ReactNode;
  content?: React.ReactNode;
  metrics?: React.ReactNode;
  actions?: React.ReactNode;
  layout?: 'profile' | 'space' | 'tool' | 'feed';
  responsive?: boolean;
}

// === CARD LAYOUT SYSTEM ===
export const HiveCard = React.forwardRef<HTMLDivElement, HiveCardLayoutProps>(
  ({ children, className, variant = 'comfortable', padding = true }, ref) => {
    const variantClasses = {
      compact: 'p-4 gap-3 rounded-lg max-w-[320px] min-h-[120px]',
      comfortable: 'p-5 gap-4 rounded-xl max-w-[480px] min-h-[200px]', 
      spacious: 'p-6 gap-5 rounded-xl max-w-[640px] min-h-[280px]'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] shadow-lg backdrop-blur-sm overflow-hidden',
          variantClasses[variant],
          !padding && 'p-0',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

HiveCard.displayName = 'HiveCard';

// === GRID LAYOUT SYSTEM ===
export const HiveGrid = React.forwardRef<HTMLDivElement, HiveGridLayoutProps>(
  ({ children, className, columns = 2, gap = 'md', responsive = true }, ref) => {
    const columnClasses = responsive ? {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4'
    } : {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3', 
      4: 'grid-cols-4'
    };
    
    const gapClasses = {
      sm: 'gap-3',
      md: 'gap-4 md:gap-6',
      lg: 'gap-6 lg:gap-8'
    };
    
    return (
      <div
        ref={ref}
        className={cn('grid', columnClasses[columns], gapClasses[gap], className)}
      >
        {children}
      </div>
    );
  }
);

HiveGrid.displayName = 'HiveGrid';

// === STACK LAYOUT SYSTEM ===
export const HiveStack = React.forwardRef<HTMLDivElement, HiveStackLayoutProps>(
  ({ 
    children, 
    className, 
    direction = 'vertical', 
    align = 'start', 
    justify = 'start',
    gap = 'md',
    wrap = false,
    responsive = false
  }, ref) => {
    const directionClasses = responsive ? {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-col sm:flex-row'
    } : {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row'
    };
    
    const alignClasses = {
      start: 'items-start',
      center: 'items-center', 
      end: 'items-end',
      stretch: 'items-stretch'
    };
    
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end', 
      between: 'justify-between',
      around: 'justify-around'
    };
    
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && 'flex-wrap',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

HiveStack.displayName = 'HiveStack';

// === COMPONENT IA LAYOUT SYSTEM ===
export const HiveComponentIA = React.forwardRef<HTMLDivElement, HiveComponentIAProps>(
  ({ 
    children,
    className,
    identity,
    context, 
    content,
    metrics,
    actions,
    layout = 'profile',
    responsive = true
  }, ref) => {
    // Layout patterns based on IA system
    const layoutPatterns = {
      profile: {
        container: responsive 
          ? 'flex flex-col sm:flex-row items-start gap-4'
          : 'flex items-start gap-4',
        identityArea: 'flex-shrink-0 sm:w-auto w-full flex justify-center sm:justify-start',
        contentArea: 'flex-1 min-w-0 w-full overflow-hidden space-y-3',
        actionsArea: 'flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0',
        metricsArea: 'w-full border-t border-[var(--hive-border-subtle)] pt-4 mt-4'
      },
      
      space: {
        container: 'flex flex-col gap-4',
        identityArea: 'flex items-start justify-between gap-4',
        contentArea: 'flex-1 space-y-3',
        actionsArea: 'flex items-center gap-2 flex-wrap',
        metricsArea: 'flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]'
      },
      
      tool: {
        container: 'flex flex-col gap-4',
        identityArea: 'flex items-center gap-3',
        contentArea: 'flex-1 space-y-2',
        actionsArea: 'flex items-center gap-2',
        metricsArea: 'flex items-center justify-between text-sm'
      },
      
      feed: {
        container: 'flex flex-col gap-3',
        identityArea: 'flex items-center justify-between',
        contentArea: 'flex-1',
        actionsArea: 'flex items-center gap-4 pt-3 border-t border-[var(--hive-border-subtle)]',
        metricsArea: 'flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]'
      }
    };
    
    const pattern = layoutPatterns[layout];
    
    return (
      <div ref={ref} className={cn(pattern.container, className)}>
        {/* Identity Section - Highest Priority */}
        {identity && (
          <div className={pattern.identityArea}>
            {identity}
          </div>
        )}
        
        {/* Main Content Area */}
        <div className={pattern.contentArea}>
          {/* Context Information */}
          {context && (
            <div className="space-y-2">
              {context}
            </div>
          )}
          
          {/* Primary Content */}
          {content && (
            <div className="space-y-3">
              {content}
            </div>
          )}
          
          {/* Metrics Section */}
          {metrics && (
            <div className={pattern.metricsArea}>
              {metrics}
            </div>
          )}
        </div>
        
        {/* Actions Section */}
        {actions && (
          <div className={pattern.actionsArea}>
            {actions}
          </div>
        )}
        
        {/* Additional Children */}
        {children}
      </div>
    );
  }
);

HiveComponentIA.displayName = 'HiveComponentIA';

// === SPECIALIZED LAYOUT COMPONENTS ===

// Profile-specific layout
export const HiveProfileLayout = React.forwardRef<HTMLDivElement, {
  avatar: React.ReactNode;
  name: React.ReactNode;
  handle?: React.ReactNode;
  context?: React.ReactNode;
  bio?: React.ReactNode;
  metrics?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}>(({ avatar, name, handle, context, bio, metrics, actions, className }, ref) => {
  return (
    <HiveComponentIA
      ref={ref}
      layout="profile"
      className={className}
      identity={
        <HiveStack direction="horizontal" align="center" gap="md">
          {avatar}
          <HiveStack direction="vertical" gap="sm">
            {name}
            {handle}
          </HiveStack>
        </HiveStack>
      }
      context={context}
      content={bio}
      metrics={metrics}
      actions={actions}
    />
  );
});

HiveProfileLayout.displayName = 'HiveProfileLayout';

// Space-specific layout  
export const HiveSpaceLayout = React.forwardRef<HTMLDivElement, {
  name: React.ReactNode;
  category?: React.ReactNode;
  memberCount?: React.ReactNode;
  status?: React.ReactNode;
  description?: React.ReactNode;
  activity?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}>(({ name, category, memberCount, status, description, activity, actions, className }, ref) => {
  return (
    <HiveComponentIA
      ref={ref}
      layout="space"
      className={className}
      identity={
        <HiveStack direction="horizontal" align="center" justify="between" className="w-full">
          <HiveStack direction="vertical" gap="sm">
            {name}
            {category}
          </HiveStack>
          <HiveStack direction="horizontal" align="center" gap="sm">
            {memberCount}
            {status}
          </HiveStack>
        </HiveStack>
      }
      content={
        <HiveStack direction="vertical" gap="md">
          {description}
          {activity}
        </HiveStack>
      }
      actions={actions}
    />
  );
});

HiveSpaceLayout.displayName = 'HiveSpaceLayout';

// Tool-specific layout
export const HiveToolLayout = React.forwardRef<HTMLDivElement, {
  icon?: React.ReactNode;
  name: React.ReactNode;
  creator?: React.ReactNode;
  description?: React.ReactNode;
  usage?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}>(({ icon, name, creator, description, usage, actions, className }, ref) => {
  return (
    <HiveComponentIA
      ref={ref}
      layout="tool"
      className={className}
      identity={
        <HiveStack direction="horizontal" align="center" gap="md">
          {icon}
          <HiveStack direction="vertical" gap="sm">
            {name}
            {creator}
          </HiveStack>
        </HiveStack>
      }
      content={description}
      metrics={usage}
      actions={actions}
    />
  );
});

HiveToolLayout.displayName = 'HiveToolLayout';

// === EXPORT ALL COMPONENTS ===
export {
  // Core layout primitives
  HiveCard,
  HiveGrid,
  HiveStack,
  HiveComponentIA,
  
  // Specialized layouts
  HiveProfileLayout,
  HiveSpaceLayout, 
  HiveToolLayout,
  
  // Types
  type HiveLayoutProps,
  type HiveCardLayoutProps,
  type HiveGridLayoutProps,
  type HiveStackLayoutProps,
  type HiveComponentIAProps
};