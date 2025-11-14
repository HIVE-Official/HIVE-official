'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SparklesIcon } from '../../00-Global/atoms/icon-library';
import { Button } from '../../00-Global/atoms/button';

export interface EmptyStateCompactProps {
  /**
   * Optional icon shown above the text
   */
  icon?: React.ReactNode;
  /**
   * Primary heading copy
   */
  title: string;
  /**
   * Supporting copy below the title
   */
  description?: string;
  /**
   * Optional action button label
   */
  actionLabel?: string;
  /**
   * Handler fired when the action button is pressed
   */
  onAction?: () => void;
  /**
   * Additional class name overrides
   */
  className?: string;
}

export const EmptyStateCompact = React.forwardRef<HTMLDivElement, EmptyStateCompactProps>(
  ({ icon, title, description, actionLabel, onAction, className }, ref) => {
    const contentIcon = React.useMemo(() => {
      if (icon === null) return null;
      if (icon) return icon;
      return <SparklesIcon className="h-6 w-6 text-[var(--hive-brand-primary)]" aria-hidden="true" />;
    }, [icon]);

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-6 py-8 text-center shadow-lg shadow-black/10',
          className
        )}
      >
        {contentIcon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--hive-brand-primary)]/10">
            {contentIcon}
          </div>
        ) : null}
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-[var(--hive-text-primary)]">{title}</h3>
          {description ? (
            <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed">{description}</p>
          ) : null}
        </div>
        {actionLabel ? (
          <Button size="md" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);

EmptyStateCompact.displayName = 'EmptyStateCompact';

