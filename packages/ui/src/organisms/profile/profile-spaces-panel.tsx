// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

export interface ProfileSpaceCard {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly joinUrl?: string;
  readonly memberCount?: number;
  readonly badge?: string;
  readonly previewImage?: string;
  readonly previewAlt?: string;
}

export interface ProfileSpacesPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly explore: readonly ProfileSpaceCard[];
  readonly mine: readonly ProfileSpaceCard[];
  readonly size?: "default" | "compact";
}

const Section = ({
  title,
  helper,
  emptyMessage,
  items,
  linkLabel,
  size
}: {
  title: string;
  helper: string;
  emptyMessage: string;
  items: readonly ProfileSpaceCard[];
  linkLabel: string;
  size: "default" | "compact";
}) => {
  const isCompact = size === "compact";
  const peekCount = isCompact ? 2 : 3;
  const peek = items.slice(0, peekCount);

  if (peek.length === 0) {
    return (
      <section className="space-y-2">
        <header className="space-y-1">
          <h3 className="text-h5 font-h5 text-foreground">{title}</h3>
          <p className="text-body-xs font-body-xs text-muted-foreground/80">{helper}</p>
        </header>
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-4 text-body-sm font-body-sm text-muted-foreground/80 backdrop-blur">
          {emptyMessage}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <header className="space-y-1">
        <h3 className="text-h5 font-h5 text-foreground">{title}</h3>
        <p className="text-body-xs font-body-xs text-muted-foreground/80">{helper}</p>
      </header>
      <div className="space-y-3">
        {peek.map((space, index) => (
          <article
            key={space.id}
            className={cn(
              brand.surface.bento({ accent: "slate", preview: Boolean(space.previewImage) }),
              motionClass("ambient"),
              "group relative flex flex-col gap-3 p-4 transition hover:border-[hsl(var(--primary)/0.45)]"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {space.previewImage ? (
              <div className="bento-card__preview">
                {/* eslint-disable-next-line @next/next/no-img-element -- Storybook-only component */}
                <img src={space.previewImage} alt={space.previewAlt ?? `${space.name} preview`} />
                <span className="bento-card__preview-label">Preview</span>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-body font-body text-foreground">{space.name}</p>
                <p className="text-caption font-caption text-muted-foreground/80">{space.description}</p>
              </div>
              {space.memberCount ? (
                <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                  {space.memberCount.toLocaleString()} members
                </Badge>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {space.badge ? (
                <Badge className="rounded-full bg-[hsl(var(--primary)/0.18)] px-3 py-1 text-caption font-caption text-[hsl(var(--primary)/0.9)] backdrop-blur-sm">
                  {space.badge}
                </Badge>
              ) : null}
              {space.joinUrl ? (
                <a
                  className="text-caption font-caption text-[hsl(var(--primary))] underline-offset-4 hover:underline"
                  href={space.joinUrl}
                >
                  {linkLabel}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export function ProfileSpacesPanel({ explore, mine, size = "default", className, ...props }: ProfileSpacesPanelProps) {
  return (
    <section
      className={cn(
        brand.surface.bento(),
        "flex flex-col gap-6 p-6 sm:p-7",
        className
      )}
      {...props}
    >
      <header className="space-y-2">
        <h2 className="text-h4 font-h4 text-foreground">Spaces</h2>
        <p className="text-body-sm font-body-sm text-muted-foreground/80">
          Explore new coordination hubs and hop back into your active teams.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section
          title="Explore"
          helper="Curated labs tuned to your interests"
          emptyMessage="No recommendations yet — complete your profile to unlock Hive suggestions."
          items={explore}
          linkLabel="View space"
          size={size}
        />
        <Section
          title="My Spaces"
          helper="Your active coordination hubs"
          emptyMessage="Join a space to start coordinating with your campus peers."
          items={mine}
          linkLabel="Open space"
          size={size}
        />
      </div>
    </section>
  );
}
