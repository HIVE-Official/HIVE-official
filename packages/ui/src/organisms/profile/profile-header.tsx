// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { Badge } from "@/atoms/badge";
import { brand } from "@/brand/classnames";
import { HiveLogo } from "@/atoms/hive-logo";

export interface ProfileHeaderProps extends HTMLAttributes<HTMLDivElement> {
  readonly fullName: string;
  readonly handle: string;
  readonly pronouns?: string;
  readonly bio?: string;
  readonly campus: string;
  readonly userType: string;
  readonly photoUrl?: string;
  readonly tags?: readonly string[];
  readonly ghostMode?: boolean;
}

export function ProfileHeader({
  fullName,
  handle,
  pronouns,
  bio,
  campus,
  userType,
  photoUrl,
  tags = [],
  ghostMode = false,
  className,
  ...props
}: ProfileHeaderProps) {
  return (
    <section
      className={cn(
        brand.surface.bento({ accent: "gold", preview: Boolean(photoUrl) }),
        "group relative flex flex-col gap-6 overflow-hidden p-6 sm:p-8 md:flex-row md:items-start",
        className
      )}
      {...props}
    >
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] shrink-0 overflow-hidden rounded-[calc(var(--radius,20px)+6px)] border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--secondary)/0.65)] shadow-[0_25px_45px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1.5">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- Storybook-only component
          <img src={photoUrl} alt={`${fullName} portrait`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[hsl(var(--background)/0.6)] to-[hsl(var(--primary)/0.18)]">
            <HiveLogo size={80} variant="gradient" aria-label="Hive profile placeholder" />
            <span className="text-caption font-caption uppercase tracking-[0.3em] text-muted-foreground/80">Hive Profile</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/8 mix-blend-soft-light" aria-hidden="true" />
        {ghostMode ? (
          <span className="absolute inset-x-3 bottom-3 rounded-full border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)] px-3 py-1 text-caption font-caption uppercase tracking-wide text-white/80 backdrop-blur">
            Ghost mode active
          </span>
        ) : null}
      </div>

      <div className="flex-1 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-h2 font-h2 text-foreground">{fullName}</h1>
          <Badge variant="secondary" className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary)/0.95)] backdrop-blur">
            {userType}
          </Badge>
          <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.4)] text-muted-foreground">
            {campus}
          </Badge>
          {pronouns ? <Badge variant="soft" className="rounded-full bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary)/0.85)]">{pronouns}</Badge> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-body-sm font-body-sm text-muted-foreground/80">
          <span>@{handle}</span>
          {ghostMode ? <span className="rounded-full bg-[hsl(var(--primary)/0.15)] px-2 py-0.5 text-[hsl(var(--primary)/0.85)]">Private presence</span> : null}
        </div>

        {bio ? <p className="max-w-3xl text-body font-body text-muted-foreground/90">{bio}</p> : null}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.75)] px-3 py-1 text-caption font-caption text-muted-foreground/90 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <span className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
    </section>
  );
}
