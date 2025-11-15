"use client";

import * as React from "react";
import { Camera, GraduationCap, MapPin, Users } from "lucide-react";

import { cn } from "../../../lib/utils";
import { Card } from "../../00-Global/atoms/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../00-Global/atoms/avatar";
import { Badge } from "../../00-Global/atoms/badge";
import { Button } from "../../00-Global/atoms/button";
import {
  PresenceIndicator,
  type PresenceStatus,
} from "../../02-Feed/atoms/presence-indicator";
import {
  PrivacyControl,
  type PrivacyLevel,
} from "../../00-Global/molecules/privacy-control";
import type { UIProfile } from "./profile-types";

const presenceText = (status?: PresenceStatus, lastSeen?: Date | null) => {
  if (status === "online") return "Online now";
  if (status === "away") return "Away";
  if (!lastSeen) return "Offline";
  const diff = Date.now() - lastSeen.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return lastSeen.toLocaleDateString();
};

export interface ProfileIdentityWidgetProps {
  profile: UIProfile;
  isOwnProfile?: boolean;
  presenceStatus?: PresenceStatus;
  lastSeen?: Date | string | null;
  campusLabel?: string;
  completionPercentage?: number;
  onEditPhoto?: () => void;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  className?: string;
}

export function ProfileIdentityWidget({
  profile,
  isOwnProfile = false,
  presenceStatus = "offline",
  lastSeen,
  campusLabel,
  completionPercentage,
  onEditPhoto,
  privacyLevel,
  onPrivacyChange,
  className,
}: ProfileIdentityWidgetProps) {
  const displayName = profile.identity?.fullName || "Student";
  const initials = React.useMemo(() => {
    return displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "UB";
  }, [displayName]);

  const parsedLastSeen = React.useMemo(() => {
    if (!lastSeen) return null;
    if (lastSeen instanceof Date) return lastSeen;
    const parsed = new Date(lastSeen);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [lastSeen]);

  const academicYear = profile.academic?.academicYear
    ? String(profile.academic.academicYear).charAt(0).toUpperCase() + String(profile.academic.academicYear).slice(1)
    : undefined;

  const housing = profile.academic?.housing;

  const resolvedCampusLabel =
    campusLabel ?? profile.academic?.campusId?.replace(/-/g, " ") ?? "UB";

  const resolvedCompletionPercentage =
    completionPercentage ?? profile.metadata?.completionPercentage ?? 0;

  const resolvedPrivacyLevel: PrivacyLevel | undefined =
    privacyLevel ?? (profile.widgets?.myActivity?.level as PrivacyLevel | undefined);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 65%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 90%,transparent)] p-6",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 75%,transparent)] to-transparent" />

      {isOwnProfile && onPrivacyChange ? (
        <div className="absolute right-4 top-4">
          <PrivacyControl
            level={resolvedPrivacyLevel ?? "public"}
            onLevelChange={onPrivacyChange}
            compact
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 28%,transparent)]">
            {profile.identity?.avatarUrl ? (
              <AvatarImage src={profile.identity.avatarUrl} alt={displayName} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="absolute -right-2 -bottom-2">
            <PresenceIndicator status={presenceStatus} />
          </div>
          {isOwnProfile && onEditPhoto ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditPhoto}
              className="absolute inset-0 hidden items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm transition-opacity hover:bg-black/70 md:flex"
            >
              <Camera className="mr-1 h-3.5 w-3.5" aria-hidden />
              Edit
            </Button>
          ) : null}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]">{displayName}</h2>
            <Badge variant="primary" className="uppercase tracking-[0.32em]">
              {resolvedCampusLabel}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
            {academicYear ? (
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-4 w-4" aria-hidden />
                {academicYear}
              </span>
            ) : null}
            {profile.academic?.major ? (
              <span>{profile.academic.major}</span>
            ) : null}
            {profile.academic?.graduationYear ? (
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 90%,transparent)]">
                Class of {profile.academic.graduationYear}
              </span>
            ) : null}
          </div>
          {housing ? (
            <div className="flex items-center gap-2 text-xs text-[var(--hive-text-muted,#8e90a2)]">
              <MapPin className="h-4 w-4" aria-hidden />
              {housing}
            </div>
          ) : null}
          {profile.personal?.bio ? (
            <p className="max-w-xl text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
              {profile.personal.bio}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--hive-text-muted,#8e90a2) 95%,transparent)]">
            <span>{presenceText(presenceStatus, parsedLastSeen)}</span>
            <span aria-hidden>•</span>
            <span>
              {(profile.social?.connections?.connectionIds?.length ?? 0) +
                (profile.social?.connections?.friendIds?.length ?? 0)}{' '}
              connections
            </span>
            <span aria-hidden>•</span>
            <span>{profile.social?.mutualSpaces?.length ?? 0} shared spaces</span>
          </div>
        </div>
      </div>

      {isOwnProfile ? (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[var(--hive-text-muted,#8e90a2)]">
            <span>Profile completeness</span>
            <span className="text-[var(--hive-brand-primary,#facc15)]">{Math.round(resolvedCompletionPercentage)}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 75%,transparent)]">
            <div
              className="h-full rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 90%,transparent)] transition-[width] duration-500"
              style={{ width: `${Math.min(100, Math.max(0, resolvedCompletionPercentage))}%` }}
            />
          </div>
        </div>
      ) : null}
    </Card>
  );
}
