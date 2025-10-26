"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/atoms/skeleton";

export interface NoShiftBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  aspect?: number | `${number}/${number}`; // 16/9 or numeric
  showSkeleton?: boolean;
}

export function NoShiftBox({ aspect = "16/9", showSkeleton = true, className, children, ...rest }: NoShiftBoxProps) {
  const style: React.CSSProperties = {};
  if (typeof aspect === "number") {
    style.aspectRatio = String(aspect);
  } else if (typeof aspect === "string") {
    style.aspectRatio = aspect;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-md border border-border", className)} style={style} {...rest}>
      {children ?? (showSkeleton ? <Skeleton className="absolute inset-0" /> : null)}
    </div>
  );
}

