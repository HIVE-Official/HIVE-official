// Bounded Context Owner: Design System Guild
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface ToolbarProps extends ComponentPropsWithoutRef<"div"> {
  readonly children: ReactNode;
  readonly dense?: boolean;
}

export const Toolbar = ({ className, children, dense = false, ...props }: ToolbarProps) => (
  <div
    role="toolbar"
    className={cn(
      "flex flex-wrap items-center gap-2 rounded-md border border-input bg-card",
      dense ? "px-2 py-1.5" : "px-3 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const ToolbarGroup = ({ className, children, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

export const ToolbarSpacer = ({ className }: { className?: string }) => (
  <div className={cn("grow", className)} />
);

