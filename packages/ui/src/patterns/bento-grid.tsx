import * as React from "react";
import { cn } from "@/utils/cn";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

export function BentoGrid({ columns = 3, className, children, ...rest }: BentoGridProps) {
  const cols = columns === 4 ? "md:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={cn("grid grid-cols-1 gap-4", cols, className)} {...rest}>{children}</div>
  );
}

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
}

export function BentoItem({ colSpan = 1, rowSpan = 1, className, children, ...rest }: BentoItemProps) {
  const col = colSpan > 1 ? `md:col-span-${colSpan}` : "";
  const row = rowSpan > 1 ? `md:row-span-${rowSpan}` : "";
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", col, row, className)} {...rest}>
      {children}
    </div>
  );
}

