'use client';

/**
 * HIVE Modal Component
 * Simple modal wrapper that integrates with the design system
 */

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
}

export function HiveModal({
  open,
  onOpenChange,
  children,
  className,
  size = 'md',
  closeOnOverlay = true
}: HiveModalProps) {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onOpenChange(false);
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div className={cn(
        'relative w-full mx-4 bg-hive-background-secondary border border-hive-border-primary rounded-lg shadow-xl',
        sizeClasses[size],
        className
      )}>
        {children}
      </div>
    </div>
  );
}

// Modal subcomponents for better composition
export function HiveModalHeader({
  children,
  className,
  showCloseButton = true,
  onClose
}: {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={cn('px-6 pt-6 pb-4 border-b border-hive-border-secondary', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">{children}</div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-hive-text-muted hover:text-hive-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function HiveModalTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn('text-xl font-semibold text-hive-text-primary', className)}>
      {children}
    </h2>
  );
}

export function HiveModalDescription({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('mt-2 text-sm text-hive-text-secondary', className)}>
      {children}
    </p>
  );
}

export function HiveModalContent({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
}

export function HiveModalFooter({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-6 pb-6 pt-4 border-t border-hive-border-secondary', className)}>
      {children}
    </div>
  );
}
