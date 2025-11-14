"use client";

import type {
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import { Calendar, Clock, Play, Sparkles } from "lucide-react";

import { Button } from "../../00-Global/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../00-Global/atoms/card";
import { Progress } from "../../00-Global/atoms/progress";
import { cn } from "../../../lib/utils";

export type RailWidgetVariant = "action" | "progress" | "eventNow";

export interface RailWidgetProps
  extends HTMLAttributes<HTMLDivElement> {
  variant: RailWidgetVariant;
  title?: string;
  description?: string;
  progress?: number;
  ctaLabel?: string;
  onCta?: MouseEventHandler<HTMLButtonElement>;
  startTimeLabel?: string;
  endTimeLabel?: string;
}

const defaultTitle: Record<RailWidgetVariant, string> = {
  action: "Quick Action",
  progress: "Progress",
  eventNow: "Happening Now",
};

export function RailWidget({
  variant,
  title,
  description,
  progress = 0,
  ctaLabel = "Open",
  onCta,
  startTimeLabel,
  endTimeLabel,
  className,
  ...props
}: RailWidgetProps) {
  return (
    <Card
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-[var(--hive-text-primary)]">
          {variant === "action" && (
            <Sparkles
              className="h-4 w-4 text-[var(--hive-brand-primary)]"
              aria-hidden
            />
          )}
          {variant === "progress" && (
            <Play
              className="h-4 w-4 text-[var(--hive-brand-primary)]"
              aria-hidden
            />
          )}
          {variant === "eventNow" && (
            <Calendar
              className="h-4 w-4 text-[var(--hive-brand-primary)]"
              aria-hidden
            />
          )}
          <span>{title ?? defaultTitle[variant]}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {description ? (
          <p className="text-sm text-[var(--hive-text-secondary)]">
            {description}
          </p>
        ) : null}
        {variant === "progress" ? (
          <Progress
            value={progress}
            size="sm"
            className="mt-1"
            aria-label={`Progress ${Math.round(progress)}%`}
          />
        ) : null}
        {variant === "eventNow" ? (
          <div className="flex items-center justify-between text-xs text-[var(--hive-text-secondary)]">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {startTimeLabel ?? "Now"}
            </span>
            {endTimeLabel ? (
              <span>{`\u2192 ${endTimeLabel}`}</span>
            ) : null}
          </div>
        ) : null}
        <div className="pt-1">
          <Button
            size="sm"
            onClick={onCta}
            className="w-full"
            type="button"
          >
            {ctaLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
