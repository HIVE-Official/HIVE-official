// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

export interface ProfileRecommendation {
  readonly id: string;
  readonly name: string;
  readonly reason: string;
  readonly joinUrl?: string;
  readonly memberCount?: number;
  readonly signal?: "interest_match" | "mutual_connection" | "trending";
  readonly previewImage?: string;
  readonly previewAlt?: string;
}

export interface ProfileRecommendationsPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly recommendations: readonly ProfileRecommendation[];
  readonly size?: "default" | "compact";
}

const signalBadge: Record<
  NonNullable<ProfileRecommendation["signal"]>,
  { label: string; className: string; glow: string }
> = {
  interest_match: {
    label: "Interest match",
    className: "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.18)] text-[hsl(var(--success))]",
    glow: "bg-[hsl(var(--success)/0.28)]"
  },
  mutual_connection: {
    label: "Mutual connection",
    className: "border-[hsl(var(--primary)/0.38)] bg-[hsl(var(--primary)/0.16)] text-[hsl(var(--primary)/0.95)]",
    glow: "bg-[hsl(var(--primary)/0.25)]"
  },
  trending: {
    label: "Trending",
    className: "border-[hsl(var(--warning)/0.4)] bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    glow: "bg-[hsl(var(--warning)/0.26)]"
  }
};

const signalAccent: Record<NonNullable<ProfileRecommendation["signal"]>, "emerald" | "gold" | "crimson"> = {
  interest_match: "emerald",
  mutual_connection: "gold",
  trending: "crimson"
};

export function ProfileRecommendationsPanel({
  recommendations,
  size = "default",
  className,
  ...props
}: ProfileRecommendationsPanelProps) {
  const isCompact = size === "compact";
  const peekCount = isCompact ? 2 : 3;
  const items = recommendations.slice(0, peekCount);
  const empty = items.length === 0;

  return (
    <section
      className={cn(
        brand.surface.bento(),
        "flex flex-col gap-5 p-6 sm:p-7",
        className
      )}
      {...props}
    >
      <header className="space-y-2">
        <h2 className="text-h4 font-h4 text-foreground">Spaces to explore</h2>
        <p className="text-body-sm font-body-sm text-muted-foreground/80">
          Hand-picked coordinates aligned with this profile’s interests.
        </p>
      </header>

      {empty ? (
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-5 text-body-sm font-body-sm text-muted-foreground/80 backdrop-blur">
          No recommendations yet. Complete the profile to unlock personalized suggestions.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((recommendation, index) => {
            const signal = recommendation.signal ? signalBadge[recommendation.signal] : undefined;
            const tone = recommendation.signal ? signalAccent[recommendation.signal] : "slate";

            return (
              <article
                key={`${recommendation.id}-${index}`}
                className={cn(
                  brand.surface.bento({ accent: tone, preview: Boolean(recommendation.previewImage) }),
                  motionClass("ambient"),
                  "group relative flex flex-col gap-3 p-4 transition hover:border-[hsl(var(--primary)/0.45)]"
                )}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {signal ? (
                  <span className={cn("pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl", signal.glow)} aria-hidden />
                ) : null}
                {recommendation.previewImage ? (
                  <div className="bento-card__preview">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Storybook-only component */}
                    <img src={recommendation.previewImage} alt={recommendation.previewAlt ?? `${recommendation.name} preview`} />
                    <span className="bento-card__preview-label">Preview</span>
                  </div>
                ) : null}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-body font-body text-foreground">{recommendation.name}</p>
                    <p className="text-caption font-caption text-muted-foreground/80">{recommendation.reason}</p>
                  </div>
                  {recommendation.memberCount ? (
                    <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                      {recommendation.memberCount.toLocaleString()} members
                    </Badge>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {signal ? (
                    <Badge className={cn("rounded-full px-3 py-1 text-caption font-caption backdrop-blur-sm", signal.className)}>
                      {signal.label}
                    </Badge>
                  ) : null}
                  {recommendation.joinUrl ? (
                    <a
                      className="text-caption font-caption text-[hsl(var(--primary))] underline-offset-4 hover:underline"
                      href={recommendation.joinUrl}
                    >
                      View space
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
