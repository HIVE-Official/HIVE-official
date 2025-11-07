"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type DescriptionListVariant = "grid" | "stacked" | "inline";
export type DescriptionListTone = "default" | "subtle";

export interface DescriptionListItem {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  helpText?: React.ReactNode;
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
  variant?: DescriptionListVariant;
  columns?: 1 | 2 | 3;
  tone?: DescriptionListTone;
}

export const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(function DescriptionList(
  {
    items,
    variant = "grid",
    columns = 2,
    tone = "default",
    className,
    ...props
  },
  ref
) {
  const gridCols =
    variant === "grid"
      ? columns === 3
        ? "md:grid-cols-3"
        : columns === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-1"
      : undefined;

  const baseSurface =
    tone === "subtle"
      ? "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)] border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]"
      : "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_20%,transparent)] border-[color-mix(in_srgb,var(--hive-border-default,#373945)_65%,transparent)]";

  if (variant === "inline") {
    return (
      <dl
        ref={ref}
        className={cn(
          "divide-y divide-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)] overflow-hidden rounded-xl border",
          baseSurface,
          className
        )}
        {...props}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 gap-2 px-4 py-3 md:grid-cols-[240px_1fr]"
          >
            <dt className="flex items-start gap-2 text-sm font-medium text-[var(--hive-text-secondary)]">
              {item.icon ? (
                <span aria-hidden className="mt-0.5">
                  {item.icon}
                </span>
              ) : null}
              <span>{item.label}</span>
            </dt>
            <dd className="text-sm text-[var(--hive-text-primary)]">
              {item.value}
              {item.helpText ? (
                <div className="mt-1 text-xs text-[var(--hive-text-secondary)]">
                  {item.helpText}
                </div>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl
      ref={ref}
      className={cn("grid gap-3", gridCols, className)}
      {...props}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "rounded-xl border p-4",
            baseSurface,
            variant === "stacked" && "md:p-5"
          )}
        >
          <dt className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--hive-text-secondary)]">
            {item.icon ? (
              <span aria-hidden>{item.icon}</span>
            ) : null}
            <span>{item.label}</span>
          </dt>
          <dd className="text-sm text-[var(--hive-text-primary)]">
            {item.value}
            {item.helpText ? (
              <div className="mt-1 text-xs text-[var(--hive-text-secondary)]">
                {item.helpText}
              </div>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
});
