"use client";

import React from 'react';
import { cn } from '@hive/ui';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function PageContainer({
  children,
  className,
  size = 'xl',
  padding = 'md'
}: PageContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-4',
    md: 'px-4 py-6 sm:px-6',
    lg: 'px-4 py-8 sm:px-6 lg:px-8'
  };

  return (
    <div className={cn(
      'container mx-auto w-full',
      sizeClasses[size],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

export default PageContainer;