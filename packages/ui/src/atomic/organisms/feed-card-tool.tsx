'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  Badge,
  Button,
  ToolIcon,
  SparklesIcon,
  DownloadIcon,
  UsersIcon,
} from '../atoms';
import { FeedSpaceChip } from '../molecules/feed-space-chip';
import type { FeedCardSpace } from './feed-card-post';

export interface FeedCardToolMeta {
  featured?: boolean;
  categoryLabel?: string;
  lastUpdatedLabel?: string;
}

export interface FeedCardToolStats {
  installs?: number;
  activeUsers?: number;
  ratingLabel?: string;
}

export interface FeedCardToolData {
  id: string;
  title: string;
  summary?: string;
  authorLabel: string;
  previewDescription?: string;
  space: FeedCardSpace;
  meta?: FeedCardToolMeta;
  stats?: FeedCardToolStats;
  tags?: string[];
}

export interface FeedCardToolCallbacks {
  onOpenTool?: (toolId: string) => void;
  onPreview?: (toolId: string) => void;
  onSpaceClick?: (spaceId: string) => void;
}

export interface FeedCardToolProps
  extends FeedCardToolCallbacks,
    React.HTMLAttributes<HTMLDivElement> {
  tool: FeedCardToolData;
  tone?: 'default' | 'featured';
}

const formatNumber = (value?: number) => {
  if (!value || value <= 0) return null;
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return `${value}`;
};

export const FeedCardTool = React.forwardRef<HTMLDivElement, FeedCardToolProps>(
  ({ tool, onOpenTool, onPreview, onSpaceClick, tone = 'default', className, ...props }, ref) => {
    const { space, meta, stats, tags } = tool;
    const installsCopy = formatNumber(stats?.installs);
    const activesCopy = formatNumber(stats?.activeUsers);

    const handleOpen = () => {
      onOpenTool?.(tool.id);
    };

    const handlePreview = () => {
      onPreview?.(tool.id);
    };

    return (
      <article
        ref={ref}
        role="article"
        className={cn(
          'group relative overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--hive-border-default) 78%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] shadow-[0_24px_45px_rgba(5,7,13,0.35)] transition-shadow hover:shadow-[0_26px_52px_rgba(5,7,13,0.45)]',
          tone === 'featured' && 'border-[var(--hive-brand-primary)]/40 bg-[color-mix(in_srgb,var(--hive-brand-primary) 6%,var(--hive-background-secondary))]',
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-5 p-6">
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {meta?.featured && (
                <Badge className="flex items-center gap-1 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40">
                  <SparklesIcon className="h-3.5 w-3.5" />
                  Featured Tool
                </Badge>
              )}
              {meta?.categoryLabel && (
                <Badge variant="outline" className="text-[var(--hive-text-secondary)]">
                  {meta.categoryLabel}
                </Badge>
              )}
              {meta?.lastUpdatedLabel && (
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]">
                  Updated {meta.lastUpdatedLabel}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold leading-tight text-[var(--hive-text-primary)]">
                  {tool.title}
                </h2>
                {tool.summary && (
                  <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed">
                    {tool.summary}
                  </p>
                )}
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-[var(--hive-brand-primary)]">
                <ToolIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <FeedSpaceChip
                spaceId={space.id}
                spaceName={space.name}
                spaceColor={space.color}
                spaceIcon={space.icon}
                onClick={
                  onSpaceClick
                    ? (event) => {
                        event.stopPropagation();
                        onSpaceClick(space.id);
                      }
                    : undefined
                }
              />
              <span className="text-xs text-[var(--hive-text-tertiary)]">
                {tool.authorLabel}
              </span>
            </div>
          </header>

          {tool.previewDescription && (
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 text-sm leading-relaxed text-[var(--hive-text-secondary)]">
              {tool.previewDescription}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--hive-text-tertiary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--hive-text-secondary)]">
              {installsCopy && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 font-medium text-white">
                  <DownloadIcon className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                  {installsCopy} installs
                </span>
              )}
              {activesCopy && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65">
                  <UsersIcon className="h-3.5 w-3.5" />
                  {activesCopy} active
                </span>
              )}
              {stats?.ratingLabel && (
                <span className="text-xs uppercase tracking-[0.16em] text-white/55">
                  {stats.ratingLabel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="brand" size="md" onClick={handleOpen}>
                Open tool
              </Button>
              <Button variant="secondary" size="md" onClick={handlePreview}>
                Preview
              </Button>
            </div>
          </footer>
        </div>
      </article>
    );
  }
);

FeedCardTool.displayName = 'FeedCardTool';

