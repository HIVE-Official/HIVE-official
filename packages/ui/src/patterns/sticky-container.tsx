"use client";
import * as React from "react";
import { cn } from "@/utils/cn";

export interface StickyContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  headerClassName?: string;
}

export function StickyContainer({ header, headerClassName, className, children, ...rest }: StickyContainerProps) {
  return (
    <div className={cn("relative overflow-auto rounded-xl border border-border bg-card", className)} {...rest}>
      <div className={cn("sticky top-0 z-10 border-b border-border bg-background/80 p-3 backdrop-blur", headerClassName)}>
        {header}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

