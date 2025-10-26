"use client";
// Bounded Context Owner: Community Guild
import * as React from "react";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";

export interface SpaceDiscoveryCardProps {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly category: string;
  readonly memberCount: number;
  readonly eventsThisWeek?: number;
  readonly accentEmoji?: string;
  readonly accentPattern?: string;
  readonly accentColor?: string;
  readonly isVerified?: boolean;
  readonly momentumLabel?: string;
  readonly updatedAtLabel?: string;
  readonly helpers?: ReadonlyArray<string>;
  readonly saved?: boolean;
  readonly className?: string;
  readonly onJoin?: (spaceId: string) => void;
  readonly onPreview?: (spaceId: string) => void;
  readonly onSave?: (spaceId: string, saved: boolean) => void;
}

const metricFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});

export const SpaceDiscoveryCard = React.forwardRef<HTMLDivElement, SpaceDiscoveryCardProps>(
  (
    {
      id,
      name,
      tagline,
      category,
      memberCount,
      eventsThisWeek,
      accentEmoji = "✨",
      accentPattern,
      accentColor = "hsl(var(--primary))",
      isVerified,
      momentumLabel,
      updatedAtLabel,
      helpers,
      saved,
      className,
      onJoin,
      onPreview,
      onSave
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-[0_10px_40px_-25px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.55)] focus-within:border-primary",
          className
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background: accentPattern ?? `radial-gradient(circle at top left, ${accentColor}22, transparent 55%)`
          }}
        />
        <div className="relative flex flex-col gap-6 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-xl">
                {accentEmoji}
              </span>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                  {category}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                  {isVerified && (
                    <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tagline}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {momentumLabel}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-3 text-xs",
                  saved ? "bg-primary/10 text-primary" : "hover:bg-primary/10"
                )}
                onClick={() => onSave?.(id, !saved)}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Members</dt>
              <dd className="text-base font-semibold">
                {metricFormatter.format(memberCount)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Events this week</dt>
              <dd className="text-base font-semibold">
                {eventsThisWeek ? metricFormatter.format(eventsThisWeek) : "—"}
              </dd>
            </div>
            {helpers && helpers.length > 0 && (
              <div className="col-span-2 flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Helper leads:</span>
                {helpers.map((helper) => (
                  <span
                    key={helper}
                    className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    {helper}
                  </span>
                ))}
              </div>
            )}
          </dl>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3">
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>{updatedAtLabel ?? "Updated moments ago"}</span>
              <span className="text-foreground font-medium">
                {eventsThisWeek && eventsThisWeek > 0 ? "Momentum rising" : "Early joiners welcome"}
              </span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => onPreview?.(id)}>
                Preview
              </Button>
              <Button size="sm" onClick={() => onJoin?.(id)}>
                Join →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SpaceDiscoveryCard.displayName = "SpaceDiscoveryCard";
