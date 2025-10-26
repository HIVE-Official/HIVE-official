"use client";

// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes } from "react";
import { Sparkles, PlusCircle } from "lucide-react";
import { BaseWidget } from "@/organisms/spaces/widgets/base-widget";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";

export interface ToolShelfItem {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly status?: "active" | "paused";
  readonly highlight?: string;
  readonly onSelect?: () => void;
}

export interface ToolShelfWidgetProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly ToolShelfItem[];
  readonly onAddTool?: () => void;
  readonly emptyStateLabel?: string;
}

const statusStyles: Record<NonNullable<ToolShelfItem["status"]>, string> = {
  active: "text-gold-contrast border-gold-role/32 bg-gold-soft",
  paused: "text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.25)] bg-[hsl(var(--warning)/0.08)]",
};

export function ToolShelfWidget({ items, onAddTool, emptyStateLabel = "Install a tool to automate your rituals.", className, ...props }: ToolShelfWidgetProps) {
  return (
    <BaseWidget
      title="TOOLS"
      headerHint="Installed in this space"
      icon={<Sparkles className="h-4 w-4" aria-hidden />}
      accent="neutral"
      backgroundLabel="TOOLS"
      action={onAddTool ? { label: "Add", onClick: onAddTool } : undefined}
      className={cn("border-[hsl(var(--border)/0.35)]", className)}
      {...props}
    >
      <div className="space-y-3">
        {items.length === 0 ? (
          <EmptyState onAddTool={onAddTool} label={emptyStateLabel} />
        ) : (
          <>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => item.onSelect?.()}
                    className={cn(
                      "w-full rounded-2xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.82)] px-4 py-3 text-left transition",
                      "hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--background)/0.9)]"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-body font-semibold text-foreground">{item.name}</h4>
                        {item.description ? (
                          <p className="text-body-xs font-body-xs text-muted-foreground/80">{item.description}</p>
                        ) : null}
                      </div>
                      {item.status ? (
                        <Badge className={cn("rounded-full border px-2.5 py-0.5 text-caption font-caption uppercase tracking-[0.18em]", statusStyles[item.status])}>
                          {item.status === "active" ? "Active" : "Paused"}
                        </Badge>
                      ) : null}
                    </div>
                    {item.highlight ? (
                      <p className="mt-2 text-body-xs font-body-xs text-gold-contrast">{item.highlight}</p>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>

            {onAddTool ? (
              <Button
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddTool();
                }}
                className="gap-2 text-gold-contrast hover:bg-gold-soft"
              >
                <PlusCircle className="h-4 w-4" aria-hidden />
                Add another tool
              </Button>
            ) : null}
          </>
        )}
      </div>
    </BaseWidget>
  );
}

interface EmptyStateProps {
  readonly label: string;
  readonly onAddTool?: () => void;
}

function EmptyState({ label, onAddTool }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gold-role/25 bg-gold-soft px-6 py-8 text-center">
      <Sparkles className="h-8 w-8 text-[hsl(var(--gold)/0.78)]" aria-hidden />
      <p className="text-body-sm font-body-sm text-muted-foreground/85">{label}</p>
      {onAddTool ? (
        <Button
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            onAddTool();
          }}
          variant="gold"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" aria-hidden />
          Add a tool
        </Button>
      ) : null}
    </div>
  );
}
