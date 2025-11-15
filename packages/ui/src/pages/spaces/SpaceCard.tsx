import * as React from "react";

import { Badge } from "../../atomic/00-Global/atoms/badge";
import { Button } from "../../atomic/00-Global/atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../atomic/00-Global/atoms/avatar";
import { Surface } from "../../layout";
import { cn } from "../../lib/utils";

export interface SpaceCardHost {
  name: string;
  avatarUrl?: string;
  initials?: string;
  role?: string;
}

export interface SpaceCardMetric {
  label: string;
  value: string;
}

export interface SpaceCardData {
  id: string;
  name: string;
  description: string;
  members: number;
  momentum?: string;
  tags?: string[];
  bannerImage?: string;
  bannerColor?: string;
  category?: string;
  hosts?: SpaceCardHost[];
  metrics?: SpaceCardMetric[];
  isInviteOnly?: boolean;
}

export interface SpaceCardProps {
  space: SpaceCardData;
  ctaLabel?: string;
  onJoin?: (spaceId: string) => void;
}

export function SpaceCard({ space, ctaLabel = "Join space", onJoin }: SpaceCardProps) {
  return (
    <Surface
      elevation="sm"
      padding="lg"
      className="flex h-full flex-col justify-between rounded-3xl border border-[var(--hive-border-default,#292c3c)] bg-[var(--hive-background-secondary,#10111a)]"
    >
      <div className="space-y-4">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-gradient-to-br from-[var(--hive-background-tertiary,#181a27)] to-[var(--hive-background-secondary,#10111a)]",
            space.bannerColor,
          )}
        >
          {space.bannerImage ? (
            <img
              src={space.bannerImage}
              alt=""
              className="h-28 w-full object-cover opacity-90"
            />
          ) : (
            <div className="h-28 w-full bg-gradient-to-r from-[rgba(255,214,102,0.25)] via-transparent to-[rgba(255,214,102,0.05)]" />
          )}
          {space.category ? (
            <span className="absolute left-4 top-4 rounded-full bg-[rgba(7,8,13,0.7)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8d93a7)]">
              {space.category}
            </span>
          ) : null}
          {space.momentum ? (
            <span className="absolute bottom-4 left-4 rounded-full bg-[rgba(7,8,13,0.8)] px-3 py-1 text-xs font-semibold text-[var(--hive-brand-primary,#ffd166)]">
              {space.momentum}
            </span>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{space.name}</h3>
            {space.isInviteOnly ? (
              <Badge tone="muted" variant="pill">
                Invite only
              </Badge>
            ) : null}
          </div>
          <p className="text-sm leading-6 text-[var(--hive-text-secondary,#bfc3d8)]">{space.description}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8d93a7)]">
            {space.members.toLocaleString()} members on campus
          </p>
        </div>

        {space.tags && space.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {space.tags.map((tag) => (
              <Badge key={tag} tone="muted" variant="pill">
                #{tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {space.hosts && space.hosts.length > 0 ? (
          <div className="rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#161827)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--hive-text-muted,#8c91a7)]">
              Hosts
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {space.hosts.map((host) => (
                <div key={host.name} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {host.avatarUrl ? (
                      <AvatarImage src={host.avatarUrl} alt={host.name} />
                    ) : (
                      <AvatarFallback>{host.initials ?? host.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{host.name}</p>
                    {host.role ? (
                      <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--hive-text-muted,#8d93a7)]">
                        {host.role}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {space.metrics && space.metrics.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171828)] p-4">
            {space.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--hive-text-muted,#8d93a7)]">
                  {metric.label}
                </p>
                <p className="text-sm font-semibold text-[var(--hive-text-primary,#f5f5ff)]">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => onJoin?.(space.id)}
        >
          {ctaLabel}
        </Button>
        <Button variant="ghost" className="text-xs uppercase tracking-[0.28em]">
          View rituals
        </Button>
      </div>
    </Surface>
  );
}
