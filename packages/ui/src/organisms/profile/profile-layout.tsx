// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";
import { ProfileHeader, type ProfileHeaderProps } from "./profile-header";
import { ProfileStatsStrip, type ProfileStat } from "./profile-stats-strip";
import { ProfileActivityTimeline, type ProfileActivityItem } from "./profile-activity-timeline";
import { ProfileConnectionsPanel, type ProfileConnectionCard } from "./profile-connections-panel";
import { ProfileRecommendationsPanel, type ProfileRecommendation } from "./profile-recommendations-panel";
import { ProfilePrivacyBanner, type ProfileVisibility } from "./profile-privacy-banner";
import { ProfileSpacesPanel, type ProfileSpaceCard } from "./profile-spaces-panel";
import { ProfileToolsPanel } from "./profile-tools-panel";

export interface ProfileLayoutProps extends HTMLAttributes<HTMLDivElement> {
  readonly header: ProfileHeaderProps;
  readonly stats: readonly ProfileStat[];
  readonly activity: readonly ProfileActivityItem[];
  readonly connections: readonly ProfileConnectionCard[];
  readonly recommendations: readonly ProfileRecommendation[];
  readonly spaces: {
    readonly explore: readonly ProfileSpaceCard[];
    readonly mine: readonly ProfileSpaceCard[];
  };
  readonly visibility: ProfileVisibility;
  readonly ghostMode?: boolean;
  readonly emptyMessage?: string;
}

export function ProfileLayout({
  header,
  stats,
  activity,
  connections,
  recommendations,
  spaces,
  visibility,
  ghostMode = false,
  emptyMessage = "This profile is still warming up. Add a bio, connect with peers, and join spaces to unlock the full experience.",
  className,
  ...props
}: ProfileLayoutProps) {
  const isEmpty =
    activity.length === 0 &&
    connections.length === 0 &&
    recommendations.length === 0 &&
    spaces.explore.length === 0 &&
    spaces.mine.length === 0 &&
    stats.every((stat) => stat.value === "0");

  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(0,1fr)] gap-6",
        "sm:grid-cols-6",
        "xl:grid-cols-12",
        className
      )}
      {...props}
    >
      <ProfileHeader
        {...header}
        ghostMode={ghostMode}
        className={cn("sm:col-span-6 xl:col-span-7 xl:row-span-2", header.className)}
      />
      <ProfilePrivacyBanner
        visibility={visibility}
        ghostMode={ghostMode}
        className="sm:col-span-6 xl:col-span-5"
      />
      <ProfileStatsStrip stats={stats} size="compact" className="sm:col-span-6 xl:col-span-5" />

      {isEmpty ? (
        <section
          className={cn(
            brand.surface.bento(),
            motionClass("ambient"),
            "sm:col-span-6 xl:col-span-7 xl:row-span-2 space-y-3 p-6 text-body-sm font-body-sm text-muted-foreground sm:p-7"
          )}
        >
          <h2 className="text-h4 font-h4 text-foreground">Bring the profile to life</h2>
          <p>{emptyMessage}</p>
        </section>
      ) : (
        <>
          <section className="sm:col-span-6 xl:col-span-8 space-y-4">
            <header className="space-y-1">
              <h2 className="text-h4 font-h4 text-foreground">Activity</h2>
              <p className="text-body-sm font-body-sm text-muted-foreground">
                Where coordination signals originate and evolve.
              </p>
            </header>
            <ProfileActivityTimeline items={activity} className={motionClass("ambient")} />
          </section>

          <ProfileSpacesPanel
            size="compact"
            className="sm:col-span-6 xl:col-span-7 xl:row-span-2"
            explore={spaces.explore}
            mine={spaces.mine}
          />

          <ProfileRecommendationsPanel
            size="compact"
            className="sm:col-span-6 xl:col-span-5"
            recommendations={recommendations.map((rec, index) => ({
              id: `rec-${index}`,
              ...rec
            }))}
          />

          <ProfileConnectionsPanel
            size="compact"
            className="sm:col-span-6 xl:col-span-5"
            connections={connections.map((connection, index) => ({
              ...connection,
              id: `connection-${index}`
            }))}
          />
        </>
      )}

      <ProfileToolsPanel className="sm:col-span-6 xl:col-span-7" />
    </div>
  );
}
