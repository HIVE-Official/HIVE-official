'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Badge,
  Button,
  XIcon,
  SparklesIcon,
  MegaphoneIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
} from '../../00-Global/atoms';

export type FeedSystemVariant = 'ritual' | 'announcement' | 'urgent';

export interface FeedCardSystemMeta {
  variant: FeedSystemVariant;
  timeAgo?: string;
  expiresLabel?: string;
}

export interface FeedCardSystemData {
  id: string;
  title: string;
  description: string;
  meta: FeedCardSystemMeta;
  actionLabel?: string;
  isDismissible?: boolean;
}

export interface FeedCardSystemCallbacks {
  onAction?: (cardId: string) => void;
  onDismiss?: (cardId: string) => void;
}

export interface FeedCardSystemProps
  extends FeedCardSystemCallbacks,
    React.HTMLAttributes<HTMLDivElement> {
  card: FeedCardSystemData;
}

const cardVariants = cva(
  'group relative overflow-hidden rounded-2xl border transition-all duration-240',
  {
    variants: {
      variant: {
        ritual:
          'border-[var(--hive-brand-primary)]/50 bg-gradient-to-br from-[var(--hive-brand-primary)]/[0.12] via-[var(--hive-background-secondary)] to-[var(--hive-background-secondary)] shadow-[0_0_50px_rgba(255,215,0,0.20)]',
        announcement:
          'border-blue-500/40 bg-gradient-to-br from-blue-500/[0.08] via-[var(--hive-background-secondary)] to-[var(--hive-background-secondary)]',
        urgent:
          'border-red-500/50 bg-gradient-to-br from-red-500/[0.12] via-[var(--hive-background-secondary)] to-[var(--hive-background-secondary)] shadow-[0_0_40px_rgba(239,68,68,0.15)]',
      },
    },
    defaultVariants: {
      variant: 'announcement',
    },
  }
);

const getVariantConfig = (variant: FeedSystemVariant) => {
  switch (variant) {
    case 'ritual':
      return {
        icon: <SparklesIcon className="h-5 w-5" />,
        label: 'Campus Ritual',
        badgeClassName:
          'bg-[var(--hive-brand-primary)]/15 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/50',
        iconBgClassName:
          'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30',
        iconClassName: 'text-[var(--hive-brand-primary)]',
      };
    case 'announcement':
      return {
        icon: <MegaphoneIcon className="h-5 w-5" />,
        label: 'Platform Announcement',
        badgeClassName:
          'bg-blue-500/15 text-blue-300 border-blue-400/40',
        iconBgClassName: 'bg-blue-500/10 border-blue-500/30',
        iconClassName: 'text-blue-400',
      };
    case 'urgent':
      return {
        icon: <AlertTriangleIcon className="h-5 w-5" />,
        label: 'Urgent',
        badgeClassName:
          'bg-red-500/15 text-red-300 border-red-400/50',
        iconBgClassName: 'bg-red-500/10 border-red-500/30',
        iconClassName: 'text-red-400',
      };
  }
};

export const FeedCardSystem = React.forwardRef<HTMLDivElement, FeedCardSystemProps>(
  (
    {
      card,
      onAction,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const { meta } = card;
    const config = getVariantConfig(meta.variant);
    const [isDismissed, setIsDismissed] = React.useState(false);

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDismissed(true);
      onDismiss?.(card.id);
    };

    const handleAction = () => {
      onAction?.(card.id);
    };

    if (isDismissed) {
      return null;
    }

    return (
      <article
        ref={ref}
        role="article"
        className={cn(
          cardVariants({ variant: meta.variant }),
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]',
          className
        )}
        {...props}
      >
        {/* Dismiss Button */}
        {card.isDismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)] bg-[var(--hive-background-primary)]/80 text-[var(--hive-text-tertiary)] backdrop-blur-sm transition-all hover:bg-[var(--hive-background-primary)] hover:text-[var(--hive-text-primary)]"
            aria-label="Dismiss"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}

        <div className="flex gap-4 p-6">
          {/* Icon */}
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border',
              config.iconBgClassName
            )}
          >
            <div className={config.iconClassName}>{config.icon}</div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-4 min-w-0">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={cn(
                    'flex items-center gap-1.5 uppercase tracking-[0.2em]',
                    config.badgeClassName
                  )}
                >
                  {config.label}
                </Badge>
                {meta.timeAgo && (
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]">
                    {meta.timeAgo}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold leading-tight text-[var(--hive-text-primary)]">
                {card.title}
              </h3>

              <p className="text-sm leading-relaxed text-[var(--hive-text-secondary)]">
                {card.description}
              </p>
            </div>

            {/* Action */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {meta.expiresLabel && (
                <span className="text-xs text-[var(--hive-text-tertiary)]">
                  {meta.expiresLabel}
                </span>
              )}

              {card.actionLabel && (
                <Button
                  size="md"
                  variant={meta.variant === 'ritual' ? 'brand' : 'secondary'}
                  onClick={handleAction}
                  className="min-w-[140px]"
                >
                  {card.actionLabel}
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Accent glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-current/[0.03] via-transparent to-transparent opacity-50" />
      </article>
    );
  }
);

FeedCardSystem.displayName = 'FeedCardSystem';
