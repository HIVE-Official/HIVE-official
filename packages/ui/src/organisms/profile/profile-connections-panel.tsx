// Bounded Context Owner: Identity & Access Management Guild
import type { HTMLAttributes } from "react";
import { brand } from "@/brand/classnames";
import { Badge } from "@/atoms/badge";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

export interface ProfileConnectionCard {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
  readonly mutualSpaces: number;
  readonly mutualConnections: number;
  readonly lastActive: string;
  readonly avatarUrl?: string;
}

export interface ProfileConnectionsPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly connections: readonly ProfileConnectionCard[];
  readonly title?: string;
  readonly helper?: string;
  readonly size?: "default" | "compact";
}

export function ProfileConnectionsPanel({
  connections,
  title = "Connections",
  helper = "Trusted peers powering coordination",
  size = "default",
  className,
  ...props
}: ProfileConnectionsPanelProps) {
  const isCompact = size === "compact";
  const peekCount = isCompact ? 3 : 4;
  const items = connections.slice(0, peekCount);
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
        <h2 className="text-h4 font-h4 text-foreground">{title}</h2>
        <p className="text-body-sm font-body-sm text-muted-foreground/80">{helper}</p>
      </header>

      {empty ? (
        <div className="rounded-2xl border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] p-5 text-body-sm font-body-sm text-muted-foreground/80 backdrop-blur">
          You haven’t connected with anyone yet. Join a campus space or publish a tool to start building your network.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((connection, index) => (
            <article
              key={connection.id}
              className={cn(
                brand.surface.bento({ preview: Boolean(connection.avatarUrl) }),
                motionClass("ambient"),
                "group relative flex items-start gap-4 p-4 transition hover:border-[hsl(var(--primary)/0.45)]"
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[hsl(var(--border)/0.35)] bg-gradient-to-br from-[hsl(var(--background)/0.6)] via-[hsl(var(--primary)/0.08)] to-[hsl(var(--background)/0.85)] text-body font-body text-foreground shadow-[0_12px_24px_rgba(0,0,0,0.45)]">
                {connection.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Storybook-only component
                  <img src={connection.avatarUrl} alt={connection.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-caption font-caption uppercase tracking-[0.3em] text-muted-foreground/70">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="space-y-1">
                  <p className="text-body font-body text-foreground">{connection.name}</p>
                  <p className="text-caption font-caption text-muted-foreground/75">{connection.handle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                    {connection.mutualSpaces} mutual spaces
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] text-caption font-caption text-muted-foreground/80">
                    {connection.mutualConnections} mutual connections
                  </Badge>
                </div>
                <p className="text-caption font-caption text-muted-foreground/70">Active {connection.lastActive}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
