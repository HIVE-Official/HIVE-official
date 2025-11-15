"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { Card } from "../../00-Global/atoms/card";
import {
  ProfileIdentityWidget,
  ProfileActivityWidget,
  ProfileSpacesWidget,
  ProfileConnectionsWidget,
  ProfileCompletionCard,
  HiveLabWidget,
  type ProfileActivityItem,
  type ProfileSpaceItem,
  type ProfileConnectionItem,
} from "../organisms/profile-widgets";
import type { ProfileSystem } from "@hive/core";
import type { PrivacyLevel } from "../../00-Global/molecules/privacy-control";
import type { PresenceStatus } from "../../02-Feed/atoms/presence-indicator";

export interface ProfileViewLayoutProps {
  profile: ProfileSystem;
  isOwnProfile?: boolean;
  activities?: ProfileActivityItem[];
  spaces?: ProfileSpaceItem[];
  connections?: ProfileConnectionItem[];
  isSpaceLeader?: boolean;
  hasHiveLabAccess?: boolean;
  toolsCreated?: number;
  leadingSpaces?: Array<{ id: string; name: string }>;
  onEditPhoto?: () => void;
  onPrivacyChange?: (widget: string, level: PrivacyLevel) => void;
  onStepClick?: (stepId: string) => void;
  onRequestHiveLabAccess?: () => void;
  onOpenHiveLab?: () => void;
  className?: string;
}

const widgetLevel = (
  profile: ProfileSystem,
  widget: "myActivity" | "mySpaces" | "myConnections",
  fallback: PrivacyLevel,
): PrivacyLevel => {
  const widgets = (profile as any).widgets as Record<string, { level?: string }> | undefined;
  const level = widgets?.[widget]?.level ?? profile.privacy?.visibilityLevel;
  return (level as PrivacyLevel) ?? fallback;
};

export function ProfileViewLayout({
  profile,
  isOwnProfile = false,
  activities = [],
  spaces = [],
  connections = [],
  isSpaceLeader,
  hasHiveLabAccess,
  toolsCreated,
  leadingSpaces,
  onEditPhoto,
  onPrivacyChange,
  onStepClick,
  onRequestHiveLabAccess,
  onOpenHiveLab,
  className,
}: ProfileViewLayoutProps) {
  const completion = profile.completeness ?? 0;
  const extendedProfile = profile as unknown as {
    personal?: { bio?: string };
    spaces?: Array<{ id: string }>;
    stats?: { toolsUsed?: number };
    completedSteps?: string[];
    presence?: { status?: string; lastSeen?: Date | string | null };
  };

  const handlePrivacyChange = (widget: string) => (level: PrivacyLevel) => {
    onPrivacyChange?.(widget, level);
  };

  const derivedPresenceStatus = React.useMemo<PresenceStatus>(() => {
    const candidate = extendedProfile.presence?.status;
    if (
      candidate === "online" ||
      candidate === "away" ||
      candidate === "offline" ||
      candidate === "ghost"
    ) {
      return candidate;
    }
    if (profile.presence?.isOnline) {
      return "online";
    }
    if (profile.presence?.beacon?.active) {
      return "away";
    }
    return "offline";
  }, [extendedProfile.presence?.status, profile.presence?.isOnline, profile.presence?.beacon]);

  const lastSeen =
    extendedProfile.presence?.lastSeen ?? profile.presence?.lastActive ?? null;

  return (
    <div className={cn("space-y-6", className)}>
      <ProfileIdentityWidget
        profile={{
          id: profile.userId,
          handle: profile.handle,
          displayName: profile.identity.academic.name,
          campusId: profile.campusId,
          identity: {
            id: profile.userId,
            fullName: profile.identity.academic.name,
            avatarUrl: profile.identity.photoCarousel?.photos?.[0]?.url,
          },
          academic: {
            campusId: profile.campusId,
            major: profile.identity.academic.majors?.join(", ") ?? undefined,
            academicYear: profile.identity.academic.year,
            graduationYear: profile.identity.academic.graduationYear,
            pronouns: profile.identity.academic.pronouns,
          },
          personal: {
            bio: extendedProfile.personal?.bio,
            currentVibe: profile.presence?.currentActivity?.context ?? profile.presence?.vibe,
          },
          social: {
            connections: {
              connectionIds: profile.connections.connections?.map((c) => c.userId) ?? [],
              friendIds: profile.connections.friends?.map((c) => c.userId) ?? [],
            },
            mutualSpaces: extendedProfile.spaces?.map((space) => space.id) ?? [],
          },
          metadata: {
            completionPercentage: completion,
          },
          widgets: {
            myActivity: { level: widgetLevel(profile, "myActivity", "public") },
          },
        }}
        isOwnProfile={isOwnProfile}
        presenceStatus={derivedPresenceStatus}
        lastSeen={lastSeen}
        completionPercentage={completion}
        onEditPhoto={onEditPhoto}
        privacyLevel={widgetLevel(profile, "myActivity", "public")}
        onPrivacyChange={onPrivacyChange ? handlePrivacyChange("myActivity") : undefined}
      />

      {isOwnProfile ? (
        <ProfileCompletionCard
          completionPercentage={completion}
          completedSteps={extendedProfile.completedSteps ?? []}
          onStepClick={onStepClick}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProfileActivityWidget
            activities={activities}
            isOwnProfile={isOwnProfile}
            privacyLevel={widgetLevel(profile, "myActivity", "public")}
            onPrivacyChange={onPrivacyChange ? handlePrivacyChange("myActivity") : undefined}
          />

          <ProfileSpacesWidget
            spaces={spaces}
            isOwnProfile={isOwnProfile}
            privacyLevel={widgetLevel(profile, "mySpaces", "connections")}
            onPrivacyChange={onPrivacyChange ? handlePrivacyChange("mySpaces") : undefined}
          />
        </div>
        <div className="space-y-6">
          <ProfileConnectionsWidget
            connections={connections}
            isOwnProfile={isOwnProfile}
            privacyLevel={widgetLevel(profile, "myConnections", "connections")}
            onPrivacyChange={onPrivacyChange ? handlePrivacyChange("myConnections") : undefined}
          />

          <HiveLabWidget
            hasAccess={hasHiveLabAccess}
            isSpaceLeader={isSpaceLeader}
            toolsCreated={toolsCreated}
            toolsUsed={extendedProfile.stats?.toolsUsed ?? 0}
            leadingSpaces={leadingSpaces}
            onRequestAccess={onRequestHiveLabAccess}
            onOpenStudio={onOpenHiveLab}
          />
        </div>
      </div>

      <Card className="rounded-3xl border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 55%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 90%,transparent)] p-6">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary,#f7f7ff)]">Timeline</h3>
        <p className="mt-2 text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
          Ritual streaks, actions, and campus milestones will appear here in the next iteration.
        </p>
      </Card>
    </div>
  );
}
