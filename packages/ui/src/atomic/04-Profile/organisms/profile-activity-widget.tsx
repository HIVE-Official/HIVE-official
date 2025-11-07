"use client";

import * as React from "react";
import {
  Activity,
  CalendarClock,
  ChevronRight,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";

import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Button } from "../atoms/button";
import {
  PrivacyControl,
  type PrivacyLevel,
} from "../molecules/privacy-control";

export type ProfileActivityType =
  | "post"
  | "comment"
  | "connection"
  | "space_join"
  | "ritual"
  | "other";

export interface ProfileActivityItem {
  id: string;
  type?: ProfileActivityType;
  title: string;
  spaceName?: string;
  timestamp: string | number | Date;
  engagementCount?: number;
}

export interface ProfileActivityWidgetProps {
  activities: ProfileActivityItem[];
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  onViewAll?: () => void;
  className?: string;
}

const ICON_MAP: Record<ProfileActivityType, React.ComponentType<{ className?: string }>> = {
  post: MessageCircle,
  comment: MessageCircle,
  connection: Users,
  space_join: Users,
  ritual: CalendarClock,
  other: Activity,
};

const formatRelative = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export function ProfileActivityWidget({
  activities,
  isOwnProfile = false,
  privacyLevel = "public",
  onPrivacyChange,
  onViewAll,
  className,
}: ProfileActivityWidgetProps) {
  const visibleActivities = activities.slice(0, 5);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 60%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#111221) 88%,transparent)] p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 85%,transparent)] p-2">
            <Activity className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]">Recent activity</h3>
        </div>
        {isOwnProfile && onPrivacyChange ? (
          <PrivacyControl level={privacyLevel} onLevelChange={onPrivacyChange} compact />
        ) : null}
      </div>

      {visibleActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary,#0a0b16) 80%,transparent)] py-10 text-center">
          <Activity className="h-6 w-6 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]" aria-hidden />
          <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
            {isOwnProfile
              ? "Your campus journey will appear here after you join spaces or post."
              : "No public activity yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {visibleActivities.map((item) => {
            const Icon = ICON_MAP[item.type ?? "other"] ?? Activity;
            return (
              <div
                key={item.id}
                className="group flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 55%,transparent)]"
              >
                <div className="mt-1 rounded-xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)] p-1.5">
                  <Icon className="h-3.5 w-3.5 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 80%,transparent)]" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--hive-text-primary,#f7f7ff)]">{item.title}</p>
                  {item.spaceName ? (
                    <p className="text-xs text-[var(--hive-text-muted,#8d90a2)]">in {item.spaceName}</p>
                  ) : null}
                  <div className="mt-2 flex items-center gap-3 text-xs text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 88%,transparent)]">
                    <span>{formatRelative(item.timestamp)}</span>
                    {item.engagementCount ? (
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" aria-hidden />
                        {item.engagementCount}
                      </span>
                    ) : null}
                  </div>
                </div>
                <ChevronRight className="mt-1 h-4 w-4 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 70%,transparent)] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </div>
            );
          })}
        </div>
      )}

      {activities.length > visibleActivities.length && onViewAll ? (
        <Button
          variant="ghost"
          className="mt-4 w-full justify-center text-sm text-[var(--hive-text-secondary,#c0c2cc)]"
          onClick={onViewAll}
        >
          View all activity
        </Button>
      ) : null}
    </Card>
  );
}
