"use client";

import React from 'react';
// import { BreadcrumbNavigation } from './breadcrumb-navigation'; // Temporarily disabled
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function PageContainer({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  maxWidth = 'full',
  padding = 'lg'
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    '4xl': 'max-w-screen-xl',
    '7xl': 'max-w-screen-2xl',
    full: 'max-w-none'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-6 md:p-8'
  };

  return (
    <div className={cn("min-h-full", className)}>
      <div className={cn(
        "mx-auto",
        maxWidthClasses[maxWidth],
        paddingClasses[padding]
      )}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            {/* <BreadcrumbNavigation items={breadcrumbs} /> */}
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1 text-sm">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-[var(--hive-text-tertiary)]">/</span>}
                    {item.href ? (
                      <a href={item.href} className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-[var(--hive-text-primary)]">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                {title && (
                  <h1 className="text-2xl md:text-3xl font-semibold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-2 text-[var(--hive-text-tertiary)] text-base md:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex-shrink-0">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}