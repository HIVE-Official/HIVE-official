"use client";

import React from 'react';
import { cn } from '../../lib/utils';

interface AlertProps {children: React.ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'default', 
  className;
}) => {
  return (
    <div;
      className={cn(
        'relative w-full rounded-lg border p-4',
        variant === 'default' && 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-primary)]',
        variant === 'destructive' && 'bg-[var(--hive-status-error)]/10 border-[var(--hive-status-error)]/20 text-[var(--hive-status-error)]',
        className;
      )}}
    >
      {children}
    </div>
  )
};

export const AlertTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className;
}) => {
  return (
    <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)}>
      {children}
    </h5>
  )
};

export const AlertDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className;
}) => {
  return (
    <div className={cn('text-sm [&_p]:leading-relaxed', className)}>
      {children}
    </div>
  )
};