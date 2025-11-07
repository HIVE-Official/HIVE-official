"use client";

import * as React from "react";
import type { PresenceStatus } from "@hive/core";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

type StatusToken = {
  label: string;
  dot: string;
  halo?: string;
  textTone?: "primary" | "secondary" | "muted";
  trackTime?: boolean;
};

const statusTokens: Record<PresenceStatus, StatusToken> = {
  online: {
    label: "Online",
    dot: "var(--hive-status-success)",
    halo: "color-mix(in srgb, var(--hive-status-success) 45%, transparent)",
  },
  away: {
    label: "Away",
    dot: "var(--hive-status-warning)",
    halo: "color-mix(in srgb, var(--hive-status-warning) 45%, transparent)",
  },
  offline: {
    label: "Offline",
    dot: "color-mix(in srgb, var(--hive-border-muted) 80%, transparent)",
    textTone: "secondary",
    trackTime: true,
  },
  ghost: {
    label: "Ghost",
    dot: "color-mix(in srgb, var(--hive-border-muted) 40%, transparent)",
    textTone: "muted",
    trackTime: true,
  },
};

const presenceVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-2 text-[var(--hive-font-size-body-xs)]",
      md: "gap-3 text-[var(--hive-font-size-body-sm)]",
      lg: "gap-4 text-[var(--hive-font-size-body-md)]",
    },
    tone: {
      neutral: "",
      inverse: "text-[var(--hive-text-inverse)]",
    },
    emphasis: {
      true: "font-[var(--hive-font-weight-medium,500)]",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "neutral",
  },
});

const dotSize = {
  sm: { dot: "h-2.5 w-2.5", halo: "h-3.5 w-3.5" },
  md: { dot: "h-3 w-3", halo: "h-4.5 w-4.5" },
  lg: { dot: "h-3.5 w-3.5", halo: "h-5.5 w-5.5" },
} as const;

type PresenceVariantProps = VariantProps<typeof presenceVariants>;

export interface PresenceDotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    PresenceVariantProps {
  status?: PresenceStatus;
  lastActiveAt?: Date;
  showLabel?: boolean;
  label?: React.ReactNode;
}

const formatLastActive = (date?: Date) => {
  if (!date) return null;
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export const PresenceDot = React.forwardRef<HTMLSpanElement, PresenceDotProps>(
  (
    {
      className,
      status = "offline",
      size,
      tone,
      showLabel = true,
      label,
      lastActiveAt,
      ...props
    },
    ref
  ) => {
    const token = statusTokens[status];
    const sizeConfig = dotSize[size ?? "md"];
    const showTimestamp =
      (token.trackTime ?? false) && lastActiveAt && (status === "offline" || status === "ghost");

    const timestamp = showTimestamp ? formatLastActive(lastActiveAt) : null;

    const textColor =
      token.textTone === "primary"
        ? "var(--hive-text-primary)"
        : token.textTone === "muted"
          ? "var(--hive-text-muted)"
          : "var(--hive-text-secondary)";

    return (
      <span
        ref={ref}
        className={cn(
          presenceVariants({
            size,
            tone,
            emphasis: showLabel ? true : undefined,
          }),
          className
        )}
        {...props}
      >
        <span className="relative inline-flex items-center justify-center">
          {token.halo && (
            <span
              aria-hidden="true"
              className={cn("absolute inset-0 rounded-full", sizeConfig.halo)}
              style={{
                background: token.halo,
                opacity: 0.28,
              }}
            />
          )}
          <span
            aria-hidden="true"
            className={cn(
              "relative rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.85)]",
              sizeConfig.dot
            )}
            style={{
              background:
                status === "ghost"
                  ? "color-mix(in srgb, var(--hive-background-tertiary) 70%, transparent)"
                  : token.dot,
              opacity: status === "ghost" ? 0.5 : 1,
            }}
          />
        </span>
        {showLabel ? (
          <span className="flex flex-col leading-tight">
            <span
              className="text-[var(--hive-font-size-body-sm)] font-[var(--hive-font-weight-medium,500)]"
              style={{ color: textColor }}
            >
              {label ?? token.label}
            </span>
            {timestamp ? (
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--hive-text-muted)]">
                {timestamp}
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    );
  }
);
PresenceDot.displayName = "PresenceDot";

export { presenceVariants };
export type { PresenceStatus };
