"use client";
// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes, ReactNode } from "react";
import { Fragment, useMemo, useState } from "react";
import { Badge } from "@/atoms/badge";
import { Button } from "@/atoms/button";
import { brand } from "@/brand/classnames";
import { cn } from "@/utils/cn";

export type PropertiesPanelItemStatus = "default" | "info" | "success" | "warning" | "danger";

export interface PropertiesPanelItem {
  readonly id: string;
  readonly label: string;
  readonly value?: ReactNode;
  readonly description?: string;
  readonly tags?: readonly string[];
  readonly status?: PropertiesPanelItemStatus;
  readonly meta?: string;
  readonly control?: ReactNode;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly actionAriaLabel?: string;
}

export interface PropertiesPanelSection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly items: readonly PropertiesPanelItem[];
  readonly footer?: ReactNode;
  readonly tier?: "core" | "advanced";
}

export interface PropertiesPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly title: string;
  readonly subtitle?: string;
  readonly primaryActionLabel?: string;
  readonly onPrimaryAction?: () => void;
  readonly primaryActionDisabled?: boolean;
  readonly inlineBadges?: readonly ReactNode[];
  readonly sections: readonly PropertiesPanelSection[];
  readonly footer?: ReactNode;
  readonly defaultShowAdvanced?: boolean;
  readonly showAdvancedToggleLabel?: { readonly show: string; readonly hide: string };
}

const STATUS_CLASSNAMES: Record<PropertiesPanelItemStatus, string> = {
  default: "border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.85)]",
  info: "border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.1)]",
  success: "border-success/35 bg-success/12",
  warning: "border-warning/35 bg-warning/12",
  danger: "border-destructive/40 bg-destructive/12",
};

export function PropertiesPanel({
  title,
  subtitle,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionDisabled = false,
  inlineBadges = [],
  sections,
  footer,
  defaultShowAdvanced = false,
  showAdvancedToggleLabel,
  className,
  ...props
}: PropertiesPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(defaultShowAdvanced);
  const toggleCopy = showAdvancedToggleLabel ?? { show: "Show advanced settings", hide: "Hide advanced settings" };
  const coreSections = useMemo(() => sections.filter((section) => section.tier !== "advanced"), [sections]);
  const advancedSections = useMemo(() => sections.filter((section) => section.tier === "advanced"), [sections]);

  const renderSection = (section: PropertiesPanelSection) => (
    <section key={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="space-y-4 rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.93)] p-4 shadow-sm">
       <div className="flex flex-col gap-2">
         <div className="flex items-center justify-between gap-2">
           <h3 id={`${section.id}-title`} className="text-title-sm font-title-sm text-foreground">
             {section.title}
           </h3>
         </div>
         {section.description ? (
            <p id={`${section.id}-description`} className="text-body-xs font-body-xs text-muted-foreground/70">
              {section.description}
            </p>
          ) : null}
        </div>

        <ul className="space-y-3" aria-describedby={section.description ? `${section.id}-description` : undefined}>
          {section.items.map((item) => {
            const status = STATUS_CLASSNAMES[item.status ?? "default"];

            return (
              <li
                key={item.id}
                className={cn(
                  "rounded-2xl border px-4 py-3 transition",
                  status,
                  item.onAction ? "hover:border-[hsl(var(--primary)/0.35)]" : null
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-body-sm font-medium text-foreground">{item.label}</p>
                      {item.value ? (
                        <p className="text-body-sm font-body-sm text-muted-foreground/80">{item.value}</p>
                      ) : null}
                      {item.meta ? (
                        <p className="text-body-xs font-body-xs text-muted-foreground/70">{item.meta}</p>
                      ) : null}
                    </div>
                    {item.actionLabel ? (
                      <Button
                        variant={item.status === "warning" || item.status === "danger" ? "outline" : "ghost"}
                        size="sm"
                        onClick={item.onAction}
                        aria-label={item.actionAriaLabel ?? item.actionLabel}
                        className={cn(
                          "shrink-0",
                          item.status === "warning"
                            ? "border-warning/40 text-warning hover:text-warning"
                            : item.status === "danger"
                            ? "border-destructive/40 text-destructive hover:text-destructive"
                            : undefined
                        )}
                      >
                        {item.actionLabel}
                      </Button>
                    ) : null}
                  </div>

                  {item.tags && item.tags.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.75)] px-2 py-0.5 text-body-xs font-body-xs text-muted-foreground/75"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {item.description ? (
                    <p className="text-body-xs font-body-xs text-muted-foreground/75">{item.description}</p>
                  ) : null}

                  {item.control ? <div>{item.control}</div> : null}
                </div>
              </li>
            );
          })}
        </ul>

        {section.footer ? (
          <div className="rounded-xl border border-[hsl(var(--border)/0.25)] bg-[hsl(var(--background)/0.88)] px-4 py-3 text-body-sm font-body-sm text-muted-foreground/85">
            {section.footer}
          </div>
        ) : null}
      </div>
    </section>
  );

  return (
    <aside
      className={cn(
        brand.surface.bento(),
        "flex h-full flex-col gap-6 rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--background)/0.9)] p-6 shadow-lg backdrop-blur",
        className
      )}
      {...props}
    >
      <header className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-h4 font-h4 text-foreground">{title}</h2>
            {subtitle ? (
              <p className="text-body-sm font-body-sm text-muted-foreground/85">{subtitle}</p>
            ) : null}
          </div>
          {primaryActionLabel ? (
            <Button
              onClick={onPrimaryAction}
              disabled={primaryActionDisabled}
              className="whitespace-nowrap"
              size="sm"
            >
              {primaryActionLabel}
            </Button>
          ) : null}
        </div>
        {inlineBadges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {inlineBadges.map((badge, index) => (
              <Fragment key={index}>{badge}</Fragment>
            ))}
          </div>
        ) : null}
      </header>

      <div className="flex-1 space-y-6">
        {coreSections.map(renderSection)}

        {advancedSections.length > 0 ? (
          <div className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              className="self-start border-[hsl(var(--border)/0.35)] text-muted-foreground/80 hover:text-foreground"
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              {showAdvanced ? toggleCopy.hide ?? "Hide advanced settings" : toggleCopy.show ?? "Show advanced settings"}
            </Button>
            {showAdvanced ? (
              <div className="space-y-6">
                {advancedSections.map(renderSection)}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {footer ? <div className="rounded-3xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] px-5 py-4 text-body-sm font-body-sm text-muted-foreground/80">{footer}</div> : null}
    </aside>
  );
}
