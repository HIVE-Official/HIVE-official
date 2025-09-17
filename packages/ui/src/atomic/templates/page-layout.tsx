'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../atoms/text';
import { Button } from '../atoms/button-enhanced';

export interface PageLayoutProps {
  // Header Content
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  
  // Layout Options
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'default' | 'alt' | 'glass';
  
  // Mobile Behavior
  stickyHeader?: boolean;
  hideHeaderOnMobile?: boolean;
  
  // Loading & Error States
  loading?: boolean;
  error?: string;
  
  // Content
  children: React.ReactNode;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-3xl',
  lg: 'max-w-5xl', 
  xl: 'max-w-7xl',
  '2xl': 'max-w-8xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

const backgroundClasses = {
  default: 'bg-hive-background-primary',
  alt: 'bg-hive-background-secondary',
  glass: 'bg-hive-background-overlay backdrop-blur-md'
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  maxWidth = 'xl',
  padding = 'md',
  background = 'default',
  stickyHeader = false,
  hideHeaderOnMobile = false,
  loading = false,
  error,
  children,
  className
}) => {
  const hasHeader = title || subtitle || actions || breadcrumbs;

  // Loading State
  if (loading) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center',
        backgroundClasses[background]
      )}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-hive-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <Text variant="body-md" color="secondary">
            Loading...
          </Text>
        </div>
      </div>
    );
  }

  // Error State  
  if (error) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center',
        backgroundClasses[background],
        paddingClasses[padding]
      )}>
        <div className="text-center space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-full bg-hive-ruby/10 flex items-center justify-center mx-auto">
            <div className="w-6 h-6 rounded-full bg-hive-ruby" />
          </div>
          <div className="space-y-2">
            <Text variant="heading-lg" color="primary">
              Something went wrong
            </Text>
            <Text variant="body-md" color="secondary">
              {error}
            </Text>
          </div>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen',
      backgroundClasses[background],
      className
    )}>
      {/* Page Header */}
      {hasHeader && (
        <header className={cn(
          'border-b border-hive-border-default',
          stickyHeader && 'sticky top-0 z-40 backdrop-blur-md bg-hive-background-primary/80',
          hideHeaderOnMobile && 'hidden sm:block'
        )}>
          <div className={cn(
            'mx-auto',
            maxWidthClasses[maxWidth],
            paddingClasses[padding]
          )}>
            <div className="space-y-4">
              {/* Breadcrumbs */}
              {breadcrumbs && (
                <div className="flex items-center">
                  {breadcrumbs}
                </div>
              )}
              
              {/* Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  {title && (
                    <Text 
                      variant="heading-xl" 
                      color="primary"
                      as="h1"
                    >
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text 
                      variant="body-lg" 
                      color="secondary"
                    >
                      {subtitle}
                    </Text>
                  )}
                </div>
                
                {/* Actions */}
                {actions && (
                  <div className="flex items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Page Content */}
      <main className={cn(
        'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        hasHeader && 'pt-6'
      )}>
        {children}
      </main>
    </div>
  );
};