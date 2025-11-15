"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// Stub types for presence (full implementation temporarily disabled)
export type PresenceStatus = "online" | "away" | "offline" | "ghost";

export const presenceVariants = cva(
  "rounded-full",
  {
    variants: {
      status: {
        online: "bg-emerald-500",
        away: "bg-amber-500",
        offline: "bg-slate-500",
        ghost: "bg-purple-500",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
      },
    },
    defaultVariants: {
      status: "offline",
      size: "md",
    },
  }
);

export interface PresenceDotProps extends VariantProps<typeof presenceVariants> {
  className?: string;
}

export const PresenceDot: React.FC<PresenceDotProps> = ({ status, size, className }) => {
  return <div className={cn(presenceVariants({ status, size }), className)} />;
};

PresenceDot.displayName = "PresenceDot";
