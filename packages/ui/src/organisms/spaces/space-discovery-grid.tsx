"use client";
// Bounded Context Owner: Community Guild
import * as React from "react";
import { Button } from "@/atoms/button";
import { Input } from "@/atoms/input";
import { cn } from "@/utils/cn";
import type { SpaceDiscoveryCardProps } from "./space-discovery-card";
import { SpaceDiscoveryCard } from "./space-discovery-card";

export interface SpaceDiscoveryFilter {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly metricLabel?: string;
}

export interface SpaceDiscoveryGridProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly filters: ReadonlyArray<SpaceDiscoveryFilter>;
  readonly activeFilterId: string;
  readonly spaces: ReadonlyArray<SpaceDiscoveryCardProps>;
  readonly query?: string;
  readonly onQueryChange?: (value: string) => void;
  readonly onFilterChange?: (filterId: string) => void;
  readonly onJoin?: SpaceDiscoveryCardProps["onJoin"];
  readonly onPreview?: SpaceDiscoveryCardProps["onPreview"];
  readonly onSave?: SpaceDiscoveryCardProps["onSave"];
  readonly layout?: "grid" | "list";
  readonly className?: string;
}

export const SpaceDiscoveryGrid: React.FC<SpaceDiscoveryGridProps> = ({
  title = "Spaces for your campus",
  subtitle = "Jump into the teams, orgs, and halls shaping campus this week.",
  filters,
  activeFilterId,
  spaces,
  query,
  onQueryChange,
  onFilterChange,
  onJoin,
  onPreview,
  onSave,
  layout = "grid",
  className
}) => {
  return (
    <div className={cn("mx-auto flex w-full flex-col gap-8 px-4 py-10 md:flex-row md:px-10", className)}>
      <aside className="md:sticky md:top-12 md:h-fit md:w-[280px] md:flex-shrink-0">
        <div className="flex flex-col gap-5 rounded-3xl border border-border/80 bg-background/80 p-6 shadow-[0_12px_45px_-30px_rgba(15,23,42,0.35)]">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <Input
            type="search"
            placeholder="Search spaces…"
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            className="rounded-full border-border bg-background/60"
          />
          <div className="flex flex-col gap-2 pt-2">
            {filters.map((filter) => {
              const isActive = filter.id === activeFilterId;
              return (
                <Button
                  key={filter.id}
                  type="button"
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_12px_30px_-20px_rgba(59,130,246,0.75)]"
                      : "text-foreground hover:bg-primary/10"
                  )}
                  onClick={() => onFilterChange?.(filter.id)}
                >
                  <span>{filter.label}</span>
                  {filter.metricLabel && (
                    <span className={cn("text-xs", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {filter.metricLabel}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {spaces.length === 0 ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-border/70 bg-background/80 p-12 text-center shadow-inner">
            <div className="text-3xl">🛰️</div>
            <p className="mt-4 text-lg font-semibold text-foreground">No spaces match this filter yet</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Try a different category or request a new space—we’ll prioritize launches where students are waiting.
            </p>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-6",
              layout === "grid" ? "sm:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"
            )}
          >
            {spaces.map((space) => (
              <SpaceDiscoveryCard
                key={space.id}
                {...space}
                onJoin={onJoin}
                onPreview={onPreview}
                onSave={onSave}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
