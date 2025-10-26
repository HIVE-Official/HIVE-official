import React from "react";
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";
import { Loader2, ChevronRight } from "lucide-react";

type WidgetAccent = "neutral" | "primary" | "success" | "warning" | "muted";

const accentStyles: Record<WidgetAccent, string> = {
  neutral:
    "border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.78)] backdrop-blur-sm shadow-[0_14px_32px_rgba(15,23,42,0.18)]",
  primary:
    "border border-[hsl(var(--primary)/0.35)] bg-gradient-to-br from-[hsl(var(--primary)/0.12)] via-[hsl(var(--background)/0.9)] to-[hsl(var(--primary)/0.02)] backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.28)]",
  success:
    "border border-[hsl(var(--success)/0.3)] bg-gradient-to-br from-[hsl(var(--success)/0.12)] via-[hsl(var(--background)/0.85)] to-[hsl(var(--success)/0.02)] backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.24)]",
  warning:
    "border border-[hsl(var(--warning)/0.28)] bg-gradient-to-br from-[hsl(var(--warning)/0.14)] via-[hsl(var(--background)/0.9)] to-[hsl(var(--warning)/0.05)] backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.24)]",
  muted:
    "border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.74)] backdrop-blur-sm shadow-[0_12px_24px_rgba(15,23,42,0.16)]",
};

export interface BaseWidgetAction {
  label: string;
  onClick: () => void;
}

export interface BaseWidgetProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  action?: BaseWidgetAction;
  accent?: WidgetAccent;
  backgroundLabel?: string;
  headerHint?: string;
}

/**
 * Base widget chrome for Spaces.
 *
 * Brings the same bento treatment used on Profile organisms into Spaces so
 * widgets read as compact, clickable surfaces even with limited real estate.
 * - Optional accent gradients
 * - Background label watermark
 * - Focus + hover affordances for entire tile
 */
export const BaseWidget = React.forwardRef<HTMLDivElement, BaseWidgetProps>(
  (
    {
      title,
      icon,
      children,
      className,
      loading,
      action,
      accent = "neutral",
      backgroundLabel,
      headerHint,
      ...rest
    },
    ref
  ) => {
    const interactive = typeof rest.onClick === "function";

    return (
      <div
        ref={ref}
        className={cn(
          brand.surface.bento(),
          "group relative isolate overflow-hidden p-5 sm:p-6 transition-all duration-300",
          interactive && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          loading && "pointer-events-none opacity-70",
          accentStyles[accent],
          className
        )}
        data-widget-accent={accent}
        {...rest}
      >
        {backgroundLabel ? (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-4 top-10 text-[46px] font-black uppercase tracking-[0.45em]",
              "text-[hsl(var(--primary)/0.06)] mix-blend-soft-light opacity-80",
              "sm:right-6 sm:top-12 sm:text-[64px]"
            )}
          >
            {backgroundLabel}
          </span>
        ) : null}

        <header className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {icon ? <span className="text-primary/90">{icon}</span> : null}
            <div className="flex flex-col">
              <h3 className="text-caption font-semibold tracking-[0.18em] text-primary">
                {title}
              </h3>
              {headerHint ? (
                <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/60">
                  {headerHint}
                </span>
              ) : null}
            </div>
          </div>
          {action ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                action.onClick();
              }}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border)/0.25)]",
                "bg-[hsl(var(--background)/0.6)] px-3 py-1 text-caption font-semibold text-muted-foreground/80",
                "transition-colors hover:border-[hsl(var(--primary)/0.35)] hover:text-foreground"
              )}
            >
              <span>{action.label}</span>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </button>
          ) : null}
        </header>

        <div className="relative z-10 mt-5">
          {loading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span className="sr-only">Loading</span>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
);

BaseWidget.displayName = "BaseWidget";

/**
 * Widget Skeleton for loading states
 */
export const WidgetSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted/20 animate-pulse rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};




