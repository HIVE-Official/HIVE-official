"use client";

import type {
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "../../00-Global/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../00-Global/atoms/card";
import { cn } from "../../../lib/utils";

export interface NowCardProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  when?: string;
  where?: string;
  ctaLabel?: string;
  onCta?: MouseEventHandler<HTMLButtonElement>;
}

export function NowCard({
  title,
  subtitle,
  when,
  where,
  ctaLabel = "View",
  onCta,
  className,
  ...props
}: NowCardProps) {
  return (
    <Card
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-[var(--hive-text-primary)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
        {subtitle ? <p>{subtitle}</p> : null}
        {when ? (
          <p className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {when}
          </p>
        ) : null}
        {where ? (
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {where}
          </p>
        ) : null}
        <div className="pt-2">
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
