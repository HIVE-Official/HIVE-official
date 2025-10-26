"use client";
// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Eye,
  Rocket,
  ShieldCheck,
  Share2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { Separator } from "@/atoms/separator";
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import type { HiveLabToolStatus, HiveLabToolVisibility } from "./types";

export interface ToolHeaderBreadcrumb {
  readonly label: string;
  readonly href?: string;
}

export interface ToolHeaderStat {
  readonly label: string;
  readonly value: string;
  readonly hint?: string;
}

export interface ToolHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  readonly breadcrumbs?: readonly ToolHeaderBreadcrumb[];
  readonly name: string;
  readonly status: HiveLabToolStatus;
  readonly visibility: HiveLabToolVisibility;
  readonly dirty?: boolean;
  readonly lastEdited?: { readonly by: string; readonly at?: Date | string };
  readonly stats?: readonly ToolHeaderStat[];
  readonly saving?: boolean;
  readonly description?: string;
  readonly warnings?: readonly string[];
  readonly onShare?: () => void;
  readonly toolLogoUrl?: string;
  readonly toolLogoAlt?: string;
  readonly onGenerateLogo?: () => void;
  readonly onBack?: () => void;
  readonly onPreview?: () => void;
  readonly onSave?: () => void;
  readonly onPublish?: () => void;
  readonly variant?: "default" | "condensed";
  readonly showInlineActions?: boolean;
}

const statusBadge: Record<
  HiveLabToolStatus,
  { readonly label: string; readonly className: string }
> = {
  live: { label: "Live", className: "border-success/40 bg-success/15 text-success" },
  draft: { label: "Draft", className: "border-warning/35 bg-warning/15 text-warning" },
  paused: { label: "Paused", className: "border-muted/40 bg-muted/20 text-muted-foreground" },
  archived: { label: "Archived", className: "border-muted/40 bg-muted/10 text-muted-foreground/80" },
  "needs-review": { label: "Needs Review", className: "border-destructive/40 bg-destructive/15 text-destructive" },
};

const visibilityBadge: Record<HiveLabToolVisibility, { readonly label: string; readonly className: string }> = {
  draft: { label: "Draft only", className: "border-muted/35 bg-muted/10 text-muted-foreground" },
  campus: { label: "Campus leaders", className: "border-primary/40 bg-primary/12 text-primary" },
  community: { label: "Shared broadly", className: "border-emerald-400/30 bg-emerald-100/20 text-emerald-500" },
  private: { label: "Private", className: "border-muted/35 bg-muted/8 text-muted-foreground" },
};

const STAT_TONES = {
  highlight: {
    container: "border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)]",
    value: "text-[hsl(var(--primary))]",
  },
  neutral: {
    container: "border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.8)]",
    value: "text-foreground",
  },
};

const formatLastEdited = (lastEdited?: ToolHeaderProps["lastEdited"]) => {
  if (!lastEdited) {
    return "Draft saved";
  }
  const { by, at } = lastEdited;
  const relative = at instanceof Date ? formatDistanceToNow(at, { addSuffix: true }) : at;
  return `Last edited ${relative ?? "recently"} ${by ? `• ${by}` : ""}`;
};

export const ToolHeader = forwardRef<HTMLDivElement, ToolHeaderProps>(
  (
    {
      breadcrumbs = [],
      name,
      status,
      visibility,
      dirty = false,
      lastEdited,
      stats = [],
      saving = false,
      description,
      warnings = [],
      onShare,
      toolLogoUrl,
      toolLogoAlt = "",
      onGenerateLogo,
      onBack,
      onPreview,
      onSave,
      onPublish,
      variant = "default",
      showInlineActions,
      className,
      ...props
    },
    ref
  ) => {
    const statusConfig = statusBadge[status];
    const visibilityConfig = visibilityBadge[visibility];
    const [showAllStats, setShowAllStats] = useState(false);
    const saveStateMessage = saving ? "Saving…" : dirty ? "Unsaved changes" : formatLastEdited(lastEdited);
    const isCondensed = variant === "condensed";
    const inlineActions = showInlineActions ?? !isCondensed;
    const [showWarnings, setShowWarnings] = useState(false);
    const primaryStats = stats.slice(0, 2);
    const remainingStats = stats.slice(2);
    const audienceLabel =
      visibility === "draft"
        ? "Private preview"
        : visibility === "campus"
        ? "Visible to campus leaders"
        : visibility === "community"
        ? "Visible to approved spaces"
        : "Private";
    const condensedStats = stats.slice(0, 3);
    const condensedExtraStats = stats.slice(3);
    const warningsCount = warnings.length;
    const contextLine = [audienceLabel, description].filter(Boolean).join(" • ");

    if (isCondensed) {
      return (
        <header
          ref={ref}
          className={cn(brand.surface.bento(), "rounded-3xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.96)] p-5 shadow-md", className)}
          {...props}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-caption font-caption uppercase tracking-[0.16em] text-muted-foreground/60">
                  <Badge variant="outline" className="border-border/30 bg-background/80 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    HiveLab Builder
                  </Badge>
                  {onBack ? (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl border border-[hsl(var(--border)/0.35)] bg-transparent" onClick={onBack} aria-label="Back to HiveLab">
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                    </Button>
                  ) : null}
                  {breadcrumbs.length > 0 ? (
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
                      {breadcrumbs.map((crumb, index) => (
                        <span key={crumb.label} className="flex items-center gap-2">
                          <a
                            href={crumb.href}
                            className="rounded-full border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.7)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70 transition hover:border-primary/40 hover:text-foreground"
                          >
                            {crumb.label}
                          </a>
                          {index < breadcrumbs.length - 1 ? <span className="text-muted-foreground/40">/</span> : null}
                        </span>
                      ))}
                    </nav>
                  ) : (
                    <span>HiveLab Builder</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {toolLogoUrl ? (
                    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)] shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element -- tooling logo preview */}
                      <img src={toolLogoUrl} alt={toolLogoAlt} className="h-full w-full object-cover" />
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onGenerateLogo?.()}
                      className="h-10 w-10 rounded-xl border-dashed text-muted-foreground/70 hover:text-foreground"
                      aria-label="Generate tool logo"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden />
                    </Button>
                  )}
                  <h1 className="text-h3 font-h3 text-foreground">{name}</h1>
                  <Badge variant="outline" className={cn("border px-2.5 py-0.5 text-caption font-caption uppercase tracking-[0.18em]", statusConfig.className)}>
                    {statusConfig.label}
                  </Badge>
                  <Badge variant="outline" className={cn("border px-2.5 py-0.5 text-caption font-caption uppercase tracking-[0.18em]", visibilityConfig.className)}>
                    {visibilityConfig.label}
                  </Badge>
                </div>
                {contextLine ? (
                  <p className="text-body-sm font-body-sm text-muted-foreground/80">{contextLine}</p>
                ) : null}
                <p className="text-body-xs font-body-xs text-muted-foreground/70">
                  {saving ? (
                    <>
                      <ShieldCheck className="mr-1 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
                      Saving changes…
                    </>
                  ) : dirty ? (
                    <>
                      <ShieldCheck className="mr-1 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
                      Unsaved changes
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden />
                      {saveStateMessage}
                    </>
                  )}
                </p>
              </div>
            </div>

            {condensedStats.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {condensedStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="inline-flex items-baseline gap-2 rounded-full border border-[hsl(var(--border)/0.25)] bg-[hsl(var(--background)/0.85)] px-3 py-1 shadow-sm"
                  >
                    <span className="text-body-xs font-body-xs text-muted-foreground/70">{stat.label}</span>
                    <span className="text-body-sm font-body-sm text-foreground">{stat.value}</span>
                  </div>
                ))}
                {condensedExtraStats.length > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground/75 hover:text-foreground"
                    onClick={() => setShowAllStats((prev) => !prev)}
                  >
                    {showAllStats ? "Hide extra" : `+${condensedExtraStats.length} more`}
                  </Button>
                ) : null}
              </div>
            ) : null}

            {showAllStats && condensedExtraStats.length > 0 ? (
              <div className="grid gap-3 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.92)] p-4 sm:grid-cols-2">
                {condensedExtraStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.96)] p-3 shadow-sm">
                    <div className="text-caption font-caption uppercase tracking-[0.18em] text-muted-foreground/70">{stat.label}</div>
                    <div className="text-body-md font-body-md text-foreground">{stat.value}</div>
                    {stat.hint ? <div className="text-body-xs font-body-xs text-muted-foreground/70">{stat.hint}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}

            {warningsCount > 0 ? (
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-body-sm font-body-sm",
                  showWarnings ? "border-warning/40 bg-warning/10 text-warning" : "border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.85)] text-warning"
                )}
                onClick={() => setShowWarnings((prev) => !prev)}
              >
                <span>Needs attention ({warningsCount})</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", showWarnings ? "rotate-180" : "")} aria-hidden />
              </button>
            ) : null}

            {showWarnings && warningsCount > 0 ? (
              <div className="rounded-xl border border-warning/35 bg-warning/10 p-4 text-body-sm font-body-sm text-warning">
                <ul className="space-y-1">
                  {warnings.map((warning) => (
                    <li key={warning} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </header>
      );
    }

    return (
      <header
        ref={ref}
        className={cn(brand.surface.bento(), "relative overflow-hidden p-6", className)}
        {...props}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-body-xs font-body-xs text-muted-foreground/70">
            {onBack ? (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack} aria-label="Back to HiveLab">
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </Button>
            ) : null}
            {breadcrumbs.length > 0 ? (
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-caption font-caption uppercase tracking-[0.18em]">
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.label} className="flex items-center gap-2 text-muted-foreground/70">
                    <a
                      href={crumb.href}
                      className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.65)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] transition hover:border-primary/40 hover:text-foreground"
                    >
                      {crumb.label}
                    </a>
                    {index < breadcrumbs.length - 1 ? <Separator orientation="vertical" className="h-4" /> : null}
                  </span>
                ))}
              </nav>
            ) : (
              <span className="text-caption font-caption uppercase tracking-[0.22em] text-muted-foreground/70">HiveLab Builder</span>
            )}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {toolLogoUrl ? (
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.8)] shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element -- tooling logo preview */}
                    <img src={toolLogoUrl} alt={toolLogoAlt} className="h-full w-full object-cover" />
                  </span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateLogo?.()}
                    className="h-12 w-12 rounded-2xl border-dashed text-muted-foreground/70 hover:text-foreground"
                    aria-label="Generate tool logo"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </Button>
                )}
                <h1 className="text-h2 font-h2 text-foreground">{name}</h1>
                <Badge variant="outline" className={cn("border px-3 py-1 text-caption font-caption uppercase tracking-[0.25em]", statusConfig.className)}>
                  {statusConfig.label}
                </Badge>
                <Badge variant="outline" className={cn("border px-3 py-1 text-caption font-caption uppercase tracking-[0.25em]", visibilityConfig.className)}>
                  {visibilityConfig.label}
                </Badge>
              </div>
              <p className="text-body-xs font-body-xs uppercase tracking-[0.22em] text-muted-foreground/70">{audienceLabel}</p>
              {description ? (
                <p className="max-w-3xl text-body-sm font-body-sm text-muted-foreground/85">{description}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-caption font-caption uppercase tracking-[0.22em]",
                  saving
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : dirty
                    ? "border-warning/50 bg-warning/15 text-warning"
                    : "border-success/35 bg-success/12 text-success"
                )}
              >
                {saving ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    {saveStateMessage}
                  </>
                ) : dirty ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    {saveStateMessage}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                    {saveStateMessage}
                  </>
                )}
              </span>
              {inlineActions ? (
                <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                  {onPreview ? (
                    <Button variant="ghost" size="sm" className="min-w-[112px] gap-2" onClick={onPreview}>
                      <Eye className="h-4 w-4" aria-hidden />
                      Preview
                    </Button>
                  ) : null}
                  {onSave ? (
                    <Button variant="outline" size="sm" className="min-w-[112px] gap-2" onClick={onSave} disabled={saving}>
                      <ShieldCheck className="h-4 w-4" aria-hidden />
                      Save draft
                    </Button>
                  ) : null}
                  {onPublish ? (
                    <Button size="sm" className="min-w-[112px] gap-2" onClick={onPublish}>
                      <Rocket className="h-4 w-4" aria-hidden />
                      Publish
                    </Button>
                  ) : null}
                  {onShare && status === "live" ? (
                    <Button variant="outline" size="sm" className="min-w-[112px] gap-2" onClick={onShare}>
                      <Share2 className="h-4 w-4" aria-hidden />
                      Share
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {primaryStats.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3">
              {primaryStats.map((stat, index) => {
                const tone = index === 0 ? STAT_TONES.highlight : STAT_TONES.neutral;
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "min-w-[180px] flex-1 rounded-2xl border px-4 py-3 transition-all duration-300",
                      tone.container,
                      "hover:-translate-y-1"
                    )}
                  >
                    <div className="text-caption font-caption uppercase tracking-[0.2em] text-muted-foreground/70">
                      {stat.label}
                    </div>
                    <div className={cn("text-h4 font-h4", tone.value)}>{stat.value}</div>
                    {stat.hint ? (
                      <div className="text-body-xs font-body-xs text-muted-foreground/65">{stat.hint}</div>
                    ) : null}
                  </div>
                );
              })}
              {remainingStats.length > 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground/80 hover:text-foreground"
                  onClick={() => setShowAllStats((prev) => !prev)}
                >
                  {showAllStats ? "Hide extra details" : `More (${remainingStats.length})`}
                </Button>
              ) : null}
            </div>
          ) : null}

          {showAllStats && remainingStats.length > 0 ? (
            <div className="grid gap-3 rounded-2xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.9)] p-4 sm:grid-cols-2 lg:grid-cols-3">
              {remainingStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.96)] p-4 shadow-sm">
                  <div className="text-caption font-caption uppercase tracking-[0.2em] text-muted-foreground/75">{stat.label}</div>
                  <div className="text-body-lg font-body-lg text-foreground">{stat.value}</div>
                  {stat.hint ? <div className="text-body-xs font-body-xs text-muted-foreground/70">{stat.hint}</div> : null}
                </div>
              ))}
            </div>
          ) : null}

          {warnings.length > 0 ? (
            <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 text-body-sm font-body-sm text-warning">
              <h2 className="text-caption font-caption uppercase tracking-[0.2em] text-warning/80">Needs attention</h2>
              <ul className="mt-2 space-y-1 list-disc pl-4">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </header>
    );
  }
);

ToolHeader.displayName = "ToolHeader";
