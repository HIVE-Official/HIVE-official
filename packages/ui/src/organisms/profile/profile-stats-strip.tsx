// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

export interface ProfileStat {
  readonly label: string;
  readonly value: string;
  readonly helperText?: string;
  readonly accent?: "default" | "success" | "warning" | "danger";
}

export interface ProfileStatsStripProps extends HTMLAttributes<HTMLDivElement> {
  readonly stats: readonly ProfileStat[];
  readonly size?: "default" | "compact";
}

const accentStyles: Record<
  NonNullable<ProfileStat["accent"]>,
  { value: string; pill: string; glow: string }
> = {
  default: {
    value: "text-[hsl(var(--primary))]",
    pill: "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary)/0.95)]",
    glow: "bg-[hsl(var(--primary)/0.25)]"
  },
  success: {
    value: "text-[hsl(var(--success))]",
    pill: "bg-[hsl(var(--success)/0.18)] text-[hsl(var(--success))]",
    glow: "bg-[hsl(var(--success)/0.24)]"
  },
  warning: {
    value: "text-[hsl(var(--warning))]",
    pill: "bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    glow: "bg-[hsl(var(--warning)/0.26)]"
  },
  danger: {
    value: "text-[hsl(var(--destructive))]",
    pill: "bg-[hsl(var(--destructive)/0.18)] text-[hsl(var(--destructive))]",
    glow: "bg-[hsl(var(--destructive)/0.25)]"
  }
};

export function ProfileStatsStrip({ stats, className, size = "default", ...props }: ProfileStatsStripProps) {
  const isCompact = size === "compact";
  const columns = isCompact ? "sm:grid-cols-2 xl:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-4";

  return (
    <section className={cn("space-y-4", className)} {...props}>
      <div className={cn("grid gap-3", columns)}>
        {stats.map((stat, index) => {
          const accent = accentStyles[stat.accent ?? "default"];
          return (
            <article
              key={stat.label}
              className={cn(
                brand.surface.bento(),
                motionClass("ambient"),
                "relative isolate overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1",
                isCompact && "p-4"
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className={cn("pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full blur-3xl", accent.glow)} aria-hidden />
              <div className="relative space-y-2">
                <p className={cn("uppercase text-muted-foreground/70", isCompact ? "text-caption font-caption" : "text-label font-label")}>
                  {stat.label}
                </p>
                <p className={cn(isCompact ? "text-h3 font-h3" : "text-h2 font-h2", accent.value)}>{stat.value}</p>
                {stat.helperText ? (
                  <p className={cn("text-muted-foreground/80", isCompact ? "text-caption font-caption" : "text-body-sm font-body-sm")}>
                    {stat.helperText}
                  </p>
                ) : null}
                <span className={cn("inline-flex rounded-full px-3 py-1 text-caption font-caption", accent.pill)}>
                  {stat.label.toLowerCase().includes("completion") ? "Focus" : "Momentum"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
