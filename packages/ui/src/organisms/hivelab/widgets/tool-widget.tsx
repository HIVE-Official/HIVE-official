"use client";

// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes } from "react";
import { Sparkles, Clock, Calendar as CalendarIcon, Pencil } from "lucide-react";
import { BaseWidget } from "@/organisms/spaces/widgets/base-widget";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";

export type ToolWidgetStatus = "active" | "paused";

export interface ToolWidgetProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  readonly toolName: string;
  readonly tagline?: string;
  readonly status?: ToolWidgetStatus;
  readonly lastRunLabel?: string;
  readonly nextRunLabel?: string;
  readonly highlight?: string;
  readonly composerLabel?: string;
  readonly onOpen?: () => void;
  readonly onConfigure?: () => void;
}

const statusStyles: Record<ToolWidgetStatus, string> = {
  active: "border-gold-role/50 text-gold-contrast bg-gold-soft",
  paused: "border-[hsl(var(--warning)/0.31)] text-[hsl(var(--warning))] bg-[hsl(var(--warning)/0.1)]",
};

export function ToolWidget({
  toolName,
  tagline,
  status = "active",
  lastRunLabel,
  nextRunLabel,
  highlight,
  composerLabel,
  onOpen,
  onConfigure,
  className,
  ...props
}: ToolWidgetProps) {
  return (
    <BaseWidget
      title="TOOL"
      headerHint="HiveLab"
      accent="primary"
      icon={<Sparkles className="h-4 w-4" aria-hidden />}
      action={onOpen ? { label: "Open", onClick: onOpen } : undefined}
      className={cn("border-[hsl(var(--primary)/0.25)]", className)}
      {...props}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge className={cn("rounded-full border px-3 py-1 text-caption font-caption uppercase tracking-[0.22em]", statusStyles[status])}>
              {status === "active" ? "Active" : "Paused"}
            </Badge>
            {composerLabel ? (
              <span className="rounded-full border border-gold-role/32 bg-gold-soft px-2 py-0.5 text-[11px] font-medium text-gold-contrast">
                {composerLabel}
              </span>
            ) : null}
          </div>
          <div>
            <h4 className="text-h4 font-h4 text-foreground">{toolName}</h4>
            {tagline ? <p className="text-body-sm font-body-sm text-muted-foreground/85">{tagline}</p> : null}
          </div>
        </div>

        {highlight ? (
          <div className="rounded-xl border border-gold-role/32 bg-gold-soft px-3 py-2 text-body-sm font-body-sm text-gold-contrast">
            {highlight}
          </div>
        ) : null}

        <div className="grid gap-2 md:grid-cols-2">
          {lastRunLabel ? (
            <MetaRow icon={<Clock className="h-3.5 w-3.5" aria-hidden />} label="Last run" value={lastRunLabel} />
          ) : null}
          {nextRunLabel ? (
            <MetaRow icon={<CalendarIcon className="h-3.5 w-3.5" aria-hidden />} label="Next run" value={nextRunLabel} />
          ) : null}
        </div>

        {onConfigure ? (
          <Button
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onConfigure();
            }}
            className="gap-2 self-start border-gold-role/40 text-gold-contrast hover:bg-gold-soft"
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Adjust settings
          </Button>
        ) : null}
      </div>
    </BaseWidget>
  );
}

interface MetaRowProps {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly value: string;
}

function MetaRow({ icon, label, value }: MetaRowProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.72)] px-3 py-2">
      <span className="text-primary/80">{icon}</span>
      <div className="flex flex-col">
        <span className="text-caption font-caption uppercase tracking-[0.2em] text-muted-foreground/70">{label}</span>
        <span className="text-body-sm font-body-sm text-foreground">{value}</span>
      </div>
    </div>
  );
}
