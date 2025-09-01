'use client';

import React, { useMemo, useRef } from 'react';
import { cn } from '../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../../atomic/atoms/button-enhanced';
import { useAdvancedViewport } from './ResponsiveLayout';

// Page context types for intelligent header adaptation
type PageType = 'profile' | 'spaces' | 'tools' | 'feed' | 'settings' | 'onboarding' | 'auth' | 'generic';

// Action placement strategies for thumb-friendly interaction
type ActionPlacement = 'auto' | 'thumb-left' | 'thumb-right' | 'center' | 'split';

// Header behavior patterns
type HeaderBehavior = 'static' | 'sticky' | 'floating' | 'hidden' | 'auto-hide';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
}

interface PageAction {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  priority?: 'high' | 'medium' | 'low';
  mobileHidden?: boolean;
}

interface PageHeaderProps {
  // Core content
  title?: string;
  subtitle?: string;
  description?: string;
  
  // Navigation
  breadcrumbs?: BreadcrumbItem[];
  backAction?: {
    label?: string;
    href?: string;
    onClick?: () => void;
  };
  
  // Actions
  primaryAction?: PageAction;
  secondaryActions?: PageAction[];
  actionPlacement?: ActionPlacement;
  
  // Context-aware behavior
  pageType?: PageType;
  userRole?: 'student' | 'faculty' | 'admin';
  campusContext?: {
    spaceName?: string;
    toolName?: string;
    isBuilder?: boolean;
  };
  
  // Visual behavior
  behavior?: HeaderBehavior;
  glassMorphism?: boolean;
  hideOnScroll?: boolean;
  showProgress?: boolean;
  progressValue?: number;
  
  // Mobile optimizations
  mobileTitle?: string; // Shorter title for mobile
  collapsible?: boolean;
  
  // Accessibility
  headingLevel?: 'h1' | 'h2' | 'h3';
  landmarkRole?: boolean;
  
  className?: string;
  children?: React.ReactNode;
}

// Smart action placement based on device and context
function calculateActionPlacement(
  placement: ActionPlacement,
  viewport: any,
  actionsCount: number
): string {
  if (placement === 'auto') {
    // Intelligent placement based on device and action count
    if (viewport.isMobile) {
      // On mobile, prioritize thumb reach
      return actionsCount <= 2 ? 'justify-between' : 'justify-end';
    }
    return 'justify-between';
  }
  
  const placementMap = {
    'thumb-left': 'justify-start',
    'thumb-right': 'justify-end', 
    'center': 'justify-center',
    'split': 'justify-between'
  };
  
  return placementMap[placement] || 'justify-between';
}

// Generate contextual header content based on page type
function generateContextualContent(
  pageType: PageType,
  campusContext?: PageHeaderProps['campusContext']
): { titlePrefix?: string; contextualHint?: string } {
  switch (pageType) {
    case 'profile':
      return {
        titlePrefix: 'Your',
        contextualHint: 'Your campus command center'
      };
    case 'spaces':
      return {
        titlePrefix: campusContext?.spaceName ? '' : 'Campus',
        contextualHint: 'Where communities solve problems together'
      };
    case 'tools':
      return {
        titlePrefix: campusContext?.isBuilder ? 'Building' : 'Using',
        contextualHint: campusContext?.isBuilder ? 'Create solutions for your community' : 'Tools built by your community'
      };
    case 'feed':
      return {
        contextualHint: 'What\'s happening in your communities'
      };
    default:
      return {};
  }
}

// Priority-based action sorting for mobile
function sortActionsByPriority(actions: PageAction[], isMobile: boolean): PageAction[] {
  if (!isMobile) return actions;
  
  return [...actions]
    .filter(action => !action.mobileHidden)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']);
    })
    .slice(0, 3); // Max 3 actions on mobile
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  breadcrumbs,
  backAction,
  primaryAction,
  secondaryActions = [],
  actionPlacement = 'auto',
  pageType = 'generic',
  userRole = 'student',
  campusContext,
  behavior = 'static',
  glassMorphism = false,
  hideOnScroll = false,
  showProgress = false,
  progressValue = 0,
  mobileTitle,
  collapsible = false,
  headingLevel = 'h1',
  landmarkRole = true,
  className,
  children
}) => {
  const viewport = useAdvancedViewport();
  const headerRef = useRef<HTMLElement>(null);
  
  // Generate contextual content
  const contextualContent = useMemo(() => 
    generateContextualContent(pageType, campusContext),
    [pageType, campusContext]
  );
  
  // Process actions for mobile optimization
  const processedActions = useMemo(() => {
    const actions = primaryAction ? [primaryAction, ...secondaryActions] : secondaryActions;
    return sortActionsByPriority(actions, viewport.isMobile);
  }, [primaryAction, secondaryActions, viewport.isMobile]);
  
  // Calculate dynamic classes
  const headerClasses = cn(
    // Base layout
    'w-full border-b border-hive-border-default/20 backdrop-blur-sm',
    
    // Behavior-based styling
    {
      'sticky top-0 z-40': behavior === 'sticky',
      'fixed top-0 left-0 right-0 z-50': behavior === 'floating',
      'static': behavior === 'static',
      'transform -translate-y-full': behavior === 'hidden'
    },
    
    // Glass morphism effect
    glassMorphism && [
      'bg-hive-background-primary/80',
      'backdrop-blur-xl',
      'border-hive-border-default/10'
    ],
    
    // Default background
    !glassMorphism && 'bg-hive-background-primary',
    
    // Auto-hide behavior
    hideOnScroll && 'transition-transform duration-300 ease-in-out',
    
    // Accessibility
    'focus-within:ring-2 focus-within:ring-hive-gold/20',
    
    className
  );
  
  const containerClasses = cn(
    // Layout
    'mx-auto w-full px-4 sm:px-6 lg:px-8',
    
    // Responsive padding
    viewport.isMobile ? 'py-4' : 'py-6',
    
    // Safe area support
    viewport.hasNotch && 'pt-[env(safe-area-inset-top)]'
  );
  
  const titleClasses = cn(
    // Base typography
    'font-semibold text-hive-text-primary',
    
    // Responsive sizing
    viewport.isMobile ? 'text-xl' : 'text-2xl lg:text-3xl',
    
    // Context-aware styling
    pageType === 'profile' && 'text-hive-gold',
    pageType === 'tools' && campusContext?.isBuilder && 'text-hive-emerald'
  );
  
  const actionLayoutClasses = calculateActionPlacement(
    actionPlacement,
    viewport,
    processedActions.length
  );
  
  return (
    <header 
      ref={headerRef}
      className={headerClasses}
      role={landmarkRole ? 'banner' : undefined}
      aria-label={`${title || 'Page'} header`}
    >
      {/* Progress indicator */}
      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-hive-border-default/20">
          <div 
            className="h-full bg-hive-gold transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
          />
        </div>
      )}
      
      <div className={containerClasses}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-hive-text-tertiary">/</span>
                  )}
                  {crumb.href ? (
                    <a 
                      href={crumb.href}
                      className="text-hive-text-secondary hover:text-hive-text-primary transition-colors"
                      aria-current={crumb.isActive ? 'page' : undefined}
                    >
                      {crumb.icon && <crumb.icon className="w-4 h-4 mr-1 inline" />}
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={cn(
                      crumb.isActive ? 'text-hive-text-primary font-medium' : 'text-hive-text-secondary'
                    )}>
                      {crumb.icon && <crumb.icon className="w-4 h-4 mr-1 inline" />}
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        {/* Main header content */}
        <div className={cn(
          'flex items-start',
          actionLayoutClasses,
          viewport.isMobile && 'flex-col space-y-4'
        )}>
          {/* Title section */}
          <div className="flex-1 min-w-0">
            {/* Back action */}
            {backAction && (
              <div className="mb-2">
                <ButtonEnhanced
                  variant="ghost"
                  size="sm"
                  className="-ml-2 text-hive-text-secondary hover:text-hive-text-primary"
                  onClick={backAction.onClick || (() => window.history.back())}
                >
                  <span className="mr-1">←</span>
                  {backAction.label || 'Back'}
                </ButtonEnhanced>
              </div>
            )}
            
            {/* Title with contextual prefix */}
            <div className="space-y-1">
              <Text 
                as={headingLevel}
                className={titleClasses}
              >
                {contextualContent.titlePrefix && (
                  <span className="text-hive-text-secondary font-normal mr-2">
                    {contextualContent.titlePrefix}
                  </span>
                )}
                {viewport.isMobile && mobileTitle ? mobileTitle : title}
              </Text>
              
              {/* Subtitle */}
              {subtitle && (
                <Text 
                  variant="body-lg" 
                  color="secondary"
                  className="mt-1"
                >
                  {subtitle}
                </Text>
              )}
              
              {/* Contextual hint for first-time users */}
              {contextualContent.contextualHint && !subtitle && (
                <Text 
                  variant="body-sm" 
                  color="muted"
                  className="italic"
                >
                  {contextualContent.contextualHint}
                </Text>
              )}
              
              {/* Description */}
              {description && (
                <Text 
                  variant="body-md" 
                  color="secondary"
                  className="mt-2 max-w-2xl"
                >
                  {description}
                </Text>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {processedActions.length > 0 && (
            <div className={cn(
              'flex items-center gap-3',
              viewport.isMobile && 'w-full justify-end'
            )}>
              {processedActions.map((action) => {
                const isPrimary = action === primaryAction;
                return (
                  <ButtonEnhanced
                    key={action.id}
                    variant={action.variant || (isPrimary ? 'primary' : 'secondary')}
                    size={viewport.isMobile ? 'sm' : 'md'}
                    onClick={action.onClick}
                    disabled={action.disabled || action.loading}
                    className={cn(
                      // Thumb-friendly sizing on mobile
                      viewport.isMobile && 'min-h-[44px] px-4',
                      
                      // Priority-based styling
                      action.priority === 'high' && 'ring-1 ring-hive-gold/20'
                    )}
                  >
                    {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                    {action.loading ? 'Loading...' : action.label}
                  </ButtonEnhanced>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Custom children content */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

// Export utilities
export { calculateActionPlacement, generateContextualContent, sortActionsByPriority };
export type { PageHeaderProps, PageType, PageAction, BreadcrumbItem, ActionPlacement, HeaderBehavior };