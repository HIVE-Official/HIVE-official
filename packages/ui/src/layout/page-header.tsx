import * as React from "react";

import { cn } from "../lib/utils";
import { HStack, Stack } from "./stack";

type HeaderAlign = "start" | "center" | "end";
type HeaderDensity = "comfortable" | "compact";

const stackAlignmentClass: Record<HeaderAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const textAlignmentClass: Record<HeaderAlign, string> = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

const densityGap: Record<HeaderDensity, string> = {
  comfortable: "gap-3",
  compact: "gap-2",
};

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  align?: HeaderAlign;
  density?: HeaderDensity;
  /**
   * Optional slot rendered below the header before metadata.
   */
  helper?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
      meta,
      actions,
      className,
      align = "start",
      density = "comfortable",
      children,
      helper,
      ...props
    },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        className={cn(
          "w-full gap-6 border-b border-[var(--hive-border-subtle)] pb-6",
          className
        )}
        align="stretch"
        {...props}
      >
        <div
          className={cn(
            "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
            stackAlignmentClass[align],
            textAlignmentClass[align]
          )}
        >
          <Stack
            className={cn("gap-3", densityGap[density], textAlignmentClass[align])}
            align={align}
          >
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--hive-text-muted)]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--hive-text-primary)] md:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="max-w-3xl text-base text-[var(--hive-text-secondary)] md:text-lg">
                {description}
              </p>
            )}
            {helper}
          </Stack>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
        {children}
        {meta && (
          <HStack
            gap="sm"
            className={cn(
              "flex-wrap text-sm text-[var(--hive-text-muted)]",
              textAlignmentClass[align]
            )}
            align={align}
          >
            {meta}
          </HStack>
        )}
      </Stack>
    );
  }
);
PageHeader.displayName = "PageHeader";

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  overline?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: HeaderAlign;
  density?: HeaderDensity;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      overline,
      title,
      description,
      actions,
      align = "start",
      density = "comfortable",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          className
        )}
        {...props}
      >
        <Stack
          className={cn("max-w-3xl", densityGap[density], textAlignmentClass[align])}
          align={align}
        >
          {overline && (
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--hive-text-muted)]">
              {overline}
            </span>
          )}
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--hive-text-primary)]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-[var(--hive-text-secondary)] md:text-base">
              {description}
            </p>
          )}
        </Stack>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";
