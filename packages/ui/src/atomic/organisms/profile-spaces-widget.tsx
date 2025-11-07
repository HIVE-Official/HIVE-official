"use client";

import * as React from "react";
import { Building2, Users, Sparkles } from "lucide-react";

import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import {
  PrivacyControl,
  type PrivacyLevel,
} from "../molecules/privacy-control";

export interface ProfileSpaceItem {
  id: string;
  name: string;
  role?: string;
  memberCount?: number;
  lastActivityAt?: string | number | Date;
  headline?: string;
}

export interface ProfileSpacesWidgetProps {
  spaces: ProfileSpaceItem[];
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  className?: string;
}

const formatLastActivity = (value?: string | number | Date) => {
  if (!value) return "Recently";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Active now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export function ProfileSpacesWidget({
  spaces,
  isOwnProfile = false,
  privacyLevel = "public",
  onPrivacyChange,
  className,
}: ProfileSpacesWidgetProps) {
  const visible = spaces.slice(0, 4);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 60%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 86%,transparent)] p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)] p-2">
            <Building2 className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]">Spaces</h3>
        </div>
        {isOwnProfile && onPrivacyChange ? (
          <PrivacyControl level={privacyLevel} onLevelChange={onPrivacyChange} compact />
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center">
          <Sparkles className="h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]" aria-hidden />
          <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
            {isOwnProfile
              ? "Join a space to showcase your campus communities."
              : "No spaces shared publicly yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((space) => (
            <div
              key={space.id}
              className="rounded-2xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 75%,transparent)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-[var(--hive-text-primary,#f7f7ff)]">{space.name}</p>
                  {space.headline ? (
                    <p className="text-xs text-[var(--hive-text-muted,#8d90a2)]">{space.headline}</p>
                  ) : null}
                </div>
                {space.role ? (
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 16%,transparent)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--hive-brand-primary,#facc15)]">
                    {space.role}
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  {space.memberCount ?? 0} members
                </span>
                <span aria-hidden>•</span>
                <span>Active {formatLastActivity(space.lastActivityAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
