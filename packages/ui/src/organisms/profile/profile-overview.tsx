// Bounded Context Owner: Identity & Access Management Guild
import type { ReactNode } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { HiveLogo } from "@/atoms/hive-logo";
import { cn } from "@/utils/cn";

export interface ProfileOverviewIdentity {
  readonly fullName: string;
  readonly handle: string;
  readonly pronouns?: string;
  readonly bio?: string;
  readonly campus: string;
  readonly userType: string;
  readonly photoUrl?: string;
}

export interface ProfileOverviewStat {
  readonly label: string;
  readonly value: string;
  readonly helperText?: string;
}

export interface ProfileOverviewConnection {
  readonly name: string;
  readonly handle: string;
  readonly mutualSpaces: number;
  readonly mutualConnections: number;
  readonly lastActive: string;
}

export interface ProfileOverviewActivity {
  readonly id: string;
  readonly occurredAt: string;
  readonly description: string;
  readonly metadata?: ReactNode;
}

export interface ProfileOverviewSpaceRecommendation {
  readonly name: string;
  readonly reason: string;
  readonly joinUrl?: string;
  readonly previewImage?: string;
  readonly previewAlt?: string;
}

export interface ProfileOverviewProps {
  readonly identity: ProfileOverviewIdentity;
  readonly interests: readonly string[];
  readonly stats: readonly ProfileOverviewStat[];
  readonly connections: readonly ProfileOverviewConnection[];
  readonly activity: readonly ProfileOverviewActivity[];
  readonly recommendedSpaces: readonly ProfileOverviewSpaceRecommendation[];
}

export function ProfileOverview({
  identity,
  interests,
  stats,
  connections,
  activity,
  recommendedSpaces
}: ProfileOverviewProps) {
  return (
    <div className="grid auto-rows-[minmax(0,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
      <section
        className={cn(
          brand.surface.bento({ accent: "gold", preview: Boolean(identity.photoUrl) }),
          "relative flex flex-col gap-6 overflow-hidden p-6 sm:p-8 xl:col-span-2 xl:row-span-2"
        )}
      >
        <span className="pointer-events-none absolute -left-12 top-10 h-48 w-48 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl opacity-80" aria-hidden="true" />

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] shrink-0 overflow-hidden rounded-[calc(var(--radius,20px)+8px)] border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--secondary)/0.65)] shadow-[0_28px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-1.5">
            {identity.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Storybook-only component
              <img src={identity.photoUrl} alt={`${identity.fullName} portrait`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[hsl(var(--background)/0.7)] to-[hsl(var(--primary)/0.18)]">
                <HiveLogo size={96} variant="gradient" aria-label="Hive profile placeholder" />
                <span className="text-caption font-caption uppercase tracking-[0.25em] text-muted-foreground/80">Hive Profile</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/8 mix-blend-soft-light" aria-hidden="true" />
          </div>

          <div className="flex flex-1 flex-col gap-6 text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-h2 font-h2 text-foreground">{identity.fullName}</h2>
                <Badge variant="secondary" className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary)/0.95)] backdrop-blur">
                  {identity.userType}
                </Badge>
                <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.4)] text-muted-foreground">
                  {identity.campus}
                </Badge>
                {identity.pronouns ? (
                  <Badge variant="soft" className="rounded-full bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary)/0.85)]">
                    {identity.pronouns}
                  </Badge>
                ) : null}
              </div>
              <p className="text-body-sm font-body-sm text-muted-foreground/75">@{identity.handle}</p>
              {identity.bio ? (
                <p className="max-w-xl text-body font-body text-muted-foreground/90">{identity.bio}</p>
              ) : null}
            </div>

            {interests.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-label font-label uppercase text-muted-foreground/70">Signal interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] px-3 py-1 text-caption font-caption text-muted-foreground/90 backdrop-blur-sm"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-10 right-10 h-32 w-32 rounded-full bg-[hsl(var(--primary)/0.2)] blur-2xl opacity-70" aria-hidden="true" />
      </section>

      <section className={cn(brand.surface.bento({ accent: "slate" }), "flex flex-col gap-5 p-6 sm:p-7")}>
        <header className="space-y-2">
          <p className="text-label font-label uppercase text-muted-foreground/80">Momentum</p>
          <h3 className="text-h4 font-h4 text-foreground">Profile health</h3>
        </header>
        {stats.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground/80">No metrics yet — populate the profile to unlock insights.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-4 backdrop-blur transition hover:border-[hsl(var(--primary)/0.45)]"
              >
                <p className="text-label font-label uppercase text-muted-foreground/60">{stat.label}</p>
                <p className="mt-3 text-h3 font-h3 text-foreground">{stat.value}</p>
                {stat.helperText ? (
                  <p className="mt-2 text-caption font-caption text-muted-foreground/80">{stat.helperText}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={cn(brand.surface.bento({ accent: "iris" }), "flex flex-col gap-5 p-6 sm:p-7 xl:col-span-2")}>
        <header className="space-y-2">
          <p className="text-label font-label uppercase text-muted-foreground/80">Rhythm</p>
          <h3 className="text-h4 font-h4 text-foreground">Latest activity</h3>
        </header>
        {activity.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground/80">
            Activity will appear here once the profile starts coordinating.
          </p>
        ) : (
          <ul className="space-y-5">
            {activity.slice(0, 5).map((entry, index) => (
              <li key={entry.id} className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.72)] p-4 backdrop-blur">
                <span className="absolute left-4 top-4 text-caption font-caption text-muted-foreground/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pl-10">
                  <p className="text-body font-body text-foreground">{entry.description}</p>
                  <p className="mt-1 text-caption font-caption text-muted-foreground/80">{entry.occurredAt}</p>
                  {entry.metadata ? (
                    <div className="mt-3 text-body-sm font-body-sm text-muted-foreground/80">{entry.metadata}</div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={cn(brand.surface.bento({ accent: "emerald" }), "flex flex-col gap-5 p-6 sm:p-7")}>
        <header className="space-y-2">
          <p className="text-label font-label uppercase text-muted-foreground/80">Orbit</p>
          <h3 className="text-h4 font-h4 text-foreground">Connections</h3>
        </header>
        {connections.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground/80">
            No connections yet — join campus spaces to start collaborating.
          </p>
        ) : (
          <div className="space-y-3">
            {connections.slice(0, 4).map((connection, index) => (
              <div
                key={`${connection.handle}-${index}`}
                className="rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-4 backdrop-blur transition hover:border-[hsl(var(--primary)/0.35)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-body font-body text-foreground">{connection.name}</p>
                    <p className="text-caption font-caption text-muted-foreground/75">{connection.handle}</p>
                  </div>
                  <span className="text-caption font-caption text-muted-foreground/60">{connection.lastActive}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                    {connection.mutualSpaces} mutual spaces
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                    {connection.mutualConnections} mutual connections
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={cn(brand.surface.bento({ accent: "crimson" }), "flex flex-col gap-5 p-6 sm:p-7")}>
        <header className="space-y-2">
          <p className="text-label font-label uppercase text-muted-foreground/80">Discovery</p>
          <h3 className="text-h4 font-h4 text-foreground">Spaces to explore</h3>
        </header>
        {recommendedSpaces.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground/80">
            Complete the profile to unlock HiveLab-curated recommendations.
          </p>
        ) : (
          <div className="space-y-3">
            {recommendedSpaces.slice(0, 4).map((space, index) => (
              <article
                key={`${space.name}-${index}`}
                className={cn(
                  brand.surface.bento({ accent: "slate", preview: Boolean(space.previewImage) }),
                  "relative flex flex-col gap-3 p-4 transition hover:border-[hsl(var(--primary)/0.45)]"
                )}
              >
                {space.previewImage ? (
                  <div className="bento-card__preview">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Storybook-only component */}
                    <img src={space.previewImage} alt={space.previewAlt ?? `${space.name} preview`} />
                    <span className="bento-card__preview-label">Preview</span>
                  </div>
                ) : null}
                <p className="text-body font-body text-foreground">{space.name}</p>
                <p className="text-caption font-caption text-muted-foreground/75">{space.reason}</p>
                {space.joinUrl ? (
                  <a
                    href={space.joinUrl}
                    className="mt-1 inline-flex text-caption font-caption text-[hsl(var(--primary))] underline-offset-4 hover:underline"
                  >
                    View space
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
