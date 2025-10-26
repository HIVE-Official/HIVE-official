// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { cn } from "@/utils/cn";

export type ProfileVisibility = "public" | "campus" | "connections";

export interface ProfilePrivacyBannerProps extends HTMLAttributes<HTMLDivElement> {
  readonly visibility: ProfileVisibility;
  readonly ghostMode?: boolean;
  readonly onChange?: (visibility: ProfileVisibility) => void;
}

const visibilityCopy: Record<ProfileVisibility, { title: string; description: string; glow: string }> = {
  public: {
    title: "Visible to anyone with your profile link",
    description: "Great for campus ambassadors, builders, and public coordination moments.",
    glow: "bg-[hsl(var(--primary)/0.35)]"
  },
  campus: {
    title: "Visible to verified HIVE members on your campus",
    description: "Recommended default — keeps coordination inside the trusted campus network.",
    glow: "bg-[hsl(var(--accent)/0.25)]"
  },
  connections: {
    title: "Visible only to accepted connections",
    description: "Best for focused collaboration or when you’re coordinating quietly.",
    glow: "bg-[hsl(var(--success)/0.25)]"
  }
};

export function ProfilePrivacyBanner({ visibility, ghostMode = false, className, children, ...props }: ProfilePrivacyBannerProps) {
  const copy = visibilityCopy[visibility];

  return (
    <section
      className={cn(
        brand.surface.bento(),
        "relative flex flex-col gap-4 overflow-hidden p-4 sm:p-5",
        className
      )}
      {...props}
    >
      <span className={cn("pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full blur-2xl", copy.glow)} aria-hidden />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary)/0.95)] backdrop-blur">
              Privacy
            </Badge>
            <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] px-3 py-1 text-caption font-caption text-muted-foreground/80">
              {visibility === "public" ? "Public" : visibility === "campus" ? "Campus" : "Connections-only"}
            </Badge>
            {ghostMode ? (
              <Badge variant="soft" className="rounded-full bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary)/0.85)]">
                Ghost mode on
              </Badge>
            ) : null}
          </div>
          <h3 className="text-body-sm font-body text-foreground">{copy.title}</h3>
          <p className="max-w-xl text-caption font-caption text-muted-foreground/75">{copy.description}</p>
        </div>
        {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
      </div>
    </section>
  );
}
