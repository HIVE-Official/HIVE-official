'use client';

import * as React from 'react';
import type { RitualFeedBanner as RitualFeedBannerData } from '@hive/core';
import { cn } from '../../../lib/utils';
import { Button } from '../../00-Global/atoms/button';
import { Card } from '../../00-Global/atoms/card';
import { Clock, UserPlus } from 'lucide-react';

export interface RitualFeedBannerCardProps {
  banner: RitualFeedBannerData;
  onAction?: (href: string) => void;
}

export const RitualFeedBannerCard: React.FC<RitualFeedBannerCardProps> = ({ banner, onAction }) => {
  const timeRemaining = React.useMemo(() => {
    const now = Date.now();
    const ends = new Date(banner.endsAt).getTime();
    const diff = ends - now;
    if (diff <= 0) return 'Ended';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  }, [banner.endsAt]);

  return (
    <Card
      className={cn(
        'overflow-hidden border-white/10 bg-gradient-to-br from-[var(--hive-background-secondary)] via-[var(--hive-background-primary)] to-black p-6',
        banner.accentColor ? `border-[${banner.accentColor}]` : null,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
            <span>Ritual</span>
            <span>{banner.archetype.replace('_', ' ')}</span>
          </div>
          <h2 className="text-xl font-semibold text-white">{banner.title}</h2>
          {banner.subtitle ? (
            <p className="max-w-xl text-sm text-white/70">{banner.subtitle}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {timeRemaining}
            </span>
            {banner.stats?.map((stat) => (
              <span key={stat.label} className="inline-flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                {stat.label}: {stat.value}
              </span>
            ))}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => onAction?.(banner.cta.href)}
          className={cn(
            banner.cta.variant === 'primary'
              ? 'bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90 text-black'
              : 'bg-white/10 text-white hover:bg-white/20',
          )}
          asChild={!onAction}
        >
          {onAction ? (
            <span>{banner.cta.label}</span>
          ) : (
            <a href={banner.cta.href}>{banner.cta.label}</a>
          )}
        </Button>
      </div>
    </Card>
  );
};
