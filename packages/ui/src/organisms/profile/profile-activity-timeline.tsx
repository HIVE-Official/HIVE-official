// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { cn } from "@/utils/cn";

export type ActivityType = "space_joined" | "badge_earned" | "tool_published" | "connection_made" | "custom";

export interface ProfileActivityItem {
  readonly id: string;
  readonly type: ActivityType;
  readonly occurredAt: string;
  readonly description: string;
  readonly metadata?: string;
}

export interface ProfileActivityTimelineProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly ProfileActivityItem[];
}

const typeBadge: Record<ActivityType, { label: string; badgeClass: string; glow: string }> = {
  space_joined: {
    label: "Space",
    badgeClass: "border-[hsl(var(--primary)/0.38)] bg-[hsl(var(--primary)/0.16)] text-[hsl(var(--primary)/0.95)]",
    glow: "bg-[hsl(var(--primary)/0.28)]"
  },
  badge_earned: {
    label: "Badge",
    badgeClass: "border-[hsl(var(--warning)/0.4)] bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    glow: "bg-[hsl(var(--warning)/0.28)]"
  },
  tool_published: {
    label: "Tool",
    badgeClass: "border-[hsl(var(--accent)/0.45)] bg-[hsl(var(--accent)/0.22)] text-[hsl(var(--accent-foreground))]",
    glow: "bg-[hsl(var(--accent)/0.28)]"
  },
  connection_made: {
    label: "Connection",
    badgeClass: "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.18)] text-[hsl(var(--success))]",
    glow: "bg-[hsl(var(--success)/0.28)]"
  },
  custom: {
    label: "Update",
    badgeClass: "border-[hsl(var(--info)/0.4)] bg-[hsl(var(--info)/0.18)] text-[hsl(var(--info))]",
    glow: "bg-[hsl(var(--info)/0.3)]"
  }
};

export function ProfileActivityTimeline({ items, className, ...props }: ProfileActivityTimelineProps) {
  const isEmpty = items.length === 0;

  return (
    <div
      className={cn(
        brand.surface.bento(),
        "relative overflow-hidden p-6 sm:p-7",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-9 top-8 bottom-8 w-px bg-gradient-to-b from-[hsl(var(--primary)/0.45)] via-white/10 to-transparent" aria-hidden="true" />
      {isEmpty ? (
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-5 text-body-sm font-body-sm text-muted-foreground/80 backdrop-blur">
          Activity will appear here once the profile starts coordinating.
        </div>
      ) : (
        <ul className="space-y-5">
          {items.map((item, index) => {
            const badgeMeta = typeBadge[item.type];
            return (
              <li key={item.id} className="relative pl-16">
                <span className="pointer-events-none absolute left-6 top-2 h-3 w-3 rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--primary)/0.42)] shadow-[0_0_12px_rgba(255,215,0,0.4)]" aria-hidden="true" />
                <span
                  className={cn(
                    "pointer-events-none absolute -left-6 top-4 h-24 w-24 rounded-full blur-3xl",
                    badgeMeta.glow
                  )}
                  aria-hidden="true"
                />
                <div className="rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.72)] p-4 backdrop-blur transition hover:border-[hsl(var(--primary)/0.45)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-body font-body text-foreground">{item.description}</p>
                    <Badge variant="outline" className={cn("rounded-full px-3 py-0.5 text-caption font-caption backdrop-blur-sm", badgeMeta.badgeClass)}>
                      {badgeMeta.label}
                    </Badge>
                    <span className="ml-auto text-caption font-caption text-muted-foreground/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-caption font-caption text-muted-foreground/80">{item.occurredAt}</p>
                  {item.metadata ? (
                    <p className="mt-3 text-body-sm font-body-sm text-muted-foreground/80">{item.metadata}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
