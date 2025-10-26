"use client";
import * as React from "react";
import { cn } from "@/utils/cn";

export interface BaselineGridOverlayProps {
  enabled?: boolean;
  size?: number; // px per grid row (default 8)
}

export function BaselineGridOverlay({ enabled = false, size = 8 }: BaselineGridOverlayProps) {
  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[9999]")}
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent ${size}px)`
      }}
    />
  );
}

